import nodemailer from "nodemailer";

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

    // Log the contact form submission
    console.log("Contact Form Submission:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    console.log("Timestamp:", new Date().toISOString());

    // Create transporter with Hostinger SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email to NeuByte team
    await transporter.sendMail({
      from: `"NeuByte Website" <${process.env.SMTP_USER}>`,
      to: "info@neubyte.tech",
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; font-family: Arial, sans-serif;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px; border-left: 4px solid #007bff;">
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          This message was sent from the NeuByte website contact form.
        </p>
      `,
    });

    console.log("Email sent successfully to NeuByte team");

    // Send confirmation email to the user
    await transporter.sendMail({
      from: `"NeuByte" <info@neubyte.tech>`,
      to: email,
      subject: "Warm welcome to NeuByte",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to NeuByte</h1>
          </div>
          <div style="background-color: #ffffff; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="font-size: 18px; color: #333; margin-bottom: 20px;">Dear <strong>${name}</strong>,</p>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Warm welcome to <strong style="color: #667eea;">NeuByte</strong>. 
              Our dedicated team will connect with you soon to discuss your requirements.
            </p>
            <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0;">
              <p style="margin: 0; color: #666; font-style: italic;">
                "We're excited to work with you and bring your ideas to life!"
              </p>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://neubyte.tech" style="background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block;">
                Visit Our Website
              </a>
            </div>
          </div>
          <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
            <p>Thanks,<br/><strong>NeuByte Team</strong></p>
            <p>Data & AI Solutions</p>
          </div>
        </div>
      `,
    });

    console.log("Confirmation email sent to user");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Message received successfully! We'll get back to you soon." 
      }),
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