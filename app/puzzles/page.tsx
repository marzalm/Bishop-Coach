'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PuzzlesPage() {
  const [activePuzzle, setActivePuzzle] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block">
          ← Back to home
        </Link>

        <h1 className="text-4xl font-bold text-white mb-6">Targeted Puzzles</h1>
        <p className="text-slate-400 mb-12">
          Practice puzzles tailored to your weaknesses
        </p>

        {!activePuzzle ? (
          <div className="space-y-6">
            {/* Filter Options */}
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
              <h2 className="text-lg font-bold text-white mb-4">Filter by Weakness</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Tactics', 'Endgame', 'Opening', 'Positional', 'King Safety', 'Tempo'].map((theme) => (
                  <button
                    key={theme}
                    className="px-4 py-2 bg-slate-700 hover:bg-blue-600 text-white rounded transition text-sm"
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Ready for Puzzles?</h2>
              <p className="text-slate-400 mb-6">
                Get matched with puzzles from Lichess based on your skill level
              </p>
              <button
                onClick={() => setActivePuzzle(true)}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
              >
                Start Puzzle Session
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800 border border-slate-700 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Solve This Puzzle</h2>
            <div className="bg-slate-700 rounded-lg h-96 flex items-center justify-center mb-6">
              <p className="text-slate-400">Puzzle board will be displayed here</p>
            </div>

            <div className="flex gap-4">
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition">
                Submit Answer
              </button>
              <button
                onClick={() => setActivePuzzle(false)}
                className="px-6 py-2 text-slate-400 hover:text-white transition"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
