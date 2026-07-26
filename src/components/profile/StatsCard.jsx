import React from 'react';
import PropTypes from 'prop-types';
import {
  HiOutlineDocumentText,
  HiOutlineReceiptTax,
  HiOutlineViewList,
  HiOutlineSparkles,
  HiOutlineCurrencyDollar,
  HiOutlineTrendingUp,
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';
import { mockProfileData } from '../../data/mockProfileData';

/**
 * StatsCard — User Financial & AI Activity Statistics Card component.
 * Renders user milestones (Receipts Uploaded, Bills Processed, Subscriptions Tracked,
 * AI Queries, Money Saved) with clean glassmorphic tile layout.
 */
const StatsCard = ({
  statistics = mockProfileData.statistics,
  className = '',
}) => {
  const statsList = [
    {
      id: 'receipts',
      label: 'Receipts Uploaded',
      value: statistics?.receiptsUploaded || 24,
      unit: 'files',
      icon: HiOutlineDocumentText,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      trend: '+4 this month',
    },
    {
      id: 'bills',
      label: 'Bills Processed',
      value: statistics?.billsProcessed || 142,
      unit: 'invoices',
      icon: HiOutlineReceiptTax,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      trend: '99.4% OCR precision',
    },
    {
      id: 'subscriptions',
      label: 'Active Subscriptions',
      value: statistics?.subscriptionsTracked || 14,
      unit: 'services',
      icon: HiOutlineViewList,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      trend: '3 auto-renew soon',
    },
    {
      id: 'queries',
      label: 'AI Insights Asked',
      value: statistics?.aiQueries || 86,
      unit: 'prompts',
      icon: HiOutlineSparkles,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      trend: 'SubSense Bot v2',
    },
  ];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-glass-border bg-glass p-6 backdrop-blur-xl transition-all duration-300 md:p-8',
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-glass-border pb-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Activity & Usage Stats</h2>
          <p className="mt-0.5 text-xs text-text-muted">
            Lifetime financial parsing metrics and savings accumulated with SubSense AI
          </p>
        </div>

        {/* Money Saved Highlight Pill */}
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 backdrop-blur-md">
          <HiOutlineCurrencyDollar className="h-5 w-5 text-emerald-400 shrink-0" />
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-emerald-400/80">
              Total Saved
            </span>
            <span className="text-xs font-bold text-emerald-300">
              {statistics?.moneySavedUSD || '$640.00'} / {statistics?.moneySavedINR || '₹53,100'}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Stat Items */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsList.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.id}
              className="group relative overflow-hidden rounded-2xl border border-glass-border/60 bg-glass/40 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-glass/80 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-xl border text-xl shadow-sm transition-transform duration-300 group-hover:scale-105',
                    stat.color
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <span className="flex items-center gap-1 text-[10px] font-medium text-text-muted">
                  <HiOutlineTrendingUp className="h-3 w-3 text-emerald-400" />
                  {stat.trend}
                </span>
              </div>

              <div className="mt-4">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-text-primary">
                    {stat.value}
                  </span>
                  <span className="text-xs font-medium text-text-muted">{stat.unit}</span>
                </div>
                <p className="mt-1 text-xs font-semibold text-text-secondary">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

StatsCard.propTypes = {
  statistics: PropTypes.shape({
    receiptsUploaded: PropTypes.number,
    billsProcessed: PropTypes.number,
    subscriptionsTracked: PropTypes.number,
    aiQueries: PropTypes.number,
    moneySavedUSD: PropTypes.string,
    moneySavedINR: PropTypes.string,
  }),
  className: PropTypes.string,
};

export default StatsCard;
