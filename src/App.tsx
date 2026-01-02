import { useState, useEffect } from 'react';
import { ClientProvider } from './contexts/ClientContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { RecordProvider } from './contexts/RecordContext';
import { TimerProvider } from './contexts/TimerContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/common/Footer';
import { Dashboard } from './pages/Dashboard';
import { TimerPage } from './pages/TimerPage';
import { ClientsPage } from './pages/ClientsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { RecordsPage } from './pages/RecordsPage';
import { dataMigrationService } from './services/storage/dataMigration';
import './App.css';

function App() {
  // Verificar y migrar datos al iniciar la aplicación
  useEffect(() => {
    dataMigrationService.checkAndMigrate();
  }, []);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'timer':
        return <TimerPage />;
      case 'clients':
        return <ClientsPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'records':
        return <RecordsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ClientProvider>
      <ProjectProvider>
        <RecordProvider>
          <TimerProvider>
            <div className="min-h-screen flex flex-col bg-dark-900">
              <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
              <main className="flex-1">{renderPage()}</main>
              <Footer />
            </div>
          </TimerProvider>
        </RecordProvider>
      </ProjectProvider>
    </ClientProvider>
  );
}

export default App;
