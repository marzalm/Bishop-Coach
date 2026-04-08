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

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');
        const tc = (params.get('timeControl') || 'blitz') as 'bullet' | 'blitz' | 'rapid';

        if (!userId) {
          setError('No user ID provided');
          return;
        }

        setTimeControl(tc);

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

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block">
            ← Back to home
          </Link>
          <div className="p-6 bg-red-900 border border-red-700 text-red-200 rounded">
            {error}
          </div>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-lg">No data available</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block">
          ← Back to home
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Your Dashboard</h1>
          <p className="text-slate-400">
            Track your weaknesses and improvement in <span className="capitalize font-semibold text-blue-400">{timeControl}</span> games
          </p>
        </div>

        {/* Time Control Selector */}
        <div className="mb-8 flex gap-3">
          {(['bullet', 'blitz', 'rapid'] as const).map((tc) => (
            <Link
              key={tc}
              href={`?userId=${data.userId}&timeControl=${tc}`}
              className={`px-4 py-2 rounded-lg font-semibold transition capitalize ${
                timeControl === tc
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {tc}
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
            <h3 className="text-slate-400 text-sm font-semibold mb-2">Games Analyzed</h3>
            <p className="text-3xl font-bold text-white">{data.gameCount}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
            <h3 className="text-slate-400 text-sm font-semibold mb-2">Weaknesses Detected</h3>
            <p className="text-3xl font-bold text-white">{data.weaknesses.length}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
            <h3 className="text-slate-400 text-sm font-semibold mb-2">Last Updated</h3>
            <p className="text-slate-300 text-sm">
              {data.lastAnalyzedAt ? new Date(data.lastAnalyzedAt).toLocaleDateString() : 'Never'}
            </p>
          </div>
        </div>

        {/* Weaknesses */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Top Weaknesses</h2>
          {data.weaknesses.length > 0 ? (
            <div className="space-y-4">
              {data.weaknesses.map((weakness, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-700 rounded">
                  <div>
                    <p className="text-white font-semibold capitalize">{weakness.category}</p>
                    <p className="text-slate-400 text-sm">{weakness.count} errors detected</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{weakness.score}%</p>
                    <div className="w-24 h-2 bg-slate-600 rounded overflow-hidden mt-1">
                      <div 
                        className="h-full bg-blue-600" 
                        style={{ width: `${weakness.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">No weaknesses detected yet. Import games to get started!</p>
          )}
        </div>

        {/* CTA */}
        <div className="flex gap-4">
          <Link 
            href="/train"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Start Training
          </Link>
          <Link 
            href="/puzzles"
            className="px-6 py-3 border border-slate-400 text-slate-300 hover:text-white font-semibold rounded-lg transition"
          >
            Practice Puzzles
          </Link>
        </div>
      </div>
    </main>
  );
}
