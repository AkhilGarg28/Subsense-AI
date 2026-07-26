import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiChevronUp,
  FiChevronDown,
  FiEye,
  FiPauseCircle,
  FiPlay,
  FiTrash2,
  FiCheckCircle,
  FiSlash,
  FiDollarSign,
  FiCalendar,
  FiCpu,
  FiCloud,
  FiTv,
  FiMessageSquare,
  FiCreditCard
} from 'react-icons/fi';
import {
  SiNetflix,
  SiSpotify,
  SiFigma,
  SiNotion,
  SiGithub,
} from 'react-icons/si';

/**
 * Default mock subscriptions list for SubscriptionTable
 */
const DEFAULT_TABLE_SUBSCRIPTIONS = [
  {
    id: 'sub-tbl-1',
    name: 'Netflix Premium',
    category: 'Entertainment',
    logoType: 'netflix',
    bgColor: 'bg-red-500/10 text-red-500 border-red-500/30',
    monthlyUSD: 19.99,
    monthlyINR: 1660,
    renewalDate: '2026-08-15',
    billingCycle: 'Monthly',
    status: 'Active',
    paymentMethod: 'Visa •••• 4242'
  },
  {
    id: 'sub-tbl-2',
    name: 'ChatGPT Plus',
    category: 'AI & Productivity',
    logoType: 'openai',
    bgColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    monthlyUSD: 20.00,
    monthlyINR: 1660,
    renewalDate: '2026-08-01',
    billingCycle: 'Monthly',
    status: 'Active',
    paymentMethod: 'Mastercard •••• 8812'
  },
  {
    id: 'sub-tbl-3',
    name: 'Canva Pro',
    category: 'Design & Media',
    logoType: 'canva',
    bgColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    monthlyUSD: 12.99,
    monthlyINR: 999,
    renewalDate: '2026-08-12',
    billingCycle: 'Annual',
    status: 'Unused',
    paymentMethod: 'Visa •••• 4242'
  },
  {
    id: 'sub-tbl-4',
    name: 'Figma Professional',
    category: 'Design Tools',
    logoType: 'figma',
    bgColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    monthlyUSD: 15.00,
    monthlyINR: 1245,
    renewalDate: '2026-08-10',
    billingCycle: 'Monthly',
    status: 'Active',
    paymentMethod: 'Visa •••• 4242'
  },
  {
    id: 'sub-tbl-5',
    name: 'Spotify Family Plan',
    category: 'Music & Audio',
    logoType: 'spotify',
    bgColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    monthlyUSD: 15.99,
    monthlyINR: 1329,
    renewalDate: '2026-08-05',
    billingCycle: 'Monthly',
    status: 'Active',
    paymentMethod: 'Visa •••• 4242'
  },
  {
    id: 'sub-tbl-6',
    name: 'Adobe Creative Cloud',
    category: 'Design Tools',
    logoType: 'adobe',
    bgColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    monthlyUSD: 54.99,
    monthlyINR: 4575,
    renewalDate: '2026-07-29',
    billingCycle: 'Annual',
    status: 'Cancelled',
    paymentMethod: 'Mastercard •••• 8812'
  },
  {
    id: 'sub-tbl-7',
    name: 'Notion AI Workspace',
    category: 'Productivity',
    logoType: 'notion',
    bgColor: 'bg-gray-500/10 text-gray-200 border-gray-500/30',
    monthlyUSD: 10.00,
    monthlyINR: 830,
    renewalDate: '2026-08-02',
    billingCycle: 'Monthly',
    status: 'Paused',
    paymentMethod: 'Visa •••• 4242'
  }
];

/**
 * Render brand logos safely
 */
const renderSubscriptionLogo = (logoType, name) => {
  const type = (logoType || name || '').toLowerCase();
  if (type.includes('netflix')) return <SiNetflix className="w-5 h-5 text-red-500" />;
  if (type.includes('spotify')) return <SiSpotify className="w-5 h-5 text-emerald-400" />;
  if (type.includes('figma')) return <SiFigma className="w-5 h-5 text-purple-400" />;
  if (type.includes('notion')) return <SiNotion className="w-5 h-5 text-slate-200" />;
  if (type.includes('github')) return <SiGithub className="w-5 h-5 text-slate-200" />;
  if (type.includes('canva')) return <FiCreditCard className="w-5 h-5 text-cyan-400" />;
  if (type.includes('adobe')) return <FiCreditCard className="w-5 h-5 text-rose-500" />;
  if (type.includes('chatgpt') || type.includes('openai')) return <FiCpu className="w-5 h-5 text-emerald-400" />;
  if (type.includes('aws') || type.includes('cloud')) return <FiCloud className="w-5 h-5 text-amber-400" />;
  if (type.includes('slack')) return <FiMessageSquare className="w-5 h-5 text-indigo-400" />;
  if (type.includes('disney') || type.includes('tv')) return <FiTv className="w-5 h-5 text-blue-400" />;

  const initial = name ? name.charAt(0).toUpperCase() : 'S';
  return <span className="text-sm font-bold text-blue-400">{initial}</span>;
};

