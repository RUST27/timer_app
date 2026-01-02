export interface TimeRecord {
  id: string;
  clientId: string;
  projectId?: string;
  startTime: Date;
  endTime: Date;
  duration: number; // en milisegundos
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

