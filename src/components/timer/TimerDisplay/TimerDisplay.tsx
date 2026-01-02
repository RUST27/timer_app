import React from 'react';

interface TimerDisplayProps {
  time: number; // en milisegundos
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ time }) => {
  const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-display">
      <span className="timer-time">{formatTime(time)}</span>
    </div>
  );
};

