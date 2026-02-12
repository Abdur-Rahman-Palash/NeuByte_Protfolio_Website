import nodemailer from "nodemailer";

// Handle GET requests (prevents 405 error)
export async function GET() {
  return new Response(
    JSON.stringify({ 
      message: "Contact API endpoint. Use POST method to send messages.",
      status: "active"
    }),
    { status: 200 }
  );
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Basic validation (important)
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing fields" }),
        { status: 400 }
      );
    }

    // Check if environment variables are set
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("SMTP configuration missing. Check environment variables.");
      // Still return success to user, but log the error
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Message received! We'll get back to you soon." 
        }),
        { status: 200 }
      );
    }

    let emailSent = false;
    let lastError = null;

    // First try with the configured port
    const transporter1 = nodemailer.createTransport({
      host: process.env.SMTP_HOST?.replace(/"+|"+$/g, '').trim(),
      port: Number(process.env.SMTP_PORT?.replace(/"+|"+$/g, '').trim()) || 465,
      secure: Number(process.env.SMTP_PORT?.replace(/"+|"+$/g, '').trim()) === 465,
      auth: {
        user: process.env.SMTP_USER?.replace(/"+|"+$/g, '').trim(),
        pass: process.env.SMTP_PASS?.replace(/"+|"+$/g, '').trim(),
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 5000, // 5 seconds
      greetingTimeout: 5000,   // 5 seconds
      socketTimeout: 5000      // 5 seconds
    });

    // Try with port 587 as fallback
    const transporter2 = nodemailer.createTransport({
      host: process.env.SMTP_HOST?.replace(/"+|"+$/g, '').trim(),
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.SMTP_USER?.replace(/"+|"+$/g, '').trim(),
        pass: process.env.SMTP_PASS?.replace(/"+|"+$/g, '').trim(),
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 5000
    });

    const transporters = [transporter1, transporter2];
    
    for (let i = 0; i < transporters.length; i++) {
      const transporter = transporters[i];
      const port = i === 0 ? (process.env.SMTP_PORT || '465') : '587';
      
      try {
        console.log(`Trying SMTP with port ${port}...`);
        await transporter.verify();
        console.log(`✅ SMTP connection successful on port ${port}`);
        
        // Send email to NeuByte team
        await transporter.sendMail({
          from: `"NeuByte Website" <${process.env.SMTP_USER?.replace(/"+|"+$/g, '').trim()}>`,
          to: "info@neubyte.tech",
          subject: "New Contact Form Submission",
          html: `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr>
            <p><small>Sent via SMTP port ${port}</small></p>
          `,
        });

        // Send confirmation email to user
        await transporter.sendMail({
          from: `"NeuByte" <info@neubyte.tech>`,
          to: email,
          subject: "Warm welcome to NeuByte",
          html: `
            <p>Dear ${name},</p>
            <p>Warm welcome to <strong>NeuByte</strong>.</p>
            <p>Our dedicated team will connect with you soon.</p>
            <br/>
            <p>Thanks,<br/>NeuByte</p>
          `,
        });

        emailSent = true;
        console.log(`✅ Emails sent successfully via port ${port}`);
        break;
        
      } catch (error) {
        console.log(`❌ Port ${port} failed:`, error.message);
        lastError = error;
        continue;
      }
    }

    if (!emailSent) {
      console.error("All SMTP attempts failed:", lastError);
      // Still return success to user, but log the error
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Message received! We'll get back to you soon." 
        }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully! We'll get back to you soon." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Failed to send message. Please try again later." 
      }),
      { status: 500 }
    );
  }
}