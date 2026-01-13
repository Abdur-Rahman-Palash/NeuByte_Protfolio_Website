const nodemailer = require('nodemailer');
const fs = require('fs');

// Read .env.local manually
const envContent = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const trimmedLine = line.trim();
  if (trimmedLine && !trimmedLine.startsWith('#')) {
    const equalIndex = trimmedLine.indexOf('=');
    if (equalIndex > 0) {
      const key = trimmedLine.substring(0, equalIndex).trim();
      const value = trimmedLine.substring(equalIndex + 1).trim().replace(/^"+|"+$/g, '');
      envVars[key] = value;
    }
  }
});

async function testSMTP() {
  console.log('Testing SMTP Configuration...\n');
  console.log('Using credentials:', {
    host: envVars.SMTP_HOST,
    port: envVars.SMTP_PORT,
    user: envVars.SMTP_USER,
    passLength: envVars.SMTP_PASS?.length || 0
  });
  
  const configs = [
    {
      name: 'Hostinger SSL (Port 465)',
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true
    },
    {
      name: 'Hostinger TLS (Port 587)',
      host: 'smtp.hostinger.com', 
      port: 587,
      secure: false
    },
    {
      name: 'Alternative Host (Port 465)',
      host: 'mail.hostinger.com',
      port: 465,
      secure: true
    },
    {
      name: 'Alternative Host (Port 587)',
      host: 'mail.hostinger.com',
      port: 587,
      secure: false
    }
  ];

  for (const config of configs) {
    console.log(`\n=== Testing: ${config.name} ===`);
    
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: envVars.SMTP_USER,
        pass: envVars.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      },
      debug: true,
      logger: true
    });

    try {
      await transporter.verify();
      console.log('✅ SUCCESS: Connection verified');
      
      // Try sending test email
      const result = await transporter.sendMail({
        from: `"Test" <${envVars.SMTP_USER}>`,
        to: envVars.SMTP_USER,
        subject: `Test - ${config.name}`,
        text: 'This is a test email'
      });
      console.log('✅ SUCCESS: Test email sent');
      console.log('Message ID:', result.messageId);
      
      // Found working configuration
      console.log('\n🎉 WORKING CONFIGURATION FOUND:');
      console.log(`SMTP_HOST=${config.host}`);
      console.log(`SMTP_PORT=${config.port}`);
      console.log(`SMTP_USER=${envVars.SMTP_USER}`);
      console.log(`SMTP_PASS=${envVars.SMTP_PASS}`);
      break;
      
    } catch (error) {
      console.log('❌ FAILED:', error.message);
      if (error.code) console.log('Error code:', error.code);
      if (error.responseCode) console.log('Response code:', error.responseCode);
    }
  }
}

testSMTP().catch(console.error);
