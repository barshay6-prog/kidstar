'use client';

import { use, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { EXERCISE_TYPES, generateQuestions, calcPoints } from '@/lib/exercises';
import { ExerciseQuestion, ExerciseType, AttemptDetail } from '@/lib/types';

interface PageProps { params: Promise<{ id: string; type: string }> }
type Phase = 'ready' | 'reading' | 'question' | 'done';

// ─── TTS helper ───────────────────────────────────────────────────────────────
function speakHebrew(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text.replace(/\n/g, ' '));
  utt.lang = 'he-IL';
  utt.rate = 0.82;
  utt.pitch = 1.05;
  window.speechSynthesis.speak(utt);
}

// ─── Nav Overlay (back + home — always on top) ────────────────────────────────
function NavOverlay({ backHref, homeHref }: { backHref: string; homeHref: string }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 pb-2 flex items-center justify-between pointer-events-none">
      <Link href={backHref}
        className="pointer-events-auto w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-sm shadow-md border border-gray-100 flex items-center justify-center hover:bg-white transition-all active:scale-90">
        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </Link>
      <Link href={homeHref}
        className="pointer-events-auto w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-sm shadow-md border border-gray-100 flex items-center justify-center hover:bg-white transition-all active:scale-90 text-lg">
        🏠
      </Link>
    </div>
  );
}

// ─── TTS Button ───────────────────────────────────────────────────────────────
function TtsButton({ text, color }: { text: string; color: string }) {
  const [speaking, setSpeaking] = useState(false);
  const handle = () => {
    setSpeaking(true);
    speakHebrew(text);
    setTimeout(() => setSpeaking(false), text.length * 60 + 500);
  };
  return (
    <button onClick={handle}
      className="mt-3 mx-auto flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-sm border transition-all active:scale-95"
      style={{ borderColor: color, color: speaking ? 'white' : color, background: speaking ? color : 'white' }}>
      <span className={speaking ? 'animate-pulse' : ''}>{speaking ? '🔊' : '🔈'}</span>
      {speaking ? 'מקריא...' : 'הקראה'}
    </button>
  );
}

