import { ChessComGame } from '@/lib/api/chesscom';
import { LichessGame } from '@/lib/api/lichess';
import { normalizeTimeControl } from './timeControl';

export interface NormalizedGame {
  id: string;
  source: 'chesscom' | 'lichess';
  pgn: string;
  playedAt: Date;
  result: 'win' | 'loss' | 'draw';
  color: 'white' | 'black';
  elo: number;
  timeControl: 'bullet' | 'blitz' | 'rapid';
  opponent: string;
}

/**
 * Normalize Chess.com game to our standard format
 */
export function normalizeChessComGame(game: ChessComGame): NormalizedGame {
  const userColor = game.white.username.toLowerCase() === game.white.username.toLowerCase() ? 'white' : 'black';
  const userResult = userColor === 'white' ? game.white.result : game.black.result;
  const userElo = userColor === 'white' ? game.white.rating : game.black.rating;
  const opponent = userColor === 'white' ? game.black.username : game.white.username;

  return {
    id: game.url.split('/').pop() || String(game.end_time),
    source: 'chesscom',
    pgn: game.pgn,
    playedAt: new Date(game.end_time * 1000),
    result: (userResult === '1' ? 'win' : userResult === '0' ? 'loss' : 'draw') as 'win' | 'loss' | 'draw',
    color: userColor as 'white' | 'black',
    elo: userElo,
    timeControl: normalizeTimeControl(game.time_control, 'chesscom'),
    opponent,
  };
}

/**
 * Normalize Lichess game to our standard format
 */
export function normalizeLichessGame(game: LichessGame, username: string): NormalizedGame {
  const userColor = game.players.white.user.id.toLowerCase() === username.toLowerCase() ? 'white' : 'black';
  const userPlayer = userColor === 'white' ? game.players.white : game.players.black;
  const opponentPlayer = userColor === 'white' ? game.players.black : game.players.white;

  // Determine result
  let result: 'win' | 'loss' | 'draw' = 'draw';
  if (game.status === 'mate') {
    result = userPlayer.ratingDiff > 0 ? 'win' : 'loss';
  } else if (game.status === 'outoftime') {
    result = userPlayer.ratingDiff > 0 ? 'win' : 'loss';
  } else if (game.status === 'resign') {
    result = userPlayer.ratingDiff > 0 ? 'win' : 'loss';
  }

  return {
    id: game.id,
    source: 'lichess',
    pgn: game.pgn,
    playedAt: new Date(game.createdAt),
    result,
    color: userColor as 'white' | 'black',
    elo: userPlayer.rating,
    timeControl: normalizeTimeControl(game.perf, 'lichess'),
    opponent: opponentPlayer.user.name,
  };
}

/**
 * Filter games by time control
 */
export function filterGamesByTimeControl(
  games: NormalizedGame[],
  timeControl: 'bullet' | 'blitz' | 'rapid'
): NormalizedGame[] {
  return games.filter(game => game.timeControl === timeControl);
}
