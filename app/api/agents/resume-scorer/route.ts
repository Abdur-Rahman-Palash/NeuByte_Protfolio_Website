import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resumeText } = body;

    if (!resumeText) {
      return NextResponse.json({ error: 'Resume text is required' }, { status: 400 });
    }

    const apiKey = process.env.MIND_STUDIO_API_KEY;
    const baseUrl = process.env.MIND_STUDIO_BASE_URL || 'https://api.mindstudio.ai';

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Assuming Mind Studio has an endpoint for resume scoring
    const response = await fetch(`${baseUrl}/agents/resume-scorer/score`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ text: resumeText }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to score resume' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Resume Scorer API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}