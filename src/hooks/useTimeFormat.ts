import { useMemo } from 'react';
import { timeCalculations } from '../services/time/timeCalculations';

export const useTimeFormat = (milliseconds: number) => {
  const formatted = useMemo(() => {
    return timeCalculations.formatDuration(milliseconds);
  }, [milliseconds]);

  const hours = useMemo(() => {
    return timeCalculations.millisecondsToHours(milliseconds);
  }, [milliseconds]);

  const minutes = useMemo(() => {
    return timeCalculations.millisecondsToMinutes(milliseconds);
  }, [milliseconds]);

  return {
    formatted,
    hours,
    minutes,
    milliseconds,
  };
};

