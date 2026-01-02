import React from 'react';
import type { Project } from '../../../types';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  return (
    <Card className="group hover:scale-105 transition-transform duration-200">
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2 truncate">{project.name}</h3>
        {project.description && (
          <p className="text-sm text-slate-600 mb-4 line-clamp-2">{project.description}</p>
        )}
        {project.category && (
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full mb-4">
            {project.category}
          </span>
        )}
        <div className="flex gap-2 pt-4 border-t border-slate-200">
          {onEdit && (
            <Button
              size="small"
              variant="secondary"
              onClick={() => onEdit(project)}
              className="flex-1"
            >
              Editar
            </Button>
          )}
          {onDelete && (
            <Button
              size="small"
              variant="danger"
              onClick={() => onDelete(project.id)}
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
