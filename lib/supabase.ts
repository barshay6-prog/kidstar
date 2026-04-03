import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = url && key ? createClient(url, key) : null;

export const STATE_ROW_ID = 'kidstar-family';

/** Load app state from Supabase. Returns null if not found or not configured. */
export async function loadStateFromCloud(): Promise<Record<string, unknown> | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('app_state')
    .select('data')
    .eq('id', STATE_ROW_ID)
    .single();
  if (error || !data) return null;
  return data.data as Record<string, unknown>;
}

/** Save app state to Supabase (upsert). No-op if not configured. */
export async function saveStateToCloud(state: unknown): Promise<void> {
  if (!supabase) return;
  await supabase.from('app_state').upsert({
    id: STATE_ROW_ID,
    data: state,
    updated_at: new Date().toISOString(),
  });
}
