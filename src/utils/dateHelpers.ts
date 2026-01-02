import { format, parse, isValid } from 'date-fns';

export const formatTime = (date: Date): string => {
  return format(date, 'HH:mm:ss');
};

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const formatDateTime = (date: Date): string => {
  return format(date, 'yyyy-MM-dd HH:mm');
};

export const parseTime = (timeString: string): Date | null => {
  try {
    const parsed = parse(timeString, 'HH:mm', new Date());
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const calculateDuration = (start: Date, end: Date): number => {
  return end.getTime() - start.getTime();
};

