'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TrainPage() {
  const [trainingActive, setTrainingActive] = useState(false);

  return (
    <main className="min-h-screen bg-black border-t-4 border-cyan-500 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(0,255,255,.1)_25%,rgba(0,255,255,.1)_26%,transparent_27%,transparent_74%,rgba(0,255,255,.1)_75%,rgba(0,255,255,.1)_76%,transparent_77%,transparent)] bg-[length:50px_50px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <Link href="/dashboard" className="text-cyan-400 hover:text-magenta-400 text-sm mb-4 inline-block font-mono transition-colors hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]">
          ↳ BACK TO DASHBOARD
        </Link>

        <div className="mb-12 border-l-4 border-magenta-500 pl-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-cyan-400 mb-2 font-mono tracking-widest">
            [ ERROR REPLAY MODE ]
          </h1>
          <p className="text-lime-400 font-mono text-sm">
            »» PRACTICE YOUR MISTAKES AND IMPROVE ••••••
          </p>
        </div>

        {!trainingActive ? (
          <div className="bg-gray-950 border-2 border-cyan-500 p-8 text-center shadow-[0_0_20px_rgba(0,255,255,0.3)]">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4 font-mono tracking-wide">[ READY TO TRAIN? ]</h2>
            <p className="text-gray-400 mb-6 font-mono">
              Start replaying your errors and watch your rating climb
            </p>
            <button
              onClick={() => setTrainingActive(true)}
              className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-magenta-600 hover:from-cyan-500 hover:to-magenta-500 text-black font-bold font-mono transition-all shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]"
            >
              ▶ START SESSION
            </button>
          </div>
        ) : (
          <div className="bg-gray-950 border-2 border-magenta-500 p-8 shadow-[0_0_20px_rgba(255,0,255,0.3)]">
            <h2 className="text-2xl font-bold text-magenta-400 mb-6 font-mono tracking-wide">[ POSITION TO SOLVE ]</h2>
            <div className="bg-black border-2 border-lime-500 h-96 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,255,0,0.2)]">
              <p className="text-lime-400 font-mono">» CHESSBOARD PLACEHOLDER</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button className="px-4 py-2 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-900 font-mono font-bold transition-all hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                ▶ MY MOVE
              </button>
              <button className="px-4 py-2 border-2 border-magenta-500 text-magenta-400 hover:bg-magenta-900 font-mono font-bold transition-all hover:shadow-[0_0_10px_rgba(255,0,255,0.5)]">
                ▶ HINT
              </button>
            </div>

            <button
              onClick={() => setTrainingActive(false)}
              className="px-6 py-2 text-lime-400 hover:text-lime-300 font-mono font-bold transition-colors"
            >
              ↳ BACK TO PROFILE
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
