import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className="px-6 py-5 border-b border-gray-700">
          <h3 className="text-lg font-display font-semibold text-gray-200 tracking-tight">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};
