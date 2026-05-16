'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { Task } from '@/lib/types';
import { getExercisesForKid, EXERCISE_TYPES } from '@/lib/exercises';
import { getAchievement } from '@/lib/achievements';
import ScreenTimeBar from '@/components/ScreenTimeBar';
import AddTaskModal from '@/components/AddTaskModal';
import UseScreenTimeModal from '@/components/UseScreenTimeModal';

interface PageProps { params: Promise<{ id: string }> }

const SUBJECT_ICON: Record<string, string> = { math: '🔢', hebrew: '📖', english: '🇬🇧', science: '🔬', general: '🧩' };
const SUBJECT_LABEL: Record<string, string> = { math: 'מתמטיקה', hebrew: 'עברית', english: 'אנגלית', science: 'מדע', general: 'כללי' };
const DIFF_STARS = ['', '⭐', '⭐⭐', '⭐⭐⭐'];

export default function KidPage({ params }: PageProps) {
  const { id } = use(params);
  const { state, ready, completeTask, uncompleteTask, addTask, deleteTask, useScreenTime } = useAppStore();
  const [showAddTask, setShowAddTask] = useState(false);
  const [showScreenTime, setShowScreenTime] = useState(false);
  const [toast, setToast] = useState<{ msg: string; pts: number } | null>(null);
  const [taskFilter, setTaskFilter] = useState<'all' | 'pending'>('pending');

  const kid = state.kids.find(k => k.id === id);

  if (!ready) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin" />
    </div>
  );
  if (!kid) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-gray-500">ילד לא נמצא</p>
      <Link href="/" className="text-blue-500 text-sm">חזור</Link>
    </div>
  );

  const available = Math.max(0, kid.screenTimeEarned - kid.screenTimeUsed);
  const exercises = getExercisesForKid(id);
  const pendingTasks = kid.tasks.filter(t => !t.completed);
  const completedTasks = kid.tasks.filter(t => t.completed);
  const shownTasks = taskFilter === 'pending' ? pendingTasks : kid.tasks;
  const taskProgress = kid.tasks.length ? (completedTasks.length / kid.tasks.length) * 100 : 0;

  const showToast = (msg: string, pts: number) => {
    setToast({ msg, pts });
    setTimeout(() => setToast(null), 2500);
  };

  const handleComplete = (taskId: string) => {
    const task = kid.tasks.find(t => t.id === taskId);
    if (!task) return;
    completeTask(id, taskId);
    showToast(`כל הכבוד! השלמת`, task.points);
  };

  // Separate exam-prep from regular exercises
  const examPrep = exercises.filter(ex => ex.tags?.includes('exam-prep'));
  const regular  = exercises.filter(ex => !ex.tags?.includes('exam-prep'));

  // Group regular exercises by subject
  const bySubject = regular.reduce<Record<string, typeof regular>>((acc, ex) => {
    (acc[ex.subject] ??= []).push(ex);
    return acc;
  }, {});

  const completionCount = kid.completedExercises.reduce<Record<string, number>>((acc, e) => {
    acc[e.exerciseTypeId] = (acc[e.exerciseTypeId] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen pb-24" style={{ background: `linear-gradient(160deg, ${kid.secondaryColor} 0%, #f8faff 40%)` }}>

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-xl text-white font-bold text-sm flex items-center gap-2 star-pop"
          style={{ background: kid.color }}>
          🎉 {toast.msg} &nbsp;+{toast.pts} נקודות = +{toast.pts} דקות מסך!
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-white/90 border-b border-gray-100 shadow-sm">
        <div className="px-4 py-3 max-w-lg mx-auto flex items-center gap-3">
          <Link href="/" className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <span className="text-2xl">{kid.emoji}</span>
          <div className="flex-1">
            <h1 className="font-black text-xl leading-none text-gray-800">{kid.name}</h1>
            <p className="text-xs text-gray-500 mt-0.5">{kid.grade}{kid.streak > 1 ? ` · 🔥 ${kid.streak} ימים` : ''}</p>
          </div>
          {/* Points + screen time pill */}
          <div className="flex gap-2">
            <div className="px-3 py-1.5 rounded-full flex items-center gap-1" style={{ background: `${kid.color}18` }}>
              <span className="font-black text-sm" style={{ color: kid.color }}>{kid.totalPoints}</span>
              <span className="text-xs">⭐</span>
            </div>
            <button onClick={() => setShowScreenTime(true)}
              className="px-3 py-1.5 rounded-full flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 transition-colors">
              <span className="font-black text-sm text-emerald-600">{available}</span>
              <span className="text-xs">📺</span>
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 max-w-lg mx-auto">

        {/* Screen time compact bar */}
        <div className="mt-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
          <ScreenTimeBar earned={kid.screenTimeEarned} used={kid.screenTimeUsed} color={kid.color} />
        </div>

        {/* ─── EXAM PREP ─── */}
        {examPrep.length > 0 && (
          <section className="mt-5">
            <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🎯</span>
                <h2 className="font-black text-lg text-amber-900">הכנה למבחן</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-200 text-amber-800 font-bold">{examPrep.length} נושאים</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {examPrep.map(ex => {
                  const times = completionCount[ex.id] ?? 0;
                  const bestPct = kid.completedExercises
                    .filter(e => e.exerciseTypeId === ex.id)
                    .reduce((b, e) => Math.max(b, e.total > 0 ? e.score / e.total : 0), 0);
                  return (
                    <Link key={ex.id} href={`/kid/${id}/exercises/${ex.id}`}
                      className="bg-white rounded-xl border border-amber-100 p-3 shadow-sm hover:shadow-md transition-all active:scale-[0.97] block">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-2xl">{ex.icon}</span>
                        {times > 0 && <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full">{times}×</span>}
                      </div>
                      <p className="font-bold text-gray-800 text-sm leading-tight">{ex.title}</p>
                      {times > 0 && (
                        <div className="mt-2 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${bestPct * 100}%`, background: ex.color }} />
                        </div>
                      )}
                      <div className="mt-2 w-full py-1.5 rounded-xl text-center text-xs font-black text-white"
                        style={{ background: `linear-gradient(135deg, ${ex.color}dd, ${ex.color})` }}>
                        ▶ התחל!
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ─── EXERCISES ─── */}
        <section className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-black text-lg text-gray-800 flex items-center gap-2">
              📚 תרגולים לימודיים
            </h2>
            <span className="text-xs text-gray-400">{kid.completedExercises.length} הושלמו</span>
          </div>

          {Object.entries(bySubject).map(([subject, exs]) => (
            <div key={subject} className="mb-4">
              {/* Subject header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{SUBJECT_ICON[subject]}</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{SUBJECT_LABEL[subject]}</span>
              </div>

              {/* Exercise cards — horizontal scroll on small screens */}
              <div className="grid grid-cols-2 gap-2">
                {exs.map(ex => {
                  const times = completionCount[ex.id] ?? 0;
                  return (
                    <Link key={ex.id} href={`/kid/${id}/exercises/${ex.id}`}
                      className="bg-white rounded-2xl border-2 border-transparent hover:border-opacity-50 p-3 shadow-sm hover:shadow-md transition-all active:scale-[0.97] block"
                      style={{ borderColor: times > 0 ? `${ex.color}40` : 'transparent' }}>
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-2xl">{ex.icon}</span>
                        <div className="text-right">
                          {times > 0 && <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full">{times}×</span>}
                        </div>
                      </div>
                      <p className="font-bold text-gray-800 text-sm leading-tight">{ex.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-tight">{ex.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs">{DIFF_STARS[ex.difficulty]}</span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${ex.color}15`, color: ex.color }}>
                          {ex.minPoints}–{ex.maxPoints} נק׳
                        </span>
                      </div>

                      {/* START button — very prominent */}
                      <div className="mt-2 w-full py-2 rounded-xl text-center text-sm font-black text-white transition-all"
                        style={{ background: `linear-gradient(135deg, ${ex.color}dd, ${ex.color})` }}>
                        ▶ התחל!
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* ─── TASKS ─── */}
        <section className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-black text-lg text-gray-800">📋 משימות</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{completedTasks.length}/{kid.tasks.length}</span>
              <button
                onClick={() => setShowAddTask(true)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-1"
                style={{ background: kid.color }}>
                + הוסף
              </button>
            </div>
          </div>

          {/* Progress */}
          {kid.tasks.length > 0 && (
            <div className="mb-3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${taskProgress}%`, background: `linear-gradient(90deg, ${kid.color}80, ${kid.color})` }} />
            </div>
          )}

          {/* Filter toggle */}
          <div className="flex gap-2 mb-3">
            {(['pending', 'all'] as const).map(f => (
              <button key={f} onClick={() => setTaskFilter(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${taskFilter === f ? 'text-white' : 'bg-white text-gray-500 border border-gray-200'}`}
                style={taskFilter === f ? { background: kid.color } : {}}>
                {f === 'pending' ? `⏳ ממתינות (${pendingTasks.length})` : `📋 הכל (${kid.tasks.length})`}
              </button>
            ))}
          </div>

          {/* Task list */}
          <div className="space-y-2">
            {shownTasks.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-2xl border border-gray-100">
                <div className="text-3xl mb-2">🎉</div>
                <p className="text-sm font-bold text-gray-500">כל המשימות הושלמו!</p>
              </div>
            ) : shownTasks.map(task => (
              <div key={task.id}
                className={`bg-white rounded-2xl border-2 p-3 flex items-center gap-3 transition-all ${task.completed ? 'opacity-60 border-gray-100' : 'border-gray-100 shadow-sm'}`}>
                {/* Complete button */}
                <button
                  onClick={() => task.completed ? uncompleteTask(id, task.id) : handleComplete(task.id)}
                  className="flex-shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all active:scale-90"
                  style={{ borderColor: task.completed ? kid.color : '#d1d5db', background: task.completed ? kid.color : 'white' }}>
                  {task.completed
                    ? <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    : <span className="text-lg">{task.type === 'homework' ? '📚' : '🏆'}</span>
                  }
                </button>

                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold leading-tight ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{task.type === 'homework' ? 'שיעורי בית' : 'אתגר'}</p>
                </div>

                <div className="flex-shrink-0 text-center px-2 py-1 rounded-xl" style={{ background: task.completed ? '#f3f4f6' : `${kid.color}15` }}>
                  <p className="text-base font-black leading-none" style={{ color: task.completed ? '#9ca3af' : kid.color }}>{task.points}</p>
                  <p className="text-xs text-gray-400">נק׳</p>
                </div>

                <button onClick={() => deleteTask(id, task.id)}
                  className="flex-shrink-0 w-7 h-7 rounded-full hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors text-xs">✕</button>
              </div>
            ))}
          </div>
        </section>

        {/* ─── ACHIEVEMENTS ─── */}
        {kid.achievements.length > 0 && (
          <section className="mt-5">
            <h2 className="font-black text-lg text-gray-800 mb-3">🏆 הישגים</h2>
            <div className="flex flex-wrap gap-2">
              {kid.achievements.map(ua => {
                const def = getAchievement(ua.achievementId);
                return def ? (
                  <div key={ua.achievementId} title={def.description}
                    className="flex items-center gap-1.5 bg-white rounded-xl px-3 py-2 border border-gray-100 shadow-sm">
                    <span className="text-xl">{def.icon}</span>
                    <span className="text-xs font-bold text-gray-700">{def.title}</span>
                  </div>
                ) : null;
              })}
            </div>
          </section>
        )}
      </main>

      {showAddTask && <AddTaskModal kidColor={kid.color} onAdd={t => addTask(id, t)} onClose={() => setShowAddTask(false)} />}
      {showScreenTime && <UseScreenTimeModal available={available} kidColor={kid.color} kidName={kid.name} onUse={m => useScreenTime(id, m)} onClose={() => setShowScreenTime(false)} />}
    </div>
  );
}
