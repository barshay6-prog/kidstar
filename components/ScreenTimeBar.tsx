'use client';

interface ScreenTimeBarProps {
  earned: number;
  used: number;
  color: string;
}

export default function ScreenTimeBar({ earned, used, color }: ScreenTimeBarProps) {
  const available = Math.max(0, earned - used);
  const pct = earned === 0 ? 0 : Math.min(100, (available / earned) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-semibold" style={{ color }}>
          {available} דקות זמינות
        </span>
        <span className="text-gray-400 text-xs">{used} נוצלו</span>
      </div>
      <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}cc, ${color})`,
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>0</span>
        <span>{earned} דקות סה״כ</span>
      </div>
    </div>
  );
}
