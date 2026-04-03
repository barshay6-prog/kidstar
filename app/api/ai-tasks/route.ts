import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface AITasksRequest {
  kidName: string;
  grade: string;
  weakSubjects: string[];   // subjects with low accuracy
  existingTasks: string[];  // existing task titles to avoid duplicates
  count: number;
}

export interface AITask {
  title: string;
  points: number;
  type: 'homework' | 'challenge';
  reason: string;
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not set' }, { status: 503 });
  }

  const body: AITasksRequest = await req.json();
  const { kidName, grade, weakSubjects, existingTasks, count } = body;

  const weakPart = weakSubjects.length
    ? `הילד מתקשה במיוחד ב: ${weakSubjects.join(', ')}.`
    : 'אין תחומי חולשה מזוהים.';

  const existingPart = existingTasks.length
    ? `משימות קיימות שכבר יש (אל תחזור עליהן): ${existingTasks.slice(0,10).join(', ')}.`
    : '';

  const prompt = `אתה מומחה חינוכי שמייעץ להורים לגבי משימות לימודיות לילדים.
ילד בשם ${kidName}, ${grade}.
${weakPart}
${existingPart}

צור בדיוק ${count} משימות לימודיות מגוונות ומותאמות לילד. כל משימה צריכה להיות ספציפית, מעשית וניתנת לביצוע בבית.
ציין לכל משימה: כמה נקודות לתת (5-50), אם זו "homework" (שיעורי בית) או "challenge" (אתגר), והסבר קצר לפי מה הצעת אותה.

החזר JSON בלבד, ללא טקסט נוסף:
[
  {
    "title": "שם המשימה בעברית",
    "points": 15,
    "type": "homework",
    "reason": "הסבר קצר למה הצעת את המשימה הזו"
  }
]`;

  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = msg.content[0].type === 'text' ? msg.content[0].text : '';
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('No JSON array in response');
    const tasks: AITask[] = JSON.parse(match[0]);
    return NextResponse.json({ tasks });
  } catch (e) {
    console.error('AI task generation failed:', e);
    return NextResponse.json({ error: 'Failed to generate tasks' }, { status: 500 });
  }
}
