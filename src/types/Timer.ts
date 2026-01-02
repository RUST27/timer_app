export interface ActiveTimer {
  id: string;
  clientId: string;
  projectId?: string;
  startTime: Date;
  pausedTime?: number; // tiempo acumulado en pausa
  isPaused: boolean;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

