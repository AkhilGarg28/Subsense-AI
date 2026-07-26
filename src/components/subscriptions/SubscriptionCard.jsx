import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  FiCalendar,
  FiCreditCard,
  FiEye,
  FiPauseCircle,
  FiPlay,
  FiTrash2,
  FiSlash,
  FiClock,
  FiCpu,
  FiCloud,
  FiTv,
  FiMessageSquare,
  FiLayers
} from 'react-icons/fi';
import {
  SiNetflix,
  SiSpotify,
  SiFigma,
  SiNotion,
  SiGithub,
} from 'react-icons/si';

/**
 * Renders merchant icon or brand logo safely
 */
const renderMerchantLogo = (logoType, name) => {
  const type = (logoType || name || '').toLowerCase();
  if (type.includes('netflix')) return <SiNetflix className="w-5 h-5 text-red-500" />;
  if (type.includes('spotify')) return <SiSpotify className="w-5 h-5 text-emerald-400" />;
  if (type.includes('figma')) return <SiFigma className="w-5 h-5 text-purple-400" />;
  if (type.includes('notion')) return <SiNotion className="w-5 h-5 text-slate-200" />;
  if (type.includes('github')) return <SiGithub className="w-5 h-5 text-slate-200" />;
  if (type.includes('canva')) return <FiLayers className="w-5 h-5 text-cyan-400" />;
  if (type.includes('adobe')) return <FiLayers className="w-5 h-5 text-rose-500" />;
  if (type.includes('chatgpt') || type.includes('openai')) return <FiCpu className="w-5 h-5 text-emerald-400" />;
  if (type.includes('aws') || type.includes('cloud')) return <FiCloud className="w-5 h-5 text-amber-400" />;
  if (type.includes('slack')) return <FiMessageSquare className="w-5 h-5 text-indigo-400" />;
  if (type.includes('disney') || type.includes('tv')) return <FiTv className="w-5 h-5 text-blue-400" />;

  const initial = name ? name.charAt(0).toUpperCase() : 'S';
  return <span className="text-sm font-bold text-blue-400">{initial}</span>;
};

/**
 * Status Badge Renderer
 */
