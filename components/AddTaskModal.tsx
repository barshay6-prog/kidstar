'use client';

import { useState } from 'react';
import { Task } from '@/lib/types';

interface AddTaskModalProps {
  kidColor: string;
  onAdd: (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
  onClose: () => void;
}

const QUICK_TASKS = {
  homework: [
    { title: 'שיעורי בית מתמטיקה', points: 20 },
    { title: 'קריאה 20 דקות', points: 15 },
    { title: 'שיעורי בית אנגלית', points: 20 },
    { title: 'כתיבת חיבור', points: 25 },
  ],
  challenge: [
    { title: 'למד משהו חדש', points: 15 },
    { title: 'עזור בבית', points: 10 },
    { title: 'אתגר ספורט', points: 20 },
    { title: 'פרויקט יצירתי', points: 25 },
  ],
};

export default function AddTaskModal({ kidColor, onAdd, onClose }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState(15);
  const [type, setType] = useState<Task['type']>('homework');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), points, type });
    onClose();
  };

  const handleQuick = (t: string, p: number) => {
    setTitle(t);
    setPoints(p);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-800">משימה חדשה</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type toggle */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
            {(['homework', 'challenge'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  type === t ? 'bg-white shadow text-gray-800' : 'text-gray-500'
                }`}
              >
                {t === 'homework' ? '📚 שיעורי בית' : '🏆 אתגר'}
              </button>
            ))}
          </div>

          {/* Quick pick */}
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">בחר מהיר:</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_TASKS[type].map((q) => (
                <button
                  key={q.title}
                  type="button"
                  onClick={() => handleQuick(q.title, q.points)}
                  className="text-xs px-3 py-1.5 rounded-full border border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
                >
                  {q.title}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">שם המשימה</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="הכנס שם משימה..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 text-sm transition-all"
              autoFocus
            />
          </div>

          {/* Points slider */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">נקודות</label>
              <span
                className="text-lg font-bold"
                style={{ color: kidColor }}
              >
                {points} ⭐
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              step={5}
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              className="w-full accent-current"
              style={{ accentColor: kidColor }}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>5 = 5 דקות מסך</span>
              <span>50 = 50 דקות מסך</span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!title.trim()}
            className="w-full py-3.5 rounded-xl font-bold text-white text-base transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: kidColor }}
          >
            הוסף משימה
          </button>
        </form>
      </div>
    </div>
  );
}
