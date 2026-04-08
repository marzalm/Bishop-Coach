import axios from 'axios';

const BASE_URL = 'https://lichess.org/api';

export interface LichessGame {
  id: string;
  rated: boolean;
  variant: string;
  speed: string;
  perf: string;
  createdAt: number;
  lastMoveAt: number;
  status: string;
  players: {
    white: {
      user: { name: string; id: string };
      rating: number;
      ratingDiff: number;
      analysis?: { inaccuracy: number; mistake: number; blunder: number };
    };
    black: {
      user: { name: string; id: string };
      rating: number;
      ratingDiff: number;
      analysis?: { inaccuracy: number; mistake: number; blunder: number };
    };
  };
  pgn: string;
}

export async function fetchLichessGames(username: string, maxGames = 200) {
  try {
    const response = await axios.get<string>(
      `${BASE_URL}/games/user/${username}`,
      {
        headers: {
          'Accept': 'application/x-ndjson',
        },
        params: {
          max: maxGames,
          pgnInJson: true,
        },
      }
    );

    // Parse NDJSON response
    const games: LichessGame[] = response.data
      .trim()
      .split('\n')
      .filter(line => line.length > 0)
      .map(line => JSON.parse(line));

    return games;
  } catch (error) {
    console.error('Error fetching Lichess games:', error);
    throw new Error(`Failed to fetch Lichess games for ${username}`);
  }
}

export async function getLichessProfile(username: string) {
  try {
    const response = await axios.get(`${BASE_URL}/user/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Lichess profile:', error);
    throw new Error(`Failed to fetch Lichess profile for ${username}`);
  }
}

export async function getNextPuzzle(theme?: string, difficulty?: string) {
  try {
    const params: Record<string, string> = {};
    if (theme) params.theme = theme;
    if (difficulty) params.difficulty = difficulty;

    const response = await axios.get(`${BASE_URL}/puzzle/next`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching puzzle:', error);
    throw new Error('Failed to fetch puzzle');
  }
}
