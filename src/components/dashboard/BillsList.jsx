import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiClock, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiRefreshCw, 
  FiCreditCard, 
  FiCalendar, 
  FiFilter, 
  FiSearch,
  FiExternalLink,
  FiZap,
  FiDollarSign,
  FiChevronRight,
  FiCloud
} from 'react-icons/fi';
import { SiNetflix, SiSpotify } from 'react-icons/si';

/**
 * Default mock bills dataset
 */
const DEFAULT_BILLS = [
  {
    id: 'bill-1',
    title: 'Netflix 4K Ultra HD',
    provider: 'Netflix',
    category: 'Entertainment',
    amountUSD: 19.99,
    amountINR: 1660,
    dueDate: '2026-07-28',
    dueDateLabel: 'In 3 days',
    status: 'Due Soon', // 'Due Soon' | 'Autopay Enabled' | 'Pending' | 'Paid' | 'Overdue'
    autopay: true,
    accountNumber: '•••• 4892',
    iconType: 'netflix',
    color: 'from-red-500/20 to-red-900/40',
    borderColor: 'border-red-500/30',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    billingCycle: 'Monthly'
  },
  {
    id: 'bill-2',
    title: 'Spotify Family Plan',
    provider: 'Spotify',
    category: 'Music & Audio',
    amountUSD: 15.99,
    amountINR: 1329,
    dueDate: '2026-08-01',
    dueDateLabel: 'In 7 days',
    status: 'Autopay Enabled',
    autopay: true,
    accountNumber: '•••• 1024',
    iconType: 'spotify',
    color: 'from-emerald-500/20 to-emerald-900/40',
    borderColor: 'border-emerald-500/30',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    billingCycle: 'Monthly'
  },
  {
    id: 'bill-3',
    title: 'Electricity Utility Bill',
    provider: 'State Power Corp',
    category: 'Utilities',
    amountUSD: 84.50,
    amountINR: 7030,
    dueDate: '2026-07-26',
    dueDateLabel: 'Due Tomorrow',
    status: 'Pending',
    autopay: false,
    accountNumber: 'ACCT-90812',
    iconType: 'electricity',
    color: 'from-amber-500/20 to-amber-900/40',
    borderColor: 'border-amber-500/30',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    billingCycle: 'Variable'
  },
  {
    id: 'bill-4',
    title: 'AWS Cloud Services',
    provider: 'Amazon Web Services',
    category: 'Infrastructure',
    amountUSD: 142.30,
    amountINR: 11840,
    dueDate: '2026-07-31',
    dueDateLabel: 'In 6 days',
    status: 'Autopay Enabled',
    autopay: true,
    accountNumber: 'AWS-7819-2041',
    iconType: 'aws',
    color: 'from-orange-500/20 to-orange-900/40',
    borderColor: 'border-orange-500/30',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    billingCycle: 'Usage Based'
  }
];

/**
 * Component helper to render specific provider icons safely
 */
const RenderProviderIcon = ({ type }) => {
  switch (type) {
    case 'netflix':
      return <SiNetflix className="w-6 h-6 text-red-500" />;
    case 'spotify':
      return <SiSpotify className="w-6 h-6 text-emerald-400" />;
    case 'aws':
      return <FiCloud className="w-6 h-6 text-orange-400" />;
    case 'electricity':
      return <FiZap className="w-6 h-6 text-amber-400" />;
    default:
      return <FiCreditCard className="w-6 h-6 text-blue-400" />;
  }
};

/**
 * BillsList Component
 * 
 * Displays upcoming bills with due dates, amounts in USD/INR, autopay status,
 * filters, search, and action triggers (Pay Now / Manage).
 *
 * @param {Object} props
 * @param {Array} [props.bills] - Custom bills list
 * @param {Function} [props.onPay] - Callback when user clicks Pay
 * @param {Function} [props.onManage] - Callback when user clicks Manage
 * @param {string} [props.currency='dual'] - Currency display mode ('USD' | 'INR' | 'dual')
 */
