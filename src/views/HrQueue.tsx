import { useState, Fragment, useRef, MouseEvent, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Clock, Filter, Search, XCircle, Eye, Edit2, MessageSquare, MoreHorizontal, FileText, Upload, PenTool, Eraser } from 'lucide-react';
import { cn } from '../utils';

const initialQueue = [
  { id: 'RM-2810', collab: 'Carlos Eduardo Silva', doc: 'Atestado Médico', reason: 'A09 - Diarreia...', dateDoc: '11/06/2026', timeOff: '3 dias', obra: 'Obra Alfa - SP', status: 'pendente', priority: 'high', inconsistent: false },
  { id: 'RM-2811', collab: 'Amanda Lima Costa', doc: 'Atestado Médico', reason: 'Sem CID Informado', dateDoc: '10/06/2026', timeOff: '1 dia', obra: 'Matriz - Financeiro', status: 'pendente', priority: 'normal', inconsistent: true, missingCid: true, incompleteDetails: false },
  { id: 'RM-2815', collab: 'Fernando Rocha', doc: 'Atestado Médico', reason: 'Suspeita Adulteração', dateDoc: '05/06/2026', timeOff: '1 dia', obra: 'Torre Norte - SP', status: 'pendente', priority: 'high', consistent: false, aiFraudRisk: true, aiFraudReason: 'Data do documento apresenta indícios de adulteração digital detectada por IA generativa (overlap de pixels).' },
  { id: 'RM-2812', collab: 'Ricardo Souza', doc: 'Declaração', reason: 'Doação de Sangue', dateDoc: '09/06/2026', timeOff: 'Turno M', obra: 'Torre Sul - PR', status: 'aprovado', priority: 'normal', inconsistent: false },
  { id: 'RM-2813', collab: 'José Almeida', doc: 'Atestado Médico', reason: 'M54.5 - Dor lombar...', dateDoc: '20/05/2026', timeOff: '15 dias', obra: 'Obra Beta - RJ', status: 'pendente', priority: 'high', inconsistent: true, expired: true, incompleteDetails: true },
];

