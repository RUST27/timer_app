import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'secondary',
  size = 'md',
  className = '' 
}) => {
  const variantClasses = {
    primary: 'bg-primary-500/20 text-primary-300 border-primary-500/30',
    success: 'bg-success-500/20 text-success-300 border-success-500/30',
    danger: 'bg-danger-500/20 text-danger-300 border-danger-500/30',
    warning: 'bg-warning-500/20 text-warning-300 border-warning-500/30',
    info: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    secondary: 'bg-gray-700/50 text-gray-300 border-gray-600/50',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
};

