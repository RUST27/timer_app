import { useState } from 'react';
import type { TimeRecord } from '../../../types';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';

interface RecordFormProps {
  record?: TimeRecord;
  clients: Array<{ id: string; name: string }>;
  projects: Array<{ id: string; name: string; clientId: string }>;
  onSubmit: (record: Omit<TimeRecord, 'id' | 'createdAt' | 'updatedAt' | 'duration'> & { duration?: number }) => void;
  onCancel?: () => void;
}

export const RecordForm: React.FC<RecordFormProps> = ({
  record,
  clients,
  projects,
  onSubmit,
  onCancel,
}) => {
  const [clientId, setClientId] = useState(record?.clientId || '');
  const [projectId, setProjectId] = useState(record?.projectId || '');
  const [startTime, setStartTime] = useState(
    record ? new Date(record.startTime).toISOString().slice(0, 16) : ''
  );
  const [endTime, setEndTime] = useState(
    record ? new Date(record.endTime).toISOString().slice(0, 16) : ''
  );
  const [description, setDescription] = useState(record?.description || '');

  const filteredProjects = projects.filter((p) => p.clientId === clientId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const start = new Date(startTime);
    const end = new Date(endTime);
    onSubmit({
      clientId,
      projectId: projectId || undefined,
      startTime: start,
      endTime: end,
      description: description || undefined,
    });
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
          onChange={(e) => {
            setClientId(e.target.value);
            setProjectId('');
          }}
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
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Proyecto (opcional)
        </label>
        <select
          className="input disabled:opacity-50 disabled:cursor-not-allowed"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          disabled={!clientId}
        >
          <option value="">Sin proyecto</option>
          {filteredProjects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      <Input
        label="Fecha y hora de inicio"
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />
      <Input
        label="Fecha y hora de fin"
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
      />
      <Input
        label="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción de la tarea realizada..."
      />
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          {record ? 'Actualizar' : 'Crear'}
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
