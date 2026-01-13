import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const emailHost = process.env.SMTP_HOST?.trim();
    const emailUser = process.env.SMTP_USER?.trim();
    const emailPass = process.env.SMTP_PASS?.trim();
    const emailPort = Number((process.env.SMTP_PORT || '587').toString().trim());
    const emailSecure = emailPort === 465;

    console.log('SMTP Configuration Test:', {
      host: emailHost,
      port: emailPort,
      secure: emailSecure,
      user: emailUser,
      passLength: emailPass?.length || 0
    });

    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailSecure,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false
      },
      debug: true,
      logger: true
    });

    // Test connection
    try {
      const verifyResult = await transporter.verify();
      console.log('SMTP Verification successful:', verifyResult);
      
      // Test sending email
      const testResult = await transporter.sendMail({
        from: `"Test" <${emailUser}>`,
        to: emailUser, // Send to self for testing
        subject: "SMTP Test Email",
        text: "This is a test email to verify SMTP configuration.",
        html: "<p>This is a test email to verify SMTP configuration.</p>"
      });
      
      console.log('Test email sent:', testResult);
      
      return Response.json({
        success: true,
        message: "SMTP configuration is working correctly",
        details: {
          host: emailHost,
          port: emailPort,
          secure: emailSecure,
          user: emailUser
        }
      });

    } catch (error) {
      console.error('SMTP Test Failed:', error);
      
      return Response.json({
        success: false,
        error: "SMTP authentication failed",
        details: {
          code: error.code,
          responseCode: error.responseCode,
          command: error.command,
          message: error.message,
          host: emailHost,
          port: emailPort,
          user: emailUser
        }
      }, { status: 401 });
    }

  } catch (error) {
    console.error('Test endpoint error:', error);
    return Response.json({
      success: false,
      error: "Configuration error",
      message: error.message
    }, { status: 500 });
  }
}
