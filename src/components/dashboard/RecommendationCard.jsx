import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiZap,
  FiTrendingDown,
  FiX,
  FiCheck,
  FiArrowRight,
  FiAlertTriangle,
  FiRefreshCw,
  FiSliders,
  FiDollarSign
} from 'react-icons/fi';
import { HiOutlineSparkles, HiOutlineShieldCheck } from 'react-icons/hi';

/**
 * Default mock AI Recommendations dataset
 */
const DEFAULT_RECOMMENDATIONS = [
  {
    id: 'rec-1',
    title: 'Unused Subscription Alert: Adobe Creative Cloud',
    explanation: 'SubSense AI detected 0 active usage events in the last 42 days. Canceling this idle plan will immediately optimize your monthly budget.',
    savingsUSD: 54.99,
    savingsINR: 4575,
    period: 'mo',
    badgeText: 'Save $54.99/mo',
    badgeINRText: 'Save ₹4,575/mo',
    type: 'cancel', // 'cancel' | 'switch' | 'consolidate' | 'downgrade'
    impactLevel: 'High Impact', // 'High Impact' | 'Quick Win' | 'Duplicate Alert' | 'Smart Tip'
    impactColor: 'bg-rose-500/15 text-rose-300 border-rose-500/40',
    primaryActionLabel: '1-Click Cancel',
    secondaryActionLabel: 'Remind Me Later',
    confidenceScore: 98,
    affectedService: 'Adobe Creative Cloud'
  },
  {
    id: 'rec-2',
    title: 'Duplicate Subscription Detected: Spotify',
    explanation: 'You are currently paying for both a Spotify Individual Plan ($10.99) and a Family Plan ($15.99) on separate credit cards.',
    savingsUSD: 10.99,
    savingsINR: 915,
    period: 'mo',
    badgeText: 'Save $10.99/mo',
    badgeINRText: 'Save ₹915/mo',
    type: 'consolidate',
    impactLevel: 'Duplicate Alert',
    impactColor: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
    primaryActionLabel: 'Consolidate Plans',
    secondaryActionLabel: 'Keep Both',
    confidenceScore: 99,
    affectedService: 'Spotify'
  },
  {
    id: 'rec-3',
    title: 'Switch Figma to Annual Billing',
    explanation: 'Switching your 3 Figma seat licenses from monthly to annual billing saves 20% total subscription costs each year.',
    savingsUSD: 79.99,
    savingsINR: 6600,
    period: 'yr',
    badgeText: 'Save $79.99/yr',
    badgeINRText: 'Save ₹6,600/yr',
    type: 'switch',
    impactLevel: 'Quick Win',
    impactColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
    primaryActionLabel: 'Switch Plan',
    secondaryActionLabel: 'Dismiss',
    confidenceScore: 94,
    affectedService: 'Figma Professional'
  },
  {
    id: 'rec-4',
    title: 'Optimize AWS Idle Instances',
    explanation: 'AWS Cloud billing contains 2 unattached EBS volumes and 1 idle micro-instance accumulating unnecessary micro-charges.',
    savingsUSD: 34.50,
    savingsINR: 2870,
    period: 'mo',
    badgeText: 'Save $34.50/mo',
    badgeINRText: 'Save ₹2,870/mo',
    type: 'downgrade',
    impactLevel: 'Smart Tip',
    impactColor: 'bg-blue-500/15 text-blue-300 border-blue-500/40',
    primaryActionLabel: 'Clean Up AWS',
    secondaryActionLabel: 'Ignore',
    confidenceScore: 92,
    affectedService: 'AWS Cloud Services'
  }
];

/**
 * Single Glassmorphic Recommendation Card Component
 */
