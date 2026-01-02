import { useState } from 'react';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';

interface RecordFiltersProps {
  clients: Array<{ id: string; name: string }>;
  onFilter: (filters: {
    clientId?: string;
    startDate?: string;
    endDate?: string;
  }) => void;
  onClear: () => void;
}

export const RecordFilters: React.FC<RecordFiltersProps> = ({ clients, onFilter, onClear }) => {
  const [clientId, setClientId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    onFilter({
      clientId: clientId || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
  };

  const handleClear = () => {
    setClientId('');
    setStartDate('');
    setEndDate('');
    onClear();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 border border-slate-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Cliente
          </label>
          <select
            className="input"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          >
            <option value="">Todos los clientes</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Fecha inicio"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          label="Fecha fin"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <div className="flex gap-2">
          <Button onClick={handleFilter} variant="primary" size="small" className="flex-1">
            🔍 Filtrar
          </Button>
          <Button onClick={handleClear} variant="secondary" size="small" className="flex-1">
            🗑️ Limpiar
          </Button>
        </div>
      </div>
    </div>
  );
};
