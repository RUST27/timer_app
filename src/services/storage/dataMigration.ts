import { localStorageService } from './localStorage';
import { STORAGE_KEYS, CURRENT_DATA_VERSION } from '../../utils/constants';

/**
 * Servicio de migración de datos
 * Garantiza que los datos antiguos se migren correctamente cuando cambie la estructura
 */
export const dataMigrationService = {
  /**
   * Verifica y migra los datos si es necesario
   */
  checkAndMigrate: (): void => {
    const storedVersion = localStorageService.get<number>(STORAGE_KEYS.DATA_VERSION) || 0;

    if (storedVersion < CURRENT_DATA_VERSION) {
      console.log(`Migrando datos de versión ${storedVersion} a ${CURRENT_DATA_VERSION}`);
      dataMigrationService.migrateData(storedVersion, CURRENT_DATA_VERSION);
      localStorageService.set(STORAGE_KEYS.DATA_VERSION, CURRENT_DATA_VERSION);
    }
  },

  /**
   * Ejecuta las migraciones necesarias
   */
  migrateData: (fromVersion: number, toVersion: number): void => {
    // Ejemplo de migración: si cambias la estructura de datos en el futuro,
    // puedes agregar migraciones aquí
    
    // Migración de versión 0 a 1 (primera versión con versionado)
    if (fromVersion < 1 && toVersion >= 1) {
      // Aquí puedes transformar datos antiguos a la nueva estructura
      // Por ejemplo, si agregaste un nuevo campo requerido:
      // const clients = localStorageService.get(STORAGE_KEYS.CLIENTS);
      // if (clients) {
      //   const migratedClients = clients.map(client => ({
      //     ...client,
      //     nuevoCampo: valorPorDefecto
      //   }));
      //   localStorageService.set(STORAGE_KEYS.CLIENTS, migratedClients);
      // }
      console.log('Migración v0 -> v1: Sin cambios necesarios');
    }

    // Agregar más migraciones aquí cuando incrementes CURRENT_DATA_VERSION
    // Ejemplo para futuras versiones:
    // if (fromVersion < 2 && toVersion >= 2) {
    //   // Migración v1 -> v2
    // }
  },

  /**
   * Obtiene la versión actual de los datos almacenados
   */
  getStoredVersion: (): number => {
    return localStorageService.get<number>(STORAGE_KEYS.DATA_VERSION) || 0;
  },
};

