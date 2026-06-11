import { useState } from 'react';
import { Search, Filter, Download, MoreHorizontal, Calendar, Database, CheckCircle2, ChevronLeft, ChevronRight, XCircle } from 'lucide-react';
import { cn } from '../utils';
import { ExportModal } from '../components/ExportModal';

const MOCK_REGISTRY = [
  { id: 'RM-2810', collab: 'Carlos Eduardo Silva', doc: 'Atestado', reason: 'A09 - Diarreia e gastroenterite...', dateUpload: '11/06/2026', timeOff: '3 dias', obra: 'Obra Alfa - SP', status: 'pendente' },
  { id: 'RM-2811', collab: 'Amanda Lima Costa', doc: 'Atestado', reason: 'Sem CID Informado', dateUpload: '10/06/2026', timeOff: '1 dia', obra: 'Matriz - Financeiro', status: 'pendente' },
  { id: 'RM-2812', collab: 'Ricardo Souza', doc: 'Declaração', reason: 'Doação de Sangue', dateUpload: '09/06/2026', timeOff: 'Turno M', obra: 'Torre Sul - PR', status: 'aprovado' },
  { id: 'RM-2813', collab: 'José Almeida', doc: 'Atestado', reason: 'M54.5 - Dor lombar baixa', dateUpload: '20/05/2026', timeOff: '15 dias', obra: 'Obra Beta - RJ', status: 'pendente' },
  { id: 'RM-2795', collab: 'Fernanda Pires', doc: 'Atestado', reason: 'J06.9 - Infecção de via aérea...', dateUpload: '08/06/2026', timeOff: '2 dias', obra: 'Matriz - Financeiro', status: 'aprovado' },
  { id: 'RM-2790', collab: 'Roberto Carlos', doc: 'Atestado', reason: 'J03.9 - Amigdalite aguda...', dateUpload: '05/06/2026', timeOff: '3 dias', obra: 'Obra Alfa - SP', status: 'aprovado' },
  { id: 'RM-2782', collab: 'Sérgio Mendes', doc: 'Declaração', reason: 'Comparecimento (Dentista)', dateUpload: '02/06/2026', timeOff: 'Turno T', obra: 'Torre Sul - PR', status: 'aprovado' },
  { id: 'RM-2775', collab: 'Carlos Eduardo Silva', doc: 'Atestado', reason: 'H10.1 - Conjuntivite', dateUpload: '28/05/2026', timeOff: '5 dias', obra: 'Obra Alfa - SP', status: 'reprovado' },
  { id: 'RM-2760', collab: 'Marcelo Dias', doc: 'Atestado', reason: 'COVID-19', dateUpload: '20/05/2026', timeOff: '7 dias', obra: 'Obra Beta - RJ', status: 'aprovado' },
  { id: 'RM-2751', collab: 'Paula Ramos', doc: 'Atestado', reason: 'S93.4 - Entorse e distensão...', dateUpload: '15/05/2026', timeOff: '10 dias', obra: 'Matriz - Jurídico', status: 'aprovado' },
];

