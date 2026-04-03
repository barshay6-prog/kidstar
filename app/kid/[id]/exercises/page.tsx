'use client';

import { use } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { getExercisesForKid, EXERCISE_TYPES } from '@/lib/exercises';

interface PageProps { params: Promise<{ id: string }> }

const SUBJECT_LABEL: Record<string, string> = { math: 'מתמטיקה', hebrew: 'עברית', english: 'אנגלית', general: 'כללי' };
const DIFFICULTY_LABEL = ['', 'קל', 'בינוני', 'מתקדם'];
const DIFFICULTY_COLOR = ['', 'text-emerald-600 bg-emerald-50', 'text-amber-600 bg-amber-50', 'text-red-600 bg-red-50'];

export default function ExercisesPage({ params }: PageProps) {
  const { id } = use(params);
  const { state, ready } = useAppStore();
  const kid = state.kids.find(k => k.id === id);
  const exercises = getExercisesForKid(id);

  if (!ready || !kid) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin" /></div>;

  // Group by subject
  const bySubject = exercises.reduce<Record<string, typeof exercises>>((acc, ex) => {
    (acc[ex.subject] ??= []).push(ex);
    return acc;
  }, {});

  // Count completions per type
  const completionCount = kid.completedExercises.reduce<Record<string, number>>((acc, e) => {
    acc[e.exerciseTypeId] = (acc[e.exerciseTypeId] ?? 0) + 1;
    return acc;
  }, {});

  const totalEarned = kid.completedExercises.reduce((s, e) => s + e.pointsEarned, 0);
  const bestScore = kid.completedExercises.reduce((best, e) => {
    const pct = e.total > 0 ? e.score / e.total : 0;
    return pct > best ? pct : best;
  }, 0);

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(160deg, ${kid.secondaryColor} 0%, #fff 60%)` }}>
      <header className="sticky top-0 z-10 px-5 py-4 backdrop-blur-sm bg-white/80 border-b border-gray-100">
        <div className="flex items-center gap-2 max-w-lg mx-auto">
          <Link href={`/kid/${id}`} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors flex-shrink-0">
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <span className="text-2xl">📚</span>
          <div className="flex-1">
            <h1 className="font-black text-xl text-gray-800 leading-none">תרגולים</h1>
            <p className="text-xs text-gray-500">{kid.name} • {kid.grade}</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: `${kid.color}20` }}>
            <span className="font-black text-sm" style={{ color: kid.color }}>{kid.totalPoints}</span>
            <span className="text-sm">⭐</span>
          </div>
          <Link href="/" className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-base flex-shrink-0">
            🏠
          </Link>
        </div>
      </header>

      <main className="px-5 pb-10 max-w-lg mx-auto">
        {/* Stats bar */}
        <div className="mt-5 grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-3 text-center shadow-sm border border-gray-100">
            <p className="text-2xl font-black" style={{ color: kid.color }}>{kid.completedExercises.length}</p>
            <p className="text-xs text-gray-500 mt-0.5">תרגולים</p>
          </div>
          <div className="bg-white rounded-2xl p-3 text-center shadow-sm border border-gray-100">
            <p className="text-2xl font-black text-amber-500">{totalEarned}</p>
            <p className="text-xs text-gray-500 mt-0.5">נקודות</p>
          </div>
          <div className="bg-white rounded-2xl p-3 text-center shadow-sm border border-gray-100">
            <p className="text-2xl font-black text-emerald-600">{Math.round(bestScore * 100)}%</p>
            <p className="text-xs text-gray-500 mt-0.5">שיא</p>
          </div>
        </div>

        {/* Exercise groups */}
        {Object.entries(bySubject).map(([subject, exs]) => (
          <div key={subject} className="mb-6">
            <h2 className="font-bold text-gray-600 text-sm mb-3 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full inline-block" style={{ background: kid.color }} />
              {SUBJECT_LABEL[subject] ?? subject}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {exs.map(ex => {
                const times = completionCount[ex.id] ?? 0;
                const bestForType = kid.completedExercises.filter(e => e.exerciseTypeId === ex.id).reduce((b, e) => Math.max(b, e.score / e.total), 0);
                return (
                  <Link key={ex.id} href={`/kid/${id}/exercises/${ex.id}`}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all block">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{ex.icon}</span>
                      {times > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">{times}×</span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1">{ex.title}</h3>
                    <p className="text-xs text-gray-400 mb-3 leading-snug">{ex.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLOR[ex.difficulty]}`}>
                        {DIFFICULTY_LABEL[ex.difficulty]}
                      </span>
                      <span className="text-xs font-bold" style={{ color: ex.color }}>
                        עד {ex.maxPoints} נק׳
                      </span>
                    </div>
                    {times > 0 && (
                      <div className="mt-2 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${bestForType * 100}%`, background: ex.color }} />
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
