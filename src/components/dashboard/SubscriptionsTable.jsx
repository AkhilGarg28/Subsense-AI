import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiFilter,
  FiChevronUp,
  FiChevronDown,
  FiMoreVertical,
  FiAlertCircle,
  FiTrendingUp,
  FiCheckCircle,
  FiPauseCircle,
  FiSlash,
  FiExternalLink,
  FiDollarSign,
  FiCalendar,
  FiLayers,
  FiEdit,
  FiTrash2,
  FiPlay,
  FiCpu,
  FiCloud,
  FiTv,
  FiMessageSquare,
} from 'react-icons/fi';
import {
  SiNetflix,
  SiSpotify,
  SiFigma,
  SiNotion,
  SiGithub,
} from 'react-icons/si';

/**
 * Default mock subscriptions list for SubSense AI
 */
const DEFAULT_SUBSCRIPTIONS = [
  {
    id: 'sub-1',
    name: 'Netflix Premium',
    category: 'Entertainment',
    logoType: 'netflix',
    bgColor: 'bg-red-500/10 text-red-500 border-red-500/30',
    monthlyUSD: 19.99,
    monthlyINR: 1660,
    renewalDate: '2026-08-15',
    renewalCycle: 'Monthly',
    status: 'Active', // 'Active' | 'Price Increased' | 'Unused' | 'Expiring Soon' | 'Paused'
    usageRate: '85%',
    lastUsed: '2 hours ago',
    billingCard: 'Visa •••• 4242'
  },
  {
    id: 'sub-2',
    name: 'ChatGPT Plus',
    category: 'AI & Productivity',
    logoType: 'openai',
    bgColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    monthlyUSD: 20.00,
    monthlyINR: 1660,
    renewalDate: '2026-08-01',
    renewalCycle: 'Monthly',
    status: 'Price Increased',
    priceIncreaseInfo: 'Increased by +$2.00/mo',
    usageRate: '96%',
    lastUsed: 'Yesterday',
    billingCard: 'Mastercard •••• 8812'
  },
  {
    id: 'sub-3',
    name: 'Figma Professional',
    category: 'Design Tools',
    logoType: 'figma',
    bgColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    monthlyUSD: 15.00,
    monthlyINR: 1245,
    renewalDate: '2026-08-10',
    renewalCycle: 'Monthly',
    status: 'Active',
    usageRate: '90%',
    lastUsed: '3 hours ago',
    billingCard: 'Visa •••• 4242'
  },
  {
    id: 'sub-4',
    name: 'AWS Cloud Hosting',
    category: 'Infrastructure',
    logoType: 'aws',
    bgColor: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    monthlyUSD: 142.30,
    monthlyINR: 11840,
    renewalDate: '2026-07-31',
    renewalCycle: 'Usage Based',
    status: 'Active',
    usageRate: '100%',
    lastUsed: 'Just now',
    billingCard: 'Amex •••• 9901'
  },
  {
    id: 'sub-5',
    name: 'Spotify Family Plan',
    category: 'Music & Audio',
    logoType: 'spotify',
    bgColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    monthlyUSD: 15.99,
    monthlyINR: 1329,
    renewalDate: '2026-08-05',
    renewalCycle: 'Monthly',
    status: 'Active',
    usageRate: '78%',
    lastUsed: '1 day ago',
    billingCard: 'Visa •••• 4242'
  },
  {
    id: 'sub-6',
    name: 'Adobe Creative Cloud',
    category: 'Design Tools',
    logoType: 'adobe',
    bgColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    monthlyUSD: 54.99,
    monthlyINR: 4575,
    renewalDate: '2026-07-29',
    renewalCycle: 'Annual',
    status: 'Unused',
    usageRate: '5%',
    lastUsed: '42 days ago',
    billingCard: 'Mastercard •••• 8812'
  },
  {
    id: 'sub-7',
    name: 'GitHub Copilot Enterprise',
    category: 'Developer Tools',
    logoType: 'github',
    bgColor: 'bg-slate-500/10 text-slate-300 border-slate-500/30',
    monthlyUSD: 19.00,
    monthlyINR: 1580,
    renewalDate: '2026-08-18',
    renewalCycle: 'Monthly',
    status: 'Active',
    usageRate: '92%',
    lastUsed: 'Today',
    billingCard: 'Visa •••• 4242'
  },
  {
    id: 'sub-8',
    name: 'Notion AI Workspace',
    category: 'Productivity',
    logoType: 'notion',
    bgColor: 'bg-gray-500/10 text-gray-200 border-gray-500/30',
    monthlyUSD: 10.00,
    monthlyINR: 830,
    renewalDate: '2026-08-02',
    renewalCycle: 'Monthly',
    status: 'Paused',
    usageRate: '0%',
    lastUsed: '18 days ago',
    billingCard: 'Visa •••• 4242'
  },
  {
    id: 'sub-9',
    name: 'Disney+ Hotstar',
    category: 'Entertainment',
    logoType: 'disney',
    bgColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    monthlyUSD: 7.99,
    monthlyINR: 660,
    renewalDate: '2026-07-28',
    renewalCycle: 'Monthly',
    status: 'Expiring Soon',
    usageRate: '30%',
    lastUsed: '5 days ago',
    billingCard: 'Visa •••• 4242'
  },
  {
    id: 'sub-10',
    name: 'Slack Pro Workspace',
    category: 'Communication',
    logoType: 'slack',
    bgColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    monthlyUSD: 12.50,
    monthlyINR: 1040,
    renewalDate: '2026-08-22',
    renewalCycle: 'Monthly',
    status: 'Active',
    usageRate: '88%',
    lastUsed: 'Today',
    billingCard: 'Visa •••• 4242'
  }
];

