import { useState } from 'react';
import { 
  Building, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Users, 
  CalendarDays, 
  Activity,
  Filter,
  Download,
  XCircle,
  FileText
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, ComposedChart, Legend, AreaChart, Area
} from 'recharts';
import { cn } from '../utils';
import { ExportModal } from '../components/ExportModal';

const formatCurrency = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

const custoMensalData = [
  { name: 'Jan', custo: 32000, dias: 210 },
  { name: 'Fev', custo: 38000, dias: 245 },
  { name: 'Mar', custo: 29000, dias: 190 },
  { name: 'Abr', custo: 45000, dias: 310 },
  { name: 'Mai', custo: 41000, dias: 280 },
  { name: 'Jun', custo: 48500, dias: 330 },
];

const custoPorObraData = [
  { name: 'Obra Alfa - SP', custo: 18500 },
  { name: 'Obra Beta - RJ', custo: 12400 },
  { name: 'Cond. Omega - MG', custo: 8900 },
  { name: 'Torre Sul - PR', custo: 5200 },
  { name: 'Logística', custo: 3500 },
];

const obraTableData = [
  { obra: 'Obra Alfa - SP', dias: 120, horas: 45, custo: 18500, txAbs: '5.2%', atestados: 45 },
  { obra: 'Obra Beta - RJ', dias: 85, horas: 30, custo: 12400, txAbs: '4.8%', atestados: 32 },
  { obra: 'Cond. Omega - MG', dias: 60, horas: 20, custo: 8900, txAbs: '3.5%', atestados: 21 },
  { obra: 'Torre Sul - PR', dias: 45, horas: 15, custo: 5200, txAbs: '2.9%', atestados: 14 },
];

const tipoDocData = [
  { name: 'Atestados Médicos', value: 85, color: '#0d9488' }, // Petroleum
  { name: 'Declarações', value: 15, color: '#f59e0b' }, // Amber
];

const cidData = [
  { cid: 'Cap. X - Doenças Respiratórias', casos: 42, dias: 115, custo: 15800 },
  { cid: 'Cap. XIII - Sist. Osteomuscular', casos: 38, dias: 160, custo: 22400 },
  { cid: 'Cap. I - Infecciosas / Parasitárias', casos: 25, dias: 65, custo: 8200 },
  { cid: 'Cap. XXI - Contatos Serv. Saúde', casos: 15, dias: 8, custo: 1200 },
];

function KPICard({ title, value, subtext, icon: Icon, trend, trendValue, isCritical = false }: any) {
  return (
    <div className={cn("bg-white dark:bg-slate-900 p-5 rounded-xl border flex flex-col justify-between", isCritical ? "border-rose-200 shadow-rose-100/50 shadow-sm dark:shadow-none" : "border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none")}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className={cn("text-2xl font-bold mt-1", isCritical ? "text-rose-700" : "text-slate-900 dark:text-slate-50")}>{value}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center">
            {trend === 'up' ? (
              <TrendingUp className="w-3 h-3 text-rose-500 mr-1" />
            ) : trend === 'down' ? (
              <TrendingDown className="w-3 h-3 text-emerald-500 mr-1" />
            ) : null}
            <span className={cn("font-medium mr-1", trend === 'up' ? "text-rose-600" : trend === 'down' ? "text-emerald-600" : "")}>
              {trendValue}
            </span>
            {subtext}
          </p>
        </div>
        <div className={cn("p-2 rounded-lg", isCritical ? "bg-rose-50" : "bg-slate-50 dark:bg-slate-800")}>
          <Icon className={cn("w-5 h-5", isCritical ? "text-rose-600" : "text-slate-500 dark:text-slate-400")} />
        </div>
      </div>
    </div>
  );
}

