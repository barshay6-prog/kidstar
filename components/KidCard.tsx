'use client';

import Link from 'next/link';
import { Kid } from '@/lib/types';

interface KidCardProps {
  kid: Kid;
}

export default function KidCard({ kid }: KidCardProps) {
  const available = Math.max(0, kid.screenTimeEarned - kid.screenTimeUsed);
  const completed = kid.tasks.filter((t) => t.completed).length;
  const total = kid.tasks.length;
  const progressPct = total === 0 ? 0 : (completed / total) * 100;

  return (
    <Link href={`/kid/${kid.id}`} className="block group">
      <div
        className="relative rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${kid.color}15, ${kid.color}30)`, borderTop: `4px solid ${kid.color}` }}
      >
        {/* Background decoration */}
        <div
          className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-10"
          style={{ background: kid.color }}
        />
        <div
          className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full opacity-10"
          style={{ background: kid.color }}
        />

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 relative">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm"
            style={{ background: `${kid.color}25` }}
          >
            {kid.emoji}
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-800">{kid.name}</h2>
            <p className="text-sm text-gray-500">{kid.grade} • גיל {kid.age}</p>
          </div>
          <div className="mr-auto">
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </div>

        {/* Points */}
        <div className="flex gap-3 mb-4">
          <div
            className="flex-1 rounded-2xl p-3 text-center"
            style={{ background: `${kid.color}20` }}
          >
            <p className="text-2xl font-black" style={{ color: kid.color }}>
              {kid.totalPoints}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">נקודות</p>
          </div>
          <div className="flex-1 rounded-2xl p-3 text-center bg-white/60">
            <p className="text-2xl font-black text-emerald-600">{available}</p>
            <p className="text-xs text-gray-500 mt-0.5">דק׳ מסך</p>
          </div>
        </div>

        {/* Tasks progress */}
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>משימות היום</span>
            <span className="font-semibold" style={{ color: kid.color }}>
              {completed}/{total}
            </span>
          </div>
          <div className="w-full h-2.5 bg-white/60 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPct}%`,
                background: `linear-gradient(90deg, ${kid.color}aa, ${kid.color})`,
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
