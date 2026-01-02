import React from 'react';
import type { Client } from '../../../types';
import { ClientCard } from '../ClientCard';

interface ClientListProps {
  clients: Client[];
  onEdit?: (client: Client) => void;
  onDelete?: (id: string) => void;
}

export const ClientList: React.FC<ClientListProps> = ({ clients, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {clients.length === 0 ? (
        <div className="col-span-full text-center py-16 px-4">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No hay clientes registrados</h3>
          <p className="text-slate-500">Comienza agregando tu primer cliente</p>
        </div>
      ) : (
        clients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};
