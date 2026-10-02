import React, { useState } from 'react';
import { ClientLead } from '../../types';
import { OfflineCache } from '../../services/offlineCache';
import { Search, Plus, Filter, Mail, CheckCircle2, Clock, Check, X, ShieldAlert } from 'lucide-react';

interface LeadsPipelineTableProps {
  leads: ClientLead[];
  onLeadsUpdated: () => void;
  isOnline: boolean;
}

export const LeadsPipelineTable: React.FC<LeadsPipelineTableProps> = ({
  leads,
  onLeadsUpdated,
  isOnline,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Lead form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Business Website');
  const [budget, setBudget] = useState('$600 - $1,200');
  const [details, setDetails] = useState('');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, status: ClientLead['status']) => {
    OfflineCache.updateLeadStatus(id, status);
    onLeadsUpdated();
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    OfflineCache.addLead({
      fullName,
      email,
      service,
      budget,
      details: details || 'Direct inbound inquiry from client portal.',
    });

    onLeadsUpdated();
    setIsModalOpen(false);
    setFullName('');
    setEmail('');
    setDetails('');
  };

  const getStatusBadge = (status: ClientLead['status']) => {
    switch (status) {
      case 'new':
        return (
          <span className="font-mono text-[11px] text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
            New Lead
          </span>
        );
      case 'contacted':
        return (
          <span className="font-mono text-[11px] text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/50 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
            Contacted
          </span>
        );
      case 'proposal_sent':
        return (
          <span className="font-mono text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
            Proposal Sent
          </span>
        );
      case 'retained':
        return (
          <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
            Retained Client
          </span>
        );
      case 'declined':
        return (
          <span className="font-mono text-[11px] text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700">
            Archived
          </span>
        );
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col gap-6">
      {/* Top Bar with Search & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            Client Inquiries &amp; Lead Funnel
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
              {filteredLeads.length} records
            </span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Verified inbound project leads synced to local offline cache
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Inbound Lead</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search by client, domain, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Status Segmented Buttons */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700/60 overflow-x-auto">
          {['all', 'new', 'contacted', 'proposal_sent', 'retained'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg capitalize whitespace-nowrap transition-all ${
                statusFilter === s
                  ? 'bg-white dark:bg-stone-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-800">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-stone-50/80 dark:bg-stone-850 border-b border-stone-200 dark:border-stone-800 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              <th className="p-3.5">Client &amp; Contact</th>
              <th className="p-3.5">Service Requested</th>
              <th className="p-3.5">Budget Bracket</th>
              <th className="p-3.5">Intent Score</th>
              <th className="p-3.5">Status Flow</th>
              <th className="p-3.5 text-right">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-stone-500 dark:text-stone-400">
                  No inquiries match the current filter.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-stone-50/50 dark:hover:bg-stone-850/50 transition-colors"
                >
                  <td className="p-3.5">
                    <div className="font-semibold text-stone-900 dark:text-stone-100">
                      {lead.fullName}
                    </div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                      {lead.email}
                    </div>
                  </td>
                  <td className="p-3.5 text-stone-700 dark:text-stone-300">
                    {lead.service}
                  </td>
                  <td className="p-3.5 font-mono text-stone-800 dark:text-stone-200 tabular-nums">
                    {lead.budget}
                  </td>
                  <td className="p-3.5">
                    <span className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400 tabular-nums">
                      {lead.score}/100
                    </span>
                  </td>
                  <td className="p-3.5">
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        handleStatusChange(lead.id, e.target.value as ClientLead['status'])
                      }
                      className="text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-2 py-1 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      <option value="new">New Lead</option>
                      <option value="contacted">Contacted</option>
                      <option value="proposal_sent">Proposal Sent</option>
                      <option value="retained">Retained Client</option>
                      <option value="declined">Archived</option>
                    </select>
                  </td>
                  <td className="p-3.5 text-right font-mono text-[11px] text-stone-400 tabular-nums">
                    {lead.createdAt}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: Log New Inquiry */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h4 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                Log Inbound Studio Inquiry
              </h4>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!isOnline && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>
                  Currently in offline mode. This inquiry will be cached locally and queued for automatic sync.
                </span>
              </div>
            )}

            <form onSubmit={handleCreateLead} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Liam Sterling"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="liam@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                    Service
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Business Website">Business Website</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="AI-Enhanced Website">AI-Enhanced Website</option>
                    <option value="Website Redesign">Website Redesign</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                    Estimated Budget
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Under $300">Under $300 (Starter)</option>
                    <option value="$300 - $600">$300 - $600 (Standard)</option>
                    <option value="$600 - $1,200">$600 - $1,200 (Premium)</option>
                    <option value="$1,200+">$1,200+ (Custom AI)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                  Scope Brief
                </label>
                <textarea
                  rows={3}
                  placeholder="Outline key project deliverables or launch timeframe..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                >
                  Save to Local Cache
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
