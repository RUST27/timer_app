import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Client } from '../types';
import { localStorageService } from '../services/storage/localStorage';
import { STORAGE_KEYS } from '../utils/constants';

interface ClientContextType {
  clients: Client[];
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  getClientById: (id: string) => Client | undefined;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorageService.get<Client[]>(STORAGE_KEYS.CLIENTS);
    return saved || [];
  });

  // Sincronizar con localStorage cuando cambien los clientes
  useEffect(() => {
    localStorageService.set(STORAGE_KEYS.CLIENTS, clients);
  }, [clients]);

  const addClient = useCallback((clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newClient: Client = {
      ...clientData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setClients((prev) => [...prev, newClient]);
  }, []);

  const updateClient = useCallback((id: string, updates: Partial<Client>) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === id
          ? { ...client, ...updates, updatedAt: new Date() }
          : client
      )
    );
  }, []);

  const deleteClient = useCallback((id: string) => {
    setClients((prev) => prev.filter((client) => client.id !== id));
  }, []);

  const getClientById = useCallback(
    (id: string) => {
      return clients.find((client) => client.id === id);
    },
    [clients]
  );

  const value: ClientContextType = {
    clients,
    addClient,
    updateClient,
    deleteClient,
    getClientById,
  };

  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>;
};

export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClientContext must be used within a ClientProvider');
  }
  return context;
};

