import { NextResponse } from 'next/server';

// In-memory storage for projects (in production, use a database)
let projects = [
  {
    id: '1',
    title: 'AI-Powered E-Commerce Platform',
    description: 'A modern e-commerce platform with AI-powered product recommendations and chatbot integration.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'OpenAI API'],
    demoLink: 'https://demo-neubyte-ecommerce.vercel.app',
    image: '/images/blog/blog-01.jpg',
    featured: true,
    category: 'web'
  },
  {
    id: '2',
    title: 'Smart Task Management System',
    description: 'An intelligent task management app with AI-powered prioritization and team collaboration features.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    demoLink: 'https://demo-neubyte-tasks.vercel.app',
    image: '/images/blog/blog-02.jpg',
    featured: true,
    category: 'web'
  },
  {
    id: '3',
    title: 'Real-Time Analytics Dashboard',
    description: 'A comprehensive analytics dashboard with real-time data visualization and reporting.',
    techStack: ['Vue.js', 'D3.js', 'Express', 'PostgreSQL'],
    demoLink: 'https://demo-neubyte-analytics.vercel.app',
    image: '/images/blog/blog-03.jpg',
    featured: false,
    category: 'dashboard'
  }
];

export async function GET() {
  try {
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProject = {
      id: Date.now().toString(),
      ...body,
      featured: false,
    };
    
    projects.push(newProject);
    
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    
    const projectIndex = projects.findIndex(p => p.id === id);
    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    projects[projectIndex] = { ...projects[projectIndex], ...updateData };
    
    return NextResponse.json(projects[projectIndex]);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }
    
    const projectIndex = projects.findIndex(p => p.id === id);
    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    projects.splice(projectIndex, 1);
    
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
