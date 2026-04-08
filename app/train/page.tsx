'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TrainPage() {
  const [trainingActive, setTrainingActive] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/dashboard" className="text-gray-400 hover:text-white text-sm mb-4 inline-block">
          ← Back to dashboard
        </Link>

        <h1 className="text-4xl font-bold text-white mb-6">
          Error Replay Training
        </h1>
        <p className="text-gray-400 mb-12">
          Practice your mistakes and improve your chess understanding
        </p>

        {!trainingActive ? (
          <div className="bg-gray-900 border border-gray-700 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Train?</h2>
            <p className="text-gray-400 mb-6">
              Start replaying your errors and track your progress
            </p>
            <button
              onClick={() => setTrainingActive(true)}
              className="px-8 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
            >
              Start Training Session
            </button>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-700 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Position to Solve</h2>
            <div className="bg-gray-800 rounded-lg h-96 flex items-center justify-center mb-6">
              <p className="text-gray-400">Chessboard component will be displayed here</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button className="px-4 py-2 bg-gray-800 border border-gray-600 text-white hover:bg-gray-700 rounded transition">
                My Move
              </button>
              <button className="px-4 py-2 bg-gray-800 border border-gray-600 text-white hover:bg-gray-700 rounded transition">
                Hint
              </button>
            </div>

            <button
              onClick={() => setTrainingActive(false)}
              className="px-6 py-2 text-gray-400 hover:text-white transition"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
