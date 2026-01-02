import React, { useState } from 'react';
import type { Client } from '../../../types';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';

interface ClientFormProps {
  client?: Client;
  onSubmit: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel?: () => void;
}

export const ClientForm: React.FC<ClientFormProps> = ({ client, onSubmit, onCancel }) => {
  const [name, setName] = useState(client?.name || '');
  const [description, setDescription] = useState(client?.description || '');
  const [color, setColor] = useState(client?.color || '#6366f1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, color });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="Nombre del cliente"
      />
      <Input
        label="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción opcional"
      />
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Color de identificación
        </label>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-16 h-16 rounded-lg border-2 border-slate-300 cursor-pointer"
          />
          <div
            className="w-12 h-12 rounded-lg shadow-md"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          {client ? 'Actualizar' : 'Crear'}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
};
