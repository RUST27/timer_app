import React from 'react';
import { Button } from '../../common/Button';

interface TimerControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  isPaused,
  onStart,
  onPause,
  onResume,
  onStop,
}) => {
  return (
    <div className="timer-controls">
      {!isRunning && !isPaused && (
        <Button onClick={onStart} variant="success" size="large">
          Iniciar
        </Button>
      )}
      {isRunning && (
        <>
          <Button onClick={onPause} variant="secondary" size="large">
            Pausar
          </Button>
          <Button onClick={onStop} variant="danger" size="large">
            Detener
          </Button>
        </>
      )}
      {isPaused && (
        <>
          <Button onClick={onResume} variant="success" size="large">
            Reanudar
          </Button>
          <Button onClick={onStop} variant="danger" size="large">
            Detener
          </Button>
        </>
      )}
    </div>
  );
};

