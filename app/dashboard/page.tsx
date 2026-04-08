'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Weakness {
  category: string;
  count: number;
  score: number;
}

interface DashboardData {
  userId: string;
  timeControl: string;
  chesscomUsername?: string;
  lichessUsername?: string;
  gameCount: number;
  weaknesses: Weakness[];
  lastAnalyzedAt?: string;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeControl, setTimeControl] = useState<'bullet' | 'blitz' | 'rapid'>('blitz');

  const fetchDashboard = async (tc: string) => {
    try {
      const params = new URLSearchParams(window.location.search);
      const userId = params.get('userId');

      if (!userId) {
        setError('No user ID provided');
        return;
      }

      setLoading(true);
      const response = await fetch(`/api/profile?userId=${userId}&timeControl=${tc}`);
      if (!response.ok) {
        throw new Error('Failed to load dashboard');
      }

      const dashboardData = await response.json();
      setData(dashboardData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard(timeControl);
  }, [timeControl]);

  const handleTimeControlChange = (tc: 'bullet' | 'blitz' | 'rapid') => {
    setTimeControl(tc);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black border-t-4 border-cyan-500 flex items-center justify-center">
        <div className="text-cyan-400 font-mono text-lg animate-pulse">
          [ LOADING PROFILE... ]
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black border-t-4 border-cyan-500">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link href="/" className="text-cyan-400 hover:text-magenta-400 text-sm mb-4 inline-block font-mono">
            ↳ BACK TO MAIN
          </Link>
          <div className="p-6 bg-red-950 border-2 border-red-500 text-red-200 font-mono">
            [ ERROR ] {error}
          </div>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-black border-t-4 border-cyan-500 flex items-center justify-center">
        <div className="text-cyan-400 font-mono">No data available</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black border-t-4 border-cyan-500 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(0,255,255,.1)_25%,rgba(0,255,255,.1)_26%,transparent_27%,transparent_74%,rgba(0,255,255,.1)_75%,rgba(0,255,255,.1)_76%,transparent_77%,transparent)] bg-[length:50px_50px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <Link href="/" className="text-cyan-400 hover:text-magenta-400 text-sm mb-4 inline-block font-mono transition-colors hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]">
          ↳ BACK TO MAIN
        </Link>

        <div className="mb-12 border-l-4 border-magenta-500 pl-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-cyan-400 mb-2 font-mono tracking-widest">
            [ YOUR PROFILE ]
          </h1>
          <p className="text-lime-400 font-mono text-sm">
            »» analyzing <span className="text-magenta-400 font-bold">{timeControl.toUpperCase()}</span> games
          </p>
        </div>

        {/* Time Control Selector */}
        <div className="mb-8 flex gap-3">
          {(['bullet', 'blitz', 'rapid'] as const).map((tc) => (
            <button
              key={tc}
              onClick={() => handleTimeControlChange(tc)}
              className={`px-6 py-2 font-mono font-bold uppercase text-xs transition-all ${ 
                timeControl === tc
                  ? 'bg-gradient-to-r from-cyan-600 to-magenta-600 text-black shadow-[0_0_10px_rgba(0,255,255,0.5)]'
                  : 'bg-gray-900 border-2 border-gray-700 text-gray-400 hover:border-cyan-500 hover:text-cyan-400'
              }`}
            >
              [ {tc} ]
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-950 border-2 border-cyan-500 p-6 shadow-[0_0_10px_rgba(0,255,255,0.2)]">
            <h3 className="text-cyan-400 text-xs font-mono font-bold mb-2">» GAMES ANALYZED</h3>
            <p className="text-3xl font-bold text-lime-400 font-mono">{data.gameCount}</p>
          </div>
          <div className="bg-gray-950 border-2 border-magenta-500 p-6 shadow-[0_0_10px_rgba(255,0,255,0.2)]">
            <h3 className="text-magenta-400 text-xs font-mono font-bold mb-2">» WEAKNESSES FOUND</h3>
            <p className="text-3xl font-bold text-lime-400 font-mono">{data.weaknesses.length}</p>
          </div>
          <div className="bg-gray-950 border-2 border-lime-500 p-6 shadow-[0_0_10px_rgba(0,255,0,0.2)]">
            <h3 className="text-lime-400 text-xs font-mono font-bold mb-2">» LAST UPDATED</h3>
            <p className="text-lime-400 font-mono text-sm">
              {data.lastAnalyzedAt ? new Date(data.lastAnalyzedAt).toLocaleDateString() : '[ NEVER ]'}
            </p>
          </div>
        </div>

        {/* Weaknesses */}
        <div className="bg-gray-950 border-2 border-cyan-500 p-8 mb-12 shadow-[0_0_20px_rgba(0,255,255,0.3)]">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6 font-mono tracking-widest">[ TOP WEAKNESSES ]</h2>
          {data.weaknesses.length > 0 ? (
            <div className="space-y-4">
              {data.weaknesses.map((weakness, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-black border-l-4 border-magenta-500">
                  <div>
                    <p className="text-magenta-400 font-bold font-mono uppercase text-sm">{weakness.category}</p>
                    <p className="text-gray-400 font-mono text-xs">{weakness.count} errors detected</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lime-400 font-bold font-mono">{weakness.score}%</p>
                    <div className="w-32 h-2 bg-gray-700 border border-cyan-500 overflow-hidden mt-1">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-magenta-500" 
                        style={{ width: `${weakness.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 font-mono">[ NO DATA ] Import games to begin analysis...</p>
          )}
        </div>

        {/* CTA */}
        <div className="flex gap-4">
          <Link 
            href="/train"
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-magenta-600 hover:from-cyan-500 hover:to-magenta-500 text-black font-bold font-mono transition-all shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]"
          >
            ▶ START TRAINING
          </Link>
          <Link 
            href="/puzzles"
            className="px-6 py-3 border-2 border-lime-500 text-lime-400 hover:text-lime-300 font-bold font-mono transition-all hover:shadow-[0_0_15px_rgba(0,255,0,0.3)]"
          >
            ▶ PRACTICE PUZZLES
          </Link>
        </div>
      </div>
    </main>
  );
}
