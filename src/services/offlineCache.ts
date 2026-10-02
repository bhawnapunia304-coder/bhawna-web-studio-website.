import { ClientLead, OfflineSyncAction, StudioProject, ScenarioSimulationParams } from '../types';

const STORAGE_KEYS = {
  LEADS: 'luminous_cache_leads_v1',
  PROJECTS: 'luminous_cache_projects_v1',
  SCENARIO: 'luminous_cache_scenario_v1',
  SYNC_QUEUE: 'luminous_cache_sync_queue_v1',
  LAST_SYNC: 'luminous_cache_last_sync_v1',
  SIMULATED_OFFLINE: 'luminous_simulated_offline_v1',
};

// Initial default seed datasets
export const DEFAULT_LEADS: ClientLead[] = [
  {
    id: 'lead_01',
    fullName: 'Sophia Laurent',
    email: 'sophia@palais-horology.ch',
    service: 'Business Website',
    budget: '$600 - $1,200',
    details: 'Looking for a bespoke luxury timepiece showroom website with micro-interactions and high-contrast editorial look.',
    status: 'new',
    createdAt: '2026-10-01 14:22',
    score: 94,
  },
  {
    id: 'lead_02',
    fullName: 'Marcus Vance',
    email: 'marcus@vance-legal.co.uk',
    service: 'Website Redesign',
    budget: '$1,200+',
    details: 'Need complete overhaul of our 2018 corporate practice portal into high-speed minimal architecture.',
    status: 'proposal_sent',
    createdAt: '2026-09-29 10:15',
    score: 88,
  },
  {
    id: 'lead_03',
    fullName: 'Clara Bennett',
    email: 'clara@kinfolk-wellness.com',
    service: 'Landing Page',
    budget: '$300 - $600',
    details: 'Launch page for our flagship organic botanical skincare drop next month. High conversion priority.',
    status: 'retained',
    createdAt: '2026-09-26 16:40',
    score: 98,
  },
  {
    id: 'lead_04',
    fullName: 'Henrik Lindqvist',
    email: 'henrik@nordic-spatial.io',
    service: 'AI-Enhanced Website',
    budget: '$1,200+',
    details: 'Interactive 3D model viewer and AI inquiry triage for our architectural consultation firm in Stockholm.',
    status: 'contacted',
    createdAt: '2026-09-24 11:05',
    score: 91,
  },
];

export const DEFAULT_PROJECTS: StudioProject[] = [
  {
    id: 'proj_01',
    title: 'Maison 27 Bistro',
    domain: 'maison27-bistro.dev',
    client: 'Julian Moreau',
    category: 'Hospitality',
    progress: 100,
    status: 'deployed',
    deadline: '2026-09-18',
    budget: 599,
    speedScore: 99,
  },
  {
    id: 'proj_02',
    title: 'Forma Reformer Studio',
    domain: 'formastudio.club',
    client: 'Chloe Zhao',
    category: 'Wellness & Movement',
    progress: 85,
    status: 'in_progress',
    deadline: '2026-10-08',
    budget: 1199,
    speedScore: 98,
  },
  {
    id: 'proj_03',
    title: 'Atelier Capsule Store',
    domain: 'atelier-capsule.store',
    client: 'Camille Dubois',
    category: 'Editorial Commerce',
    progress: 92,
    status: 'in_review',
    deadline: '2026-10-05',
    budget: 899,
    speedScore: 100,
  },
  {
    id: 'proj_04',
    title: 'North & Oak Architecture',
    domain: 'northandoak.archi',
    client: 'Liam Sterling',
    category: 'Architecture Overhaul',
    progress: 100,
    status: 'deployed',
    deadline: '2026-09-25',
    budget: 1450,
    speedScore: 97,
  },
  {
    id: 'proj_05',
    title: 'Nova AI Inference Suite',
    domain: 'nova-inference.io',
    client: 'Dr. Evelyn Reed',
    category: 'Developer Tools',
    progress: 65,
    status: 'in_progress',
    deadline: '2026-10-15',
    budget: 1299,
    speedScore: 99,
  },
];

export const DEFAULT_SCENARIO: ScenarioSimulationParams = {
  monthlyTraffic: 18500,
  conversionRate: 3.2,
  averageDealValue: 750,
  retentionMonths: 8,
};

type CacheListener = () => void;

class OfflineCacheManager {
  private listeners: Set<CacheListener> = new Set();
  private simulatedOffline = false;

  constructor() {
    // Check if simulated offline was persisted
    const storedSim = localStorage.getItem(STORAGE_KEYS.SIMULATED_OFFLINE);
    if (storedSim === 'true') {
      this.simulatedOffline = true;
    }

    // Initialize default data if not present in cache
    if (!localStorage.getItem(STORAGE_KEYS.LEADS)) {
      this.setLeads(DEFAULT_LEADS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
      this.setProjects(DEFAULT_PROJECTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SCENARIO)) {
      this.setScenario(DEFAULT_SCENARIO);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SYNC_QUEUE)) {
      localStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LAST_SYNC)) {
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    }

