'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, Kid, Task, CompletedExercise, AppSettings, AttemptDetail } from './types';
import { DEFAULT_STATE } from './defaultData';
import { checkAchievements } from './achievements';
import { loadStateFromCloud, saveStateToCloud } from './supabase';

const STORAGE_KEY = 'kidstar_v2';

function loadState(): AppState {
  if (typeof window === 'undefined') return structuredClone(DEFAULT_STATE);
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    const parsed: AppState = JSON.parse(raw);
    // Daily reset of screenTimeUsed
    const today = new Date().toDateString();
    if (parsed.lastReset !== today) {
      parsed.lastReset = today;
      parsed.kids = parsed.kids.map((k) => ({ ...k, screenTimeUsed: 0 }));
    }
    // Backfill missing fields
    if (!parsed.settings) parsed.settings = structuredClone(DEFAULT_STATE.settings);
    parsed.kids = parsed.kids.map((k) => ({
      ...k,
      allTimePoints: k.allTimePoints ?? k.totalPoints,
      completedExercises: k.completedExercises ?? [],
      achievements: k.achievements ?? [],
      history: k.history ?? [],
      streak: k.streak ?? 0,
    }));
    return parsed;
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

function saveLocal(state: AppState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function awardAchievements(kid: Kid): Kid {
  const newIds = checkAchievements(kid);
  if (!newIds.length) return kid;
  return {
    ...kid,
    achievements: [
      ...kid.achievements,
      ...newIds.map((id) => ({ achievementId: id, unlockedAt: new Date().toISOString() })),
    ],
  };
}

export function useAppStore() {
  const [state, setState] = useState<AppState>(structuredClone(DEFAULT_STATE));
  const [ready, setReady] = useState(false);
  const cloudSyncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load: try cloud first, fall back to localStorage
  useEffect(() => {
    async function init() {
      try {
        const cloud = await loadStateFromCloud();
        if (cloud) {
          // Backfill + daily reset on cloud data too
          const parsed = cloud as unknown as AppState;
          const today = new Date().toDateString();
          if (parsed.lastReset !== today) {
            parsed.lastReset = today;
            parsed.kids = parsed.kids.map((k) => ({ ...k, screenTimeUsed: 0 }));
          }
          if (!parsed.settings) parsed.settings = structuredClone(DEFAULT_STATE.settings);
          parsed.kids = parsed.kids.map((k) => ({
            ...k,
            allTimePoints: k.allTimePoints ?? k.totalPoints,
            completedExercises: k.completedExercises ?? [],
            achievements: k.achievements ?? [],
            history: k.history ?? [],
            streak: k.streak ?? 0,
          }));
          setState(parsed);
          saveLocal(parsed);
        } else {
          setState(loadState());
        }
      } catch {
        // Cloud unavailable — use localStorage
        setState(loadState());
      }
      setReady(true);
    }
    init();
  }, []);

  const update = useCallback((next: AppState) => {
    saveLocal(next);
    setState(next);
    // Debounced cloud sync — wait 1.5s after last change
    if (cloudSyncTimer.current) clearTimeout(cloudSyncTimer.current);
    cloudSyncTimer.current = setTimeout(() => {
      saveStateToCloud(next).catch(() => {/* silent fail */});
    }, 1500);
  }, []);

  // ─── Tasks ───────────────────────────────────────────────────────────────
  const completeTask = useCallback((kidId: string, taskId: string) => {
    const next = structuredClone(state);
    const kid = next.kids.find((k) => k.id === kidId);
    if (!kid) return;
    const task = kid.tasks.find((t) => t.id === taskId);
    if (!task || task.completed) return;
    task.completed = true;
    task.completedAt = new Date().toISOString();
    kid.totalPoints += task.points;
    kid.allTimePoints += task.points;
    kid.screenTimeEarned += task.points * next.settings.pointsPerMinute;
    kid.history.unshift({ id: `h-${Date.now()}`, type: 'task', title: task.title, points: task.points, timestamp: new Date().toISOString() });
    // Streak
    const today = new Date().toDateString();
    if (kid.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      kid.streak = kid.lastActiveDate === yesterday ? kid.streak + 1 : 1;
      kid.lastActiveDate = today;
    }
    next.kids = next.kids.map((k) => k.id === kidId ? awardAchievements(kid) : k);
    update(next);
  }, [state, update]);

  const uncompleteTask = useCallback((kidId: string, taskId: string) => {
    const next = structuredClone(state);
    const kid = next.kids.find((k) => k.id === kidId);
    if (!kid) return;
    const task = kid.tasks.find((t) => t.id === taskId);
    if (!task || !task.completed) return;
    task.completed = false;
    task.completedAt = undefined;
    kid.totalPoints = Math.max(0, kid.totalPoints - task.points);
    kid.allTimePoints = Math.max(0, kid.allTimePoints - task.points);
    kid.screenTimeEarned = Math.max(0, kid.screenTimeEarned - task.points * next.settings.pointsPerMinute);
    update(next);
  }, [state, update]);

  const addTask = useCallback((kidId: string, task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const next = structuredClone(state);
    const kid = next.kids.find((k) => k.id === kidId);
    if (!kid) return;
    kid.tasks.push({ ...task, id: `${kidId}-t-${Date.now()}`, completed: false, createdAt: new Date().toISOString() });
    update(next);
  }, [state, update]);

  const updateTask = useCallback((kidId: string, taskId: string, patch: Partial<Pick<Task, 'title' | 'points' | 'type' | 'note'>>) => {
    const next = structuredClone(state);
    const kid = next.kids.find((k) => k.id === kidId);
    if (!kid) return;
    const task = kid.tasks.find((t) => t.id === taskId);
    if (!task) return;
    Object.assign(task, patch);
    update(next);
  }, [state, update]);

  const deleteTask = useCallback((kidId: string, taskId: string) => {
    const next = structuredClone(state);
    const kid = next.kids.find((k) => k.id === kidId);
    if (!kid) return;
    const task = kid.tasks.find((t) => t.id === taskId);
    if (task?.completed) {
      kid.totalPoints = Math.max(0, kid.totalPoints - task.points);
      kid.allTimePoints = Math.max(0, kid.allTimePoints - task.points);
      kid.screenTimeEarned = Math.max(0, kid.screenTimeEarned - task.points * next.settings.pointsPerMinute);
    }
    kid.tasks = kid.tasks.filter((t) => t.id !== taskId);
    update(next);
  }, [state, update]);

  // ─── Screen time ─────────────────────────────────────────────────────────
  const useScreenTime = useCallback((kidId: string, minutes: number): boolean => {
    const next = structuredClone(state);
    const kid = next.kids.find((k) => k.id === kidId);
    if (!kid) return false;
    const available = kid.screenTimeEarned - kid.screenTimeUsed;
    if (available < minutes) return false;
    kid.screenTimeUsed += minutes;
    kid.history.unshift({ id: `h-${Date.now()}`, type: 'screen_time', title: `${minutes} דקות מסך`, points: -minutes, timestamp: new Date().toISOString() });
    update(next);
    return true;
  }, [state, update]);

  // ─── Exercises ───────────────────────────────────────────────────────────
  const recordExercise = useCallback((kidId: string, result: Omit<CompletedExercise, 'id' | 'attempts'> & { attempts?: AttemptDetail[] }) => {
    const next = structuredClone(state);
    const kid = next.kids.find((k) => k.id === kidId);
    if (!kid) return;
    const entry: CompletedExercise = { ...result, attempts: result.attempts ?? [], id: `ex-${Date.now()}` };
    kid.completedExercises.push(entry);
    kid.totalPoints += result.pointsEarned;
    kid.allTimePoints += result.pointsEarned;
    kid.screenTimeEarned += result.pointsEarned * next.settings.pointsPerMinute;
    kid.history.unshift({ id: `h-${Date.now()}`, type: 'exercise', title: `תרגול: ${result.exerciseTypeId}`, points: result.pointsEarned, timestamp: result.completedAt, detail: `${result.score}/${result.total} נכון` });
    const today = new Date().toDateString();
    if (kid.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      kid.streak = kid.lastActiveDate === yesterday ? kid.streak + 1 : 1;
      kid.lastActiveDate = today;
    }
    next.kids = next.kids.map((k) => k.id === kidId ? awardAchievements(kid) : k);
    update(next);
  }, [state, update]);

  // ─── Parent / settings ───────────────────────────────────────────────────
  const updateSettings = useCallback((patch: Partial<AppSettings>) => {
    const next = structuredClone(state);
    next.settings = { ...next.settings, ...patch };
    update(next);
  }, [state, update]);

  const adjustPoints = useCallback((kidId: string, delta: number, reason: string) => {
    const next = structuredClone(state);
    const kid = next.kids.find((k) => k.id === kidId);
    if (!kid) return;
    kid.totalPoints = Math.max(0, kid.totalPoints + delta);
    kid.allTimePoints = Math.max(0, kid.allTimePoints + delta);
    if (delta > 0) kid.screenTimeEarned += delta * next.settings.pointsPerMinute;
    kid.history.unshift({ id: `h-${Date.now()}`, type: 'task', title: reason, points: delta, timestamp: new Date().toISOString() });
    next.kids = next.kids.map((k) => k.id === kidId ? awardAchievements(kid) : k);
    update(next);
  }, [state, update]);

  const resetKidData = useCallback((kidId: string) => {
    const next = structuredClone(state);
    const idx = next.kids.findIndex((k) => k.id === kidId);
    if (idx < 0) return;
    const kid = next.kids[idx];
    next.kids[idx] = {
      ...kid,
      totalPoints: 0,
      allTimePoints: 0,
      screenTimeEarned: 0,
      screenTimeUsed: 0,
      streak: 0,
      completedExercises: [],
      achievements: [],
      history: [],
      tasks: kid.tasks.map((t) => ({ ...t, completed: false, completedAt: undefined })),
    };
    update(next);
  }, [state, update]);

  const getKid = useCallback((id: string) => state.kids.find((k) => k.id === id), [state]);

  return {
    state,
    ready,
    getKid,
    completeTask,
    uncompleteTask,
    addTask,
    updateTask,
    deleteTask,
    useScreenTime,
    recordExercise,
    updateSettings,
    adjustPoints,
    resetKidData,
  };
}
