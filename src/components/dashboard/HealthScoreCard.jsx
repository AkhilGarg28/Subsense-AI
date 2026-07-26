import React from 'react';
import PropTypes from 'prop-types';
import {
  HiOutlineSparkles,
  HiOutlineFilm,
  HiOutlineTrash,
  HiOutlineRefresh,
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
} from 'react-icons/hi';
import { Odometer } from '../common';
import { cn } from '../../utils/helpers';

const defaultSuggestions = [
  {
    id: 'sug-1',
    icon: HiOutlineFilm,
    title: 'Reduce entertainment expenses',
    description: 'Streaming & entertainment spend is 24% above target budget.',
    savings: 'Save ~$45/mo',
    badge: 'High Impact',
    actionText: 'Optimize',
  },
  {
    id: 'sug-2',
    icon: HiOutlineTrash,
    title: 'Cancel unused Canva subscription',
    description: 'No active usage detected across connected accounts for 60+ days.',
    savings: 'Save $12.99/mo',
    badge: 'Unused Sub',
    actionText: 'Cancel',
  },
  {
    id: 'sug-3',
    icon: HiOutlineRefresh,
    title: 'Switch Spotify to annual plan',
    description: 'Switching from monthly to annual billing saves 16% annually.',
    savings: 'Save $24.00/yr',
    badge: 'Quick Win',
    actionText: 'Switch',
  },
];

const HealthScoreCard = ({
  score = 92,
  maxScore = 100,
  statusBadge = 'Healthy Spending',
  title = 'Financial Health Score',
  subtitle = 'AI-powered real-time spending assessment',
  suggestions = defaultSuggestions,
  onActionClick,
  className = '',
}) => {
  const radius = 64;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / maxScore) * circumference;

  return (
    <div className={cn('relative rounded-xl border border-[#F3F1EA]/10 bg-[#171A18] p-6 shadow-2xl', className)}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F3F1EA]/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <HiOutlineShieldCheck className="h-5 w-5 text-[#3FA972]" />
            <h3 className="text-lg font-display font-bold text-[#F3F1EA]">{title}</h3>
          </div>
          <p className="mt-1 text-xs text-[#96988F] font-sans">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-[#3FA972]/30 bg-[#3FA972]/15 px-3 py-1 text-xs font-mono font-bold text-[#3FA972]">
          <span className="h-2 w-2 rounded-full bg-[#3FA972]" />
          <span>{statusBadge}</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        {/* SVG Circular Score Ring — Brass Accent */}
        <div className="flex flex-col items-center justify-center lg:col-span-4">
          <div className="relative flex items-center justify-center">
            <svg height={radius * 2} width={radius * 2} className="-rotate-90 transform overflow-visible">
              <circle
                stroke="rgba(243, 241, 234, 0.08)"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              <circle
                stroke="#C2A155"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-mono">
              <span className="text-3xl font-bold text-[#F3F1EA]">
                <Odometer value={score} />
              </span>
              <span className="text-[10px] uppercase text-[#96988F]">
                / {maxScore} PTS
              </span>
            </div>
          </div>

          <div className="mt-3 text-center">
            <span className="inline-block rounded bg-[#0D0F0E] border border-[#F3F1EA]/10 px-2.5 py-0.5 text-xs font-mono text-[#96988F]">
              RATING: <span className="text-[#3FA972] font-bold">OPTIMAL</span>
            </span>
          </div>
        </div>

        {/* AI Recommendations List */}
        <div className="space-y-3 lg:col-span-8 font-sans">
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-1.5 text-[#F3F1EA]">
              <HiOutlineSparkles className="h-4 w-4 text-[#C2A155]" />
              <span className="font-bold">ACTIONABLE INSIGHTS ({suggestions.length})</span>
            </div>
            <span className="text-[#3FA972] font-bold">~$82.00/MO SAVINGS</span>
          </div>

          <div className="space-y-2.5">
            {suggestions.map((item) => {
              const ItemIcon = item.icon || HiOutlineSparkles;
              return (
                <div
                  key={item.id || item.title}
                  className="flex items-center justify-between gap-3 rounded-lg border border-[#F3F1EA]/10 bg-[#0D0F0E] p-3 hover:border-[#C2A155]/40 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#171A18] text-[#C2A155] border border-[#F3F1EA]/10">
                      <ItemIcon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-xs font-display font-bold text-[#F3F1EA]">
                          {item.title}
                        </p>
                        {item.badge && (
                          <span className="rounded bg-[#171A18] border border-[#F3F1EA]/10 px-2 py-0.5 text-[9px] font-mono text-[#96988F]">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="truncate text-[11px] text-[#96988F]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3 font-mono">
                    {item.savings && (
                      <span className="hidden text-xs font-bold text-[#3FA972] sm:inline-block">
                        {item.savings}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => onActionClick && onActionClick(item)}
                      className="flex items-center gap-1 rounded bg-[#C2A155] px-2.5 py-1 text-xs font-bold text-[#0D0F0E] hover:bg-[#D4B468] transition-colors"
                    >
                      <span>{item.actionText || 'Apply'}</span>
                      <HiOutlineArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

HealthScoreCard.propTypes = {
  score: PropTypes.number,
  maxScore: PropTypes.number,
  statusBadge: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  suggestions: PropTypes.array,
  onActionClick: PropTypes.func,
  className: PropTypes.string,
};

export default HealthScoreCard;
