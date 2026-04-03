import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface AIExerciseRequest {
  kidName: string;
  grade: string;
  subject: string;
  weakTopics: string[];   // from wrong-answer analysis
  count: number;          // number of questions
}

export interface AIQuestion {
  text: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not set' }, { status: 503 });
  }

  const body: AIExerciseRequest = await req.json();
  const { kidName, grade, subject, weakTopics, count } = body;

  const weakPart = weakTopics.length
    ? `הילד מתקשה במיוחד ב: ${weakTopics.join(', ')}.`
    : '';

  const prompt = `אתה יוצר שאלות לילד בשם ${kidName}, ${grade} בנושא ${subject}.
${weakPart}
צור בדיוק ${count} שאלות אמריקאיות (multiple choice) מותאמות לרמה. כל שאלה עם 4 אפשרויות ואינדקס התשובה הנכונה (0-3).
החזר JSON בלבד בפורמט הבא, ללא שום טקסט נוסף:
[
  {
    "text": "השאלה...",
    "options": ["א","ב","ג","ד"],
    "correctIndex": 0,
    "explanation": "הסבר קצר אופציונלי"
  }
]`;

  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = msg.content[0].type === 'text' ? msg.content[0].text : '';
    // Extract JSON array
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('No JSON array in response');
    const questions: AIQuestion[] = JSON.parse(match[0]);
    return NextResponse.json({ questions });
  } catch (e) {
    console.error('AI exercise generation failed:', e);
    return NextResponse.json({ error: 'Failed to generate questions' }, { status: 500 });
  }
}
