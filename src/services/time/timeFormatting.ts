import { format, formatDuration, intervalToDuration } from 'date-fns';

export const timeFormatting = {
  formatTime: (date: Date): string => {
    return format(date, 'HH:mm:ss');
  },

  formatDate: (date: Date): string => {
    return format(date, 'dd/MM/yyyy');
  },

  formatDateTime: (date: Date): string => {
    return format(date, 'dd/MM/yyyy HH:mm');
  },

  formatDurationFromMs: (ms: number): string => {
    const duration = intervalToDuration({ start: 0, end: ms });
    return formatDuration(duration, {
      format: ['hours', 'minutes', 'seconds'],
    });
  },
};

