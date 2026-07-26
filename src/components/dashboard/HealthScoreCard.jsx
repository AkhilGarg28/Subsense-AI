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
    badgeColor: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
    iconBg: 'bg-[#8B5CF6]/15 text-[#8B5CF6]',
    actionText: 'Optimize',
  },
  {
    id: 'sug-2',
    icon: HiOutlineTrash,
    title: 'Cancel unused Canva subscription',
    description: 'No active usage detected across connected accounts for 60+ days.',
    savings: 'Save $12.99/mo',
    badge: 'Unused Sub',
    badgeColor: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20',
    iconBg: 'bg-[#EF4444]/15 text-[#EF4444]',
    actionText: 'Cancel',
  },
  {
    id: 'sug-3',
    icon: HiOutlineRefresh,
    title: 'Switch Spotify to annual plan',
    description: 'Switching from monthly to annual billing saves 16% annually.',
    savings: 'Save $24.00/yr',
    badge: 'Quick Win',
    badgeColor: 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20',
    iconBg: 'bg-[#22C55E]/15 text-[#22C55E]',
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
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / maxScore) * circumference;

  return (
    <div className={cn('relative overflow-hidden rounded-2xl border border-white/10 bg-[#171F2F]/80 p-6 backdrop-blur-xl shadow-2xl', className)}>
      {/* Background Glow */}
      <div className="ambient-orb ambient-orb-1 -right-20 -top-20 h-56 w-56 opacity-30" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <HiOutlineShieldCheck className="h-5 w-5 text-[#22C55E]" />
            <h3 className="text-lg font-bold text-white">{title}</h3>
          </div>
          <p className="mt-1 text-xs text-[#A1A8B5]">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-3.5 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
          </span>
          <span className="text-xs font-semibold text-[#22C55E]">
            {statusBadge}
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        {/* Left Column: SVG Circular Progress Indicator */}
        <div className="flex flex-col items-center justify-center lg:col-span-4">
          <div className="relative flex items-center justify-center">
            <svg height={radius * 2} width={radius * 2} className="-rotate-90 transform overflow-visible">
              <defs>
                <linearGradient id="healthScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22C55E" />
                  <stop offset="50%" stopColor="#5B8CFF" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>

              <circle
                stroke="rgba(255, 255, 255, 0.08)"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              <circle
                stroke="url(#healthScoreGrad)"
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
              <span className="text-3xl font-extrabold text-white">
                <Odometer value={score} />
              </span>
              <span className="text-[10px] uppercase font-bold text-[#A1A8B5]">
                / {maxScore} PTS
              </span>
            </div>
          </div>

          <div className="mt-3 text-center">
            <span className="inline-block rounded-lg bg-[#121A2F] border border-white/10 px-3 py-1 text-xs font-mono text-[#A1A8B5]">
              RATING: <span className="text-[#22C55E] font-bold">OPTIMAL</span>
            </span>
          </div>
        </div>

        {/* Right Column: AI Recommendations List */}
        <div className="space-y-3 lg:col-span-8">
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-1.5 text-white font-bold">
              <HiOutlineSparkles className="h-4 w-4 text-[#5B8CFF]" />
              <span>ACTIONABLE INSIGHTS ({suggestions.length})</span>
            </div>
            <span className="text-[#22C55E] font-bold">~$82.00/MO SAVINGS</span>
          </div>

          <div className="space-y-2.5">
            {suggestions.map((item) => {
              const ItemIcon = item.icon || HiOutlineSparkles;
              return (
                <div
                  key={item.id || item.title}
                  className="group/item flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#121A2F]/60 p-3 backdrop-blur-md transition-all duration-200 hover:border-[#5B8CFF]/30 hover:bg-[#121A2F]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform group-hover/item:scale-105',
                        item.iconBg || 'bg-[#5B8CFF]/10 text-[#5B8CFF]'
                      )}
                    >
                      <ItemIcon className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-xs font-bold text-white">
                          {item.title}
                        </p>
                        {item.badge && (
                          <span
                            className={cn(
                              'rounded-full border px-2 py-0.5 text-[9px] font-mono font-bold',
                              item.badgeColor || 'bg-[#5B8CFF]/10 text-[#5B8CFF] border-[#5B8CFF]/20'
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="truncate text-[11px] text-[#A1A8B5]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3 font-mono">
                    {item.savings && (
                      <span className="hidden text-xs font-bold text-[#22C55E] sm:inline-block">
                        {item.savings}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => onActionClick && onActionClick(item)}
                      className="flex items-center gap-1 rounded-lg border border-[#5B8CFF]/30 bg-[#5B8CFF]/10 px-3 py-1.5 text-xs font-bold text-[#5B8CFF] transition-all hover:bg-[#5B8CFF] hover:text-white"
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
