import { useState, useCallback } from 'react';
import type { TimeRecord } from '../types';

export const useRecords = (initialRecords: TimeRecord[] = []) => {
  const [records, setRecords] = useState<TimeRecord[]>(initialRecords);

  const addRecord = useCallback((record: TimeRecord) => {
    setRecords((prev) => [...prev, record]);
  }, []);

  const updateRecord = useCallback((id: string, updates: Partial<TimeRecord>) => {
    setRecords((prev) =>
      prev.map((record) => (record.id === id ? { ...record, ...updates, updatedAt: new Date() } : record))
    );
  }, []);

  const deleteRecord = useCallback((id: string) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  }, []);

  const filterByClient = useCallback((clientId: string) => {
    return records.filter((record) => record.clientId === clientId);
  }, [records]);

  const filterByProject = useCallback((projectId: string) => {
    return records.filter((record) => record.projectId === projectId);
  }, [records]);

  const filterByDateRange = useCallback((startDate: Date, endDate: Date) => {
    return records.filter(
      (record) => record.startTime >= startDate && record.endTime <= endDate
    );
  }, [records]);

  return {
    records,
    addRecord,
    updateRecord,
    deleteRecord,
    filterByClient,
    filterByProject,
    filterByDateRange,
  };
};

