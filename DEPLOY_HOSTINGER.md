# Hostinger Node.js Deployment (for NeuByte Portfolio)

Prerequisites
- Hostinger plan with Node.js support (hPanel "Node.js Apps" or VPS). Shared static hosting won't run server APIs.
- SSH access (recommended) or File Manager + terminal in hPanel.

Quick steps (Node-supported Hostinger)
1. Upload repository or clone on the server.
2. Install deps and build:
```bash
npm ci
npm run build
```
3. Set environment variables in hPanel (or create `.env`): `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `PORT`.
4. Start the app (hPanel Node manager or via PM2):
```bash
npm install -g pm2
pm2 start ecosystem.config.js --env production
```
5. Ensure the process is running and map the domain to the app in hPanel.

Alternative: Static export + external email handler
- If you prefer Hostinger shared hosting without Node, you can export the site to static HTML. Contact form will not work unless you replace it with a third-party form service (SendGrid, Formspree, Netlify Forms, etc.).

Static export steps
1. Add an export script to `package.json` (optional):
```json
"scripts": {
  "export": "next export"
}
```
2. Build and export:
```bash
npm ci
npm run build
npm run export
```
3. Upload the `out/` folder contents to Hostinger File Manager or via FTP to the `public_html` directory.

Notes
- Keep SMTP credentials secret; use hPanel environment settings when possible.
- For full server features (nodemailer), prefer a Hostinger plan with Node support or a VPS.
