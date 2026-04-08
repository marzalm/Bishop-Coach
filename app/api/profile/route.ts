import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const timeControl = searchParams.get('timeControl') || 'blitz';

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (!['bullet', 'blitz', 'rapid'].includes(timeControl)) {
      return NextResponse.json(
        { error: 'Invalid time control. Must be bullet, blitz, or rapid' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const profile = await prisma.weaknessProfile.findUnique({
      where: {
        userId_timeControl: {
          userId,
          timeControl,
        },
      },
    });

    const gameCount = await prisma.game.count({
      where: {
        userId,
        timeControl,
      },
    });

    const weaknesses = profile?.weaknesses
      ? JSON.parse(profile.weaknesses)
      : [];

    return NextResponse.json({
      userId: user.id,
      timeControl,
      chesscomUsername: user.chesscomUsername,
      lichessUsername: user.lichessUsername,
      gameCount,
      weaknesses,
      lastAnalyzedAt: profile?.analyzedAt,
    });
  } catch (error) {
    console.error('Profile error:', error);
    return NextResponse.json(
      { error: 'Failed to load profile' },
      { status: 500 }
    );
  }
}
