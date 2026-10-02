import React, { useState, useEffect } from 'react';
import {
  DashboardTab,
  RevenueDataPoint,
  ScenarioSimulationParams,
  User,
  ClientLead,
  StudioProject,
  DecodedJWT,
} from '../../types';
import { OfflineCache } from '../../services/offlineCache';
import { JWTService, PRESET_USERS } from '../../services/jwtService';
import { generateRevenueData } from '../../utils/analyticsGenerator';
import { InteractiveRevenueChart } from './InteractiveRevenueChart';
import { ScenarioSimulator } from './ScenarioSimulator';
import { WebVitalsChart } from './WebVitalsChart';
import { LeadsPipelineTable } from './LeadsPipelineTable';
import { ProjectsList } from './ProjectsList';
import { OfflineCachePanel } from './OfflineCachePanel';
import { JWTInspectorModal } from '../common/JWTInspectorModal';
import { SetupGuideModal } from '../common/SetupGuideModal';
import {
  LayoutDashboard,
  BarChart3,
  FolderGit2,
  Users,
  Database,
  Shield,
  Sun,
  Moon,
  Wifi,
  WifiOff,
  Terminal,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  DollarSign,
  Briefcase,
  Layers,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

interface DashboardViewProps {
  onSwitchToPublic: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSwitchToPublic,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data states from offline cache
  const [scenario, setScenario] = useState<ScenarioSimulationParams>(OfflineCache.getScenario());
  const [leads, setLeads] = useState<ClientLead[]>(OfflineCache.getLeads());
  const [projects, setProjects] = useState<StudioProject[]>(OfflineCache.getProjects());
  const [isOnline, setIsOnline] = useState(OfflineCache.isOnline());
  const [range, setRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // JWT Auth state
  const [jwtToken, setJwtToken] = useState<string | null>(JWTService.getStoredToken());
  const [decodedJWT, setDecodedJWT] = useState<DecodedJWT | null>(null);
  const [isJwtModalOpen, setIsJwtModalOpen] = useState(false);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);

  // Initialize JWT on first load if not present
  useEffect(() => {
    async function initJWT() {
      let token = JWTService.getStoredToken();
      if (!token) {
        token = await JWTService.generateToken(PRESET_USERS.admin);
        JWTService.setStoredToken(token);
      }
      setJwtToken(token);
      const dec = await JWTService.verifyAndDecode(token);
      setDecodedJWT(dec);
    }
    initJWT();
  }, []);

  // Subscribe to offline cache events
  useEffect(() => {
    const unsub = OfflineCache.subscribe(() => {
      setScenario(OfflineCache.getScenario());
      setLeads(OfflineCache.getLeads());
      setProjects(OfflineCache.getProjects());
      setIsOnline(OfflineCache.isOnline());
    });
    return unsub;
  }, []);

  const handleScenarioChange = (updated: ScenarioSimulationParams) => {
    setScenario(updated);
    OfflineCache.setScenario(updated);
  };

  const handleTokenUpdated = (newToken: string) => {
    setJwtToken(newToken);
    JWTService.verifyAndDecode(newToken).then(setDecodedJWT);
  };

  // Recompute dynamic chart data
  const revenueSummary = generateRevenueData(range, scenario);

  // KPI Calculations
  const activeProjectsCount = projects.filter((p) => p.status === 'in_progress' || p.status === 'in_review').length;
  const deployedProjectsCount = projects.filter((p) => p.status === 'deployed').length;
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col antialiased selection:bg-indigo-500/20 selection:text-indigo-600">
      {/* Top Banner if Offline / Simulated Offline */}
      {!isOnline && (
        <div className="bg-amber-600 text-white text-xs px-4 py-2 font-medium flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <WifiOff className="w-4 h-4 shrink-0 animate-pulse" />
            <span>
              <strong>Offline Mode Engaged:</strong> Data is reading from &amp; writing to local cache. Changes will queue and sync upon reconnection.
            </span>
          </div>
          <button
            onClick={() => OfflineCache.toggleSimulatedOffline()}
            className="text-[11px] underline uppercase tracking-wider font-semibold whitespace-nowrap ml-4 hover:text-amber-100"
          >
            {OfflineCache.isSimulatingOffline() ? 'Exit Simulation' : 'Check Network'}
          </button>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* ========================================== */}
        {/* SIDEBAR NAVIGATION                         */}
        {/* ========================================== */}
        {/* Mobile backdrop */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-xs"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Top Brand */}
          <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-serif font-bold text-sm shadow-xs">
                LP
              </div>
              <div>
                <span className="font-semibold text-sm tracking-tight text-stone-900 dark:text-stone-100 block">
                  Luminous Studio
                </span>
                <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400">
                  Client &amp; Analytics Portal
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 text-stone-400 hover:text-stone-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
            <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 block mb-1">
              Workspace
            </span>

            <button
              onClick={() => {
                setActiveTab('overview');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                activeTab === 'overview'
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Studio Overview</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('analytics');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                activeTab === 'analytics'
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Interactive Data Viz</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('projects');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                activeTab === 'projects'
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderGit2 className="w-4 h-4" />
                <span>Client Repositories</span>
              </div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500">
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('leads');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                activeTab === 'leads'
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>Inquiries &amp; Pipeline</span>
              </div>
              {newLeadsCount > 0 && (
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold">
                  {newLeadsCount} new
                </span>
              )}
            </button>

            <div className="pt-4">
              <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 block mb-1">
                Infrastructure
              </span>

              <button
                onClick={() => {
                  setActiveTab('offline_sync');
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                  activeTab === 'offline_sync'
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Database className="w-4 h-4" />
                  <span>Offline Storage Sync</span>
                </div>
                {!isOnline && (
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveTab('jwt_security');
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                  activeTab === 'jwt_security'
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4" />
                  <span>JWT Token &amp; Roles</span>
                </div>
                <span className="font-mono text-[10px] text-purple-600 dark:text-purple-400 uppercase">
                  HS256
                </span>
              </button>
            </div>
          </div>

          {/* Bottom Actions & User Persona */}
          <div className="p-3 border-t border-stone-200 dark:border-stone-800 space-y-2">
            {/* Switch to Public Site button */}
            <button
              onClick={onSwitchToPublic}
              className="w-full py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-750 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center justify-between transition-colors shadow-xs"
            >
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Public Studio Site</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </button>

            {/* User Profile Card */}
            <div
              onClick={() => setIsJwtModalOpen(true)}
              className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 cursor-pointer hover:border-purple-300 dark:hover:border-purple-700 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2 truncate">
                <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold text-xs flex items-center justify-center shrink-0">
                  {decodedJWT?.payload.name ? decodedJWT.payload.name.charAt(0) : 'U'}
                </div>
                <div className="truncate">
                  <div className="font-semibold text-xs text-stone-900 dark:text-stone-100 truncate">
                    {decodedJWT?.payload.name || 'Bhawna Punia'}
                  </div>
                  <div className="text-[10px] text-stone-500 dark:text-stone-400 capitalize">
                    {decodedJWT?.payload.role || 'admin'} · Web Crypto JWT
                  </div>
                </div>
              </div>
              <Shield className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0 ml-1" />
            </div>
          </div>
        </aside>

        {/* ========================================== */}
        {/* MAIN WORKSPACE VIEWPORT                    */}
        {/* ========================================== */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Bar Header */}
          <header className="sticky top-0 z-30 h-16 px-6 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Breadcrumbs */}
              <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                <span className="font-semibold text-stone-900 dark:text-stone-100 hidden sm:inline">
                  Luminous Studio
                </span>
                <span className="hidden sm:inline">/</span>
                <span className="capitalize">{activeTab.replace('_', ' ')}</span>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Online / Offline status badge */}
              <button
                onClick={() => OfflineCache.toggleSimulatedOffline()}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono transition-colors ${
                  isOnline
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700'
                }`}
                title="Click to toggle simulated offline mode"
              >
                {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3 animate-pulse" />}
                <span className="hidden md:inline">{isOnline ? 'Edge Online' : 'Simulated Offline'}</span>
              </button>

              {/* Deployment & Setup Guide Modal trigger */}
              <button
                onClick={() => setIsSetupModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold transition-colors border border-stone-200 dark:border-stone-700 shadow-xs"
              >
                <Terminal className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span className="hidden sm:inline">Deployment Guide</span>
              </button>

              {/* JWT Claims Dialog Trigger */}
              <button
                onClick={() => setIsJwtModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-semibold transition-colors border border-purple-200 dark:border-purple-800 shadow-xs"
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">JWT Claims</span>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={onToggleDarkMode}
                className="p-2 rounded-xl text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
              </button>
            </div>
          </header>

          {/* Dynamic Main Workspace Tabs Content */}
          <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <>
                {/* Metrics Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono block mb-1">
                        Active Contracts
                      </span>
                      <div className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
                        {activeProjectsCount} builds
                      </div>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                        {deployedProjectsCount} deployed live
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Briefcase className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono block mb-1">
                        Period Revenue
                      </span>
                      <div className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
                        ${revenueSummary.totalRevenue.toLocaleString()}
                      </div>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +18.4% trajectory
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <DollarSign className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono block mb-1">
                        Inbound Qualified Leads
                      </span>
                      <div className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
                        {leads.length} inquiries
                      </div>
                      <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                        {newLeadsCount} require response
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono block mb-1">
                        Core Web Vitals
                      </span>
                      <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                        100 / 100
                      </div>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400">
                        0.82s LCP Edge Target
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Primary Interactive Revenue Chart */}
                <InteractiveRevenueChart
                  data={revenueSummary.points}
                  range={range}
                  onRangeChange={setRange}
                  totalRevenue={revenueSummary.totalRevenue}
                  totalInquiries={revenueSummary.totalInquiries}
                  avgConversion={revenueSummary.avgConversion}
                />

                {/* Grid with Scenario Simulator & Web Vitals */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ScenarioSimulator scenario={scenario} onChange={handleScenarioChange} />
                  <WebVitalsChart />
                </div>

                {/* Projects Burndown */}
                <ProjectsList
                  projects={projects}
                  onProjectsUpdated={() => setProjects(OfflineCache.getProjects())}
                />
              </>
            )}

            {/* ANALYTICS TAB */}
            {activeTab === 'analytics' && (
              <>
                <InteractiveRevenueChart
                  data={revenueSummary.points}
                  range={range}
                  onRangeChange={setRange}
                  totalRevenue={revenueSummary.totalRevenue}
                  totalInquiries={revenueSummary.totalInquiries}
                  avgConversion={revenueSummary.avgConversion}
                />
                <ScenarioSimulator scenario={scenario} onChange={handleScenarioChange} />
                <WebVitalsChart />
              </>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <ProjectsList
                projects={projects}
                onProjectsUpdated={() => setProjects(OfflineCache.getProjects())}
              />
            )}

            {/* LEADS CRM TAB */}
            {activeTab === 'leads' && (
              <LeadsPipelineTable
                leads={leads}
                onLeadsUpdated={() => setLeads(OfflineCache.getLeads())}
                isOnline={isOnline}
              />
            )}

            {/* OFFLINE STORAGE SYNC TAB */}
            {activeTab === 'offline_sync' && (
              <OfflineCachePanel
                onSyncCompleted={() => {
                  setLeads(OfflineCache.getLeads());
                  setProjects(OfflineCache.getProjects());
                  setScenario(OfflineCache.getScenario());
                  setIsOnline(OfflineCache.isOnline());
                }}
              />
            )}

            {/* JWT SECURITY TAB */}
            {activeTab === 'jwt_security' && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      Cryptographic JWT Authentication Engine
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                      Token signatures are calculated in-browser using Web Crypto HMAC-SHA256 with granular RBAC permissions.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsJwtModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-purple-600 text-white font-semibold text-xs hover:bg-purple-700 transition-colors shadow-xs"
                  >
                    Launch JWT Claims Inspector
                  </button>
                </div>
                <LeadsPipelineTable
                  leads={leads}
                  onLeadsUpdated={() => setLeads(OfflineCache.getLeads())}
                  isOnline={isOnline}
                />
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modal Dialogs */}
      <JWTInspectorModal
        isOpen={isJwtModalOpen}
        onClose={() => setIsJwtModalOpen(false)}
        currentToken={jwtToken}
        onTokenUpdate={handleTokenUpdated}
      />

      <SetupGuideModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
      />
    </div>
  );
};
