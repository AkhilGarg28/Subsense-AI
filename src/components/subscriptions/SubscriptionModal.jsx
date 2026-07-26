import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiCalendar,
  FiCreditCard,
  FiPauseCircle,
  FiPlay,
  FiTrash2,
  FiActivity,
  FiClock,
  FiLayers,
  FiCpu,
  FiCloud,
  FiTv,
  FiMessageSquare,
  FiTrendingDown
} from 'react-icons/fi';
import { HiOutlineSparkles as FiSparkles } from 'react-icons/hi';
import {
  SiNetflix,
  SiSpotify,
  SiFigma,
  SiNotion,
  SiGithub,
} from 'react-icons/si';

const renderMerchantLogo = (logoType, name) => {
  const type = (logoType || name || '').toLowerCase();
  if (type.includes('netflix')) return <SiNetflix className="w-7 h-7 text-red-500" />;
  if (type.includes('spotify')) return <SiSpotify className="w-7 h-7 text-emerald-400" />;
  if (type.includes('figma')) return <SiFigma className="w-7 h-7 text-purple-400" />;
  if (type.includes('notion')) return <SiNotion className="w-7 h-7 text-slate-200" />;
  if (type.includes('github')) return <SiGithub className="w-7 h-7 text-slate-200" />;
  if (type.includes('canva')) return <FiCreditCard className="w-7 h-7 text-cyan-400" />;
  if (type.includes('adobe')) return <FiCreditCard className="w-7 h-7 text-rose-500" />;
  if (type.includes('chatgpt') || type.includes('openai')) return <FiCpu className="w-7 h-7 text-emerald-400" />;
  if (type.includes('aws') || type.includes('cloud')) return <FiCloud className="w-7 h-7 text-amber-400" />;
  if (type.includes('slack')) return <FiMessageSquare className="w-7 h-7 text-indigo-400" />;
  if (type.includes('disney') || type.includes('tv')) return <FiTv className="w-7 h-7 text-blue-400" />;

  const initial = name ? name.charAt(0).toUpperCase() : 'S';
  return <span className="text-lg font-bold text-[#5B8CFF]">{initial}</span>;
};

const DEFAULT_MODAL_SUBSCRIPTION = {
  id: 'sub-modal-demo',
  name: 'Canva Pro',
  category: 'Design & Media',
  logoType: 'canva',
  monthlyUSD: 12.99,
  monthlyINR: 500,
  yearlyINR: 6000,
  yearlyUSD: 155.88,
  billingCycle: 'Annual',
  startDate: '2025-08-15',
  renewalDate: '2026-08-15',
  paymentMethod: 'Visa •••• 4242',
  status: 'Active',
  usageStatus: 'Unused (0 logins in 45 days)',
  aiRecommendation: "You haven't used Canva recently. Canceling it could save ₹6,000/year.",
  bgColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
};

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

