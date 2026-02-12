import { NextResponse } from 'next/server';

// Solutions content that can be managed from admin
let solutionsContent = {
  title: "Our Solutions",
  subtitle: "Web Development Excellence",
  description: "Crafting modern, responsive web applications with cutting-edge technologies and AI integration.",
  buttonText: "See Our Projects",
  showProjects: true
};

export async function GET() {
  try {
    return NextResponse.json(solutionsContent);
  } catch (error) {
    console.error('Error fetching solutions content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch solutions content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    solutionsContent = { ...solutionsContent, ...body };
    
    return NextResponse.json(solutionsContent);
  } catch (error) {
    console.error('Error updating solutions content:', error);
    return NextResponse.json(
      { error: 'Failed to update solutions content' },
      { status: 500 }
    );
  }
}
