import React from 'react';
import PropTypes from 'prop-types';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import {
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineSparkles,
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';

const defaultSparkline = [
  { value: 40 },
  { value: 65 },
  { value: 55 },
  { value: 80 },
  { value: 70 },
  { value: 95 },
  { value: 85 },
];

const StatCard = ({
  title = 'Total Spend',
  value = '$2,450.00',
  icon: Icon = HiOutlineSparkles,
  trend = '+12.4%',
  trendDirection,
  isPositiveGood = true,
  sparklineData = defaultSparkline,
  sparklineColor = '#5B8CFF',
  badgeText = 'vs last month',
  description,
  className = '',
  iconBgColor = 'bg-[#5B8CFF]/15 text-[#5B8CFF]',
}) => {
  const isUp = trendDirection
    ? trendDirection === 'up'
    : String(trend).startsWith('+') || !String(trend).startsWith('-');

  const isGood = isPositiveGood ? isUp : !isUp;
  const trendBg = isGood
    ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20'
    : 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20';

  const TrendIcon = isUp ? HiOutlineTrendingUp : HiOutlineTrendingDown;

  const formattedSparkline = Array.isArray(sparklineData)
    ? sparklineData.map((item, index) =>
        typeof item === 'number' ? { value: item, id: index } : item
      )
    : defaultSparkline;

  const gradientId = `sparkline-gradient-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-[20px] border border-white/10 bg-[#171F2F]/80 p-7 sm:p-8 backdrop-blur-xl transition-all duration-300',
        'hover:-translate-y-1 hover:border-[#5B8CFF]/40 hover:shadow-glow-blue',
        className
      )}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
        style={{ backgroundColor: sparklineColor }}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          {Icon && (
            <div
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 shadow-md',
                iconBgColor
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
          )}
          <div>
            <h4 className="text-base font-bold text-white">{title}</h4>
            {description && (
              <p className="text-xs text-[#64748B]">{description}</p>
            )}
          </div>
        </div>

        {trend && (
          <div
            className={cn(
              'flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-mono font-bold backdrop-blur-md',
              trendBg
            )}
          >
            <TrendIcon className="h-3.5 w-3.5" />
            <span>{trend}</span>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-baseline justify-between font-mono">
        <div>
          <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {value}
          </span>
          {badgeText && (
            <span className="ml-2 text-xs font-semibold text-[#A1A8B5]">
              {badgeText}
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 h-14 w-full overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedSparkline} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
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
              strokeWidth={2.5}
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
