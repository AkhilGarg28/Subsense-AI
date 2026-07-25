import React from 'react';
import PropTypes from 'prop-types';
import {
  FiCheckCircle,
  FiCalendar,
  FiTrendingUp,
} from 'react-icons/fi';
import { HiOutlineSparkles as FiSparkles } from 'react-icons/hi';
import { mockSubscriptionsData } from '../../data/mockSubscriptionsData';
import { cn } from '../../utils/helpers';

/**
 * SummaryCard — SubSense AI Summary Component
 * Displays 4 summary metric cards:
 * 1. Active Subscriptions
 * 2. Monthly Cost
 * 3. Yearly Cost
 * 4. Potential Savings
 *
 * Features icons, value formatting (USD / INR), trend badges, and glassmorphism hover glow.
 */
const SummaryCard = ({
  summary = mockSubscriptionsData.summary,
  currency = 'USD',
  onCurrencyToggle,
  className = '',
}) => {
  const isINR = currency === 'INR';

  const cards = [
    {
      id: 'active-subs',
      title: 'Active Subscriptions',
      primaryValue: summary.activeCount ?? 14,
      secondaryValue: 'Services tracked',
      trend: summary.activeTrend || '+2 this month',
      icon: FiCheckCircle,
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/10 border-blue-500/20',
      glowColor: 'rgba(59, 130, 246, 0.15)',
      borderColor: 'hover:border-blue-500/40',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      id: 'monthly-cost',
      title: 'Monthly Spending',
      primaryValue: isINR ? summary.monthlyCostINR : summary.monthlyCostUSD,
      secondaryValue: isINR ? `Equivalent: ${summary.monthlyCostUSD}` : `Equivalent: ${summary.monthlyCostINR}`,
      trend: 'Per Month',
      icon: FiCalendar,
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-500/10 border-purple-500/20',
      glowColor: 'rgba(168, 85, 247, 0.15)',
      borderColor: 'hover:border-purple-500/40',
      badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    },
    {
      id: 'yearly-cost',
      title: 'Yearly Spending',
      primaryValue: isINR ? summary.yearlyCostINR : summary.yearlyCostUSD,
      secondaryValue: isINR ? `Equivalent: ${summary.yearlyCostUSD}` : `Equivalent: ${summary.yearlyCostINR}`,
      trend: 'Annual Total',
      icon: FiTrendingUp,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10 border-emerald-500/20',
      glowColor: 'rgba(16, 185, 129, 0.15)',
      borderColor: 'hover:border-emerald-500/40',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      id: 'potential-savings',
      title: 'Potential Savings',
      primaryValue: isINR ? summary.potentialSavingsINR : summary.potentialSavingsUSD,
      secondaryValue: isINR ? `Est. ${summary.potentialSavingsUSD}` : `Est. ${summary.potentialSavingsINR}`,
      trend: `${summary.savingsCount ?? 4} AI Recommendations`,
      icon: FiSparkles,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/10 border-amber-500/20',
      glowColor: 'rgba(245, 158, 11, 0.15)',
      borderColor: 'hover:border-amber-500/40',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
  ];

  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5', className)}>
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.id}
            className={cn(
              'group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl transition-all duration-300',
              'hover:-translate-y-1 hover:shadow-2xl',
              card.borderColor
            )}
          >
            {/* Background Glassmorphism Radial Hover Glow */}
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: card.glowColor }}
            />

            {/* Card Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110',
                    card.iconBg,
                    card.iconColor
                  )}
                >
                  <IconComponent className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {card.title}
                </span>
              </div>

              {/* Currency Quick Toggle Button */}
              {onCurrencyToggle && (card.id === 'monthly-cost' || card.id === 'yearly-cost') && (
                <button
                  type="button"
                  onClick={onCurrencyToggle}
                  className="rounded-lg bg-slate-800/80 px-2 py-1 text-[10px] font-bold text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
                  title="Toggle USD / INR"
                >
                  {currency}
                </button>
              )}
            </div>

            {/* Main Value Display */}
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                  {card.primaryValue}
                </span>
              </div>

              {/* Secondary Value & Trend Pill */}
              <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-800/60 pt-3 text-xs">
                <span className="text-slate-400 text-[11px] truncate">
                  {card.secondaryValue}
                </span>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold whitespace-nowrap',
                    card.badgeBg
                  )}
                >
                  {card.trend}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

SummaryCard.propTypes = {
  summary: PropTypes.shape({
    activeCount: PropTypes.number,
    monthlyCostUSD: PropTypes.string,
    monthlyCostINR: PropTypes.string,
    yearlyCostUSD: PropTypes.string,
    yearlyCostINR: PropTypes.string,
    potentialSavingsUSD: PropTypes.string,
    potentialSavingsINR: PropTypes.string,
    activeTrend: PropTypes.string,
    savingsCount: PropTypes.number,
  }),
  currency: PropTypes.oneOf(['USD', 'INR']),
  onCurrencyToggle: PropTypes.func,
  className: PropTypes.string,
};

export default SummaryCard;
