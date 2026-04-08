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
    <main className="min-h-screen bg-black border-t-4 border-cyan-500 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(0,255,255,.1)_25%,rgba(0,255,255,.1)_26%,transparent_27%,transparent_74%,rgba(0,255,255,.1)_75%,rgba(0,255,255,.1)_76%,transparent_77%,transparent)] bg-[length:50px_50px]"></div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="mb-12 border-l-4 border-magenta-500 pl-4">
          <Link href="/" className="text-cyan-400 hover:text-magenta-400 text-sm mb-4 inline-block font-mono transition-colors hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]">
            ↳ BACK TO MAIN.SYS
          </Link>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-cyan-400 mb-2 font-mono tracking-widest">
            [ IMPORT GAMES ]
          </h1>
          <p className="text-lime-400 font-mono text-sm animate-pulse">
            »» CONNECT YOUR CHESS ACCOUNTS ••••••
          </p>
        </div>

        {/* Import Form */}
        <form onSubmit={handleSubmit} className="bg-gray-950 border-2 border-cyan-500 p-8 relative overflow-hidden shadow-[0_0_20px_rgba(0,255,255,0.3)]">
          {/* Scanlines effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
          </div>

          <div className="relative z-10">
            {error && (
              <div className="mb-6 p-4 bg-red-950 border-l-4 border-red-500 text-red-200 font-mono text-sm animate-pulse">
                [ ERROR ] ⚠ {error}
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="chesscom" className="block text-cyan-400 font-bold mb-2 font-mono text-sm">
                &gt; CHESS.COM USERNAME
              </label>
              <input
                id="chesscom"
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
