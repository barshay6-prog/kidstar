import { ExerciseType, ExerciseQuestion } from './types';

// ─── Exercise catalogue ───────────────────────────────────────────────────────
// Points ≈ estimated minutes of work (1 point = 1 minute screen time earned)
// minPoints = score for just completing, maxPoints = perfect score bonus

export const EXERCISE_TYPES: ExerciseType[] = [

  // ══ ITAI — Grade 4 ════════════════════════════════════════════════════════

  // Math
  { id: 'mul-tables',    title: 'לוח הכפל',         subject: 'math',    icon: '✖️',  description: 'כפל מ-2 עד 9',                kidIds: ['itai'], color: '#3B82F6', difficulty: 2, minPoints: 2, maxPoints: 5, questionsCount: 10, estimatedMinutes: 5 },
  { id: 'division',      title: 'חילוק',             subject: 'math',    icon: '➗',  description: 'חילוק בסיסי',                 kidIds: ['itai'], color: '#8B5CF6', difficulty: 2, minPoints: 2, maxPoints: 5, questionsCount: 8,  estimatedMinutes: 5 },
  { id: 'two-digit',     title: 'חיבור וחיסור',      subject: 'math',    icon: '🔢',  description: 'מספרים דו-ספרתיים',           kidIds: ['itai'], color: '#0EA5E9', difficulty: 2, minPoints: 2, maxPoints: 4, questionsCount: 10, estimatedMinutes: 4 },
  { id: 'fractions',     title: 'שברים',             subject: 'math',    icon: '½',   description: 'שברים פשוטים ½ ¼ ⅓',         kidIds: ['itai'], color: '#F59E0B', difficulty: 3, minPoints: 3, maxPoints: 7, questionsCount: 8,  estimatedMinutes: 7 },
  { id: 'sequences',     title: 'סדרות מספרים',      subject: 'math',    icon: '📈',  description: 'מצא את המספר הבא בסדרה',     kidIds: ['itai'], color: '#14B8A6', difficulty: 2, minPoints: 2, maxPoints: 4, questionsCount: 8,  estimatedMinutes: 4 },
  { id: 'geometry',      title: 'גאומטריה',          subject: 'math',    icon: '📐',  description: 'צורות, שטח והיקף',           kidIds: ['itai'], color: '#F97316', difficulty: 3, minPoints: 3, maxPoints: 6, questionsCount: 8,  estimatedMinutes: 6 },
  { id: 'soccer-math',   title: 'מתמטיקה ⚽',        subject: 'math',    icon: '⚽',  description: 'בעיות מילוליות בנושא כדורגל', kidIds: ['itai'], color: '#10B981', difficulty: 3, minPoints: 3, maxPoints: 6, questionsCount: 6,  estimatedMinutes: 6 },
  { id: 'big-numbers',   title: 'מספרים גדולים',     subject: 'math',    icon: '🔭',  description: 'אלפים, עשרות-אלפים',         kidIds: ['itai'], color: '#6366F1', difficulty: 3, minPoints: 3, maxPoints: 6, questionsCount: 8,  estimatedMinutes: 6 },

  // Hebrew
  { id: 'hebrew-spell-4',title: 'איות ד׳',           subject: 'hebrew',  icon: 'א',   description: 'איות מילים לכיתה ד',         kidIds: ['itai'], color: '#EC4899', difficulty: 2, minPoints: 2, maxPoints: 5, questionsCount: 8,  estimatedMinutes: 5 },
  { id: 'hebrew-grammar', title: 'דקדוק',            subject: 'hebrew',  icon: '📝',  description: 'ריבוי, נקבה, שמות תואר',     kidIds: ['itai'], color: '#DB2777', difficulty: 2, minPoints: 2, maxPoints: 5, questionsCount: 8,  estimatedMinutes: 5 },
  { id: 'hebrew-antonym', title: 'הפכים ונרדפות',    subject: 'hebrew',  icon: '🔄',  description: 'מילים הפוכות ודומות',        kidIds: ['itai'], color: '#9333EA', difficulty: 2, minPoints: 2, maxPoints: 4, questionsCount: 8,  estimatedMinutes: 4 },

  // English
  { id: 'english-vocab',  title: 'אנגלית: מילים',   subject: 'english', icon: '🇬🇧',  description: 'אוצר מילים בסיסי',           kidIds: ['itai'], color: '#DC2626', difficulty: 2, minPoints: 2, maxPoints: 4, questionsCount: 8,  estimatedMinutes: 4 },
  { id: 'english-numbers',title: 'אנגלית: מספרים',  subject: 'english', icon: '🔤',  description: 'מספרים וסדרות באנגלית',      kidIds: ['itai'], color: '#B45309', difficulty: 1, minPoints: 1, maxPoints: 3, questionsCount: 8,  estimatedMinutes: 3 },

  // Science & General
  { id: 'science-nature', title: 'טבע ומדע',         subject: 'science', icon: '🌿',  description: 'צמחים, בעלי חיים, פיזיקה',   kidIds: ['itai'], color: '#16A34A', difficulty: 2, minPoints: 2, maxPoints: 4, questionsCount: 8,  estimatedMinutes: 4 },
  { id: 'geography-il',   title: 'גאוגרפיה ישראל',  subject: 'science', icon: '🗺️', description: 'ערים, נהרות, אזורים',        kidIds: ['itai'], color: '#0891B2', difficulty: 2, minPoints: 2, maxPoints: 4, questionsCount: 8,  estimatedMinutes: 4 },
  { id: 'logic-itai',     title: 'חשיבה לוגית',     subject: 'general', icon: '🧩',  description: 'חידות והיגיון',              kidIds: ['itai'], color: '#7C3AED', difficulty: 3, minPoints: 3, maxPoints: 6, questionsCount: 6,  estimatedMinutes: 6 },
  { id: 'mul-200',        title: 'כפל עד 200',       subject: 'math',    icon: '💯',  description: 'כפל עם תוצאות עד 200',        kidIds: ['itai'], color: '#1D4ED8', difficulty: 3, minPoints: 3, maxPoints: 7, questionsCount: 10, estimatedMinutes: 7 },
  { id: 'parentheses',    title: 'סוגריים וחשבון',   subject: 'math',    icon: '( )', description: 'סדר פעולות חשבוניות עם סוגריים', kidIds: ['itai'], color: '#7C3AED', difficulty: 3, minPoints: 3, maxPoints: 7, questionsCount: 8,  estimatedMinutes: 7 },
  {
    id: 'reading-comp-1', title: 'קריאה: בינה מלאכותית', subject: 'hebrew', icon: '🤖', description: 'קטע קריאה — AI ושאלות הבנה',
    kidIds: ['itai'], color: '#7C3AED', difficulty: 2, minPoints: 3, maxPoints: 6, questionsCount: 5, estimatedMinutes: 10,
    passageTitle: 'בינה מלאכותית — המהפכה שמשנה את העולם',
    passageSourceUrl: 'https://he.wikipedia.org/wiki/בינה_מלאכותית',
    passage: `בינה מלאכותית (AI) היא ענף מדעי שבו מתכנתים מלמדים מחשבים "לחשוב" — לזהות תמונות, להבין שפה אנושית, לנגן שחמט ברמת אלוף עולם ואפילו לחבר מוזיקה מקורית.

הסוד טמון ב"רשתות נוירונים" — מבנה תוכנה שמחקה את האופן שבו מיליארדי תאי עצב במוח האנושי מתקשרים. את הרשת מאמנים על כמויות עצומות של נתונים: מאות מיליוני תמונות, ספרי ענק, שיחות, ומשחקים. ככל שיש יותר דוגמאות — המכונה לומדת טוב יותר.

מודל כמו ChatGPT אומן על כמות טקסט שאדם לא יוכל לקרוא בכל חייו, אפילו אם יקרא ללא הפסקה. בפרק זמן של שבועות, המחשב "עיכל" יותר ידע מכל ספרייה בעולם.

AI כבר מאתר סרטנים בבדיקות MRI מוקדם מרדיולוגים מנוסים, מתרגם שפות בזמן אמת, ומנווט מכוניות אוטונומיות. אך יש גם שאלות קשות: האם AI יחליף עובדים? מי אחראי כשהמכונה טועה? האם מותר לה "לשקר" כדי לשמח אותנו?`
  },
  {
    id: 'reading-comp-2', title: 'קריאה: חלל ומאדים', subject: 'hebrew', icon: '🚀', description: 'קטע קריאה — חלל ושאלות הבנה',
    kidIds: ['itai'], color: '#0891B2', difficulty: 2, minPoints: 3, maxPoints: 6, questionsCount: 5, estimatedMinutes: 10,
    passageTitle: 'מאדים — הגבול הבא של האנושות',
    passageSourceUrl: 'https://he.wikipedia.org/wiki/מאדים',
    passage: `מאדים — כוכב הלכת הרביעי — הוא המועמד הסביר ביותר לקולוניה אנושית מחוץ לכדור הארץ. המרחק אליו משתנה: בנקודה הקרובה ביותר כ-55 מיליון ק"מ, ובנקודה הרחוקה — 401 מיליון ק"מ. טיסה אורכת כ-7 חודשים.

האתגרים עצומים: אין שם מגנטוספרה (שמגינה מקרינה קוסמית), הלחץ באטמוספרה הוא פחות מאחוז מלחץ האוויר על הארץ, והטמפרטורה הממוצעת היא מינוס 60 מעלות. בלילה היא יורדת עד מינוס 125.

הרובוט "פרסביירנס" נחת ב-2021 ומסתובב בתוך מכתש ג'זרו — שהיה פעם אגם. הוא כבר מצא אבנים שנראה שנוצרו ממגע עם מים, וסינתז חמצן מהאטמוספרה המאדימאית. חברת SpaceX מתכננת להטיס אנשים לשם לפני 2030.

שאלה פתוחה: אם נמצא מיקרואורגניזמים על מאדים — האם נטיסה לשם תדביק אותם בחיידקי כדור הארץ? המדע מחייב זהירות קיצונית.`
  },
  {
    id: 'reading-comp-3', title: 'קריאה: כדורגל', subject: 'hebrew', icon: '⚽', description: 'קטע קריאה — כדורגל ושאלות הבנה',
    kidIds: ['itai'], color: '#10B981', difficulty: 2, minPoints: 3, maxPoints: 6, questionsCount: 5, estimatedMinutes: 10,
    passageTitle: 'כדורגל — הספורט שכבש את העולם',
    passageSourceUrl: 'https://he.wikipedia.org/wiki/גביע_העולם_בכדורגל',
    passage: `גביע העולם בכדורגל הוא אירוע הספורט הנצפה ביותר בהיסטוריה — הגמר ב-2022 משך 1.5 מיליארד צופים בו-זמנית. הטורניר מתקיים כל 4 שנים, ו-32 נבחרות נלחמות על התואר. מ-2026 יתרחב ל-48 קבוצות.

הכדורגל המודרני הוא מדע מדויק: כל שחקן נושא חיישן GPS שמודד מהירות, מרחק ריצה ועומס לב. מאמנים מנתחים עשרות אלפי נתונים אחרי כל משחק. טכנולוגיית VAR (בוררות וידאו) מאפשרת לבדוק החלטות שגויות של השופט.

ארגנטינה וברזיל מובילות עם 5 אליפויות כל אחת — ברזיל עם 5 וארגנטינה עם 3 (לפני 2022). ליאו מסי, שרבים רואים בו שחקן הכדורגל הגדול בכל הזמנים, נחשב ל"שלם" לאחר שהוביל את ארגנטינה לניצחון בקטאר.

ישראל השתתפה בגביע העולם פעם אחת בלבד — מקסיקו 1970. נבחרת ישראל מנסה כבר שנים להגיע שוב, ובאירופה היא מתחרה בלוח הקשה ביותר.`
  },

  // ══ AVIV — Grade 1 ════════════════════════════════════════════════════════

  // Math
  { id: 'add-10',         title: 'חיבור עד 10',      subject: 'math',    icon: '➕',  description: 'חיבור מספרים עד 10',         kidIds: ['aviv'], color: '#EC4899', difficulty: 1, minPoints: 1, maxPoints: 2, questionsCount: 10, estimatedMinutes: 2 },
  { id: 'sub-10',         title: 'חיסור עד 10',      subject: 'math',    icon: '➖',  description: 'חיסור מספרים עד 10',         kidIds: ['aviv'], color: '#F97316', difficulty: 1, minPoints: 1, maxPoints: 2, questionsCount: 10, estimatedMinutes: 2 },
  { id: 'add-20',         title: 'חיבור עד 20',      subject: 'math',    icon: '🔢',  description: 'חיבור מספרים עד 20',         kidIds: ['aviv'], color: '#A855F7', difficulty: 2, minPoints: 1, maxPoints: 3, questionsCount: 8,  estimatedMinutes: 3 },
  { id: 'sub-20',         title: 'חיסור עד 20',      subject: 'math',    icon: '🔢',  description: 'חיסור מספרים עד 20',         kidIds: ['aviv'], color: '#7C3AED', difficulty: 2, minPoints: 1, maxPoints: 3, questionsCount: 8,  estimatedMinutes: 3 },
  { id: 'add-sub-100',    title: 'חיבור וחיסור עד 100', subject: 'math',  icon: '💯', description: 'חיבור וחיסור עם מספרים עד 100', kidIds: ['aviv'], color: '#F59E0B', difficulty: 2, minPoints: 2, maxPoints: 5, questionsCount: 10, estimatedMinutes: 5 },
  { id: 'compare-nums',   title: 'גדול וקטן',        subject: 'math',    icon: '⚖️',  description: 'מה גדול יותר?',             kidIds: ['aviv'], color: '#0EA5E9', difficulty: 1, minPoints: 1, maxPoints: 2, questionsCount: 8,  estimatedMinutes: 2 },
  { id: 'number-order',   title: 'סדר מספרים',       subject: 'math',    icon: '1️⃣',  description: 'מה הבא בתור?',              kidIds: ['aviv'], color: '#10B981', difficulty: 1, minPoints: 1, maxPoints: 2, questionsCount: 8,  estimatedMinutes: 2 },
  { id: 'add-sub-mix',    title: 'חיבור וחיסור',     subject: 'math',    icon: '🎲',  description: 'ערבוב חיבור וחיסור עד 10',   kidIds: ['aviv'], color: '#EF4444', difficulty: 2, minPoints: 1, maxPoints: 3, questionsCount: 10, estimatedMinutes: 3 },

  // Hebrew
  { id: 'hebrew-letters', title: 'אותיות עברית',     subject: 'hebrew',  icon: 'אבג', description: 'זיהוי אותיות ומילים',        kidIds: ['aviv'], color: '#EC4899', difficulty: 1, minPoints: 1, maxPoints: 2, questionsCount: 8,  estimatedMinutes: 2 },
  { id: 'hebrew-words-1', title: 'מילים פשוטות',     subject: 'hebrew',  icon: '📖',  description: 'מילים של כיתה א',            kidIds: ['aviv'], color: '#DB2777', difficulty: 1, minPoints: 1, maxPoints: 3, questionsCount: 8,  estimatedMinutes: 3 },
  { id: 'rhyming',        title: 'חרוזים',           subject: 'hebrew',  icon: '🎵',  description: 'מצא את החרוז',              kidIds: ['aviv'], color: '#9333EA', difficulty: 1, minPoints: 1, maxPoints: 2, questionsCount: 8,  estimatedMinutes: 2 },

  // General
  { id: 'shapes',         title: 'צורות',            subject: 'general', icon: '🔷',  description: 'זיהוי צורות גיאומטריות',    kidIds: ['aviv'], color: '#14B8A6', difficulty: 1, minPoints: 1, maxPoints: 2, questionsCount: 8,  estimatedMinutes: 2 },
  { id: 'colors',         title: 'צבעים',            subject: 'general', icon: '🎨',  description: 'צבעים וערבוב צבעים',        kidIds: ['aviv'], color: '#F59E0B', difficulty: 1, minPoints: 1, maxPoints: 2, questionsCount: 8,  estimatedMinutes: 2 },
  { id: 'animals',        title: 'בעלי חיים',        subject: 'science', icon: '🐾',  description: 'חיות ביתיות ופראיות',       kidIds: ['aviv'], color: '#16A34A', difficulty: 1, minPoints: 1, maxPoints: 2, questionsCount: 8,  estimatedMinutes: 2 },
  { id: 'logic-aviv',     title: 'חשיבה',            subject: 'general', icon: '🧩',  description: 'מה שונה? מה חסר?',          kidIds: ['aviv'], color: '#7C3AED', difficulty: 2, minPoints: 1, maxPoints: 3, questionsCount: 6,  estimatedMinutes: 3 },
  { id: 'nikud-words',    title: 'מילים בניקוד',     subject: 'hebrew',  icon: '✏️', description: 'קרא מילים עם ניקוד מלא',     kidIds: ['aviv'], color: '#DB2777', difficulty: 2, minPoints: 2, maxPoints: 4, questionsCount: 8,  estimatedMinutes: 4 },
  { id: 'alef-hey-vav-yod', title: 'אהוי — אותיות',  subject: 'hebrew',  icon: 'אהוי', description: 'מתי האות נשמעת ומתי שקטה', kidIds: ['aviv'], color: '#9333EA', difficulty: 2, minPoints: 2, maxPoints: 4, questionsCount: 8,  estimatedMinutes: 4 },
  { id: 'syllables',      title: 'הברות וקריאה',     subject: 'hebrew',  icon: '🗣️', description: 'קרא הברות ומילים פשוטות',    kidIds: ['aviv'], color: '#EC4899', difficulty: 2, minPoints: 2, maxPoints: 4, questionsCount: 8,  estimatedMinutes: 4 },
  { id: 'nikud-basics',   title: 'ניקוד — יסודות',   subject: 'hebrew',  icon: '📍',  description: 'לומדים את סימני הניקוד',     kidIds: ['aviv'], color: '#EC4899', difficulty: 1, minPoints: 2, maxPoints: 4, questionsCount: 10, estimatedMinutes: 5 },
  { id: 'syllable-read',  title: 'קריאת הברות',      subject: 'hebrew',  icon: '🗣️', description: 'קורא הברות עם ניקוד מלא',    kidIds: ['aviv'], color: '#8B5CF6', difficulty: 2, minPoints: 2, maxPoints: 4, questionsCount: 10, estimatedMinutes: 6 },
  { id: 'word-build',     title: 'בניית מילים',       subject: 'hebrew',  icon: '🧩',  description: 'בונה מילים מהברות',          kidIds: ['aviv'], color: '#F59E0B', difficulty: 2, minPoints: 2, maxPoints: 5, questionsCount: 8,  estimatedMinutes: 6 },

  // ══ ITAI — Exam Prep ════════════════════════════════════════════════════════

  { id: 'exam-place-value',   title: 'ערך המקום עד מיליון',        subject: 'math', icon: '🔢', description: 'קריאה, כתיבה, השוואה ואומדן של מספרים גדולים', kidIds: ['itai'], color: '#7C3AED', difficulty: 3, minPoints: 4, maxPoints: 10, questionsCount: 10, estimatedMinutes: 10, tags: ['exam-prep'] },
  { id: 'exam-mul-methods',   title: 'כפל בדרכים שונות',           subject: 'math', icon: '✖️', description: 'כפל דו-ספרתי בדו-ספרתי בפילוג, כפל באוזן, שאלות מילוליות', kidIds: ['itai'], color: '#1D4ED8', difficulty: 3, minPoints: 4, maxPoints: 10, questionsCount: 10, estimatedMinutes: 10, tags: ['exam-prep'] },
  { id: 'exam-mul-tens',      title: 'כפל וחילוק בעשרות ומאות',    subject: 'math', icon: '💯', description: '30×4=120, 300×4=1200, 120÷4=30', kidIds: ['itai'], color: '#0891B2', difficulty: 3, minPoints: 4, maxPoints: 8,  questionsCount: 8,  estimatedMinutes: 8,  tags: ['exam-prep'] },
  { id: 'exam-div-partition', title: 'חילוק בחוק הפילוג',          subject: 'math', icon: '➗', description: '96÷4 = (80÷4) + (16÷4) = 24', kidIds: ['itai'], color: '#9333EA', difficulty: 4, minPoints: 4, maxPoints: 10, questionsCount: 8,  estimatedMinutes: 10, tags: ['exam-prep'] },
  { id: 'exam-fractions-adv', title: 'שברים — זיהוי, המרה וחישוב', subject: 'math', icon: '½',  description: 'זיהוי ושיום, שבר מעורב↔פשוט, חיבור/חיסור, שאלות מילוליות', kidIds: ['itai'], color: '#F59E0B', difficulty: 4, minPoints: 4, maxPoints: 10, questionsCount: 10, estimatedMinutes: 10, tags: ['exam-prep'] },
  { id: 'exam-geometry-adv',  title: 'שטח והיקף — ריבוע ומלבן',   subject: 'math', icon: '📐', description: 'חישוב שטח, היקף, יחידות מ"ר וסמ"ר', kidIds: ['itai'], color: '#F97316', difficulty: 3, minPoints: 4, maxPoints: 10, questionsCount: 10, estimatedMinutes: 10, tags: ['exam-prep'] },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function rnd(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

/** Tag a static question array with stable IDs and a default difficulty level */
type RawQ = Omit<ExerciseQuestion, 'id' | 'difficulty'> & { difficulty?: 1|2|3|4 };
function tag(typeId: string, arr: RawQ[], defaultDiff: 1|2|3|4 = 2): ExerciseQuestion[] {
  return arr.map((q, i) => ({ id: `${typeId}-${i}`, difficulty: q.difficulty ?? defaultDiff, ...q }));
}
/** Create a generated question with a derived stable ID */
function genQ(typeId: string, text: string, options: string[], correctIndex: number, difficulty: 1|2|3|4 = 2, explanation?: string): ExerciseQuestion {
  // Use operand hash as stable ID for generated questions
  const key = text.replace(/[^0-9a-zA-Z]/g, '').slice(0, 16);
  return { id: `${typeId}-${key}`, difficulty, text, options, correctIndex, ...(explanation ? { explanation } : {}) };
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function opts(correct: number, count = 4, min = 0, max = 100): { options: string[]; correctIndex: number } {
  const s = new Set<number>([correct]);
  let tries = 0;
  while (s.size < count && tries < 50) {
    const v = correct + rnd(-Math.max(3, Math.round(correct * 0.4)), Math.max(3, Math.round(correct * 0.4)));
    if (v >= min && v <= max && v !== correct) s.add(v);
    tries++;
  }
  while (s.size < count) s.add(correct + s.size);
  const arr = shuffle([...s]).map(String);
  return { options: arr, correctIndex: arr.indexOf(String(correct)) };
}

// ─── ITAI generators ──────────────────────────────────────────────────────────

function genMulTables(): ExerciseQuestion[] {
  return Array.from({ length: 10 }, () => {
    const a = rnd(2, 9), b = rnd(2, 9);
    const { options, correctIndex } = opts(a * b, 4, 4, 81);
    return genQ('mul-tables', `? = ${a} × ${b}`, options, correctIndex);
  });
}

function genDivision(): ExerciseQuestion[] {
  return Array.from({ length: 8 }, () => {
    const b = rnd(2, 9), q = rnd(2, 9);
    const { options, correctIndex } = opts(q, 4, 1, 9);
    return genQ('division', `? = ${b * q} ÷ ${b}`, options, correctIndex);
  });
}

function genTwoDigit(): ExerciseQuestion[] {
  return Array.from({ length: 10 }, () => {
    if (Math.random() > 0.4) {
      const a = rnd(11, 60), b = rnd(11, 60);
      const { options, correctIndex } = opts(a + b, 4, 20, 120);
      return genQ('two-digit', `? = ${a} + ${b}`, options, correctIndex);
    } else {
      const b = rnd(11, 40), a = rnd(b + 1, b + 50);
      const { options, correctIndex } = opts(a - b, 4, 1, 90);
      return genQ('two-digit', `? = ${a} - ${b}`, options, correctIndex);
    }
  });
}

const SEQUENCE_QS: ExerciseQuestion[] = tag('sequences', [
  { text: '2, 4, 6, 8, __', options: ['9','10','11','12'], correctIndex: 1 },
  { text: '5, 10, 15, 20, __', options: ['22','24','25','30'], correctIndex: 2 },
  { text: '3, 6, 9, 12, __', options: ['13','14','15','16'], correctIndex: 2 },
  { text: '10, 20, 30, 40, __', options: ['45','48','50','55'], correctIndex: 2 },
  { text: '1, 3, 5, 7, __', options: ['8','9','10','11'], correctIndex: 1 },
  { text: '100, 90, 80, 70, __', options: ['65','60','55','50'], correctIndex: 1 },
  { text: '2, 4, 8, 16, __', options: ['18','24','30','32'], correctIndex: 3 },
  { text: '1, 4, 9, 16, __', options: ['20','23','25','30'], correctIndex: 2 },
  { text: '50, 45, 40, 35, __', options: ['28','30','32','34'], correctIndex: 1 },
  { text: '7, 14, 21, 28, __', options: ['32','33','35','36'], correctIndex: 2 },
]);

const GEOMETRY_QS: ExerciseQuestion[] = tag('geometry', [
  { text: 'מה היקף ריבוע עם צלע 5?', options: ['10','15','20','25'], correctIndex: 2 },
  { text: 'מה שטח מלבן 3×4?', options: ['7','10','12','14'], correctIndex: 2 },
  { text: 'כמה קודקודים למשולש?', options: ['2','3','4','5'], correctIndex: 1 },
  { text: 'מה היקף מלבן 4×6?', options: ['10','18','20','24'], correctIndex: 2 },
  { text: 'כמה צלעות למשושה?', options: ['4','5','6','8'], correctIndex: 2 },
  { text: 'מה שטח ריבוע עם צלע 4?', options: ['8','12','14','16'], correctIndex: 3 },
  { text: 'כמה זוויות ישרות במלבן?', options: ['1','2','3','4'], correctIndex: 3 },
  { text: 'מה היקף משולש שווה-שוקיים עם צלעות 3,3,4?', options: ['7','9','10','12'], correctIndex: 2 },
], 3);

const SOCCER_QS: ExerciseQuestion[] = tag('soccer-math', [
  { text: 'בקבוצה 11 שחקנים. 3 יצאו. כמה נשארו?', options: ['7','8','9','10'], correctIndex: 1 },
  { text: 'איתי בעט 6 פעמים ביום. כמה ב-5 ימים?', options: ['25','28','30','35'], correctIndex: 2 },
  { text: 'משחק 45 דקות בכל מחצית. כמה סה״כ?', options: ['70','80','90','100'], correctIndex: 2 },
  { text: 'איתי קלע 4 שערים ב-3 משחקים. כמה שערים סה״כ?', options: ['10','11','12','14'], correctIndex: 2 },
  { text: 'בטורניר 8 קבוצות. כל קבוצה שיחקה 3 משחקים. כמה משחקים?', options: ['11','16','20','24'], correctIndex: 3 },
  { text: 'הקבוצה ניצחה 7 מתוך 10 משחקים. כמה הפסידה?', options: ['2','3','4','5'], correctIndex: 1 },
], 3);

const BIG_NUMBERS_QS: ExerciseQuestion[] = tag('big-numbers', [
  { text: '1,000 + 500 = ?', options: ['1,050','1,500','1,005','5,001'], correctIndex: 1 },
  { text: 'כמה יחידות ב-3,456?', options: ['3','4','5','6'], correctIndex: 3 },
  { text: '5,000 - 1,000 = ?', options: ['3,000','4,000','5,000','6,000'], correctIndex: 1 },
  { text: 'מה גדול יותר?', options: ['4,321','4,231','4,213','4,123'], correctIndex: 0 },
  { text: 'כמה עשרות ב-1,340?', options: ['1','3','4','13'], correctIndex: 3 },
  { text: '2,500 + 2,500 = ?', options: ['4,000','4,500','5,000','5,500'], correctIndex: 2 },
  { text: 'עגל ל-100 הקרוב: 347', options: ['300','340','350','400'], correctIndex: 2 },
  { text: '10,000 - 1 = ?', options: ['9,000','9,009','9,090','9,999'], correctIndex: 3 },
], 3);

const FRACTION_QS: ExerciseQuestion[] = tag('fractions', [
  { text: 'כמה זה ½ מתוך 10?', options: ['3','4','5','6'], correctIndex: 2 },
  { text: 'כמה זה ¼ מתוך 20?', options: ['4','5','6','10'], correctIndex: 1 },
  { text: 'כמה זה ½ מתוך 14?', options: ['6','7','8','9'], correctIndex: 1 },
  { text: 'כמה זה ¼ מתוך 16?', options: ['2','3','4','5'], correctIndex: 2 },
  { text: 'כמה זה ⅓ מתוך 12?', options: ['3','4','5','6'], correctIndex: 1 },
  { text: 'מה גדול יותר: ½ או ¼?', options: ['¼','½','שווים','אי אפשר לדעת'], correctIndex: 1 },
  { text: '¾ + ¼ = ?', options: ['½','¾','1','1½'], correctIndex: 2 },
  { text: 'כמה זה ½ מתוך 100?', options: ['25','40','50','75'], correctIndex: 2 },
], 3);

const GRAMMAR_QS: ExerciseQuestion[] = tag('hebrew-grammar', [
  { text: 'ריבוי של "ילד":', options: ['ילדות','ילדים','ילדיות','ילדן'], correctIndex: 1 },
  { text: 'ריבוי של "ספר":', options: ['ספרות','ספרים','ספרין','ספריות'], correctIndex: 1 },
  { text: 'נקבה של "תלמיד":', options: ['תלמידה','תלמידות','תלמידית','תלמידן'], correctIndex: 0 },
  { text: 'ריבוי של "עץ":', options: ['עציות','עצות','עצים','עציים'], correctIndex: 2 },
  { text: 'שם תואר של "ילד שמח":', options: ['שמח','שמחה','שמחים','ישמח'], correctIndex: 0 },
  { text: 'ריבוי של "כיסא":', options: ['כיסאות','כיסאים','כיסאים','כסאים'], correctIndex: 0 },
  { text: 'מין של "שמש": ', options: ['זכר','נקבה','שניהם','אף אחד'], correctIndex: 1 },
  { text: 'ריבוי של "בית":', options: ['בתים','ביתים','בתות','ביתות'], correctIndex: 0 },
]);

const ANTONYM_QS: ExerciseQuestion[] = tag('hebrew-antonym', [
  { text: 'הפך של "גדול":', options: ['ענק','בינוני','קטן','כבד'], correctIndex: 2 },
  { text: 'הפך של "חם":', options: ['חמים','פושר','קריר','קר'], correctIndex: 3 },
  { text: 'נרדפת של "שמח":', options: ['עצוב','עייף','מאושר','כועס'], correctIndex: 2 },
  { text: 'הפך של "מהיר":', options: ['ממוצע','בינוני','איטי','עצלן'], correctIndex: 2 },
  { text: 'הפך של "יום":', options: ['בוקר','ערב','לילה','שקיעה'], correctIndex: 2 },
  { text: 'נרדפת של "יפה":', options: ['מכוער','נאה','רגיל','שונה'], correctIndex: 1 },
  { text: 'הפך של "פתוח":', options: ['חצי פתוח','אטום','סגור','מכוסה'], correctIndex: 2 },
  { text: 'הפך של "עלייה":', options: ['שטח','עמידה','ירידה','ריצה'], correctIndex: 2 },
]);

const SPELLING_4_QS: ExerciseQuestion[] = tag('hebrew-spell-4', [
  { text: 'איות נכון:', options: ['ספריה','ספרייה','סיפריה','ספריא'], correctIndex: 1, explanation: 'ספרייה — שתי יודין' },
  { text: 'איות נכון:', options: ['מחברת','מחבֶּרֶת','מחבֶּרת','מחברות'], correctIndex: 0 },
  { text: 'איות נכון של מקום לימוד:', options: ['בית-ספר','בית ספר','ביתספר','בית סֵפֶר'], correctIndex: 0 },
  { text: 'איות נכון:', options: ['תלמיד','תלמיד','תַּלְמִיד','תלמיד'], correctIndex: 0 },
  { text: 'איות נכון:', options: ['מורֶה','מורה','מֹורֶה','מורא'], correctIndex: 1 },
  { text: 'השלם: "בית ___" (חולים)', options: ['חולים','חולֵים','חולִים','חולאים'], correctIndex: 0 },
  { text: 'איות נכון:', options: ['ישראל','ישרָאֵל','יישראל','ישרל'], correctIndex: 0 },
  { text: 'איות נכון:', options: ['אֲנִי','אני','אָני','אנִי'], correctIndex: 1 },
]);

const ENGLISH_VOCAB_QS: ExerciseQuestion[] = tag('english-vocab', [
  { text: 'מה פירוש "apple"?', options: ['תפוז','תפוח','בננה','אגס'], correctIndex: 1 },
  { text: 'מה פירוש "school"?', options: ['בית','ספר','בית-ספר','כיתה'], correctIndex: 2 },
  { text: 'מה פירוש "friend"?', options: ['אויב','מורה','חבר','אח'], correctIndex: 2 },
  { text: 'מה פירוש "big"?', options: ['קטן','בינוני','גדול','ארוך'], correctIndex: 2 },
  { text: 'איך אומרים "ספר" באנגלית?', options: ['book','cook','look','took'], correctIndex: 0 },
  { text: 'איך אומרים "כדורגל" באנגלית?', options: ['basketball','tennis','football','volleyball'], correctIndex: 2 },
  { text: 'מה פירוש "happy"?', options: ['עצוב','כועס','עייף','שמח'], correctIndex: 3 },
  { text: 'איך אומרים "מים" באנגלית?', options: ['fire','water','earth','air'], correctIndex: 1 },
]);

const ENGLISH_NUMS_QS: ExerciseQuestion[] = tag('english-numbers', [
  { text: '"שש" באנגלית:', options: ['five','six','seven','eight'], correctIndex: 1 },
  { text: '"עשר" באנגלית:', options: ['eight','nine','ten','eleven'], correctIndex: 2 },
  { text: '"עשרים" באנגלית:', options: ['twelve','fifteen','twenty','thirty'], correctIndex: 2 },
  { text: 'מה המספר? "fourteen"', options: ['4','13','14','40'], correctIndex: 2 },
  { text: '"מאה" באנגלית:', options: ['ten','hundred','thousand','million'], correctIndex: 1 },
  { text: 'מה המספר? "fifty"', options: ['5','15','50','500'], correctIndex: 2 },
  { text: '"ראשון" באנגלית:', options: ['first','one','single','start'], correctIndex: 0 },
  { text: '"אחד-עשר" באנגלית:', options: ['ten','eleven','twelve','thirteen'], correctIndex: 1 },
], 1);

const SCIENCE_QS: ExerciseQuestion[] = tag('science-nature', [
  { text: 'מה צמחים צריכים כדי לגדול?', options: ['רק מים','שמש, מים, אדמה','רק שמש','רק אדמה'], correctIndex: 1 },
  { text: 'כמה רגליים לעכביש?', options: ['4','6','8','10'], correctIndex: 2 },
  { text: 'מה הכוכב הקרוב ביותר לכדור הארץ?', options: ['ירח','מאדים','שמש','נגה'], correctIndex: 2 },
  { text: 'מה הגדול ביותר?', options: ['כלב','פיל','ארי','היפופוטם'], correctIndex: 1 },
  { text: 'כמה ימים בשנה (רגילה)?', options: ['360','365','366','370'], correctIndex: 1 },
  { text: 'מה גורם לגשם?', options: ['שמש','עננים ואדים','רוח','קור'], correctIndex: 1 },
  { text: 'מי ממיר פחמן-דו-חמצני לחמצן?', options: ['בעלי חיים','צמחים','אנשים','מכוניות'], correctIndex: 1 },
  { text: 'כמה יבשות יש בעולם?', options: ['5','6','7','8'], correctIndex: 2 },
]);

const GEOGRAPHY_IL_QS: ExerciseQuestion[] = tag('geography-il', [
  { text: 'מה עיר הבירה של ישראל?', options: ['תל אביב','חיפה','ירושלים','באר שבע'], correctIndex: 2 },
  { text: 'אילו ים גובל ישראל ממערב?', options: ['ים סוף','ים המלח','ים כנרת','הים התיכון'], correctIndex: 3 },
  { text: 'מה הנהר הגדול ביותר בישראל?', options: ['ירקון','קישון','ירדן','אלכסנדר'], correctIndex: 2 },
  { text: 'איזה ים הוא הנמוך ביותר בעולם?', options: ['ים כנרת','ים סוף','ים המלח','הים התיכון'], correctIndex: 2 },
  { text: 'בה עיר נמצא נמל התעופה?', options: ['תל אביב','חיפה','ירושלים','לוד'], correctIndex: 3 },
  { text: 'מה ההר הגבוה בישראל?', options: ['הכרמל','הגלבוע','חרמון','תבור'], correctIndex: 2 },
  { text: 'מי הנמל הגדול?', options: ['תל אביב','אשדוד','חיפה','עכו'], correctIndex: 2 },
  { text: 'כמה מחוזות יש בישראל?', options: ['4','5','6','7'], correctIndex: 2 },
]);

const LOGIC_ITAI_QS: ExerciseQuestion[] = tag('logic-itai', [
  { text: 'יש 3 תפוחים ו-2 אגסים. מה אחוז התפוחים?', options: ['40%','50%','60%','66%'], correctIndex: 2 },
  { text: 'אם A>B ו-B>C, אז:', options: ['A<C','A=C','A>C','אי אפשר לדעת'], correctIndex: 2 },
  { text: 'מה המספר הבא: 1,1,2,3,5,8,__', options: ['10','12','13','15'], correctIndex: 2 },
  { text: 'אם היום יום שלישי, מה יהיה עוד 4 ימים?', options: ['שבת','ראשון','שני','שישי'], correctIndex: 0 },
  { text: 'משפחה: 2 הורים, 3 ילדים. כמה ידיים?', options: ['8','10','12','16'], correctIndex: 1 },
  { text: 'אם 1 עוגה עולה 15₪, כמה עולות 4?', options: ['45₪','55₪','60₪','75₪'], correctIndex: 2 },
], 3);

function genMul200(): ExerciseQuestion[] {
  const pairs: Array<[number,number]> = [
    [12,5],[15,6],[11,8],[14,9],[13,7],[16,8],[25,6],[18,9],[11,12],[15,12],
    [20,8],[17,9],[13,11],[14,12],[22,7],[25,8],[15,11],[19,8],[16,11],[12,13],
  ];
  const selected = shuffle(pairs).slice(0, 10);
  return selected.map(([a, b]) => {
    const { options, correctIndex } = opts(a * b, 4, a * b - 20, a * b + 20);
    return genQ('mul-200', `? = ${a} × ${b}`, options, correctIndex, 3);
  });
}

function genParentheses(): ExerciseQuestion[] {
  type QSpec = { text: string; answer: number };
  const all: QSpec[] = [
    { text: '(3 + 4) × 2 = ?',   answer: 14 },
    { text: '(10 - 3) × 3 = ?',  answer: 21 },
    { text: '5 × (8 - 3) = ?',   answer: 25 },
    { text: '(6 + 4) × 4 = ?',   answer: 40 },
    { text: '2 × (7 + 3) = ?',   answer: 20 },
    { text: '(12 - 4) × 5 = ?',  answer: 40 },
    { text: '3 × (6 + 2) = ?',   answer: 24 },
    { text: '(5 + 3) × (2 + 1) = ?', answer: 24 },
    { text: '20 ÷ (2 + 3) = ?',  answer: 4 },
    { text: '(9 - 3) ÷ 2 = ?',   answer: 3 },
    { text: '4 × (5 - 2) + 1 = ?', answer: 13 },
    { text: '(3 + 5) × 3 - 4 = ?', answer: 20 },
    { text: '6 + (4 × 3) = ?',   answer: 18 },
    { text: '10 - (2 × 3) = ?',  answer: 4 },
    { text: '(7 + 3) × (4 - 2) = ?', answer: 20 },
  ];
  return shuffle(all).slice(0, 8).map(({ text, answer }) => {
    const { options, correctIndex } = opts(answer, 4, Math.max(0, answer - 15), answer + 15);
    return genQ('parentheses', text, options, correctIndex, 3, 'סוגריים תמיד ראשונים!');
  });
}

const READING_COMP_1_QS: ExerciseQuestion[] = tag('reading-comp-1', [
  { text: 'מה זה AI (בינה מלאכותית)?', options: ['רובוט פיזי','מחשב שלומד לבצע משימות חכמות','משחק מחשב','תוכנת גרפיקה'], correctIndex: 1 },
  { text: 'מה הסוד שמאחורי ChatGPT?', options: ['מעבדים מהירים','תכנות מיוחד','מיליוני דוגמאות אימון','ידע אנושי ישיר'], correctIndex: 2 },
  { text: 'במה AI כבר עוזר לרופאים?', options: ['ניתוחים','אבחון מחלות','כתיבת מרשמים','ניהול בית חולים'], correctIndex: 1 },
  { text: 'מה בעיה גדולה ש-AI יכול לעזור לפתור?', options: ['שינוי אקלים','פקקי תנועה','בעיות בית ספר','בנייה'], correctIndex: 0 },
  { text: 'לפי הכתבה, מה AI יכול לעשות היום?', options: ['רק לשחק שחמט','רק לזהות תמונות','לכתוב שירים, לפתור מתמטיקה ולשוחח','רק לתרגם מילים'], correctIndex: 2 },
]);

const READING_COMP_2_QS: ExerciseQuestion[] = tag('reading-comp-2', [
  { text: 'כמה ק"מ רחוק מאדים מהארץ?', options: ['22 מיליון','225 מיליון','2 מיליארד','500,000'], correctIndex: 1 },
  { text: 'מה הטמפרטורה בלילה במאדים?', options: ['מינוס 20','מינוס 80','0','פלוס 20'], correctIndex: 1 },
  { text: 'מה שמות הרובוטים שנמצאים כיום במאדים?', options: ['אפולו וגמיני','קיוריוסיטי ופרסביירנס','ווייג׳ר ופיוניר','ספוטניק ומירה'], correctIndex: 1 },
  { text: 'מתי מתכננים לשלוח בני אדם למאדים?', options: ['2025','שנות ה-2030 עד 2040','2100','לא מתוכנן'], correctIndex: 1 },
  { text: 'למה מדענים רוצים להגיע למאדים?', options: ['להתגורר שם','לחפוץ עקבות מים ואולי חיים','כי קרוב לשמש','כי יש שם חמצן'], correctIndex: 1 },
]);

const READING_COMP_3_QS: ExerciseQuestion[] = tag('reading-comp-3', [
  { text: 'כמה אנשים צופים בגמר גביע העולם?', options: ['100 מיליון','500 מיליון','מיליארד וחצי','10 מיליארד'], correctIndex: 2 },
  { text: 'כמה קבוצות מתחרות בגביע העולם?', options: ['16','24','32','48'], correctIndex: 2 },
  { text: 'כמה פעמים ברזיל זכתה בגביע העולם?', options: ['3','4','5','6'], correctIndex: 2 },
  { text: 'מי זכה בגביע העולם 2022 בקטאר?', options: ['ברזיל','צרפת','ארגנטינה','גרמניה'], correctIndex: 2 },
  { text: 'מתי ישראל שיחקה בגביע העולם?', options: ['1966','1970','1978','לא שיחקה'], correctIndex: 1 },
]);

// ─── AVIV generators ──────────────────────────────────────────────────────────

// Aviv math — format: "? = a OP b" is RTL-safe (? on the right, reads naturally)
// April grade 1 = second semester: addition/subtraction up to 100

function genAdd10(): ExerciseQuestion[] {
  return Array.from({ length: 10 }, () => {
    const a = rnd(2, 9), b = rnd(2, 10 - a);
    const { options, correctIndex } = opts(a + b, 4, 1, 10);
    return genQ('add-10', `? = ${a} + ${b}`, options, correctIndex, 1);
  });
}

function genSub10(): ExerciseQuestion[] {
  return Array.from({ length: 10 }, () => {
    const b = rnd(2, 8), a = rnd(b + 1, 10);
    const { options, correctIndex } = opts(a - b, 4, 0, 9);
    return genQ('sub-10', `? = ${a} - ${b}`, options, correctIndex, 1);
  });
}

// Extended to 100 — April grade 1 = second semester
function genAdd20(): ExerciseQuestion[] {
  return Array.from({ length: 10 }, () => {
    const a = rnd(10, 60), b = rnd(10, 100 - a);
    const { options, correctIndex } = opts(a + b, 4, Math.max(1, a + b - 15), a + b + 15);
    return genQ('add-20', `? = ${a} + ${b}`, options, correctIndex, 2);
  });
}

function genSub20(): ExerciseQuestion[] {
  return Array.from({ length: 10 }, () => {
    const b = rnd(10, 40), a = rnd(b + 5, 100);
    const { options, correctIndex } = opts(a - b, 4, Math.max(0, a - b - 10), a - b + 10);
    return genQ('sub-20', `? = ${a} - ${b}`, options, correctIndex, 2);
  });
}

function genCompareNums(): ExerciseQuestion[] {
  return Array.from({ length: 8 }, () => {
    const a = rnd(1, 99), b = rnd(1, 99);
    const correct = a > b ? 0 : a < b ? 1 : 2;
    return genQ('compare-nums', `${a}  _  ${b}`, ['גדול יותר (>)', 'קטן יותר (<)', 'שווה (=)', 'אי אפשר לדעת'], correct, 1);
  });
}

function genNumberOrder(): ExerciseQuestion[] {
  return Array.from({ length: 8 }, () => {
    const step = shuffle([1, 2, 5, 10])[0];
    const start = rnd(2, 80);
    const { options, correctIndex } = opts(start + step, 4, start, start + step * 4);
    return genQ('number-order', `${start - step}, ${start}, __`, options, correctIndex, 1);
  });
}

function genAddSubMix(): ExerciseQuestion[] {
  return Array.from({ length: 10 }, () => {
    const isAdd = Math.random() > 0.5;
    if (isAdd) {
      const a = rnd(10, 50), b = rnd(10, 100 - a);
      const { options, correctIndex } = opts(a + b, 4, Math.max(1, a + b - 15), a + b + 15);
      return genQ('add-sub-mix', `? = ${a} + ${b}`, options, correctIndex, 2);
    } else {
      const b = rnd(10, 40), a = rnd(b + 5, 90);
      const { options, correctIndex } = opts(a - b, 4, Math.max(0, a - b - 10), a - b + 10);
      return genQ('add-sub-mix', `? = ${a} - ${b}`, options, correctIndex, 2);
    }
  });
}

const EMOJI_POOL = ['⭐', '🍎', '🐶', '🌸', '🏀', '🎈', '🐱', '🦋', '🌈', '🍭'];
function genCountingEmoji(): ExerciseQuestion[] {
  return Array.from({ length: 8 }, () => {
    const count = rnd(6, 20);
    const emoji = EMOJI_POOL[rnd(0, EMOJI_POOL.length - 1)];
    const { options, correctIndex } = opts(count, 4, Math.max(1, count - 4), count + 4);
    const rows: string[] = [];
    for (let i = 0; i < count; i += 5) {
      rows.push(Array(Math.min(5, count - i)).fill(emoji).join(' '));
    }
    return genQ('counting-emoji', `כמה יש?\n${rows.join('\n')}`, options, correctIndex, 1);
  });
}

const LETTERS_QS: ExerciseQuestion[] = tag('hebrew-letters', [
  { text: 'אות ראשונה של "אריה":', options: ['ב','א','ר','ה'], correctIndex: 1 },
  { text: 'אות ראשונה של "בית":', options: ['א','ג','ב','ד'], correctIndex: 2 },
  { text: 'איזו מילה מתחילה ב-"ש"?', options: ['בית','ילד','שמש','כלב'], correctIndex: 2 },
  { text: 'אות אחרונה של "ילד":', options: ['י','ל','ד','א'], correctIndex: 2 },
  { text: 'כמה אותיות ב-"אמא"?', options: ['2','3','4','5'], correctIndex: 1 },
  { text: 'איזו מילה מתחילה ב-"כ"?', options: ['דג','כלב','שמש','בית'], correctIndex: 1 },
  { text: 'אות ראשונה של "דג":', options: ['ג','ד','ב','כ'], correctIndex: 1 },
  { text: 'כמה אותיות ב-"שמש"?', options: ['2','3','4','5'], correctIndex: 1 },
], 1);

const WORDS_1_QS: ExerciseQuestion[] = tag('hebrew-words-1', [
  { text: 'השלם: "אמא שלי ___ יפה"', options: ['הוא','הם','היא','הן'], correctIndex: 2 },
  { text: 'מה זה "כלב"?', options: ['ציפור','חתול','בעל חיים שנובח','דג'], correctIndex: 2 },
  { text: 'ההפך של "גדול":', options: ['ענק','בינוני','קטן','כבד'], correctIndex: 2 },
  { text: 'מי גר בבית?', options: ['דגים','ציפורים','אנשים','כולם'], correctIndex: 2 },
  { text: 'מה אוכלים בבוקר?', options: ['ארוחת ערב','ארוחת בוקר','ארוחת צהריים','אף אחד'], correctIndex: 1 },
  { text: 'כמה ימים בשבוע?', options: ['5','6','7','8'], correctIndex: 2 },
  { text: 'מה צבע השמים בשמש?', options: ['אדום','ירוק','כחול','צהוב'], correctIndex: 2 },
  { text: 'מה עושים בלילה?', options: ['משחקים','ישנים','לומדים','שרים'], correctIndex: 1 },
], 1);

const RHYMING_QS: ExerciseQuestion[] = tag('rhyming', [
  { text: 'מה מחרז עם "דג"?', options: ['עוף','רג','חתול','ספר'], correctIndex: 1 },
  { text: 'מה מחרז עם "בית"?', options: ['שמש','כלב','שיר','קיר'], correctIndex: 3 },
  { text: 'מה מחרז עם "שמש"?', options: ['ירח','נמש','כוכב','ענן'], correctIndex: 1 },
  { text: 'מה מחרז עם "ילד"?', options: ['תלד','ספר','כיסא','שולחן'], correctIndex: 0 },
  { text: 'מה מחרז עם "חתול"?', options: ['כלב','שולחן','בתול','ציפור'], correctIndex: 2 },
  { text: 'מה מחרז עם "אמא"?', options: ['אבא','שמה','ילד','בית'], correctIndex: 1 },
  { text: 'מה מחרז עם "ספר"?', options: ['ילד','גמר','ספר','כיסא'], correctIndex: 1 },
  { text: 'מה מחרז עם "שיר"?', options: ['ציפור','כלב','קיר','שמש'], correctIndex: 2 },
], 1);

const SHAPES_QS: ExerciseQuestion[] = tag('shapes', [
  { text: 'לאיזו צורה יש 4 צדדים שווים?', options: ['משולש','ריבוע','עיגול','מלבן'], correctIndex: 1 },
  { text: 'כמה פינות למשולש?', options: ['2','3','4','5'], correctIndex: 1 },
  { text: 'לאיזו צורה אין פינות?', options: ['ריבוע','משולש','עיגול','מלבן'], correctIndex: 2 },
  { text: 'מה הצורה של גלגל?', options: ['ריבוע','משולש','מלבן','עיגול'], correctIndex: 3 },
  { text: 'כמה צדדים למלבן?', options: ['2','3','4','5'], correctIndex: 2 },
  { text: 'מה הצורה של דלת?', options: ['עיגול','משולש','מלבן','ריבוע'], correctIndex: 2 },
  { text: 'איזו צורה דומה לפרוסת פיצה?', options: ['ריבוע','משולש','עיגול','מלבן'], correctIndex: 1 },
  { text: 'כמה פינות לריבוע?', options: ['2','3','4','6'], correctIndex: 2 },
], 1);

const COLORS_QS: ExerciseQuestion[] = tag('colors', [
  { text: 'ערבוב אדום + כחול = ?', options: ['ירוק','צהוב','סגול','כתום'], correctIndex: 2 },
  { text: 'ערבוב כחול + צהוב = ?', options: ['ירוק','סגול','כתום','אדום'], correctIndex: 0 },
  { text: 'ערבוב אדום + צהוב = ?', options: ['ירוק','סגול','כתום','כחול'], correctIndex: 2 },
  { text: 'מה צבע עלי עצים בקיץ?', options: ['צהוב','אדום','ירוק','חום'], correctIndex: 2 },
  { text: 'מה צבע השמש?', options: ['לבן','כחול','ירוק','צהוב'], correctIndex: 3 },
  { text: 'מה צבע השמים בלילה?', options: ['כחול','שחור/כחול כהה','לבן','אפור'], correctIndex: 1 },
  { text: 'ערבוב שחור + לבן = ?', options: ['ירוק','אפור','כחול','חום'], correctIndex: 1 },
  { text: 'מה צבע תפוח?', options: ['כחול','ירוק','אדום','צהוב'], correctIndex: 2 },
], 1);

const ANIMALS_QS: ExerciseQuestion[] = tag('animals', [
  { text: 'מי עושה "מיאו"?', options: ['כלב','חתול','פרה','ציפור'], correctIndex: 1 },
  { text: 'מי מטיל ביצים?', options: ['פרה','כלב','תרנגולת','חתול'], correctIndex: 2 },
  { text: 'מי הכי גדול?', options: ['ארנב','כלב','פיל','ארי'], correctIndex: 2 },
  { text: 'מה אוכל ארנב?', options: ['בשר','גזר וירקות','דגים','עצמות'], correctIndex: 1 },
  { text: 'מי שוחה בים?', options: ['כלב','ציפור','דג','חתול'], correctIndex: 2 },
  { text: 'כמה רגליים לעכביש?', options: ['4','6','8','10'], correctIndex: 2 },
  { text: 'מה בעל החיים שישן בחורף?', options: ['ארי','ציפור','דב','פרה'], correctIndex: 2 },
  { text: 'מי עושה "הי-הי-הי"?', options: ['סוס','חמור','פרה','כבש'], correctIndex: 1 },
], 1);

const LOGIC_AVIV_QS: ExerciseQuestion[] = tag('logic-aviv', [
  { text: 'מה שונה: 🍎🍎🍌🍎', options: ['🍎 הראשון','🍎 האחרון','🍌','כולם שווים'], correctIndex: 2 },
  { text: 'מה חסר: ⭐⭐_⭐', options: ['💫','⭐','🌟','אין חסר'], correctIndex: 1 },
  { text: 'מה הסדר הנכון: כבסה, לבשתי, הסרתי בגדים?', options: ['כבסה, לבשתי, הסרתי','הסרתי, כבסה, לבשתי','לבשתי, הסרתי, כבסה','הסרתי, לבשתי, כבסה'], correctIndex: 1 },
  { text: '🔴🔵🔴🔵__ מה הבא?', options: ['🔴','🔵','🟡','🟢'], correctIndex: 0 },
  { text: 'מה כבד יותר: 1 ק״ג ברזל או 1 ק״ג נוצות?', options: ['ברזל','נוצות','שווים','תלוי'], correctIndex: 2 },
  { text: 'אם יש 3 ילדים ולכל ילד 2 ידיים, כמה ידיים?', options: ['3','5','6','8'], correctIndex: 2 },
]);

// ─── AVIV new generators ──────────────────────────────────────────────────────

// Nikud words — big display, child chooses the correct reading
const NIKUD_QS: ExerciseQuestion[] = tag('nikud-words', [
  { text: 'קרא את המילה:\n\nבַּיִת', options: ['בית','ביית','בית-ה','בות'], correctIndex: 0, explanation: 'בַּ = "בַ", יִ = "יִ", ת = "ת" → בַּיִת' },
  { text: 'קרא את המילה:\n\nשֶׁמֶשׁ', options: ['שמוש','שמש','שׁמשׁ','שֵׁמֵשׁ'], correctIndex: 1, explanation: 'שֶׁ = "שֶׁ", מֶ = "מֶ", שׁ = "שׁ" → שֶׁמֶשׁ' },
  { text: 'קרא את המילה:\n\nיֶלֶד', options: ['ילד','יולד','ילוד','יֵלֵד'], correctIndex: 0, explanation: 'יֶ = "יֶ", לֶ = "לֶ", ד = "ד" → יֶלֶד' },
  { text: 'קרא את המילה:\n\nסֵפֶר', options: ['סיפר','ספר','סֵפֵר','ספור'], correctIndex: 1, explanation: 'סֵ = "סֵ", פֶ = "פֶ", ר = "ר" → סֵפֶר' },
  { text: 'קרא את המילה:\n\nאִמָּא', options: ['אמא','אימה','אמה','אמו'], correctIndex: 0, explanation: 'אִ = "אִ", מָּ = "מָּ", א = "א" → אִמָּא' },
  { text: 'קרא את המילה:\n\nכֶּלֶב', options: ['כלב','כּלב','כֵּלֵב','כולב'], correctIndex: 0, explanation: 'כֶּ = "כֶּ", לֶ = "לֶ", ב = "ב" → כֶּלֶב' },
  { text: 'קרא את המילה:\n\nמַיִם', options: ['מיים','מים','מָיִם','מויים'], correctIndex: 1, explanation: 'מַ = "מַ", יִ = "יִ", ם = "ם" → מַיִם' },
  { text: 'קרא את המילה:\n\nאֲרִי', options: ['ארי','אריה','ארו','אַרִי'], correctIndex: 0, explanation: 'אֲ = "אֲ", רִ = "רִ", י = "י" → אֲרִי' },
  { text: 'קרא את המילה:\n\nדָּג', options: ['דג','דוג','דיג','דגה'], correctIndex: 0, explanation: 'דָּ = "דָּ", ג = "ג" → דָּג' },
  { text: 'קרא את המילה:\n\nגַּן', options: ['גן','גין','גון','גנה'], correctIndex: 0, explanation: 'גַּ = "גַּ", ן = "ן" → גַּן' },
]);

// אהוי — when letters are consonants vs vowel indicators
const ALEF_HEY_VAV_YOD_QS: ExerciseQuestion[] = tag('alef-hey-vav-yod', [
  { text: 'במילה "אמא" — האות א בהתחלה היא:', options: ['אות שקטה','עיצור (נשמעת)','לא בטוח','תלוי'], correctIndex: 1, explanation: 'א בתחילת מילה היא תמיד עיצור — נשמעת!' },
  { text: 'במילה "ילדה" — ה בסוף היא:', options: ['עיצור שנשמע','אות שקטה (סימן נקבה)','שתיהן נכונות','לא בטוח'], correctIndex: 1, explanation: 'ה בסוף מילה בדרך כלל שקטה — סימן שהמילה נקבה' },
  { text: 'במילה "ויו" (שם האות) — הו בסוף:', options: ['נשמע כ-"ו"','שקטה','נשמע כ-"אוּ"','שניהם נכונים'], correctIndex: 0, explanation: 'ו בסוף "ויו" היא עיצור שנשמע' },
  { text: 'במילה "שלום" — האות ו היא:', options: ['עיצור','תנועה (סימן אוּ)','שקטה','לא בטוח'], correctIndex: 1, explanation: 'ו ב"שלום" = תנועת "ooo" — שלוֹם' },
  { text: 'במילה "יד" — האות י היא:', options: ['עיצור (נשמע "י")','תנועה','שקטה','אוֹ'], correctIndex: 0, explanation: 'י בתחילת "יד" — עיצור שנשמע כ-"י"' },
  { text: 'במילה "ביצה" — האות י אחרי ב:', options: ['עיצור','תנועה (סימן אִי)','שקטה','לא בטוח'], correctIndex: 1, explanation: 'י ב"ביצה" = תנועת "אִי" — בִּיצָה' },
  { text: 'באיזו מילה ה היא עיצור שנשמע?', options: ['ילדה','שולחן','הרים','ספריה'], correctIndex: 2, explanation: '"הרים" מתחיל ב-ה שנשמעת — הֲרִים' },
  { text: 'במילה "תורה" — ו אחרי ת:', options: ['עיצור','תנועה "אוֹ"','שקטה','תנועת "אוּ"'], correctIndex: 1, explanation: 'תוֹרָה — ו = "אוֹ"' },
  { text: 'האות ו ב"וָרֶד" (ורד) — פרח:', options: ['עיצור שנשמע "ו"','תנועת "אוֹ"','שקטה','תנועת "אוּ"'], correctIndex: 0, explanation: 'ב"וָרֶד" — ו בתחילת מילה = עיצור' },
  { text: 'האות י ב"יַלְדָּה":', options: ['תנועת "אִי"','שקטה','עיצור שנשמע "י"','תנועת "אֵי"'], correctIndex: 2, explanation: 'י בתחילת "יַלְדָּה" — עיצור שנשמע' },
  { text: 'האות ה ב"הֶחָלָב" (החלב):', options: ['שקטה','עיצור שנשמע','תנועה','לא ברור'], correctIndex: 1, explanation: 'ה בתחילת מילה עם חטף = נשמעת' },
  { text: 'האות א ב"מְלָאכָה":', options: ['עיצור','שקטה (אם קריאה)','תנועת "אַ"','תנועת "אָ"'], correctIndex: 1, explanation: 'א אחרי ל ב"מְלָאכָה" — שקטה, הקמץ הוא התנועה' },
  { text: 'המילה "אוֹר" — האות א:', options: ['שקטה','עיצור','תנועת "אוֹ"','אי אפשר לדעת'], correctIndex: 1, explanation: 'א ב"אוֹר" היא עיצור שנושא את התנועה חולם' },
  { text: 'ב"חוֹל" — האות ו:', options: ['עיצור','תנועת "אוֹ"','שקטה','תנועת "אוּ"'], correctIndex: 1, explanation: 'ו עם חולם = תנועת "אוֹ"' },
  { text: 'ב"גִּיל" — האות י:', options: ['עיצור','שקטה','חלק מתנועת "אִי"','תנועת "אֵי"'], correctIndex: 2, explanation: 'י אחרי חיריק = חיריק-מלא, חלק מהתנועה "אִי"' },
  { text: 'ב"הַיּוֹם" — ה בהתחלה:', options: ['שקטה','עיצור שנשמע','תנועה','כינוי ה׳'], correctIndex: 1, explanation: 'ה עם פתח בתחילת מילה = עיצור שנשמע (ה הידיעה)' },
]);

// Syllables — reading Hebrew syllables and short words
const SYLLABLES_QS: ExerciseQuestion[] = tag('syllables', [
  { text: 'קרא את ההברה:\n\nמָ', options: ['מוּ','מָ','מִי','מֵ'], correctIndex: 1, explanation: 'קמץ (ָ) = "א"' },
  { text: 'קרא את ההברה:\n\nבִּי', options: ['בֵי','בוּ','בִּי','בַּי'], correctIndex: 2, explanation: 'חיריק (ִ) + יוד = "אִי"' },
  { text: 'איזו הברה נשמעת "שוּ"?', options: ['שָׁ','שׁוּ','שֵׁי','שֶׁ'], correctIndex: 1, explanation: 'שׁוּ = שׁ + שׁורוּק = "שׁוּ"' },
  { text: 'קרא:\n\nדַּ + גּ = ?', options: ['דוג','דג','דָּג','דגג'], correctIndex: 1 },
  { text: 'קרא:\n\nמַּ + יִם = ?', options: ['מַיִם','מיים','מוּים','מֵים'], correctIndex: 0 },
  { text: 'איזו מילה נשמעת "שמש"?', options: ['שמש','שֶׁמֶשׁ','שמוש','שמישׁ'], correctIndex: 1 },
  { text: 'קרא:\n\nבֵּ + ית = ?', options: ['בית','ביית','בֵּית','בות'], correctIndex: 2 },
  { text: 'איזו הברה נשמעת "לִ"?', options: ['לָ','לוּ','לִ','לֵ'], correctIndex: 2, explanation: 'חיריק (ִ) = "אִ"' },
]);

// ─── AVIV new reading/nikud question sets ─────────────────────────────────────

const NIKUD_BASICS_QS: ExerciseQuestion[] = tag('nikud-basics', [
  { text: 'איך קוראים את הסימן הזה?\n\nָ (קמץ)', options: ['אָ — "אַ"','אִ — "אִי"','אֹ — "אוֹ"','אֶ — "אֶ"'], correctIndex: 0, explanation: 'קמץ נשמע "אָ" — כמו ב"אָב"' },
  { text: 'איך קוראים את הסימן הזה?\n\nַ (פתח)', options: ['אִ — "אִי"','אָ/אַ — "אַ"','אֵ — "אֵ"','אֻ — "אֻ"'], correctIndex: 1, explanation: 'פתח נשמע "אַ" — כמו ב"יַד"' },
  { text: 'איך קוראים את הסימן הזה?\n\nִ (חיריק)', options: ['אַ — "אַ"','אֹ — "אוֹ"','אִ — "אִי"','אֶ — "אֶ"'], correctIndex: 2, explanation: 'חיריק נשמע "אִי" — כמו ב"בִּית"' },
  { text: 'איך קוראים את הסימן הזה?\n\nֹ (חולם)', options: ['אַ — "אַ"','אִ — "אִי"','אֵ — "אֵ"','אֹ — "אוֹ"'], correctIndex: 3, explanation: 'חולם נשמע "אוֹ" — כמו ב"שׁוֹר"' },
  { text: 'איך קוראים את הסימן הזה?\n\nוּ (שורוק)', options: ['אֵ — "אֵ"','אוּ — "אוּ"','אַ — "אַ"','אִ — "אִי"'], correctIndex: 1, explanation: 'שורוק נשמע "אוּ" — כמו ב"רוּת"' },
  { text: 'איך קוראים את הסימן הזה?\n\nֶ (סגול)', options: ['אֶ — "אֶ"','אַ — "אַ"','אֹ — "אוֹ"','אִ — "אִי"'], correctIndex: 0, explanation: 'סגול נשמע "אֶ" — כמו ב"יֶלֶד"' },
  { text: 'איך קוראים את הסימן הזה?\n\nֵ (צרה)', options: ['אֹ — "אוֹ"','אַ — "אַ"','אֵ — "אֵ"','אִ — "אִי"'], correctIndex: 2, explanation: 'צרה נשמע "אֵ" — כמו ב"בֵּית"' },
  { text: 'מה הניקוד שנשמע "אִי"?', options: ['קמץ (ָ)','חיריק (ִ)','חולם (ֹ)','פתח (ַ)'], correctIndex: 1, explanation: 'חיריק = "אִי"' },
  { text: 'מה הניקוד שנשמע "אוֹ"?', options: ['פתח (ַ)','סגול (ֶ)','חולם (ֹ)','שורוק (וּ)'], correctIndex: 2, explanation: 'חולם = "אוֹ"' },
  { text: 'מה הניקוד שנשמע "אוּ"?', options: ['חיריק (ִ)','שורוק (וּ)','צרה (ֵ)','קמץ (ָ)'], correctIndex: 1, explanation: 'שורוק = "אוּ"' },
  { text: 'מה הניקוד שנשמע "אַ" או "אָ"?', options: ['חולם (ֹ)','חיריק (ִ)','פתח (ַ) וקמץ (ָ)','שורוק (וּ)'], correctIndex: 2, explanation: 'פתח וקמץ שניהם נשמעים "אַ/אָ"' },
  { text: 'מה הניקוד שנשמע "אֶ"?', options: ['פתח (ַ)','קמץ (ָ)','חיריק (ִ)','סגול (ֶ)'], correctIndex: 3, explanation: 'סגול = "אֶ"' },
], 1);

const SYLLABLE_READ_QS: ExerciseQuestion[] = tag('syllable-read', [
  { text: 'קרא את ההברה:\n\nבַּ', options: ['בוּ','בַּ','בֵּ','בֹ'], correctIndex: 1, explanation: 'ב + פתח = בַּ' },
  { text: 'קרא את ההברה:\n\nמִי', options: ['מֵ','מַ','מִי','מֹ'], correctIndex: 2, explanation: 'מ + חיריק + י = מִי' },
  { text: 'קרא את ההברה:\n\nלֹ', options: ['לִ','לַ','לֵ','לֹ'], correctIndex: 3, explanation: 'ל + חולם = לֹ' },
  { text: 'קרא את ההברה:\n\nשָׁ', options: ['שׁוּ','שָׁ','שִׁ','שֵׁ'], correctIndex: 1, explanation: 'ש + קמץ = שָׁ' },
  { text: 'קרא את ההברה:\n\nנֵי', options: ['נַי','נֵי','נִי','נֹי'], correctIndex: 1, explanation: 'נ + צרה + י = נֵי' },
  { text: 'קרא את ההברה:\n\nדוּ', options: ['דַּ','דֶּ','דוּ','דִּ'], correctIndex: 2, explanation: 'ד + שורוק = דוּ' },
  { text: 'קרא את ההברה:\n\nכֶּ', options: ['כֹּ','כָּ','כֻּ','כֶּ'], correctIndex: 3, explanation: 'כ + סגול = כֶּ' },
  { text: 'קרא את ההברה:\n\nרָ', options: ['רֵ','רָ','רֻ','רִ'], correctIndex: 1, explanation: 'ר + קמץ = רָ' },
  { text: 'קרא את ההברה:\n\nתִּ', options: ['תַּ','תֻּ','תֵּ','תִּ'], correctIndex: 3, explanation: 'ת + חיריק = תִּ' },
  { text: 'קרא את ההברה:\n\nפֵּ', options: ['פֵּ','פַּ','פֹּ','פוּ'], correctIndex: 0, explanation: 'פ + צרה = פֵּ' },
  { text: 'קרא את ההברה:\n\nגֻּ', options: ['גִּ','גֶּ','גֻּ','גֹּ'], correctIndex: 2, explanation: 'ג + קובוץ = גֻּ' },
  { text: 'קרא את ההברה:\n\nסֹ', options: ['סֹ','סַ','סֵ','סוּ'], correctIndex: 0, explanation: 'ס + חולם = סֹ' },
]);

const WORD_BUILD_QS: ExerciseQuestion[] = tag('word-build', [
  { text: 'קרא את המילה:\n\nאִמָּא', options: ['אמה','אמא','אימה','אמו'], correctIndex: 1, explanation: 'אִ+מָּ+א = אִמָּא' },
  { text: 'קרא את המילה:\n\nאַבָּא', options: ['אבו','אבה','אבא','אבי'], correctIndex: 2, explanation: 'אַ+בָּ+א = אַבָּא' },
  { text: 'קרא את המילה:\n\nכֶּלֶב', options: ['כולב','כלב','כֵּלֵב','כלוב'], correctIndex: 1, explanation: 'כֶּ+לֶ+ב = כֶּלֶב' },
  { text: 'קרא את המילה:\n\nיֶלֶד', options: ['יולד','ילוד','ילד','יֵלֵד'], correctIndex: 2, explanation: 'יֶ+לֶ+ד = יֶלֶד' },
  { text: 'קרא את המילה:\n\nגַּן', options: ['גן','גין','גון','גנה'], correctIndex: 0, explanation: 'גַּ+ן = גַּן' },
  { text: 'קרא את המילה:\n\nשֶׁמֶשׁ', options: ['שמוש','שמישׁ','שמש','שֵׁמֵשׁ'], correctIndex: 2, explanation: 'שֶׁ+מֶ+שׁ = שֶׁמֶשׁ' },
  { text: 'קרא את המילה:\n\nדָּג', options: ['דוג','דג','דיג','דגה'], correctIndex: 1, explanation: 'דָּ+ג = דָּג' },
  { text: 'קרא את המילה:\n\nסֵפֶר', options: ['סיפר','ספור','ספר','סֵפֵר'], correctIndex: 2, explanation: 'סֵ+פֶ+ר = סֵפֶר' },
  { text: 'קרא את המילה:\n\nבַּיִת', options: ['ביית','בות','בייט','בית'], correctIndex: 3, explanation: 'בַּ+יִ+ת = בַּיִת' },
  { text: 'קרא את המילה:\n\nמַיִם', options: ['מיים','מים','מָיִם','מויים'], correctIndex: 1, explanation: 'מַ+יִ+ם = מַיִם' },
]);

// ─── ITAI — Exam Prep question banks ─────────────────────────────────────────

const EXAM_PLACE_VALUE_QS: ExerciseQuestion[] = tag('exam-place-value', [
  { text: 'מה ספרת האלפים במספר 345,678?', options: ['3','4','5','6'], correctIndex: 2, explanation: '345,678 — מימין: יחידות=8, עשרות=7, מאות=6, אלפים=5' },
  { text: 'מה ערך הספרה 4 במספר 140,000?', options: ['4','400','4,000','40,000'], correctIndex: 3, explanation: '140,000 — ה-4 עומד במקום עשרות האלפים = 40,000' },
  { text: 'איזה מספר הגדול ביותר?', options: ['456,789','456,987','456,900','456,799'], correctIndex: 1, explanation: '456,987 — ספרת המאות היא 9, הגדולה מבין כולן' },
  { text: 'עגל ל-1,000 הקרוב: 347,650', options: ['347,000','348,000','350,000','300,000'], correctIndex: 1, explanation: 'ספרת מאות=6 ≥ 5 → מעגלים למעלה → 348,000' },
  { text: 'מה הבא בסדרה? 200,000 | 400,000 | 600,000 | ___', options: ['700,000','800,000','900,000','1,000,000'], correctIndex: 1, explanation: 'קפיצות של 200,000' },
  { text: 'כיצד כותבים "שש מאות אלף ושניים"?', options: ['602,000','600,200','600,020','600,002'], correctIndex: 3, explanation: '600,000 + 2 = 600,002' },
  { text: 'מה ספרת מאות האלפים ב-1,234,567?', options: ['1','2','3','4'], correctIndex: 1, explanation: '1,234,567 — מאות האלפים = 2' },
  { text: 'עגל ל-10,000 הקרוב: 785,400', options: ['780,000','785,000','790,000','800,000'], correctIndex: 2, explanation: 'ספרת האלפים=5 ≥ 5 → מעגלים למעלה → 790,000' },
  { text: 'מה הבא בסדרה? 1,000,000 | 900,000 | 800,000 | ___', options: ['750,000','700,000','600,000','500,000'], correctIndex: 1, explanation: 'קפיצות של 100,000 לאחור' },
  { text: 'איזה מספר גדול יותר: 1,001,000 או 1,000,999?', options: ['1,001,000','1,000,999','שווים','אי אפשר לדעת'], correctIndex: 0, explanation: '1,001,000 > 1,000,999 כי 1,000 > 999' },
], 3);

const EXAM_MUL_METHODS_QS: ExerciseQuestion[] = tag('exam-mul-methods', [
  // ── דו-ספרתי × חד-ספרתי (חימום: לוודא שיטת הפילוג) ──
  { text: '36 × 4 = (30×4) + (6×4) = 120 + 24 = ?', options: ['134','144','154','164'], correctIndex: 1, explanation: '120 + 24 = 144' },
  { text: '19 × 5 = (20−1)×5 = 100−5 = ?', options: ['85','90','95','100'], correctIndex: 2, explanation: 'שיטת "עגול ופחות": 20×5 − 1×5 = 95' },
  // ── דו-ספרתי × דו-ספרתי בפילוג ──
  { text: '23 × 14 = (20×14) + (3×14) = 280 + 42 = ?', options: ['302','312','322','332'], correctIndex: 2, explanation: '280 + 42 = 322' },
  { text: '34 × 12 = (30×12) + (4×12) = 360 + 48 = ?', options: ['388','398','408','418'], correctIndex: 2, explanation: '360 + 48 = 408' },
  { text: '25 × 16 = (20×16) + (5×16) = 320 + 80 = ?', options: ['380','390','400','410'], correctIndex: 2, explanation: '320 + 80 = 400' },
  { text: '42 × 13 = (40×13) + (2×13) = 520 + 26 = ?', options: ['536','546','556','566'], correctIndex: 1, explanation: '520 + 26 = 546' },
  { text: '31 × 24 = (30×24) + (1×24) = 720 + 24 = ?', options: ['724','734','744','754'], correctIndex: 2, explanation: '720 + 24 = 744' },
  { text: '53 × 21 = (50×21) + (3×21) = 1,050 + 63 = ?', options: ['1,103','1,113','1,123','1,133'], correctIndex: 1, explanation: '1,050 + 63 = 1,113' },
  // ── שאלות מילוליות ──
  { text: 'בבית הספר יש 24 כיתות. בכל כיתה 28 ילדים. כמה ילדים בסה"כ?', options: ['622','652','672','692'], correctIndex: 2, explanation: '(20×28)+(4×28) = 560+112 = 672' },
  { text: 'מחסן יש 32 קרטונים. בכל קרטון 15 פחיות. כמה פחיות?', options: ['440','460','480','520'], correctIndex: 2, explanation: '(30×15)+(2×15) = 450+30 = 480' },
], 3);

const EXAM_MUL_TENS_QS: ExerciseQuestion[] = tag('exam-mul-tens', [
  { text: '30 × 4 = ?', options: ['34','120','1,200','12'], correctIndex: 1, explanation: '3×4=12, מוסיפים אפס → 120' },
  { text: '300 × 4 = ?', options: ['120','1,200','12,000','34'], correctIndex: 1, explanation: '3×4=12, מוסיפים שני אפסים → 1,200' },
  { text: '60 × 7 = ?', options: ['67','420','4,200','42'], correctIndex: 1, explanation: '6×7=42, מוסיפים אפס → 420' },
  { text: '50 × 80 = ?', options: ['400','4,000','40,000','130'], correctIndex: 1, explanation: '5×8=40, מוסיפים שני אפסים → 4,000' },
  { text: '120 ÷ 4 = ?', options: ['3','30','300','48'], correctIndex: 1, explanation: '12÷4=3, מחלקים ב-4 → 30' },
  { text: '1,200 ÷ 4 = ?', options: ['3','30','300','3,000'], correctIndex: 2, explanation: '12÷4=3, שתי אפסים נשארות → 300' },
  { text: '4,200 ÷ 70 = ?', options: ['6','60','600','4,270'], correctIndex: 1, explanation: '42÷7=6, אפס אחד נשאר → 60' },
  { text: '200 × 30 = ?', options: ['600','6,000','60,000','230'], correctIndex: 1, explanation: '2×3=6, שלושה אפסים → 6,000' },
], 3);

const EXAM_DIV_PARTITION_QS: ExerciseQuestion[] = tag('exam-div-partition', [
  { text: '96 ÷ 4 = (80÷4) + (16÷4) = 20 + 4 = ?', options: ['20','24','28','32'], correctIndex: 1, explanation: 'פילוג: 80÷4=20, 16÷4=4 → 24' },
  { text: '75 ÷ 5 = (50÷5) + (25÷5) = 10 + 5 = ?', options: ['13','14','15','16'], correctIndex: 2, explanation: '50÷5=10, 25÷5=5 → 15' },
  { text: '84 ÷ 4 = (80÷4) + (4÷4) = 20 + 1 = ?', options: ['19','21','22','24'], correctIndex: 1, explanation: '80÷4=20, 4÷4=1 → 21' },
  { text: '84 ÷ 6 = (60÷6) + (24÷6) = 10 + 4 = ?', options: ['12','13','14','15'], correctIndex: 2, explanation: '60÷6=10, 24÷6=4 → 14' },
  { text: '91 ÷ 7 = ?', options: ['12','13','14','15'], correctIndex: 1, explanation: '(70÷7)+(21÷7) = 10+3 = 13' },
  { text: '78 ÷ 3 = (60÷3) + (18÷3) = 20 + 6 = ?', options: ['24','25','26','28'], correctIndex: 2, explanation: '60÷3=20, 18÷3=6 → 26' },
  { text: '90 ÷ 6 = ?', options: ['12','15','16','18'], correctIndex: 1, explanation: '(60÷6)+(30÷6) = 10+5 = 15' },
  { text: 'אמא חילקה 96 סוכריות ל-8 ילדים שווה בשווה. כמה לכל ילד?', options: ['10','12','14','16'], correctIndex: 1, explanation: '(80÷8)+(16÷8) = 10+2 = 12' },
], 4);

const EXAM_FRACTIONS_ADV_QS: ExerciseQuestion[] = tag('exam-fractions-adv', [
  // ── זיהוי ושיום ──
  { text: 'כיצד קוראים לשבר 3/5?', options: ['שלוש חמישיות','חמש שלישים','שלוש חמשיות','חמישית שלישי'], correctIndex: 0, explanation: 'מונה=3 → שלוש; מכנה=5 → חמישיות' },
  { text: 'מה מייצג המכנה בשבר?', options: ['כמה חלקים יש לנו','לכמה חלקים שווים חולק השלם','כמה שלמים יש','גודל השבר'], correctIndex: 1, explanation: 'המכנה (למטה) = מספר החלקים השווים שחילקנו את השלם' },
  { text: 'פיצה חתוכה ל-8 חלקים שווים, אכלנו 3. איזה שבר?', options: ['3/5','5/8','3/8','8/3'], correctIndex: 2, explanation: 'מונה=3 (אכלנו), מכנה=8 (סה"כ חלקים) → 3/8' },
  { text: 'כיצד קוראים לשבר 5/6?', options: ['חמש שישיות','שש חמישיות','חמישית שישי','שישית חמישי'], correctIndex: 0, explanation: 'מונה=5 → חמש; מכנה=6 → שישיות' },
  // ── מעבר שבר פשוט ↔ מספר מעורב ──
  { text: '2½ כשבר פשוט = ?', options: ['2/5','4/2','5/2','6/2'], correctIndex: 2, explanation: '2 שלמים × 2 + 1 = 5 → 5/2' },
  { text: '9/4 כמספר מעורב = ?', options: ['1¾','2¼','2½','3¼'], correctIndex: 1, explanation: '9÷4 = 2 ושאר 1 → 2¼' },
  // ── חיבור וחיסור (מכנים שווים ומוכלים) ──
  { text: '2/7 + 3/7 = ?', options: ['5/14','5/7','6/7','1'], correctIndex: 1, explanation: 'מכנים שווים → מחברים מונים בלבד: 2+3=5 → 5/7' },
  { text: '5/6 − 2/6 = ?', options: ['3/0','3/6','1/2','3/12'], correctIndex: 2, explanation: '5−2=3 → 3/6 = 1/2' },
  { text: '1/3 + 1/6 = ? (מכנה מוכל)', options: ['2/9','2/6','3/6','1/2'], correctIndex: 2, explanation: '1/3 = 2/6, אז 2/6 + 1/6 = 3/6 = 1/2' },
  // ── שאלה מילולית ──
  { text: 'אמא חתכה עוגה ל-8 חלקים. ילד אחד אכל 2 חלקים, השני אכל 3. כמה נאכל ביחד?', options: ['4/8','5/8','6/8','7/8'], correctIndex: 1, explanation: '2/8 + 3/8 = 5/8' },
], 4);

const EXAM_GEOMETRY_ADV_QS: ExerciseQuestion[] = tag('exam-geometry-adv', [
  { text: 'מה שטח מלבן עם אורך 8 סמ ורוחב 5 סמ?', options: ['26 סמ"ר','40 סמ"ר','13 סמ"ר','80 סמ"ר'], correctIndex: 1, explanation: 'שטח = אורך × רוחב = 8×5 = 40 סמ"ר' },
  { text: 'מה היקף ריבוע עם צלע 7 סמ?', options: ['14 סמ','21 סמ','28 סמ','49 סמ'], correctIndex: 2, explanation: 'היקף = 4×צלע = 4×7 = 28 סמ' },
  { text: 'מה שטח ריבוע עם צלע 6 סמ?', options: ['12 סמ"ר','24 סמ"ר','36 סמ"ר','48 סמ"ר'], correctIndex: 2, explanation: 'שטח = צלע² = 6×6 = 36 סמ"ר' },
  { text: 'מה היקף מלבן 9 סמ × 4 סמ?', options: ['13 סמ','26 סמ','36 סמ','72 סמ'], correctIndex: 1, explanation: 'היקף = 2×(9+4) = 2×13 = 26 סמ' },
  { text: 'כמה סמ"ר יש ב-1 מ"ר?', options: ['100','1,000','10,000','100,000'], correctIndex: 2, explanation: '1 מ"ר = 100 סמ × 100 סמ = 10,000 סמ"ר' },
  { text: 'שטח מלבן = 48 סמ"ר, אורך = 8 סמ. מה הרוחב?', options: ['4 סמ','5 סמ','6 סמ','7 סמ'], correctIndex: 2, explanation: 'רוחב = שטח ÷ אורך = 48 ÷ 8 = 6 סמ' },
  { text: 'לאיזו צורה כל 4 הצלעות שוות ו-4 זוויות ישרות?', options: ['מלבן','ריבוע','מעוין','טרפז'], correctIndex: 1, explanation: 'ריבוע — כל הצלעות שוות וכל הזוויות 90°' },
  { text: 'היקף מלבן = 30 סמ, רוחב = 6 סמ. מה האורך?', options: ['7 סמ','8 סמ','9 סמ','10 סמ'], correctIndex: 2, explanation: '2×(א+6)=30 → א+6=15 → א=9 סמ' },
  { text: 'ריבוע גדול בצלע 10 סמ. מה שטחו?', options: ['40 סמ"ר','80 סמ"ר','100 סמ"ר','1,000 סמ"ר'], correctIndex: 2, explanation: '10×10 = 100 סמ"ר' },
  { text: 'אי אפשר לציין ריבוע שצלעו 5 מ. מה שטחו?', options: ['10 מ"ר','20 מ"ר','25 מ"ר','50 מ"ר'], correctIndex: 2, explanation: 'שטח = 5×5 = 25 מ"ר' },
], 3);

// ─── Master dispatcher ────────────────────────────────────────────────────────
export function generateQuestions(exerciseTypeId: string): ExerciseQuestion[] {
  const s = (arr: ExerciseQuestion[], n: number) => shuffle(arr).slice(0, n);
  switch (exerciseTypeId) {
    case 'mul-tables':      return genMulTables();
    case 'division':        return genDivision();
    case 'two-digit':       return genTwoDigit();
    case 'fractions':       return s(FRACTION_QS, 8);
    case 'sequences':       return s(SEQUENCE_QS, 8);
    case 'geometry':        return s(GEOMETRY_QS, 8);
    case 'soccer-math':     return s(SOCCER_QS, 6);
    case 'big-numbers':     return s(BIG_NUMBERS_QS, 8);
    case 'hebrew-spell-4':  return s(SPELLING_4_QS, 8);
    case 'hebrew-grammar':  return s(GRAMMAR_QS, 8);
    case 'hebrew-antonym':  return s(ANTONYM_QS, 8);
    case 'english-vocab':   return s(ENGLISH_VOCAB_QS, 8);
    case 'english-numbers': return s(ENGLISH_NUMS_QS, 8);
    case 'science-nature':  return s(SCIENCE_QS, 8);
    case 'geography-il':    return s(GEOGRAPHY_IL_QS, 8);
    case 'logic-itai':      return s(LOGIC_ITAI_QS, 6);
    case 'mul-200':         return genMul200();
    case 'parentheses':     return genParentheses();
    case 'reading-comp-1':  return s(READING_COMP_1_QS, 5);
    case 'reading-comp-2':  return s(READING_COMP_2_QS, 5);
    case 'reading-comp-3':  return s(READING_COMP_3_QS, 5);
    case 'add-10':          return genAdd10();
    case 'sub-10':          return genSub10();
    case 'add-20':          return genAdd20();
    case 'sub-20':          return genSub20();
    case 'add-sub-100':     return genAddSubMix(); // reuses harder mix generator
    case 'compare-nums':    return genCompareNums();
    case 'number-order':    return genNumberOrder();
    case 'add-sub-mix':     return genAddSubMix();
    case 'hebrew-letters':  return s(LETTERS_QS, 8);
    case 'hebrew-words-1':  return s(WORDS_1_QS, 8);
    case 'rhyming':         return s(RHYMING_QS, 8);
    case 'shapes':          return s(SHAPES_QS, 8);
    case 'colors':          return s(COLORS_QS, 8);
    case 'animals':         return s(ANIMALS_QS, 8);
    case 'logic-aviv':      return s(LOGIC_AVIV_QS, 6);
    case 'nikud-words':     return s(NIKUD_QS, 8);
    case 'alef-hey-vav-yod': return s(ALEF_HEY_VAV_YOD_QS, 8);
    case 'syllables':       return s(SYLLABLES_QS, 8);
    case 'nikud-basics':    return s(NIKUD_BASICS_QS, 10);
    case 'syllable-read':   return s(SYLLABLE_READ_QS, 10);
    case 'word-build':          return s(WORD_BUILD_QS, 8);
    case 'exam-place-value':    return s(EXAM_PLACE_VALUE_QS, 10);
    case 'exam-mul-methods':    return s(EXAM_MUL_METHODS_QS, 10);
    case 'exam-mul-tens':       return s(EXAM_MUL_TENS_QS, 8);
    case 'exam-div-partition':  return s(EXAM_DIV_PARTITION_QS, 8);
    case 'exam-fractions-adv':  return s(EXAM_FRACTIONS_ADV_QS, 10);
    case 'exam-geometry-adv':   return s(EXAM_GEOMETRY_ADV_QS, 10);
    default:                    return [];
  }
}

export function getExercisesForKid(kidId: string): ExerciseType[] {
  return EXERCISE_TYPES.filter(e => e.kidIds.includes(kidId));
}

/** Calculate points earned given score/total and the exercise type */
export function calcPoints(ex: ExerciseType, score: number, total: number): number {
  if (total === 0) return ex.minPoints;
  return ex.minPoints + Math.round(((score / total)) * (ex.maxPoints - ex.minPoints));
}
