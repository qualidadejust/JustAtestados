import { useState } from 'react';
import { 
  Search, User, Briefcase, CalendarDays, Clock, FileText, 
  CheckCircle2, XCircle, AlertCircle, Eye, Filter, Download, 
  MapPin, UserSquare2, ShieldAlert
} from 'lucide-react';
import { cn } from '../utils';
import { ExportModal } from '../components/ExportModal';

const collabInfo = {
  nome: 'Carlos Eduardo Silva',
  matricula: '10452',
  obra: '001 - Obra Alfa SP',
  centroCusto: 'CC-045-SP',
  setor: 'Operacional',
  cargo: 'Pedreiro C',
  gestor: 'Roberto Costa',
  admissao: '12/03/2024'
};

const mockTimeline = [
  {
    id: 'RM-2810',
    type: 'atestado',
    date: '11 Junho 2026',
    title: 'Atestado Médico',
    period: '3 dias',
    details: 'A09 - Diarreia e gastroenterite de origem infecciosa',
    status: 'aprovado',
    analyst: 'Renata Silva',
    hasAttachment: true
  },
  {
    id: 'RM-2645',
    type: 'declaracao',
    date: '15 Maio 2026',
    title: 'Declaração de Comparecimento',
    period: 'Turno Manhã (4h)',
    details: 'Doação de Sangue - Hemocentro SP',
    status: 'aprovado',
    analyst: 'Renata Silva',
    hasAttachment: true
  },
  {
    id: 'RM-2104',
    type: 'atestado',
    date: '02 Abril 2026',
    title: 'Atestado Médico',
    period: '10 dias',
    details: 'M54.5 - Dor lombar baixa',
    status: 'aprovado',
    analyst: 'Médico do Trabalho (Dr. Paulo)',
    hasAttachment: true
  },
  {
    id: 'RM-1840',
    type: 'atestado',
    date: '10 Março 2026',
    title: 'Atestado Médico',
    period: '2 dias',
    details: 'Z00.0 - Exame médico geral',
    status: 'reprovado',
    analyst: 'Renata Silva',
    reason: 'Documento ilegível e sem carimbo do médico.',
    hasAttachment: true
  }
];

