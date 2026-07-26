import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineSparkles,
  HiOutlineExclamationCircle,
  HiOutlineClock,
  HiOutlineTrendingUp,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
  HiOutlineRefresh,
  HiOutlineCurrencyDollar,
  HiOutlineShieldCheck,
  HiOutlineX,
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';

const defaultInsights = [
  {
    id: 'unused-subscriptions',
    type: 'unused',
    severity: 'high',
    title: 'Unused Subscriptions',
    highlightSavings: '$79.99/mo',
    savingsAmount: 79.99,
    savingsPeriod: 'month',
    subtitle: 'Adobe Creative Cloud & Acrobat Pro',
    description:
      'Zero logins recorded across your workspace in the past 45 days. Pausing or canceling these licenses will reduce your monthly bill immediately.',
    impactTag: 'High Savings',
    badgeColor: 'amber',
    icon: HiOutlineClock,
    services: ['Adobe Creative Cloud', 'Acrobat Pro'],
    lastUsed: '48 days ago',
    recommendedAction: 'Cancel & Save $79.99/mo',
    secondaryAction: 'Pause License',
  },
  {
    id: 'duplicate-services',
    type: 'duplicate',
    severity: 'medium',
    title: 'Duplicate Services Alert',
    highlightSavings: '$28.98/mo',
    savingsAmount: 28.98,
    savingsPeriod: 'month',
    subtitle: 'Netflix + Prime Video + Disney+',
    description:
      'You are paying for 3 streaming platforms with over 65% content overlap. Pausing 2 dormant profiles can save you up to $28.98/mo.',
    impactTag: 'Overlap Detected',
    badgeColor: 'blue',
    icon: HiOutlineExclamationCircle,
    services: ['Netflix Premium', 'Amazon Prime', 'Disney+ Premium'],
    lastUsed: 'Active on 3 devices',
    recommendedAction: 'Consolidate & Save',
    secondaryAction: 'Pause 2 Services',
  },
  {
    id: 'price-hike',
    type: 'price_hike',
    severity: 'high',
    title: 'Price Hike Notification',
    highlightSavings: '+15% Rate Increase',
    savingsAmount: 27.0,
    savingsPeriod: 'year',
    subtitle: 'Figma Professional Plan',
    description:
      'Figma will increase monthly rates by 15% starting next billing cycle (from $15.00/mo to $17.25/mo). Switch to annual billing now to lock in current rate.',
    impactTag: 'Price Hike +15%',
    badgeColor: 'rose',
    icon: HiOutlineTrendingUp,
    services: ['Figma Professional'],
    effectiveDate: 'Aug 1, 2026',
    recommendedAction: 'Lock Annual Rate (-15%)',
    secondaryAction: 'Acknowledge Alert',
  },
  {
    id: 'annual-plan',
    type: 'suggestion',
    severity: 'low',
    title: 'Annual Plan Suggestion',
    highlightSavings: '$42.00/yr',
    savingsAmount: 42.0,
    savingsPeriod: 'year',
    subtitle: 'Spotify & Notion AI',
    description:
      'Switching Spotify Premium ($10.99/mo) and Notion AI ($10/mo) from monthly to annual billing saves 20% total (equivalent to 2 free months).',
    impactTag: '20% Discount',
    badgeColor: 'emerald',
    icon: HiOutlineSparkles,
    services: ['Spotify Premium', 'Notion AI'],
    recommendedAction: 'Switch to Annual & Save',
    secondaryAction: 'View Breakdown',
  },
];

