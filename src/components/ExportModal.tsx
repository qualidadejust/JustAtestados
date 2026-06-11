import { useState } from 'react';
import { XCircle, FileText, Download } from 'lucide-react';

interface ExportModalProps {
  onClose: () => void;
  title?: string;
}

export function ExportModal({ onClose, title = "Exportar Relatório" }: ExportModalProps) {
  const [format, setFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState('month');

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 animate-in fade-in p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 flex items-center">
            <Download className="w-5 h-5 text-petroleum-600 mr-2" />
            {title}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <XCircle className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Formato do Arquivo</label>
            <div className="grid grid-cols-2 gap-3">
              <label className={`border rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer transition-colors ${format === 'pdf' ? 'border-petroleum-500 bg-petroleum-50 dark:bg-slate-800' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <input type="radio" className="sr-only" checked={format === 'pdf'} onChange={() => setFormat('pdf')} />
                <FileText className={`w-6 h-6 mb-1 ${format === 'pdf' ? 'text-petroleum-600' : 'text-slate-400'}`} />
                <span className="text-sm font-medium dark:text-slate-300">PDF (.pdf)</span>
              </label>
              <label className={`border rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer transition-colors ${format === 'csv' ? 'border-petroleum-500 bg-petroleum-50 dark:bg-slate-800' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <input type="radio" className="sr-only" checked={format === 'csv'} onChange={() => setFormat('csv')} />
                <FileText className={`w-6 h-6 mb-1 ${format === 'csv' ? 'text-petroleum-600' : 'text-slate-400'}`} />
                <span className="text-sm font-medium dark:text-slate-300">Planilha (.csv)</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Período de Dados</label>
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 focus:border-petroleum-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50"
            >
              <option value="month">Mês Atual</option>
              <option value="last_month">Mês Anterior</option>
              <option value="quarter">Último Trimestre</option>
              <option value="year">Ano Atual</option>
              <option value="custom">Personalizado...</option>
            </select>
          </div>

          {dateRange === 'custom' && (
            <div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2">
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Data Inicial</label>
                <input type="date" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-1.5 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:ring-petroleum-500 focus:border-petroleum-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Data Final</label>
                <input type="date" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-1.5 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:ring-petroleum-500 focus:border-petroleum-500" />
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-50 dark:bg-slate-800 p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-3">
          <button onClick={onClose} className="py-2 px-4 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-md font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            Cancelar
          </button>
          <button onClick={onClose} className="py-2 px-4 bg-petroleum-600 text-white rounded-md font-medium text-sm hover:bg-petroleum-700 transition-colors shadow-sm">
            Gerar Arquivo
          </button>
        </div>
      </div>
    </div>
  );
}
