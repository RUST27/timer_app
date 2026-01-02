import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-dark-700/50 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-gray-400">
            <span className="font-body">© {currentYear} Timer Pro</span>
            <span className="hidden sm:inline text-gray-600">•</span>
            <span className="font-body">Sistema de registro de tiempo profesional</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="font-mono">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

