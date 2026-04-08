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
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-white">Loading profile...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link href="/" className="text-gray-400 hover:text-white text-sm mb-4 inline-block">
            ← Back to home
          </Link>
          <div className="p-6 bg-red-900 border border-red-700 text-red-200 rounded">
            Error: {error}
          </div>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-white">No data available</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <Link href="/" className="text-gray-400 hover:text-white text-sm mb-4 inline-block">
          ← Back to home
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Your Profile
          </h1>
          <p className="text-gray-400">
            Analyzing <span className="text-white font-semibold">{timeControl.toUpperCase()}</span> games
          </p>
        </div>

        {/* Time Control Selector */}
        <div className="mb-8 flex gap-3">
          {(['bullet', 'blitz', 'rapid'] as const).map((tc) => (
            <button
              key={tc}
              onClick={() => handleTimeControlChange(tc)}
              className={`px-6 py-2 font-semibold uppercase text-sm transition ${
                timeControl === tc
                  ? 'bg-white text-black'
                  : 'bg-gray-800 border border-gray-600 text-gray-400 hover:text-white'
              }`}
            >
              {tc}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 border border-gray-700 p-6 rounded">
            <h3 className="text-white text-sm font-semibold mb-2">Games Analyzed</h3>
            <p className="text-3xl font-bold text-white">{data.gameCount}</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 p-6 rounded">
            <h3 className="text-white text-sm font-semibold mb-2">Weaknesses Found</h3>
            <p className="text-3xl font-bold text-white">{data.weaknesses.length}</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 p-6 rounded">
            <h3 className="text-white text-sm font-semibold mb-2">Last Updated</h3>
            <p className="text-white text-sm">
              {data.lastAnalyzedAt ? new Date(data.lastAnalyzedAt).toLocaleDateString() : 'Never'}
            </p>
          </div>
        </div>

        {/* Weaknesses */}
        <div className="bg-gray-900 border border-gray-700 p-8 mb-12 rounded">
          <h2 className="text-2xl font-bold text-white mb-6">Top Weaknesses</h2>
          {data.weaknesses.length > 0 ? (
            <div className="space-y-4">
              {data.weaknesses.map((weakness, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-800 border border-gray-600 rounded">
                  <div>
                    <p className="text-white font-semibold uppercase text-sm">{weakness.category}</p>
                    <p className="text-gray-400 text-xs">{weakness.count} errors detected</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{weakness.score}%</p>
                    <div className="w-32 h-2 bg-gray-700 border border-gray-600 overflow-hidden mt-1">
                      <div
                        className="h-full bg-white"
                        style={{ width: `${weakness.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No data. Import games to begin analysis...</p>
          )}
        </div>

        {/* CTA */}
        <div className="flex gap-4">
          <Link
            href="/train"
            className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
          >
            Start Training
          </Link>
          <Link
            href="/puzzles"
            className="px-6 py-3 border border-gray-600 text-gray-300 hover:text-white font-semibold rounded transition"
          >
            Practice Puzzles
          </Link>
        </div>
      </div>
    </main>
  );
}
