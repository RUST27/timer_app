import React from 'react';
import { TimerDisplay } from '../TimerDisplay';
import { TimerControls } from '../TimerControls';

interface ActiveTimerProps {
  elapsedTime: number;
  isRunning: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

export const ActiveTimer: React.FC<ActiveTimerProps> = ({
  elapsedTime,
  isRunning,
  isPaused,
  onStart,
  onPause,
  onResume,
  onStop,
}) => {
  return (
    <div className="active-timer">
      <TimerDisplay time={elapsedTime} />
      <TimerControls
        isRunning={isRunning}
        isPaused={isPaused}
        onStart={onStart}
        onPause={onPause}
        onResume={onResume}
        onStop={onStop}
      />
    </div>
  );
};

