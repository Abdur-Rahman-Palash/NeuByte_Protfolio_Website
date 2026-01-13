import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'markdown/blogs');

// GET - Fetch a single blog post
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const filePath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return NextResponse.json({
      slug,
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      coverImage: data.coverImage || '',
      tags: data.tags || [],
      author: data.author || null,
      content: content || '',
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT - Update a blog post
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
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

    const filePath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Create frontmatter
    const frontmatter = `---
title: "${(title || '').replace(/"/g, '\\"')}"
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

    // Write file
    fs.writeFileSync(filePath, frontmatter, 'utf8');

    return NextResponse.json({
      success: true,
      message: 'Blog post updated successfully',
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a blog post
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const filePath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    fs.unlinkSync(filePath);

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
