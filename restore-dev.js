const fs = require('fs');
const path = require('path');

// Script to restore API and admin folders after build
console.log('Restoring development folders...');

const apiPath = path.join(__dirname, 'app', 'api');
const adminPath = path.join(__dirname, 'app', 'admin');
const apiBackup = path.join(__dirname, 'app', '_api_backup');
const adminBackup = path.join(__dirname, 'app', '_admin_backup');
const htaccessSource = path.join(__dirname, 'public', '.htaccess');
const htaccessDest = path.join(__dirname, 'out', '.htaccess');

// Copy .htaccess to out folder
if (fs.existsSync(htaccessSource) && fs.existsSync(path.join(__dirname, 'out'))) {
  fs.copyFileSync(htaccessSource, htaccessDest);
  console.log('✓ Copied .htaccess to out folder');
}

// Copy backup directories back
function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`⚠️ Backup not found: ${src}`);
    return;
  }
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  fs.mkdirSync(dest, { recursive: true });
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

// Restore API and admin folders after build
if (fs.existsSync(apiBackup)) {
  copyDir(apiBackup, apiPath);
  console.log('✓ Restored app/api');
}

if (fs.existsSync(adminBackup)) {
  copyDir(adminBackup, adminPath);
  console.log('✓ Restored app/admin');
}

console.log('✓ Build complete! Upload the "out" folder to Hostinger.');
