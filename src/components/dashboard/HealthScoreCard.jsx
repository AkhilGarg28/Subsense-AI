import React from 'react';
import PropTypes from 'prop-types';
import {
  HiOutlineSparkles,
  HiOutlineFilm,
  HiOutlineTrash,
  HiOutlineRefresh,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';

/**
 * Default AI recommendations list if none provided as props.
 */
const defaultSuggestions = [
  {
    id: 'sug-1',
    icon: HiOutlineFilm,
    title: 'Reduce entertainment expenses',
    description: 'Streaming & entertainment spend is 24% above target budget.',
    savings: 'Save ~$45/mo',
    badge: 'High Impact',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    iconBg: 'bg-indigo-500/15 text-indigo-400',
    actionText: 'Optimize',
  },
  {
    id: 'sug-2',
    icon: HiOutlineTrash,
    title: 'Cancel unused Canva subscription',
    description: 'No active usage detected across connected accounts for 60+ days.',
    savings: 'Save $12.99/mo',
    badge: 'Unused Sub',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    iconBg: 'bg-rose-500/15 text-rose-400',
    actionText: 'Cancel',
  },
  {
    id: 'sug-3',
    icon: HiOutlineRefresh,
    title: 'Switch Spotify to annual plan',
    description: 'Switching from monthly to annual billing saves 16% annually.',
    savings: 'Save $24.00/yr',
    badge: 'Quick Win',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    iconBg: 'bg-emerald-500/15 text-emerald-400',
    actionText: 'Switch',
  },
];

/**
 * HealthScoreCard — Financial Health Score component for SubSense AI.
 * Displays a large circular SVG progress score indicator (89/100), status badge ("Healthy Spending"),
 * and a curated list of actionable AI suggestions with icons and savings estimates.
 */
const HealthScoreCard = ({
  score = 89,
  maxScore = 100,
  statusBadge = 'Healthy Spending',
  title = 'Financial Health Score',
  subtitle = 'AI-powered real-time spending assessment',
  suggestions = defaultSuggestions,
  onActionClick,
  className = '',
}) => {
  // Circular Gauge Calculations
  const radius = 64;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / maxScore) * circumference;

  // Rating label & color mapping based on score
  const getScoreRating = (val) => {
    if (val >= 85) return { label: 'Optimal', color: 'from-emerald-400 to-teal-500', statusColor: 'bg-emerald-500' };
    if (val >= 70) return { label: 'Good', color: 'from-blue-400 to-indigo-500', statusColor: 'bg-blue-500' };
    if (val >= 50) return { label: 'Fair', color: 'from-amber-400 to-orange-500', statusColor: 'bg-amber-500' };
    return { label: 'Attention Needed', color: 'from-rose-400 to-red-500', statusColor: 'bg-rose-500' };
  };

  const rating = getScoreRating(score);

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-glass-border bg-glass p-6 backdrop-blur-xl transition-all duration-300',
        'hover:border-primary/40 hover:shadow-glow',
        className
      )}
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-glass-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <HiOutlineShieldCheck className="h-5 w-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-text-primary">{title}</h3>
          </div>
          <p className="mt-1 text-xs text-text-secondary">{subtitle}</p>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold text-emerald-400">
            {statusBadge}
          </span>
        </div>
      </div>

      {/* Main Content Layout: Left Gauge, Right Recommendations */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        {/* Left Column: SVG Circular Score Indicator */}
        <div className="flex flex-col items-center justify-center lg:col-span-4">
          <div className="relative flex items-center justify-center">
            <svg
              height={radius * 2}
              width={radius * 2}
              className="-rotate-90 transform overflow-visible"
            >
              <defs>
                <linearGradient id="healthScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="50%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>

              {/* Background Track Circle */}
              <circle
                stroke="rgba(255, 255, 255, 0.08)"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />

              {/* Score Progress Ring */}
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

            {/* Inner Center Labels */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-text-primary tracking-tight">
                {score}
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-text-muted uppercase">
                / {maxScore} Points
              </span>
            </div>
          </div>

          <div className="mt-3 text-center">
            <span className="inline-block rounded-md bg-surface-light/60 px-2.5 py-0.5 text-xs font-semibold text-text-secondary">
              Rating: <span className="text-emerald-400">{rating.label}</span>
            </span>
          </div>
        </div>

        {/* Right Column: Actionable AI Suggestions List */}
        <div className="space-y-3 lg:col-span-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <HiOutlineSparkles className="h-4 w-4 text-primary" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Actionable AI Insights ({suggestions.length})
              </h4>
            </div>
            <span className="text-xs text-emerald-400 font-medium">
              Potential Savings: ~$82/mo
            </span>
          </div>

          <div className="space-y-2.5">
            {suggestions.map((item) => {
              const ItemIcon = item.icon || HiOutlineSparkles;
              return (
                <div
                  key={item.id || item.title}
                  className="group/item flex items-center justify-between gap-3 rounded-xl border border-glass-border bg-surface/40 p-3 backdrop-blur-md transition-all duration-200 hover:border-primary/30 hover:bg-surface/70"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform group-hover/item:scale-105',
                        item.iconBg || 'bg-primary/10 text-primary'
                      )}
                    >
                      <ItemIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="truncate text-sm font-semibold text-text-primary">
                          {item.title}
                        </p>
                        {item.badge && (
                          <span
                            className={cn(
                              'rounded-full border px-2 py-0.5 text-[10px] font-semibold',
                              item.badgeColor || 'bg-primary/10 text-primary border-primary/20'
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="truncate text-xs text-text-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    {item.savings && (
                      <span className="hidden text-xs font-bold text-emerald-400 sm:inline-block">
                        {item.savings}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => onActionClick && onActionClick(item)}
                      className="flex items-center gap-1 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-white"
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
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.elementType,
      title: PropTypes.string,
      description: PropTypes.string,
      savings: PropTypes.string,
      badge: PropTypes.string,
      badgeColor: PropTypes.string,
      iconBg: PropTypes.string,
      actionText: PropTypes.string,
    })
  ),
  onActionClick: PropTypes.func,
  className: PropTypes.string,
};

export default HealthScoreCard;
