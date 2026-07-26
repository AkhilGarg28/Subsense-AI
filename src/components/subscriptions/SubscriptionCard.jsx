import React from 'react';
import PropTypes from 'prop-types';
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
  if (type.includes('netflix')) return <SiNetflix className="w-5 h-5 text-[#D65C4F]" />;
  if (type.includes('spotify')) return <SiSpotify className="w-5 h-5 text-[#3FA972]" />;
  if (type.includes('figma')) return <SiFigma className="w-5 h-5 text-[#C2A155]" />;
  if (type.includes('notion')) return <SiNotion className="w-5 h-5 text-[#F3F1EA]" />;
  if (type.includes('github')) return <SiGithub className="w-5 h-5 text-[#F3F1EA]" />;
  if (type.includes('canva')) return <FiLayers className="w-5 h-5 text-[#C2A155]" />;
  if (type.includes('adobe')) return <FiLayers className="w-5 h-5 text-[#D65C4F]" />;
  if (type.includes('amazon') || type.includes('prime')) return <FiShoppingBag className="w-5 h-5 text-[#D97706]" />;
  if (type.includes('chatgpt') || type.includes('openai')) return <FiCpu className="w-5 h-5 text-[#3FA972]" />;
  if (type.includes('aws') || type.includes('cloud')) return <FiCloud className="w-5 h-5 text-[#D97706]" />;
  if (type.includes('slack')) return <FiMessageSquare className="w-5 h-5 text-[#C2A155]" />;
  if (type.includes('disney') || type.includes('tv')) return <FiTv className="w-5 h-5 text-[#C2A155]" />;

  const initial = name ? name.charAt(0).toUpperCase() : 'S';
  return <span className="text-sm font-mono font-bold text-[#C2A155]">{initial}</span>;
};

