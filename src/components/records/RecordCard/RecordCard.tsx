import React from 'react';
import type { TimeRecord } from '../../../types';
import { Card } from '../../common/Card';
import { timeFormatting } from '../../../services/time/timeFormatting';
import { timeCalculations } from '../../../services/time/timeCalculations';

interface RecordCardProps {
  record: TimeRecord;
  clientName?: string;
  projectName?: string;
}

export const RecordCard: React.FC<RecordCardProps> = ({
  record,
  clientName,
  projectName,
}) => {
  return (
    <Card className="hover:shadow-elegant-lg transition-all duration-200">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-white">
                {timeFormatting.formatDate(record.startTime)}
              </h3>
              <span className="px-3 py-1 bg-gray-700 text-gray-200 text-sm font-bold rounded-full font-mono">
                {timeCalculations.formatDuration(record.duration)}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-300">Cliente:</span>
                <span>{clientName || record.clientId}</span>
              </div>
              {projectName && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-300">Proyecto:</span>
                  <span>{projectName}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-400 mb-4 pb-4 border-b border-gray-700">
          <span className="font-mono">{timeFormatting.formatTime(record.startTime)}</span>
          <span className="text-gray-500">→</span>
          <span className="font-mono">{timeFormatting.formatTime(record.endTime)}</span>
        </div>

        {record.description && (
          <p className="text-sm text-gray-300 italic mb-4 bg-gray-700 p-3 rounded-lg">
            "{record.description}"
          </p>
        )}
      </div>
    </Card>
  );
};
