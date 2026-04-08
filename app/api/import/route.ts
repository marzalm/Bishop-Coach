import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateUser } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { chesscomUsername, lichessUsername } = body;

    if (!chesscomUsername && !lichessUsername) {
      return NextResponse.json(
        { error: 'At least one username is required' },
        { status: 400 }
      );
    }

    const user = await getOrCreateUser(chesscomUsername, lichessUsername);

    // TODO: Queue game import jobs here
    // This would trigger the analysis pipeline

    return NextResponse.json({
      userId: user.id,
      message: 'Import started. Check back soon for your analysis.',
    });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      { error: 'Failed to start import' },
      { status: 500 }
    );
  }
}