export function Registry() {
  const [showExport, setShowExport] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [filterObra, setFilterObra] = useState('Todas');
  const [filterType, setFilterType] = useState('Todos');

  const filteredData = MOCK_REGISTRY.filter(item => {
    const matchesSearch = item.collab.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'Todos' || item.status === filterStatus.toLowerCase();
    const matchesObra = filterObra === 'Todas' || item.obra.includes(filterObra);
    const matchesType = filterType === 'Todos' || item.doc === filterType;

    return matchesSearch && matchesStatus && matchesObra && matchesType;
  });

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 border-b-2 border-petroleum-500 inline-flex items-center pb-1">
            <Database className="w-6 h-6 mr-2 text-petroleum-600" /> Consulta Geral
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Explore, filtre e exporte todos os documentos lançados no sistema.
          </p>
        </div>
        <button 
          onClick={() => setShowExport(true)} 
          className="flex items-center px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm"
        >
          <Download className="w-4 h-4 mr-2" /> Exportar Dados
        </button>
      </div>

      {/* Filters Form */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por Colaborador, RM ou Motivo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-petroleum-500 focus:border-petroleum-500 transition-colors dark:text-slate-100"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-36">
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-lg py-2.5 px-3 text-sm focus:ring-petroleum-500 font-medium text-slate-700 dark:text-slate-300"
              >
                <option>Todos</option>
                <option>Pendente</option>
                <option>Aprovado</option>
                <option>Reprovado</option>
              </select>
            </div>

            <div className="w-full md:w-44">
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-lg py-2.5 px-3 text-sm focus:ring-petroleum-500 font-medium text-slate-700 dark:text-slate-300"
              >
                <option>Todos</option>
                <option>Atestado</option>
                <option>Declaração</option>
              </select>
            </div>

            <div className="w-full md:w-56">
              <select 
                value={filterObra}
                onChange={(e) => setFilterObra(e.target.value)}
                className="w-full border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-lg py-2.5 px-3 text-sm focus:ring-petroleum-500 font-medium text-slate-700 dark:text-slate-300"
              >
                <option>Todas</option>
                <option>Obra Alfa - SP</option>
                <option>Obra Beta - RJ</option>
                <option>Matriz - Financeiro</option>
                <option>Matriz - Jurídico</option>
                <option>Torre Sul - PR</option>
              </select>
            </div>

            <button className="flex items-center justify-center p-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg hover:bg-slate-50 text-slate-500">
              <Calendar className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Applied Filters Tags */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-xs font-semibold text-slate-400">Filtros ativos:</span>
          {(filterStatus !== 'Todos' || filterType !== 'Todos' || filterObra !== 'Todas') ? (
            <div className="flex gap-2">
              {filterStatus !== 'Todos' && <span className="inline-flex items-center px-2 py-1 rounded bg-petroleum-50 text-petroleum-700 text-xs font-medium"><Filter className="w-3 h-3 mr-1"/> Status: {filterStatus}</span>}
              {filterType !== 'Todos' && <span className="inline-flex items-center px-2 py-1 rounded bg-petroleum-50 text-petroleum-700 text-xs font-medium"><Filter className="w-3 h-3 mr-1"/> Tipo: {filterType}</span>}
              {filterObra !== 'Todas' && <span className="inline-flex items-center px-2 py-1 rounded bg-petroleum-50 text-petroleum-700 text-xs font-medium"><Filter className="w-3 h-3 mr-1"/> Obra: {filterObra}</span>}
              <button 
                onClick={() => { setFilterStatus('Todos'); setFilterType('Todos'); setFilterObra('Todas'); setSearchTerm(''); }}
                className="text-xs text-rose-500 hover:text-rose-700 font-medium ml-2 flex items-center"
              >
                <XCircle className="w-3 h-3 mr-1" /> Limpar Filtros
              </button>
            </div>
          ) : (
            <span className="text-xs text-slate-500">Nenhum</span>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-medium">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Registro</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap">Colaborador / Lotação</th>
                <th className="px-6 py-4 whitespace-nowrap">Tipo e Motivo</th>
                <th className="px-6 py-4 whitespace-nowrap">Lançamento</th>
                <th className="px-6 py-4 whitespace-nowrap">Afastamento</th>
                <th className="px-6 py-4 w-12 text-center">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {filteredData.length > 0 ? filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.status === 'pendente' && <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">Em Análise</span>}
                    {item.status === 'aprovado' && <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">Aprovado</span>}
                    {item.status === 'reprovado' && <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 border border-rose-200">Reprovado</span>}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{item.collab}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.obra}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-700 dark:text-slate-300">{item.doc}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-[200px]" title={item.reason}>{item.reason}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                    {item.dateUpload}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-700 dark:text-slate-200">
                    {item.timeOff}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-slate-400 hover:text-petroleum-600 transition-colors p-1 rounded hover:bg-petroleum-50">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    Nenhum registro encontrado para os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Mostrando <span className="font-medium">{filteredData.length > 0 ? 1 : 0}</span> a <span className="font-medium">{filteredData.length}</span> de <span className="font-medium">{MOCK_REGISTRY.length}</span> registros
          </p>
          <div className="flex space-x-2">
            <button className="p-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-400 hover:text-slate-600 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-400 hover:text-slate-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {showExport && <ExportModal onClose={() => setShowExport(false)} title="Exportar Consulta Geral" />}
    </div>
  );
}
