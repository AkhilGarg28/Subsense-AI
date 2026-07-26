import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineSparkles,
  HiOutlineShieldCheck,
  HiOutlineTrendingDown,
  HiOutlineExclamation,
  HiOutlineCheck,
  HiOutlineArrowRight,
  HiOutlineMusicNote,
  HiOutlineRefresh,
  HiOutlineLightningBolt,
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';

/**
 * AI Insights Panel Data - Central hero card daily insights
 */
const DEFAULT_DAILY_INSIGHTS = [
  {
    id: 'insight-1',
    category: 'Warning',
    badgeType: 'warning', // 'savings' | 'warning' | 'recommendation'
    badgeText: 'Duplicate Subscriptions',
    title: 'You are paying for three music subscriptions simultaneously',
    description: 'SubSense AI identified active billings for Spotify Premium ($11.99), Apple Music ($10.99), and YouTube Music ($13.99) across connected accounts.',
    savingsText: 'Save $22.98/mo',
    confidenceScore: 99.4,
    icon: HiOutlineMusicNote,
    actionLabel: 'Consolidate Music Plans',
  },
  {
    id: 'insight-2',
    category: 'Savings',
    badgeType: 'savings',
    badgeText: 'Unused SaaS Seat',
    title: 'Canceling Canva Pro saves $79.99/mo ($960/yr)',
    description: 'Zero logins or design exports detected in the last 45 days. One-click cancellation will prevent upcoming auto-debit.',
    savingsText: 'Save $960/yr',
    confidenceScore: 98.7,
    icon: HiOutlineSparkles,
    actionLabel: '1-Click Cancel Canva',
  },
  {
    id: 'insight-3',
    category: 'Warning',
    badgeType: 'warning',
    badgeText: 'Budget Overrun Alert',
    title: 'You will exceed your monthly entertainment budget next week',
    description: 'Projected spend is trending 24% above your target threshold due to unannounced streaming price hikes.',
    savingsText: 'Budget Guard',
    confidenceScore: 94.2,
    icon: HiOutlineExclamation,
    actionLabel: 'Adjust Budget Limit',
  },
  {
    id: 'insight-4',
    category: 'Recommendation',
    badgeType: 'recommendation',
    badgeText: 'Upcoming Due Date',
    title: 'Electricity & Utility bill ($145.00) is due tomorrow',
    description: 'Autopay is not enabled for this biller. Pay now with 1-tap or set automated liquidity reminder.',
    savingsText: 'Due Tomorrow',
    confidenceScore: 99.9,
    icon: HiOutlineLightningBolt,
    actionLabel: 'Pay Bill Now',
  },
];

/**
 * AIInsightsPanel — Central hero glass card for the Dashboard.
 * Displays AI Avatar indicator, live daily insights feed, colorful badges
 * (Savings, Warning, Recommendation, Confidence %), and interactive 1-click buttons.
 */
