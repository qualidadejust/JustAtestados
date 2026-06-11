import { useState } from 'react';
import { 
  Users, Building, Briefcase, FileType, Database, Sliders, 
  Upload, Plus, Edit2, Download, Search, CheckCircle2, XCircle, AlertCircle,
  FileText, Clock
} from 'lucide-react';
import { cn } from '../utils';

type AdminSection = 'usuarios' | 'obras' | 'parametros' | 'cid' | 'audit' | 'tipos' | 'cargos';

export function Admin() {
  const [activeTab, setActiveTab] = useState<AdminSection>('parametros');
  const [showModal, setShowModal] = useState<string | null>(null);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const menuItems = [
    { id: 'usuarios', label: 'Usuários e Perfis', icon: Users },
    { id: 'obras', label: 'Obras / C.C.', icon: Building },
    { id: 'cargos', label: 'Cargos e Setores', icon: Briefcase },
    { id: 'tipos', label: 'Tipos de Documento', icon: FileType },
    { id: 'parametros', label: 'Parâmetros de Custo', icon: Sliders },
    { id: 'cid', label: 'Base de CID-10', icon: Database },
    { id: 'audit', label: 'Logs e Auditoria', icon: FileText },
  ] as const;

  return (
    <div className="p-8 max-w-7xl mx-auto flex h-[calc(100vh-4rem)]">
      
      {/* Sidebar Administrativa */}
      <div className="w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-l-xl shadow-sm dark:shadow-none overflow-y-auto">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
          <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center">
            Configurações
          </h3>
        </div>
        <nav className="p-2 space-y-1">
          {menuItems.map((item) => (
             <button
               key={item.id}
               onClick={() => setActiveTab(item.id as AdminSection)}
               className={cn(
                 "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-left",
                 activeTab === item.id 
                   ? "bg-petroleum-50 text-petroleum-700" 
                   : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
               )}
             >
               <item.icon className={cn("mr-3 h-4 w-4", activeTab === item.id ? "text-petroleum-600" : "text-slate-400")} />
               {item.label}
             </button>
          ))}
        </nav>
      </div>

      {/* Área Principal */}
      <div className="flex-1 bg-white dark:bg-slate-900 border border-l-0 border-slate-200 dark:border-slate-700 rounded-r-xl shadow-sm dark:shadow-none overflow-y-auto flex flex-col">
        
        {activeTab === 'parametros' && (
          <div className="p-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Parâmetros de Custo e Metas</h2>
              <button 
                onClick={() => showToast('Parâmetros salvos com sucesso!')}
                className="flex items-center px-3 py-2 bg-petroleum-600 text-white rounded-md text-sm font-medium hover:bg-petroleum-700 shadow-sm dark:shadow-none"
              >
                 Salvar Alterações
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                 <div>
                   <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 border-b pb-2">Cálculo de Absenteísmo</h4>
                   <div className="space-y-4">
                     <div>
                       <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Carga Horária Mensal Padrão (Horas)</label>
                       <input type="number" defaultValue="220" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 sm:text-sm" />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Meta Máxima de Absenteísmo (%)</label>
                       <input type="number" step="0.1" defaultValue="4.0" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 sm:text-sm" />
                     </div>
                   </div>
                 </div>

                 <div>
                   <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 border-b pb-2">Valoração</h4>
                   <div className="space-y-4">
                     <div>
                       <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Custo Médio da Hora (R$)</label>
                       <input type="number" defaultValue="15.50" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 sm:text-sm" />
                     </div>
                     <div className="flex items-start">
                        <input type="checkbox" defaultChecked className="mt-1 h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-petroleum-600 focus:ring-petroleum-500 dark:focus:ring-petroleum-400" />
                        <label className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
                          Utilizar custo específico por cargo (sobrepõe o custo médio global)
                        </label>
                     </div>
                   </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <div>
                   <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                     <h4 className="flex items-center text-sm font-bold text-amber-800 mb-2">
                       <AlertCircle className="w-4 h-4 mr-2" />
                       Fator de Impacto Operacional
                     </h4>
                     <p className="text-xs text-amber-700 mb-3">O multiplicador de impacto aplica um acréscimo no custo das horas perdidas para cobrir despesas indiretas e substituição de turnos.</p>
                     
                     <label className="block text-sm font-medium text-amber-900 mb-1">Multiplicador Atual</label>
                     <div className="flex items-center space-x-2">
                        <select defaultValue="Médio (1.5x - C/ Encargos)" className="border border-amber-300 bg-white dark:bg-slate-900 rounded-md px-3 py-2 text-sm focus:ring-amber-500 focus:border-amber-500 text-slate-700 dark:text-slate-300">
                          <option>Nenhum (1.0x)</option>
                          <option>Baixo (1.2x)</option>
                          <option>Médio (1.5x - C/ Encargos)</option>
                          <option>Alto (2.0x)</option>
                        </select>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cid' && (
          <div className="p-6 flex flex-col h-full animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Manutenção da Base CID-10</h2>
              <div className="flex space-x-2">
                 <button className="flex items-center px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm dark:shadow-none">
                    <Download className="w-4 h-4 mr-2" /> Exportar
                 </button>
                 <button className="flex items-center px-3 py-2 border border-petroleum-300 bg-petroleum-50 text-petroleum-700 rounded-md text-sm font-medium hover:bg-petroleum-100 shadow-sm dark:shadow-none">
                    <Upload className="w-4 h-4 mr-2" /> Importar CSV
                 </button>
                 <button onClick={() => setShowModal('cid')} className="flex items-center px-3 py-2 bg-petroleum-600 text-white rounded-md text-sm font-medium hover:bg-petroleum-700 shadow-sm dark:shadow-none">
                    <Plus className="w-4 h-4 mr-2" /> Novo CID
                 </button>
              </div>
            </div>

            <div className="flex space-x-4 mb-4">
              <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <input type="text" className="w-full pl-9 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 sm:text-sm" placeholder="Buscar por código ou descrição..." />
              </div>
              <select className="border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400">
                <option>Todos os Capítulos</option>
                <option>Capítulo I (Infecciosas)</option>
                <option>Capítulo XIII (Osteomuscular)</option>
              </select>
            </div>

            <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden flex-1 flex flex-col">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-left text-sm flex-1">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium w-full">
                  <tr>
                    <th className="px-4 py-3">Código</th>
                    <th className="px-4 py-3">Descrição Completa</th>
                    <th className="px-4 py-3">Capítulo</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  <tr>
                     <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50 w-24">A09.0</td>
                     <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Outras gastroenterites de origem infecciosa</td>
                     <td className="px-4 py-3 text-slate-500 dark:text-slate-400">I. Algumas dist. infecc. e parasitárias</td>
                     <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">Ativo</span></td>
                     <td className="px-4 py-3 text-right">
                       <button className="text-petroleum-600 hover:text-petroleum-800 p-1"><Edit2 className="w-4 h-4" /></button>
                     </td>
                  </tr>
                  <tr>
                     <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50 w-24">M54.5</td>
                     <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Dor lombar baixa</td>
                     <td className="px-4 py-3 text-slate-500 dark:text-slate-400">XIII. Doenças sist. osteomuscular</td>
                     <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">Ativo</span></td>
                     <td className="px-4 py-3 text-right">
                       <button className="text-petroleum-600 hover:text-petroleum-800 p-1"><Edit2 className="w-4 h-4" /></button>
                     </td>
                  </tr>
                  <tr>
                     <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50 w-24 opacity-50">Z00.0</td>
                     <td className="px-4 py-3 text-slate-700 dark:text-slate-300 opacity-50">Exame médico geral</td>
                     <td className="px-4 py-3 text-slate-500 dark:text-slate-400 opacity-50">XXI. Fatores que influenciam saúde</td>
                     <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">Inativo</span></td>
                     <td className="px-4 py-3 text-right">
                       <button className="text-slate-400 hover:text-slate-800 p-1"><CheckCircle2 className="w-4 h-4" /></button>
                     </td>
                  </tr>
                </tbody>
              </table>
              <div className="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
                <span>Mostrando 3 de 14.500 registros CID.</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'usuarios' && (
          <div className="p-6 flex flex-col h-full animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Usuários e Perfis de Acesso</h2>
              <div className="flex space-x-2">
                 <button className="flex items-center px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm dark:shadow-none">
                    <Download className="w-4 h-4 mr-2" /> Exportar
                 </button>
                 <button onClick={() => setShowModal('usuario')} className="flex items-center px-3 py-2 bg-petroleum-600 text-white rounded-md text-sm font-medium hover:bg-petroleum-700 shadow-sm dark:shadow-none">
                    <Plus className="w-4 h-4 mr-2" /> Novo Usuário
                 </button>
              </div>
            </div>

            <div className="flex space-x-4 mb-4">
              <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <input type="text" className="w-full pl-9 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 sm:text-sm" placeholder="Buscar por nome, email ou matrícula..." />
              </div>
              <select className="border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400">
                <option>Todos os Perfis</option>
                <option>Administrador</option>
                <option>Analista de RH</option>
                <option>Médico/SST</option>
                <option>Gestor de Obra</option>
              </select>
            </div>

            <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden flex-1 flex flex-col">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-left text-sm flex-1">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium w-full">
                  <tr>
                    <th className="px-4 py-3">Nome do Usuário</th>
                    <th className="px-4 py-3">E-mail Corporativo</th>
                    <th className="px-4 py-3">Perfil de Acesso</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800">
                     <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">Renata Silva</td>
                     <td className="px-4 py-3 text-slate-700 dark:text-slate-300">renata.silva@construtora.com.br</td>
                     <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Analista de RH</td>
                     <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">Ativo</span></td>
                     <td className="px-4 py-3 text-right">
                       <button className="text-petroleum-600 hover:text-petroleum-800 p-1"><Edit2 className="w-4 h-4" /></button>
                     </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800">
                     <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">Dr. Paulo Souza</td>
                     <td className="px-4 py-3 text-slate-700 dark:text-slate-300">paulo.souza@construtora.com.br</td>
                     <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Médico/SST</td>
                     <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">Ativo</span></td>
                     <td className="px-4 py-3 text-right">
                       <button className="text-petroleum-600 hover:text-petroleum-800 p-1"><Edit2 className="w-4 h-4" /></button>
                     </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800">
                     <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50 opacity-50">João Marcos</td>
                     <td className="px-4 py-3 text-slate-700 dark:text-slate-300 opacity-50">joao.marcos@construtora.com.br</td>
                     <td className="px-4 py-3 text-slate-700 dark:text-slate-300 opacity-50">Gestor de Obra</td>
                     <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">Inativo</span></td>
                     <td className="px-4 py-3 text-right">
                       <button className="text-slate-400 hover:text-slate-800 p-1"><CheckCircle2 className="w-4 h-4" /></button>
                     </td>
                  </tr>
                </tbody>
              </table>
              <div className="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
                <span>Mostrando 3 de 18 usuários.</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'obras' && (
          <div className="p-6 flex flex-col h-full animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Obras e Centros de Custo</h2>
              <div className="flex space-x-2">
                 <button className="flex items-center px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm dark:shadow-none">
                    <Download className="w-4 h-4 mr-2" /> Exportar
                 </button>
                 <button onClick={() => setShowModal('obra')} className="flex items-center px-3 py-2 bg-petroleum-600 text-white rounded-md text-sm font-medium hover:bg-petroleum-700 shadow-sm dark:shadow-none">
                    <Plus className="w-4 h-4 mr-2" /> Nova Obra
                 </button>
              </div>
            </div>

            <div className="flex space-x-4 mb-4">
               <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <input type="text" className="w-full pl-9 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 sm:text-sm" placeholder="Buscar por nome da obra ou C.C...." />
               </div>
               <select className="border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400">
                 <option>Todas as Obras (Ativas)</option>
                 <option>Obras Finalizadas</option>
               </select>
            </div>

            <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden flex-1 flex flex-col">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-left text-sm flex-1">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium w-full">
                  <tr>
                    <th className="px-4 py-3">Cód. Obra</th>
                    <th className="px-4 py-3">Nome da Obra / Unidade</th>
                    <th className="px-4 py-3">Centro de Custo</th>
                    <th className="px-4 py-3">Gestor Responsável</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800">
                     <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">001</td>
                     <td className="px-4 py-3 text-slate-900 dark:text-slate-50">Obra Alfa - SP</td>
                     <td className="px-4 py-3 text-slate-700 dark:text-slate-300"><span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded inline-block">CC-045-SP</span></td>
                     <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Roberto Costa</td>
                     <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">Em andamento</span></td>
                     <td className="px-4 py-3 text-right">
                       <button className="text-petroleum-600 hover:text-petroleum-800 p-1"><Edit2 className="w-4 h-4" /></button>
                     </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800">
                     <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">002</td>
                     <td className="px-4 py-3 text-slate-900 dark:text-slate-50">Obra Beta - RJ</td>
                     <td className="px-4 py-3 text-slate-700 dark:text-slate-300"><span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded inline-block">CC-089-RJ</span></td>
                     <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Ana Lúcia</td>
                     <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">Em andamento</span></td>
                     <td className="px-4 py-3 text-right">
                       <button className="text-petroleum-600 hover:text-petroleum-800 p-1"><Edit2 className="w-4 h-4" /></button>
                     </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800">
                     <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">MZ-01</td>
                     <td className="px-4 py-3 text-slate-900 dark:text-slate-50">Matriz Corporativa</td>
                     <td className="px-4 py-3 text-slate-700 dark:text-slate-300"><span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded inline-block">CC-001-MZ</span></td>
                     <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Diretoria</td>
                     <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">Administrativa</span></td>
                     <td className="px-4 py-3 text-right">
                       <button className="text-petroleum-600 hover:text-petroleum-800 p-1"><Edit2 className="w-4 h-4" /></button>
                     </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'cargos' && (
          <div className="p-6 flex flex-col h-full animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Cargos e Setores</h2>
              <div className="flex space-x-2">
                 <button onClick={() => setShowModal('cargo')} className="flex items-center px-3 py-2 bg-petroleum-600 text-white rounded-md text-sm font-medium hover:bg-petroleum-700 shadow-sm dark:shadow-none">
                    <Plus className="w-4 h-4 mr-2" /> Novo Cargo
                 </button>
              </div>
            </div>

            <div className="flex space-x-4 mb-4">
               <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <input type="text" className="w-full pl-9 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 sm:text-sm" placeholder="Buscar por cargo..." />
               </div>
               <select className="border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400">
                 <option>Todos os Setores</option>
                 <option>Operacional</option>
                 <option>Administrativo</option>
                 <option>Engenharia</option>
               </select>
            </div>

            <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden flex-1 flex flex-col">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-left text-sm flex-1">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium w-full">
                  <tr>
                    <th className="px-4 py-3">Nome do Cargo</th>
                    <th className="px-4 py-3">Setor</th>
                    <th className="px-4 py-3 text-right">Custo Hora Específico</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800">
                     <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">Pedreiro C</td>
                     <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Operacional</td>
                     <td className="px-4 py-3 text-right text-petroleum-700 font-medium">R$ 14,20/h</td>
                     <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">Ativo</span></td>
                     <td className="px-4 py-3 text-right">
                       <button className="text-petroleum-600 hover:text-petroleum-800 p-1"><Edit2 className="w-4 h-4" /></button>
                     </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800">
                     <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">Engenheiro Civil Junior</td>
                     <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Engenharia</td>
                     <td className="px-4 py-3 text-right text-slate-500 dark:text-slate-400 text-xs text-italic">Padrão (Não configurado)</td>
                     <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">Ativo</span></td>
                     <td className="px-4 py-3 text-right">
                       <button className="text-petroleum-600 hover:text-petroleum-800 p-1"><Edit2 className="w-4 h-4" /></button>
                     </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'tipos' && (
          <div className="p-6 flex flex-col h-full animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Tipos de Documento</h2>
              <button onClick={() => setShowModal('tipo')} className="flex items-center px-3 py-2 bg-petroleum-600 text-white rounded-md text-sm font-medium hover:bg-petroleum-700 shadow-sm dark:shadow-none">
                 <Plus className="w-4 h-4 mr-2" /> Novo Tipo
              </button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5 shadow-sm dark:shadow-none">
                 <div className="flex justify-between items-start">
                   <div className="flex items-center mb-2">
                     <span className="w-8 h-8 rounded-full bg-petroleum-100 flex items-center justify-center mr-3">
                       <FileType className="w-4 h-4 text-petroleum-600" />
                     </span>
                     <h3 className="font-bold text-slate-900 dark:text-slate-50">Atestado Médico</h3>
                   </div>
                   <button className="text-petroleum-600 hover:text-petroleum-800 p-1"><Edit2 className="w-4 h-4" /></button>
                 </div>
                 <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 mt-2">Documento oficial de afastamento por motivo de saúde justificado por médico/dentista.</p>
                 <div className="flex items-center space-x-2 text-xs font-medium">
                   <span className="px-2 py-1 bg-rose-50 text-rose-700 rounded border border-rose-100">Gera Absenteísmo</span>
                   <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">Exige CID</span>
                 </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5 shadow-sm dark:shadow-none">
                 <div className="flex justify-between items-start">
                   <div className="flex items-center mb-2">
                     <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                       <FileType className="w-4 h-4 text-amber-600" />
                     </span>
                     <h3 className="font-bold text-slate-900 dark:text-slate-50">Declaração de Comparecimento</h3>
                   </div>
                   <button className="text-petroleum-600 hover:text-petroleum-800 p-1"><Edit2 className="w-4 h-4" /></button>
                 </div>
                 <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 mt-2">Comprovante de presença em consulta não gerando dia completo de atestado (cobrança por horas).</p>
                 <div className="flex items-center space-x-2 text-xs font-medium">
                   <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded border border-emerald-100">Não gera Absenteísmo</span>
                   <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">Cálculo em Horas</span>
                 </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'audit' && (
          <div className="p-6 animate-in fade-in duration-300 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Logs de Auditoria do Sistema</h2>
              <button className="flex items-center px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm dark:shadow-none">
                <Search className="w-4 h-4 mr-2" /> Filtrar Registros
              </button>
            </div>
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm dark:shadow-none overflow-hidden flex-1">
              <div className="overflow-x-auto h-full">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                    <tr>
                      <th className="px-6 py-3 whitespace-nowrap">Data / Hora</th>
                      <th className="px-6 py-3 whitespace-nowrap">Usuário</th>
                      <th className="px-6 py-3 whitespace-nowrap">Ação</th>
                      <th className="px-6 py-3 whitespace-nowrap">Módulo</th>
                      <th className="px-6 py-3">Detalhes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    {[
                      { time: '11 Jun 2026, 14:32', user: 'Admin Sistema', action: 'Configuração Alterada', module: 'Parâmetros', detail: 'Alterada meta de absenteísmo para 4.0%' },
                      { time: '11 Jun 2026, 11:15', user: 'Renata Silva', action: 'Aprovação', module: 'Fila de Análise', detail: 'Documento RM-2810 aprovado com sucesso' },
                      { time: '11 Jun 2026, 10:45', user: 'Renata Silva', action: 'Reprovação', module: 'Fila de Análise', detail: 'Documento RM-2101 reprovado (incompleto)' },
                      { time: '11 Jun 2026, 09:12', user: 'Julio (Supervisor)', action: 'Lançamento', module: 'Novo Atestado', detail: 'Criou rascunho de atestado para matrícula 10452' },
                      { time: '11 Jun 2026, 08:30', user: 'Admin Sistema', action: 'Login', module: 'Autenticação', detail: 'Acesso via portal web autorizado' },
                    ].map((log, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                        <td className="px-6 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400 flex items-center">
                          <Clock className="w-4 h-4 mr-2" /> {log.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900 dark:text-slate-50">{log.user}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                            log.action === 'Login' ? "bg-blue-100 text-blue-800" :
                            log.action.includes('Aprov') ? "bg-emerald-100 text-emerald-800" :
                            log.action.includes('Reprov') ? "bg-rose-100 text-rose-800" :
                            "bg-amber-100 text-amber-800 border border-amber-200"
                          )}>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400">{log.module}</td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300 truncate max-w-xs">{log.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Mock for other tabs */}
        {activeTab !== 'parametros' && activeTab !== 'cid' && activeTab !== 'usuarios' && activeTab !== 'obras' && activeTab !== 'cargos' && activeTab !== 'tipos' && activeTab !== 'audit' && (
          <div className="p-8 flex items-center justify-center h-full text-slate-500 dark:text-slate-400 font-medium">
            Módulo {menuItems.find(m => m.id === activeTab)?.label} (Em desenvolvimento)
          </div>
        )}
      </div>

      {showModal === 'obra' && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 animate-in fade-in">
           <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
               <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Nova Obra / Unidade</h3>
               <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-slate-600">
                 <XCircle className="w-5 h-5" />
               </button>
             </div>
             
             <div className="p-6 space-y-4">
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cód. Obra <span className="text-rose-500">*</span></label>
                   <input type="text" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400" placeholder="Ex: 003" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Centro de Custo <span className="text-rose-500">*</span></label>
                   <input type="text" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400" placeholder="Ex: CC-102-MG" />
                 </div>
                 <div className="col-span-2">
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome da Obra / Unidade <span className="text-rose-500">*</span></label>
                   <input type="text" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400" placeholder="Ex: Obra Delta - MG" />
                 </div>
                 <div className="col-span-2">
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Gestor Responsável</label>
                   <select className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400">
                     <option>Selecione um gestor...</option>
                     <option>Roberto Costa</option>
                     <option>Ana Lúcia</option>
                   </select>
                 </div>
                 <div className="col-span-2">
                   <label className="flex items-center">
                     <input type="checkbox" defaultChecked className="rounded border-slate-300 dark:border-slate-600 text-petroleum-600 shadow-sm dark:shadow-none focus:ring-petroleum-500 dark:focus:ring-petroleum-400 h-4 w-4" />
                     <span className="ml-2 text-sm text-slate-700 dark:text-slate-300 font-medium">Obra Ativa</span>
                   </label>
                 </div>
               </div>
             </div>

             <div className="bg-slate-50 dark:bg-slate-800 p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-3">
               <button onClick={() => setShowModal(null)} className="py-2 px-4 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-md font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                 Cancelar
               </button>
               <button onClick={() => { setShowModal(null); showToast('Obra salva com sucesso!'); }} className="py-2 px-4 bg-petroleum-600 text-white rounded-md font-medium text-sm hover:bg-petroleum-700 transition-colors shadow-sm dark:shadow-none">
                 Salvar Obra
               </button>
             </div>
           </div>
        </div>
      )}

      {showModal === 'usuario' && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 animate-in fade-in">
           <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
               <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Novo Usuário</h3>
               <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-slate-600">
                 <XCircle className="w-5 h-5" />
               </button>
             </div>
             
             <div className="p-6 space-y-4">
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome Completo <span className="text-rose-500">*</span></label>
                 <input type="text" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400" placeholder="Nome do usuário" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">E-mail Corporativo <span className="text-rose-500">*</span></label>
                 <input type="email" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400" placeholder="email@construtora.com.br" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Perfil de Acesso <span className="text-rose-500">*</span></label>
                   <select className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400">
                     <option>Analista de RH</option>
                     <option>Administrador</option>
                     <option>Médico/SST</option>
                     <option>Gestor de Obra</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Matrícula (opcional)</label>
                   <input type="text" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400" placeholder="Vínculo ERP" />
                 </div>
               </div>
               <div>
                 <label className="flex items-center">
                   <input type="checkbox" defaultChecked className="rounded border-slate-300 dark:border-slate-600 text-petroleum-600 shadow-sm dark:shadow-none focus:ring-petroleum-500 dark:focus:ring-petroleum-400 h-4 w-4" />
                   <span className="ml-2 text-sm text-slate-700 dark:text-slate-300 font-medium">Enviar e-mail para criação de senha</span>
                 </label>
               </div>
             </div>

             <div className="bg-slate-50 dark:bg-slate-800 p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-3">
               <button onClick={() => setShowModal(null)} className="py-2 px-4 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-md font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                 Cancelar
               </button>
               <button onClick={() => { setShowModal(null); showToast('Usuário cadastrado com sucesso!'); }} className="py-2 px-4 bg-petroleum-600 text-white rounded-md font-medium text-sm hover:bg-petroleum-700 transition-colors shadow-sm dark:shadow-none">
                 Salvar Usuário
               </button>
             </div>
           </div>
        </div>
      )}

      {showModal === 'cid' && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 animate-in fade-in">
           <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
               <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Novo CID-10</h3>
               <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-slate-600">
                 <XCircle className="w-5 h-5" />
               </button>
             </div>
             
             <div className="p-6 space-y-4">
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Código CID <span className="text-rose-500">*</span></label>
                 <input type="text" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400" placeholder="Ex: A09.0" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Descrição Completa <span className="text-rose-500">*</span></label>
                 <input type="text" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400" placeholder="Descrição do código CID" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Capítulo <span className="text-rose-500">*</span></label>
                 <select className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400">
                   <option>Selecione o capítulo...</option>
                   <option>I. Algumas doenças infecciosas e parasitárias</option>
                   <option>XIII. Doenças do sistema osteomuscular</option>
                   <option>XXI. Fatores que influenciam o estado de saúde</option>
                 </select>
               </div>
               <div>
                 <label className="flex items-center">
                   <input type="checkbox" defaultChecked className="rounded border-slate-300 dark:border-slate-600 text-petroleum-600 shadow-sm dark:shadow-none focus:ring-petroleum-500 dark:focus:ring-petroleum-400 h-4 w-4" />
                   <span className="ml-2 text-sm text-slate-700 dark:text-slate-300 font-medium">Ativo (visível nos lançamentos)</span>
                 </label>
               </div>
             </div>

             <div className="bg-slate-50 dark:bg-slate-800 p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-3">
               <button onClick={() => setShowModal(null)} className="py-2 px-4 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-md font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                 Cancelar
               </button>
               <button onClick={() => { setShowModal(null); showToast('Registro CID salvo com sucesso!'); }} className="py-2 px-4 bg-petroleum-600 text-white rounded-md font-medium text-sm hover:bg-petroleum-700 transition-colors shadow-sm dark:shadow-none">
                 Salvar CID
               </button>
             </div>
           </div>
        </div>
      )}

      {/* Toast Notification */}
      {showModal === 'cargo' && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 animate-in fade-in">
           <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
               <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Novo Cargo</h3>
               <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-slate-600">
                 <XCircle className="w-5 h-5" />
               </button>
             </div>
             
             <div className="p-6 space-y-4">
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome do Cargo <span className="text-rose-500">*</span></label>
                 <input type="text" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400" placeholder="Ex: Mestre de Obras" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Setor <span className="text-rose-500">*</span></label>
                 <select className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400">
                   <option>Operacional</option>
                   <option>Administrativo</option>
                   <option>Engenharia</option>
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Custo Hora Específico (R$)</label>
                 <input type="number" step="0.01" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400" placeholder="Deixe em branco para usar o padrão" />
               </div>
             </div>

             <div className="bg-slate-50 dark:bg-slate-800 p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-3">
               <button onClick={() => setShowModal(null)} className="py-2 px-4 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-md font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                 Cancelar
               </button>
               <button onClick={() => { setShowModal(null); showToast('Cargo salvo com sucesso!'); }} className="py-2 px-4 bg-petroleum-600 text-white rounded-md font-medium text-sm hover:bg-petroleum-700 transition-colors shadow-sm dark:shadow-none">
                 Salvar Cargo
               </button>
             </div>
           </div>
        </div>
      )}

      {showModal === 'tipo' && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 animate-in fade-in">
           <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
               <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Novo Tipo de Documento</h3>
               <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-slate-600">
                 <XCircle className="w-5 h-5" />
               </button>
             </div>
             
             <div className="p-6 space-y-4">
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome do Tipo <span className="text-rose-500">*</span></label>
                 <input type="text" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400" placeholder="Ex: Atestado de Luto" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Descrição</label>
                 <input type="text" className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400" placeholder="Instrução para uso..." />
               </div>
               <div className="space-y-2 mt-4">
                 <label className="flex items-center">
                   <input type="checkbox" className="rounded border-slate-300 dark:border-slate-600 text-petroleum-600 shadow-sm dark:shadow-none focus:ring-petroleum-500 dark:focus:ring-petroleum-400 h-4 w-4" />
                   <span className="ml-2 text-sm text-slate-700 dark:text-slate-300 font-medium">Gera Absenteísmo (Desconta horas originais)</span>
                 </label>
                 <label className="flex items-center">
                   <input type="checkbox" className="rounded border-slate-300 dark:border-slate-600 text-petroleum-600 shadow-sm dark:shadow-none focus:ring-petroleum-500 dark:focus:ring-petroleum-400 h-4 w-4" />
                   <span className="ml-2 text-sm text-slate-700 dark:text-slate-300 font-medium">Exige CID para envio</span>
                 </label>
               </div>
             </div>

             <div className="bg-slate-50 dark:bg-slate-800 p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-3">
               <button onClick={() => setShowModal(null)} className="py-2 px-4 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-md font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                 Cancelar
               </button>
               <button onClick={() => { setShowModal(null); showToast('Tipo de documento salvo com sucesso!'); }} className="py-2 px-4 bg-petroleum-600 text-white rounded-md font-medium text-sm hover:bg-petroleum-700 transition-colors shadow-sm dark:shadow-none">
                 Salvar Tipo
               </button>
             </div>
           </div>
        </div>
      )}

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
