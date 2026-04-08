'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black border-t-4 border-cyan-500 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(0,255,255,.1)_25%,rgba(0,255,255,.1)_26%,transparent_27%,transparent_74%,rgba(0,255,255,.1)_75%,rgba(0,255,255,.1)_76%,transparent_77%,transparent)] bg-[length:50px_50px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Navigation */}
        <nav className="py-6 flex justify-between items-center border-b-2 border-magenta-500">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-500 font-mono tracking-widest">
            ♟ BISHOP COACH
          </h1>
          <div className="space-x-6">
            <Link href="/import" className="text-cyan-400 hover:text-magenta-400 font-mono font-bold text-sm transition-colors hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]">
              [ IMPORT ]
            </Link>
            <Link href="/dashboard" className="text-lime-400 hover:text-cyan-400 font-mono font-bold text-sm transition-colors hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]">
              [ PROFILE ]
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="py-24 text-center">
          <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-cyan-400 mb-6 font-mono tracking-wider">
            [ CHESS ANALYSIS PROTOCOL ]
          </h2>
          <p className="text-lg text-lime-400 max-w-2xl mx-auto mb-4 font-mono">
            »» NEURAL ANALYSIS INTEGRATED SYSTEM ••••••
          </p>
          <p className="text-base text-gray-400 max-w-3xl mx-auto mb-12 font-mono leading-relaxed">
            Import from Chess.com or Lichess → Analyze with Stockfish → Extract patterns with Claude AI → Train your weaknesses
          </p>
          
          <div className="flex justify-center gap-4">
            <Link 
              href="/import"
              className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-magenta-600 hover:from-cyan-500 hover:to-magenta-500 text-black font-bold font-mono transition-all shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]"
            >
              ▶ GET STARTED
            </Link>
            <Link 
              href="/dashboard"
              className="px-8 py-3 border-2 border-lime-500 text-lime-400 hover:text-lime-300 font-bold font-mono transition-all hover:shadow-[0_0_15px_rgba(0,255,0,0.3)]"
            >
              ▶ VIEW PROFILE
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-gray-950 border-2 border-cyan-500 relative overflow-hidden shadow-[0_0_15px_rgba(0,255,255,0.2)] hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] transition-shadow">
            <div className="absolute top-0 left-0 text-cyan-400 text-2xl font-mono opacity-30">▰▰▰</div>
            <h3 className="text-lg font-bold text-cyan-400 mb-3 font-mono tracking-wide">[ DEEP ANALYSIS ]</h3>
            <p className="text-gray-400 font-mono text-sm leading-relaxed">
              Stockfish engine + Claude AI for intelligent weakness detection
            </p>
          </div>
          
          <div className="p-6 bg-gray-950 border-2 border-magenta-500 relative overflow-hidden shadow-[0_0_15px_rgba(255,0,255,0.2)] hover:shadow-[0_0_25px_rgba(255,0,255,0.3)] transition-shadow">
            <div className="absolute top-0 left-0 text-magenta-400 text-2xl font-mono opacity-30">▰▰▰</div>
            <h3 className="text-lg font-bold text-magenta-400 mb-3 font-mono tracking-wide">[ TRAINING MODE ]</h3>
            <p className="text-gray-400 font-mono text-sm leading-relaxed">
              Personalized exercises targeting your specific weaknesses
            </p>
          </div>
          
          <div className="p-6 bg-gray-950 border-2 border-lime-500 relative overflow-hidden shadow-[0_0_15px_rgba(0,255,0,0.2)] hover:shadow-[0_0_25px_rgba(0,255,0,0.3)] transition-shadow">
            <div className="absolute top-0 left-0 text-lime-400 text-2xl font-mono opacity-30">▰▰▰</div>
            <h3 className="text-lg font-bold text-lime-400 mb-3 font-mono tracking-wide">[ PROGRESS LOG ]</h3>
            <p className="text-gray-400 font-mono text-sm leading-relaxed">
              Track improvement across bullet, blitz, and rapid time controls
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-magenta-500 pt-8 pb-8 text-center">
          <p className="text-gray-500 font-mono text-xs">
            [ BISHOP.COACH v0.1.0 ] »» TIME CONTROL ANALYSIS SYSTEM
          </p>
        </div>
      </div>
    </main>
  );
}
