import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, key);

export const STATE_ROW_ID = 'kidstar-family';

/** Load app state from Supabase. Returns null if not found. */
export async function loadStateFromCloud(): Promise<Record<string, unknown> | null> {
  const { data, error } = await supabase
    .from('app_state')
    .select('data')
    .eq('id', STATE_ROW_ID)
    .single();
  if (error || !data) return null;
  return data.data as Record<string, unknown>;
}

/** Save app state to Supabase (upsert). */
export async function saveStateToCloud(state: unknown): Promise<void> {
  await supabase.from('app_state').upsert({
    id: STATE_ROW_ID,
    data: state,
    updated_at: new Date().toISOString(),
  });
}
