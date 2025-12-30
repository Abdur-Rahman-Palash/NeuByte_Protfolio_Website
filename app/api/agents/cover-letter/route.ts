import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobDescription, userInfo } = body;

    if (!jobDescription || !userInfo) {
      return NextResponse.json({ error: 'Job description and user info are required' }, { status: 400 });
    }

    const apiKey = process.env.MIND_STUDIO_API_KEY;
    const baseUrl = process.env.MIND_STUDIO_BASE_URL || 'https://api.mindstudio.ai';

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Assuming Mind Studio has an endpoint for cover letter generation
    const response = await fetch(`${baseUrl}/agents/cover-letter/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ jobDescription, userInfo }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to generate cover letter' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Cover Letter API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}