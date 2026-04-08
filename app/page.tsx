'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="py-6 flex justify-between items-center border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">Bishop Coach</h1>
          <div className="space-x-6">
            <Link href="/import" className="text-gray-300 hover:text-white transition">
              Import
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition">
              Profile
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="py-24 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Chess Analysis System
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
            Import games from Chess.com or Lichess, analyze with AI, and train on your weaknesses.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/import"
              className="px-8 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
            >
              Get Started
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-3 border border-gray-600 text-gray-300 hover:text-white font-semibold rounded transition"
            >
              View Profile
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-900 border border-gray-700 rounded">
            <h3 className="text-lg font-bold text-white mb-2">Deep Analysis</h3>
            <p className="text-gray-400">
              Stockfish analysis powered by Claude AI for intelligent pattern recognition
            </p>
          </div>
          <div className="p-6 bg-gray-900 border border-gray-700 rounded">
            <h3 className="text-lg font-bold text-white mb-2">Targeted Training</h3>
            <p className="text-gray-400">
              Smart practice routines focused on your specific weaknesses
            </p>
          </div>
          <div className="p-6 bg-gray-900 border border-gray-700 rounded">
            <h3 className="text-lg font-bold text-white mb-2">Progress Tracking</h3>
            <p className="text-gray-400">
              Watch your rating and skill improvement in real-time
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
