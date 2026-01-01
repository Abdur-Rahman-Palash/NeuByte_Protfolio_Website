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

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });


    await transporter.sendMail({
      from: `"NeuByte Website" <${process.env.SMTP_USER}>`,
      to: "info@neubyte.tech",
      subject: "New Contact Form Submission",
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });


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

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);

    return new Response(
      JSON.stringify({ success: false }),
      { status: 500 }
    );
  }
}