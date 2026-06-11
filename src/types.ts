export type ViewState = 
  | 'login'
  | 'dashboard'
  | 'new_entry'
  | 'queue'
  | 'history'
  | 'analytics'
  | 'admin'
  | 'registry';

export type DocumentType = 'atestado' | 'declaracao';
export type Status = 'pendente' | 'aprovado' | 'reprovado' | 'inconsistente';

export interface KPI {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  suffix?: string;
}