export function Analytics() {
  const [showExport, setShowExport] = useState(false);

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Global Filters */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Painéis Analíticos e Custos</h2>
          <button onClick={() => setShowExport(true)} className="flex items-center px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm dark:shadow-none">
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatório
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none">
          <div className="flex items-center space-x-2 mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <Filter className="w-4 h-4" />
            <span>Filtros Globais</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3">
            <select className="w-full text-sm border-slate-300 dark:border-slate-600 rounded-md shadow-sm dark:shadow-none focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400">
              <option>Últimos 30 dias</option>
              <option>Mês Atual</option>
              <option>Trimestre Atual</option>
              <option>Ano Atual (2026)</option>
            </select>
            <select className="w-full text-sm border-slate-300 dark:border-slate-600 rounded-md shadow-sm dark:shadow-none focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400">
              <option>Todas as Obras</option>
              <option>Obra Alfa - SP</option>
              <option>Obra Beta - RJ</option>
              <option>Cond. Omega - MG</option>
            </select>
            <select className="w-full text-sm border-slate-300 dark:border-slate-600 rounded-md shadow-sm dark:shadow-none focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400">
              <option>Todos os Setores</option>
              <option>Operacional</option>
              <option>Administrativo</option>
              <option>Engenharia</option>
            </select>
            <select className="w-full text-sm border-slate-300 dark:border-slate-600 rounded-md shadow-sm dark:shadow-none focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400">
              <option>Todos os Cargos</option>
              <option>Pedreiro</option>
              <option>Servente</option>
              <option>Mestre de Obras</option>
            </select>
            <select className="w-full text-sm border-slate-300 dark:border-slate-600 rounded-md shadow-sm dark:shadow-none focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400">
              <option>Ambos (Atest. / Decl.)</option>
              <option>Atestado Médico</option>
              <option>Declaração de Comparecimento</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Custo Total (Afastamentos)" 
          value={formatCurrency(48500)} 
          subtext="vs mês anterior" 
          icon={DollarSign} 
          trend="up" 
          trendValue="+12%"
          isCritical
        />
        <KPICard 
          title="Custo Médio / Atestado" 
          value={formatCurrency(692)} 
          subtext="vs mês anterior" 
          icon={Activity} 
          trend="up" 
          trendValue="+5%"
        />
        <KPICard 
          title="Custo Mensal (Média por Obra)" 
          value={formatCurrency(9700)} 
          subtext="Estável" 
          icon={Building} 
          trend="down" 
          trendValue="-2%"
        />
        <KPICard 
          title="Taxa de Absenteísmo" 
          value="4.2%" 
          subtext="vs 3.8% mês anterior" 
          icon={Users} 
          trend="up" 
          trendValue="+0.4%"
          isCritical
        />
      </div>

      {/* Custo por Obra */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none lg:col-span-1">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Custo por Obra (R$)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={custoPorObraData} margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--chart-grid)" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: 'var(--chart-text)', fontSize: 12}} tickFormatter={(v) => `R$${v/1000}k`} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: 'var(--chart-text)', fontSize: 11}} width={90} />
                <RechartsTooltip cursor={{fill: 'var(--chart-tooltip-border)'}} formatter={(val: number) => formatCurrency(val)} contentStyle={{ borderRadius: '8px', border: '1px solid var(--chart-tooltip-border)', backgroundColor: 'var(--chart-tooltip-bg)', color: 'var(--chart-text)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="custo" name="Custo" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none lg:col-span-2 overflow-auto">
           <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Detalhamento por Obra</h3>
           <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-left text-sm">
             <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
               <tr>
                 <th className="px-4 py-3">Obra</th>
                 <th className="px-4 py-3 text-right">Dias Perd.</th>
                 <th className="px-4 py-3 text-right">Hrs Perd.</th>
                 <th className="px-4 py-3 text-right">Tx Absenteísmo</th>
                 <th className="px-4 py-3 text-right">Custo Estimado</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
               {obraTableData.map((item, i) => (
                 <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                   <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{item.obra}</td>
                   <td className="px-4 py-3 text-right text-slate-700 dark:text-slate-300">{item.dias}</td>
                   <td className="px-4 py-3 text-right text-slate-700 dark:text-slate-300">{item.horas}</td>
                   <td className="px-4 py-3 text-right text-slate-700 dark:text-slate-300 font-semibold">{item.txAbs}</td>
                   <td className="px-4 py-3 text-right text-petroleum-700 font-semibold">{formatCurrency(item.custo)}</td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>

      {/* Tipos e CID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Composição de Custos</h3>
          <div className="h-64 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tipoDocData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {tipoDocData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(val: number) => `${val}% do total`} contentStyle={{ borderRadius: '8px', border: '1px solid var(--chart-tooltip-border)', backgroundColor: 'var(--chart-tooltip-bg)', color: 'var(--chart-text)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none lg:col-span-2 overflow-auto">
           <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Top Capítulos CID (Impacto)</h3>
           <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-left text-sm">
             <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
               <tr>
                 <th className="px-4 py-3">Capítulo CID-10</th>
                 <th className="px-4 py-3 text-right">Casos</th>
                 <th className="px-4 py-3 text-right">Dias Perdidos</th>
                 <th className="px-4 py-3 text-right">Custo Estimado</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
               {cidData.map((item, i) => (
                 <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                   <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{item.cid}</td>
                   <td className="px-4 py-3 text-right text-slate-700 dark:text-slate-300">{item.casos}</td>
                   <td className="px-4 py-3 text-right text-slate-700 dark:text-slate-300">{item.dias}</td>
                   <td className="px-4 py-3 text-right text-rose-600 font-semibold">{formatCurrency(item.custo)}</td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>

      {/* Recorrência e Severidade */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Evolução de Custo vs Dias Perdidos</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={custoMensalData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--chart-text)', fontSize: 12}} dy={10} />
                <YAxis yAxisId="left" tickFormatter={(v) => `R$${v/1000}k`} axisLine={false} tickLine={false} tick={{fill: 'var(--chart-text)', fontSize: 12}} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: 'var(--chart-text)', fontSize: 12}} />
                <RechartsTooltip 
                  formatter={(val: number, name: string) => name === 'Custo (R$)' ? formatCurrency(val) : val}
                  contentStyle={{ borderRadius: '8px', border: '1px solid var(--chart-tooltip-border)', backgroundColor: 'var(--chart-tooltip-bg)', color: 'var(--chart-text)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Bar yAxisId="left" dataKey="custo" name="Custo (R$)" fill="#0d9488" radius={[4, 4, 0, 0]} barSize={30} />
                <Line yAxisId="right" type="monotone" dataKey="dias" name="Dias Perdidos" stroke="#f59e0b" strokeWidth={3} dot={{r: 4}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none">
           <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
             <AlertTriangle className="w-5 h-5 mr-2 text-rose-500" />
             Top Colaboradores (Custo)
           </h3>
           <div className="space-y-4">
             {[
               { nome: 'José Almeida', cargo: 'Encanador', custo: 4500, dias: 25 },
               { nome: 'Carlos E. Silva', cargo: 'Pedreiro', custo: 3200, dias: 15 },
               { nome: 'Marcos Paulo', cargo: 'Servente', custo: 2800, dias: 18 },
               { nome: 'Ana Souza', cargo: 'Engenheira', custo: 2100, dias: 4 },
             ].map((collab, idx) => (
               <div key={idx} className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3 last:border-0 last:pb-0">
                 <div>
                   <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{collab.nome}</p>
                   <p className="text-xs text-slate-500 dark:text-slate-400">{collab.cargo} • {collab.dias} dias perd.</p>
                 </div>
                 <div className="text-right font-medium text-sm text-petroleum-700">
                   {formatCurrency(collab.custo)}
                 </div>
               </div>
             ))}
           </div>
           <button className="mt-4 w-full text-center text-sm font-medium text-petroleum-600 hover:text-petroleum-700 py-2 bg-petroleum-50 rounded-lg transition-colors">
             Ver Ranking Completo
           </button>
        </div>
      </div>

      {showExport && <ExportModal onClose={() => setShowExport(false)} />}
    </div>
  );
}
