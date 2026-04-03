'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/store';

export default function Home() {
  const { state, ready } = useAppStore();

  const today = new Date().toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 40%, #0f172a 100%)' }}>
      {/* Header */}
      <header className="pt-12 pb-8 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #3B82F6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #EC4899 0%, transparent 50%)' }} />
        <div className="relative">
          <h1 className="text-5xl font-black text-white tracking-tight mb-1">
            Kid<span style={{ color: '#FCD34D' }}>Star</span> ⭐
          </h1>
          <p className="text-slate-400 text-sm">{today}</p>
        </div>
      </header>

      <main className="px-5 pb-10 max-w-lg mx-auto">
        {!ready ? (
          <div className="space-y-4">
            {[1,2].map(i => <div key={i} className="h-64 rounded-3xl shimmer opacity-20" />)}
          </div>
        ) : (
          <>
            {/* Kid cards */}
            <div className="space-y-4 mb-6">
              {state.kids.map(kid => {
                const available = Math.max(0, kid.screenTimeEarned - kid.screenTimeUsed);
                const done = kid.tasks.filter(t => t.completed).length;
                const total = kid.tasks.length;
                const pct = total === 0 ? 0 : (done / total) * 100;
                const exDone = kid.completedExercises.length;
                return (
                  <Link key={kid.id} href={`/kid/${kid.id}`} className="block group">
                    <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ background: `linear-gradient(135deg, ${kid.color}22, ${kid.color}44)`, border: `1px solid ${kid.color}44` }}>
                      {/* Top bar */}
                      <div className="px-5 pt-5 pb-4" style={{ borderBottom: `1px solid ${kid.color}33` }}>
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-lg" style={{ background: `${kid.color}33` }}>
                            {kid.emoji}
                          </div>
                          <div className="flex-1">
                            <h2 className="text-2xl font-black text-white">{kid.name}</h2>
                            <p className="text-sm" style={{ color: `${kid.color}cc` }}>{kid.grade} • גיל {kid.age}</p>
                            {kid.streak > 0 && (
                              <span className="inline-flex items-center gap-1 text-xs text-orange-400 font-bold mt-0.5">
                                🔥 {kid.streak} ימים ברצף
                              </span>
                            )}
                          </div>
                          <div className="text-center">
                            <p className="text-3xl font-black text-white">{kid.totalPoints}</p>
                            <p className="text-xs" style={{ color: `${kid.color}aa` }}>נקודות</p>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="px-5 py-4 grid grid-cols-3 gap-3">
                        <div className="text-center">
                          <p className="text-xl font-black text-emerald-400">{available}</p>
                          <p className="text-xs text-slate-400">דק׳ מסך</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-black text-amber-400">{done}/{total}</p>
                          <p className="text-xs text-slate-400">משימות</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-black text-purple-400">{exDone}</p>
                          <p className="text-xs text-slate-400">תרגולים</p>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="px-5 pb-4">
                        <div className="flex justify-between text-xs mb-1" style={{ color: `${kid.color}99` }}>
                          <span>התקדמות משימות</span>
                          <span>{Math.round(pct)}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full" style={{ background: `${kid.color}22` }}>
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${kid.color}88, ${kid.color})` }} />
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="px-5 pb-4 flex justify-end">
                        <span className="text-xs font-bold px-3 py-1.5 rounded-full transition-all group-hover:px-4" style={{ background: `${kid.color}33`, color: kid.color }}>
                          כנס ←
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Leaderboard */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-5 border border-white/10 mb-4">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <span>🏆</span> לוח תוצאות
              </h3>
              <div className="space-y-3">
                {[...state.kids].sort((a,b) => b.allTimePoints - a.allTimePoints).map((kid, idx) => {
                  const maxPts = Math.max(...state.kids.map(k => k.allTimePoints), 1);
                  return (
                    <div key={kid.id} className="flex items-center gap-3">
                      <span className="text-xl w-8">{idx === 0 && kid.allTimePoints > 0 ? '🥇' : idx === 1 && kid.allTimePoints > 0 ? '🥈' : '⚪'}</span>
                      <span className="text-2xl">{kid.emoji}</span>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-bold text-white">{kid.name}</span>
                          <span className="text-sm font-black" style={{ color: kid.color }}>{kid.allTimePoints} נק׳</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${(kid.allTimePoints / maxPts) * 100}%`, background: kid.color }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/parent" className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 text-center transition-all hover:-translate-y-0.5">
                <span className="text-2xl block mb-1">👨‍👩‍👧‍👦</span>
                <span className="text-white text-sm font-bold">לוח הורים</span>
                <span className="text-slate-500 text-xs block mt-0.5">ניהול ומעקב</span>
              </Link>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <span className="text-2xl block mb-1">📱</span>
                <span className="text-white text-sm font-bold">1 נקודה = 1 דקה</span>
                <span className="text-slate-500 text-xs block mt-0.5">יחס זמן מסך</span>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