const renderStatusBadge = (status) => {
  const s = (status || 'active').toLowerCase();
  if (s === 'active') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
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
 * Default sample data for SubscriptionCard
 */
const DEFAULT_CARD_SUBSCRIPTION = {
  id: 'sub-demo-1',
  name: 'Canva Pro',
  category: 'Design & Media',
  billingCycle: 'Annual', // 'Monthly' | 'Annual'
  monthlyUSD: 12.99,
  monthlyINR: 999,
  renewalDate: '2026-08-15',
  renewalDaysLeft: 21,
  paymentMethod: 'Visa •••• 4242',
  status: 'Active', // 'Active' | 'Paused' | 'Cancelled'
  logoType: 'canva',
  bgColor: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
};

/**
 * SubscriptionCard Component
 *
 * Subscription Grid Card component featuring:
 * - Logo avatar & merchant name
 * - Category badge & billing cycle (Monthly / Annual)
 * - Monthly price (USD $ / INR ₹ dual badge)
 * - Next renewal date tag with status indicator
 * - Payment method icon
 * - Status badge (Active, Paused, Cancelled)
 * - Action buttons: "View Details", "Pause / Resume", "Cancel"
 */
const SubscriptionCard = ({
  subscription = DEFAULT_CARD_SUBSCRIPTION,
  onViewDetails,
  onPause,
  onResume,
  onCancel,
  currencyMode = 'dual'
}) => {
  const sub = { ...DEFAULT_CARD_SUBSCRIPTION, ...subscription };
  const isPaused = sub.status?.toLowerCase() === 'paused';
  const isCancelled = sub.status?.toLowerCase() === 'cancelled' || sub.status?.toLowerCase() === 'canceled';

  const handlePauseResumeToggle = () => {
    if (isPaused) {
      if (onResume) onResume(sub);
      else if (onPause) onPause(sub);
    } else {
      if (onPause) onPause(sub);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl p-5 shadow-xl hover:shadow-2xl hover:border-slate-700/80 transition-all group overflow-hidden"
    >
      {/* Top Accent Highlight */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-80 group-hover:opacity-100 transition-opacity" />

      {/* Card Content Top Section */}
      <div>
        {/* Header: Logo, Name & Category */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-inner ${sub.bgColor || 'bg-slate-800/80 border-slate-700 text-blue-400'}`}>
              {renderMerchantLogo(sub.logoType, sub.name)}
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors line-clamp-1">
                {sub.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60">
                  {sub.category}
                </span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  • {sub.billingCycle || 'Monthly'}
                </span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div>{renderStatusBadge(sub.status)}</div>
        </div>

        {/* Pricing Section (USD & INR Dual Badge) */}
        <div className="my-4 p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Monthly Cost</div>
            <div className="flex items-baseline gap-2 mt-0.5">
              {(currencyMode === 'dual' || currencyMode === 'USD') && (
                <span className="text-xl font-extrabold text-white tracking-tight">
                  ${typeof sub.monthlyUSD === 'number' ? sub.monthlyUSD.toFixed(2) : sub.monthlyUSD}
                </span>
              )}
              {(currencyMode === 'dual' || currencyMode === 'INR') && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ₹{typeof sub.monthlyINR === 'number' ? sub.monthlyINR.toLocaleString() : sub.monthlyINR}
                </span>
              )}
              <span className="text-xs text-slate-400 font-normal">/mo</span>
            </div>
          </div>

          {/* Billing Cycle Indicator Pill */}
          <div className="text-right">
            <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20">
              {sub.billingCycle === 'Annual' ? 'Billed Yearly' : 'Billed Monthly'}
            </span>
          </div>
        </div>

        {/* Metadata Grid: Renewal Date & Payment Method */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-4">
          {/* Renewal Date Tag */}
          <div className="p-2.5 rounded-xl bg-slate-800/30 border border-slate-800 flex items-center gap-2">
            <FiCalendar className="w-4 h-4 text-indigo-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] font-medium text-slate-400">Next Renewal</div>
              <div className="text-slate-200 font-semibold truncate">{sub.renewalDate}</div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-2.5 rounded-xl bg-slate-800/30 border border-slate-800 flex items-center gap-2">
            <FiCreditCard className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] font-medium text-slate-400">Payment Method</div>
              <div className="text-slate-200 font-semibold truncate">{sub.paymentMethod}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
        {/* View Details Button */}
        <button
          onClick={() => onViewDetails && onViewDetails(sub)}
          className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-slate-700/60"
        >
          <FiEye className="w-3.5 h-3.5" />
          <span>Details</span>
        </button>

        {/* Pause / Resume Button */}
        <button
          onClick={handlePauseResumeToggle}
          disabled={isCancelled}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border ${
            isPaused
              ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
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

        {/* Cancel Button */}
        <button
          onClick={() => onCancel && onCancel(sub)}
          disabled={isCancelled}
          className={`py-2 px-3 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors flex items-center justify-center gap-1 ${
            isCancelled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="Cancel Subscription"
        >
          <FiTrash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Cancel</span>
        </button>
      </div>
    </motion.div>
  );
};

SubscriptionCard.propTypes = {
  subscription: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    billingCycle: PropTypes.string,
    monthlyUSD: PropTypes.number,
    monthlyINR: PropTypes.number,
    renewalDate: PropTypes.string,
    paymentMethod: PropTypes.string,
    status: PropTypes.string,
    logoType: PropTypes.string,
    bgColor: PropTypes.string
  }),
  onViewDetails: PropTypes.func,
  onPause: PropTypes.func,
  onResume: PropTypes.func,
  onCancel: PropTypes.func,
  currencyMode: PropTypes.oneOf(['dual', 'USD', 'INR'])
};

export default SubscriptionCard;
