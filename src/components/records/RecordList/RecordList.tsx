import React from 'react';
import type { TimeRecord } from '../../../types';
import { RecordCard } from '../RecordCard';
import { Card } from '../../common/Card';

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
          <div className="text-center py-16 px-4">
            <h3 className="text-xl font-semibold text-white mb-2">No hay registros de tiempo</h3>
            <p className="text-gray-400">Los registros aparecerán aquí cuando guardes tiempo desde el cronómetro</p>
          </div>
        </Card>
      ) : (
        records.map((record) => (
          <RecordCard
            key={record.id}
            record={record}
            clientName={getClientName(record.clientId)}
            projectName={getProjectName(record.projectId)}
          />
        ))
      )}
    </div>
  );
};
