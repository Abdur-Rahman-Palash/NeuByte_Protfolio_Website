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

async function quickTest() {
  console.log('Quick SMTP Test with current credentials...');
  
  const transporter = nodemailer.createTransport({
    host: envVars.SMTP_HOST,
    port: parseInt(envVars.SMTP_PORT),
    secure: parseInt(envVars.SMTP_PORT) === 465,
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
    console.log('✅ SUCCESS: SMTP authentication works!');
    
    const result = await transporter.sendMail({
      from: `"Test" <${envVars.SMTP_USER}>`,
      to: envVars.SMTP_USER,
      subject: 'Quick Test',
      text: 'Test email'
    });
    console.log('✅ Test email sent successfully!');
    
  } catch (error) {
    console.log('❌ FAILED:', error.message);
    console.log('Error code:', error.code);
    console.log('Response code:', error.responseCode);
  }
}

quickTest();
