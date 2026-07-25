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
import {
  HiOutlineCalendar,
  HiOutlineAdjustments,
  HiOutlineTrendingDown,
  HiOutlineTrendingUp,
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';

/**
 * 6-Month default monthly spending dataset.
 */
const defaultMonthlyData = [
  { month: 'Jan', actual: 2150, target: 2400, savings: 250 },
  { month: 'Feb', actual: 2380, target: 2400, savings: 20 },
  { month: 'Mar', actual: 1980, target: 2300, savings: 320 },
  { month: 'Apr', actual: 2520, target: 2300, savings: -220 },
  { month: 'May', actual: 2100, target: 2250, savings: 150 },
  { month: 'Jun', actual: 1890, target: 2200, savings: 310 },
];

/**
 * Custom dark glassmorphism tooltip for Recharts.
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const actualVal = payload.find((p) => p.dataKey === 'actual')?.value || 0;
  const targetVal = payload.find((p) => p.dataKey === 'target')?.value || 0;
  const variance = targetVal - actualVal;
  const isUnderBudget = variance >= 0;

  return (
    <div className="rounded-xl border border-slate-700/80 bg-slate-900/95 p-3.5 shadow-2xl backdrop-blur-md">
      <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
        {label} Overview
      </p>
      <div className="mt-2.5 space-y-1.5 text-xs">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            <span className="font-medium text-text-secondary">Actual Spend:</span>
          </div>
          <span className="font-bold text-text-primary">
            ${actualVal.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="font-medium text-text-secondary">Budget Target:</span>
          </div>
          <span className="font-bold text-text-primary">
            ${targetVal.toLocaleString()}
          </span>
        </div>

        <div className="mt-2 border-t border-slate-800 pt-2 flex items-center justify-between gap-4">
          <span className="text-[11px] font-semibold text-text-muted">Variance:</span>
          <span
            className={cn(
              'font-bold text-xs px-2 py-0.5 rounded-md border',
              isUnderBudget
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
            )}
          >
            {isUnderBudget ? `-$${variance} Under` : `+$${Math.abs(variance)} Over`}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * ExpenseChart — Recharts Area / Line Chart component for SubSense AI dashboard.
 * Displays Monthly Spending (Actual vs Target) over 6 months with gradient area fills,
 * smooth monotone curves, custom dark glass tooltip, and view toggle controls.
 */
const ExpenseChart = ({
  data = defaultMonthlyData,
  title = 'Monthly Spending Overview',
  subtitle = 'Actual expenses vs budget target over 6 months',
  className = '',
}) => {
  const [chartType, setChartType] = useState('area'); // 'area' | 'line'
  const [timeRange, setTimeRange] = useState('6M'); // '3M' | '6M' | '1Y'
  const [showActual, setShowActual] = useState(true);
  const [showTarget, setShowTarget] = useState(true);

  // Filter data based on timeRange toggle
  const filteredData = React.useMemo(() => {
    if (timeRange === '3M') return data.slice(-3);
    return data;
  }, [data, timeRange]);

  // Aggregate stats
  const totalActual = filteredData.reduce((acc, curr) => acc + curr.actual, 0);
  const totalTarget = filteredData.reduce((acc, curr) => acc + curr.target, 0);
  const avgMonthly = Math.round(totalActual / (filteredData.length || 1));
  const netVariance = totalTarget - totalActual;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-glass-border bg-glass p-6 backdrop-blur-xl transition-all duration-300',
        'hover:border-primary/40 hover:shadow-glow',
        className
      )}
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

      {/* Top Header & Interactive Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-glass-border pb-5">
        <div>
          <h3 className="text-lg font-bold text-text-primary">{title}</h3>
          <p className="mt-0.5 text-xs text-text-secondary">{subtitle}</p>
        </div>

        {/* Control Toggles */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Time Range Selector */}
          <div className="flex items-center rounded-xl border border-glass-border bg-surface/60 p-1">
            {['3M', '6M', '1Y'].map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={cn(
                  'rounded-lg px-2.5 py-1 text-xs font-semibold transition-all',
                  timeRange === range
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Chart View Mode Toggle */}
          <div className="flex items-center rounded-xl border border-glass-border bg-surface/60 p-1">
            <button
              type="button"
              onClick={() => setChartType('area')}
              className={cn(
                'rounded-lg px-2.5 py-1 text-xs font-semibold transition-all',
                chartType === 'area'
                  ? 'bg-surface-light text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              Area
            </button>
            <button
              type="button"
              onClick={() => setChartType('line')}
              className={cn(
                'rounded-lg px-2.5 py-1 text-xs font-semibold transition-all',
                chartType === 'line'
                  ? 'bg-surface-light text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              Line
            </button>
          </div>
        </div>
      </div>

      {/* Series Toggle Legends */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setShowActual(!showActual)}
            className={cn(
              'flex items-center gap-2 rounded-lg border px-3 py-1.5 transition-all',
              showActual
                ? 'border-blue-500/40 bg-blue-500/10 text-blue-400'
                : 'border-glass-border bg-transparent text-text-muted opacity-50'
            )}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            <span>Actual Spend</span>
          </button>

          <button
            type="button"
            onClick={() => setShowTarget(!showTarget)}
            className={cn(
              'flex items-center gap-2 rounded-lg border px-3 py-1.5 transition-all',
              showTarget
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                : 'border-glass-border bg-transparent text-text-muted opacity-50'
            )}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span>Target Budget</span>
          </button>
        </div>

        <div className="text-xs text-text-secondary">
          Avg Monthly: <span className="font-bold text-text-primary">${avgMonthly.toLocaleString()}</span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradientActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="gradientTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#334155" strokeDasharray="3 3" opacity={0.4} />
              <XAxis
                dataKey="month"
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#334155' }}
              />
              <YAxis
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#334155' }}
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip content={<CustomTooltip />} />

              {showTarget && (
                <Area
                  type="monotone"
                  dataKey="target"
                  name="Target Budget"
                  stroke="#10B981"
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
                  stroke="#3B82F6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#gradientActual)"
                />
              )}
            </AreaChart>
          ) : (
            <LineChart
              data={filteredData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid stroke="#334155" strokeDasharray="3 3" opacity={0.4} />
              <XAxis
                dataKey="month"
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#334155' }}
              />
              <YAxis
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#334155' }}
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip content={<CustomTooltip />} />

              {showTarget && (
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#10B981"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 4, fill: '#10B981' }}
                />
              )}

              {showActual && (
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#3B82F6', strokeWidth: 2, stroke: '#1E293B' }}
                />
              )}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Summary Footer */}
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-glass-border pt-4 text-center">
        <div>
          <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
            Total Spent
          </p>
          <p className="mt-1 text-sm font-bold text-text-primary sm:text-base">
            ${totalActual.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
            Total Budget
          </p>
          <p className="mt-1 text-sm font-bold text-text-primary sm:text-base">
            ${totalTarget.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
            Net Savings
          </p>
          <p
            className={cn(
              'mt-1 text-sm font-bold sm:text-base',
              netVariance >= 0 ? 'text-emerald-400' : 'text-rose-400'
            )}
          >
            {netVariance >= 0 ? `+$${netVariance}` : `-$${Math.abs(netVariance)}`}
          </p>
        </div>
      </div>
    </div>
  );
};

ExpenseChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      actual: PropTypes.number.isRequired,
      target: PropTypes.number.isRequired,
      savings: PropTypes.number,
    })
  ),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string,
};

export default ExpenseChart;
