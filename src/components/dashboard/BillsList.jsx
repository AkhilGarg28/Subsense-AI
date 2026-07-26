import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCalendar,
  FiCreditCard,
  FiCheckCircle,
  FiChevronRight,
  FiSearch,
  FiX,
  FiDollarSign,
  FiRefreshCw,
  FiLayers,
  FiShoppingBag,
  FiCloud,
  FiMessageSquare,
  FiTv,
} from 'react-icons/fi';

const mockBillsData = [
  {
    id: 'bill-101',
    name: 'Netflix Premium Plan',
    category: 'Entertainment',
    amountUSD: 19.99,
    amountINR: 1499,
    dueDate: '2026-08-02',
    dueDateLabel: 'In 2 days',
    status: 'Due Soon',
    statusType: 'warning',
    logo: 'netflix',
    autopay: true,
    paymentMethod: 'Visa •••• 4242',
    accountNumber: 'ACC-99241',
  },
  {
    id: 'bill-102',
    name: 'Spotify Family Subscription',
    category: 'Music & Audio',
    amountUSD: 11.99,
    amountINR: 999,
    dueDate: '2026-08-05',
    dueDateLabel: 'In 5 days',
    status: 'Autopay Enabled',
    statusType: 'success',
    logo: 'spotify',
    autopay: true,
    paymentMethod: 'Apple Pay',
    accountNumber: 'ACC-88312',
  },
  {
    id: 'bill-103',
    name: 'AWS Cloud Infrastructure',
    category: 'Hosting & Cloud',
    amountUSD: 145.50,
    amountINR: 12100,
    dueDate: '2026-08-10',
    dueDateLabel: 'In 10 days',
    status: 'Pending',
    statusType: 'info',
    logo: 'cloud',
    autopay: false,
    paymentMethod: 'MasterCard •••• 8810',
    accountNumber: 'AWS-3091-88',
  },
  {
    id: 'bill-104',
    name: 'Adobe Creative Cloud',
    category: 'Design & Software',
    amountUSD: 54.99,
    amountINR: 4500,
    dueDate: '2026-08-14',
    dueDateLabel: 'In 14 days',
    status: 'Pending',
    statusType: 'info',
    logo: 'adobe',
    autopay: false,
    paymentMethod: 'Visa •••• 4242',
    accountNumber: 'ADB-77104',
  },
  {
    id: 'bill-105',
    name: 'Slack Business+ Workspace',
    category: 'Productivity',
    amountUSD: 24.00,
    amountINR: 1999,
    dueDate: '2026-08-18',
    dueDateLabel: 'In 18 days',
    status: 'Autopay Enabled',
    statusType: 'success',
    logo: 'slack',
    autopay: true,
    paymentMethod: 'Corporate Card',
    accountNumber: 'SLK-1092',
  },
];

const formatUSDVal = (val) => {
  if (typeof val === 'number') return `$${val.toFixed(2)}`;
  if (typeof val === 'string') {
    return val.startsWith('$') ? val : `$${val}`;
  }
  return '$0.00';
};

const formatINRVal = (val) => {
  if (typeof val === 'number') return `₹${val.toLocaleString()}`;
  if (typeof val === 'string') {
    return val.startsWith('₹') ? val : `₹${val}`;
  }
  return '₹0';
};

const renderBillLogo = (logo, name) => {
  const l = (logo || name || '').toLowerCase();
  if (l.includes('netflix') || l.includes('tv')) return <FiTv className="w-5 h-5 text-red-500" />;
  if (l.includes('spotify')) return <FiTv className="w-5 h-5 text-emerald-400" />;
  if (l.includes('amazon') || l.includes('shopping')) return <FiShoppingBag className="w-5 h-5 text-amber-400" />;
  if (l.includes('adobe') || l.includes('layer')) return <FiLayers className="w-5 h-5 text-rose-500" />;
  if (l.includes('cloud') || l.includes('aws')) return <FiCloud className="w-5 h-5 text-blue-400" />;
  if (l.includes('slack') || l.includes('message')) return <FiMessageSquare className="w-5 h-5 text-indigo-400" />;

  return (
    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xs">
      {(name || 'B').charAt(0).toUpperCase()}
    </div>
  );
};

