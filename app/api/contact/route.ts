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

    // Sanitize env and decide port/secure
    const smtpHost = process.env.SMTP_HOST?.replace(/^"+|"+$/g, '').trim();
    const smtpUser = process.env.SMTP_USER?.replace(/^"+|"+$/g, '').trim();
    const smtpPass = process.env.SMTP_PASS?.replace(/^"+|"+$/g, '').trim();
    const smtpPort = Number((process.env.SMTP_PORT || '587').toString().replace(/^"+|"+$/g, '').trim());
    const secure = smtpPort === 465;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure,
      requireTLS: !secure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });


    try {
      await transporter.sendMail({
        from: `"NeuByte Website" <${smtpUser || process.env.SMTP_USER}>`,
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
    } catch (sendErr) {
      console.error('SMTP send failed (to site):', sendErr);
      // On failure, if in dev and no real SMTP, fall back to Ethereal
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Attempting Ethereal fallback for dev...');
        const testAccount = await nodemailer.createTestAccount();
        const ethTransporter = nodemailer.createTransport({
          host: testAccount.smtp.host,
          port: testAccount.smtp.port,
          secure: testAccount.smtp.secure,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });

        const info = await ethTransporter.sendMail({
          from: `"NeuByte Website (Ethereal)" <${testAccount.user}>`,
          to: "info@neubyte.tech",
          subject: "(DEV) New Contact Form Submission",
          html: `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        });

        console.info('Ethereal preview URL:', nodemailer.getTestMessageUrl(info));
      } else {
        throw sendErr;
      }
    }


    try {
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
    } catch (sendErr) {
      console.error('SMTP send failed (to user):', sendErr);
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Attempting Ethereal fallback for dev (to user)...');
        const testAccount = await nodemailer.createTestAccount();
        const ethTransporter = nodemailer.createTransport({
          host: testAccount.smtp.host,
          port: testAccount.smtp.port,
          secure: testAccount.smtp.secure,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });

        const info = await ethTransporter.sendMail({
          from: `"NeuByte (Ethereal)" <${testAccount.user}>`,
          to: email,
          subject: "(DEV) Warm welcome to NeuByte",
          html: `
            <p>Dear ${name},</p>
            <p>Warm welcome to <strong>NeuByte</strong>.</p>
            <p>Our dedicated team will connect with you soon.</p>
            <br/>
            <p>Thanks,<br/>NeuByte</p>
          `,
        });

        console.info('Ethereal preview URL (user):', nodemailer.getTestMessageUrl(info));
      } else {
        throw sendErr;
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);

    // Map common nodemailer auth errors to helpful responses
    if (error && (error as any).code === 'EAUTH') {
      return new Response(
        JSON.stringify({ success: false, error: 'SMTP_AUTH_FAILED', userMessage: "We're unable to send your message right now. Please verify email settings or try again later." }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({ success: false, userMessage: "An unexpected error occurred. Please try again later." }),
      { status: 500 }
    );
  }
}