import axios from 'axios';

const BASE_URL = 'https://api.chess.com/pub';

export interface ChessComGame {
  url: string;
  pgn: string;
  time_control: string;
  end_time: number;
  rated: boolean;
  accuracies?: {
    white: number;
    black: number;
  };
  tcn?: string;
  uuid?: string;
  rules?: string;
  white: {
    username: string;
    rating: number;
    result: string;
    uuid?: string;
    id?: string;
  };
  black: {
    username: string;
    rating: number;
    result: string;
    uuid?: string;
    id?: string;
  };
}

export interface ChessComGamesResponse {
  games: ChessComGame[];
}

export async function fetchChessComGames(username: string, months?: { year: number; month: number }[]) {
  try {
    if (months && months.length > 0) {
      // Fetch specific months
      const allGames: ChessComGame[] = [];
      for (const { year, month } of months) {
        const response = await axios.get<ChessComGamesResponse>(
          `${BASE_URL}/player/${username}/games/${year}/${String(month).padStart(2, '0')}`
        );
        allGames.push(...response.data.games);
      }
      return allGames;
    } else {
      // Fetch last 3 months
      const now = new Date();
      const months = [];
      for (let i = 0; i < 3; i++) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        months.push({
          year: date.getFullYear(),
          month: date.getMonth() + 1,
        });
      }
      return fetchChessComGames(username, months);
    }
  } catch (error) {
    console.error('Error fetching Chess.com games:', error);
    throw new Error(`Failed to fetch Chess.com games for ${username}`);
  }
}

export async function getPlayerProfile(username: string) {
  try {
    const response = await axios.get(`${BASE_URL}/player/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Chess.com profile:', error);
    throw new Error(`Failed to fetch Chess.com profile for ${username}`);
  }
}
