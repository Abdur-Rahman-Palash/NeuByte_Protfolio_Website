const fs = require('fs');
const path = require('path');

// Script to prepare for static export build
console.log('Preparing for static export...');

// Set environment variables for static build
// Note: These need to be set before requiring next.config.js
process.env.STATIC_BUILD = 'true';
process.env.NODE_ENV = 'production';

// Export for child process
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { STATIC_BUILD: 'true', NODE_ENV: 'production' };
}

const apiPath = path.join(__dirname, 'app', 'api');
const adminPath = path.join(__dirname, 'app', 'admin');
const apiBackup = path.join(__dirname, 'app', '_api_backup');
const adminBackup = path.join(__dirname, 'app', '_admin_backup');

// Copy API and admin folders before build (more reliable than rename)
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Backup API and admin folders before build
if (fs.existsSync(apiPath)) {
  if (fs.existsSync(apiBackup)) {
    fs.rmSync(apiBackup, { recursive: true, force: true });
  }
  copyDir(apiPath, apiBackup);
  fs.rmSync(apiPath, { recursive: true, force: true });
  console.log('✓ Backed up and removed app/api');
}

if (fs.existsSync(adminPath)) {
  if (fs.existsSync(adminBackup)) {
    fs.rmSync(adminBackup, { recursive: true, force: true });
  }
  copyDir(adminPath, adminBackup);
  fs.rmSync(adminPath, { recursive: true, force: true });
  console.log('✓ Backed up and removed app/admin');
}

console.log('✓ Environment set for static build');
console.log('Ready for build.');
