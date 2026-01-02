import React from 'react';
import type { Project } from '../../../types';
import { ProjectCard } from '../ProjectCard';

interface ProjectListProps {
  projects: Project[];
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {projects.length === 0 ? (
        <div className="col-span-full text-center py-16 px-4">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No hay proyectos registrados</h3>
          <p className="text-slate-500">Comienza agregando tu primer proyecto</p>
        </div>
      ) : (
        projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};
