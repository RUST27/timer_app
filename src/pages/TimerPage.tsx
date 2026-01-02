import { useState, useMemo } from 'react';
import { useTimerContext } from '../contexts/TimerContext';
import { useClientContext } from '../contexts/ClientContext';
import { useProjectContext } from '../contexts/ProjectContext';
import { useRecordContext } from '../contexts/RecordContext';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { timeCalculations } from '../services/time/timeCalculations';

export const TimerPage: React.FC = () => {
  const { clients } = useClientContext();
  const { projects, getProjectsByClientId } = useProjectContext();
  const { addRecord } = useRecordContext();
  const {
    timers,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    getElapsedTime,
  } = useTimerContext();

  const [selectedClientId, setSelectedClientId] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [showNewTimerModal, setShowNewTimerModal] = useState(false);
  const [showStopModal, setShowStopModal] = useState<{ timerId: string; elapsed: number } | null>(null);
  const [description, setDescription] = useState('');

  const activeTimers = useMemo(() => timers.filter((t) => !t.isPaused), [timers]);
  const pausedTimers = useMemo(() => timers.filter((t) => t.isPaused), [timers]);

  const availableProjects = selectedClientId
    ? getProjectsByClientId(selectedClientId)
    : [];

  const getClientName = (clientId: string) => {
    return clients.find((c) => c.id === clientId)?.name || clientId;
  };

  const getProjectName = (projectId?: string) => {
    if (!projectId) return null;
    return projects.find((p) => p.id === projectId)?.name || projectId;
  };

  const handleStartNew = () => {
    if (selectedClientId) {
      startTimer(selectedClientId, selectedProjectId || undefined, description);
      setSelectedClientId('');
      setSelectedProjectId('');
      setDescription('');
      setShowNewTimerModal(false);
    }
  };

  const handlePause = (timerId: string) => {
    pauseTimer(timerId);
  };

  const handleResume = (timerId: string) => {
    resumeTimer(timerId);
  };

  const handleStop = (timerId: string) => {
    const elapsed = getElapsedTime(timerId);
    setShowStopModal({ timerId, elapsed });
  };

  const handleConfirmStop = (keepTimer: boolean = false) => {
    if (!showStopModal) return;

    const timer = timers.find((t) => t.id === showStopModal.timerId);
    if (timer) {
      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - showStopModal.elapsed);

      addRecord({
        clientId: timer.clientId,
        projectId: timer.projectId,
        startTime,
        endTime,
        description: timer.description || description || undefined,
      });

      if (keepTimer) {
        pauseTimer(showStopModal.timerId);
      } else {
        stopTimer(showStopModal.timerId);
      }

      setShowStopModal(null);
      setDescription('');
    }
  };

  const TimerCard = ({ timer }: { timer: typeof timers[0] }) => {
    const elapsed = getElapsedTime(timer.id);
    const clientName = getClientName(timer.clientId);
    const projectName = getProjectName(timer.projectId);
    const client = clients.find((c) => c.id === timer.clientId);

    return (
      <Card className="overflow-visible hover:shadow-elegant-lg transition-all duration-300 border-2 border-gray-700">
        <div className={`p-6 border-b-2 ${
          timer.isPaused 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-gray-800 border-gray-700'
        }`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div
                className="w-5 h-5 rounded-full shadow-elegant flex-shrink-0 border-2 border-gray-600"
                style={{ backgroundColor: client?.color || '#6b7280' }}
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl font-display font-bold text-white truncate">{clientName}</h3>
                {projectName && (
                  <p className="text-sm text-gray-400 truncate font-body">{projectName}</p>
                )}
              </div>
            </div>
            <div className={`px-4 py-2 rounded-xl text-xs font-display font-semibold whitespace-nowrap ${
              timer.isPaused
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-700 text-white'
            }`}>
              {timer.isPaused ? 'Pausado' : 'Activo'}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10 text-center bg-gray-800 min-h-[120px] flex items-center justify-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold font-mono bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent tracking-tight whitespace-nowrap">
            {timeCalculations.formatDuration(elapsed)}
          </div>
        </div>

        {timer.description && (
          <div className="px-6 py-4 border-t border-gray-700 bg-gray-800">
            <p className="text-sm text-gray-400 italic font-body">"{timer.description}"</p>
          </div>
        )}

        <div className="p-6 flex flex-col sm:flex-row gap-3 bg-gray-800">
          {timer.isPaused ? (
            <>
              <Button
                onClick={() => handleResume(timer.id)}
                variant="success"
                size="small"
                className="flex-1 shadow-elegant"
              >
                Reanudar
              </Button>
              <Button
                onClick={() => handleStop(timer.id)}
                variant="danger"
                size="small"
                className="flex-1 shadow-elegant"
              >
                Detener
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => handlePause(timer.id)}
                variant="secondary"
                size="small"
                className="flex-1 shadow-elegant"
              >
                Pausar
              </Button>
              <Button
                onClick={() => handleStop(timer.id)}
                variant="danger"
                size="small"
                className="flex-1 shadow-elegant"
              >
                Detener
              </Button>
            </>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen p-6 sm:p-8 lg:p-10">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center border border-gray-700">
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-clip-text text-transparent mb-2 tracking-tight">
                  Gestión de Tiempo
                </h1>
                <p className="text-gray-400 text-lg font-body">Administra múltiples timers por cliente y proyecto</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowNewTimerModal(true)} 
              variant="primary" 
              size="large"
              className="w-full sm:w-auto shadow-elegant-lg"
            >
              + Nuevo Timer
            </Button>
          </div>
        </div>

        {activeTimers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-200 mb-8">
              Timers Activos <span className="text-lg font-normal text-gray-400 font-body">({activeTimers.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {activeTimers.map((timer) => (
                <TimerCard key={timer.id} timer={timer} />
              ))}
            </div>
          </section>
        )}

        {pausedTimers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-200 mb-8">
              Timers Pausados <span className="text-lg font-normal text-gray-400 font-body">({pausedTimers.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {pausedTimers.map((timer) => (
                <TimerCard key={timer.id} timer={timer} />
              ))}
            </div>
          </section>
        )}

        {timers.length === 0 && (
          <div className="text-center py-24 px-4">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">No hay timers activos</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto font-body">
              Comienza un nuevo timer para empezar a registrar tu tiempo de trabajo
            </p>
            <Button 
              onClick={() => setShowNewTimerModal(true)} 
              variant="primary" 
              size="large"
              className="shadow-elegant-lg"
            >
              Crear Primer Timer
            </Button>
          </div>
        )}

        {/* Modal para nuevo timer */}
        <Modal
          isOpen={showNewTimerModal}
          onClose={() => {
            setShowNewTimerModal(false);
            setSelectedClientId('');
            setSelectedProjectId('');
            setDescription('');
          }}
          title="Nuevo Timer"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Cliente *
              </label>
              <select
                className="input"
                value={selectedClientId}
                onChange={(e) => {
                  setSelectedClientId(e.target.value);
                  setSelectedProjectId('');
                }}
              >
                <option value="">Seleccionar cliente</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedClientId && availableProjects.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Proyecto (opcional)
                </label>
                <select
                  className="input"
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                >
                  <option value="">Sin proyecto</option>
                  {availableProjects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <Input
              label="Descripción (opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: Desarrollo de feature, Reunión con cliente..."
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                onClick={handleStartNew} 
                variant="primary" 
                disabled={!selectedClientId}
                className="flex-1"
              >
                Iniciar Timer
              </Button>
              <Button
                onClick={() => {
                  setShowNewTimerModal(false);
                  setSelectedClientId('');
                  setSelectedProjectId('');
                  setDescription('');
                }}
                variant="secondary"
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </Modal>

        {/* Modal para detener timer */}
        <Modal
          isOpen={showStopModal !== null}
          onClose={() => {
            setShowStopModal(null);
            setDescription('');
          }}
          title="Guardar Tiempo Trabajado"
        >
          <div className="space-y-6">
            <div className="bg-gray-700 p-6 rounded-xl border-2 border-gray-600 text-center">
              <p className="text-sm font-semibold text-gray-300 mb-2">Tiempo acumulado en esta sesión:</p>
              <p className="text-4xl font-bold font-mono text-white">
                {showStopModal && timeCalculations.formatDuration(showStopModal.elapsed)}
              </p>
            </div>
            
            <Input
              label="Descripción adicional (opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Agregar notas adicionales..."
            />
            
            <div className="bg-gray-700 p-4 rounded-lg space-y-3">
              <p className="text-sm text-gray-300">
                <strong>Guardar y continuar:</strong> Guarda este tiempo pero mantiene el timer pausado para seguir acumulando más tiempo después.
              </p>
              <p className="text-sm text-gray-300">
                <strong>Guardar y finalizar:</strong> Guarda este tiempo y elimina el timer.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button 
                onClick={() => handleConfirmStop(true)} 
                variant="success"
                className="w-full"
              >
                Guardar y Continuar
              </Button>
              <Button 
                onClick={() => handleConfirmStop(false)} 
                variant="primary"
                className="w-full"
              >
                Guardar y Finalizar
              </Button>
              <Button
                onClick={() => {
                  setShowStopModal(null);
                  setDescription('');
                }}
                variant="secondary"
                className="w-full"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