const SingleCard = ({
  rec,
  onAction,
  onDismiss,
  currency = 'dual'
}) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePrimaryClick = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setIsSuccess(true);
      if (onAction) onAction(rec);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, height: 0 }}
        className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 shadow-xl flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <FiCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Action Executed Successfully!</h4>
            <p className="text-xs text-emerald-300/80 mt-0.5">
              Saved{' '}
              {currency === 'INR'
                ? rec.badgeINRText
                : currency === 'USD'
                ? rec.badgeText
                : `${rec.badgeText} (${rec.badgeINRText})`}
              {' '}on {rec.affectedService}.
            </p>
          </div>
        </div>
        <button
          onClick={() => onDismiss && onDismiss(rec.id)}
          className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-slate-800"
        >
          Close
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="p-5 rounded-2xl glass-card border border-slate-700/60 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 shadow-xl relative overflow-hidden group hover:border-slate-600 transition-all duration-300"
    >
      {/* Background AI Glow Effect */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/20 transition-all" />

      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
            <HiOutlineSparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border ${rec.impactColor}`}>
                {rec.impactLevel}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {rec.confidenceScore}% AI Confidence
              </span>
            </div>
          </div>
        </div>

        {/* Savings Badge */}
        <div className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1 shadow-inner">
          <FiTrendingDown className="w-3.5 h-3.5" />
          <span>
            {currency === 'INR'
              ? rec.badgeINRText
              : currency === 'USD'
              ? rec.badgeText
              : `${rec.badgeText} / ${rec.badgeINRText}`}
          </span>
        </div>
      </div>

      {/* Title & Explanation */}
      <div className="mt-3.5 space-y-1.5 relative z-10">
        <h3 className="text-base font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
          {rec.title}
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
          {rec.explanation}
        </p>
      </div>

      {/* Card Actions Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3 relative z-10">
        <button
          onClick={() => onDismiss && onDismiss(rec.id)}
          className="text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-800/60"
        >
          <FiX className="w-3.5 h-3.5" />
          <span>{rec.secondaryActionLabel || 'Dismiss'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrimaryClick}
            disabled={isExecuting}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/25 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            {isExecuting ? (
              <>
                <FiRefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>{rec.primaryActionLabel}</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * RecommendationCard Component
 * 
 * Renders glassmorphic AI Recommendation cards with savings badges, explanations,
 * and 1-Click action triggers. Accepts either a single recommendation object
 * or an array of recommendations.
 *
 * @param {Object} props
 * @param {Object|Array} [props.recommendations] - Single recommendation object or list
 * @param {Function} [props.onAction] - Action button click handler
 * @param {Function} [props.onDismiss] - Dismiss button click handler
 * @param {string} [props.currency='dual'] - Currency mode ('USD' | 'INR' | 'dual')
 */
const RecommendationCard = ({
  recommendations = DEFAULT_RECOMMENDATIONS,
  onAction,
  onDismiss,
  currency = 'dual'
}) => {
  const isArray = Array.isArray(recommendations);
  const initialItems = isArray ? recommendations : [recommendations];
  const [recsList, setRecsList] = useState(initialItems);

  const handleDismiss = (id) => {
    setRecsList((prev) => prev.filter((item) => item.id !== id));
    if (onDismiss) onDismiss(id);
  };

  const handleAction = (rec) => {
    if (onAction) onAction(rec);
  };

  // Calculate potential total savings
  const totalSavingsUSD = recsList.reduce((sum, item) => sum + item.savingsUSD, 0);
  const totalSavingsINR = recsList.reduce((sum, item) => sum + item.savingsINR, 0);

  return (
    <div className="w-full space-y-4">
      {/* Top Banner Header if rendering multiple */}
      {isArray && (
        <div className="flex items-center justify-between p-4 rounded-2xl glass border border-slate-700/60 bg-slate-900/90 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
              <FiZap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">AI Optimization Insights</h2>
              <p className="text-xs text-slate-400">
                {recsList.length} smart recommendations found to cut recurring waste
              </p>
            </div>
          </div>

          {recsList.length > 0 && (
            <div className="text-right px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
              <div className="text-[10px] uppercase font-semibold text-emerald-400">Potential Savings</div>
              <div className="text-sm font-bold">
                ${totalSavingsUSD.toFixed(2)}/mo (₹{totalSavingsINR.toLocaleString()})
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recommendation Cards List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {recsList.map((rec) => (
            <SingleCard
              key={rec.id}
              rec={rec}
              onAction={handleAction}
              onDismiss={handleDismiss}
              currency={currency}
            />
          ))}
        </AnimatePresence>

        {recsList.length === 0 && (
          <div className="p-8 text-center rounded-2xl border border-slate-800 bg-slate-900/50">
            <FiCheck className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-slate-200">All caught up!</h4>
            <p className="text-xs text-slate-400 mt-1">
              Your subscriptions are fully optimized. SubSense AI will alert you when new savings appear.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationCard;
