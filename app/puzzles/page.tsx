'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PuzzlesPage() {
  const [activePuzzle, setActivePuzzle] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/dashboard" className="text-gray-400 hover:text-white text-sm mb-4 inline-block">
          ← Back to dashboard
        </Link>

        <h1 className="text-4xl font-bold text-white mb-6">
          Targeted Puzzles
        </h1>
        <p className="text-gray-400 mb-12">
          Practice puzzles tailored to your weaknesses
        </p>

        {!activePuzzle ? (
          <div className="space-y-6">
            {/* Filter Options */}
            <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg">
              <h2 className="text-lg font-bold text-white mb-4">Filter by Weakness</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Tactics', 'Endgame', 'Opening', 'Positional', 'King Safety', 'Tempo'].map((theme) => (
                  <button
                    key={theme}
                    className="px-4 py-2 bg-gray-800 border border-gray-600 text-white hover:bg-gray-700 rounded transition text-sm"
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <div className="bg-gray-900 border border-gray-700 p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Ready for Puzzles?</h2>
              <p className="text-gray-400 mb-6">
                Get matched with puzzles from Lichess based on your skill level
              </p>
              <button
                onClick={() => setActivePuzzle(true)}
                className="px-8 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
              >
                Start Puzzle Session
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-700 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Solve This Puzzle</h2>
            <div className="bg-gray-800 rounded-lg h-96 flex items-center justify-center mb-6">
              <p className="text-gray-400">Puzzle board will be displayed here</p>
            </div>

            <div className="flex gap-4">
              <button className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition">
                Submit Answer
              </button>
              <button
                onClick={() => setActivePuzzle(false)}
                className="px-6 py-2 text-gray-400 hover:text-white transition"
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
