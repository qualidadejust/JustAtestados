import { Search, Bell, Moon, Sun } from 'lucide-react';
import { ViewState } from '../types';
import { useEffect, useRef } from 'react';

interface HeaderProps {
  currentView: ViewState;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

const viewTitles: Record<ViewState, string> = {
  login: '',
  dashboard: 'Dashboard Executivo',
  new_entry: 'Novo Lançamento',
  queue: 'Fila de Análise RH',
  history: 'Histórico por Colaborador',
  analytics: 'Painéis Analíticos',
  admin: 'Configurações e Administração'
};

export function Header({ currentView, isDarkMode, toggleDarkMode }: HeaderProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 h-16 flex items-center justify-between px-8 sticky top-0 z-10 shrink-0">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50 tracking-tight">
          {viewTitles[currentView]}
        </h1>
        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center space-x-2">
          <span>Início</span>
          <span>/</span>
          <span className="text-petroleum-600 font-medium">{viewTitles[currentView]}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="Buscar por colaborador, matrícula..." 
            className="pl-9 pr-14 py-2 w-72 bg-slate-100 dark:bg-slate-800 border-transparent rounded-md text-sm focus:bg-white dark:focus:bg-slate-900 focus:border-petroleum-500 dark:focus:border-petroleum-400 focus:ring-1 focus:ring-petroleum-500 dark:focus:ring-petroleum-400 transition-colors text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <kbd className="hidden group-hover:inline-flex md:inline-flex items-center gap-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-1.5 font-mono text-[10px] font-medium text-slate-500 dark:text-slate-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
        <div className="flex items-center space-x-2 border-l border-slate-200 dark:border-slate-700 pl-6">
          <button 
            onClick={toggleDarkMode}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            title="Alternar tema"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button className="relative p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
