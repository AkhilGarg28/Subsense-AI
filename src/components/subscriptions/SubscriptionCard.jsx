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
  return <span className="text-base font-bold text-[#5B8CFF]">{initial}</span>;
};

const renderStatusBadge = (status) => {
  const s = (status || 'active').toLowerCase();
  if (s === 'active') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
        <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
        Active
      </span>
    );
  }
  if (s === 'paused' || s === 'unused') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30">
        <FiPauseCircle className="w-3 h-3 text-[#F59E0B]" />
        {s === 'unused' ? 'Unused' : 'Paused'}
      </span>
    );
  }
  if (s === 'cancelled' || s === 'canceled') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30">
        <FiSlash className="w-3 h-3 text-[#EF4444]" />
        Cancelled
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-[#A1A8B5] border border-white/10">
      {status}
    </span>
  );
};

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
      className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#171F2F]/80 p-5 shadow-2xl backdrop-blur-xl hover:border-[#5B8CFF]/40 transition-all group overflow-hidden"
    >
      {/* Top Gradient Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 gradient-primary opacity-80 group-hover:opacity-100 transition-opacity" />

      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 bg-[#121A2F] shadow-inner group-hover:scale-105 transition-transform">
              {renderMerchantLogo(sub.merchant || sub.name, sub.name)}
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight group-hover:text-[#5B8CFF] transition-colors line-clamp-1">
                {sub.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded-md text-[#A1A8B5] bg-[#121A2F] border border-white/10">
                  {sub.category}
                </span>
                {isUnused && (
                  <span className="px-2 py-0.5 rounded-md font-bold bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30">
                    Unused Sub
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>{renderStatusBadge(sub.status)}</div>
        </div>

        {/* Pricing Box */}
        <div className="my-4 p-3.5 rounded-xl bg-[#121A2F]/80 border border-white/10 flex items-center justify-between font-mono">
          <div>
            <div className="text-[10px] uppercase font-bold text-[#A1A8B5]">Monthly Cost</div>
            <div className="flex items-baseline gap-2 mt-0.5">
              {(currencyMode === 'dual' || currencyMode === 'USD') && (
                <span className="text-xl font-extrabold text-white">
                  ${typeof monthlyPriceUSD === 'number' ? monthlyPriceUSD.toFixed(2) : monthlyPriceUSD}
                </span>
              )}
              {(currencyMode === 'dual' || currencyMode === 'INR') && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
                  ₹{typeof monthlyPriceINR === 'number' ? monthlyPriceINR.toLocaleString() : monthlyPriceINR}
                </span>
              )}
              <span className="text-xs text-[#A1A8B5]">/mo</span>
            </div>
          </div>

          <div className="text-right">
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#5B8CFF]/10 text-[#5B8CFF] border border-[#5B8CFF]/20">
              {sub.billingCycle || 'Monthly'}
            </span>
          </div>
        </div>

        {/* Renewal & Payment */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-3">
          <div className="p-2.5 rounded-xl bg-[#121A2F]/50 border border-white/5 flex items-center gap-2">
            <FiCalendar className="w-4 h-4 text-[#8B5CF6] shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] text-[#A1A8B5]">Next Renewal</div>
              <div className="text-white font-bold truncate">{sub.renewalDate}</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#121A2F]/50 border border-white/5 flex items-center gap-2">
            <FiCreditCard className="w-4 h-4 text-[#22C55E] shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] text-[#A1A8B5]">Payment</div>
              <div className="text-white font-bold truncate">{sub.paymentMethod}</div>
            </div>
          </div>
        </div>

        {/* AI Suggestion Box */}
        {sub.aiRecommendation && (
          <div className="mt-3 p-3 rounded-xl bg-[#5B8CFF]/10 border border-[#5B8CFF]/25 flex items-start gap-2.5">
            <HiOutlineSparkles className="w-4 h-4 text-[#5B8CFF] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#5B8CFF]">AI Copilot Suggestion</span>
              <p className="text-xs text-[#A1A8B5] mt-0.5 leading-relaxed">
                {sub.aiRecommendation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 font-mono text-xs">
        <button
          onClick={() => onViewDetails && onViewDetails(sub)}
          className="flex-1 py-2 px-3 rounded-xl bg-[#121A2F] hover:bg-[#1E293B] text-[#A1A8B5] hover:text-white font-semibold transition-colors flex items-center justify-center gap-1.5 border border-white/10"
        >
          <FiEye className="w-3.5 h-3.5" />
          <span>Details</span>
        </button>

        <button
          onClick={handlePauseResumeToggle}
          disabled={isCancelled}
          className={`flex-1 py-2 px-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-1.5 border ${
            isPaused
              ? 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30'
              : 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30'
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
          className={`py-2 px-3 rounded-xl font-semibold bg-[#EF4444]/15 hover:bg-[#EF4444]/25 text-[#EF4444] border border-[#EF4444]/30 transition-colors flex items-center justify-center gap-1 ${
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
