import React, { useState, useEffect } from 'react';
import { OfflineCache } from '../../services/offlineCache';
import { OfflineSyncAction } from '../../types';
import {
  Wifi,
  WifiOff,
  Database,
  RefreshCw,
  Trash2,
  CheckCircle,
  AlertTriangle,
  HardDrive,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface OfflineCachePanelProps {
  onSyncCompleted: () => void;
}

export const OfflineCachePanel: React.FC<OfflineCachePanelProps> = ({ onSyncCompleted }) => {
  const [isOnline, setIsOnline] = useState(OfflineCache.isOnline());
  const [isSimulating, setIsSimulating] = useState(OfflineCache.isSimulatingOffline());
  const [syncQueue, setSyncQueue] = useState<OfflineSyncAction[]>(OfflineCache.getSyncQueue());
  const [metrics, setMetrics] = useState(OfflineCache.getStorageMetrics());
  const [lastSync, setLastSync] = useState(OfflineCache.getLastSyncTime());
  const [syncToast, setSyncToast] = useState<string | null>(null);

  const refreshState = () => {
    setIsOnline(OfflineCache.isOnline());
    setIsSimulating(OfflineCache.isSimulatingOffline());
    setSyncQueue(OfflineCache.getSyncQueue());
    setMetrics(OfflineCache.getStorageMetrics());
    setLastSync(OfflineCache.getLastSyncTime());
  };

  useEffect(() => {
    const unsub = OfflineCache.subscribe(refreshState);
    return unsub;
  }, []);

  const handleToggleSimulation = () => {
    const nextState = OfflineCache.toggleSimulatedOffline();
    setIsSimulating(nextState);
    refreshState();
    onSyncCompleted();
  };

  const handleManualSync = () => {
    const result = OfflineCache.syncPendingActions();
    refreshState();
    onSyncCompleted();
    setSyncToast(`Successfully synchronized ${result.syncedCount} queued mutations to main dataset!`);
    setTimeout(() => setSyncToast(null), 3000);
  };

  const handleResetCache = () => {
    if (confirm('Are you sure you want to reset the offline storage cache to default seed values?')) {
      OfflineCache.resetToDefaults();
      refreshState();
      onSyncCompleted();
      setSyncToast('Storage cache reset to factory default state.');
      setTimeout(() => setSyncToast(null), 3000);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                Offline Mode &amp; Local Storage Cache Manager
              </h3>
              {isOnline ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[11px] font-medium">
                  <Wifi className="w-3 h-3" />
                  Connected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 text-[11px] font-medium animate-pulse">
                  <WifiOff className="w-3 h-3" />
                  Offline Cache Active
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Access and mutate leads, projects, and scenarios without internet connectivity
            </p>
          </div>
        </div>

        {/* Offline Simulation Button */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleToggleSimulation}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
              isSimulating
                ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-200 border-stone-200 dark:border-stone-700'
            }`}
          >
            {isSimulating ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4 text-emerald-600" />}
            <span>{isSimulating ? 'Disable Offline Simulation' : 'Simulate Offline Mode'}</span>
          </button>
        </div>
      </div>

      {syncToast && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{syncToast}</span>
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase text-stone-500 dark:text-stone-400 block mb-0.5">
              Cached Datasets
            </span>
            <div className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
              {metrics.totalRecords} records
            </div>
            <span className="text-[11px] text-stone-500 dark:text-stone-400">Leads + Projects + Parameters</span>
          </div>
          <HardDrive className="w-8 h-8 text-stone-400/40" />
        </div>

        <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase text-stone-500 dark:text-stone-400 block mb-0.5">
              Cache Memory Footprint
            </span>
            <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 tabular-nums">
              {metrics.estimatedSizeKb} KB
            </div>
            <span className="text-[11px] text-stone-500 dark:text-stone-400">Lightweight high-efficiency</span>
          </div>
          <Database className="w-8 h-8 text-indigo-400/30" />
        </div>

        <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase text-stone-500 dark:text-stone-400 block mb-0.5">
              Pending Sync Mutations
            </span>
            <div className={`text-2xl font-bold font-mono tabular-nums ${syncQueue.length > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
              {syncQueue.length} queued
            </div>
            <span className="text-[11px] text-stone-500 dark:text-stone-400">
              {syncQueue.length > 0 ? 'Awaiting reconnection' : 'All changes synchronized'}
            </span>
          </div>
          <RefreshCw className={`w-8 h-8 ${syncQueue.length > 0 ? 'text-amber-400/50' : 'text-emerald-400/40'}`} />
        </div>
      </div>

      {/* Sync Queue Itemization */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-stone-700 dark:text-stone-300">
            Pending Mutation Queue ({syncQueue.length})
          </span>
          {syncQueue.length > 0 && isOnline && (
            <button
              onClick={handleManualSync}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Process &amp; Flush Queue Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {syncQueue.length === 0 ? (
          <div className="p-6 rounded-xl border border-dashed border-stone-300 dark:border-stone-750 text-center text-xs text-stone-500 dark:text-stone-400">
            <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto mb-1.5" />
            <span>Sync queue is clear. Every local operation is synchronized in storage.</span>
          </div>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {syncQueue.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 text-xs flex items-center justify-between"
              >
                <div>
                  <span className="font-mono font-semibold text-amber-600 dark:text-amber-400 uppercase text-[10px] tracking-wider block">
                    {item.action}
                  </span>
                  <div className="text-stone-700 dark:text-stone-300 font-mono text-[11px] mt-0.5 truncate max-w-md">
                    {JSON.stringify(item.payload)}
                  </div>
                </div>
                <span className="font-mono text-[10px] text-stone-400 tabular-nums">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Utilities */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>Last sync checkpoint: {new Date(lastSync).toLocaleString()}</span>
        </div>

        <button
          onClick={handleResetCache}
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-rose-600 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Reset Storage Cache to Factory Defaults</span>
        </button>
      </div>
    </div>
  );
};
