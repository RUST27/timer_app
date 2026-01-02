import { useState, useEffect, useCallback, useRef } from 'react';
import type { ActiveTimer } from '../types';

export const useTimer = () => {
  const [timer, setTimer] = useState<ActiveTimer | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (!timer || timer.isPaused) {
      return;
    }

    startTimeRef.current = timer.startTime.getTime();
    pausedTimeRef.current = timer.pausedTime || 0;

    intervalRef.current = setInterval(() => {
      const now = new Date().getTime();
      const elapsed = now - startTimeRef.current - pausedTimeRef.current;
      setElapsedTime(Math.max(0, elapsed));
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer]);

  const startTimer = useCallback((clientId: string, projectId?: string) => {
    const now = new Date();
    const newTimer: ActiveTimer = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      clientId,
      projectId,
      startTime: now,
      isPaused: false,
      createdAt: now,
      updatedAt: now,
    };
    setTimer(newTimer);
    setElapsedTime(0);
    pausedTimeRef.current = 0;
  }, []);

  const pauseTimer = useCallback(() => {
    if (!timer || timer.isPaused) return;

    const now = new Date().getTime();
    const elapsed = now - timer.startTime.getTime() - (timer.pausedTime || 0);
    pausedTimeRef.current += elapsed;

    setTimer({
      ...timer,
      isPaused: true,
      pausedTime: pausedTimeRef.current,
    });
  }, [timer]);

  const resumeTimer = useCallback(() => {
    if (!timer || !timer.isPaused) return;

    setTimer({
      ...timer,
      isPaused: false,
      startTime: new Date(),
    });
  }, [timer]);

  const stopTimer = useCallback(() => {
    setTimer(null);
    setElapsedTime(0);
    pausedTimeRef.current = 0;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  return {
    timer,
    elapsedTime,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    isRunning: timer !== null && !timer.isPaused,
    isPaused: timer !== null && timer.isPaused,
  };
};

