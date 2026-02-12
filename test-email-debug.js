const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testEmailConfig() {
  console.log('=== Email Configuration Debug ===');
  console.log('SMTP_HOST:', process.env.SMTP_HOST ? 'SET' : 'MISSING');
  console.log('SMTP_USER:', process.env.SMTP_USER ? 'SET' : 'MISSING');
  console.log('SMTP_PASS:', process.env.SMTP_PASS ? 'SET' : 'MISSING');
  console.log('SMTP_PORT:', process.env.SMTP_PORT || '465 (default)');
  
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('\n❌ ERROR: Missing SMTP configuration in .env.local');
    return;
  }

  console.log('\n=== Creating Transporter ===');
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST?.replace(/"+|"+$/g, '').trim(),
    port: Number(process.env.SMTP_PORT?.replace(/"+|"+$/g, '').trim()) || 465,
    secure: Number(process.env.SMTP_PORT?.replace(/"+|"+$/g, '').trim()) === 465,
    auth: {
      user: process.env.SMTP_USER?.replace(/"+|"+$/g, '').trim(),
      pass: process.env.SMTP_PASS?.replace(/"+|"+$/g, '').trim(),
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  console.log('Transporter created successfully');

  try {
    console.log('\n=== Testing SMTP Connection ===');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully');
  } catch (error) {
    console.log('❌ SMTP connection failed:', error.message);
    console.log('Full error:', error);
    return;
  }

  try {
    console.log('\n=== Sending Test Email ===');
    const testEmail = 'your-test-email@gmail.com'; // Replace with actual test email
    const info = await transporter.sendMail({
      from: `"NeuByte Test" <${process.env.SMTP_USER?.replace(/"+|"+$/g, '').trim()}>`,
      to: testEmail,
      subject: "Test Email from NeuByte Contact Form",
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify the SMTP configuration is working.</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p>If you receive this, the email system is working correctly.</p>
      `,
    });

    console.log('✅ Email sent successfully');
    console.log('Message ID:', info.messageId);
    
    // For some services, you can get a preview URL
    if (nodemailer.getTestMessageUrl) {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
  } catch (emailError) {
    console.log('❌ Email sending failed:', emailError.message);
    console.log('Full error:', emailError);
  }
}

testEmailConfig().catch(console.error);
