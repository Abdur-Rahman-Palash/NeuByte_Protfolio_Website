# Project Images

This directory contains project images for the Solutions page.

## How to Add Project Images:

1. **Image Format**: Use JPG, PNG, or WebP format
2. **Image Size**: Recommended 1200x800 pixels for optimal display
3. **File Naming**: Use descriptive names like:
   - `ecommerce.jpg` - For e-commerce projects
   - `dashboard.jpg` - For dashboard projects  
   - `mobile.jpg` - For mobile apps
   - `ai.jpg` - For AI/ML projects
   - `analytics.jpg` - For analytics projects

## Current Setup:

The projects are currently using existing blog images as placeholders:
- Project 1: `/images/blog/blog-01.jpg`
- Project 2: `/images/blog/blog-02.jpg`
- Project 3: `/images/blog/blog-03.jpg`
- Project 4: `/images/blog/blog-01.jpg`
- Project 5: `/images/blog/blog-02.jpg`

## To Use Custom Images:

1. Add your project images to this directory
2. Update the image paths in `/app/api/projects/route.ts`
3. The changes will reflect immediately on the Solutions page

## Example Update in API:

```javascript
{
  id: '1',
  title: 'Your Project',
  image: '/images/projects/your-custom-image.jpg',  // Update this path
  // ... other fields
}
```

## Notes:

- Images are served from the `/public/` directory
- Use relative paths starting with `/images/projects/`
- The Solutions page will automatically pick up new images
- Admin panel at `/admin/projects/` can be used to manage projects
