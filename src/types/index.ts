export type UserRole = 'admin' | 'manager' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  title: string;
  company?: string;
}

export interface JWTPayload {
  sub: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  iat: number;
  exp: number;
  iss: string;
  permissions: string[];
}

export interface DecodedJWT {
  header: {
    alg: string;
    typ: string;
  };
  payload: JWTPayload;
  signature: string;
  rawToken: string;
  isValid: boolean;
  expiresInSeconds: number;
}

export interface RevenueDataPoint {
  date: string;
  label: string;
  revenue: number;
  target: number;
  inquiries: number;
  conversionRate: number;
}

export interface WebVitalMetric {
  id: string;
  name: string;
  acronym: string;
  value: number;
  unit: string;
  rating: 'good' | 'needs-improvement' | 'poor';
  description: string;
  target: number;
}

export interface ClientLead {
  id: string;
  fullName: string;
  email: string;
  service: string;
  budget: string;
  details: string;
  status: 'new' | 'contacted' | 'proposal_sent' | 'retained' | 'declined';
  createdAt: string;
  score: number;
}

export interface StudioProject {
  id: string;
  title: string;
  domain: string;
  client: string;
  category: string;
  progress: number;
  status: 'in_progress' | 'in_review' | 'deployed' | 'planning';
  deadline: string;
  budget: number;
  speedScore: number;
}

export interface ScenarioSimulationParams {
  monthlyTraffic: number; // e.g. 15000
  conversionRate: number; // e.g. 2.4%
  averageDealValue: number; // e.g. 850
  retentionMonths: number; // e.g. 6
}

export interface OfflineSyncAction {
  id: string;
  action: 'create_lead' | 'update_lead_status' | 'update_project_progress' | 'update_scenario';
  payload: any;
  timestamp: number;
}

export type ViewMode = 'showcase' | 'dashboard';
export type DashboardTab = 'overview' | 'analytics' | 'projects' | 'leads' | 'offline_sync' | 'jwt_security';
