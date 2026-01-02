// IndexedDB service - estructura base
// Se implementará cuando sea necesario para grandes volúmenes de datos

export const indexedDBService = {
  init: async (): Promise<void> => {
    // TODO: Implementar inicialización de IndexedDB
  },

  get: async <T>(_storeName: string, _key: string): Promise<T | null> => {
    // TODO: Implementar lectura desde IndexedDB
    return null;
  },

  set: async <T>(_storeName: string, _key: string, _value: T): Promise<void> => {
    // TODO: Implementar escritura en IndexedDB
  },

  getAll: async <T>(_storeName: string): Promise<T[]> => {
    // TODO: Implementar lectura de todos los registros
    return [];
  },

  delete: async (_storeName: string, _key: string): Promise<void> => {
    // TODO: Implementar eliminación
  },
};

