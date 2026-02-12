# Gmail Email Setup for NeuByte Contact Forms

## Problem: Emails not reaching your Gmail inbox

Currently, emails are being sent through a test service that doesn't deliver to real email addresses.

## Solution: Set up Gmail SMTP with App Password

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account: https://myaccount.google.com/
2. Click "Security" in the left menu
3. Enable "2-Step Verification" if not already enabled

### Step 2: Generate App Password
1. In Security settings, click "App passwords"
2. Select "Mail" for the app
3. Select "Other (Custom name)" and enter "NeuByte Website"
4. Click "Generate"
5. Copy the 16-character password (it will look like: xxxx xxxx xxxx xxxx)

### Step 3: Update Server Configuration
Replace the email password in your server:

**Option A: Update server.js directly**
```javascript
auth: {
  user: 'info@neubyte.tech',
  pass: 'YOUR_16_CHARACTER_APP_PASSWORD', // Paste the app password here
}
```

**Option B: Use environment variables**
Create a `.env` file:
```
SMTP_USER=info@neubyte.tech
SMTP_PASS=YOUR_16_CHARACTER_APP_PASSWORD
```

### Step 4: Restart Server
```bash
taskkill /F /IM node.exe
node server.js
```

### Step 5: Test
Submit a contact form and check:
1. Server console shows "✅ Gmail SMTP connected successfully"
2. Email arrives in your Gmail inbox
3. User receives confirmation email

## Troubleshooting

**Error: "Invalid login"**
- Make sure you're using the App Password, not your regular Gmail password
- Ensure 2-factor authentication is enabled

**Error: "Connection timeout"**
- Check your internet connection
- Try using port 587 instead of 465

**Still not working?**
- Check Gmail spam folder
- Verify "Allow less secure apps" is ON (for testing)
- Contact your email provider if using custom domain

## Current Status
- ✅ Forms are submitting successfully
- ✅ Server is processing submissions
- ❌ Emails going to test service (not real Gmail)
- 🎯 Need: Gmail App Password for real email delivery
