export const timeCalculations = {
  millisecondsToHours: (ms: number): number => {
    return ms / (1000 * 60 * 60);
  },

  millisecondsToMinutes: (ms: number): number => {
    return ms / (1000 * 60);
  },

  millisecondsToSeconds: (ms: number): number => {
    return ms / 1000;
  },

  formatDuration: (ms: number): string => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  },

  getTotalTimeByClient: (records: Array<{ clientId: string; duration: number }>, clientId: string): number => {
    return records
      .filter((record) => record.clientId === clientId)
      .reduce((total, record) => total + record.duration, 0);
  },

  getTotalTimeByProject: (records: Array<{ projectId?: string; duration: number }>, projectId: string): number => {
    return records
      .filter((record) => record.projectId === projectId)
      .reduce((total, record) => total + record.duration, 0);
  },
};

