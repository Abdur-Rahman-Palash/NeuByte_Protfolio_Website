const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testEmailPort587() {
  console.log('=== Testing with Port 587 (STARTTLS) ===');
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST?.replace(/"+|"+$/g, '').trim(),
    port: 587, // Use port 587 with STARTTLS
    secure: false, // false for STARTTLS
    auth: {
      user: process.env.SMTP_USER?.replace(/"+|"+$/g, '').trim(),
      pass: process.env.SMTP_PASS?.replace(/"+|"+$/g, '').trim(),
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('Testing SMTP connection on port 587...');
    await transporter.verify();
    console.log('✅ SMTP connection successful on port 587');
    
    // Send test email
    const info = await transporter.sendMail({
      from: `"NeuByte Test" <${process.env.SMTP_USER?.replace(/"+|"+$/g, '').trim()}>`,
      to: process.env.SMTP_USER, // Send to yourself for testing
      subject: "Test Email - Port 587",
      html: `
        <h2>Test Email Successful</h2>
        <p>This email was sent using port 587 with STARTTLS.</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p>If you receive this, the email system is working with port 587!</p>
      `,
    });
    
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    
  } catch (error) {
    console.log('❌ Failed with port 587:', error.message);
  }
}

testEmailPort587().catch(console.error);