/**
 * Render brand logos safely
 */
const RenderSubscriptionLogo = ({ logoType }) => {
  switch (logoType) {
    case 'netflix':
      return <SiNetflix className="w-5 h-5 text-red-500" />;
    case 'openai':
      return <FiCpu className="w-5 h-5 text-emerald-400" />;
    case 'figma':
      return <SiFigma className="w-5 h-5 text-purple-400" />;
    case 'aws':
      return <FiCloud className="w-5 h-5 text-orange-400" />;
    case 'spotify':
      return <SiSpotify className="w-5 h-5 text-emerald-400" />;
    case 'adobe':
      return <FiLayers className="w-5 h-5 text-rose-500" />;
    case 'github':
      return <SiGithub className="w-5 h-5 text-slate-200" />;
    case 'notion':
      return <SiNotion className="w-5 h-5 text-slate-200" />;
    case 'disney':
      return <FiTv className="w-5 h-5 text-blue-400" />;
    case 'slack':
      return <FiMessageSquare className="w-5 h-5 text-indigo-400" />;
    default:
      return <FiLayers className="w-5 h-5 text-blue-400" />;
  }
};

/**
 * Status Badge Component
 */
const RenderStatusBadge = ({ status, priceInfo }) => {
  switch (status) {
    case 'Active':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <FiCheckCircle className="w-3 h-3" />
          Active
        </span>
      );
    case 'Price Increased':
      return (
        <span
          title={priceInfo || 'Price increased recently'}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-500/15 text-amber-300 border border-amber-500/40 cursor-help"
        >
          <FiTrendingUp className="w-3 h-3 text-amber-400" />
          Price Increased
        </span>
      );
    case 'Unused':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-rose-500/15 text-rose-400 border border-rose-500/30">
          <FiAlertCircle className="w-3 h-3" />
          Unused
        </span>
      );
    case 'Expiring Soon':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-purple-500/15 text-purple-300 border border-purple-500/30">
          <FiCalendar className="w-3 h-3" />
          Expiring Soon
        </span>
      );
    case 'Paused':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-500/20 text-slate-400 border border-slate-500/30">
          <FiPauseCircle className="w-3 h-3" />
          Paused
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/30">
          {status}
        </span>
      );
  }
};

