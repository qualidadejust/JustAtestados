import { LayoutDashboard, FilePlus, ListTodo, Users, BarChart3, Settings, LogOut, FileText, Database } from 'lucide-react';
import { cn } from '../utils';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
}

export function Sidebar({ currentView, onNavigate, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Executivo', icon: LayoutDashboard },
    { id: 'new_entry', label: 'Novo Lançamento', icon: FilePlus },
    { id: 'queue', label: 'Fila de Análise', icon: ListTodo },
    { id: 'registry', label: 'Consulta Geral', icon: Database },
    { id: 'history', label: 'Histórico Colaborador', icon: Users },
    { id: 'analytics', label: 'Custos e Painéis', icon: BarChart3 },
    { id: 'admin', label: 'Administração', icon: Settings },
  ] as const;

  return (
    <div className="flex flex-col w-64 bg-petroleum-950 text-slate-300 h-screen border-r border-petroleum-900 sticky top-0">
      <div className="p-6 flex items-center space-x-3 text-white">
        <div className="w-8 h-8 rounded bg-petroleum-500 flex items-center justify-center">
          <FileText size={20} className="text-white" />
        </div>
        <span className="font-semibold text-lg tracking-tight">JustAtestados</span>
      </div>
      
      <div className="px-4 py-2 text-xs font-medium text-petroleum-500 uppercase tracking-wider">
        Menu Principal
      </div>
      
      <nav className="flex-1 px-3 space-y-1 mt-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as ViewState)}
            className={cn(
              "w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
              currentView === item.id 
                ? "bg-petroleum-800 text-white" 
                : "hover:bg-petroleum-900 hover:text-white"
            )}
          >
            <item.icon className={cn("mr-3 h-5 w-5", currentView === item.id ? "text-petroleum-500" : "text-slate-400")} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-petroleum-900">
        <div className="flex items-center px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium text-white mr-3">
            RH
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Renata Silva</p>
            <p className="text-xs text-slate-400 truncate">Analista de RH Senior</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="mt-4 w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-petroleum-900 rounded-md transition-colors"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair do Sistema
        </button>
      </div>
    </div>
  );
}
