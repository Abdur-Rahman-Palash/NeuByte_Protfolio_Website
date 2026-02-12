# Email Configuration Fix

## Issue
The confirmation emails are not being sent because the SMTP connection to Hostinger is timing out on both ports 465 and 587.

## Solution Options

### Option 1: Update SMTP Port (Recommended)
Update your `.env.local` file to use port 587 instead of 465:

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=info@neubyte.tech
SMTP_PASS=Neubyte@786
```

Port 587 with STARTTLS is the modern standard and often works better than port 465.

### Option 2: Use Gmail SMTP (Alternative)
If Hostinger continues to have issues, you can use Gmail's SMTP:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
```

Note: You'll need to enable 2-factor authentication and create an App Password for Gmail.

### Option 3: Use Email Service API
For production, consider using services like:
- SendGrid
- Resend
- Mailgun
- AWS SES

## Testing
After updating the configuration, test with:
```bash
node test-email-port587.js
```

## Current Status
- ✅ Contact form submission works
- ✅ API endpoints respond correctly
- ❌ Email sending fails due to SMTP timeout
- 🔄 Need to update SMTP configuration
