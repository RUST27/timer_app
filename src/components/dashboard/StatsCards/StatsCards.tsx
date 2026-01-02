import React from 'react';
import { Card } from '../../common/Card';
import { timeCalculations } from '../../../services/time/timeCalculations';

interface StatsCardsProps {
  totalToday: number;
  totalWeek: number;
  totalMonth: number;
}

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const StatsCards: React.FC<StatsCardsProps> = ({ totalToday, totalWeek, totalMonth }) => {
  const stats = [
    {
      label: 'Hoy',
      value: totalToday,
      icon: CalendarIcon,
    },
    {
      label: 'Esta Semana',
      value: totalWeek,
      icon: ClockIcon,
    },
    {
      label: 'Este Mes',
      value: totalMonth,
      icon: CalendarIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="overflow-hidden shadow-elegant-lg hover:shadow-elegant-lg transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gray-300" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400 font-body font-medium mb-1">{stat.label}</p>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-1 font-mono tracking-tight text-white">
                    {timeCalculations.formatDuration(stat.value)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
