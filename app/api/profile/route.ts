import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const gameCount = await prisma.game.count({
      where: { userId },
    });

    const weaknesses = user.profile?.weaknesses
      ? JSON.parse(user.profile.weaknesses)
      : [];

    return NextResponse.json({
      userId: user.id,
      chesscomUsername: user.chesscomUsername,
      lichessUsername: user.lichessUsername,
      gameCount,
      weaknesses,
      lastAnalyzedAt: user.profile?.updatedAt,
    });
  } catch (error) {
    console.error('Profile error:', error);
    return NextResponse.json(
      { error: 'Failed to load profile' },
      { status: 500 }
    );
  }
}
