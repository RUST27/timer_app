import React from 'react';
import type { Client } from '../../../types';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';

interface ClientCardProps {
  client: Client;
  onEdit?: (client: Client) => void;
  onDelete?: (id: string) => void;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client, onEdit, onDelete }) => {
  return (
    <Card className="group hover:scale-105 transition-transform duration-200">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-5 h-5 rounded-full shadow-md flex-shrink-0"
            style={{ backgroundColor: client.color || '#6366f1' }}
          />
          <h3 className="text-xl font-bold text-slate-800 truncate flex-1">{client.name}</h3>
        </div>
        {client.description && (
          <p className="text-sm text-slate-600 mb-4 line-clamp-2">{client.description}</p>
        )}
        <div className="flex gap-2 pt-4 border-t border-slate-200">
          {onEdit && (
            <Button
              size="small"
              variant="secondary"
              onClick={() => onEdit(client)}
              className="flex-1"
            >
              Editar
            </Button>
          )}
          {onDelete && (
            <Button
              size="small"
              variant="danger"
              onClick={() => onDelete(client.id)}
              className="flex-1"
            >
              Eliminar
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
