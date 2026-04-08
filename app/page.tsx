'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="py-6 flex justify-between items-center border-b border-slate-700">
          <h1 className="text-2xl font-bold text-white">♟ ChessCoach</h1>
          <div className="space-x-4">
            <Link href="/import" className="text-slate-300 hover:text-white transition">
              Import
            </Link>
            <Link href="/dashboard" className="text-slate-300 hover:text-white transition">
              Dashboard
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="py-20 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Improve Your Chess With AI-Powered Analysis
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
            Import your games from Chess.com or Lichess, get deep analysis with Stockfish, 
            and train on your weaknesses with personalized exercises.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link 
              href="/import"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              Get Started
            </Link>
            <Link 
              href="/dashboard"
              className="px-8 py-3 border border-slate-400 text-slate-300 hover:text-white font-semibold rounded-lg transition"
            >
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-2">📊 Deep Analysis</h3>
            <p className="text-slate-400">
              Stockfish analysis powered by Claude AI for intelligent pattern recognition
            </p>
          </div>
          <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-2">🎯 Targeted Training</h3>
            <p className="text-slate-400">
              Smart practice routines focused on your specific weaknesses
            </p>
          </div>
          <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-2">📈 Track Progress</h3>
            <p className="text-slate-400">
              Watch your rating and skill improvement in real-time
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