    // Attach native network event listeners
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleNetworkChange());
      window.addEventListener('offline', () => this.handleNetworkChange());
    }
  }

  public subscribe(listener: CacheListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((fn) => fn());
  }

  public isOnline(): boolean {
    if (this.simulatedOffline) return false;
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  public isSimulatingOffline(): boolean {
    return this.simulatedOffline;
  }

  public toggleSimulatedOffline(): boolean {
    this.simulatedOffline = !this.simulatedOffline;
    localStorage.setItem(STORAGE_KEYS.SIMULATED_OFFLINE, String(this.simulatedOffline));
    
    if (!this.simulatedOffline && (typeof navigator !== 'undefined' ? navigator.onLine : true)) {
      this.syncPendingActions();
    }
    this.notify();
    return this.simulatedOffline;
  }

  private handleNetworkChange(): void {
    if (this.isOnline()) {
      this.syncPendingActions();
    }
    this.notify();
  }

  // Leads Caching
  public getLeads(): ClientLead[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LEADS);
      return data ? JSON.parse(data) : DEFAULT_LEADS;
    } catch {
      return DEFAULT_LEADS;
    }
  }

  public setLeads(leads: ClientLead[]): void {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    this.notify();
  }

  public addLead(lead: Omit<ClientLead, 'id' | 'createdAt' | 'status' | 'score'>): ClientLead {
    const newLead: ClientLead = {
      ...lead,
      id: `lead_${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      score: Math.floor(Math.random() * 15) + 85,
    };

    const current = this.getLeads();
    const updated = [newLead, ...current];
    this.setLeads(updated);

    if (!this.isOnline()) {
      this.queueSyncAction({
        id: `sync_${Date.now()}`,
        action: 'create_lead',
        payload: newLead,
        timestamp: Date.now(),
      });
    }

    return newLead;
  }

  public updateLeadStatus(id: string, status: ClientLead['status']): void {
    const current = this.getLeads();
    const updated = current.map((lead) => (lead.id === id ? { ...lead, status } : lead));
    this.setLeads(updated);

    if (!this.isOnline()) {
      this.queueSyncAction({
        id: `sync_${Date.now()}`,
        action: 'update_lead_status',
        payload: { id, status },
        timestamp: Date.now(),
      });
    }
  }

  // Projects Caching
  public getProjects(): StudioProject[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return data ? JSON.parse(data) : DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  }

  public setProjects(projects: StudioProject[]): void {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    this.notify();
  }

  public updateProjectProgress(id: string, progress: number): void {
    const current = this.getProjects();
    const updated = current.map((p) =>
      p.id === id ? { ...p, progress, status: progress >= 100 ? ('deployed' as const) : ('in_progress' as const) } : p
    );
    this.setProjects(updated);

    if (!this.isOnline()) {
      this.queueSyncAction({
        id: `sync_${Date.now()}`,
        action: 'update_project_progress',
        payload: { id, progress },
        timestamp: Date.now(),
      });
    }
  }

  // Scenario Caching
  public getScenario(): ScenarioSimulationParams {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SCENARIO);
      return data ? JSON.parse(data) : DEFAULT_SCENARIO;
    } catch {
      return DEFAULT_SCENARIO;
    }
  }

  public setScenario(scenario: ScenarioSimulationParams): void {
    localStorage.setItem(STORAGE_KEYS.SCENARIO, JSON.stringify(scenario));
    if (!this.isOnline()) {
      this.queueSyncAction({
        id: `sync_${Date.now()}`,
        action: 'update_scenario',
        payload: scenario,
        timestamp: Date.now(),
      });
    }
    this.notify();
  }

  // Sync Queue Handling
  public getSyncQueue(): OfflineSyncAction[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SYNC_QUEUE);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private queueSyncAction(action: OfflineSyncAction): void {
    const queue = this.getSyncQueue();
    queue.push(action);
    localStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(queue));
    this.notify();
  }

  public syncPendingActions(): { syncedCount: number } {
    const queue = this.getSyncQueue();
    if (queue.length === 0) return { syncedCount: 0 };

    const count = queue.length;
    // Clear queue as all actions are already locally reflected in storage state
    localStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    this.notify();

    return { syncedCount: count };
  }

  public getLastSyncTime(): string {
    return localStorage.getItem(STORAGE_KEYS.LAST_SYNC) || 'Never';
  }

  // Cache Diagnostics
  public getStorageMetrics(): { totalRecords: number; estimatedSizeKb: number } {
    const leads = this.getLeads();
    const projects = this.getProjects();
    const queue = this.getSyncQueue();
    const totalRecords = leads.length + projects.length + queue.length;

    let totalChars = 0;
    for (const key of Object.values(STORAGE_KEYS)) {
      const val = localStorage.getItem(key);
      if (val) totalChars += val.length;
    }
    const estimatedSizeKb = Math.round((totalChars * 2) / 1024 * 10) / 10;

    return { totalRecords, estimatedSizeKb: Math.max(estimatedSizeKb, 1.2) };
  }

  public resetToDefaults(): void {
    this.setLeads(DEFAULT_LEADS);
    this.setProjects(DEFAULT_PROJECTS);
    this.setScenario(DEFAULT_SCENARIO);
    localStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    this.notify();
  }
}

export const OfflineCache = new OfflineCacheManager();
