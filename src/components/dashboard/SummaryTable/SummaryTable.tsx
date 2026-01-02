import React from 'react';
import { Card } from '../../common/Card';
import { timeCalculations } from '../../../services/time/timeCalculations';

interface SummaryTableProps {
  data: Array<{
    id: string;
    name: string;
    totalTime: number;
  }>;
  title: string;
}

export const SummaryTable: React.FC<SummaryTableProps> = ({ data, title }) => {
  return (
    <Card title={title}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-700">
              <th className="text-left py-3 px-4 font-semibold text-gray-300">Nombre</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-300">Tiempo Total</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center py-8 text-gray-400">
                  No hay datos disponibles
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b border-gray-700 hover:bg-gray-700 transition-colors ${
                    index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-800/50'
                  }`}
                >
                  <td className="py-3 px-4 font-medium text-white">{item.name}</td>
                  <td className="py-3 px-4 text-right font-mono font-semibold text-gray-300">
                    {timeCalculations.formatDuration(item.totalTime)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