const BillsList = ({
  bills = mockBillsData,
  onPayBill,
  onManageBill,
  className = '',
}) => {
  const billsData = bills && bills.length > 0 ? bills : mockBillsData;

  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currencyMode, setCurrencyMode] = useState('dual');
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handlePay = (bill) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      showToast(`Successfully paid ${bill.name}!`, 'success');
      if (onPayBill) onPayBill(bill);
    }, 900);
  };

  const handleManage = (bill) => {
    if (onManageBill) onManageBill(bill);
  };

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

  const parseAmountNum = (val) => {
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      const parsed = parseFloat(val.replace(/[^0-9.]/g, ''));
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  const totalUpcomingUSD = billsData
    .filter((b) => b.status !== 'Paid')
    .reduce((sum, b) => sum + parseAmountNum(b.amountUSD), 0);

  const totalUpcomingINR = billsData
    .filter((b) => b.status !== 'Paid')
    .reduce((sum, b) => sum + parseAmountNum(b.amountINR), 0);

  return (
    <div className={`w-full space-y-5 ${className}`}>
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-[#171F2F] border border-[#22C55E]/40 text-white shadow-2xl backdrop-blur-xl">
          <FiCheckCircle className="w-4 h-4 text-[#22C55E]" />
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="p-6 rounded-[20px] border border-white/10 bg-[#171F2F]/80 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-[#5B8CFF]/15 text-[#5B8CFF] border border-[#5B8CFF]/30">
                <FiCalendar className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">Upcoming Bills & Debits</h2>
            </div>
            <p className="text-xs text-[#A1A8B5] mt-1">
              Track, manage, and automate your recurring bill payments
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap font-mono">
            <div className="px-4 py-2 rounded-xl bg-[#121A2F] border border-white/10 text-right">
              <div className="text-[10px] uppercase font-bold text-[#A1A8B5]">Total Upcoming</div>
              <div className="text-sm font-extrabold text-white">
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
              className="px-3.5 py-2.5 text-xs font-bold rounded-xl bg-[#121A2F] hover:bg-[#1E293B] text-white border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <FiDollarSign className="w-4 h-4 text-[#22C55E]" />
              <span>{currencyMode}</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar font-mono text-xs">
            {['All', 'Due Soon', 'Autopay Enabled', 'Pending'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer ${
                  filter === tab
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
              placeholder="Search bills..."
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

      {/* Bills Cards List Grid */}
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {filteredBills.map((bill) => {
            const isPaid = bill.status === 'Paid';

            return (
              <motion.div
                key={bill.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-5 rounded-2xl border border-white/10 bg-[#171F2F]/80 backdrop-blur-xl hover:border-[#5B8CFF]/40 transition-all shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#121A2F] border border-white/10 flex items-center justify-center shrink-0">
                      {renderBillLogo(bill.logo, bill.name)}
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white">{bill.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5 font-mono text-xs">
                        <span className="text-[#A1A8B5]">{bill.category}</span>
                        <span className="text-white/20">•</span>
                        <span className="text-[#64748B]">{bill.paymentMethod || 'Autopay'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 justify-between sm:justify-end font-mono">
                    <div className="text-right">
                      <div className="text-xs text-[#A1A8B5]">Due Date</div>
                      <div className="text-xs font-bold text-white mt-0.5">
                        {bill.dueDate} ({bill.dueDateLabel})
                      </div>
                    </div>

                    <div className="text-right">
                      {currencyMode === 'USD' && (
                        <span className="text-lg font-bold text-white">{formatUSDVal(bill.amountUSD)}</span>
                      )}
                      {currencyMode === 'INR' && (
                        <span className="text-lg font-bold text-white">{formatINRVal(bill.amountINR)}</span>
                      )}
                      {currencyMode === 'dual' && (
                        <div className="flex flex-col items-end">
                          <span className="text-lg font-bold text-white">{formatUSDVal(bill.amountUSD)}</span>
                          <span className="text-xs font-medium text-[#A1A8B5]">{formatINRVal(bill.amountINR)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2 font-mono text-xs">
                  <div className="flex items-center gap-2 text-[#A1A8B5]">
                    <span>{bill.accountNumber}</span>
                    {bill.autopay && (
                      <span className="px-2 py-0.5 rounded-full bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 text-[10px] font-bold">
                        Autopay On
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleManage(bill)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#A1A8B5] hover:text-white bg-[#121A2F] border border-white/10 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>Manage</span>
                      <FiChevronRight className="w-3.5 h-3.5" />
                    </button>

                    {!isPaid ? (
                      <button
                        onClick={() => handlePay(bill)}
                        disabled={isProcessing}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white gradient-primary shadow-glow-blue transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
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
                      <span className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#22C55E] bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center gap-1">
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
        <div className="p-8 text-center rounded-2xl border border-white/10 bg-[#171F2F]">
          <FiCalendar className="w-10 h-10 text-[#64748B] mx-auto mb-2" />
          <h4 className="text-sm font-bold text-white">No bills found</h4>
          <p className="text-xs text-[#A1A8B5] mt-1">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
};

BillsList.propTypes = {
  bills: PropTypes.array,
  onPayBill: PropTypes.func,
  onManageBill: PropTypes.func,
  className: PropTypes.string,
};

export default BillsList;
