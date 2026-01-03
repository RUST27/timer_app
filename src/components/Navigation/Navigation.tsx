import React from 'react';
import { useTimerContext } from '../../contexts/TimerContext';
import { Badge } from '../common/Badge';
import { Tooltip } from '../common/Tooltip';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

// Logo SVG para Timer Pro
const TimerProLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2.5" className="text-primary-500"/>
    <circle cx="20" cy="20" r="2" fill="currentColor" className="text-primary-500"/>
    <line x1="20" y1="20" x2="20" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary-500"/>
    <line x1="20" y1="20" x2="26" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-cyan-400"/>
    <path d="M8 20 C8 13.3726 13.3726 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-cyan-400 opacity-60"/>
  </svg>
);

// Iconos SVG formales
const DashboardIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const TimerIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClientsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ProjectsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const RecordsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const { timers } = useTimerContext();
  const activeTimersCount = timers.filter(t => !t.isPaused).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { 
      id: 'timer', 
      label: 'Cronómetro', 
      icon: TimerIcon,
      badge: activeTimersCount > 0 ? activeTimersCount : undefined,
    },
    { id: 'clients', label: 'Clientes', icon: ClientsIcon },
    { id: 'projects', label: 'Proyectos', icon: ProjectsIcon },
    { id: 'records', label: 'Registros', icon: RecordsIcon },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-transform duration-300 hover:scale-110">
              <TimerProLogo className="w-full h-full" />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-gray-100">
              Timer Pro
            </h2>
          </div>
          <ul className="flex flex-wrap justify-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <Tooltip content={item.label}>
                    <button
                      className={`px-4 py-2 rounded-lg font-body font-medium text-sm transition-all duration-200 
                        flex items-center gap-2 relative
                        ${
                          isActive
                            ? 'bg-gray-800 text-white border-b-2 border-cyan-400'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                      onClick={() => onNavigate(item.id)}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      <span className="hidden sm:inline">{item.label}</span>
                      {item.badge && item.badge > 0 && (
                        <Badge variant="info" size="sm" className="ml-1">
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  </Tooltip>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};
