import { useState, useRef, useEffect } from 'react';
import { CalendarDays, Clock, FilePlus, Upload, FileText, Search, X, CheckCircle2 } from 'lucide-react';
import { cn } from '../utils';
import { DocumentType } from '../types';

export function NewEntry() {
  const [docType, setDocType] = useState<DocumentType | null>(null);
  const [hasCID, setHasCID] = useState(false);
  const [cidSearch, setCidSearch] = useState('');
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        showToast('Rascunho salvo com sucesso (Ctrl+S)');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {!docType ? (
        <div className="space-y-6">
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">Qual tipo de documento deseja lançar?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              A escolha correta impacta nos indicadores de absenteísmo, horas perdidas e na folha de pagamento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setDocType('declaracao')}
              className="flex flex-col items-center p-8 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-2xl hover:border-amber-500 hover:shadow-lg hover:shadow-amber-100/50 transition-all group"
            >
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-100 transition-colors">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">Declaração de Comparecimento</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                Comprova presença em consulta, exame ou atendimento. Impacto em <strong className="text-slate-700 dark:text-slate-300">horas ou turnos</strong> (não afasta por dias inteiros).
              </p>
            </button>

            <button
              onClick={() => setDocType('atestado')}
              className="flex flex-col items-center p-8 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-2xl hover:border-petroleum-600 hover:shadow-lg hover:shadow-petroleum-100/50 transition-all group"
            >
              <div className="w-16 h-16 bg-petroleum-50 text-petroleum-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-petroleum-100 transition-colors">
                <CalendarDays size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">Atestado Médico</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                Informa necessidade de repouso por período. Impacta <strong className="text-slate-700 dark:text-slate-300">dias inteiros (afastamento)</strong> e aumenta o absenteísmo.
              </p>
            </button>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 flex items-center">
              <FilePlus className="mr-3 text-slate-400" />
              {docType === 'atestado' ? 'Novo Atestado Médico' : 'Nova Declaração de Comparecimento'}
            </h2>
            <button 
              onClick={() => setDocType(null)}
              className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700"
            >
              &larr; Voltar e escolher outro
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-6 py-4">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Dados do Colaborador</h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Buscar Colaborador</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input type="text" className="w-full pl-9 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 sm:text-sm" placeholder="Nome ou Matrícula..." defaultValue="Carlos Eduardo Silva" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Obra / Alocação</label>
                    <input type="text" disabled className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-slate-500 dark:text-slate-400 sm:text-sm" value="001 - Obra Alfa SP" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cargo / Função</label>
                    <input type="text" disabled className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-slate-500 dark:text-slate-400 sm:text-sm" value="Pedreiro C" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-6 py-4">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Detalhes do Documento</h3>
                </div>
                
                {docType === 'declaracao' ? (
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Data do Comparecimento</label>
                      <input type="date" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Período / Turno</label>
                      <select className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 sm:text-sm">
                        <option>Manhã</option>
                        <option>Tarde</option>
                        <option>Integral</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Horário Inicial</label>
                      <input type="time" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Horário Final</label>
                      <input type="time" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 sm:text-sm" />
                    </div>
                    <div className="md:col-span-2">
                       <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Local / Motivo do Atendimento</label>
                       <input type="text" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 sm:text-sm" placeholder="Ex: Exame admissional, Consulta clínica, Doação de Sangue..." />
                    </div>
                  </div>
                ) : (
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Data de Emissão</label>
                      <input type="date" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Quantidade de Dias</label>
                      <input type="number" min="1" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 sm:text-sm" />
                    </div>
                    
                    <div className="md:col-span-2 mt-2">
                      <div className="flex items-center space-x-4 mb-3">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Documento possui CID informado?</label>
                        <div className="flex items-center space-x-2">
                           <button type="button" onClick={() => setHasCID(true)} className={cn("px-3 py-1 text-sm rounded-full font-medium border", hasCID ? "bg-petroleum-50 border-petroleum-600 text-petroleum-700" : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800")}>Sim</button>
                           <button type="button" onClick={() => setHasCID(false)} className={cn("px-3 py-1 text-sm rounded-full font-medium border", !hasCID ? "bg-slate-100 dark:bg-slate-800 border-slate-400 text-slate-700 dark:text-slate-300" : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800")}>Não</button>
                        </div>
                      </div>

                      {hasCID && (
                         <div className="relative p-4 border border-petroleum-200 bg-petroleum-50/50 rounded-lg">
                           <label className="block text-sm font-medium text-petroleum-900 mb-1 flex items-center">
                             <Search className="w-4 h-4 mr-1 text-petroleum-600" /> Referência CID-10
                           </label>
                           <input 
                             type="text" 
                             value={cidSearch}
                             onChange={(e) => setCidSearch(e.target.value)}
                             className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 sm:text-sm" 
                             placeholder="Digite código (ex: A09) ou descrição (ex: Diarreia)..." 
                           />
                           
                           {/* Simulated Autocomplete Dropdown */}
                           {cidSearch.length > 1 && (
                             <div className="absolute z-10 w-[calc(100%-2rem)] mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg dark:shadow-none">
                               <ul className="py-1 text-sm text-slate-700 dark:text-slate-300">
                                 <li className="px-3 py-2 hover:bg-petroleum-50 cursor-pointer flex justify-between">
                                   <span className="font-semibold w-12 shrink-0">A09</span>
                                   <span className="truncate">Diarreia e gastroenterite de origem infecciosa presumível</span>
                                 </li>
                                 <li className="px-3 py-2 hover:bg-petroleum-50 cursor-pointer flex justify-between">
                                   <span className="font-semibold w-12 shrink-0">A09.0</span>
                                   <span className="truncate">Outras gastroenterites de origem infecciosa</span>
                                 </li>
                               </ul>
                             </div>
                           )}
                         </div>
                      )}
                    </div>

                    <div className="md:col-span-2 flex space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome do Médico</label>
                        <input type="text" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 sm:text-sm" />
                      </div>
                      <div className="w-32">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">CRM/CRO</label>
                        <input type="text" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 sm:text-sm" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-6 py-4">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Anexo</h3>
                </div>
                <div className="p-6">
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-petroleum-400 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-petroleum-50 text-petroleum-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Upload size={24} />
                    </div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-50">Arraste a foto ou PDF aqui</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">ou clique para procurar no computador</p>
                  </div>
                  
                  {/* Mock Uploaded File */}
                  <div className="mt-4 p-3 border border-emerald-200 bg-emerald-50 rounded-lg flex items-start">
                    <FileText className="w-5 h-5 text-emerald-600 mr-3 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-emerald-900 truncate">atestado_carlos_2026.pdf</p>
                      <p className="text-xs text-emerald-600">Documento legível. Aguardando envio.</p>
                    </div>
                    <button className="text-emerald-700 hover:text-emerald-900 p-1"><X className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button onClick={() => showToast('Rascunho salvo com sucesso!')} className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-md font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  Salvar Rascunho
                </button>
                <button onClick={() => showToast('Documento enviado para análise do RH!', 'success')} className="flex-1 px-4 py-2 bg-petroleum-600 text-white rounded-md font-medium text-sm hover:bg-petroleum-700 shadow-sm dark:shadow-none transition-colors">
                  Enviar p/ RH
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className={cn(
            "flex items-center px-4 py-3 rounded-lg shadow-lg border",
            toast.type === 'success' ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-rose-50 border-rose-200 text-rose-800"
          )}>
            <CheckCircle2 className="w-5 h-5 mr-3" />
            <span className="font-medium text-sm">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-4 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
