#!/bin/bash

# NeuByte Portfolio - Hostinger Deployment Script
# Run this script to prepare your website for Hostinger hosting

echo "🚀 Preparing NeuByte Portfolio for Hostinger deployment..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo ""
    echo "📁 Files ready for upload in: ./out/"
    echo ""
    echo "📋 Next steps:"
    echo "1. Upload ALL contents of 'out/' folder to Hostinger public_html"
    echo "2. Make sure .htaccess file is uploaded (it's hidden)"
    echo "3. Test your website at your domain"
    echo ""
    echo "📧 Contact form uses Formspree - check your email for submissions"
    echo ""
    echo "🎉 Deployment preparation complete!"
else
    echo "❌ Build failed! Please check for errors."
    exit 1
fi