/**
 * Render Status Badge
 */
const renderStatusBadge = (status) => {
  const s = (status || 'active').toLowerCase();
  if (s === 'active') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
        <FiCheckCircle className="w-3 h-3 text-emerald-400" />
        Active
      </span>
    );
  }
  if (s === 'paused') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/25">
        <FiPauseCircle className="w-3 h-3 text-amber-400" />
        Paused
      </span>
    );
  }
  if (s === 'cancelled' || s === 'canceled') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/25">
        <FiSlash className="w-3 h-3 text-rose-400" />
        Cancelled
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/25">
      {status}
    </span>
  );
};

/**
 * SubscriptionTable Component
 *
 * Modern subscription table component with columns:
 * - Logo & Subscription Name
 * - Category
 * - Monthly Cost (USD / INR)
 * - Renewal Date
 * - Status Badge (Active, Paused, Cancelled)
 * - Actions (View Details, Pause, Cancel)
 */
const SubscriptionTable = ({
  subscriptions = DEFAULT_TABLE_SUBSCRIPTIONS,
  onViewDetails,
  onPause,
  onResume,
  onCancel,
  currencyMode: initialCurrencyMode = 'dual'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currencyMode, setCurrencyMode] = useState(initialCurrencyMode);
  const [sortField, setSortField] = useState('monthlyUSD');
  const [sortOrder, setSortOrder] = useState('desc');

  const categories = ['All', ...new Set(subscriptions.map((item) => item.category))];

  // Sorting Handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Filter & Sort Logic
  const filteredData = subscriptions
    .filter((sub) => {
      const matchesSearch =
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || sub.category === categoryFilter;
      const matchesStatus =
        statusFilter === 'All' || sub.status?.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') {
        return sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });

  const totalMonthlyUSD = filteredData.reduce((sum, item) => sum + (item.monthlyUSD || 0), 0);
  const totalMonthlyINR = filteredData.reduce((sum, item) => sum + (item.monthlyINR || 0), 0);

  return (
    <div className="w-full space-y-4">
      {/* Search & Filter Header */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span>Subscriptions List</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {filteredData.length} Items
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage active billing, cycles, renewal dates, and status
          </p>
        </div>

        {/* Control Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-52">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search subscriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-slate-900 text-white">
                Category: {cat}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="All" className="bg-slate-900 text-white">Status: All</option>
            <option value="Active" className="bg-slate-900 text-white">Active</option>
            <option value="Paused" className="bg-slate-900 text-white">Paused</option>
            <option value="Cancelled" className="bg-slate-900 text-white">Cancelled</option>
          </select>

          {/* Currency Toggle */}
          <button
            onClick={() => {
              const modes = ['dual', 'USD', 'INR'];
              const nextIndex = (modes.indexOf(currencyMode) + 1) % modes.length;
              setCurrencyMode(modes[nextIndex]);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-emerald-400 flex items-center gap-1 transition-colors"
            title="Toggle currency mode"
          >
            <FiDollarSign className="w-3.5 h-3.5" />
            <span className="uppercase">{currencyMode}</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[720px]">
            {/* Table Header */}
            <thead>
              <tr className="bg-slate-800/60 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th
                  onClick={() => handleSort('name')}
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Subscription Name</span>
                    {sortField === 'name' && (sortOrder === 'asc' ? <FiChevronUp /> : <FiChevronDown />)}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('category')}
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Category</span>
                    {sortField === 'category' && (sortOrder === 'asc' ? <FiChevronUp /> : <FiChevronDown />)}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('monthlyUSD')}
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Monthly Cost</span>
                    {sortField === 'monthlyUSD' && (sortOrder === 'asc' ? <FiChevronUp /> : <FiChevronDown />)}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('renewalDate')}
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Renewal Date</span>
                    {sortField === 'renewalDate' && (sortOrder === 'asc' ? <FiChevronUp /> : <FiChevronDown />)}
                  </div>
                </th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-800/60 text-xs">
              <AnimatePresence>
                {filteredData.map((sub) => {
                  const isPaused = sub.status?.toLowerCase() === 'paused';
                  const isCancelled = sub.status?.toLowerCase() === 'cancelled' || sub.status?.toLowerCase() === 'canceled';

                  return (
                    <motion.tr
                      key={sub.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Logo & Subscription Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                              sub.bgColor || 'bg-slate-800 text-blue-400 border-slate-700'
                            }`}
                          >
                            {renderSubscriptionLogo(sub.logoType, sub.name)}
                          </div>
                          <div>
                            <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                              {sub.name}
                            </div>
                            <div className="text-[10px] text-slate-500 flex items-center gap-1">
                              <FiCreditCard className="w-3 h-3 text-slate-400" />
                              <span>{sub.paymentMethod || 'Visa •••• 4242'}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60">
                          {sub.category}
                        </span>
                      </td>

                      {/* Monthly Cost (USD / INR) */}
                      <td className="py-3.5 px-4">
                        {currencyMode === 'USD' && (
                          <div className="font-bold text-white">${sub.monthlyUSD?.toFixed(2)}</div>
                        )}
                        {currencyMode === 'INR' && (
                          <div className="font-bold text-emerald-400">₹{sub.monthlyINR?.toLocaleString()}</div>
                        )}
                        {currencyMode === 'dual' && (
                          <div>
                            <div className="font-bold text-white">${sub.monthlyUSD?.toFixed(2)}</div>
                            <div className="text-[10px] font-semibold text-emerald-400">₹{sub.monthlyINR?.toLocaleString()}</div>
                          </div>
                        )}
                        <div className="text-[10px] text-slate-500">{sub.billingCycle || 'Monthly'}</div>
                      </td>

                      {/* Renewal Date */}
                      <td className="py-3.5 px-4">
                        <div className="text-slate-200 font-medium flex items-center gap-1.5">
                          <FiCalendar className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{sub.renewalDate}</span>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4">
                        {renderStatusBadge(sub.status)}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Details */}
                          <button
                            onClick={() => onViewDetails && onViewDetails(sub)}
                            className="px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] font-semibold transition-all flex items-center gap-1"
                            title="View Details"
                          >
                            <FiEye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </button>

                          {/* Pause / Resume */}
                          <button
                            onClick={() => {
                              if (isPaused) {
                                if (onResume) onResume(sub);
                                else if (onPause) onPause(sub);
                              } else {
                                if (onPause) onPause(sub);
                              }
                            }}
                            disabled={isCancelled}
                            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 border ${
                              isPaused
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                                : 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
                            } ${isCancelled ? 'opacity-50 cursor-not-allowed' : ''}`}
                            title={isPaused ? 'Resume Subscription' : 'Pause Subscription'}
                          >
                            {isPaused ? (
                              <>
                                <FiPlay className="w-3.5 h-3.5" />
                                <span>Resume</span>
                              </>
                            ) : (
                              <>
                                <FiPauseCircle className="w-3.5 h-3.5" />
                                <span>Pause</span>
                              </>
                            )}
                          </button>

                          {/* Cancel */}
                          <button
                            onClick={() => onCancel && onCancel(sub)}
                            disabled={isCancelled}
                            className={`p-1.5 rounded-lg text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all ${
                              isCancelled ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            title="Cancel Subscription"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No subscriptions match your search or filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="p-4 bg-slate-800/40 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            Showing <strong className="text-white">{filteredData.length}</strong> of{' '}
            <strong className="text-white">{subscriptions.length}</strong> subscriptions
          </div>

          <div className="flex items-center gap-4">
            <span>
              Total Monthly Cost:{' '}
              <strong className="text-emerald-400">
                ${totalMonthlyUSD.toFixed(2)} (₹{totalMonthlyINR.toLocaleString()})
              </strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

SubscriptionTable.propTypes = {
  subscriptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string,
      monthlyUSD: PropTypes.number,
      monthlyINR: PropTypes.number,
      renewalDate: PropTypes.string,
      billingCycle: PropTypes.string,
      status: PropTypes.string,
      paymentMethod: PropTypes.string,
      logoType: PropTypes.string,
      bgColor: PropTypes.string
    })
  ),
  onViewDetails: PropTypes.func,
  onPause: PropTypes.func,
  onResume: PropTypes.func,
  onCancel: PropTypes.func,
  currencyMode: PropTypes.oneOf(['dual', 'USD', 'INR'])
};

export default SubscriptionTable;
