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
  FiAlertTriangle,
  FiActivity,
  FiCheckCircle,
  FiDollarSign,
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

/**
 * Render brand logo safely
 */
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
  return <span className="text-lg font-bold text-blue-400">{initial}</span>;
};

/**
 * Default Subscription Object for SubscriptionModal
 */
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

/**
 * SubscriptionModal Component
 *
 * Full Subscription Details Modal displaying:
 * - Merchant logo & header
 * - Monthly Cost, Yearly Cost calculation, Billing Cycle
 * - Start Date, Renewal Date, Payment Method, Category
 * - Usage Status analysis badge (e.g. "Unused (0 logins in 45 days)")
 * - AI Recommendation Box: "You haven't used Canva recently. Canceling it could save ₹6,000/year."
 * - Action buttons: "1-Click Cancel", "Pause Subscription", "Close"
 */
const SubscriptionModal = ({
  isOpen = true,
  onClose,
  subscription = DEFAULT_MODAL_SUBSCRIPTION,
  onCancel,
  onPause,
  onResume
}) => {
  const sub = { ...DEFAULT_MODAL_SUBSCRIPTION, ...subscription };

  // Handle ESC key listener to close modal
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

  // Yearly calculations fallback if not explicit
  const calculatedYearlyUSD = sub.yearlyUSD || (sub.monthlyUSD ? sub.monthlyUSD * 12 : 0);
  const calculatedYearlyINR = sub.yearlyINR || (sub.monthlyINR ? sub.monthlyINR * 12 : 0);

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

  // Format dynamic AI recommendation text if missing
  const recommendationText =
    sub.aiRecommendation ||
    `You haven't used ${sub.name} recently. Canceling it could save ₹${calculatedYearlyINR.toLocaleString()}/year.`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Header Gradient Banner */}
          <div className="h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

          {/* Modal Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-20"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-7 space-y-6">
            {/* Merchant Logo & Header Section */}
            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border shadow-lg ${sub.bgColor || 'bg-slate-800 border-slate-700 text-blue-400'}`}>
                {renderMerchantLogo(sub.logoType, sub.name)}
              </div>
              <div className="flex-1 min-w-0 pr-8">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {sub.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                    {sub.billingCycle || 'Monthly'}
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1.5 truncate">
                  {sub.name}
                </h2>
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                  <span>Merchant ID: {sub.id}</span>
                </div>
              </div>
            </div>

            {/* Cost & Yearly Calculation Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-800/50 border border-slate-800">
              {/* Monthly Cost */}
              <div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Monthly Cost</div>
                <div className="text-xl font-bold text-white mt-1">
                  ${sub.monthlyUSD?.toFixed(2)}
                </div>
                <div className="text-xs font-semibold text-emerald-400">
                  ₹{sub.monthlyINR?.toLocaleString()} / mo
                </div>
              </div>

              {/* Yearly Cost Calculation */}
              <div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Yearly Calculation</div>
                <div className="text-xl font-bold text-slate-200 mt-1">
                  ${calculatedYearlyUSD.toFixed(2)}
                </div>
                <div className="text-xs font-semibold text-emerald-400">
                  ₹{calculatedYearlyINR.toLocaleString()} / yr
                </div>
              </div>

              {/* Billing Cycle */}
              <div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Billing Frequency</div>
                <div className="text-sm font-bold text-blue-400 mt-1">
                  {sub.billingCycle || 'Monthly'}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Auto-renews yearly
                </div>
              </div>
            </div>

            {/* Subscription Metadata Grid (Start Date, Renewal Date, Payment Method, Category) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800">
                <div className="text-slate-400 font-medium flex items-center gap-1">
                  <FiClock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Start Date</span>
                </div>
                <div className="text-slate-200 font-semibold mt-1">{sub.startDate || '2025-08-15'}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800">
                <div className="text-slate-400 font-medium flex items-center gap-1">
                  <FiCalendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Next Renewal</span>
                </div>
                <div className="text-slate-200 font-semibold mt-1">{sub.renewalDate}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800">
                <div className="text-slate-400 font-medium flex items-center gap-1">
                  <FiCreditCard className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Payment Method</span>
                </div>
                <div className="text-slate-200 font-semibold mt-1 truncate">{sub.paymentMethod}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800">
                <div className="text-slate-400 font-medium flex items-center gap-1">
                  <FiLayers className="w-3.5 h-3.5 text-purple-400" />
                  <span>Category</span>
                </div>
                <div className="text-slate-200 font-semibold mt-1 truncate">{sub.category}</div>
              </div>
            </div>

            {/* Usage Status Analysis Badge */}
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <FiActivity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-300">Usage Analysis</div>
                  <div className="text-sm font-bold text-amber-300">
                    {sub.usageStatus || 'Unused (0 logins in 45 days)'}
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 whitespace-nowrap">
                Low Activity
              </span>
            </div>

            {/* AI Recommendation Box */}
            <div className="relative p-4 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-indigo-500/30 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 shrink-0">
                  <FiSparkles className="w-5 h-5 text-indigo-300 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-300">
                      SubSense AI Insight
                    </h4>
                    <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <FiTrendingDown className="w-3 h-3" />
                      Savings Opportunity
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    "{recommendationText}"
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons Section */}
            <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-3">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors border border-slate-700/60"
              >
                Close
              </button>

              {/* Pause Subscription */}
              <button
                onClick={handlePauseToggle}
                disabled={isCancelled}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 border ${
                  isPaused
                    ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
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

              {/* 1-Click Cancel Button */}
              <button
                onClick={() => onCancel && onCancel(sub)}
                disabled={isCancelled}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-lg shadow-rose-600/25 transition-all flex items-center justify-center gap-2 ${
                  isCancelled ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500' : ''
                }`}
              >
                <FiTrash2 className="w-4 h-4" />
                <span>1-Click Cancel</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

SubscriptionModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  subscription: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    logoType: PropTypes.string,
    monthlyUSD: PropTypes.number,
    monthlyINR: PropTypes.number,
    yearlyUSD: PropTypes.number,
    yearlyINR: PropTypes.number,
    billingCycle: PropTypes.string,
    startDate: PropTypes.string,
    renewalDate: PropTypes.string,
    paymentMethod: PropTypes.string,
    status: PropTypes.string,
    usageStatus: PropTypes.string,
    aiRecommendation: PropTypes.string,
    bgColor: PropTypes.string
  }),
  onCancel: PropTypes.func,
  onPause: PropTypes.func,
  onResume: PropTypes.func
};

export default SubscriptionModal;
