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
  HiOutlineChevronRight,
  HiOutlineLightningBolt,
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';

/**
 * Default AI insights dataset covering all required scenarios:
 * - Unused Subscriptions (Save $79.99/mo)
 * - Duplicate Services Alert (Netflix + Prime + Disney+)
 * - Price Hike Notification (Figma +15% rate increase)
 * - Annual Plan Suggestion
 */
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

/**
 * InsightsPanel — AI Insights Panel component for SubSense AI.
 * Displays AI-driven recommendations, duplicate detection, price hike alerts,
 * unused subscription cleanup, and annual plan savings with real-time interactive state feedback.
 */
const InsightsPanel = ({
  insights: initialInsights = defaultInsights,
  onAction = null,
  className = '',
}) => {
  const [insightsList, setInsightsList] = useState(initialInsights);
  const [actionStates, setActionStates] = useState({});
  const [filter, setFilter] = useState('all'); // 'all' | 'high' | 'savings' | 'alerts'
  const [toastMessage, setToastMessage] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Show a temporary feedback toast notification
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handle action click with state feedback
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

  // Dismiss an insight card
  const handleDismiss = (id) => {
    setActionStates((prev) => ({
      ...prev,
      [id]: { status: 'dismissed' },
    }));
    showToast('Insight dismissed');
  };

  // Undo action for an insight
  const handleUndo = (id) => {
    setActionStates((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    showToast('Action reverted');
  };

  // Refresh AI Analysis trigger simulation
  const handleRefreshAI = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setActionStates({});
      showToast('AI analysis updated! All insights refreshed.');
    }, 1000);
  };

  // Calculate filtered list
  const filteredInsights = insightsList.filter((item) => {
    const state = actionStates[item.id];
    if (state?.status === 'dismissed') return false;

    if (filter === 'high') return item.severity === 'high';
    if (filter === 'savings') return item.type === 'unused' || item.type === 'suggestion';
    if (filter === 'alerts') return item.type === 'duplicate' || item.type === 'price_hike';
    return true;
  });

  // Calculate total potential monthly savings remaining
  const activeInsights = insightsList.filter((item) => actionStates[item.id]?.status !== 'completed');
  const totalPotentialSavingsMonthly = activeInsights.reduce((sum, item) => {
    if (item.savingsPeriod === 'month') return sum + item.savingsAmount;
    if (item.savingsPeriod === 'year') return sum + item.savingsAmount / 12;
    return sum;
  }, 0);

  // Calculate total realized monthly savings from completed actions
  const completedInsights = insightsList.filter((item) => actionStates[item.id]?.status === 'completed');
  const totalRealizedSavingsMonthly = completedInsights.reduce((sum, item) => {
    if (item.savingsPeriod === 'month') return sum + item.savingsAmount;
    if (item.savingsPeriod === 'year') return sum + item.savingsAmount / 12;
    return sum;
  }, 0);

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-glass-border bg-glass p-6 backdrop-blur-xl transition-all duration-300',
        'hover:border-primary/40 hover:shadow-glow',
        className
      )}
    >
      {/* Glow background accent */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-glass-border pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-400 shadow-md">
            <HiOutlineSparkles className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-text-primary">AI Optimization Insights</h3>
              <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-400">
                SubSense AI Engine
              </span>
            </div>
            <p className="mt-0.5 text-xs text-text-secondary">
              Personalized recommendations to optimize subscription spend & prevent price hikes
            </p>
          </div>
        </div>

        {/* Action Controls & Potential Savings Counter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
            <HiOutlineCurrencyDollar className="h-4 w-4" />
            <span>Potential Savings: ${totalPotentialSavingsMonthly.toFixed(2)}/mo</span>
          </div>

          <button
            type="button"
            onClick={handleRefreshAI}
            disabled={isRefreshing}
            className={cn(
              'flex items-center gap-1.5 rounded-xl border border-glass-border bg-surface/70 px-3 py-1.5 text-xs font-semibold text-text-secondary transition-all',
              'hover:border-primary/40 hover:bg-surface-light hover:text-text-primary active:scale-95',
              isRefreshing && 'opacity-70 cursor-not-allowed'
            )}
          >
            <HiOutlineRefresh className={cn('h-3.5 w-3.5', isRefreshing && 'animate-spin')} />
            <span>{isRefreshing ? 'Analyzing...' : 'Re-analyze'}</span>
          </button>
        </div>
      </div>

      {/* Realized Savings Highlight (If any actions completed) */}
      {totalRealizedSavingsMonthly > 0 && (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-2.5 text-xs font-medium text-emerald-300">
          <div className="flex items-center gap-2">
            <HiOutlineShieldCheck className="h-5 w-5 text-emerald-400 flex-shrink-0" />
            <span>
              Great job! You have optimized actions saving you{' '}
              <strong className="font-bold text-emerald-200">
                ${totalRealizedSavingsMonthly.toFixed(2)}/mo
              </strong>.
            </span>
          </div>
          <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-400">
            {completedInsights.length} Action{completedInsights.length > 1 ? 's' : ''} Taken
          </span>
        </div>
      )}

      {/* Toast Feedback Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 flex items-center justify-between rounded-xl border border-indigo-500/40 bg-indigo-500/20 px-4 py-2.5 text-xs font-semibold text-indigo-200 shadow-lg"
          >
            <div className="flex items-center gap-2">
              <HiOutlineLightningBolt className="h-4 w-4 text-indigo-400" />
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-indigo-300 hover:text-white"
            >
              <HiOutlineX className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Filter Pills */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-text-muted mr-1">Filter Insights:</span>
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
              'rounded-lg px-3 py-1 text-xs font-medium transition-all',
              filter === f.key
                ? 'bg-primary text-white shadow-sm font-semibold'
                : 'border border-glass-border bg-surface/50 text-text-secondary hover:bg-surface-light hover:text-text-primary'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Insights Cards Grid */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filteredInsights.map((insight) => {
          const Icon = insight.icon;
          const state = actionStates[insight.id];
          const isCompleted = state?.status === 'completed';

          // Dynamic styling based on severity & badge color
          const colorStyles = {
            amber: {
              badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
              border: 'hover:border-amber-500/40',
              iconBg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
              highlight: 'bg-amber-500/20 text-amber-300',
              btnPrimary: 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold',
            },
            blue: {
              badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
              border: 'hover:border-blue-500/40',
              iconBg: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
              highlight: 'bg-blue-500/20 text-blue-300',
              btnPrimary: 'bg-blue-600 hover:bg-blue-500 text-white font-semibold',
            },
            rose: {
              badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
              border: 'hover:border-rose-500/40',
              iconBg: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
              highlight: 'bg-rose-500/20 text-rose-300',
              btnPrimary: 'bg-rose-600 hover:bg-rose-500 text-white font-semibold',
            },
            emerald: {
              badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
              border: 'hover:border-emerald-500/40',
              iconBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
              highlight: 'bg-emerald-500/20 text-emerald-300',
              btnPrimary: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold',
            },
          }[insight.badgeColor || 'blue'];

          return (
            <motion.div
              key={insight.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                'relative flex flex-col justify-between rounded-xl border p-4 backdrop-blur-md transition-all duration-300',
                isCompleted
                  ? 'border-emerald-500/40 bg-emerald-950/20 opacity-90'
                  : `border-glass-border bg-surface/40 ${colorStyles.border}`
              )}
            >
              {/* Card Header & Badge */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-lg border shadow-sm',
                        isCompleted
                          ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-400'
                          : colorStyles.iconBg
                      )}
                    >
                      {isCompleted ? (
                        <HiOutlineCheckCircle className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                        {insight.title}
                        {isCompleted && (
                          <span className="text-xs text-emerald-400 font-semibold">(Action Taken)</span>
                        )}
                      </h4>
                      <p className="text-xs font-medium text-text-muted">{insight.subtitle}</p>
                    </div>
                  </div>

                  {/* Savings / Alert Pill */}
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={cn(
                        'rounded-md border px-2.5 py-0.5 text-xs font-bold shadow-xs',
                        isCompleted
                          ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-400'
                          : colorStyles.badge
                      )}
                    >
                      {insight.highlightSavings}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
                      {insight.impactTag}
                    </span>
                  </div>
                </div>

                {/* Main Body Description */}
                <p className="mt-3 text-xs text-text-secondary leading-relaxed">
                  {insight.description}
                </p>

                {/* Services list tags */}
                {insight.services && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {insight.services.map((svc) => (
                      <span
                        key={svc}
                        className="rounded-md border border-glass-border bg-slate-900/60 px-2 py-0.5 text-[11px] font-medium text-text-muted"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer Actions & Feedback */}
              <div className="mt-4 pt-3 border-t border-glass-border flex flex-wrap items-center justify-between gap-2">
                {isCompleted ? (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                      <HiOutlineCheckCircle className="h-4 w-4" />
                      <span>
                        Done at {state.completedAt}: {state.actionText}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleUndo(insight.id)}
                      className="text-xs text-text-muted hover:text-text-primary underline"
                    >
                      Undo Action
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handleDismiss(insight.id)}
                      className="text-xs font-medium text-text-muted hover:text-text-primary transition-colors"
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
                          className="rounded-lg border border-glass-border bg-surface-light/60 px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all"
                        >
                          {insight.secondaryAction}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          handleActionClick(insight.id, 'primary', insight.recommendedAction)
                        }
                        className={cn(
                          'flex items-center gap-1 rounded-lg px-3.5 py-1.5 text-xs transition-all shadow-md active:scale-95',
                          colorStyles.btnPrimary
                        )}
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

      {filteredInsights.length === 0 && (
        <div className="mt-6 rounded-xl border border-glass-border bg-surface/30 p-8 text-center">
          <HiOutlineCheckCircle className="mx-auto h-10 w-10 text-emerald-400 opacity-80" />
          <h4 className="mt-2 text-sm font-bold text-text-primary">All Recommendations Processed!</h4>
          <p className="mt-1 text-xs text-text-secondary">
            You have optimized your subscriptions. Click "Re-analyze" to run a fresh scan.
          </p>
          <button
            type="button"
            onClick={handleRefreshAI}
            className="mt-4 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary-hover transition-all"
          >
            Run Fresh Scan
          </button>
        </div>
      )}
    </div>
  );
};

InsightsPanel.propTypes = {
  insights: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      severity: PropTypes.string,
      title: PropTypes.string.isRequired,
      highlightSavings: PropTypes.string.isRequired,
      savingsAmount: PropTypes.number,
      savingsPeriod: PropTypes.string,
      subtitle: PropTypes.string,
      description: PropTypes.string.isRequired,
      impactTag: PropTypes.string,
      badgeColor: PropTypes.string,
      icon: PropTypes.elementType,
      services: PropTypes.arrayOf(PropTypes.string),
      recommendedAction: PropTypes.string.isRequired,
      secondaryAction: PropTypes.string,
    })
  ),
  onAction: PropTypes.func,
  className: PropTypes.string,
};

export default InsightsPanel;
