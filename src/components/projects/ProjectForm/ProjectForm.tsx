import React, { useState } from 'react';
import type { Project } from '../../../types';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';

interface ProjectFormProps {
  project?: Project;
  clients: Array<{ id: string; name: string }>;
  onSubmit: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel?: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  clients,
  onSubmit,
  onCancel,
}) => {
  const [clientId, setClientId] = useState(project?.clientId || '');
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');
  const [category, setCategory] = useState(project?.category || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ clientId, name, description, category });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Cliente *
        </label>
        <select
          className="input"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          required
        >
          <option value="">Seleccionar cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>
      <Input
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="Nombre del proyecto"
      />
      <Input
        label="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción opcional"
      />
      <Input
        label="Categoría"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Ej: Desarrollo, Diseño, Consultoría..."
      />
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          {project ? 'Actualizar' : 'Crear'}
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