const SubscriptionModal = ({
  isOpen = true,
  onClose,
  subscription = DEFAULT_MODAL_SUBSCRIPTION,
  onCancel,
  onPause,
  onResume
}) => {
  const sub = { ...DEFAULT_MODAL_SUBSCRIPTION, ...subscription };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const rawUsd = sub.monthlyUSD ?? sub.costUSD ?? 19.99;
  const rawInr = sub.monthlyINR ?? sub.costINR ?? 1499;

  const numUsd = typeof rawUsd === 'number' ? rawUsd : parseFloat(String(rawUsd).replace(/[^0-9.]/g, '')) || 0;
  const numInr = typeof rawInr === 'number' ? rawInr : parseFloat(String(rawInr).replace(/[^0-9.]/g, '')) || 0;

  const calculatedYearlyUSD = sub.yearlyUSD || numUsd * 12;
  const calculatedYearlyINR = sub.yearlyINR || numInr * 12;

  const isPaused = sub.status?.toLowerCase() === 'paused';
  const isCancelled = sub.status?.toLowerCase() === 'cancelled' || sub.status?.toLowerCase() === 'canceled';

  const handlePauseToggle = () => {
    if (isPaused) {
      if (onResume) onResume(sub);
      else if (onPause) onPause(sub);
    } else {
      if (onPause) onPause(sub);
    }
  };

  const recommendationText =
    sub.aiRecommendation ||
    `You haven't used ${sub.name} recently. Canceling it could save ${formatINRVal(calculatedYearlyINR)}/year.`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-mono text-xs">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-xl rounded-[20px] bg-[#171F2F] border border-white/10 shadow-2xl overflow-hidden z-10 my-auto p-6 sm:p-8 space-y-6"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-[#121A2F] text-[#A1A8B5] hover:text-white transition-colors z-20 cursor-pointer"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 bg-[#121A2F] shrink-0`}>
              {renderMerchantLogo(sub.logoType, sub.name)}
            </div>
            <div className="flex-1 min-w-0 pr-8">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#5B8CFF]/15 text-[#5B8CFF] border border-[#5B8CFF]/30">
                  {sub.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#121A2F] text-white border border-white/10">
                  {sub.billingCycle || 'Monthly'}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1.5 truncate">
                {sub.name}
              </h2>
              <div className="text-xs text-[#A1A8B5] mt-0.5">
                <span>Merchant ID: {sub.id}</span>
              </div>
            </div>
          </div>

          {/* Cost Summary Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#121A2F] border border-white/10">
            <div>
              <div className="text-[10px] font-bold text-[#A1A8B5] uppercase">Monthly Cost</div>
              <div className="text-lg font-extrabold text-white mt-1">
                {formatUSDVal(rawUsd)}
              </div>
              <div className="text-xs font-bold text-[#22C55E]">
                {formatINRVal(rawInr)} / mo
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-[#A1A8B5] uppercase">Yearly Calculation</div>
              <div className="text-lg font-extrabold text-white mt-1">
                {formatUSDVal(calculatedYearlyUSD)}
              </div>
              <div className="text-xs font-bold text-[#22C55E]">
                {formatINRVal(calculatedYearlyINR)} / yr
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-[#A1A8B5] uppercase">Frequency</div>
              <div className="text-sm font-bold text-[#5B8CFF] mt-1">
                {sub.billingCycle || 'Monthly'}
              </div>
              <div className="text-[10px] text-[#A1A8B5] mt-0.5">
                Auto-renews
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#121A2F]/60 border border-white/10">
              <div className="text-[#A1A8B5] font-bold flex items-center gap-1">
                <FiClock className="w-3.5 h-3.5 text-[#5B8CFF]" />
                <span>Start Date</span>
              </div>
              <div className="text-white font-bold mt-1">{sub.startDate || '2025-08-15'}</div>
            </div>

            <div className="p-3 rounded-xl bg-[#121A2F]/60 border border-white/10">
              <div className="text-[#A1A8B5] font-bold flex items-center gap-1">
                <FiCalendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Renewal</span>
              </div>
              <div className="text-white font-bold mt-1">{sub.renewalDate}</div>
            </div>

            <div className="p-3 rounded-xl bg-[#121A2F]/60 border border-white/10">
              <div className="text-[#A1A8B5] font-bold flex items-center gap-1">
                <FiCreditCard className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Payment</span>
              </div>
              <div className="text-white font-bold mt-1 truncate">{sub.paymentMethod}</div>
            </div>

            <div className="p-3 rounded-xl bg-[#121A2F]/60 border border-white/10">
              <div className="text-[#A1A8B5] font-bold flex items-center gap-1">
                <FiLayers className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Category</span>
              </div>
              <div className="text-white font-bold mt-1 truncate">{sub.category}</div>
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="p-4 rounded-xl bg-[#5B8CFF]/10 border border-[#5B8CFF]/30 flex items-start gap-3">
            <FiSparkles className="w-5 h-5 text-[#5B8CFF] shrink-0 mt-0.5 animate-pulse" />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#5B8CFF]">
                  AI Copilot Recommendation
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 flex items-center gap-1">
                  <FiTrendingDown className="w-3 h-3" />
                  Savings Opportunity
                </span>
              </div>
              <p className="text-xs text-[#A1A8B5] mt-1 leading-relaxed">
                "{recommendationText}"
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-3 font-mono">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#121A2F] border border-white/10 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={handlePauseToggle}
              disabled={isCancelled}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                isPaused
                  ? 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30'
                  : 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30'
              } ${isCancelled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isPaused ? (
                <>
                  <FiPlay className="w-4 h-4" />
                  <span>Resume Subscription</span>
                </>
              ) : (
                <>
                  <FiPauseCircle className="w-4 h-4" />
                  <span>Pause Subscription</span>
                </>
              )}
            </button>

            <button
              onClick={() => onCancel && onCancel(sub)}
              disabled={isCancelled}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#EF4444] hover:bg-[#EF4444]/90 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isCancelled ? 'opacity-50 cursor-not-allowed bg-[#121A2F] text-[#64748B]' : ''
              }`}
            >
              <FiTrash2 className="w-4 h-4" />
              <span>1-Click Cancel</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

SubscriptionModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  subscription: PropTypes.object,
  onCancel: PropTypes.func,
  onPause: PropTypes.func,
  onResume: PropTypes.func
};

export default SubscriptionModal;
