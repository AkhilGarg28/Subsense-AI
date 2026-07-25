import React from 'react';
import PropTypes from 'prop-types';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import {
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineSparkles,
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';

/**
 * Default mock sparkline data used when no custom data is provided.
 */
const defaultSparkline = [
  { value: 40 },
  { value: 65 },
  { value: 55 },
  { value: 80 },
  { value: 70 },
  { value: 95 },
  { value: 85 },
];

/**
 * StatCard — Analytics stat card component for the SubSense AI dashboard.
 * Displays primary metric value, title, icon badge, trend percentage with direction indicator,
 * a mini Recharts area sparkline, and glassmorphism hover glow effects.
 */
const StatCard = ({
  title = 'Total Spend',
  value = '$2,450.00',
  icon: Icon = HiOutlineSparkles,
  trend = '+12.4%',
  trendDirection,
  isPositiveGood = true,
  sparklineData = defaultSparkline,
  sparklineColor = '#3B82F6',
  badgeText = 'vs last month',
  description,
  className = '',
  iconBgColor = 'bg-primary/10 text-primary',
}) => {
  // Determine if trend is up or down based on explicit prop or trend string
  const isUp = trendDirection
    ? trendDirection === 'up'
    : String(trend).startsWith('+') || !String(trend).startsWith('-');

  // Determine sentiment color (green for good, red for warning/negative)
  const isGood = isPositiveGood ? isUp : !isUp;
  const trendBg = isGood
    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    : 'bg-rose-500/10 text-rose-400 border-rose-500/20';

  const TrendIcon = isUp ? HiOutlineTrendingUp : HiOutlineTrendingDown;

  // Format data for Recharts if simple number array was passed
  const formattedSparkline = Array.isArray(sparklineData)
    ? sparklineData.map((item, index) =>
        typeof item === 'number' ? { value: item, id: index } : item
      )
    : defaultSparkline;

  // Generate unique gradient ID for SVG sparkline
  const gradientId = `sparkline-gradient-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-glass-border bg-glass p-5 backdrop-blur-xl transition-all duration-300',
        'hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow',
        className
      )}
    >
      {/* Background Subtle Hover Glow Accent */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
        style={{ backgroundColor: sparklineColor }}
      />

      {/* Card Header: Icon & Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon && (
            <div
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110',
                iconBgColor
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
          )}
          <div>
            <h4 className="text-sm font-medium text-text-secondary">{title}</h4>
            {description && (
              <p className="text-xs text-text-muted">{description}</p>
            )}
          </div>
        </div>

        {/* Trend Indicator Pill */}
        {trend && (
          <div
            className={cn(
              'flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-md',
              trendBg
            )}
          >
            <TrendIcon className="h-3.5 w-3.5" />
            <span>{trend}</span>
          </div>
        )}
      </div>

      {/* Main Metric Value & Sub-badge */}
      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
            {value}
          </span>
          {badgeText && (
            <span className="ml-2 text-xs font-medium text-text-muted">
              {badgeText}
            </span>
          )}
        </div>
      </div>

      {/* Mini Area Sparkline Chart */}
      <div className="mt-4 h-12 w-full overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedSparkline}
            margin={{ top: 2, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={sparklineColor} stopOpacity={0.4} />
                <stop offset="100%" stopColor={sparklineColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={sparklineColor}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#${gradientId})`}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.elementType,
  trend: PropTypes.string,
  trendDirection: PropTypes.oneOf(['up', 'down']),
  isPositiveGood: PropTypes.bool,
  sparklineData: PropTypes.array,
  sparklineColor: PropTypes.string,
  badgeText: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  iconBgColor: PropTypes.string,
};

export default StatCard;
