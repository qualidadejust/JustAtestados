import { useState } from 'react';
import { Building, TrendingDown, TrendingUp, AlertTriangle, Clock, CalendarDays, FileCheck, XCircle, LayoutGrid, Save, Lock, Unlock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell, PieChart, Pie } from 'recharts';
import { Responsive as ResponsiveGridLayout, useContainerWidth } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { cn } from '../utils';

const formatCurrency = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

const monthlyTrend = [
  { name: 'Jan', atestados: 45, declaracoes: 80 },
  { name: 'Fev', atestados: 52, declaracoes: 75 },
  { name: 'Mar', atestados: 38, declaracoes: 85 },
  { name: 'Abr', atestados: 65, declaracoes: 90 },
  { name: 'Mai', atestados: 48, declaracoes: 82 },
  { name: 'Jun', atestados: 70, declaracoes: 95 },
];

const obraImpactData = [
  { name: 'Obra Alfa - SP', diasPerdidos: 120, horasPerdidas: 45 },
  { name: 'Obra Beta - RJ', diasPerdidos: 85, horasPerdidas: 30 },
  { name: 'Cond. Omega - MG', diasPerdidos: 60, horasPerdidas: 20 },
  { name: 'Torre Sul - PR', diasPerdidos: 45, horasPerdidas: 15 },
  { name: 'Logística - Matriz', diasPerdidos: 20, horasPerdidas: 8 },
];

const docTypeData = [
  { name: 'Atestados Médicos', value: 70, color: '#0d9488' },
  { name: 'Declarações Comparecimento', value: 95, color: '#f59e0b' },
];