const renderStatusBadge = (status) => {
  const s = (status || 'active').toLowerCase();
  if (s === 'active') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#3FA972]/15 text-[#3FA972] border border-[#3FA972]/30">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3FA972]" />
        ACTIVE
      </span>
    );
  }
  if (s === 'paused' || s === 'unused') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#D97706]/15 text-[#D97706] border border-[#D97706]/30">
        <FiPauseCircle className="w-3 h-3 text-[#D97706]" />
        {s === 'unused' ? 'UNUSED' : 'PAUSED'}
      </span>
    );
  }
  if (s === 'cancelled' || s === 'canceled') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#D65C4F]/15 text-[#D65C4F] border border-[#D65C4F]/30">
        <FiSlash className="w-3 h-3 text-[#D65C4F]" />
        CANCELLED
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono text-[#96988F] border border-[#F3F1EA]/10">
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
    <div className="relative flex flex-col justify-between rounded-xl border border-[#F3F1EA]/10 bg-[#171A18] p-5 shadow-2xl hover:border-[#C2A155]/40 transition-colors group">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#F3F1EA]/10 bg-[#0D0F0E]">
              {renderMerchantLogo(sub.merchant || sub.name, sub.name)}
            </div>
            <div>
              <h3 className="text-sm font-display font-bold text-[#F3F1EA] group-hover:text-[#C2A155] transition-colors line-clamp-1">
                {sub.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="px-2 py-0.5 rounded text-[9px] font-mono text-[#96988F] bg-[#0D0F0E] border border-[#F3F1EA]/10">
                  {sub.category}
                </span>
                {isUnused && (
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#D65C4F]/15 text-[#D65C4F] border border-[#D65C4F]/30">
                    UNUSED SEAT
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>{renderStatusBadge(sub.status)}</div>
        </div>

        {/* Pricing Box — Tabular Mono Numerals */}
        <div className="my-4 p-3 rounded-lg bg-[#0D0F0E] border border-[#F3F1EA]/10 flex items-center justify-between font-mono">
          <div>
            <div className="text-[10px] uppercase text-[#96988F]">Monthly Cost</div>
            <div className="flex items-baseline gap-2 mt-0.5">
              {(currencyMode === 'dual' || currencyMode === 'USD') && (
                <span className="text-lg font-bold text-[#F3F1EA]">
                  ${typeof monthlyPriceUSD === 'number' ? monthlyPriceUSD.toFixed(2) : monthlyPriceUSD}
                </span>
              )}
              {(currencyMode === 'dual' || currencyMode === 'INR') && (
                <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-[#3FA972]/15 text-[#3FA972] border border-[#3FA972]/30">
                  ₹{typeof monthlyPriceINR === 'number' ? monthlyPriceINR.toLocaleString() : monthlyPriceINR}
                </span>
              )}
              <span className="text-xs text-[#96988F]">/mo</span>
            </div>
          </div>

          <div className="text-right">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#C2A155]/15 text-[#C2A155] border border-[#C2A155]/30">
              {sub.billingCycle || 'MONTHLY'}
            </span>
          </div>
        </div>

        {/* Renewal & Payment */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-3">
          <div className="p-2 rounded-lg bg-[#0D0F0E] border border-[#F3F1EA]/10 flex items-center gap-2">
            <FiCalendar className="w-3.5 h-3.5 text-[#C2A155] shrink-0" />
            <div className="min-w-0">
              <div className="text-[9px] uppercase text-[#96988F]">Renewal</div>
              <div className="text-[#F3F1EA] font-bold truncate">{sub.renewalDate}</div>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-[#0D0F0E] border border-[#F3F1EA]/10 flex items-center gap-2">
            <FiCreditCard className="w-3.5 h-3.5 text-[#3FA972] shrink-0" />
            <div className="min-w-0">
              <div className="text-[9px] uppercase text-[#96988F]">Payment</div>
              <div className="text-[#F3F1EA] font-bold truncate">{sub.paymentMethod}</div>
            </div>
          </div>
        </div>

        {/* AI Suggestion Box */}
        {sub.aiRecommendation && (
          <div className="mt-3 p-3 rounded-lg bg-[#C2A155]/10 border border-[#C2A155]/30 flex items-start gap-2 text-xs">
            <HiOutlineSparkles className="w-4 h-4 text-[#C2A155] shrink-0 mt-0.5" />
            <div>
              <span className="text-[9px] font-mono font-bold uppercase text-[#C2A155]">AI COPILOT RECOMMENDATION</span>
              <p className="text-[#F3F1EA] mt-0.5 leading-relaxed font-sans text-xs">
                {sub.aiRecommendation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="mt-4 pt-3 border-t border-[#F3F1EA]/10 flex items-center gap-2 font-mono text-xs">
        <button
          onClick={() => onViewDetails && onViewDetails(sub)}
          className="flex-1 py-1.5 px-3 rounded bg-[#0D0F0E] hover:bg-[#212522] text-[#96988F] hover:text-[#F3F1EA] border border-[#F3F1EA]/10 transition-colors flex items-center justify-center gap-1.5"
        >
          <FiEye className="w-3.5 h-3.5" />
          <span>Details</span>
        </button>

        <button
          onClick={handlePauseResumeToggle}
          disabled={isCancelled}
          className={`flex-1 py-1.5 px-3 rounded font-bold transition-colors flex items-center justify-center gap-1.5 border ${
            isPaused
              ? 'bg-[#3FA972]/15 text-[#3FA972] border-[#3FA972]/30'
              : 'bg-[#D97706]/15 text-[#D97706] border-[#D97706]/30'
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
          className={`py-1.5 px-3 rounded font-bold bg-[#D65C4F]/15 text-[#D65C4F] border border-[#D65C4F]/30 hover:bg-[#D65C4F]/30 transition-colors flex items-center justify-center gap-1 ${
            isCancelled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <FiTrash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Cancel</span>
        </button>
      </div>
    </div>
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
