import React from 'react';
import type { TimeRecord } from '../../../types';
import { RecordCard } from '../RecordCard';
import { Card } from '../../common/Card';
import { EmptyState } from '../../common/EmptyState';

interface RecordListProps {
  records: TimeRecord[];
  clients?: Array<{ id: string; name: string }>;
  projects?: Array<{ id: string; name: string }>;
}

export const RecordList: React.FC<RecordListProps> = ({
  records,
  clients = [],
  projects = [],
}) => {
  const getClientName = (clientId: string): string => {
    return clients.find((c) => c.id === clientId)?.name || clientId;
  };

  const getProjectName = (projectId?: string): string => {
    if (!projectId) return '';
    return projects.find((p) => p.id === projectId)?.name || '';
  };

  return (
    <div className="space-y-4">
      {records.length === 0 ? (
        <Card>
          <EmptyState
            icon={
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            title="No hay registros de tiempo"
            description="Los registros aparecerán aquí cuando guardes tiempo desde el cronómetro. Comienza un timer para empezar a registrar tu trabajo."
          />
        </Card>
      ) : (
        records.map((record, index) => (
          <div
            key={record.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <RecordCard
              record={record}
              clientName={getClientName(record.clientId)}
              projectName={getProjectName(record.projectId)}
            />
          </div>
        ))
      )}
    </div>
  );
};
