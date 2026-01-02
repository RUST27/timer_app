import React from 'react';
import { Card } from '../../common/Card';

interface TimeChartProps {
  data: Array<{ label: string; value: number }>;
}

export const TimeChart: React.FC<TimeChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  
  return (
    <Card title="Distribución de Tiempo">
      <div className="space-y-4">
        {data.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No hay datos para mostrar</p>
        ) : (
          data.map((item, index) => {
            const percentage = (item.value / maxValue) * 100;
            const colors = [
              'bg-gradient-to-r from-gray-500 to-gray-600',
              'bg-gradient-to-r from-gray-400 to-gray-500',
              'bg-gradient-to-r from-gray-600 to-gray-700',
              'bg-gradient-to-r from-gray-500 to-gray-700',
              'bg-gradient-to-r from-gray-400 to-gray-600',
            ];
            const color = colors[index % colors.length];
            
            return (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-white truncate flex-1">
                    {item.label}
                  </span>
                  <span className="text-sm font-mono font-bold text-gray-300 ml-4">
                    {((item.value / 3600000) * 100 / (maxValue / 3600000)).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full ${color} rounded-full transition-all duration-500 shadow-sm`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};
