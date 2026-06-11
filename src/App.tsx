import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Login } from './views/Login';
import { Dashboard } from './views/Dashboard';
import { NewEntry } from './views/NewEntry';
import { HrQueue } from './views/HrQueue';
import { Analytics } from './views/Analytics';
import { History } from './views/History';
import { Admin } from './views/Admin';
import { Registry } from './views/Registry';
import { ViewState } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('login');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial dark mode preference
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                   (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('darkMode', String(next));
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  if (currentView === 'login') {
    return <Login onLogin={() => setCurrentView('dashboard')} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'new_entry': return <NewEntry />;
      case 'queue': return <HrQueue />;
      case 'analytics': return <Analytics />;
      case 'history': return <History />;
      case 'admin': return <Admin />;
      case 'registry': return <Registry />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-800 dark:text-slate-50 overflow-hidden font-sans">
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        onLogout={() => setCurrentView('login')} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          currentView={currentView} 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
        <main className="flex-1 overflow-y-auto w-full border-t border-slate-200 dark:border-slate-700/50">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
