import { PrismaClient } from '@prisma/client';

// Avoid multiple instances of Prisma Client in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function getOrCreateUser(
  chesscomUsername?: string,
  lichessUsername?: string
) {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { chesscomUsername: chesscomUsername || undefined },
        { lichessUsername: lichessUsername || undefined },
      ],
    },
  });

  if (users.length > 0) {
    return users[0];
  }

  return prisma.user.create({
    data: {
      chesscomUsername: chesscomUsername || null,
      lichessUsername: lichessUsername || null,
    },
  });
}

export async function getUserGames(userId: string) {
  return prisma.game.findMany({
    where: { userId },
    include: { errors: true },
    orderBy: { playedAt: 'desc' },
  });
}

export async function getUserProfile(userId: string) {
  return prisma.weaknessProfile.findUnique({
    where: { userId },
  });
}