// ─── Ready ───────────────────────────────────────────────────────────────────
function ReadyScreen({ ex, kidName, kidColor, onStart }: { ex: ExerciseType; kidName: string; kidColor: string; onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center pt-16">
      <div className="text-8xl mb-4 drop-shadow-lg">{ex.icon}</div>
      <h1 className="text-3xl font-black text-gray-800 mb-1">{ex.title}</h1>
      <p className="text-gray-500 mb-6">{ex.description}</p>
      <div className="grid grid-cols-3 gap-3 mb-8 w-full max-w-xs">
        {[
          { label: 'שאלות', value: ex.questionsCount, icon: '❓' },
          { label: 'זמן משוער', value: `~${ex.estimatedMinutes} דק׳`, icon: '⏱️' },
          { label: 'עד', value: `${ex.maxPoints} נק׳`, icon: '⭐' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 text-center">
            <div className="text-xl mb-1">{s.icon}</div>
            <p className="font-black text-gray-800 text-sm">{s.value}</p>
            <p className="text-xs text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>
      <button onClick={onStart}
        className="w-full max-w-xs py-5 rounded-3xl font-black text-white text-xl shadow-2xl active:scale-95 transition-all"
        style={{ background: `linear-gradient(135deg, ${ex.color}cc, ${ex.color})` }}>
        ▶ התחל עכשיו!
      </button>
      <p className="text-gray-400 text-sm mt-4">{kidName}, אתה מוכן?</p>
    </div>
  );
}

// ─── Reading Passage ──────────────────────────────────────────────────────────
function ReadingScreen({ ex, kidColor, onDone }: { ex: ExerciseType; kidColor: string; onDone: () => void }) {
  return (
    <div className="flex flex-col min-h-screen px-5 pt-16 pb-8 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-4xl">{ex.icon}</span>
        <div>
          <h2 className="font-black text-gray-800 text-lg leading-tight">{ex.passageTitle ?? ex.title}</h2>
          <p className="text-xs text-gray-500">קרא את הקטע ואז ענה על השאלות</p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-5 overflow-y-auto" style={{ direction: 'rtl' }}>
        <p className="text-gray-800 text-[15px] leading-8 whitespace-pre-line">{ex.passage}</p>
        {ex.passageSourceUrl && (
          <a href={ex.passageSourceUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-5 text-xs font-bold px-4 py-2 rounded-full border transition-all hover:opacity-80"
            style={{ borderColor: kidColor, color: kidColor }}>
            🔗 קרא עוד בוויקיפדיה
          </a>
        )}
      </div>

      <button onClick={onDone}
        className="w-full py-5 rounded-3xl font-black text-white text-xl shadow-xl active:scale-95 transition-all"
        style={{ background: `linear-gradient(135deg, ${kidColor}cc, ${kidColor})` }}>
        קראתי! בואו לשאלות ▶
      </button>
      <p className="text-center text-gray-400 text-xs mt-3">
        {ex.questionsCount} שאלות הבנה מחכות לך
      </p>
    </div>
  );
}

// ─── Question ─────────────────────────────────────────────────────────────────
function QuestionScreen({
  q, qi, total, selected, onSelect, kidColor, enableTTS,
}: {
  q: ExerciseQuestion; qi: number; total: number;
  selected: number | null; onSelect: (i: number) => void;
  kidColor: string; enableTTS: boolean;
}) {
  const pct = (qi / total) * 100;
  // Clean text for TTS (strip nikud display formatting)
  const ttsText = q.text.replace(/\n/g, ' ');

  return (
    <div className="flex flex-col min-h-screen px-5 pt-16 pb-6">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>שאלה {qi + 1} / {total}</span>
          <span>{Math.round(pct)}%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: kidColor }} />
        </div>
      </div>

      {/* Question bubble */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <p className="text-2xl font-black text-gray-800 text-center leading-relaxed whitespace-pre-line">{q.text}</p>
          {enableTTS && <TtsButton text={ttsText} color={kidColor} />}
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 mt-6 max-w-sm mx-auto w-full">
        {q.options.map((opt, i) => {
          let cls = 'bg-white border-2 border-gray-200 text-gray-700';
          if (selected !== null) {
            if (i === q.correctIndex) cls = 'bg-emerald-500 border-2 border-emerald-500 text-white';
            else if (i === selected) cls = 'bg-red-400 border-2 border-red-400 text-white';
            else cls = 'bg-gray-100 border-2 border-gray-100 text-gray-400';
          }
          return (
            <button key={i} onClick={() => selected === null && onSelect(i)}
              className={`py-5 px-2 rounded-2xl text-lg font-black transition-all text-center ${cls} ${selected === null ? 'active:scale-95 hover:border-gray-300 shadow-sm' : ''}`}>
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && q.explanation && (
        <div className="mt-4 max-w-sm mx-auto w-full bg-blue-50 rounded-2xl p-3 text-sm text-blue-700 text-center">
          💡 {q.explanation}
        </div>
      )}
    </div>
  );
}

// ─── Done ─────────────────────────────────────────────────────────────────────
function DoneScreen({ score, total, points, ex, attempts, onBack, onHome }: {
  score: number; total: number; points: number; ex: ExerciseType;
  attempts: AttemptDetail[]; onBack: () => void; onHome: () => void;
}) {
  const [showMistakes, setShowMistakes] = useState(false);
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const emoji = pct === 100 ? '🎯' : pct >= 80 ? '🌟' : pct >= 60 ? '👍' : '💪';
  const msg = pct === 100 ? 'מושלם! 100%!' : pct >= 80 ? 'כל הכבוד!' : pct >= 60 ? 'עבודה טובה!' : 'תמשיך להתאמן!';
  const mistakes = attempts.filter(a => !a.isCorrect);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center pb-10 pt-14">
      <span className="text-7xl mb-3 drop-shadow-lg">{emoji}</span>
      <h1 className="text-3xl font-black text-gray-800 mb-1">{msg}</h1>
      <p className="text-gray-500 mb-5">{score} מתוך {total} נכון</p>

      {/* Ring */}
      <div className="relative w-28 h-28 mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#f3f4f6" strokeWidth="10" />
          <circle cx="50" cy="50" r="42" fill="none" stroke={ex.color} strokeWidth="10"
            strokeDasharray={`${2 * Math.PI * 42 * pct / 100} ${2 * Math.PI * 42}`}
            strokeLinecap="round" style={{ transition: 'stroke-dasharray 1s ease' }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-black" style={{ color: ex.color }}>{pct}%</span>
        </div>
      </div>

      {/* Points card */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 w-full max-w-xs mb-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">נקודות שהרווחת</span>
          <span className="text-3xl font-black" style={{ color: ex.color }}>+{points} ⭐</span>
        </div>
        <p className="text-xs text-gray-400 text-center mt-1">= {points} דקות זמן מסך!</p>
      </div>

      {/* Mistakes review */}
      {mistakes.length > 0 && (
        <div className="w-full max-w-xs mb-4">
          <button onClick={() => setShowMistakes(!showMistakes)}
            className="w-full py-2.5 rounded-xl text-sm font-bold border-2 border-dashed border-red-200 text-red-500 hover:bg-red-50 transition-colors">
            {showMistakes ? '▲ הסתר' : `▼ ראה ${mistakes.length} טעויות`}
          </button>
          {showMistakes && (
            <div className="mt-2 space-y-2">
              {mistakes.map((m, i) => (
                <div key={i} className="bg-white rounded-2xl p-3 border border-red-100 text-right">
                  <p className="text-xs font-bold text-gray-700 mb-1 whitespace-pre-line">{m.questionText}</p>
                  <p className="text-xs text-red-500">✗ ענית: <strong>{m.chosenOption}</strong></p>
                  <p className="text-xs text-emerald-600">✓ נכון: <strong>{m.correctOption}</strong></p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3 w-full max-w-xs">
        <button onClick={onHome}
          className="w-12 h-12 rounded-2xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl flex-shrink-0 transition-all active:scale-90">
          🏠
        </button>
        <button onClick={onBack}
          className="flex-1 py-4 rounded-2xl font-black text-white text-lg active:scale-95 transition-all"
          style={{ background: ex.color }}>
          חזור לתרגולים
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ExerciseSessionPage({ params }: PageProps) {
  const { id, type } = use(params);
  const router = useRouter();
  const { state, ready, recordExercise } = useAppStore();

  const ex = EXERCISE_TYPES.find(e => e.id === type);
  const kid = state.kids.find(k => k.id === id);

  const [phase, setPhase] = useState<Phase>('ready');
  const [questions, setQuestions] = useState<ExerciseQuestion[]>([]);
  const [qi, setQi] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<AttemptDetail[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!ready || !ex || !kid) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin" />
    </div>
  );

  const backHref = `${kid.id === 'itai' || kid.id === 'aviv' ? `/kid/${id}/exercises` : `/kid/${id}`}`;

  const handleStart = () => {
    const qs = generateQuestions(type);
    setQuestions(qs);
    setAttempts([]);
    setQi(0);
    setSelected(null);
    setPhase(ex.passage ? 'reading' : 'question');
  };

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const q = questions[qi];
    const attempt: AttemptDetail = {
      questionText: q.text,
      chosenOption: q.options[i],
      correctOption: q.options[q.correctIndex],
      isCorrect: i === q.correctIndex,
    };
    const newAttempts = [...attempts, attempt];
    setAttempts(newAttempts);

    timerRef.current = setTimeout(() => {
      const nextQi = qi + 1;
      if (nextQi < questions.length) {
        setQi(nextQi);
        setSelected(null);
      } else {
        const score = newAttempts.filter(a => a.isCorrect).length;
        const total = questions.length;
        const points = calcPoints(ex, score, total);
        recordExercise(id, {
          exerciseTypeId: type,
          exerciseTitle: ex.title,
          score,
          total,
          pointsEarned: points,
          completedAt: new Date().toISOString(),
          attempts: newAttempts,
        });
        setPhase('done');
      }
    }, 1100);
  };

  const score = attempts.filter(a => a.isCorrect).length;
  const earnedPoints = phase === 'done' ? calcPoints(ex, score, questions.length) : 0;
  const enableTTS = kid.id === 'aviv';

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(160deg, ${kid.secondaryColor} 0%, #fff 70%)` }}>
      {/* Persistent nav — always visible */}
      <NavOverlay backHref={backHref} homeHref="/" />

      {phase === 'ready' && <ReadyScreen ex={ex} kidName={kid.name} kidColor={kid.color} onStart={handleStart} />}
      {phase === 'reading' && <ReadingScreen ex={ex} kidColor={kid.color} onDone={() => setPhase('question')} />}
      {phase === 'question' && questions.length > 0 && (
        <QuestionScreen
          q={questions[qi]} qi={qi} total={questions.length}
          selected={selected} onSelect={handleSelect}
          kidColor={kid.color} enableTTS={enableTTS}
        />
      )}
      {phase === 'done' && (
        <DoneScreen
          score={score} total={questions.length} points={earnedPoints}
          ex={ex} attempts={attempts}
          onBack={() => router.push(`/kid/${id}/exercises`)}
          onHome={() => router.push('/')}
        />
      )}
    </div>
  );
}
