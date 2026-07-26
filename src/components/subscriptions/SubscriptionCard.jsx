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
  FiCpu,
  FiCloud,
  FiTv,
  FiMessageSquare,
  FiLayers,
  FiShoppingBag,
} from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
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
  if (type.includes('netflix')) return <SiNetflix className="w-6 h-6 text-red-500" />;
  if (type.includes('spotify')) return <SiSpotify className="w-6 h-6 text-emerald-400" />;
  if (type.includes('figma')) return <SiFigma className="w-6 h-6 text-purple-400" />;
  if (type.includes('notion')) return <SiNotion className="w-6 h-6 text-slate-200" />;
  if (type.includes('github')) return <SiGithub className="w-6 h-6 text-slate-200" />;
  if (type.includes('canva')) return <FiLayers className="w-6 h-6 text-cyan-400" />;
  if (type.includes('adobe')) return <FiLayers className="w-6 h-6 text-rose-500" />;
  if (type.includes('amazon') || type.includes('prime')) return <FiShoppingBag className="w-6 h-6 text-amber-400" />;
  if (type.includes('chatgpt') || type.includes('openai')) return <FiCpu className="w-6 h-6 text-emerald-400" />;
  if (type.includes('aws') || type.includes('cloud')) return <FiCloud className="w-6 h-6 text-amber-400" />;
  if (type.includes('slack')) return <FiMessageSquare className="w-6 h-6 text-indigo-400" />;
  if (type.includes('disney') || type.includes('tv')) return <FiTv className="w-6 h-6 text-blue-400" />;

  const initial = name ? name.charAt(0).toUpperCase() : 'S';
  return <span className="text-base font-bold text-primary">{initial}</span>;
};

/**
 * Status Badge Renderer
 */
const renderStatusBadge = (status) => {
  const s = (status || 'active').toLowerCase();
  if (s === 'active') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        Active
      </span>
    );
  }
  if (s === 'paused' || s === 'unused') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/25">
        <FiPauseCircle className="w-3 h-3 text-amber-400" />
        {s === 'unused' ? 'Unused' : 'Paused'}
      </span>
    );
  }
  if (s === 'cancelled' || s === 'canceled') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-rose-500/10 text-rose-400 border border-rose-500/25">
        <FiSlash className="w-3 h-3 text-rose-400" />
        Cancelled
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-500/10 text-slate-400 border border-slate-500/25">
      {status}
    </span>
  );
};

/**
 * SubscriptionCard Component
 */
const SubscriptionCard = ({
  subscription,
  onViewDetails,
  onPause,
  onResume,
  onCancel,
  currencyMode = 'dual'
}) => {
  const sub = subscription;
  const isPaused = sub.status?.toLowerCase() === 'paused';
  const isCancelled = sub.status?.toLowerCase() === 'cancelled' || sub.status?.toLowerCase() === 'canceled';
  const isUnused = sub.usageStatus?.toLowerCase().includes('unused') || sub.status?.toLowerCase() === 'unused';

  const monthlyPriceUSD = sub.costUSD ?? sub.monthlyUSD ?? 19.99;
  const monthlyPriceINR = sub.costINR ?? sub.monthlyINR ?? 1499;

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
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative flex flex-col justify-between rounded-2xl border border-glass-border bg-card p-5 shadow-card hover:shadow-card-hover hover:border-primary/40 transition-all group overflow-hidden"
    >
      {/* Top Gradient Border Highlight */}
      <div className="absolute top-0 left-0 right-0 h-1 gradient-blue-purple opacity-80 group-hover:opacity-100 transition-opacity" />

      {/* Card Body */}
      <div>
        {/* Header: Logo, Name, Category & Badges */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-border bg-surface-light/60 shadow-inner group-hover:scale-105 transition-transform">
              {renderMerchantLogo(sub.merchant || sub.name, sub.name)}
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight group-hover:text-primary transition-colors line-clamp-1">
                {sub.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-surface-light text-text-secondary border border-border">
                  {sub.category}
                </span>
                {isUnused && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                    Unused Sub
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div>{renderStatusBadge(sub.status)}</div>
        </div>

        {/* Pricing Section */}
        <div className="my-4 p-3.5 rounded-xl bg-surface/60 border border-border flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Monthly Cost</div>
            <div className="flex items-baseline gap-2 mt-0.5">
              {(currencyMode === 'dual' || currencyMode === 'USD') && (
                <span className="text-xl font-extrabold text-white tracking-tight">
                  ${typeof monthlyPriceUSD === 'number' ? monthlyPriceUSD.toFixed(2) : monthlyPriceUSD}
                </span>
              )}
              {(currencyMode === 'dual' || currencyMode === 'INR') && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ₹{typeof monthlyPriceINR === 'number' ? monthlyPriceINR.toLocaleString() : monthlyPriceINR}
                </span>
              )}
              <span className="text-xs text-text-muted font-normal">/mo</span>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">
              {sub.billingCycle || 'Monthly'}
            </span>
          </div>
        </div>

        {/* Renewal Date & Payment Method */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div className="p-2.5 rounded-xl bg-surface/40 border border-border flex items-center gap-2">
            <FiCalendar className="w-4 h-4 text-secondary shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] font-medium text-text-muted">Next Renewal</div>
              <div className="text-white font-semibold truncate">{sub.renewalDate}</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-surface/40 border border-border flex items-center gap-2">
            <FiCreditCard className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] font-medium text-text-muted">Payment Method</div>
              <div className="text-white font-semibold truncate">{sub.paymentMethod}</div>
            </div>
          </div>
        </div>

        {/* AI Suggestion Box */}
        {sub.aiRecommendation && (
          <div className="mt-3 p-3 rounded-xl bg-primary/10 border border-primary/20 flex items-start gap-2.5">
            <HiOutlineSparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">AI Copilot Suggestion</span>
              <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                {sub.aiRecommendation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons Footer */}
      <div className="mt-4 pt-3 border-t border-border flex items-center gap-2">
        <button
          onClick={() => onViewDetails && onViewDetails(sub)}
          className="flex-1 py-2 px-3 rounded-xl bg-surface-light hover:bg-surface text-text-secondary hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-border"
        >
          <FiEye className="w-3.5 h-3.5" />
          <span>Details</span>
        </button>

        <button
          onClick={handlePauseResumeToggle}
          disabled={isCancelled}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border ${
            isPaused
              ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
          } ${isCancelled ? 'opacity-50 cursor-not-allowed' : ''}`}
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

        <button
          onClick={() => onCancel && onCancel(sub)}
          disabled={isCancelled}
          className={`py-2 px-3 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors flex items-center justify-center gap-1 ${
            isCancelled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <FiTrash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Cancel</span>
        </button>
      </div>
    </motion.div>
  );
};

SubscriptionCard.propTypes = {
  subscription: PropTypes.object.isRequired,
  onViewDetails: PropTypes.func,
  onPause: PropTypes.func,
  onResume: PropTypes.func,
  onCancel: PropTypes.func,
  currencyMode: PropTypes.oneOf(['dual', 'USD', 'INR']),
};

export default SubscriptionCard;
