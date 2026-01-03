import { useMemo } from 'react';
import { useRecordContext } from '../contexts/RecordContext';
import { useClientContext } from '../contexts/ClientContext';
import { StatsCards } from '../components/dashboard/StatsCards';
import { SummaryTable } from '../components/dashboard/SummaryTable';
import { TimeChart } from '../components/dashboard/TimeChart';
import { timeCalculations } from '../services/time/timeCalculations';

export const Dashboard: React.FC = () => {
  const { records } = useRecordContext();
  const { clients } = useClientContext();

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfDay);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const totalToday = useMemo(() => {
    return records
      .filter((record) => record.startTime >= startOfDay)
      .reduce((total, record) => total + record.duration, 0);
  }, [records, startOfDay]);

  const totalWeek = useMemo(() => {
    return records
      .filter((record) => record.startTime >= startOfWeek)
      .reduce((total, record) => total + record.duration, 0);
  }, [records, startOfWeek]);

  const totalMonth = useMemo(() => {
    return records
      .filter((record) => record.startTime >= startOfMonth)
      .reduce((total, record) => total + record.duration, 0);
  }, [records, startOfMonth]);

  const timeByClient = useMemo(() => {
    return clients.map((client) => {
      const totalTime = timeCalculations.getTotalTimeByClient(records, client.id);
      return {
        id: client.id,
        name: client.name,
        totalTime,
      };
    }).filter((item) => item.totalTime > 0)
      .sort((a, b) => b.totalTime - a.totalTime);
  }, [clients, records]);


  return (
    <div className="min-h-screen p-6 sm:p-8 lg:p-10 animate-fade-in">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-10 animate-slide-up">
          <div className="mb-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center border border-gray-700 transition-transform duration-300 hover:scale-110">
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-clip-text text-transparent mb-2 tracking-tight">
                Dashboard
              </h1>
              <p className="text-gray-400 text-lg font-body">Resumen detallado de tu tiempo trabajado</p>
            </div>
          </div>
        </div>

        <div className="animate-slide-up-delay">
          <StatsCards totalToday={totalToday} totalWeek={totalWeek} totalMonth={totalMonth} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 animate-fade-in-slow">
          <TimeChart data={timeByClient.map(item => ({ label: item.name, value: item.totalTime }))} />
          <SummaryTable data={timeByClient} title="Tiempo por Cliente" />
        </div>

        
      </div>
    </div>
  );
};
