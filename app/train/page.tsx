'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TrainPage() {
  const [trainingActive, setTrainingActive] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block">
          ← Back to home
        </Link>

        <h1 className="text-4xl font-bold text-white mb-6">Error Replay Training</h1>
        <p className="text-slate-400 mb-12">
          Practice your mistakes and improve your chess understanding
        </p>

        {!trainingActive ? (
          <div className="bg-slate-800 border border-slate-700 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Train?</h2>
            <p className="text-slate-400 mb-6">
              Start replaying your errors and track your progress
            </p>
            <button
              onClick={() => setTrainingActive(true)}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              Start Training Session
            </button>
          </div>
        ) : (
          <div className="bg-slate-800 border border-slate-700 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Position to Solve</h2>
            <div className="bg-slate-700 rounded-lg h-96 flex items-center justify-center mb-6">
              <p className="text-slate-400">Chessboard component will be displayed here</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition">
                My Move
              </button>
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition">
                Hint
              </button>
            </div>

            <button
              onClick={() => setTrainingActive(false)}
              className="px-6 py-2 text-slate-400 hover:text-white transition"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
