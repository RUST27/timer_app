import React from 'react';
import { Button } from '../Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="text-center py-16 px-4">
      <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center text-gray-500">
        {icon}
      </div>
      <h3 className="text-xl font-display font-semibold text-gray-200 mb-2">{title}</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <Button onClick={action.onClick} variant="primary" size="medium">
          {action.label}
        </Button>
      )}
    </div>
  );
};

