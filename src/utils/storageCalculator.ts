/**
 * Utilidad para calcular el tamaño aproximado de los datos almacenados
 */

interface StorageSize {
  clients: number;
  projects: number;
  records: number;
  timers: number;
  total: number;
}

/**
 * Calcula el tamaño aproximado en bytes de un objeto cuando se serializa a JSON
 */
export const calculateObjectSize = (obj: any): number => {
  return new Blob([JSON.stringify(obj)]).size;
};

/**
 * Calcula el tamaño aproximado de los datos almacenados
 */
export const calculateStorageSize = (): StorageSize => {
  const clients = localStorage.getItem('timer_clients');
  const projects = localStorage.getItem('timer_projects');
  const records = localStorage.getItem('timer_records');
  const timers = localStorage.getItem('timer_active');
  const settings = localStorage.getItem('timer_settings');
  const version = localStorage.getItem('timer_data_version');

  const clientsSize = clients ? calculateObjectSize(clients) : 0;
  const projectsSize = projects ? calculateObjectSize(projects) : 0;
  const recordsSize = records ? calculateObjectSize(records) : 0;
  const timersSize = timers ? calculateObjectSize(timers) : 0;
  const settingsSize = settings ? calculateObjectSize(settings) : 0;
  const versionSize = version ? calculateObjectSize(version) : 0;

  const total = clientsSize + projectsSize + recordsSize + timersSize + settingsSize + versionSize;

  return {
    clients: clientsSize,
    projects: projectsSize,
    records: recordsSize,
    timers: timersSize,
    total,
  };
};

/**
 * Formatea bytes a formato legible
 */
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Estima cuántos registros se pueden almacenar antes de alcanzar el límite
 */
export const estimateCapacity = (currentSize: number, limitMB: number = 5): {
  remainingMB: number;
  estimatedRecords: number;
  estimatedYears: number;
} => {
  const limitBytes = limitMB * 1024 * 1024;
  const remainingBytes = limitBytes - currentSize;
  const remainingMB = remainingBytes / (1024 * 1024);

  // Un registro promedio ocupa ~350 bytes
  const avgRecordSize = 350;
  const estimatedRecords = Math.floor(remainingBytes / avgRecordSize);

  // Asumiendo 8 horas/día, 5 días/semana, 50 semanas/año = 2,000 registros/año
  const recordsPerYear = 2000;
  const estimatedYears = estimatedRecords / recordsPerYear;

  return {
    remainingMB: Math.max(0, remainingMB),
    estimatedRecords,
    estimatedYears: Math.max(0, estimatedYears),
  };
};