const AIInsightsPanel = ({
  insights = DEFAULT_DAILY_INSIGHTS,
  className = '',
  onActionClick,
}) => {
  const [items, setItems] = useState(insights);
  const [executingId, setExecutingId] = useState(null);
  const [executedIds, setExecutedIds] = useState([]);

  const handleAction = (item) => {
    setExecutingId(item.id);
    setTimeout(() => {
      setExecutingId(null);
      setExecutedIds((prev) => [...prev, item.id]);
      if (onActionClick) onActionClick(item);
    }, 900);
  };

  const getBadgeStyle = (badgeType) => {
    switch (badgeType) {
      case 'savings':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'warning':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'recommendation':
      default:
        return 'bg-primary/15 text-primary border-primary/30';
    }
  };

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-glass-border bg-glass-card p-6 backdrop-blur-2xl transition-all duration-300 hover:border-primary/40 hover:shadow-glow-blue',
        className
      )}
    >
      {/* Background Ambient Orbs */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl transition-opacity group-hover:opacity-80" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-secondary/15 blur-3xl transition-opacity group-hover:opacity-80" />

      {/* Header Bar with AI Avatar & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-glass-border pb-5 relative z-10">
        <div className="flex items-center gap-3">
          {/* Glowing AI Avatar Icon */}
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl gradient-blue-purple text-white shadow-glow-purple">
            <HiOutlineSparkles className="h-6 w-6 animate-pulse" />
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-background">
              <span className="h-2 w-2 rounded-full bg-white animate-ping" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                Autonomous AI Insights
              </h2>
              <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wider">
                Live Audit
              </span>
            </div>
            <p className="mt-0.5 text-xs text-text-secondary">
              Generated by fine-tuned SubSense Copilot • Updated 2 mins ago
            </p>
          </div>
        </div>

        {/* AI Confidence Indicator */}
        <div className="flex items-center gap-2 rounded-full border border-glass-border bg-surface/80 px-3.5 py-1.5 backdrop-blur-md">
          <HiOutlineShieldCheck className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-semibold text-text-primary">
            98.5% AI Confidence
          </span>
        </div>
      </div>

      {/* Daily Insights Grid Feed */}
      <div className="mt-6 space-y-4 relative z-10">
        <AnimatePresence mode="popLayout">
          {items.map((item) => {
            const Icon = item.icon || HiOutlineSparkles;
            const isExecuted = executedIds.includes(item.id);
            const isExecuting = executingId === item.id;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  'group/card relative flex flex-col justify-between rounded-2xl border p-4 backdrop-blur-md transition-all duration-300 sm:flex-row sm:items-center',
                  isExecuted
                    ? 'border-emerald-500/40 bg-emerald-950/20 opacity-85'
                    : 'border-glass-border bg-surface/50 hover:border-primary/40 hover:bg-surface/80'
                )}
              >
                {/* Left Section: Icon, Badges, Title & Description */}
                <div className="flex items-start gap-3.5 min-w-0 flex-1 pr-2">
                  <div
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-sm transition-transform group-hover/card:scale-105',
                      getBadgeStyle(item.badgeType)
                    )}
                  >
                    {isExecuted ? (
                      <HiOutlineCheck className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    {/* Badge Row */}
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className={cn(
                          'rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                          getBadgeStyle(item.badgeType)
                        )}
                      >
                        {item.badgeText}
                      </span>
                      <span className="text-[10px] font-medium text-emerald-400">
                        {item.savingsText}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        • {item.confidenceScore}% match
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-sm font-bold text-white tracking-tight group-hover/card:text-primary transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-1 text-xs text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Right Section: Action Button */}
                <div className="mt-3 flex shrink-0 items-center justify-end sm:mt-0 sm:pl-4">
                  <button
                    type="button"
                    onClick={() => handleAction(item)}
                    disabled={isExecuting || isExecuted}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer shadow-md active:scale-95',
                      isExecuted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : isExecuting
                        ? 'bg-primary/30 text-primary border border-primary/40 cursor-wait'
                        : 'gradient-primary text-white hover:brightness-110 shadow-glow-blue'
                    )}
                  >
                    {isExecuting ? (
                      <>
                        <HiOutlineRefresh className="h-3.5 w-3.5 animate-spin" />
                        <span>Applying...</span>
                      </>
                    ) : isExecuted ? (
                      <>
                        <HiOutlineCheck className="h-3.5 w-3.5" />
                        <span>Action Executed</span>
                      </>
                    ) : (
                      <>
                        <span>{item.actionLabel}</span>
                        <HiOutlineArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

AIInsightsPanel.propTypes = {
  insights: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      category: PropTypes.string,
      badgeType: PropTypes.string,
      badgeText: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      savingsText: PropTypes.string,
      confidenceScore: PropTypes.number,
      icon: PropTypes.elementType,
      actionLabel: PropTypes.string,
    })
  ),
  className: PropTypes.string,
  onActionClick: PropTypes.func,
};

export default AIInsightsPanel;
