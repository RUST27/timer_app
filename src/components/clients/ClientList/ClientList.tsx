import React from 'react';
import type { Client } from '../../../types';
import { ClientCard } from '../ClientCard';
import { EmptyState } from '../../common/EmptyState';
import { Card } from '../../common/Card';

interface ClientListProps {
  clients: Client[];
  onEdit?: (client: Client) => void;
  onDelete?: (id: string) => void;
}

export const ClientList: React.FC<ClientListProps> = ({ clients, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {clients.length === 0 ? (
        <div className="col-span-full">
          <Card>
            <EmptyState
              icon={
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              title="No hay clientes registrados"
              description="Comienza agregando tu primer cliente para organizar mejor tu tiempo de trabajo"
            />
          </Card>
        </div>
      ) : (
        clients.map((client, index) => (
          <div
            key={client.id}
            className="animate-scale-in"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <ClientCard
              client={client}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))
      )}
    </div>
  );
};