const BillsList = ({
  bills = DEFAULT_BILLS,
  onPay,
  onManage,
  currency = 'dual'
}) => {
  const [billsData, setBillsData] = useState(bills);
  const [filter, setFilter] = useState('All'); // 'All' | 'Due Soon' | 'Autopay Enabled' | 'Pending'
  const [searchQuery, setSearchQuery] = useState('');
  const [currencyMode, setCurrencyMode] = useState(currency);
  const [processingId, setProcessingId] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);

  // Handle Pay Action
  const handlePay = (bill) => {
    setProcessingId(bill.id);
    setTimeout(() => {
      setBillsData((prev) =>
        prev.map((item) =>
          item.id === bill.id
            ? { ...item, status: 'Paid', dueDateLabel: 'Paid Today' }
            : item
        )
      );
      setProcessingId(null);
      if (onPay) onPay(bill);
    }, 900);
  };

  // Handle Manage Action
  const handleManage = (bill) => {
    setSelectedBill(bill);
    if (onManage) onManage(bill);
  };

  // Filter bills based on search and selected tab
  const filteredBills = billsData.filter((bill) => {
    const title = (bill.name || bill.title || '').toLowerCase();
    const provider = (bill.merchant || bill.provider || '').toLowerCase();
    const category = (bill.category || '').toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      title.includes(query) || provider.includes(query) || category.includes(query);

    if (!matchesSearch) return false;

    if (filter === 'All') return true;
    if (filter === 'Due Soon') return bill.status === 'Due Soon';
    if (filter === 'Autopay Enabled') return bill.autopay || bill.status === 'Autopay Enabled';
    if (filter === 'Pending') return bill.status === 'Pending';
    return true;
  });

  // Helper to parse numeric values safely
  const parseAmountNum = (val) => {
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      const parsed = parseFloat(val.replace(/[^0-9.]/g, ''));
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  // Calculate totals safely
  const totalUpcomingUSD = billsData
    .filter((b) => b.status !== 'Paid')
    .reduce((sum, b) => sum + parseAmountNum(b.amountUSD), 0);

  const totalUpcomingINR = billsData
    .filter((b) => b.status !== 'Paid')
    .reduce((sum, b) => sum + parseAmountNum(b.amountINR), 0);

  const dueSoonCount = billsData.filter((b) => b.status === 'Due Soon' || b.status === 'Pending').length;

  return (
    <div className="w-full space-y-5">
      {/* Top Header Card / Overview */}
      <div className="p-5 rounded-2xl glass border border-slate-700/60 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90 shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <FiCalendar className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">Upcoming Bills</h2>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Track, manage, and automate your recurring bill payments
            </p>
          </div>

          {/* Quick Metrics & Currency Switch */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="px-4 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-right">
              <div className="text-xs text-slate-400">Total Upcoming</div>
              <div className="text-base font-bold text-white">
                {currencyMode === 'USD' && `$${Number(totalUpcomingUSD).toFixed(2)}`}
                {currencyMode === 'INR' && `₹${Math.round(totalUpcomingINR).toLocaleString()}`}
                {currencyMode === 'dual' && `$${Number(totalUpcomingUSD).toFixed(2)} (₹${Math.round(totalUpcomingINR).toLocaleString()})`}
              </div>
            </div>

            <button
              onClick={() => {
                const modes = ['dual', 'USD', 'INR'];
                const nextIndex = (modes.indexOf(currencyMode) + 1) % modes.length;
                setCurrencyMode(modes[nextIndex]);
              }}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all flex items-center gap-1.5"
              title="Toggle currency display mode"
            >
              <FiDollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span className="uppercase">{currencyMode}</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-5 pt-4 border-t border-slate-700/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {['All', 'Due Soon', 'Autopay Enabled', 'Pending'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  filter === tab
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab}
                {tab === 'Due Soon' && dueSoonCount > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {dueSoonCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[200px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search bills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Bills Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredBills.map((bill) => {
            const isProcessing = processingId === bill.id;
            const isPaid = bill.status === 'Paid';

            return (
              <motion.div
                key={bill.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`p-5 rounded-2xl border bg-slate-900/80 backdrop-blur-md hover:bg-slate-800/80 transition-all duration-300 shadow-md group relative overflow-hidden flex flex-col justify-between ${
                  isPaid
                    ? 'border-emerald-500/30 bg-emerald-950/10'
                    : bill.status === 'Due Soon'
                    ? 'border-amber-500/30 hover:border-amber-500/50'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Accent top gradient line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${bill.color}`}
                />

                {/* Card Main Info */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                        <RenderProviderIcon type={bill.iconType} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {bill.title}
                        </h3>
                        <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{bill.provider}</span>
                          <span>•</span>
                          <span className="text-slate-500">{bill.category}</span>
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-full border flex items-center gap-1 ${
                          isPaid
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : bill.status === 'Due Soon'
                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                            : bill.status === 'Pending'
                            ? 'bg-rose-500/15 text-rose-300 border-rose-500/40'
                            : 'bg-blue-500/15 text-blue-300 border-blue-500/40'
                        }`}
                      >
                        {isPaid && <FiCheckCircle className="w-3 h-3" />}
                        {bill.status === 'Due Soon' && <FiClock className="w-3 h-3" />}
                        {bill.status === 'Pending' && <FiAlertTriangle className="w-3 h-3" />}
                        {bill.status === 'Autopay Enabled' && <FiRefreshCw className="w-3 h-3" />}
                        {bill.status}
                      </span>
                    </div>
                  </div>

                  {/* Pricing and Due Details */}
                  <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-end justify-between">
                    <div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <FiCalendar className="w-3 h-3 text-slate-400" />
                        <span>Due Date</span>
                      </div>
                      <div className="text-xs font-medium text-slate-300 mt-0.5 flex items-center gap-1.5">
                        <span>{bill.dueDate}</span>
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                          {bill.dueDateLabel}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-400 font-medium">
                        {currencyMode === 'USD' && (
                          <span className="text-lg font-bold text-white">${bill.amountUSD.toFixed(2)}</span>
                        )}
                        {currencyMode === 'INR' && (
                          <span className="text-lg font-bold text-white">₹{bill.amountINR.toLocaleString()}</span>
                        )}
                        {currencyMode === 'dual' && (
                          <div className="flex flex-col items-end">
                            <span className="text-lg font-bold text-white">${bill.amountUSD.toFixed(2)}</span>
                            <span className="text-[11px] font-medium text-slate-400">₹{bill.amountINR.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="inline-block w-2 h-2 rounded-full bg-slate-600" />
                    <span>{bill.accountNumber}</span>
                    {bill.autopay && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-medium">
                        Autopay On
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleManage(bill)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 transition-all flex items-center gap-1"
                    >
                      <span>Manage</span>
                      <FiChevronRight className="w-3.5 h-3.5" />
                    </button>

                    {!isPaid ? (
                      <button
                        onClick={() => handlePay(bill)}
                        disabled={isProcessing}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <>
                            <FiRefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Paying...</span>
                          </>
                        ) : (
                          <>
                            <FiCreditCard className="w-3.5 h-3.5" />
                            <span>Pay Now</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
                        <FiCheckCircle className="w-3.5 h-3.5" />
                        <span>Paid</span>
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredBills.length === 0 && (
        <div className="p-8 text-center rounded-2xl border border-slate-800 bg-slate-900/50">
          <FiCalendar className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-slate-300">No bills found</h4>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search query.</p>
        </div>
      )}

      {/* Bill Manage Modal */}
      {selectedBill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <RenderProviderIcon type={selectedBill.iconType} />
                <h3 className="text-base font-bold text-white">{selectedBill.title}</h3>
              </div>
              <button
                onClick={() => setSelectedBill(null)}
                className="text-slate-400 hover:text-white text-lg font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Provider</span>
                <span className="font-semibold text-white">{selectedBill.provider}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Account / Card</span>
                <span className="font-semibold text-white">{selectedBill.accountNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Billing Cycle</span>
                <span className="font-semibold text-white">{selectedBill.billingCycle}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Due Date</span>
                <span className="font-semibold text-white">{selectedBill.dueDate} ({selectedBill.dueDateLabel})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Amount USD</span>
                <span className="font-semibold text-emerald-400">${selectedBill.amountUSD.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Amount INR</span>
                <span className="font-semibold text-emerald-400">₹{selectedBill.amountINR.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedBill(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handlePay(selectedBill);
                  setSelectedBill(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white"
              >
                Pay Bill Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillsList;
