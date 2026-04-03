'use client';

import { useState } from 'react';

interface UseScreenTimeModalProps {
  available: number;
  kidColor: string;
  kidName: string;
  onUse: (minutes: number) => void;
  onClose: () => void;
}

const QUICK_AMOUNTS = [10, 15, 20, 30, 45, 60];

export default function UseScreenTimeModal({
  available,
  kidColor,
  kidName,
  onUse,
  onClose,
}: UseScreenTimeModalProps) {
  const [minutes, setMinutes] = useState(Math.min(30, available));

  const handle = (m: number) => {
    if (m > available) return;
    onUse(m);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 z-10">
        <div className="text-center mb-5">
          <div className="text-4xl mb-2">📺</div>
          <h2 className="text-xl font-bold text-gray-800">זמן מסך ל{kidName}</h2>
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-bold" style={{ color: kidColor }}>{available}</span> דקות זמינות
          </p>
        </div>

        {available === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500 text-sm">אין זמן מסך זמין כרגע.</p>
            <p className="text-gray-400 text-xs mt-1">השלם משימות כדי להרוויח נקודות!</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {QUICK_AMOUNTS.filter((a) => a <= available).map((a) => (
                <button
                  key={a}
                  onClick={() => handle(a)}
                  className="px-4 py-2 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-95"
                  style={{ background: kidColor }}
                >
                  {a} דק׳
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={5}
                  max={available}
                  step={5}
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  className="flex-1"
                  style={{ accentColor: kidColor }}
                />
                <span className="font-bold text-lg w-12 text-center" style={{ color: kidColor }}>
                  {minutes}
                </span>
              </div>
              <button
                onClick={() => handle(minutes)}
                className="w-full py-3 rounded-xl font-bold text-white transition-all hover:opacity-90 active:scale-95"
                style={{ background: kidColor }}
              >
                השתמש ב-{minutes} דקות
              </button>
            </div>
          </>
        )}

        <button
          onClick={onClose}
          className="w-full mt-3 py-2.5 rounded-xl font-medium text-gray-500 hover:bg-gray-100 transition-colors text-sm"
        >
          ביטול
        </button>
      </div>
    </div>
  );
}
