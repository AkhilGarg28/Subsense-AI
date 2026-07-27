import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cn, formatCurrency } from '../../utils/helpers';

/**
 * Default monthly spending dataset (in INR ₹).
 */
const defaultMonthlyData = [
  { month: 'Feb', actual: 24500, target: 28000, savings: 3500 },
  { month: 'Mar', actual: 28900, target: 30000, savings: 1100 },
  { month: 'Apr', actual: 31200, target: 33000, savings: 1800 },
  { month: 'May', actual: 33400, target: 35000, savings: 1600 },
  { month: 'Jun', actual: 35800, target: 37000, savings: 1200 },
  { month: 'Jul', actual: 37618, target: 40000, savings: 2382 },
];

/**
 * Custom dark glassmorphism tooltip for Recharts (in INR ₹).
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const actualVal = payload.find((p) => p.dataKey === 'actual')?.value || payload[0]?.value || 0;
  const targetVal = payload.find((p) => p.dataKey === 'target')?.value || Math.round(actualVal * 1.1);
  const variance = targetVal - actualVal;
  const isUnderBudget = variance >= 0;

  return (
    <div className="rounded-xl border border-slate-700/80 bg-[#121A2F]/95 p-3.5 shadow-2xl backdrop-blur-md font-mono text-xs">
      <p className="text-xs font-bold uppercase tracking-wider text-[#A1A8B5]">
        {label} Overview
      </p>
      <div className="mt-2.5 space-y-1.5 text-xs">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#5B8CFF]" />
            <span className="font-medium text-text-secondary">Actual Spend:</span>
          </div>
          <span className="font-bold text-white">
            {formatCurrency(actualVal)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
            <span className="font-medium text-text-secondary">Budget Target:</span>
          </div>
          <span className="font-bold text-white">
            {formatCurrency(targetVal)}
          </span>
        </div>

        <div className="mt-2 border-t border-white/10 pt-2 flex items-center justify-between gap-4">
          <span className="text-[11px] font-semibold text-[#A1A8B5]">Variance:</span>
          <span
            className={cn(
              'font-bold text-xs px-2 py-0.5 rounded-md border',
              isUnderBudget
                ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20'
                : 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20'
            )}
          >
            {isUnderBudget ? `${formatCurrency(variance)} Under` : `${formatCurrency(Math.abs(variance))} Over`}
          </span>
        </div>
      </div>
    </div>
  );
};

const ExpenseChart = ({
  data = defaultMonthlyData,
  title = 'Monthly Spending Overview',
  subtitle = 'Actual recurring expenses vs budget target over time',
  timeFilter = '6M',
  onTimeFilterChange,
  className = '',
}) => {
  const [chartType, setChartType] = useState('area'); // 'area' | 'line'
  const [timeRange, setTimeRange] = useState('6M');
  const [showActual, setShowActual] = useState(true);
  const [showTarget, setShowTarget] = useState(true);

  const activeRange = timeFilter && timeFilter !== 'This Month' ? (timeFilter === 'Quarter' ? '3M' : '1Y') : timeRange;

  // Normalize data elements so they support actual/amount properties
  const normalizedData = React.useMemo(() => {
    const sourceData = data && data.length > 0 ? data : defaultMonthlyData;
    return sourceData.map((item) => {
      const actual = item.actual !== undefined ? item.actual : (item.amount || item.value || 0);
      const target = item.target !== undefined ? item.target : Math.round(actual * 1.1);
      return {
        month: item.month || 'Period',
        actual,
        target,
        savings: target - actual,
      };
    });
  }, [data]);

  // Filter data based on timeRange toggle
  const filteredData = React.useMemo(() => {
    if (activeRange === '3M') return normalizedData.slice(-3);
    return normalizedData;
  }, [normalizedData, activeRange]);

  // Aggregate stats
  const totalActual = filteredData.reduce((acc, curr) => acc + curr.actual, 0);
  const totalTarget = filteredData.reduce((acc, curr) => acc + curr.target, 0);
  const avgMonthly = Math.round(totalActual / (filteredData.length || 1));
  const netVariance = totalTarget - totalActual;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-[20px] border border-white/10 bg-[#171F2F]/80 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300',
        'hover:border-[#5B8CFF]/40 hover:shadow-glow-blue',
        className
      )}
    >
      <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[#5B8CFF]/10 blur-3xl" />

      {/* Top Header & Interactive Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
          <p className="mt-0.5 text-xs text-[#A1A8B5]">{subtitle}</p>
        </div>

        {/* Control Toggles */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Time Range Selector */}
          <div className="flex items-center rounded-xl border border-white/10 bg-[#121A2F] p-1 font-mono text-xs">
            {['3M', '6M', '1Y'].map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => {
                  setTimeRange(range);
                  if (onTimeFilterChange) {
                    onTimeFilterChange(range === '3M' ? 'Quarter' : range === '1Y' ? 'Year' : 'This Month');
                  }
                }}
                className={cn(
                  'rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer',
                  activeRange === range
                    ? 'bg-[#5B8CFF] text-white shadow-glow-blue'
                    : 'text-[#A1A8B5] hover:text-white'
                )}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Chart View Mode Toggle */}
          <div className="flex items-center rounded-xl border border-white/10 bg-[#121A2F] p-1 font-mono text-xs">
            <button
              type="button"
              onClick={() => setChartType('area')}
              className={cn(
                'rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer',
                chartType === 'area'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-[#A1A8B5] hover:text-white'
              )}
            >
              Area
            </button>
            <button
              type="button"
              onClick={() => setChartType('line')}
              className={cn(
                'rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer',
                chartType === 'line'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-[#A1A8B5] hover:text-white'
              )}
            >
              Line
            </button>
          </div>
        </div>
      </div>

      {/* Series Toggle Legends */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-4 font-bold">
          <button
            type="button"
            onClick={() => setShowActual(!showActual)}
            className={cn(
              'flex items-center gap-2 rounded-lg border px-3 py-1.5 transition-all cursor-pointer',
              showActual
                ? 'border-[#5B8CFF]/40 bg-[#5B8CFF]/15 text-[#5B8CFF]'
                : 'border-white/10 bg-transparent text-[#64748B] opacity-50'
            )}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#5B8CFF]" />
            <span>Actual Spend</span>
          </button>

          <button
            type="button"
            onClick={() => setShowTarget(!showTarget)}
            className={cn(
              'flex items-center gap-2 rounded-lg border px-3 py-1.5 transition-all cursor-pointer',
              showTarget
                ? 'border-[#22C55E]/40 bg-[#22C55E]/15 text-[#22C55E]'
                : 'border-white/10 bg-transparent text-[#64748B] opacity-50'
            )}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
            <span>Budget Target</span>
          </button>
        </div>

        <div className="text-xs text-[#A1A8B5]">
          Avg Monthly: <span className="font-bold text-white">{formatCurrency(avgMonthly)}</span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradientActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5B8CFF" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#5B8CFF" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="gradientTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" opacity={0.6} />
              <XAxis
                dataKey="month"
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#1E293B' }}
              />
              <YAxis
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#1E293B' }}
                tickFormatter={(val) => `₹${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
              />
              <Tooltip content={<CustomTooltip />} />

              {showTarget && (
                <Area
                  type="monotone"
                  dataKey="target"
                  name="Budget Target"
                  stroke="#22C55E"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#gradientTarget)"
                />
              )}

              {showActual && (
                <Area
                  type="monotone"
                  dataKey="actual"
                  name="Actual Spend"
                  stroke="#5B8CFF"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#gradientActual)"
                />
              )}
            </AreaChart>
          ) : (
            <LineChart
              data={filteredData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" opacity={0.6} />
              <XAxis
                dataKey="month"
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#1E293B' }}
              />
              <YAxis
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#1E293B' }}
                tickFormatter={(val) => `₹${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
              />
              <Tooltip content={<CustomTooltip />} />

              {showTarget && (
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#22C55E"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 4, fill: '#22C55E' }}
                />
              )}

              {showActual && (
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#5B8CFF"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#5B8CFF', strokeWidth: 2, stroke: '#121A2F' }}
                />
              )}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Summary Footer */}
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-4 text-center font-mono">
        <div>
          <p className="text-[11px] font-bold text-[#A1A8B5] uppercase tracking-wider">
            Total Spent
          </p>
          <p className="mt-1 text-sm font-extrabold text-white sm:text-base">
            {formatCurrency(totalActual)}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-bold text-[#A1A8B5] uppercase tracking-wider">
            Total Budget
          </p>
          <p className="mt-1 text-sm font-extrabold text-white sm:text-base">
            {formatCurrency(totalTarget)}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-bold text-[#A1A8B5] uppercase tracking-wider">
            Net Savings
          </p>
          <p
            className={cn(
              'mt-1 text-sm font-extrabold sm:text-base',
              netVariance >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'
            )}
          >
            {netVariance >= 0 ? `+${formatCurrency(netVariance)}` : `-${formatCurrency(Math.abs(netVariance))}`}
          </p>
        </div>
      </div>
    </div>
  );
};

ExpenseChart.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  timeFilter: PropTypes.string,
  onTimeFilterChange: PropTypes.func,
  className: PropTypes.string,
};

export default ExpenseChart;