const InsightsPanel = ({
  insights: initialInsights = defaultInsights,
  onAction = null,
  className = '',
}) => {
  const [insightsList] = useState(initialInsights);
  const [actionStates, setActionStates] = useState({});
  const [filter, setFilter] = useState('all');
  const [toastMessage, setToastMessage] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleActionClick = (id, actionType, actionText) => {
    setActionStates((prev) => ({
      ...prev,
      [id]: {
        status: 'completed',
        actionType,
        completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionText,
      },
    }));

    const insight = insightsList.find((i) => i.id === id);
    const successMsg = `Action applied: "${actionText}" for ${insight?.title || 'insight'}`;
    showToast(successMsg);

    if (onAction) {
      onAction({ id, actionType, actionText, insight });
    }
  };

  const handleDismiss = (id) => {
    setActionStates((prev) => ({
      ...prev,
      [id]: { status: 'dismissed' },
    }));
    showToast('Insight dismissed');
  };

  const handleUndo = (id) => {
    setActionStates((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    showToast('Action reverted');
  };

  const handleRefreshAI = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setActionStates({});
      showToast('AI analysis updated! All insights refreshed.');
    }, 1000);
  };

  const filteredInsights = insightsList.filter((item) => {
    const state = actionStates[item.id];
    if (state?.status === 'dismissed') return false;

    if (filter === 'high') return item.severity === 'high';
    if (filter === 'savings') return item.type === 'unused' || item.type === 'suggestion';
    if (filter === 'alerts') return item.type === 'duplicate' || item.type === 'price_hike';
    return true;
  });

  const activeInsights = insightsList.filter((item) => actionStates[item.id]?.status !== 'completed');
  const totalPotentialSavingsMonthly = activeInsights.reduce((sum, item) => {
    if (item.savingsPeriod === 'month') return sum + item.savingsAmount;
    if (item.savingsPeriod === 'year') return sum + item.savingsAmount / 12;
    return sum;
  }, 0);

  const completedInsights = insightsList.filter((item) => actionStates[item.id]?.status === 'completed');
  const totalRealizedSavingsMonthly = completedInsights.reduce((sum, item) => {
    if (item.savingsPeriod === 'month') return sum + item.savingsAmount;
    if (item.savingsPeriod === 'year') return sum + item.savingsAmount / 12;
    return sum;
  }, 0);

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-[20px] border border-white/10 bg-[#171F2F]/80 p-7 sm:p-8 backdrop-blur-xl transition-all duration-300',
        'hover:border-[#5B8CFF]/40 hover:shadow-glow-blue',
        className
      )}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#8B5CF6]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#5B8CFF]/10 blur-3xl" />

      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5B8CFF]/15 border border-[#5B8CFF]/30 text-[#5B8CFF] shadow-md">
            <HiOutlineSparkles className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">AI Optimization Insights</h3>
              <span className="rounded-full border border-[#5B8CFF]/30 bg-[#5B8CFF]/15 px-2.5 py-0.5 text-xs font-mono font-bold text-[#5B8CFF]">
                SubSense Engine
              </span>
            </div>
            <p className="mt-0.5 text-xs text-[#A1A8B5]">
              Personalized recommendations to optimize subscription spend & prevent price hikes
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 rounded-xl border border-[#22C55E]/30 bg-[#22C55E]/15 px-3.5 py-2 font-bold text-[#22C55E]">
            <HiOutlineCurrencyDollar className="h-4 w-4" />
            <span>Potential Savings: ${totalPotentialSavingsMonthly.toFixed(2)}/mo</span>
          </div>

          <button
            type="button"
            onClick={handleRefreshAI}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#121A2F] px-3.5 py-2 font-bold text-[#A1A8B5] hover:text-white transition-all cursor-pointer"
          >
            <HiOutlineRefresh className={cn('h-4 w-4 text-[#5B8CFF]', isRefreshing && 'animate-spin')} />
            <span>{isRefreshing ? 'Analyzing...' : 'Re-analyze'}</span>
          </button>
        </div>
      </div>

      {totalRealizedSavingsMonthly > 0 && (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-[#22C55E]/40 bg-[#22C55E]/15 px-4 py-2.5 text-xs font-mono text-[#22C55E]">
          <div className="flex items-center gap-2">
            <HiOutlineShieldCheck className="h-5 w-5 text-[#22C55E] flex-shrink-0" />
            <span>
              Great job! You optimized actions saving you{' '}
              <strong className="font-bold text-white">
                ${totalRealizedSavingsMonthly.toFixed(2)}/mo
              </strong>.
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold text-[#22C55E]">
            {completedInsights.length} Action{completedInsights.length > 1 ? 's' : ''} Taken
          </span>
        </div>
      )}

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 flex items-center justify-between rounded-xl border border-[#5B8CFF]/40 bg-[#5B8CFF]/20 px-4 py-2.5 text-xs font-mono text-white shadow-lg"
          >
            <div className="flex items-center gap-2">
              <HiOutlineSparkles className="h-4 w-4 text-[#5B8CFF]" />
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-[#A1A8B5] hover:text-white"
            >
              <HiOutlineX className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-[#A1A8B5] mr-1">Filter Insights:</span>
        {[
          { key: 'all', label: `All (${activeInsights.length})` },
          { key: 'high', label: 'High Impact' },
          { key: 'savings', label: 'Unused & Annual' },
          { key: 'alerts', label: 'Duplicates & Hikes' },
        ].map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={cn(
              'rounded-lg px-3 py-1 font-bold transition-all cursor-pointer',
              filter === f.key
                ? 'gradient-primary text-white shadow-glow-blue'
                : 'border border-white/10 bg-[#121A2F] text-[#A1A8B5] hover:text-white'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Insights Cards Grid */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2 font-mono">
        {filteredInsights.map((insight) => {
          const Icon = insight.icon || HiOutlineSparkles;
          const state = actionStates[insight.id];
          const isCompleted = state?.status === 'completed';

          return (
            <motion.div
              key={insight.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                'relative flex flex-col justify-between rounded-xl border p-5 transition-all duration-300',
                isCompleted
                  ? 'border-[#22C55E]/40 bg-[#22C55E]/10'
                  : 'border-white/10 bg-[#121A2F]'
              )}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-xl border shrink-0',
                        isCompleted
                          ? 'border-[#22C55E]/40 bg-[#22C55E]/20 text-[#22C55E]'
                          : 'border-[#5B8CFF]/30 bg-[#5B8CFF]/15 text-[#5B8CFF]'
                      )}
                    >
                      {isCompleted ? (
                        <HiOutlineCheckCircle className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        {insight.title}
                        {isCompleted && (
                          <span className="text-xs text-[#22C55E] font-bold">(Action Taken)</span>
                        )}
                      </h4>
                      <p className="text-xs text-[#A1A8B5]">{insight.subtitle}</p>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'rounded-md border px-2.5 py-0.5 text-xs font-bold shrink-0',
                      isCompleted
                        ? 'border-[#22C55E]/40 bg-[#22C55E]/20 text-[#22C55E]'
                        : 'border-[#5B8CFF]/30 bg-[#5B8CFF]/15 text-[#5B8CFF]'
                    )}
                  >
                    {insight.highlightSavings}
                  </span>
                </div>

                <p className="mt-3 text-xs text-[#A1A8B5] leading-relaxed font-sans">
                  {insight.description}
                </p>

                {insight.services && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {insight.services.map((svc) => (
                      <span
                        key={svc}
                        className="rounded-md border border-white/10 bg-[#171F2F] px-2 py-0.5 text-[11px] font-bold text-[#A1A8B5]"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                {isCompleted ? (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 text-[#22C55E] font-bold">
                      <HiOutlineCheckCircle className="h-4 w-4" />
                      <span>Applied: {state.actionText}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleUndo(insight.id)}
                      className="text-xs text-[#A1A8B5] hover:text-white underline cursor-pointer"
                    >
                      Undo
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handleDismiss(insight.id)}
                      className="text-xs text-[#A1A8B5] hover:text-white transition-colors cursor-pointer"
                    >
                      Dismiss
                    </button>

                    <div className="flex items-center gap-2">
                      {insight.secondaryAction && (
                        <button
                          type="button"
                          onClick={() =>
                            handleActionClick(insight.id, 'secondary', insight.secondaryAction)
                          }
                          className="rounded-xl border border-white/10 bg-[#171F2F] px-3 py-1.5 text-xs font-bold text-[#A1A8B5] hover:text-white cursor-pointer"
                        >
                          {insight.secondaryAction}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          handleActionClick(insight.id, 'primary', insight.recommendedAction)
                        }
                        className="flex items-center gap-1.5 rounded-xl gradient-primary px-3.5 py-1.5 text-xs font-bold text-white shadow-glow-blue cursor-pointer"
                      >
                        <span>{insight.recommendedAction}</span>
                        <HiOutlineArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

InsightsPanel.propTypes = {
  insights: PropTypes.array,
  onAction: PropTypes.func,
  className: PropTypes.string,
};

export default InsightsPanel;