export function History() {
  const [showExport, setShowExport] = useState(false);

  return (
    <div className="p-8 space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none flex items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            className="w-full pl-9 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 text-sm" 
            placeholder="Buscar outro colaborador por NOME ou MATRÍCULA..." 
            defaultValue="Carlos Eduardo Silva"
          />
        </div>
        <div className="flex space-x-3">
          <button onClick={() => setShowExport(true)} className="flex items-center text-sm font-medium text-petroleum-600 hover:text-petroleum-700 bg-petroleum-50 px-3 py-2 rounded-md">
            <Download className="w-4 h-4 mr-1.5" /> Exportar Dados
          </button>
          <button className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 px-3 py-2">
            Voltar para listagem
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none overflow-hidden">
        <div className="p-6 lg:flex lg:items-start lg:justify-between">
          <div className="flex items-start space-x-5">
            <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 border-2 border-white shadow-sm dark:shadow-none">
              <User className="w-8 h-8 text-slate-500 dark:text-slate-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{collabInfo.nome}</h2>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex items-center"><UserSquare2 className="w-4 h-4 mr-1.5 text-slate-400" /> Matrícula: {collabInfo.matricula}</span>
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5 text-slate-400" /> {collabInfo.obra}</span>
                <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1.5 text-slate-400" /> {collabInfo.cargo}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Setor: {collabInfo.setor}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  C.C.: {collabInfo.centroCusto}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Gestor: {collabInfo.gestor}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 lg:mt-0 grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
             <div className="text-center">
               <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Atestados (Ano)</p>
               <p className="text-xl font-bold text-slate-900 dark:text-slate-50 mt-1">4</p>
             </div>
             <div className="text-center border-l border-slate-200 dark:border-slate-700">
               <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Declarações (Ano)</p>
               <p className="text-xl font-bold text-slate-900 dark:text-slate-50 mt-1">2</p>
             </div>
             <div className="text-center border-l border-slate-200 dark:border-slate-700">
               <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Dias Perdidos</p>
               <p className="text-xl font-bold text-rose-600 mt-1">15</p>
             </div>
             <div className="text-center border-l border-slate-200 dark:border-slate-700">
               <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Horas Perdidas</p>
               <p className="text-xl font-bold text-amber-600 mt-1">4h</p>
             </div>
          </div>
        </div>
      </div>

      {/* History Area */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Histórico de Lançamentos</h3>
          <div className="flex space-x-2">
            <select className="border border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 py-1.5 px-3 bg-white dark:bg-slate-900">
              <option>Últimos 12 meses</option>
              <option>Ano Atual (2026)</option>
              <option>Ano Anterior (2025)</option>
            </select>
            <select className="border border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 py-1.5 px-3 bg-white dark:bg-slate-900">
              <option>Todos (Atest. / Decl.)</option>
              <option>Atestados Médicos</option>
              <option>Declarações</option>
            </select>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none p-6 overflow-hidden">
          <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-4 space-y-8">
            
            {mockTimeline.map((item, index) => (
              <div key={item.id} className="relative pl-8 sm:pl-10">
                {/* Timeline Node */}
                <span className={cn(
                  "absolute -left-[17px] top-1 w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-white shadow-sm dark:shadow-none border",
                  item.type === 'atestado' ? "bg-petroleum-50 border-petroleum-200 text-petroleum-600" : "bg-amber-50 border-amber-200 text-amber-600"
                )}>
                  {item.type === 'atestado' ? <CalendarDays className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                </span>

                {/* Content Card */}
                <div className={cn(
                  "bg-white dark:bg-slate-900 border rounded-xl overflow-hidden transition-all hover:shadow-md",
                  item.status === 'reprovado' ? "border-rose-200" : "border-slate-200 dark:border-slate-700"
                )}>
                  <div className="p-4 sm:p-5">
                    <div className="flex flex-wrap items-start justify-between gap-y-2 mb-2">
                       <div className="flex items-center max-w-full">
                          <h4 className="text-base font-bold text-slate-900 dark:text-slate-50 mr-3 truncate">{item.title}</h4>
                          {item.status === 'aprovado' && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800"><CheckCircle2 className="w-3 h-3 mr-1"/> Aprovado</span>}
                          {item.status === 'reprovado' && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-rose-100 text-rose-800"><XCircle className="w-3 h-3 mr-1"/> Reprovado</span>}
                       </div>
                       <div className="text-sm font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
                         {item.date}
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                       <div>
                         <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider mb-1">Afastamento / Período</p>
                         <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{item.period}</p>
                       </div>
                       <div>
                         <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider mb-1">Detalhes (Motivo / CID)</p>
                         <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{item.details}</p>
                       </div>
                       {item.reason && (
                         <div className="sm:col-span-2 mt-2 p-3 bg-rose-50 rounded-lg border border-rose-100">
                           <p className="text-xs text-rose-800 font-semibold mb-1 flex items-center">
                             <AlertCircle className="w-4 h-4 mr-1"/> Motivo da Reprovação
                           </p>
                           <p className="text-sm text-rose-700">{item.reason}</p>
                         </div>
                       )}
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800 px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                     <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                       Ticket: <span className="text-slate-700 dark:text-slate-300">{item.id}</span> • Analisado por {item.analyst}
                     </span>
                     <button className="flex items-center text-sm font-semibold text-petroleum-600 hover:text-petroleum-700 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none px-3 py-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                       <Eye className="w-4 h-4 mr-1.5" />
                       Ver Documento
                     </button>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
        </div>

      </div>

      {showExport && <ExportModal onClose={() => setShowExport(false)} title="Exportar Histórico do Colaborador" />}
    </div>
  );
}
