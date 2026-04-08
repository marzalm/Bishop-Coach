# ChessCoach

AI-powered chess training platform. Import your games from Chess.com or Lichess, get analyzed with Stockfish + Claude, detect patterns, and train on your weaknesses.

## Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Database**: SQLite via Prisma ORM
- **Chess Analysis**: Stockfish.js (WebAssembly)
- **AI**: Anthropic Claude API
- **UI**: React, Tailwind CSS, react-chessboard
- **Charts**: Recharts

## Features

- ✅ Import games from Chess.com and Lichess
- ✅ Analyze games with Stockfish + Claude
- ✅ Detect weakness patterns
- ✅ Personalized training dashboard
- ✅ Error replay and mastery tracking
- ✅ Targeted puzzle practice
- ✅ Progress tracking and visualizations

## Setup

1. **Clone and install**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.local.example .env.local
   # Add your ANTHROPIC_API_KEY
   ```

3. **Setup database**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app              → Next.js pages and API routes
  /api            → Backend endpoints
  /dashboard      → Main dashboard
  /import         → Import page
  /[other]        → Feature pages
/lib              → Utilities and helpers
  /api            → API clients (Chess.com, Lichess, Claude)
  /analysis       → Chess analysis logic
  /db             → Database utilities
/prisma           → Database schema and migrations
```

## Development

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run start` - Run production server
- `npm run lint` - Run linter
- `npx prisma studio` - Open database UI

## License

MIT
