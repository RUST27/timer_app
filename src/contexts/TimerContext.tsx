import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { ActiveTimer } from '../types';
import { localStorageService } from '../services/storage/localStorage';
import { STORAGE_KEYS } from '../utils/constants';

interface TimerContextType {
  timers: ActiveTimer[];
  getTimer: (clientId: string, projectId?: string) => ActiveTimer | undefined;
  startTimer: (clientId: string, projectId?: string, description?: string) => void;
  pauseTimer: (timerId: string) => void;
  resumeTimer: (timerId: string) => void;
  stopTimer: (timerId: string, saveRecord?: boolean) => void;
  updateTimerDescription: (timerId: string, description: string) => void;
  getElapsedTime: (timerId: string) => number;
}

// Helper para convertir fechas desde JSON
const parseTimerDates = (timer: any): ActiveTimer => {
  return {
    ...timer,
    startTime: new Date(timer.startTime),
    createdAt: new Date(timer.createdAt),
    updatedAt: new Date(timer.updatedAt),
  };
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [timers, setTimers] = useState<ActiveTimer[]>(() => {
    const saved = localStorageService.get<any[]>(STORAGE_KEYS.ACTIVE_TIMER);
    if (!saved) return [];
    return saved.map(parseTimerDates);
  });

  // Sincronizar timers con localStorage
  useEffect(() => {
    localStorageService.set(STORAGE_KEYS.ACTIVE_TIMER, timers);
  }, [timers]);

  // Actualizar elapsed time para timers activos
  useEffect(() => {
    const activeTimers = timers.filter((t) => !t.isPaused);
    if (activeTimers.length === 0) return;

    const interval = setInterval(() => {
      setTimers((prev) =>
        prev.map((timer) => {
          if (!timer.isPaused) {
            return { ...timer, updatedAt: new Date() };
          }
          return timer;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [timers]);

  const getTimer = useCallback(
    (clientId: string, projectId?: string) => {
      return timers.find(
        (t) => t.clientId === clientId && (projectId ? t.projectId === projectId : !t.projectId)
      );
    },
    [timers]
  );

  const pauseTimer = useCallback((timerId: string) => {
    setTimers((prev) =>
      prev.map((timer) => {
        if (timer.id === timerId && !timer.isPaused) {
          const now = new Date().getTime();
          const start = timer.startTime.getTime();
          const currentPaused = timer.pausedTime || 0;
          // Calcular el tiempo transcurrido desde el último startTime
          const elapsedSinceLastStart = now - start;
          // Sumar al tiempo pausado acumulado
          const newPausedTime = currentPaused + elapsedSinceLastStart;

          return {
            ...timer,
            isPaused: true,
            pausedTime: newPausedTime,
            updatedAt: new Date(),
          };
        }
        return timer;
      })
    );
  }, []);

  const resumeTimer = useCallback((timerId: string) => {
    setTimers((prev) =>
      prev.map((timer) => {
        if (timer.id === timerId && timer.isPaused) {
          // Al reanudar, resetear startTime pero mantener pausedTime
          // que ya contiene todo el tiempo acumulado
          return {
            ...timer,
            isPaused: false,
            startTime: new Date(),
            updatedAt: new Date(),
          };
        }
        return timer;
      })
    );
  }, []);

  const startTimer = useCallback(
    (clientId: string, projectId?: string, description?: string) => {
      // Verificar si ya existe un timer para este cliente/proyecto
      const existingTimer = getTimer(clientId, projectId);
      if (existingTimer && !existingTimer.isPaused) {
        return; // Ya hay un timer activo
      }

      // Si existe pero está pausado, reanudarlo
      if (existingTimer && existingTimer.isPaused) {
        resumeTimer(existingTimer.id);
        return;
      }

      // Crear nuevo timer
      const newTimer: ActiveTimer = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        clientId,
        projectId,
        startTime: new Date(),
        isPaused: false,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setTimers((prev) => [...prev, newTimer]);
    },
    [getTimer, resumeTimer]
  );

  const stopTimer = useCallback((timerId: string, saveRecord: boolean = false) => {
    setTimers((prev) => prev.filter((timer) => timer.id !== timerId));
    return saveRecord;
  }, []);

  const updateTimerDescription = useCallback((timerId: string, description: string) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === timerId
          ? { ...timer, description, updatedAt: new Date() }
          : timer
      )
    );
  }, []);

  const getElapsedTime = useCallback(
    (timerId: string): number => {
      const timer = timers.find((t) => t.id === timerId);
      if (!timer) return 0;

      if (timer.isPaused) {
        // Si está pausado, devolver el tiempo acumulado
        return timer.pausedTime || 0;
      }

      // Si está activo, calcular tiempo desde el último startTime
      // y sumar el tiempo pausado acumulado
      const now = new Date().getTime();
      const start = timer.startTime.getTime();
      const paused = timer.pausedTime || 0;
      const elapsedSinceResume = now - start;
      return paused + elapsedSinceResume;
    },
    [timers]
  );

  const value: TimerContextType = {
    timers,
    getTimer,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    updateTimerDescription,
    getElapsedTime,
  };

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
};
