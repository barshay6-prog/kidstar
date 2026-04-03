'use client';

import { Task } from '@/lib/types';

interface TaskCardProps {
  task: Task;
  kidColor: string;
  onComplete: (taskId: string) => void;
  onUncomplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const TYPE_LABELS: Record<Task['type'], string> = {
  homework: 'שיעורי בית',
  challenge: 'אתגר',
};

const TYPE_COLORS: Record<Task['type'], string> = {
  homework: 'bg-amber-50 text-amber-700 border-amber-200',
  challenge: 'bg-purple-50 text-purple-700 border-purple-200',
};

const TYPE_ICONS: Record<Task['type'], string> = {
  homework: '📚',
  challenge: '🏆',
};

export default function TaskCard({
  task,
  kidColor,
  onComplete,
  onUncomplete,
  onDelete,
}: TaskCardProps) {
  return (
    <div
      className={`relative flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 ${
        task.completed
          ? 'bg-gray-50 border-gray-100 opacity-70'
          : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() =>
          task.completed ? onUncomplete(task.id) : onComplete(task.id)
        }
        className="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{
          borderColor: task.completed ? kidColor : '#d1d5db',
          background: task.completed ? kidColor : 'transparent',
        }}
        aria-label={task.completed ? 'בטל השלמה' : 'סמן כהושלם'}
      >
        {task.completed && (
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`font-medium text-sm leading-snug ${
            task.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {task.title}
        </p>
        <span
          className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs border font-medium ${TYPE_COLORS[task.type]}`}
        >
          {TYPE_ICONS[task.type]} {TYPE_LABELS[task.type]}
        </span>
      </div>

      {/* Points badge */}
      <div
        className="flex-shrink-0 flex flex-col items-center px-3 py-1.5 rounded-xl"
        style={{
          background: task.completed ? '#f3f4f6' : `${kidColor}18`,
        }}
      >
        <span
          className="text-lg font-bold leading-none"
          style={{ color: task.completed ? '#9ca3af' : kidColor }}
        >
          {task.points}
        </span>
        <span className="text-xs text-gray-400 leading-none mt-0.5">נק׳</span>
      </div>

      {/* Delete */}
      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all"
        aria-label="מחק משימה"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Completion sparkle */}
      {task.completed && (
        <span className="absolute -top-1 -left-1 text-base star-pop">⭐</span>
      )}
    </div>
  );
}