function KPICard({ title, value, subtext, icon: Icon, trend, trendValue, isCritical = false }: any) {
  return (
    <div className={cn("bg-white dark:bg-slate-900 p-5 rounded-xl border h-full w-full", isCritical ? "border-rose-200 shadow-rose-100/50 shadow-sm dark:shadow-none" : "border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none")}>
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

const defaultLayouts = {
  lg: [
    { i: 'kpi1', x: 0, y: 0, w: 3, h: 2 },
    { i: 'kpi2', x: 3, y: 0, w: 3, h: 2 },
    { i: 'kpi3', x: 6, y: 0, w: 3, h: 2 },
    { i: 'kpi4', x: 9, y: 0, w: 3, h: 2 },
    { i: 'chartArea', x: 0, y: 2, w: 8, h: 4 },
    { i: 'chartPie', x: 8, y: 2, w: 4, h: 4 },
    { i: 'chartBar', x: 0, y: 6, w: 6, h: 4 },
    { i: 'queueTable', x: 6, y: 6, w: 6, h: 4 },
  ]
};

export function Dashboard() {
  const [showAlert, setShowAlert] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [layouts, setLayouts] = useState(defaultLayouts);
  const { width, containerRef, mounted } = useContainerWidth();

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {showAlert && (
        <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-lg p-4 flex items-start animate-in slide-in-from-top-2">
          <AlertTriangle className="w-5 h-5 text-rose-600 mt-0.5 mr-3 shrink-0" />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-rose-800 dark:text-rose-200">Alerta Crítico de Absenteísmo</h4>
            <p className="text-sm text-rose-700 dark:text-rose-300 mt-1">
              O colaborador <strong>José Almeida</strong> (Obra Beta - RJ) atingiu 15 dias de ausência consecutivos no período.
              Ação requerida: Encaminhamento obrigatório ao INSS / Medicina do Trabalho.
            </p>
          </div>
          <button onClick={() => setShowAlert(false)} className="text-rose-500 hover:text-rose-700 p-1">
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 border-b-2 border-petroleum-500 inline-block pb-1">Visão Geral do Mês (Jun/2026)</h2>
        </div>
        <div className="flex space-x-2 items-center">
          <button 
            onClick={() => setIsEditMode(!isEditMode)}
            className={cn("flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors mr-2", 
              isEditMode 
                ? "bg-petroleum-100 text-petroleum-800 border-petroleum-200 border" 
                : "bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50")}
          >
            {isEditMode ? <><Save className="w-4 h-4 mr-2" /> Salvar Layout</> : <><Unlock className="w-4 h-4 mr-2" /> Editar Dashboard</>}
          </button>
          <select className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm rounded-md focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 p-2 font-medium">
            <option>Todas as Obras</option>
            <option>Obra Alfa - SP</option>
            <option>Obra Beta - RJ</option>
          </select>
          <select className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm rounded-md focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 p-2 font-medium">
            <option>Mês Atual</option>
            <option>Trimestre</option>
            <option>Ano</option>
          </select>
        </div>
      </div>

      {isEditMode && (
        <div className="bg-petroleum-50 p-3 rounded-lg border-petroleum-200 border text-petroleum-800 text-sm font-medium animate-in slide-in-from-top-2 flex items-center">
          <LayoutGrid className="w-5 h-5 mr-2" />
          Modo de edição ativado: Arraste ou redimensione os painéis para personalizar sua visão.
        </div>
      )}

      <div className="-mx-4" ref={containerRef}>
      {mounted && (
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        width={width}
        isDraggable={isEditMode}
        isResizable={isEditMode}
        onLayoutChange={(currentLayout, allLayouts) => {
          if (isEditMode) setLayouts(allLayouts);
        }}
      >
        <div key="kpi1">
          <KPICard title="Taxa de Absenteísmo" value="4.2%" subtext="vs 3.8% mês anterior" icon={AlertTriangle} trend="up" trendValue="+0.4%" isCritical />
        </div>
        <div key="kpi2">
          <KPICard title="Dias Perdidos (Atestados)" value="330" subtext="vs 285 mês anterior" icon={CalendarDays} trend="up" trendValue="+15%" />
        </div>
        <div key="kpi3">
          <KPICard title="Horas Perdidas (Declarações)" value="118h" subtext="vs 120h mês anterior" icon={Clock} trend="down" trendValue="-2h" />
        </div>
        <div key="kpi4">
          <KPICard title="Custo Estimado" value={formatCurrency(48500)} subtext="Impacto direto" icon={Building} trend="up" trendValue="+12%" />
        </div>
        
        <div key="chartArea" className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none h-full flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center shrink-0">
            <TrendingUp className="w-5 h-5 mr-2 text-slate-400" />
            Evolução de Documentos
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAtestado" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDecl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--chart-text)', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--chart-text)', fontSize: 12}} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: '1px solid var(--chart-tooltip-border)', backgroundColor: 'var(--chart-tooltip-bg)', color: 'var(--chart-text)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" name="Atestados Médicos (Dias)" dataKey="atestados" stroke="#0d9488" strokeWidth={2} fillOpacity={1} fill="url(#colorAtestado)" />
                <Area type="monotone" name="Declarações (Horas)" dataKey="declaracoes" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorDecl)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div key="chartPie" className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none h-full flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2 self-start w-full flex items-center shrink-0">
            <FileCheck className="w-5 h-5 mr-2 text-slate-400" />
            Proporção por Tipo
          </h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={docTypeData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={5} dataKey="value">
                  {docTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div key="chartBar" className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none h-full flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center shrink-0">
            <Building className="w-5 h-5 mr-2 text-slate-400" />
            Impacto Maior por Obra
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={obraImpactData} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--chart-grid)" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: 'var(--chart-text)', fontSize: 12}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: 'var(--chart-text)', fontSize: 12}} width={100} />
                <RechartsTooltip cursor={{fill: 'var(--chart-tooltip-border)'}} contentStyle={{ borderRadius: '8px', border: '1px solid var(--chart-tooltip-border)', backgroundColor: 'var(--chart-tooltip-bg)', color: 'var(--chart-text)' }} />
                <Bar dataKey="diasPerdidos" name="Dias Perdidos" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div key="queueTable" className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none h-full flex flex-col overflow-hidden">
          <div className="flex justify-between items-center mb-4 shrink-0">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
              Fila Pendente
            </h3>
            <button className="text-sm font-medium text-petroleum-600 hover:text-petroleum-700">Ir para fila &rarr;</button>
          </div>
          <div className="space-y-3 mt-2 overflow-y-auto flex-1 pr-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-start">
                  <div className={cn("w-2 h-2 rounded-full mt-1.5 mr-3", i === 1 ? "bg-rose-500" : "bg-amber-400")} />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 truncate">Carlos E. Silva</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Atestado 3 dias</p>
                  </div>
                </div>
                <div className="text-right ml-2 shrink-0">
                  <p className="text-xs font-medium text-slate-400">Há 2 h</p>
                  <button className="text-xs font-semibold text-petroleum-600 mt-1 hover:underline">Analisar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ResponsiveGridLayout>
      )}
      </div>
    </div>
  );
}
