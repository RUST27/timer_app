import { useState } from 'react';
import { useProjectContext } from '../contexts/ProjectContext';
import { useClientContext } from '../contexts/ClientContext';
import { ProjectList } from '../components/projects/ProjectList';
import { ProjectForm } from '../components/projects/ProjectForm';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import type { Project } from '../types';

export const ProjectsPage: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useProjectContext();
  const { clients } = useClientContext();
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();

  const handleAdd = () => {
    setEditingProject(undefined);
    setShowModal(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  const handleSubmit = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData);
    } else {
      addProject(projectData);
    }
    setShowModal(false);
    setEditingProject(undefined);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      deleteProject(id);
    }
  };

  return (
    <div className="min-h-screen p-6 sm:p-8 lg:p-10 animate-fade-in">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 animate-slide-up">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center border border-gray-700 transition-transform duration-300 hover:scale-110">
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-clip-text text-transparent mb-2 tracking-tight">
                Proyectos
              </h1>
              <p className="text-gray-400 text-lg font-body">Gestiona tus proyectos</p>
            </div>
          </div>
          <Button onClick={handleAdd} variant="primary" size="large" className="w-full sm:w-auto shadow-elegant-lg">
            + Agregar Proyecto
          </Button>
        </div>

        <ProjectList projects={projects} onEdit={handleEdit} onDelete={handleDelete} />

        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingProject(undefined);
          }}
          title={editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
        >
          <ProjectForm
            project={editingProject}
            clients={clients.map((c) => ({ id: c.id, name: c.name }))}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowModal(false);
              setEditingProject(undefined);
            }}
          />
        </Modal>
      </div>
    </div>
  );
};
