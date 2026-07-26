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
      color: 'text-[#5B8CFF] bg-[#5B8CFF]/15 border-[#5B8CFF]/30',
      trend: '+4 this month',
    },
    {
      id: 'bills',
      label: 'Bills Processed',
      value: statistics?.billsProcessed || 142,
      unit: 'invoices',
      icon: HiOutlineReceiptTax,
      color: 'text-[#22C55E] bg-[#22C55E]/15 border-[#22C55E]/30',
      trend: '99.4% OCR precision',
    },
    {
      id: 'subscriptions',
      label: 'Active Subscriptions',
      value: statistics?.subscriptionsTracked || 14,
      unit: 'services',
      icon: HiOutlineViewList,
      color: 'text-[#8B5CF6] bg-[#8B5CF6]/15 border-[#8B5CF6]/30',
      trend: '3 auto-renew soon',
    },
    {
      id: 'queries',
      label: 'AI Insights Asked',
      value: statistics?.aiQueries || 86,
      unit: 'prompts',
      icon: HiOutlineSparkles,
      color: 'text-[#F59E0B] bg-[#F59E0B]/15 border-[#F59E0B]/30',
      trend: 'SubSense Bot v2',
    },
  ];

  return (
    <div
      className={cn(
        'rounded-2xl border border-white/10 bg-[#171F2F]/80 p-6 shadow-2xl backdrop-blur-xl md:p-8',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white">Activity & Usage Stats</h2>
          <p className="mt-0.5 text-xs text-[#A1A8B5]">
            Lifetime financial parsing metrics and savings accumulated with SubSense AI
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-[#22C55E]/30 bg-[#22C55E]/15 px-3.5 py-1.5 font-mono">
          <HiOutlineCurrencyDollar className="h-5 w-5 text-[#22C55E] shrink-0" />
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#22C55E]">
              Total Saved
            </span>
            <span className="text-xs font-bold text-white">
              {statistics?.moneySavedUSD || '$640.00'} / {statistics?.moneySavedINR || '₹53,100'}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 font-mono">
        {statsList.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.id}
              className="group relative rounded-xl border border-white/10 bg-[#121A2F] p-4 transition-all duration-300 hover:border-[#5B8CFF]/40 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-2">
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105',
                    stat.color
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <span className="flex items-center gap-1 text-[10px] text-[#A1A8B5] truncate">
                  <HiOutlineTrendingUp className="h-3 w-3 text-[#22C55E] shrink-0" />
                  <span className="truncate">{stat.trend}</span>
                </span>
              </div>

              <div className="mt-4">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-xs text-[#A1A8B5]">{stat.unit}</span>
                </div>
                <p className="mt-1 text-xs font-bold text-[#A1A8B5]">
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
