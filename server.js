const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'out')));

// Email configuration - Hostinger SMTP
async function initEmailTransporter() {
  try {
    // Use Hostinger SMTP from environment variables
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // true for 465
      auth: {
        user: process.env.SMTP_USER || 'info@neubyte.tech',
        pass: process.env.SMTP_PASS || 'Neubyte@786',
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    
    // Test the connection
    await transporter.verify();
    console.log('✅ Hostinger SMTP connected successfully');
    console.log('📧 Emails will be sent to real addresses via Hostinger');
  } catch (error) {
    console.log('⚠️ Hostinger SMTP failed, using test email service');
    console.log('Email error:', error.message);
    console.log('💡 Check your Hostinger email credentials in .env.local');
    
    // Fallback to Ethereal test service
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log('📧 Using test email service - emails won\'t reach real addresses');
  }
}

// Initialize on startup
initEmailTransporter();

// API Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    console.log('📧 Contact Form Submission:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    // Try to send emails, but don't fail if SMTP is down
    try {
      // Send email to NeuByte team
      const info1 = await transporter.sendMail({
        from: `"NeuByte Website" <${process.env.SMTP_USER || 'info@neubyte.tech'}>`,
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

      // Send confirmation email to user
      const info2 = await transporter.sendMail({
        from: `"NeuByte" <${process.env.SMTP_USER || 'info@neubyte.tech'}>`,
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

      console.log("✅ Email sent successfully");
      
      // Show preview URLs if using test service
      if (info1.messageId && info1.messageId.includes('ethereal')) {
        console.log('📧 Email preview URL:', nodemailer.getTestMessageUrl(info1));
      }
      if (info2.messageId && info2.messageId.includes('ethereal')) {
        console.log('📧 Confirmation email preview URL:', nodemailer.getTestMessageUrl(info2));
      }
      
    } catch (emailError) {
      console.error("⚠️ Email sending failed (but form submission succeeded):", emailError.message);
      // Continue with success response even if email fails
    }

    res.json({ success: true, message: "Message received successfully! We'll get back to you soon." });

  } catch (error) {
    console.error("Contact API Error:", error);
    res.status(500).json({ success: false, error: "Failed to send message. Please try again later." });
  }
});

// Blog API (Mock data for static hosting)
app.get('/api/blogs', (req, res) => {
  const mockBlogs = [
    {
      id: 1,
      title: "Machine Learning Integration",
      excerpt: "Learn how to integrate ML into your applications",
      date: "2024-01-15",
      author: "NeuByte Team",
      tags: ["AI", "ML", "Integration"],
      slug: "machine-learning-integration"
    },
    {
      id: 2,
      title: "AI Native Web Development",
      excerpt: "Building modern web apps with AI capabilities",
      date: "2024-01-10",
      author: "NeuByte Team",
      tags: ["AI", "Web Development", "Modern"],
      slug: "ai-native-web-development"
    },
    {
      id: 3,
      title: "AI for Small Businesses",
      excerpt: "How small businesses can leverage AI technology",
      date: "2024-01-05",
      author: "NeuByte Team",
      tags: ["AI", "Business", "Small Business"],
      slug: "ai-for-small-businesses"
    }
  ];
  
  res.json(mockBlogs);
});

// Projects API (Mock data)
app.get('/api/projects', (req, res) => {
  const mockProjects = [
    {
      id: 1,
      title: "AI Dashboard",
      description: "Real-time analytics dashboard with ML insights",
      image: "/images/projects/ai-dashboard.jpg",
      tech: ["React", "Node.js", "TensorFlow"],
      demo: "https://demo.neubyte.tech/ai-dashboard",
      featured: true,
      category: "AI Solutions"
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with AI recommendations",
      image: "/images/projects/ecommerce.jpg",
      tech: ["Next.js", "Stripe", "MongoDB"],
      demo: "https://demo.neubyte.tech/ecommerce",
      featured: true,
      category: "Web Development"
    }
  ];
  
  res.json(mockProjects);
});

// Serve static files - fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'out', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Static files served from: ${path.join(__dirname, 'out')}`);
});
