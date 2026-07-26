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
  sparklineColor = '#C2A155',
  badgeText = 'vs last month',
  description,
  className = '',
}) => {
  const isUp = trendDirection
    ? trendDirection === 'up'
    : String(trend).startsWith('+') || !String(trend).startsWith('-');

  const isGood = isPositiveGood ? isUp : !isUp;
  const trendBg = isGood
    ? 'bg-[#3FA972]/15 text-[#3FA972] border-[#3FA972]/30'
    : 'bg-[#D65C4F]/15 text-[#D65C4F] border-[#D65C4F]/30';

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
        'group relative overflow-hidden rounded-xl border border-[#F3F1EA]/10 bg-[#171A18] p-5 shadow-2xl transition-all duration-200 hover:border-[#C2A155]/40',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="flex h-9 w-9 items-center justify-center rounded bg-[#0D0F0E] text-[#C2A155] border border-[#F3F1EA]/10">
              <Icon className="h-5 w-5" />
            </div>
          )}
          <div>
            <h4 className="text-xs font-mono text-[#96988F] uppercase tracking-wider">{title}</h4>
            {description && (
              <p className="text-[11px] text-[#96988F]">{description}</p>
            )}
          </div>
        </div>

        {trend && (
          <div className={cn('flex items-center gap-1 rounded px-2 py-0.5 text-xs font-mono font-bold border', trendBg)}>
            <TrendIcon className="h-3.5 w-3.5" />
            <span>{trend}</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-mono font-bold tracking-tight text-[#F3F1EA] sm:text-3xl">
            {value}
          </span>
          {badgeText && (
            <span className="ml-2 text-xs font-mono text-[#96988F]">
              {badgeText}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 h-10 w-full overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedSparkline} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={sparklineColor} stopOpacity={0.3} />
                <stop offset="100%" stopColor={sparklineColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={sparklineColor}
              strokeWidth={1.5}
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
