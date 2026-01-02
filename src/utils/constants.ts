export const STORAGE_KEYS = {
  CLIENTS: 'timer_clients',
  PROJECTS: 'timer_projects',
  RECORDS: 'timer_records',
  ACTIVE_TIMER: 'timer_active',
  SETTINGS: 'timer_settings',
  DATA_VERSION: 'timer_data_version',
} as const;

// Versión actual de la estructura de datos
// Incrementar este número cuando cambies la estructura de datos
export const CURRENT_DATA_VERSION = 1;

export const TIME_FORMATS = {
  DISPLAY: 'HH:mm:ss',
  DATE: 'yyyy-MM-dd',
  DATETIME: 'yyyy-MM-dd HH:mm',
} as const;

