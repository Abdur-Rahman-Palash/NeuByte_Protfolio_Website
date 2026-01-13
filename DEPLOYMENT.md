# Deployment Instructions for Hostinger

## Build for Production

1. **Build the static site:**
   ```bash
   npm run build:static
   ```
   This will:
   - Temporarily move API and admin folders
   - Build the static site
   - Restore the folders for development

2. **Upload to Hostinger:**
   - Upload the entire `out` folder contents to your Hostinger `public_html` directory
   - Make sure `.htaccess` file is uploaded (it's in the `public` folder, copy it to `out` folder before uploading)

## Important Notes

- **Admin Panel**: The admin panel (`/admin`) and API routes won't work on static hosting. They require a Node.js server.
- **Blog Management**: For static hosting, you'll need to:
  - Edit blog posts locally in `markdown/blogs/` folder
  - Rebuild and redeploy after changes

## File Structure After Build

```
out/
├── index.html (homepage)
├── blog/
│   └── index.html
├── about/
│   └── index.html
├── .htaccess (copy from public folder)
└── ... (other static files)
```

## Troubleshooting

### Blog page redirects to homepage
- Check that `.htaccess` is uploaded correctly
- Verify `blog/index.html` exists in the `out` folder
- Clear browser cache

### 404 errors on refresh
- Ensure `.htaccess` is in the root directory
- Check that mod_rewrite is enabled on Hostinger

### Footer appears but disappears on refresh
- This is usually a routing issue - ensure `.htaccess` is configured correctly
- Check browser console for JavaScript errors