export function HrQueue() {
  const [queue, setQueue] = useState(initialQueue);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Modals state
  const [showApproveModal, setShowApproveModal] = useState<string | null>(null);
  const [showRejectModal, setShowRejectModal] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState<string | null>(null);
  const [obsText, setObsText] = useState('');
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  // Canvas Drawing State
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState<'draw'|'erase'>('draw');

  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (drawMode === 'erase') {
      ctx.clearRect(e.nativeEvent.offsetX - 10, e.nativeEvent.offsetY - 10, 20, 20);
    } else {
      ctx.strokeStyle = '#ef4444'; // res pen
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const toggleExpand = (id: string) => {
    if (expandedId === id) setExpandedId(null);
    else setExpandedId(id);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(queue.filter(i => i.status === 'pendente').map(i => i.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleApprove = (id: string) => {
    setQueue(q => q.map(item => item.id === id ? { ...item, status: 'aprovado' } : item));
    setShowApproveModal(null);
    setExpandedId(null);
    setObsText('');
    showToast('Atestado aprovado com sucesso!');
  };

  const handleReject = (id: string) => {
    setQueue(q => q.map(item => item.id === id ? { ...item, status: 'reprovado' } : item));
    setShowRejectModal(null);
    setExpandedId(null);
    setObsText('');
    showToast('Documento reprovado e devolvido ao colaborador.', 'error');
  };

  const handleBulkApprove = () => {
    setQueue(q => q.map(item => selectedIds.includes(item.id) ? { ...item, status: 'aprovado' } : item));
    setSelectedIds([]);
    showToast(`${selectedIds.length} atestados aprovados com sucesso!`);
  };

  const handleBulkReject = () => {
    setQueue(q => q.map(item => selectedIds.includes(item.id) ? { ...item, status: 'reprovado' } : item));
    setSelectedIds([]);
    showToast(`${selectedIds.length} atestados reprovados.`, 'error');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pendente de Análise</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">42</h3>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg"><Clock className="w-6 h-6 text-amber-500" /></div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Inconsistentes / CRM Inválido</p>
              <h3 className="text-2xl font-bold text-rose-600">8</h3>
            </div>
            <div className="p-2 bg-rose-50 rounded-lg"><AlertCircle className="w-6 h-6 text-rose-600" /></div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Aprovados Hoje</p>
              <h3 className="text-2xl font-bold text-emerald-600">15</h3>
            </div>
            <div className="p-2 bg-emerald-50 rounded-lg"><CheckCircle2 className="w-6 h-6 text-emerald-600" /></div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tempo Médio Tratamento</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">4h 12m</h3>
            </div>
            <div className="p-2 bg-petroleum-50 rounded-lg"><Clock className="w-6 h-6 text-petroleum-600" /></div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
             <input type="text" className="w-full pl-9 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 text-sm" placeholder="Buscar ticket, colaborador..." />
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100">
              <Filter className="w-4 h-4 mr-2" /> Filtros
            </button>
            <select className="border border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 px-3 py-2 bg-white dark:bg-slate-900">
              <option>Mais recentes</option>
              <option>Maior prioridade</option>
              <option>Mais antigos</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {selectedIds.length > 0 && (
            <div className="bg-petroleum-50 dark:bg-petroleum-900/30 border-y border-petroleum-200 dark:border-petroleum-800 px-6 py-3 flex items-center justify-between">
              <span className="text-sm font-medium text-petroleum-800 dark:text-petroleum-200">
                {selectedIds.length} documento(s) selecionado(s)
              </span>
              <div className="flex space-x-2">
                <button onClick={handleBulkApprove} className="px-3 py-1.5 bg-emerald-600 text-white rounded text-sm font-medium hover:bg-emerald-700 transition-colors">
                  Aprovar Selecionados
                </button>
                <button onClick={handleBulkReject} className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-rose-600 text-rose-600 rounded text-sm font-medium hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors shadow-sm">
                  Reprovar Selecionados
                </button>
              </div>
            </div>
          )}
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap w-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300 text-petroleum-600 focus:ring-petroleum-500" 
                    checked={selectedIds.length > 0 && selectedIds.length === queue.filter(i => i.status === 'pendente').length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap">Colaborador / Obra</th>
                <th className="px-6 py-4 whitespace-nowrap">Documento</th>
                <th className="px-6 py-4 whitespace-nowrap">Afastamento</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Ações Aprov.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900">
              {queue.map((item) => (
                <Fragment key={item.id}>
                  <tr className={cn("hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer", expandedId === item.id ? "bg-slate-50 dark:bg-slate-800" : "")} onClick={() => toggleExpand(item.id)}>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      {item.status === 'pendente' && (
                        <input 
                          type="checkbox" 
                          className="rounded border-slate-300 text-petroleum-600 focus:ring-petroleum-500" 
                          checked={selectedIds.includes(item.id)}
                          onChange={() => handleSelectRow(item.id)}
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.status === 'pendente' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">Em Análise</span>}
                      {item.status === 'aprovado' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">Aprovado</span>}
                      {item.status === 'reprovado' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 border border-rose-200">Reprovado</span>}
                      
                      {item.aiFraudRisk && item.status === 'pendente' && (
                        <div className="mt-1 flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-fuchsia-100 text-fuchsia-800 border border-fuchsia-200 w-max" title="Alerta de Inteligência Artificial">
                           <AlertCircle className="w-3 h-3 mr-1" /> ALERTA IA: ADULTERAÇÃO
                        </div>
                      )}
                      
                      {item.missingCid && item.status === 'pendente' && (
                        <div className="mt-1 flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 w-max" title="O documento não possui CID preenchido">
                           <AlertCircle className="w-3 h-3 mr-1" /> FALTANDO CID
                        </div>
                      )}
                      
                      {item.expired && item.status === 'pendente' && (
                        <div className="mt-1 flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 w-max" title="Prazo de envio excedido">
                           <Clock className="w-3 h-3 mr-1" /> ATRASADO / EXPIRADO
                        </div>
                      )}

                      {item.incompleteDetails && item.status === 'pendente' && (
                        <div className="mt-1 flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-800 w-max" title="Faltam informações do colaborador">
                           <AlertCircle className="w-3 h-3 mr-1" /> DADOS INCOMPLETOS
                        </div>
                      )}
                      
                      {!item.missingCid && !item.expired && !item.incompleteDetails && item.inconsistent && item.status === 'pendente' && (
                        <span className="mt-1 block max-w-max items-center px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">INCONSISTÊNCIA DETECTADA</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900 dark:text-slate-50">{item.collab}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.obra}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-petroleum-700">{item.doc}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.reason}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-slate-900 dark:text-slate-50">{item.timeOff}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 text-amber-600 font-medium">{item.priority === 'high' && 'Atenção > 2 dias'}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {item.status === 'pendente' ? (
                        <div className="flex justify-end space-x-2" onClick={e => e.stopPropagation()}>
                           <button onClick={() => toggleExpand(item.id)} className="p-1.5 text-slate-400 hover:text-petroleum-600 hover:bg-petroleum-50 rounded font-medium text-sm flex items-center" title="Avaliar">
                             Avaliar
                           </button>
                           <button onClick={() => setShowPreviewModal(item.id)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded" title="Ver Documento Original"><Eye className="w-4 h-4" /></button>
                           <button className="p-1.5 text-slate-400 hover:bg-slate-100 rounded" title="Mais opções"><MoreHorizontal className="w-4 h-4" /></button>
                        </div>
                      ) : (
                        <div className="flex justify-end space-x-2" onClick={e => e.stopPropagation()}>
                           <button onClick={() => toggleExpand(item.id)} className="p-1.5 text-slate-400 hover:text-petroleum-600 hover:bg-petroleum-50 rounded font-medium text-sm flex items-center" title="Ver Detalhes">
                             Ver Histórico
                           </button>
                           <button onClick={() => setShowPreviewModal(item.id)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded" title="Ver Documento Original"><Eye className="w-4 h-4" /></button>
                        </div>
                      )}
                    </td>
                  </tr>
                  
                  {/* Expanded Row */}
                  {expandedId === item.id && (
                    <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                      <td colSpan={5} className="p-0">
                        <div className="p-6 border-l-4 border-petroleum-500 bg-white dark:bg-slate-900 m-4 rounded-lg shadow-sm dark:shadow-none grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
                           
                           {/* Quick Preview Area */}
                           <div className="md:col-span-1 border-r border-slate-100 dark:border-slate-800 pr-6">
                             <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center">
                               <FileText className="w-4 h-4 mr-2 text-slate-400" />
                               Prévia do Documento
                             </h4>
                             <div 
                               className="border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 rounded-lg h-48 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors"
                               onClick={() => setShowPreviewModal(item.id)}
                             >
                               <div className="text-center">
                                 <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                 <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Clique para ampliar anexo</span>
                               </div>
                             </div>
                             <button className="mt-3 w-full text-xs font-medium text-petroleum-600 flex items-center justify-center">
                               <Upload className="w-3 h-3 mr-1" /> Solicitar novo anexo
                             </button>
                           </div>

                           {/* Analysis Actions */}
                           <div className="md:col-span-2 flex flex-col justify-between">
                             <div>
                               <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center">
                                 <MessageSquare className="w-4 h-4 mr-2 text-slate-400"/>
                                 Detalhes da Avaliação
                               </h4>
                               
                               <div className="bg-slate-50 dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700 rounded-lg mb-4 text-sm text-slate-700 dark:text-slate-300">
                                 <p className="mb-2"><strong className="font-semibold">Colaborador:</strong> {item.collab}</p>
                                 <p className="mb-2"><strong className="font-semibold">Médico Emissor:</strong> Dr. Paulo Silva (CRM 12345)</p>
                                 <p className="mb-2"><strong className="font-semibold">Início Afastamento:</strong> {item.dateDoc}</p>
                                 {item.inconsistent && !item.missingCid && !item.expired && (
                                   <div className="mt-3 p-2 bg-rose-50 border border-rose-200 rounded text-rose-800 font-medium flex items-start text-xs">
                                     <AlertCircle className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
                                     O CRM informado não consta na base ativa do CFM ou é incompatível com o nome.
                                   </div>
                                 )}
                                 {item.missingCid && (
                                   <div className="mt-2 p-2 bg-rose-50 border border-rose-200 rounded text-rose-800 font-medium flex items-start text-xs">
                                     <AlertCircle className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
                                     Verifique os dados com o emissor: o código CID é obrigatório para este tipo de documento.
                                   </div>
                                 )}
                                 {item.expired && (
                                   <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-800 font-medium flex items-start text-xs">
                                     <Clock className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
                                     O prazo de entrega (48h) de atestados foi excedido. Depende de aprovação do gestor para exceção.
                                   </div>
                                 )}
                                 {item.incompleteDetails && (
                                   <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded text-orange-800 font-medium flex items-start text-xs">
                                     <AlertCircle className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
                                     Cadastro desatualizado: Falta confirmar Centro de Custo e matrícula base antes de faturar.
                                   </div>
                                 )}
                               </div>

                               {item.status === 'pendente' ? (
                                 <div className="space-y-3">
                                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Observação interna (opcional)</label>
                                   <textarea 
                                     rows={2} 
                                     className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400" 
                                     placeholder="Adicione um comentário visível apenas para o RH..."
                                   />
                                 </div>
                               ) : (
                                 <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm">
                                   <p className="text-slate-500 dark:text-slate-400">Documento finalizado por Renata Silva em 11/06/2026 às 14:30.</p>
                                 </div>
                               )}
                             </div>

                             {item.status === 'pendente' && (
                               <div className="flex space-x-3 mt-6">
                                 <button onClick={() => setShowApproveModal(item.id)} className="flex items-center justify-center flex-1 px-4 py-2 bg-emerald-600 text-white rounded-md font-medium text-sm hover:bg-emerald-700 transition-colors shadow-sm dark:shadow-none">
                                   <CheckCircle2 className="w-4 h-4 mr-2" />
                                   Aprovar Atestado
                                 </button>
                                 <button onClick={() => setShowRejectModal(item.id)} className="flex items-center justify-center flex-1 px-4 py-2 bg-white dark:bg-slate-900 border border-rose-600 text-rose-600 rounded-md font-medium text-sm hover:bg-rose-50 transition-colors shadow-sm dark:shadow-none">
                                   <XCircle className="w-4 h-4 mr-2" />
                                   Reprovar / Devolver
                                 </button>
                               </div>
                             )}
                           </div>
                           
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 px-6 py-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between sm:px-6">
           <p className="text-sm text-slate-500 dark:text-slate-400">Exibindo <span className="font-medium text-slate-900 dark:text-slate-50">1</span> a <span className="font-medium text-slate-900 dark:text-slate-50">4</span> de <span className="font-medium text-slate-900 dark:text-slate-50">42</span> resultados</p>
           <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm dark:shadow-none" aria-label="Pagination">
             <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 focus:z-20 focus:outline-offset-0">Anterior</button>
             <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 focus:z-20 focus:outline-offset-0">Próximo</button>
           </nav>
        </div>
      </div>

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 animate-in fade-in">
           <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="p-6">
               <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 mx-auto">
                 <CheckCircle2 className="w-6 h-6" />
               </div>
               <h3 className="text-lg font-bold text-center text-slate-900 dark:text-slate-50 mb-2">Confirmar Aprovação</h3>
               <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6">
                 O atestado será contabilizado nos indicadores de absenteísmo para a obra selecionada.
               </p>
               <div className="flex space-x-3">
                 <button onClick={() => setShowApproveModal(null)} className="flex-1 py-2 px-4 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-md font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                   Cancelar
                 </button>
                 <button onClick={() => handleApprove(showApproveModal)} className="flex-1 py-2 px-4 bg-emerald-600 text-white rounded-md font-medium text-sm hover:bg-emerald-700 transition-colors shadow-sm dark:shadow-none">
                   Confirmar Aprovação
                 </button>
               </div>
             </div>
           </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center z-50 animate-in fade-in p-4 lg:p-8">
           <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full h-full max-w-7xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
             
             {/* Header */}
             <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shrink-0">
               <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 flex items-center">
                 <Eye className="w-5 h-5 text-petroleum-600 mr-2" />
                 Validação de Documento
               </h3>
               <button onClick={() => setShowPreviewModal(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
                 <XCircle className="w-6 h-6" />
               </button>
             </div>
             
             {/* Body */}
             <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-slate-100 dark:bg-slate-800">
               
               {/* Image/PDF Viewer Panel (Left) */}
               <div className="flex-1 p-4 lg:p-6 flex flex-col items-center justify-center overflow-auto border-b lg:border-b-0 lg:border-r border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800">
                 
                 <div className="flex space-x-2 w-full max-w-3xl mb-3 justify-end items-center">
                   <span className="text-xs font-semibold text-slate-500 mr-2">Ferramentas de Revisão:</span>
                   <button 
                     onClick={() => setDrawMode('draw')}
                     className={cn("p-1.5 rounded transition-colors", drawMode === 'draw' ? "bg-rose-100 text-rose-700" : "bg-white text-slate-500 hover:bg-slate-200")}
                     title="Desenhar / Circular"
                   >
                     <PenTool className="w-4 h-4" />
                   </button>
                   <button 
                     onClick={() => setDrawMode('erase')}
                     className={cn("p-1.5 rounded transition-colors", drawMode === 'erase' ? "bg-slate-300 text-slate-800" : "bg-white text-slate-500 hover:bg-slate-200")}
                     title="Borracha"
                   >
                     <Eraser className="w-4 h-4" />
                   </button>
                 </div>

                 <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 aspect-[1/1.4] shadow-lg dark:shadow-none border border-slate-200 dark:border-slate-700 rounded flex items-center justify-center flex-col text-slate-400 overflow-hidden cursor-crosshair">
                   <FileText className="w-16 h-16 mb-4 text-slate-300" />
                   <p className="font-medium text-slate-500 dark:text-slate-400">Visualização do Documento</p>
                   <p className="text-sm mt-1">Use a ferramenta de desenho para marcar inconsistências na imagem.</p>
                   
                   {/* Annotation Overlay Canvas */}
                   <canvas
                     ref={canvasRef}
                     width={800}
                     height={1120}
                     onMouseDown={startDrawing}
                     onMouseMove={draw}
                     onMouseUp={stopDrawing}
                     onMouseLeave={stopDrawing}
                     className="absolute inset-0 w-full h-full opacity-70 z-10 touch-none"
                   />
                 </div>
               </div>
               
               {/* Details and Actions Panel (Right) */}
               <div className="w-full lg:w-[400px] bg-white dark:bg-slate-900 shrink-0 flex flex-col h-full overflow-y-auto">
                 {(() => {
                   const item = queue.find(q => q.id === showPreviewModal);
                   if (!item) return null;
                   return (
                     <>
                       <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex-1">
                         <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 border-b pb-2">Dados Extraídos</h4>
                         
                         <div className="space-y-5 text-sm">
                           <div>
                             <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 font-semibold">Colaborador</p>
                             <p className="font-medium text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700">{item.collab}</p>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                             <div>
                               <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 font-semibold">Documento</p>
                               <p className="font-medium text-slate-900 dark:text-slate-50">{item.doc}</p>
                             </div>
                             <div>
                               <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 font-semibold">Data Emissão</p>
                               <p className="font-medium text-slate-900 dark:text-slate-50">{item.dateDoc}</p>
                             </div>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                             <div>
                               <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 font-semibold">Afastamento/Período</p>
                               <p className="font-bold text-petroleum-700">{item.timeOff}</p>
                             </div>
                             <div>
                               <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 font-semibold">Médico/CRM</p>
                               <p className="font-medium text-slate-900 dark:text-slate-50">Dr. Paulo / 12345</p>
                             </div>
                           </div>
                           <div>
                             <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 font-semibold">Motivo / CID</p>
                             <p className="font-medium text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700">{item.reason}</p>
                           </div>
                         </div>

                         {item.aiFraudRisk && (
                           <div className="mt-6 p-3 bg-fuchsia-100 border border-fuchsia-300 rounded-lg text-fuchsia-900 font-medium flex items-start text-sm">
                             <AlertCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5 text-fuchsia-600" />
                             <div>
                               <p className="font-bold mb-1">Alerta Inteligente de Adulteração</p>
                               <p className="text-xs">{item.aiFraudReason}</p>
                             </div>
                           </div>
                         )}

                         {item.inconsistent && !item.aiFraudRisk && (
                           <div className="mt-6 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 font-medium flex items-start text-sm">
                             <AlertCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                             O sistema identificou possível inconsistência no CRM informado. Confirme a validade do documento em caso de dúvida.
                           </div>
                         )}
                       </div>
                       
                       <div className="p-6 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shrink-0">
                         {item.status === 'pendente' ? (
                           <div className="space-y-3">
                             <button 
                               onClick={() => { setShowPreviewModal(null); setShowApproveModal(item.id); }} 
                               className="w-full flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-md font-medium text-sm hover:bg-emerald-700 transition-colors shadow-sm dark:shadow-none"
                             >
                               <CheckCircle2 className="w-4 h-4 mr-2" />
                               Aprovar Documento
                             </button>
                             <button 
                               onClick={() => { setShowPreviewModal(null); setShowRejectModal(item.id); }} 
                               className="w-full flex items-center justify-center px-4 py-2 bg-white dark:bg-slate-900 border border-rose-600 text-rose-600 rounded-md font-medium text-sm hover:bg-rose-50 transition-colors shadow-sm dark:shadow-none"
                             >
                               <XCircle className="w-4 h-4 mr-2" />
                               Reprovar / Devolver
                             </button>
                           </div>
                         ) : (
                           <div className="p-3 bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-center text-slate-600 dark:text-slate-400 font-medium text-sm">
                             Documento já avaliado ({item.status})
                           </div>
                         )}
                       </div>
                     </>
                   );
                 })()}
               </div>
             </div>
           </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 animate-in fade-in">
           <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="p-6">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 flex items-center">
                   <XCircle className="w-5 h-5 text-rose-500 mr-2" />
                   Reprovar Documento
                 </h3>
                 <button onClick={() => setShowRejectModal(null)} className="text-slate-400 hover:text-slate-600">
                   &times;
                 </button>
               </div>
               
               <div className="space-y-4 mb-6">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Motivo principal da reprovação <span className="text-rose-500">*</span></label>
                   <select className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400">
                     <option>Documento Ilegível</option>
                     <option>Ausência de Carimbo/Assinatura Médico</option>
                     <option>Sem identificação do colaborador</option>
                     <option>CRM Inválido/Inconsistente</option>
                     <option>Documento Alterado/Rasurado (Suspeita)</option>
                     <option>Fora do Prazo de Entrega</option>
                     <option>Outro motivo (explicar abaixo)</option>
                   </select>
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Justificativa detalhada / Orientação ao colaborador</label>
                   <textarea 
                     rows={3} 
                     className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-rose-500 focus:border-rose-500" 
                     placeholder="Escreva aqui o que deve ser corrigido ou comunicado para devolução..."
                   />
                 </div>
               </div>

               <div className="bg-rose-50 p-3 rounded-lg border border-rose-100 mb-6 flex items-start">
                  <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 mr-2" />
                  <p className="text-xs text-rose-800">
                    Ao reprovar, o atestado <strong>NÃO</strong> será computado nas horas de absenteísmo e o colaborador acumulará falta injustificada caso não substitua o documento no prazo.
                  </p>
               </div>

               <div className="flex justify-end space-x-3">
                 <button onClick={() => setShowRejectModal(null)} className="py-2 px-4 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-md font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                   Cancelar
                 </button>
                 <button onClick={() => handleReject(showRejectModal)} className="py-2 px-4 bg-rose-600 text-white rounded-md font-medium text-sm hover:bg-rose-700 transition-colors shadow-sm dark:shadow-none">
                   Confirmar Reprovação
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
            "flex items-center px-4 py-3 rounded-lg shadow-lg dark:shadow-none border",
            toast.type === 'success' ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-rose-50 border-rose-200 text-rose-800"
          )}>
            {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 mr-3" /> : <AlertCircle className="w-5 h-5 mr-3" />}
            <span className="font-medium text-sm">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-4 text-slate-400 hover:text-slate-600">
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
