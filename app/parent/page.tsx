'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { Task, Kid, CompletedExercise, AttemptDetail } from '@/lib/types';
import { EXERCISE_TYPES } from '@/lib/exercises';
import { getAchievement } from '@/lib/achievements';

type Tab = 'overview' | 'analytics' | 'tasks' | 'history' | 'settings';

// ─── PIN Gate ─────────────────────────────────────────────────────────────────
function PinGate({ pin, onUnlock }: { pin: string; onUnlock: () => void }) {
  const [input, setInput] = useState('');
  const [shake, setShake] = useState(false);

  const handleDigit = (d: string) => {
    const next = input + d;
    setInput(next);
    if (next.length === 4) {
      if (next === pin) { onUnlock(); }
      else { setShake(true); setInput(''); setTimeout(() => setShake(false), 600); }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-blue-950 p-6">
      <div className="w-full max-w-xs">
        <div className="text-center mb-8">
          <span className="text-5xl">🔒</span>
          <h1 className="text-white text-2xl font-black mt-3">אזור הורים</h1>
          <p className="text-slate-400 text-sm mt-1">PIN: 1234 (ברירת מחדל)</p>
        </div>
        <div className={`flex justify-center gap-4 mb-8 ${shake ? 'animate-bounce' : ''}`}>
          {[0,1,2,3].map(i => (
            <div key={i} className={`w-4 h-4 rounded-full transition-all duration-150 ${input.length > i ? 'bg-blue-400 scale-125' : 'bg-slate-600'} ${shake ? 'bg-red-400' : ''}`} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((d, i) => (
            <button key={i} onClick={() => d === '⌫' ? setInput(p => p.slice(0,-1)) : d ? handleDigit(d) : undefined}
              className={`h-14 rounded-2xl text-xl font-bold transition-all active:scale-90 ${d === '' ? 'invisible' : 'bg-slate-700/80 text-white hover:bg-slate-600'}`}>
              {d}
            </button>
          ))}
        </div>
        <Link href="/" className="block text-center text-slate-500 text-sm mt-8 hover:text-slate-400">← חזור לדף הבית</Link>
      </div>
    </div>
  );
}

// ─── ANALYTICS TAB ────────────────────────────────────────────────────────────
function AnalyticsTab() {
  const { state } = useAppStore();
  const [selectedKid, setSelectedKid] = useState(state.kids[0]?.id ?? '');
  const [expandedEx, setExpandedEx] = useState<string | null>(null);
  const kid = state.kids.find(k => k.id === selectedKid);

  if (!kid) return null;

  // Per-subject accuracy
  const subjectStats: Record<string, { correct: number; total: number; title: string }> = {};
  for (const ce of kid.completedExercises) {
    const ex = EXERCISE_TYPES.find(e => e.id === ce.exerciseTypeId);
    if (!ex) continue;
    if (!subjectStats[ex.subject]) subjectStats[ex.subject] = { correct: 0, total: 0, title: ex.subject };
    subjectStats[ex.subject].correct += ce.score;
    subjectStats[ex.subject].total += ce.total;
  }

  // Per-exercise type accuracy (sorted by error rate)
  const exerciseStats = kid.completedExercises.reduce<Record<string, { correct: number; total: number; title: string; sessions: number }>>((acc, ce) => {
    if (!acc[ce.exerciseTypeId]) acc[ce.exerciseTypeId] = { correct: 0, total: 0, title: ce.exerciseTitle || ce.exerciseTypeId, sessions: 0 };
    acc[ce.exerciseTypeId].correct += ce.score;
    acc[ce.exerciseTypeId].total += ce.total;
    acc[ce.exerciseTypeId].sessions++;
    return acc;
  }, {});

  const weakExercises = Object.entries(exerciseStats)
    .filter(([, s]) => s.total > 0)
    .map(([id, s]) => ({ id, ...s, pct: Math.round((s.correct / s.total) * 100) }))
    .sort((a, b) => a.pct - b.pct);

  // All wrong answers across all exercises
  const allWrong: (AttemptDetail & { exerciseTitle: string; date: string })[] = kid.completedExercises
    .flatMap(ce => (ce.attempts ?? [])
      .filter(a => !a.isCorrect)
      .map(a => ({ ...a, exerciseTitle: ce.exerciseTitle || ce.exerciseTypeId, date: ce.completedAt }))
    )
    .slice(-40);

  const SUBJECT_LABELS: Record<string, string> = { math: 'מתמטיקה', hebrew: 'עברית', english: 'אנגלית', science: 'מדע', general: 'כללי' };
  const SUBJECT_COLORS: Record<string, string> = { math: '#3B82F6', hebrew: '#EC4899', english: '#EF4444', science: '#16A34A', general: '#7C3AED' };

  return (
    <div className="space-y-4">
      {/* Kid selector */}
      <div className="flex gap-2">
        {state.kids.map(k => (
          <button key={k.id} onClick={() => setSelectedKid(k.id)}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${selectedKid === k.id ? 'text-white' : 'bg-white text-gray-500 border border-gray-200'}`}
            style={selectedKid === k.id ? { background: k.color } : {}}>
            {k.emoji} {k.name}
          </button>
        ))}
      </div>

      {kid.completedExercises.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-gray-100">
          <div className="text-4xl mb-2">📊</div>
          <p className="text-gray-500 font-medium">עדיין אין נתוני תרגול</p>
          <p className="text-gray-400 text-sm mt-1">יופיעו כאן אחרי שהילד ישלים תרגולים</p>
        </div>
      ) : (
        <>
          {/* Subject breakdown */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">📊 ביצועים לפי נושא</h3>
            <div className="space-y-3">
              {Object.entries(subjectStats).map(([subj, s]) => {
                const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
                const color = SUBJECT_COLORS[subj] ?? '#64748b';
                return (
                  <div key={subj}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold text-gray-700">{SUBJECT_LABELS[subj] ?? subj}</span>
                      <span className="text-sm font-black" style={{ color }}>{pct}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: color }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{s.correct} / {s.total} תשובות נכון</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weak areas */}
          {weakExercises.length > 0 && (
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-700 mb-1">⚠️ נקודות לחיזוק</h3>
              <p className="text-xs text-gray-400 mb-4">ממוינות מהחלש לחזק</p>
              <div className="space-y-2">
                {weakExercises.map(ex => {
                  const color = ex.pct < 60 ? '#EF4444' : ex.pct < 80 ? '#F59E0B' : '#10B981';
                  return (
                    <div key={ex.id}>
                      <button onClick={() => setExpandedEx(expandedEx === ex.id ? null : ex.id)}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors text-right">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-gray-700">{ex.title}</span>
                            <span className="text-sm font-black" style={{ color }}>{ex.pct}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${ex.pct}%`, background: color }} />
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">{ex.sessions} סשן • {ex.correct}/{ex.total} נכון</p>
                        </div>
                        <span className="text-gray-400 text-xs">{expandedEx === ex.id ? '▲' : '▼'}</span>
                      </button>

                      {/* Drill-down: wrong answers for this exercise */}
                      {expandedEx === ex.id && (
                        <div className="mr-4 mt-1 space-y-1.5 pb-2">
                          {kid.completedExercises
                            .filter(ce => ce.exerciseTypeId === ex.id)
                            .flatMap(ce => (ce.attempts ?? []).filter(a => !a.isCorrect))
                            .slice(-8)
                            .map((a, i) => (
                              <div key={i} className="bg-red-50 rounded-xl p-2.5 border border-red-100">
                                <p className="text-xs font-bold text-gray-700 whitespace-pre-line">{a.questionText}</p>
                                <div className="flex gap-4 mt-1">
                                  <span className="text-xs text-red-500">✗ {a.chosenOption}</span>
                                  <span className="text-xs text-emerald-600">✓ {a.correctOption}</span>
                                </div>
                              </div>
                            ))}
                          {kid.completedExercises.filter(ce => ce.exerciseTypeId === ex.id).flatMap(ce => ce.attempts.filter(a => !a.isCorrect)).length === 0 && (
                            <p className="text-xs text-gray-400 pr-2">אין טעויות מוקלטות עדיין</p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent wrong answers */}
          {allWrong.length > 0 && (
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-700 mb-1">❌ טעויות אחרונות</h3>
              <p className="text-xs text-gray-400 mb-4">40 הטעויות האחרונות בכל התרגולים</p>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {allWrong.slice().reverse().map((a, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-xs font-bold text-gray-500">{a.exerciseTitle}</span>
                      <span className="text-xs text-gray-400">{new Date(a.date).toLocaleDateString('he-IL', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 whitespace-pre-line">{a.questionText}</p>
                    <div className="flex gap-4 mt-1.5">
                      <span className="text-xs text-red-500 font-medium">✗ ענה: {a.chosenOption}</span>
                      <span className="text-xs text-emerald-600 font-medium">✓ נכון: {a.correctOption}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── OVERVIEW TAB ─────────────────────────────────────────────────────────────
function OverviewTab() {
  const { state, adjustPoints } = useAppStore();
  const [adjustKid, setAdjustKid] = useState<string | null>(null);
  const [delta, setDelta] = useState(10);
  const [reason, setReason] = useState('');

  return (
    <div className="space-y-4">
      {state.kids.map(kid => {
        const available = Math.max(0, kid.screenTimeEarned - kid.screenTimeUsed);
        const done = kid.tasks.filter(t => t.completed).length;
        const exSessions = kid.completedExercises.length;
        const totalCorrect = kid.completedExercises.reduce((s, e) => s + e.score, 0);
        const totalQs = kid.completedExercises.reduce((s, e) => s + e.total, 0);
        const accuracy = totalQs > 0 ? Math.round((totalCorrect / totalQs) * 100) : null;
        return (
          <div key={kid.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-3xl" style={{ background: `${kid.color}20` }}>{kid.emoji}</div>
              <div className="flex-1">
                <h3 className="font-black text-lg text-gray-800">{kid.name}</h3>
                <p className="text-sm text-gray-500">{kid.grade} · {kid.streak > 0 ? `🔥 ${kid.streak} ימים ברצף` : 'אין רצף'}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { label: 'נקודות', value: kid.totalPoints, color: kid.color },
                { label: 'מסך זמין', value: `${available}′`, color: '#10B981' },
                { label: 'משימות', value: `${done}/${kid.tasks.length}`, color: '#F59E0B' },
              ].map(s => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-2 text-center">
                  <p className="text-lg font-black" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-xl font-black text-blue-600">{exSessions}</p>
                <p className="text-xs text-blue-400">תרגולים הושלמו</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-3 text-center">
                <p className="text-xl font-black text-purple-600">{accuracy !== null ? `${accuracy}%` : '—'}</p>
                <p className="text-xs text-purple-400">דיוק ממוצע</p>
              </div>
            </div>

            {/* Achievements */}
            {kid.achievements.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {kid.achievements.slice(-6).map(a => {
                  const def = getAchievement(a.achievementId);
                  return def ? <span key={a.achievementId} title={def.title} className="text-2xl">{def.icon}</span> : null;
                })}
              </div>
            )}

            {/* Manual points adjust */}
            {adjustKid === kid.id ? (
              <div className="bg-gray-50 rounded-2xl p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <button onClick={() => setDelta(d => Math.max(1, d - 5))} className="w-8 h-8 rounded-full bg-gray-200 font-bold text-gray-700">-</button>
                  <span className="flex-1 text-center font-bold">{delta} נקודות</span>
                  <button onClick={() => setDelta(d => d + 5)} className="w-8 h-8 rounded-full bg-gray-200 font-bold text-gray-700">+</button>
                </div>
                <input value={reason} onChange={e => setReason(e.target.value)} placeholder="סיבה (אופציונלי)" className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none" />
                <div className="flex gap-2">
                  <button onClick={() => { adjustPoints(kid.id, delta, reason || 'התאמה ידנית'); setAdjustKid(null); setReason(''); }} className="flex-1 py-2 rounded-xl text-sm font-bold text-white" style={{ background: kid.color }}>הוסף</button>
                  <button onClick={() => { adjustPoints(kid.id, -delta, reason || 'הפחתה ידנית'); setAdjustKid(null); setReason(''); }} className="flex-1 py-2 rounded-xl text-sm font-bold text-white bg-red-400">הפחת</button>
                  <button onClick={() => setAdjustKid(null)} className="px-3 py-2 rounded-xl text-sm text-gray-500 bg-white border border-gray-200">ביטול</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setAdjustKid(kid.id)} className="w-full py-2 rounded-xl text-sm font-medium text-gray-500 bg-gray-50 hover:bg-gray-100">✏️ התאמת נקודות ידנית</button>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── TASKS TAB ────────────────────────────────────────────────────────────────
function TasksTab() {
  const { state, addTask, deleteTask, updateTask, completeTask, uncompleteTask } = useAppStore();
  const [selectedKid, setSelectedKid] = useState(state.kids[0]?.id ?? '');
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPoints, setNewPoints] = useState(15);
  const [newType, setNewType] = useState<Task['type']>('homework');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPoints, setEditPoints] = useState(0);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<Array<{ title: string; points: number; type: 'homework' | 'challenge'; reason: string }>>([]);
  const [aiError, setAiError] = useState('');
  const kid = state.kids.find(k => k.id === selectedKid);

  const submitAdd = () => {
    if (!newTitle.trim()) return;
    addTask(selectedKid, { title: newTitle.trim(), points: newPoints, type: newType });
    setNewTitle(''); setNewPoints(15); setShowAdd(false);
  };

  const fetchAiSuggestions = async () => {
    if (!kid) return;
    setAiLoading(true);
    setAiError('');
    setAiSuggestions([]);
    // Compute weak subjects from completed exercises
    const subjectErrors: Record<string, { wrong: number; total: number }> = {};
    for (const ce of kid.completedExercises) {
      const ex = (await import('@/lib/exercises')).EXERCISE_TYPES.find(e => e.id === ce.exerciseTypeId);
      if (!ex) continue;
      if (!subjectErrors[ex.subject]) subjectErrors[ex.subject] = { wrong: 0, total: 0 };
      subjectErrors[ex.subject].wrong += (ce.total - ce.score);
      subjectErrors[ex.subject].total += ce.total;
    }
    const SUBJECT_HE: Record<string, string> = { math: 'מתמטיקה', hebrew: 'עברית', english: 'אנגלית', science: 'מדעים', general: 'כללי' };
    const weakSubjects = Object.entries(subjectErrors)
      .filter(([, v]) => v.total > 0 && v.wrong / v.total > 0.3)
      .sort((a, b) => (b[1].wrong / b[1].total) - (a[1].wrong / a[1].total))
      .slice(0, 3)
      .map(([s]) => SUBJECT_HE[s] ?? s);
    try {
      const res = await fetch('/api/ai-tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kidName: kid.name,
          grade: kid.grade,
          weakSubjects,
          existingTasks: kid.tasks.map(t => t.title),
          count: 5,
        }),
      });
      const data = await res.json();
      if (data.error) setAiError(data.error);
      else setAiSuggestions(data.tasks ?? []);
    } catch {
      setAiError('שגיאה בהתחברות לשרת AI');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {state.kids.map(k => (
          <button key={k.id} onClick={() => setSelectedKid(k.id)}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${selectedKid === k.id ? 'text-white' : 'bg-white text-gray-500 border border-gray-200'}`}
            style={selectedKid === k.id ? { background: k.color } : {}}>
            {k.emoji} {k.name}
          </button>
        ))}
      </div>

      {showAdd ? (
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 space-y-3">
          <div className="flex gap-2">
            {(['homework', 'challenge'] as const).map(t => (
              <button key={t} onClick={() => setNewType(t)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium ${newType === t ? 'text-white' : 'bg-gray-50 text-gray-500'}`}
                style={newType === t ? { background: kid?.color } : {}}>
                {t === 'homework' ? '📚 שיעורי בית' : '🏆 אתגר'}
              </button>
            ))}
          </div>
          <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="שם המשימה..." className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none" autoFocus />
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 w-20">נקודות ({newPoints}):</span>
            <input type="range" min={5} max={50} step={5} value={newPoints} onChange={e => setNewPoints(+e.target.value)} className="flex-1" style={{ accentColor: kid?.color }} />
          </div>
          <div className="flex gap-2">
            <button onClick={submitAdd} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: kid?.color }}>הוסף</button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2.5 rounded-xl text-sm text-gray-500 bg-gray-100">ביטול</button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <button onClick={() => setShowAdd(true)} className="flex-1 py-3 rounded-2xl text-sm font-bold text-white" style={{ background: kid?.color }}>+ הוסף משימה</button>
          <button onClick={fetchAiSuggestions} disabled={aiLoading}
            className="px-4 py-3 rounded-2xl text-sm font-bold border-2 transition-all disabled:opacity-50"
            style={{ borderColor: kid?.color, color: kid?.color }}>
            {aiLoading ? '⏳' : '✨ AI'}
          </button>
        </div>
      )}

      {/* AI Suggestions */}
      {aiError && <p className="text-red-500 text-xs text-center py-2">{aiError}</p>}
      {aiSuggestions.length > 0 && (
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-4 border border-purple-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-purple-800 text-sm flex items-center gap-1.5">✨ הצעות AI ל{kid?.name}</h3>
            <button onClick={() => setAiSuggestions([])} className="text-gray-400 hover:text-gray-600 text-xs">✕ סגור</button>
          </div>
          <div className="space-y-2">
            {aiSuggestions.map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-purple-100">
                <div className="flex items-start gap-2">
                  <span className="text-lg">{s.type === 'homework' ? '📚' : '🏆'}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">{s.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.reason}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">{s.points}נ׳</span>
                    <button
                      onClick={() => { addTask(selectedKid, { title: s.title, points: s.points, type: s.type }); setAiSuggestions(prev => prev.filter((_, j) => j !== i)); }}
                      className="w-7 h-7 rounded-full text-white text-sm flex items-center justify-center"
                      style={{ background: kid?.color }}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => { aiSuggestions.forEach(s => addTask(selectedKid, { title: s.title, points: s.points, type: s.type })); setAiSuggestions([]); }}
              className="w-full py-2.5 rounded-xl text-sm font-bold text-white mt-1"
              style={{ background: kid?.color }}>
              הוסף את כולן ({aiSuggestions.length})
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {kid?.tasks.map(task => (
          <div key={task.id} className={`bg-white rounded-2xl border border-gray-100 p-3 ${task.completed ? 'opacity-60' : ''}`}>
            {editingId === task.id ? (
              <div className="space-y-2">
                <input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none" />
                <div className="flex items-center gap-2">
                  <input type="range" min={5} max={50} step={5} value={editPoints} onChange={e => setEditPoints(+e.target.value)} className="flex-1" style={{ accentColor: kid.color }} />
                  <span className="font-bold text-sm w-8 text-center" style={{ color: kid.color }}>{editPoints}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { updateTask(kid.id, task.id, { title: editTitle, points: editPoints }); setEditingId(null); }} className="flex-1 py-2 rounded-xl text-xs font-bold text-white" style={{ background: kid.color }}>שמור</button>
                  <button onClick={() => setEditingId(null)} className="px-3 py-2 rounded-xl text-xs text-gray-500 bg-gray-100">ביטול</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => task.completed ? uncompleteTask(kid.id, task.id) : completeTask(kid.id, task.id)}
                  className="w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: task.completed ? kid.color : '#d1d5db', background: task.completed ? kid.color : 'transparent' }}>
                  {task.completed && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                </button>
                <span className={`flex-1 text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>{task.title}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${kid.color}15`, color: kid.color }}>{task.points}נ׳</span>
                <button onClick={() => { setEditingId(task.id); setEditTitle(task.title); setEditPoints(task.points); }} className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 text-sm">✏️</button>
                <button onClick={() => deleteTask(kid.id, task.id)} className="w-7 h-7 rounded-full hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-400 text-sm">✕</button>
              </div>
            )}
          </div>
        ))}
        {kid?.tasks.length === 0 && <p className="text-center text-gray-400 py-6 text-sm">אין משימות עדיין</p>}
      </div>
    </div>
  );
}

// ─── HISTORY TAB ─────────────────────────────────────────────────────────────
function HistoryTab() {
  const { state } = useAppStore();
  const [selectedKid, setSelectedKid] = useState(state.kids[0]?.id ?? '');
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const kid = state.kids.find(k => k.id === selectedKid);
  const TYPE_ICON: Record<string, string> = { task: '✅', exercise: '📚', screen_time: '📱' };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {state.kids.map(k => (
          <button key={k.id} onClick={() => setSelectedKid(k.id)}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${selectedKid === k.id ? 'text-white' : 'bg-white text-gray-500 border border-gray-200'}`}
            style={selectedKid === k.id ? { background: k.color } : {}}>
            {k.emoji} {k.name}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {!kid?.history.length && <p className="text-center text-gray-400 py-8 text-sm">אין היסטוריה עדיין</p>}
        {kid?.history.slice(0, 60).map(entry => {
          const relatedEx = entry.type === 'exercise'
            ? kid.completedExercises.find(ce => Math.abs(new Date(ce.completedAt).getTime() - new Date(entry.timestamp).getTime()) < 5000)
            : null;
          return (
            <div key={entry.id} className="bg-white rounded-2xl border border-gray-100">
              <button onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}
                className="w-full flex items-center gap-3 p-3 text-right">
                <span className="text-xl flex-shrink-0">{TYPE_ICON[entry.type]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{entry.title}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(entry.timestamp).toLocaleDateString('he-IL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    {entry.detail && ` · ${entry.detail}`}
                  </p>
                </div>
                <span className={`text-sm font-black flex-shrink-0 ${entry.points >= 0 ? 'text-emerald-600' : 'text-red-400'}`}>
                  {entry.points >= 0 ? '+' : ''}{entry.points}
                </span>
                {relatedEx && <span className="text-gray-300 text-xs">{expandedEntry === entry.id ? '▲' : '▼'}</span>}
              </button>
              {/* Drill-down: show wrong answers for exercise entries */}
              {expandedEntry === entry.id && relatedEx && (
                <div className="px-3 pb-3 space-y-1.5">
                  <p className="text-xs font-bold text-gray-500 mb-2">{relatedEx.score}/{relatedEx.total} תשובות נכון</p>
                  {(relatedEx.attempts ?? []).map((a, i) => (
                    <div key={i} className={`rounded-xl p-2 flex items-start gap-2 ${a.isCorrect ? 'bg-emerald-50' : 'bg-red-50'}`}>
                      <span className="text-xs">{a.isCorrect ? '✅' : '❌'}</span>
                      <div className="flex-1">
                        <p className="text-xs text-gray-700 whitespace-pre-line">{a.questionText}</p>
                        {!a.isCorrect && (
                          <div className="flex gap-3 mt-0.5">
                            <span className="text-xs text-red-500">ענה: {a.chosenOption}</span>
                            <span className="text-xs text-emerald-600">נכון: {a.correctOption}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── SETTINGS TAB ────────────────────────────────────────────────────────────
function SettingsTab() {
  const { state, updateSettings, resetKidData } = useAppStore();
  const [pin, setPin] = useState(state.settings.parentPin);
  const [ppm, setPpm] = useState(state.settings.pointsPerMinute);
  const [maxMin, setMaxMin] = useState(state.settings.maxDailyScreenMinutes);
  const [saved, setSaved] = useState(false);
  const [resetTarget, setResetTarget] = useState<string | null>(null);

  const save = () => {
    updateSettings({ parentPin: pin, pointsPerMinute: ppm, maxDailyScreenMinutes: maxMin });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4">
        <h3 className="font-bold text-gray-700">הגדרות מערכת</h3>
        <div>
          <label className="text-sm text-gray-600 block mb-1">קוד PIN להורים (4 ספרות)</label>
          <input value={pin} onChange={e => setPin(e.target.value.replace(/\D/g,'').slice(0,4))} maxLength={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-center text-2xl font-bold tracking-[0.5em]" placeholder="1234" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm text-gray-600">יחס נקודות → דקות מסך</label>
            <span className="text-sm font-bold text-blue-600">1 נקודה = {ppm} דקה</span>
          </div>
          <input type="range" min={1} max={5} step={1} value={ppm} onChange={e => setPpm(+e.target.value)} className="w-full" style={{ accentColor: '#3B82F6' }} />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm text-gray-600">מקסימום מסך יומי</label>
            <span className="text-sm font-bold text-blue-600">{maxMin} דקות</span>
          </div>
          <input type="range" min={30} max={240} step={15} value={maxMin} onChange={e => setMaxMin(+e.target.value)} className="w-full" style={{ accentColor: '#3B82F6' }} />
        </div>
        <button onClick={save} className={`w-full py-3 rounded-xl font-bold text-white transition-colors ${saved ? 'bg-emerald-500' : 'bg-blue-500 hover:bg-blue-600'}`}>
          {saved ? '✅ נשמר!' : 'שמור הגדרות'}
        </button>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-red-100 space-y-3">
        <h3 className="font-bold text-red-600">אזור מסוכן</h3>
        {state.kids.map(kid => (
          <div key={kid.id}>
            {resetTarget === kid.id ? (
              <div className="bg-red-50 rounded-2xl p-3 space-y-2">
                <p className="text-sm text-red-700 font-medium">איפוס נתוני {kid.name} — לא ניתן לשחזר!</p>
                <div className="flex gap-2">
                  <button onClick={() => { resetKidData(kid.id); setResetTarget(null); }} className="flex-1 py-2 rounded-xl text-sm font-bold text-white bg-red-500">אפס</button>
                  <button onClick={() => setResetTarget(null)} className="flex-1 py-2 rounded-xl text-sm text-gray-500 bg-gray-100">ביטול</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setResetTarget(kid.id)} className="w-full py-2.5 rounded-xl text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-colors">
                🗑️ אפס נתונים של {kid.emoji} {kid.name}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Parent Page ──────────────────────────────────────────────────────────────
export default function ParentPage() {
  const { state, ready } = useAppStore();
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState<Tab>('overview');

  if (!ready) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 rounded-full border-4 border-slate-300 border-t-blue-500 animate-spin" /></div>;
  if (!unlocked) return <PinGate pin={state.settings.parentPin} onUnlock={() => setUnlocked(true)} />;

  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview',  label: 'סקירה',      icon: '📊' },
    { id: 'analytics', label: 'ניתוח',      icon: '🔍' },
    { id: 'tasks',     label: 'משימות',     icon: '📋' },
    { id: 'history',   label: 'היסטוריה',   icon: '📜' },
    { id: 'settings',  label: 'הגדרות',     icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-gray-200 px-5 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <Link href="/" className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <span className="text-2xl">👨‍👩‍👧‍👦</span>
          <div>
            <h1 className="font-black text-gray-800 text-lg leading-none">לוח ניהול הורים</h1>
            <p className="text-xs text-gray-400">KidStar</p>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200 sticky top-[69px] z-10">
        <div className="flex max-w-lg mx-auto overflow-x-auto">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-none px-3 py-3 text-xs font-bold transition-all border-b-2 ${tab === t.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
              <span className="block text-base mb-0.5">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="px-4 py-4 pb-10 max-w-lg mx-auto">
        {tab === 'overview'  && <OverviewTab />}
        {tab === 'analytics' && <AnalyticsTab />}
        {tab === 'tasks'     && <TasksTab />}
        {tab === 'history'   && <HistoryTab />}
        {tab === 'settings'  && <SettingsTab />}
      </main>
    </div>
  );
}
