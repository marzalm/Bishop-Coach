/**
 * Normalize time control from different sources into standard categories
 * Standard: "bullet" | "blitz" | "rapid"
 */

export function normalizeTimeControl(
  timeControl: string | number | undefined,
  source: 'chesscom' | 'lichess'
): 'bullet' | 'blitz' | 'rapid' {
  if (!timeControl) return 'blitz';

  if (source === 'chesscom') {
    // Chess.com uses: bullet, blitz, rapid, classical
    const normalized = String(timeControl).toLowerCase();
    if (normalized === 'bullet') return 'bullet';
    if (normalized === 'blitz') return 'blitz';
    if (normalized === 'rapid') return 'rapid';
    if (normalized === 'classical') return 'rapid'; // Treat classical as rapid
    return 'blitz'; // Default fallback
  }

  if (source === 'lichess') {
    // Lichess uses: bullet, blitz, rapid, classical, correspondence
    // perf types: bullet, blitz, rapid, classical, correspondence, puzzle, ultraBullet
    const normalized = String(timeControl).toLowerCase();
    if (normalized === 'bullet' || normalized === 'ultrabullet') return 'bullet';
    if (normalized === 'blitz') return 'blitz';
    if (normalized === 'rapid' || normalized === 'classical') return 'rapid';
    if (normalized === 'correspondence') return 'rapid'; // Treat correspondence as rapid
    return 'blitz'; // Default fallback
  }

  return 'blitz';
}

/**
 * Get time control category for a game duration in seconds
 * Used for APIs that provide duration instead of time control name
 */
export function getTimeControlFromDuration(
  baseTime: number,
  increment: number = 0
): 'bullet' | 'blitz' | 'rapid' {
  const totalTime = baseTime + increment * 40; // Estimate based on 40 moves

  if (totalTime <= 180) return 'bullet'; // <= 3 minutes
  if (totalTime <= 600) return 'blitz'; // <= 10 minutes
  return 'rapid'; // > 10 minutes
}

/**
 * Check if time control matches user's preference
 */
export function matchesTimeControl(
  gameTimeControl: 'bullet' | 'blitz' | 'rapid',
  preferredTimeControl: 'bullet' | 'blitz' | 'rapid'
): boolean {
  return gameTimeControl === preferredTimeControl;
}
