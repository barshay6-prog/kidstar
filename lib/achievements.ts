import { AchievementDef, Kid } from './types';

export const ACHIEVEMENTS: AchievementDef[] = [
  // Points milestones
  { id: 'first-points',   title: 'כוכב מתחיל',    description: 'הרווחת את הנקודה הראשונה שלך',   icon: '⭐', rarity: 'common' },
  { id: 'pts-50',         title: 'אספן נקודות',   description: 'הגעת ל-50 נקודות',               icon: '🌟', rarity: 'common' },
  { id: 'pts-100',        title: 'מאה נקודות!',   description: 'הגעת ל-100 נקודות סה״כ',         icon: '💯', rarity: 'rare'   },
  { id: 'pts-250',        title: 'סופר-כוכב',     description: 'הגעת ל-250 נקודות סה״כ',         icon: '🏆', rarity: 'epic'   },
  { id: 'pts-500',        title: 'אלוף!',          description: 'הגעת ל-500 נקודות סה״כ',         icon: '👑', rarity: 'epic'   },

  // Task milestones
  { id: 'first-task',     title: 'צעד ראשון',      description: 'השלמת את המשימה הראשונה',         icon: '✅', rarity: 'common' },
  { id: 'tasks-5',        title: 'עובד קשה',       description: 'השלמת 5 משימות',                 icon: '💪', rarity: 'common' },
  { id: 'tasks-20',       title: 'מכונת עבודה',   description: 'השלמת 20 משימות',                icon: '🔥', rarity: 'rare'   },
  { id: 'tasks-50',       title: 'אלוף משימות',   description: 'השלמת 50 משימות',                icon: '🦸', rarity: 'epic'   },

  // Exercise milestones
  { id: 'first-exercise', title: 'תלמיד מצטיין',  description: 'השלמת תרגול לימודי ראשון',       icon: '📚', rarity: 'common' },
  { id: 'exercise-5',     title: 'חוקר ידע',      description: 'השלמת 5 תרגולים לימודיים',       icon: '🔬', rarity: 'rare'   },
  { id: 'perfect-score',  title: 'מושלם!',         description: 'קיבלת 100% בתרגול',              icon: '🎯', rarity: 'rare'   },
  { id: 'exercise-10',    title: 'גאון',           description: 'השלמת 10 תרגולים לימודיים',      icon: '🧠', rarity: 'epic'   },

  // Streak
  { id: 'streak-3',       title: 'שלושה ברצף',    description: '3 ימים רצופים עם משימות',         icon: '🔥', rarity: 'rare'   },
  { id: 'streak-7',       title: 'שבוע שלם!',     description: '7 ימים רצופים עם משימות',         icon: '🗓️', rarity: 'epic'  },

  // Screen time
  { id: 'screen-60',      title: 'הרווחתי מסך',   description: 'הרווחת 60 דקות מסך',             icon: '📱', rarity: 'common' },
  { id: 'screen-300',     title: 'מלך המסך',      description: 'הרווחת 300 דקות מסך',            icon: '🖥️', rarity: 'rare'  },
];

export function checkAchievements(kid: Kid): string[] {
  const already = new Set(kid.achievements.map((a) => a.achievementId));
  const newOnes: string[] = [];

  const totalCompleted = kid.history.filter((h) => h.type === 'task' || h.type === 'exercise').length;
  const completedTasks = kid.history.filter((h) => h.type === 'task').length;
  const completedExercises = kid.completedExercises.length;
  const hasPerfect = kid.completedExercises.some((e) => e.score === e.total);

  const checks: [string, boolean][] = [
    ['first-points',   kid.allTimePoints >= 1],
    ['pts-50',         kid.allTimePoints >= 50],
    ['pts-100',        kid.allTimePoints >= 100],
    ['pts-250',        kid.allTimePoints >= 250],
    ['pts-500',        kid.allTimePoints >= 500],
    ['first-task',     completedTasks >= 1],
    ['tasks-5',        completedTasks >= 5],
    ['tasks-20',       completedTasks >= 20],
    ['tasks-50',       completedTasks >= 50],
    ['first-exercise', completedExercises >= 1],
    ['exercise-5',     completedExercises >= 5],
    ['exercise-10',    completedExercises >= 10],
    ['perfect-score',  hasPerfect],
    ['streak-3',       kid.streak >= 3],
    ['streak-7',       kid.streak >= 7],
    ['screen-60',      kid.screenTimeEarned >= 60],
    ['screen-300',     kid.screenTimeEarned >= 300],
  ];

  for (const [id, condition] of checks) {
    if (condition && !already.has(id)) newOnes.push(id);
  }
  return newOnes;
}

export function getAchievement(id: string): AchievementDef | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id);
}
