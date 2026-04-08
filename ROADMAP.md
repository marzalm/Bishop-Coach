# ChessCoach - Development Roadmap

## Phase 1: Foundation ✅ COMPLETE
- [x] Project initialization with Next.js 14
- [x] Database schema with Prisma
- [x] API clients for Chess.com and Lichess
- [x] Claude AI client for analysis
- [x] Basic folder structure
- [x] Home page with landing
- [x] Import page UI
- [x] Dashboard page UI
- [x] Initial API routes

## Phase 2: Import & Analysis Pipeline (IN PROGRESS)
- [ ] Complete import endpoint with game fetching
- [ ] Game storage to database
- [ ] Stockfish wrapper for move analysis
- [ ] Error detection from games
- [ ] Claude analysis integration
- [ ] Weakness profile generation
- [ ] Testing import workflow

## Phase 3: Dashboard & Visualization
- [ ] User profile fetching
- [ ] Weakness display with charts
- [ ] Statistics calculations
- [ ] Recent games list
- [ ] Progress tracking
- [ ] Elo tracking

## Phase 4: Training Module
- [ ] Error replay mechanism
- [ ] Hint system (progressive reveals)
- [ ] Mastery scoring
- [ ] Anki-like scheduling
- [ ] Training statistics
- [ ] Feedback system

## Phase 5: Puzzles & Polish
- [ ] Lichess puzzle API integration
- [ ] Puzzle filtering by weakness
- [ ] Puzzle UI with evaluation
- [ ] Performance optimization
- [ ] Error handling & UX improvements
- [ ] Mobile responsiveness
- [ ] Analytics

## Technical Debt & Improvements
- [ ] Add error boundaries and error handling
- [ ] Implement loading states consistently
- [ ] Add form validation
- [ ] Set up authentication (if needed later)
- [ ] Add tests (unit and integration)
- [ ] Set up CI/CD pipeline
- [ ] Performance monitoring
- [ ] Database indexing optimization

## Known Issues / TODO
- [ ] Install Stockfish.js binary
- [ ] Setup @anthropic-ai/sdk package
- [ ] Complete error handling in all endpoints
- [ ] Add rate limiting for external APIs
- [ ] Implement caching strategy
