import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'markdown', 'blogs');

export async function GET() {
  try {
    // Read all markdown files from the blogs directory
    const slugs = fs.readdirSync(postsDirectory);
    
    const posts = slugs.map((slug) => {
      const fullPath = path.join(postsDirectory, slug);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = require('gray-matter')(fileContents);
      
      return {
        slug: slug.replace('.md', ''),
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        coverImage: data.coverImage || '',
        tags: data.tags || [],
        author: data.author || null,
        content: content.trim()
      };
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, title, date, excerpt, coverImage, tags, author, content } = body;
    
    // Create frontmatter
    const frontmatter = `---
title: ${title}
date: ${date}
excerpt: ${excerpt}
coverImage: ${coverImage}
tags: [${tags.join(', ')}]
author:
  name: ${author.name}
  image: ${author.image}
  designation: ${author.designation}
---

${content}
`;

    // Create filename from slug
    const filename = `${slug}.md`;
    const fullPath = path.join(postsDirectory, filename);
    
    fs.writeFileSync(fullPath, frontmatter, 'utf8');
    
    return NextResponse.json({ 
      message: 'Blog post created successfully',
      slug: slug 
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { slug, title, date, excerpt, coverImage, tags, author, content } = body;
    
    // Create frontmatter
    const frontmatter = `---
title: ${title}
date: ${date}
excerpt: ${excerpt}
coverImage: ${coverImage}
tags: [${tags.join(', ')}]
author:
  name: ${author.name}
  image: ${author.image}
  designation: ${author.designation}
---

${content}
`;

    // Create filename from slug
    const filename = `${slug}.md`;
    const fullPath = path.join(postsDirectory, filename);
    
    fs.writeFileSync(fullPath, frontmatter, 'utf8');
    
    return NextResponse.json({ 
      message: 'Blog post updated successfully',
      slug: slug 
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('id');
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Blog post slug is required' },
        { status: 400 }
      );
    }
    
    const filename = `${slug}.md`;
    const fullPath = path.join(postsDirectory, filename);
    
    // Delete the file
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
    
    return NextResponse.json({ 
      message: 'Blog post deleted successfully',
      slug: slug 
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
