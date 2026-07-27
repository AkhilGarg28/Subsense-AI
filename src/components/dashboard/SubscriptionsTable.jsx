import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCreditCard,
  FiSearch,
  FiX,
  FiCheckCircle,
  FiPauseCircle,
  FiEye,
  FiTrash2,
  FiLayers,
} from 'react-icons/fi';
import {
  SiNetflix,
  SiSpotify,
  SiFigma,
  SiNotion,
} from 'react-icons/si';

const mockSubscriptionsList = [
  {
    id: 'sub-1',
    name: 'AWS Cloud Services',
    category: 'Cloud Services',
    monthlyUSD: 220.00,
    monthlyINR: 18450,
    renewalCycle: 'Monthly',
    renewalDate: 'Aug 05, 2026',
    billingCard: 'HDFC Corp •••• 4242',
    status: 'Active',
    usage: '94% Active',
    logoType: 'aws',
    bgColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  {
    id: 'sub-2',
    name: 'Adobe Creative Cloud',
    category: 'Design & Media',
    monthlyUSD: 51.00,
    monthlyINR: 4230,
    renewalCycle: 'Monthly',
    renewalDate: 'Aug 12, 2026',
    billingCard: 'ICICI •••• 8810',
    status: 'Active',
    usage: 'Daily Usage',
    logoType: 'adobe',
    bgColor: 'bg-red-500/10 text-red-400 border-red-500/20',
  },
  {
    id: 'sub-3',
    name: 'Figma Enterprise Team',
    category: 'Design & Software',
    monthlyUSD: 48.00,
    monthlyINR: 3999,
    renewalCycle: 'Monthly',
    renewalDate: 'Aug 10, 2026',
    billingCard: 'HDFC Corp •••• 4242',
    status: 'Active',
    usage: 'High Usage',
    logoType: 'figma',
    bgColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  {
    id: 'sub-4',
    name: 'OpenAI ChatGPT Plus',
    category: 'Productivity & AI',
    monthlyUSD: 24.00,
    monthlyINR: 1999,
    renewalCycle: 'Monthly',
    renewalDate: 'Aug 01, 2026',
    billingCard: 'Razorpay UPI',
    status: 'Active',
    usage: 'Daily Usage',
    logoType: 'openai',
    bgColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  },
  {
    id: 'sub-5',
    name: 'Notion AI Workspace',
    category: 'Productivity & AI',
    monthlyUSD: 18.00,
    monthlyINR: 1499,
    renewalCycle: 'Monthly',
    renewalDate: 'Aug 15, 2026',
    billingCard: 'HDFC Corp •••• 4242',
    status: 'Active',
    usage: 'Daily Usage',
    logoType: 'notion',
    bgColor: 'bg-slate-500/10 text-slate-200 border-slate-500/20',
  },
];

const formatINRVal = (val) => {
  const num = typeof val === 'number' ? val : parseFloat(val || 0);
  return `₹${num.toLocaleString('en-IN')}`;
};

const RenderSubscriptionLogo = ({ logoType, name }) => {
  const type = (logoType || name || '').toLowerCase();
  if (type.includes('netflix')) return <SiNetflix className="w-5 h-5 text-red-500" />;
  if (type.includes('spotify')) return <SiSpotify className="w-5 h-5 text-emerald-400" />;
  if (type.includes('figma')) return <SiFigma className="w-5 h-5 text-purple-400" />;
  if (type.includes('notion')) return <SiNotion className="w-5 h-5 text-slate-200" />;

  return <FiLayers className="w-5 h-5 text-[#5B8CFF]" />;
};

RenderSubscriptionLogo.propTypes = {
  logoType: PropTypes.string,
  name: PropTypes.string,
};

const SubscriptionsTable = ({
  subscriptions = mockSubscriptionsList,
  onManageSub,
  onPauseSub,
  onCancelSub,
  className = '',
}) => {
  const subData = subscriptions && subscriptions.length > 0 ? subscriptions : mockSubscriptionsList;

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currencyMode, setCurrencyMode] = useState('INR');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const filteredSubs = subData.filter((sub) => {
    const name = (sub.name || '').toLowerCase();
    const cat = (sub.category || '').toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch = name.includes(q) || cat.includes(q);

    if (!matchesSearch) return false;
    if (statusFilter === 'All') return true;
    if (statusFilter === 'Active') return sub.status === 'Active';
    if (statusFilter === 'Unused') return sub.status === 'Unused' || sub.status === 'Price Increased';
    if (statusFilter === 'Paused') return sub.status === 'Paused';
    return true;
  });

  return (
    <div className={`w-full space-y-5 ${className}`}>
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-[#171F2F] border border-[#22C55E]/40 text-white shadow-2xl backdrop-blur-xl font-mono text-xs">
          <FiCheckCircle className="w-4 h-4 text-[#22C55E]" />
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Control Header */}
      <div className="p-6 rounded-[20px] border border-white/10 bg-[#171F2F]/80 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-[#5B8CFF]/15 text-[#5B8CFF] border border-[#5B8CFF]/30">
                <FiCreditCard className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">Active Subscriptions Overview</h2>
            </div>
            <p className="text-xs text-[#A1A8B5] mt-1">
              Monitored in real-time for unused seat detection and billing anomalies
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={() => {
                const modes = ['INR', 'USD'];
                const nextIndex = (modes.indexOf(currencyMode) + 1) % modes.length;
                setCurrencyMode(modes[nextIndex]);
              }}
              className="px-3.5 py-2.5 rounded-xl bg-[#121A2F] border border-white/10 text-white hover:bg-[#1E293B] transition-all flex items-center gap-1.5 cursor-pointer font-bold"
            >
              <span className="text-[#22C55E] font-bold text-sm">₹</span>
              <span>{currencyMode} Mode</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {['All', 'Active', 'Unused', 'Paused'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  statusFilter === tab
                    ? 'gradient-primary text-white shadow-glow-blue'
                    : 'text-[#A1A8B5] hover:text-white hover:bg-[#121A2F]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative flex-1 max-w-xs">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A8B5]" />
            <input
              type="text"
              placeholder="Search subscriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-8 rounded-xl bg-[#121A2F] border border-white/10 text-xs text-white placeholder-[#64748B] focus:border-[#5B8CFF] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A1A8B5] hover:text-white"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="overflow-x-auto rounded-[20px] border border-white/10 bg-[#171F2F]/80 backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-[#121A2F] text-[#A1A8B5] text-[11px] uppercase tracking-wider font-bold">
              <th className="py-4 px-5">Service</th>
              <th className="py-4 px-4">Monthly Cost</th>
              <th className="py-4 px-4">Renewal Date</th>
              <th className="py-4 px-4">Status & Usage</th>
              <th className="py-4 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <AnimatePresence>
              {filteredSubs.map((sub) => {
                const inr = sub.price ?? sub.monthlyINR ?? sub.costINR ?? 1499;

                return (
                  <motion.tr
                    key={sub.id || sub._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-[#121A2F]/60 transition-colors group"
                  >
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-[#121A2F] shrink-0">
                          <RenderSubscriptionLogo logoType={sub.logoType} name={sub.name} />
                        </div>
                        <div>
                          <div className="font-bold text-white group-hover:text-[#5B8CFF] transition-colors">
                            {sub.name}
                          </div>
                          <div className="text-[11px] text-[#A1A8B5]">{sub.category}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-bold">
                      <div className="text-white text-sm">{formatINRVal(inr)}</div>
                      <div className="text-[10px] text-[#64748B] font-normal">{sub.billingCycle || 'Monthly'}</div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="text-white font-bold">{sub.renewalDate || 'Aug 10, 2026'}</div>
                      <div className="text-[10px] text-[#A1A8B5]">{sub.billingCard || 'Auto Debit'}</div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            sub.status === 'Active'
                              ? 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30'
                              : sub.status === 'Unused' || sub.status === 'Price Increased'
                              ? 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30'
                              : 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30'
                          }`}
                        >
                          {sub.status || 'Active'}
                        </span>
                        <div className="text-[10px] text-[#A1A8B5]">{sub.usage || 'Active Usage'}</div>
                      </div>
                    </td>

                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onManageSub && onManageSub(sub)}
                          className="p-2 rounded-xl bg-[#121A2F] border border-white/10 text-[#A1A8B5] hover:text-white hover:border-[#5B8CFF]/40 transition-all cursor-pointer"
                          title="View Details"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (onPauseSub) onPauseSub(sub);
                            showToast(`Updated ${sub.name} status`, 'info');
                          }}
                          className="p-2 rounded-xl bg-[#121A2F] border border-white/10 text-[#F59E0B] hover:bg-[#F59E0B]/15 transition-all cursor-pointer"
                          title="Pause Subscription"
                        >
                          <FiPauseCircle className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (onCancelSub) onCancelSub(sub);
                            showToast(`Cancelled ${sub.name}`, 'danger');
                          }}
                          className="p-2 rounded-xl bg-[#121A2F] border border-white/10 text-[#EF4444] hover:bg-[#EF4444]/15 transition-all cursor-pointer"
                          title="Cancel Subscription"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

SubscriptionsTable.propTypes = {
  subscriptions: PropTypes.array,
  onManageSub: PropTypes.func,
  onPauseSub: PropTypes.func,
  onCancelSub: PropTypes.func,
  className: PropTypes.string,
};

export default SubscriptionsTable;
