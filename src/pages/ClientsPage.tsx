import { useState } from 'react';
import { useClientContext } from '../contexts/ClientContext';
import { ClientList } from '../components/clients/ClientList';
import { ClientForm } from '../components/clients/ClientForm';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import type { Client } from '../types';

export const ClientsPage: React.FC = () => {
  const { clients, addClient, updateClient, deleteClient } = useClientContext();
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | undefined>();

  const handleAdd = () => {
    setEditingClient(undefined);
    setShowModal(true);
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setShowModal(true);
  };

  const handleSubmit = (clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingClient) {
      updateClient(editingClient.id, clientData);
    } else {
      addClient(clientData);
    }
    setShowModal(false);
    setEditingClient(undefined);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      deleteClient(id);
    }
  };

  return (
    <div className="min-h-screen p-6 sm:p-8 lg:p-10 animate-fade-in">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 animate-slide-up">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center border border-gray-700 transition-transform duration-300 hover:scale-110">
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-clip-text text-transparent mb-2 tracking-tight">
                Clientes
              </h1>
              <p className="text-gray-400 text-lg font-body">Gestiona tus clientes</p>
            </div>
          </div>
          <Button onClick={handleAdd} variant="primary" size="large" className="w-full sm:w-auto shadow-elegant-lg">
            + Agregar Cliente
          </Button>
        </div>

        <ClientList clients={clients} onEdit={handleEdit} onDelete={handleDelete} />

        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingClient(undefined);
          }}
          title={editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}
        >
          <ClientForm
            client={editingClient}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowModal(false);
              setEditingClient(undefined);
            }}
          />
        </Modal>
      </div>
    </div>
  );
};
