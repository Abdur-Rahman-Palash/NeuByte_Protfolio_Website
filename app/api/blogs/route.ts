import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'markdown/blogs');

// GET - Fetch all blog posts
export async function GET() {
  try {
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.log('Posts directory does not exist, returning empty array');
      return NextResponse.json({ posts: [] });
    }

    const files = fs.readdirSync(postsDirectory);
    const mdFiles = files.filter((file) => file.endsWith('.md'));
    
    if (mdFiles.length === 0) {
      return NextResponse.json({ posts: [] });
    }

    const posts = mdFiles
      .map((file) => {
        try {
          const filePath = path.join(postsDirectory, file);
          if (!fs.existsSync(filePath)) {
            console.warn(`File not found: ${filePath}`);
            return null;
          }
          const fileContents = fs.readFileSync(filePath, 'utf8');
          if (!fileContents || fileContents.trim().length === 0) {
            console.warn(`Empty file: ${file}`);
            return null;
          }
          const { data } = matter(fileContents);
          return {
            slug: file.replace(/\.md$/, ''),
            title: data.title || '',
            date: data.date || '',
            excerpt: data.excerpt || '',
            coverImage: data.coverImage || '',
            tags: Array.isArray(data.tags) ? data.tags : [],
            author: data.author || null,
          };
        } catch (fileError: any) {
          console.error(`Error processing file ${file}:`, fileError?.message || fileError);
          return null;
        }
      })
      .filter((post): post is NonNullable<typeof post> => post !== null)
      .sort((a, b) => {
        const dateA = a.date || '';
        const dateB = b.date || '';
        return dateB.localeCompare(dateA);
      });

    return NextResponse.json({ posts });
  } catch (error: any) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch blogs',
        message: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST - Create a new blog post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      date,
      excerpt,
      coverImage,
      tags,
      author,
      content,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if file already exists
    const filePath = path.join(postsDirectory, `${slug}.md`);
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'A blog post with this title already exists' },
        { status: 400 }
      );
    }

    // Create frontmatter
    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date || new Date().toISOString().split('T')[0]}"
excerpt: "${(excerpt || '').replace(/"/g, '\\"')}"
coverImage: "${coverImage || ''}"
tags: ${JSON.stringify(tags || [])}
author:
  name: "${(author?.name || '').replace(/"/g, '\\"')}"
  image: "${author?.image || ''}"
  designation: "${(author?.designation || '').replace(/"/g, '\\"')}"
---

${content || ''}`;

    // Ensure directory exists
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }

    // Write file
    fs.writeFileSync(filePath, frontmatter, 'utf8');

    return NextResponse.json({
      success: true,
      slug,
      message: 'Blog post created successfully',
    });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create blog post',
        message: error?.message || 'Unknown error',
        details: error?.stack
      },
      { status: 500 }
    );
  }
}
