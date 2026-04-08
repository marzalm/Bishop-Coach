# ChessCoach Development Setup

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup database**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

3. **Setup environment**
   - Copy `.env.local` and add your `ANTHROPIC_API_KEY`

4. **Run development server**
   ```bash
   npm run dev
   ```

Access the app at http://localhost:3000

## Project Structure

- `/app` - Next.js App Router pages and API routes
- `/lib` - Shared utilities, API clients, database helpers
  - `/api` - External API clients (Chess.com, Lichess, Claude)
  - `/analysis` - Chess analysis logic
- `/prisma` - Database schema

## Key Technologies

- **Next.js 14** with TypeScript
- **Prisma ORM** with SQLite
- **Tailwind CSS** for styling
- **chess.js** for move validation
- **react-chessboard** for UI
- **Anthropic Claude** for AI analysis

## Development Workflow

### Adding Features

1. Create database models in `/prisma/schema.prisma`
2. Run `npx prisma db push` to sync
3. Create API routes in `/app/api`
4. Create pages in `/app`
5. Add utilities to `/lib`

### Database

```bash
# View data
npx prisma studio

# Create migration
npx prisma migrate dev --name migration_name

# Generate client
npx prisma generate
```

### Build & Deploy

```bash
npm run build
npm run start
```

## Environment Variables

Add these to `.env.local`:
- `DATABASE_URL` - SQLite path (default: `file:./prisma/dev.db`)
- `ANTHROPIC_API_KEY` - Your Claude API key for analysis
- `CHESS_COM_API_BASE` - Chess.com API (default: `https://api.chess.com/pub`)
- `LICHESS_API_BASE` - Lichess API (default: `https://lichess.org/api`)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Run production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Sync database
- `npm run db:studio` - Open Prisma Studio
