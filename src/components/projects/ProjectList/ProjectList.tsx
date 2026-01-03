import React from 'react';
import type { Project } from '../../../types';
import { ProjectCard } from '../ProjectCard';
import { EmptyState } from '../../common/EmptyState';
import { Card } from '../../common/Card';

interface ProjectListProps {
  projects: Project[];
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {projects.length === 0 ? (
        <div className="col-span-full">
          <Card>
            <EmptyState
              icon={
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              }
              title="No hay proyectos registrados"
              description="Crea proyectos para organizar mejor tu tiempo de trabajo por tarea o actividad"
            />
          </Card>
        </div>
      ) : (
        projects.map((project, index) => (
          <div
            key={project.id}
            className="animate-scale-in"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <ProjectCard
              project={project}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))
      )}
    </div>
  );
};
