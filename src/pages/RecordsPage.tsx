import { useState, useMemo } from 'react';
import { useRecordContext } from '../contexts/RecordContext';
import { useClientContext } from '../contexts/ClientContext';
import { useProjectContext } from '../contexts/ProjectContext';
import { RecordList } from '../components/records/RecordList';
import { RecordFilters } from '../components/records/RecordFilters';
import { Button } from '../components/common/Button';
import { csvExport } from '../services/export/csvExport';

export const RecordsPage: React.FC = () => {
  const { records } = useRecordContext();
  const { clients } = useClientContext();
  const { projects } = useProjectContext();
  const [filters, setFilters] = useState<{
    clientId?: string;
    startDate?: string;
    endDate?: string;
  }>({});

  const filteredRecords = useMemo(() => {
    let filtered = [...records];

    if (filters.clientId) {
      filtered = filtered.filter((r) => r.clientId === filters.clientId);
    }

    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      filtered = filtered.filter((r) => r.startTime >= startDate);
    }

    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter((r) => r.endTime <= endDate);
    }

    return filtered;
  }, [records, filters]);


  const handleFilter = (newFilters: {
    clientId?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleExport = () => {
    const filename = `time-records-${new Date().toISOString().split('T')[0]}.csv`;
    csvExport.exportRecords({
      records: filteredRecords,
      clients: clients.map((c) => ({ id: c.id, name: c.name })),
      projects: projects.map((p) => ({ id: p.id, name: p.name })),
      filename,
    });
  };

  return (
    <div className="min-h-screen p-6 sm:p-8 lg:p-10">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center border border-gray-700">
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-clip-text text-transparent mb-2 tracking-tight">
                Registros de Tiempo
              </h1>
              <p className="text-gray-400 text-lg font-body">Historial completo de tu tiempo trabajado</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button onClick={handleExport} variant="secondary" className="w-full sm:w-auto shadow-elegant">
              Exportar CSV
            </Button>
          </div>
        </div>

        <RecordFilters
          clients={clients.map((c) => ({ id: c.id, name: c.name }))}
          onFilter={handleFilter}
          onClear={handleClearFilters}
        />

        <RecordList
          records={filteredRecords}
          clients={clients.map((c) => ({ id: c.id, name: c.name }))}
          projects={projects.map((p) => ({ id: p.id, name: p.name }))}
        />
      </div>
    </div>
  );
};
