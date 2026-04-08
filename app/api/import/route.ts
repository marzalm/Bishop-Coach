import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateUser } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { chesscomUsername, lichessUsername, timeControl } = body;

    if (!chesscomUsername && !lichessUsername) {
      return NextResponse.json(
        { error: 'At least one username is required' },
        { status: 400 }
      );
    }

    if (!['bullet', 'blitz', 'rapid'].includes(timeControl)) {
      return NextResponse.json(
        { error: 'Invalid time control. Must be bullet, blitz, or rapid' },
        { status: 400 }
      );
    }

    const user = await getOrCreateUser(chesscomUsername, lichessUsername);

    // TODO: Queue game import jobs here
    // This would trigger the analysis pipeline
    // Need to filter by timeControl and save it to session/user context

    return NextResponse.json({
      userId: user.id,
      timeControl,
      message: `Import started for ${timeControl} games. Check back soon for your analysis.`,
    });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      { error: 'Failed to start import' },
      { status: 500 }
    );
  }
}
