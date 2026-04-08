import { Chess } from 'chess.js';

export interface MoveEvaluation {
  move: string;
  before: number;
  after: number;
  loss: number;
  error: 'blunder' | 'mistake' | 'inaccuracy' | null;
}

/**
 * Determines error severity based on centipawn loss
 */
export function getErrorSeverity(centipawnLoss: number): 'blunder' | 'mistake' | 'inaccuracy' | null {
  if (centipawnLoss > 500) return 'blunder';
  if (centipawnLoss > 300) return 'mistake';
  if (centipawnLoss > 100) return 'inaccuracy';
  return null;
}

/**
 * Parses a PGN and returns the moves
 */
export function parsePGN(pgn: string): string[] {
  const chess = new Chess();
  
  try {
    chess.loadPgn(pgn);
    const moves: string[] = [];
    const history = chess.moves({ verbose: true });
    
    // Reset and replay moves to get all moves
    chess.reset();
    while (true) {
      const nextMoves = chess.moves({ verbose: true });
      if (nextMoves.length === 0) break;
      
      // Re-parse to get actual moves from PGN
      const moveMatch = pgn.match(/(\d+\.\s*)?([a-h][1-8])?([a-h][1-8]|[NBRQK][a-h]?[1-8]?[a-h][1-8]|[a-h]x[a-h][1-8]|0-0|0-0-0|[NBRQK][a-h]?[1-8]?x?[a-h][1-8])/g);
      break;
    }

    // Simple approach: use chess.js to validate
    chess.reset();
    const moves_list: string[] = [];
    
    // Extract moves from PGN using regex
    const movesRegex = /(\d+\.)\s+([a-zA-Z0-9\-+=#]+)\s+([a-zA-Z0-9\-+=#]+)?/g;
    let match;
    
    while ((match = movesRegex.exec(pgn)) !== null) {
      if (match[2]) moves_list.push(match[2]);
      if (match[3]) moves_list.push(match[3]);
    }

    return moves_list;
  } catch (error) {
    console.error('Error parsing PGN:', error);
    return [];
  }
}

/**
 * Maps chess categories to standardized category names
 */
export function mapErrorCategory(category: string | null): string | null {
  if (!category) return null;
  
  const categoryMap: Record<string, string> = {
    'tactic': 'tactic',
    'tactical': 'tactic',
    'tactical_mistake': 'tactic',
    'endgame': 'endgame',
    'opening': 'opening',
    'positional': 'positional',
    'positional_error': 'positional',
    'king_safety': 'kingsafety',
    'kingsafety': 'kingsafety',
    'tempo': 'tempo',
    'tempo_loss': 'tempo',
  };

  return categoryMap[category.toLowerCase()] || null;
}
