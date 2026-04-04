export type TaskType = 'homework' | 'challenge';
export type Subject = 'math' | 'hebrew' | 'english' | 'science' | 'general';

// ─── Tasks ────────────────────────────────────────────────────────────────────
export interface Task {
  id: string;
  title: string;
  points: number;
  type: TaskType;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
  note?: string;
}

// ─── Exercises ────────────────────────────────────────────────────────────────
export interface ExerciseQuestion {
  id: string;
  difficulty: 1 | 2 | 3 | 4;
  text: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface ExerciseType {
  id: string;
  title: string;
  subject: Subject;
  icon: string;
  description: string;
  /** Points awarded just for finishing (any score) */
  minPoints: number;
  /** Points awarded for a perfect score */
  maxPoints: number;
  questionsCount: number;
  kidIds: string[];
  color: string;
  difficulty: 1 | 2 | 3 | 4;
  estimatedMinutes: number;
  /** Reading comprehension: full passage text shown before questions */
  passage?: string;
  passageTitle?: string;
  passageSourceUrl?: string;
}

/** Per-question attempt record — stored so parents can see exactly what went wrong */
export interface AttemptDetail {
  questionText: string;
  chosenOption: string;
  correctOption: string;
  isCorrect: boolean;
}

export interface CompletedExercise {
  id: string;
  exerciseTypeId: string;
  exerciseTitle: string;
  score: number;
  total: number;
  pointsEarned: number;
  completedAt: string;
  attempts: AttemptDetail[];
}

// ─── Achievements ─────────────────────────────────────────────────────────────
export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic';
}

export interface UnlockedAchievement {
  achievementId: string;
  unlockedAt: string;
}

// ─── History ──────────────────────────────────────────────────────────────────
export interface HistoryEntry {
  id: string;
  type: 'task' | 'exercise' | 'screen_time';
  title: string;
  points: number;
  timestamp: string;
  detail?: string;
}

// ─── Kid ──────────────────────────────────────────────────────────────────────
export interface Kid {
  id: string;
  name: string;
  age: number;
  grade: string;
  emoji: string;
  color: string;
  secondaryColor: string;
  interests: string[];
  totalPoints: number;
  allTimePoints: number;
  screenTimeEarned: number;
  screenTimeUsed: number;
  tasks: Task[];
  completedExercises: CompletedExercise[];
  achievements: UnlockedAchievement[];
  history: HistoryEntry[];
  streak: number;
  lastActiveDate?: string;
}

// ─── App ──────────────────────────────────────────────────────────────────────
export interface AppSettings {
  parentPin: string;
  pointsPerMinute: number;
  maxDailyScreenMinutes: number;
}

export interface AppState {
  kids: Kid[];
  lastReset: string;
  settings: AppSettings;
}

export const DEFAULT_SETTINGS: AppSettings = {
  parentPin: '1234',
  pointsPerMinute: 1,
  maxDailyScreenMinutes: 120,
};
