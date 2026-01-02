import type { TimeRecord } from '../../types';
import { timeFormatting } from '../time/timeFormatting';
import { timeCalculations } from '../time/timeCalculations';

interface ExportOptions {
  records: TimeRecord[];
  clients: Array<{ id: string; name: string }>;
  projects: Array<{ id: string; name: string }>;
  filename?: string;
}

export const csvExport = {
  exportRecords: ({ records, clients, projects, filename = 'time-records.csv' }: ExportOptions): void => {
    const headers = ['Fecha', 'Cliente', 'Proyecto', 'Inicio', 'Fin', 'Duración (HH:MM:SS)', 'Descripción'];
    
    const getClientName = (clientId: string): string => {
      return clients.find((c) => c.id === clientId)?.name || clientId;
    };

    const getProjectName = (projectId?: string): string => {
      if (!projectId) return '';
      return projects.find((p) => p.id === projectId)?.name || projectId;
    };

    const rows = records.map((record) => [
      timeFormatting.formatDate(record.startTime),
      getClientName(record.clientId),
      getProjectName(record.projectId),
      timeFormatting.formatTime(record.startTime),
      timeFormatting.formatTime(record.endTime),
      timeCalculations.formatDuration(record.duration),
      record.description || '',
    ]);

    // Crear contenido CSV
    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n');

    // Crear blob y descargar
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};