/**
 * SubscriptionsTable Component
 * 
 * Modern fintech table displaying subscription avatar, name, category,
 * monthly cost (USD/INR), renewal date, usage/status badge, and manage/cancel/pause action triggers.
 *
 * @param {Object} props
 * @param {Array} [props.subscriptions] - List of subscription objects
 * @param {Function} [props.onManage] - Handler when manage clicked
 * @param {Function} [props.onCancel] - Handler when cancel clicked
 * @param {Function} [props.onPause] - Handler when pause clicked
 * @param {string} [props.currency='dual'] - Currency view mode ('USD' | 'INR' | 'dual')
 */
const SubscriptionsTable = ({
  subscriptions = DEFAULT_SUBSCRIPTIONS,
  onManage,
  onCancel,
  onPause,
  currency = 'dual'
}) => {
  const [data, setData] = useState(subscriptions);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currencyMode, setCurrencyMode] = useState(currency);
  const [sortField, setSortField] = useState('monthlyUSD');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' | 'desc'
  const [activeModal, setActiveModal] = useState(null); // { type: 'manage'|'cancel', item: sub }

  // Toggle pause/resume state
  const handleTogglePause = (sub) => {
    setData((prev) =>
      prev.map((item) => {
        if (item.id === sub.id) {
          const newStatus = item.status === 'Paused' ? 'Active' : 'Paused';
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
    if (onPause) onPause(sub);
  };

  // Cancel subscription
  const handleConfirmCancel = (subId) => {
    setData((prev) => prev.filter((item) => item.id !== subId));
    if (onCancel) onCancel(subId);
    setActiveModal(null);
  };

  // Sorting Handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Unique categories list for filtering
  const categories = ['All', ...new Set(data.map((item) => item.category))];

  // Filtering and Sorting logic
  const filteredData = data
    .filter((sub) => {
      const matchesSearch =
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || sub.category === categoryFilter;
      const matchesStatus = statusFilter === 'All' || sub.status === statusFilter;
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

  // Calculate summary calculations
  const totalMonthlyUSD = filteredData.reduce((sum, item) => sum + item.monthlyUSD, 0);
  const totalMonthlyINR = filteredData.reduce((sum, item) => sum + item.monthlyINR, 0);

  return (
    <div className="w-full space-y-4">
      {/* Table Top Toolbar */}
      <div className="p-4 rounded-2xl glass border border-slate-700/60 bg-slate-900/90 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>Subscriptions Portfolio</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {filteredData.length} Active
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor renewal schedules, price updates, and monthly spend
          </p>
        </div>

        {/* Filters & Actions Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-56">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search subscriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Category Dropdown */}
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

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="All" className="bg-slate-900 text-white">Status: All</option>
            <option value="Active" className="bg-slate-900 text-white">Active</option>
            <option value="Price Increased" className="bg-slate-900 text-white">Price Increased</option>
            <option value="Unused" className="bg-slate-900 text-white">Unused</option>
            <option value="Expiring Soon" className="bg-slate-900 text-white">Expiring Soon</option>
            <option value="Paused" className="bg-slate-900 text-white">Paused</option>
          </select>

          {/* Currency Toggle */}
          <button
            onClick={() => {
              const modes = ['dual', 'USD', 'INR'];
              const nextIndex = (modes.indexOf(currencyMode) + 1) % modes.length;
              setCurrencyMode(modes[nextIndex]);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-emerald-400 flex items-center gap-1.5 transition-colors"
            title="Toggle currency mode"
          >
            <FiDollarSign className="w-3.5 h-3.5" />
            <span className="uppercase">{currencyMode}</span>
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            {/* Table Header */}
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th
                  onClick={() => handleSort('name')}
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Subscription & Category</span>
                    {sortField === 'name' && (sortOrder === 'asc' ? <FiChevronUp /> : <FiChevronDown />)}
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
                <th className="py-3 px-4">Usage / Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-800/60 text-xs">
              <AnimatePresence>
                {filteredData.map((sub) => (
                  <motion.tr
                    key={sub.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Subscription & Category */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center border ${sub.bgColor}`}
                        >
                          <RenderSubscriptionLogo logoType={sub.logoType} />
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {sub.name}
                          </div>
                          <div className="text-[11px] text-slate-400">{sub.category}</div>
                        </div>
                      </div>
                    </td>

                    {/* Monthly Cost */}
                    <td className="py-3.5 px-4">
                      {currencyMode === 'USD' && (
                        <div className="font-bold text-white">${sub.monthlyUSD.toFixed(2)}</div>
                      )}
                      {currencyMode === 'INR' && (
                        <div className="font-bold text-white">₹{sub.monthlyINR.toLocaleString()}</div>
                      )}
                      {currencyMode === 'dual' && (
                        <div>
                          <div className="font-bold text-white">${sub.monthlyUSD.toFixed(2)}</div>
                          <div className="text-[10px] text-slate-400">₹{sub.monthlyINR.toLocaleString()}</div>
                        </div>
                      )}
                      <div className="text-[10px] text-slate-500">{sub.renewalCycle}</div>
                    </td>

                    {/* Renewal Date */}
                    <td className="py-3.5 px-4">
                      <div className="text-slate-200 font-medium">{sub.renewalDate}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <span>Card: {sub.billingCard}</span>
                      </div>
                    </td>

                    {/* Usage / Status Badge */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <RenderStatusBadge
                          status={sub.status}
                          priceInfo={sub.priceIncreaseInfo}
                        />
                        <div className="text-[10px] text-slate-400 flex items-center gap-2">
                          <span>Usage: <strong className="text-slate-200">{sub.usageRate}</strong></span>
                          <span>•</span>
                          <span className="text-slate-500">{sub.lastUsed}</span>
                        </div>
                      </div>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Manage Button */}
                        <button
                          onClick={() => {
                            setActiveModal({ type: 'manage', item: sub });
                            if (onManage) onManage(sub);
                          }}
                          className="px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] font-medium transition-all flex items-center gap-1"
                        >
                          <FiEdit className="w-3 h-3" />
                          <span>Manage</span>
                        </button>

                        {/* Pause / Resume Button */}
                        <button
                          onClick={() => handleTogglePause(sub)}
                          className={`px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 border ${
                            sub.status === 'Paused'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-amber-300 hover:bg-slate-700'
                          }`}
                          title={sub.status === 'Paused' ? 'Resume subscription' : 'Pause subscription'}
                        >
                          {sub.status === 'Paused' ? (
                            <>
                              <FiPlay className="w-3 h-3" />
                              <span>Resume</span>
                            </>
                          ) : (
                            <>
                              <FiPauseCircle className="w-3 h-3" />
                              <span>Pause</span>
                            </>
                          )}
                        </button>

                        {/* Cancel Button */}
                        <button
                          onClick={() => setActiveModal({ type: 'cancel', item: sub })}
                          className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
                          title="Cancel subscription"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No subscriptions match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Stats */}
        <div className="p-4 bg-slate-800/40 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            Showing <strong className="text-white">{filteredData.length}</strong> of{' '}
            <strong className="text-white">{data.length}</strong> subscriptions
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

      {/* Confirmation & Manage Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4">
            {activeModal.type === 'cancel' ? (
              <>
                <div className="flex items-center gap-3 text-rose-400">
                  <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                    <FiTrash2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Cancel Subscription</h3>
                    <p className="text-xs text-slate-400">This action will cancel recurring billing.</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  Are you sure you want to cancel <strong className="text-white">{activeModal.item.name}</strong>?
                  You will lose access at the end of the current billing cycle on{' '}
                  <span className="text-amber-400 font-semibold">{activeModal.item.renewalDate}</span>.
                </p>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    Keep Subscription
                  </button>
                  <button
                    onClick={() => handleConfirmCancel(activeModal.item.id)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20"
                  >
                    Confirm Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <RenderSubscriptionLogo logoType={activeModal.item.logoType} />
                    <h3 className="text-base font-bold text-white">Manage {activeModal.item.name}</h3>
                  </div>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Category</span>
                    <span className="font-semibold text-white">{activeModal.item.category}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Monthly Cost</span>
                    <span className="font-semibold text-emerald-400">
                      ${activeModal.item.monthlyUSD.toFixed(2)} / ₹{activeModal.item.monthlyINR.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Billing Card</span>
                    <span className="font-semibold text-white">{activeModal.item.billingCard}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Usage Analytics</span>
                    <span className="font-semibold text-white">{activeModal.item.usageRate} active</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    Done
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionsTable;
