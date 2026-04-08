'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ImportPage() {
  const [chesscomUsername, setChesscomUsername] = useState('');
  const [lichessUsername, setLichessUsername] = useState('');
  const [timeControl, setTimeControl] = useState<'bullet' | 'blitz' | 'rapid'>('blitz');
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
          timeControl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to import games');
      }

      const data = await response.json();
      window.location.href = `/dashboard?userId=${data.userId}&timeControl=${timeControl}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block">
            ← Back to home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Import Your Games</h1>
          <p className="text-slate-400">
            Connect your Chess.com or Lichess account to import and analyze your games
          </p>
        </div>

        {/* Import Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-900 border border-red-700 text-red-200 rounded">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="chesscom" className="block text-white font-semibold mb-2">
              Chess.com Username (optional)
            </label>
            <input
              id="chesscom"
              type="text"
              placeholder="your_username"
              value={chesscomUsername}
              onChange={(e) => setChesscomUsername(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
            <p className="text-slate-400 text-sm mt-1">
              We'll import your games from Chess.com
            </p>
          </div>

          <div className="mb-8">
            <label htmlFor="lichess" className="block text-white font-semibold mb-2">
              Lichess Username (optional)
            </label>
            <input
              id="lichess"
              type="text"
              placeholder="your_username"
              value={lichessUsername}
              onChange={(e) => setLichessUsername(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
            <p className="text-slate-400 text-sm mt-1">
              We'll import your games from Lichess
            </p>
          </div>

          {/* Time Control Selection */}
          <div className="mb-8">
            <label className="block text-white font-semibold mb-4">
              Which time control do you want to focus on?
            </label>
            <div className="grid grid-cols-3 gap-4">
              {['bullet', 'blitz', 'rapid'].map((tc) => (
                <button
                  key={tc}
                  type="button"
                  onClick={() => setTimeControl(tc as 'bullet' | 'blitz' | 'rapid')}
                  className={`p-4 rounded-lg font-semibold transition ${
                    timeControl === tc
                      ? 'bg-blue-600 text-white border-2 border-blue-500'
                      : 'bg-slate-700 text-slate-300 border-2 border-slate-600 hover:border-blue-500'
                  }`}
                >
                  <div className="capitalize text-lg">{tc}</div>
                  <div className="text-xs mt-1 opacity-75">
                    {tc === 'bullet' && '1-2 min'}
                    {tc === 'blitz' && '3-5 min'}
                    {tc === 'rapid' && '10+ min'}
                  </div>
                </button>
              ))}
            </div>
            <p className="text-slate-400 text-sm mt-3">
              Your analysis will focus only on {timeControl} games to give tailored insights
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || (!chesscomUsername && !lichessUsername)}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
          >
            {loading ? 'Importing...' : 'Start Import'}
          </button>
        </form>

        {/* Info */}
        <div className="mt-12 space-y-6">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
            <h3 className="text-white font-semibold mb-2">📊 Why time-specific analysis?</h3>
            <p className="text-slate-400 text-sm">
              Your weaknesses differ by time control. In bullet, you might make tactical blunders. In rapid, positional understanding matters more. We'll give you targeted coaching.
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
            <h3 className="text-white font-semibold mb-2">🔒 Your data is private</h3>
            <p className="text-slate-400 text-sm">
              All games are stored locally. We never share your data with third parties.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
