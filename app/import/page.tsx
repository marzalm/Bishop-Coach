'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ImportPage() {
  const [chesscomUsername, setChesscomUsername] = useState('');
  const [lichessUsername, setLichessUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chesscomUsername,
          lichessUsername,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to import games');
      }

      const data = await response.json();
      window.location.href = `/dashboard?userId=${data.userId}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-gray-400 hover:text-white text-sm mb-4 inline-block">
            ← Back to home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">
            Import Games
          </h1>
          <p className="text-gray-400">
            Connect your chess accounts to begin analysis
          </p>
        </div>

        {/* Import Form */}
        <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-700 p-8 rounded">
          {error && (
            <div className="mb-6 p-4 bg-red-900 border border-red-700 text-red-200 rounded">
              Error: {error}
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="chesscom" className="block text-white font-semibold mb-2">
              Chess.com Username
            </label>
            <input
              id="chesscom"
              type="text"
              value={chesscomUsername}
              onChange={(e) => setChesscomUsername(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white"
              placeholder="Enter your Chess.com username"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="lichess" className="block text-white font-semibold mb-2">
              Lichess Username
            </label>
            <input
              id="lichess"
              type="text"
              value={lichessUsername}
              onChange={(e) => setLichessUsername(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white"
              placeholder="Enter your Lichess username"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Importing...' : 'Import Games'}
          </button>
        </form>
      </div>
    </main>
  );
}
                type="text"
                placeholder="username_here"
                value={chesscomUsername}
                onChange={(e) => setChesscomUsername(e.target.value)}
                className="w-full px-4 py-2 bg-black border-2 border-cyan-600 text-lime-400 placeholder-gray-700 focus:outline-none focus:border-magenta-500 focus:shadow-[0_0_10px_rgba(255,0,255,0.5)] font-mono transition-all"
              />
              <p className="text-gray-600 font-mono text-xs mt-1">
                »» public games only
              </p>
            </div>

            <div className="mb-8">
              <label htmlFor="lichess" className="block text-cyan-400 font-bold mb-2 font-mono text-sm">
                &gt; LICHESS USERNAME
              </label>
              <input
                id="lichess"
                type="text"
                placeholder="username_here"
                value={lichessUsername}
                onChange={(e) => setLichessUsername(e.target.value)}
                className="w-full px-4 py-2 bg-black border-2 border-cyan-600 text-lime-400 placeholder-gray-700 focus:outline-none focus:border-magenta-500 focus:shadow-[0_0_10px_rgba(255,0,255,0.5)] font-mono transition-all"
              />
              <p className="text-gray-600 font-mono text-xs mt-1">
                »» public games only
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || (!chesscomUsername && !lichessUsername)}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-magenta-600 hover:from-cyan-500 hover:to-magenta-500 disabled:opacity-30 disabled:cursor-not-allowed text-black font-bold font-mono transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,0,255,0.5)]"
            >
              {loading ? '⟳ INITIALIZING...' : '▶ EXECUTE IMPORT'}
            </button>
          </div>
        </form>

        {/* Info */}
        <div className="mt-12 space-y-6">
          <div className="bg-gray-950 border-2 border-lime-500 p-6 shadow-[0_0_15px_rgba(0,255,0,0.2)]">
            <h3 className="text-lime-400 font-bold mb-2 font-mono text-sm">&gt;&gt; SYSTEM ANALYSIS</h3>
            <p className="text-gray-400 font-mono text-xs leading-relaxed">
              Will fetch your recent games and analyze with<br />
              advanced AI. Processing time: 5-30 min depending<br />
              on your game library size.
            </p>
          </div>

          <div className="bg-gray-950 border-2 border-magenta-500 p-6 shadow-[0_0_15px_rgba(255,0,255,0.2)]">
            <h3 className="text-magenta-400 font-bold mb-2 font-mono text-sm">&gt;&gt; SECURITY PROTOCOL</h3>
            <p className="text-gray-400 font-mono text-xs leading-relaxed">
              All data encrypted locally. Zero network tracking.<br />
              Your chess history belongs to you. Always.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
