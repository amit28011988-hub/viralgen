'use client';

import { useState } from 'react';
import { MemeCanvas } from '@/components/MemeCanvas';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ imageUrl: string, title: string, subreddit?: string } | null>(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  const fetchTrending = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/trending');
      if (!res.ok) throw new Error("API Error");
      const json = await res.json();

      if (json.imageUrl) {
        setData(json);

        const title = json.title || "Trending Topic";

        // Heuristics for splitting text
        // If it contains a quote mark, maybe split inside/outside?
        // Usually simpler: Top is the "News/Premise", Bottom is the "Takeaway/Action"

        // Let's just put the whole title on top for safety, and something generic on bottom
        // unless the title is very long.

        if (title.length > 200) {
          setTopText(title.substring(0, 50) + "...");
          setBottomText("Read full story in comments");
        } else {
          setTopText(title);
          setBottomText(json.author || 'Keep pushing forward');
        }
      }
    } catch (e) {
      alert("Failed to load trending content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-yellow-400 selection:text-black font-sans">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur border-b border-slate-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent italic tracking-tighter">
            VIRALGEN
          </h1>
          <div className="text-xs font-mono text-slate-400 border border-slate-800 px-2 py-1 rounded">BETA v1.0</div>
        </div>
      </header>

      <div className="pt-32 pb-20 px-4 max-w-6xl mx-auto flex flex-col items-center gap-12">

        <div className="text-center space-y-6 max-w-3xl">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            Turn Trends Into <span className="text-yellow-400">Viral</span> Wins.
          </h2>
          <p className="text-slate-400 text-lg mx-auto">
            One-click automation to fetch trending images and apply high-engagement caption styles tailored for social media dominance.
          </p>

          {!data && (
            <div className="pt-8">
              <button
                onClick={fetchTrending}
                disabled={loading}
                className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-black transition-all duration-200 bg-yellow-400 hover:bg-yellow-300 rounded-full focus:outline-none ring-offset-4 ring-offset-slate-950 focus:ring-2 focus:ring-yellow-400 hover:scale-105 shadow-[0_0_40px_-10px_rgba(250,204,21,0.5)]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    Hunting Trends...
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-lg">
                    ⚡ Auto-Generate Content
                  </span>
                )}
              </button>
              <p className="mt-4 text-xs text-slate-500">Scours web for trending pics • Auto-formats captions</p>
            </div>
          )}
        </div>

        {data && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 animate-in fade-in slide-in-from-bottom-8 duration-700">

            {/* Editor Panel */}
            <div className="order-2 lg:order-1 bg-slate-900/50 backdrop-blur border border-slate-800 p-8 rounded-3xl h-fit space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Customize Caption</h3>
                <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Editor</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-yellow-500">Top Header (Impact)</label>
                  <textarea
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white font-medium focus:ring-2 focus:ring-yellow-500/50 outline-none resize-none transition-all focus:border-yellow-500"
                    rows={4}
                    placeholder="Enter impactful top text..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-yellow-500">Bottom Footer (Action)</label>
                  <textarea
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white font-medium focus:ring-2 focus:ring-yellow-500/50 outline-none resize-none transition-all focus:border-yellow-500"
                    rows={3}
                    placeholder="Enter energetic bottom text..."
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-xs font-mono bg-slate-800 px-1 rounded">SOURCE</span>
                  <span className="truncate">{data.title}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={fetchTrending}
                    className="w-full py-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Reroll</span>
                    <span className="text-xl">↺</span>
                  </button>
                  <button
                    onClick={() => {
                      setTopText('');
                      setBottomText('');
                    }}
                    className="w-full py-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold transition-colors"
                  >
                    Clear Text
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="order-1 lg:order-2 flex flex-col items-center">
              <div className="sticky top-24">
                <MemeCanvas
                  imageUrl={data.imageUrl}
                  topText={topText}
                  bottomText={bottomText}
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
