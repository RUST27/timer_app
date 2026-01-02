import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { TimeRecord } from '../types';
import { localStorageService } from '../services/storage/localStorage';
import { STORAGE_KEYS } from '../utils/constants';
import { calculateDuration } from '../utils/dateHelpers';

interface RecordContextType {
  records: TimeRecord[];
  addRecord: (record: Omit<TimeRecord, 'id' | 'createdAt' | 'updatedAt' | 'duration'> & { duration?: number }) => void;
  updateRecord: (id: string, updates: Partial<TimeRecord>) => void;
  deleteRecord: (id: string) => void;
  getRecordById: (id: string) => TimeRecord | undefined;
  getRecordsByClientId: (clientId: string) => TimeRecord[];
  getRecordsByProjectId: (projectId: string) => TimeRecord[];
  getRecordsByDateRange: (startDate: Date, endDate: Date) => TimeRecord[];
}

// Helper para convertir fechas desde JSON
const parseRecordDates = (record: any): TimeRecord => {
  return {
    ...record,
    startTime: new Date(record.startTime),
    endTime: new Date(record.endTime),
    createdAt: new Date(record.createdAt),
    updatedAt: new Date(record.updatedAt),
  };
};

const RecordContext = createContext<RecordContextType | undefined>(undefined);

export const RecordProvider = ({ children }: { children: ReactNode }) => {
  const [records, setRecords] = useState<TimeRecord[]>(() => {
    const saved = localStorageService.get<any[]>(STORAGE_KEYS.RECORDS);
    if (!saved) return [];
    // Convertir strings de fecha a objetos Date
    return saved.map(parseRecordDates);
  });

  // Sincronizar con localStorage cuando cambien los registros
  useEffect(() => {
    localStorageService.set(STORAGE_KEYS.RECORDS, records);
  }, [records]);

  const addRecord = useCallback(
    (recordData: Omit<TimeRecord, 'id' | 'createdAt' | 'updatedAt' | 'duration'> & { duration?: number }) => {
      const duration = recordData.duration ?? calculateDuration(recordData.startTime, recordData.endTime);
      const newRecord: TimeRecord = {
        ...recordData,
        duration,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setRecords((prev) => [...prev, newRecord].sort((a, b) => b.startTime.getTime() - a.startTime.getTime()));
    },
    []
  );

  const updateRecord = useCallback((id: string, updates: Partial<TimeRecord>) => {
    setRecords((prev) =>
      prev.map((record) => {
        if (record.id === id) {
          const updated = { ...record, ...updates, updatedAt: new Date() };
          // Recalcular duración si se actualizaron las fechas
          if (updates.startTime || updates.endTime) {
            updated.duration = calculateDuration(updated.startTime, updated.endTime);
          }
          return updated;
        }
        return record;
      })
    );
  }, []);

  const deleteRecord = useCallback((id: string) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  }, []);

  const getRecordById = useCallback(
    (id: string) => {
      return records.find((record) => record.id === id);
    },
    [records]
  );

  const getRecordsByClientId = useCallback(
    (clientId: string) => {
      return records.filter((record) => record.clientId === clientId);
    },
    [records]
  );

  const getRecordsByProjectId = useCallback(
    (projectId: string) => {
      return records.filter((record) => record.projectId === projectId);
    },
    [records]
  );

  const getRecordsByDateRange = useCallback(
    (startDate: Date, endDate: Date) => {
      return records.filter(
        (record) =>
          record.startTime >= startDate &&
          record.endTime <= endDate
      );
    },
    [records]
  );

  const value: RecordContextType = {
    records,
    addRecord,
    updateRecord,
    deleteRecord,
    getRecordById,
    getRecordsByClientId,
    getRecordsByProjectId,
    getRecordsByDateRange,
  };

  return <RecordContext.Provider value={value}>{children}</RecordContext.Provider>;
};

export const useRecordContext = () => {
  const context = useContext(RecordContext);
  if (context === undefined) {
    throw new Error('useRecordContext must be used within a RecordProvider');
  }
  return context;
};

