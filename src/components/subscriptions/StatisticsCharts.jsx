import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  HiOutlineChartBar,
  HiChartPie as HiOutlinePieChart,
  HiOutlineTrendingUp,
  HiOutlineCalendar,
  HiOutlineTag,
  HiOutlineCurrencyDollar,
  HiOutlineLightBulb,
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';

/**
 * 6-Month Subscription Spending Dataset.
 */
const defaultSpendingTrendData = [
  { month: 'Feb', spending: 185.5, budget: 210.0, recurring: 160.0, addOns: 25.5 },
  { month: 'Mar', spending: 210.0, budget: 210.0, recurring: 175.0, addOns: 35.0 },
  { month: 'Apr', spending: 195.0, budget: 220.0, recurring: 175.0, addOns: 20.0 },
  { month: 'May', spending: 235.8, budget: 220.0, recurring: 195.0, addOns: 40.8 },
  { month: 'Jun', spending: 215.0, budget: 225.0, recurring: 190.0, addOns: 25.0 },
  { month: 'Jul', spending: 226.46, budget: 225.0, recurring: 206.47, addOns: 19.99 },
];

/**
 * Category Breakdown Dataset for SubSense AI.
 */
const defaultCategoryData = [
  { name: 'Developer & Cloud', value: 94.5, color: '#3B82F6', icon: '💻' },
  { name: 'Design Tools', value: 69.99, color: '#8B5CF6', icon: '🎨' },
  { name: 'Entertainment', value: 36.98, color: '#EC4899', icon: '🍿' },
  { name: 'AI Services', value: 20.0, color: '#10B981', icon: '🤖' },
  { name: 'Productivity', value: 16.99, color: '#F59E0B', icon: '⚡' },
];

/**
 * Custom dark glassmorphism tooltip for Recharts Line/Area chart.
 */
const SpendingTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const spendVal = payload.find((p) => p.dataKey === 'spending')?.value || 0;
  const budgetVal = payload.find((p) => p.dataKey === 'budget')?.value || 0;
  const variance = budgetVal - spendVal;
  const isUnder = variance >= 0;

  return (
    <div className="rounded-xl border border-slate-700/80 bg-slate-900/95 p-3.5 shadow-2xl backdrop-blur-md">
      <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
        {label} 2026 Summary
      </p>
      <div className="mt-2.5 space-y-1.5 text-xs">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            <span className="font-medium text-text-secondary">Subscription Spend:</span>
          </div>
          <span className="font-bold text-text-primary">${spendVal.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="font-medium text-text-secondary">Monthly Budget:</span>
          </div>
          <span className="font-bold text-text-primary">${budgetVal.toFixed(2)}</span>
        </div>

        <div className="mt-2 border-t border-slate-800 pt-2 flex items-center justify-between gap-4">
          <span className="text-[11px] font-semibold text-text-muted">Budget Variance:</span>
          <span
            className={cn(
              'font-bold text-xs px-2 py-0.5 rounded-md border',
              isUnder
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
            )}
          >
            {isUnder ? `-$${variance.toFixed(2)} Under` : `+$${Math.abs(variance).toFixed(2)} Over`}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * Custom dark tooltip for Pie / Donut Chart.
 */
const CategoryTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0];

  return (
    <div className="rounded-xl border border-slate-700/80 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: data.payload.color || data.color }}
        />
        <span className="text-xs font-bold text-text-primary">
          {data.payload.icon} {data.name}
        </span>
      </div>
      <div className="mt-1.5 text-xs text-text-secondary">
        Amount: <strong className="text-text-primary">${Number(data.value).toFixed(2)}/mo</strong>
      </div>
    </div>
  );
};

/**
 * StatisticsCharts — Recharts visualizations component for SubSense AI.
 * Displays:
 * 1. Line / Area Chart for Monthly Subscription Spending trends over 6 months.
 * 2. Pie / Donut Chart for Category Distribution breakdown with interactive legends.
 * 3. Toggle controls for chart view (Area vs Line, Donut vs Pie, 3M/6M/1Y).
 */
const StatisticsCharts = ({
  trendData = defaultSpendingTrendData,
  categoryData = defaultCategoryData,
  className = '',
}) => {
  const [spendingView, setSpendingView] = useState('area'); // 'area' | 'line'
  const [categoryView, setCategoryView] = useState('donut'); // 'donut' | 'pie'
  const [timeRange, setTimeRange] = useState('6M'); // '3M' | '6M' | '1Y'
  const [showBudgetOverlay, setShowBudgetOverlay] = useState(true);

  // Filter spending data according to timeRange
  const filteredTrendData = useMemo(() => {
    if (timeRange === '3M') return trendData.slice(-3);
    return trendData;
  }, [trendData, timeRange]);

  // Aggregate stats calculations
  const totalCurrentMonthSpend = trendData[trendData.length - 1]?.spending || 0;
  const totalCategorySpend = useMemo(
    () => categoryData.reduce((sum, item) => sum + item.value, 0),
    [categoryData]
  );

  const topCategory = useMemo(() => {
    return [...categoryData].sort((a, b) => b.value - a.value)[0];
  }, [categoryData]);

  const avgMonthlySpend = useMemo(() => {
    const sum = filteredTrendData.reduce((acc, curr) => acc + curr.spending, 0);
    return sum / (filteredTrendData.length || 1);
  }, [filteredTrendData]);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Top Metrics Cards Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1: Current Monthly Spending */}
        <div className="group relative overflow-hidden rounded-2xl border border-glass-border bg-glass p-4 backdrop-blur-xl transition-all duration-300 hover:border-primary/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted">Total Monthly Spend</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <HiOutlineCurrencyDollar className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-text-primary">
            ${totalCurrentMonthSpend.toFixed(2)}
          </p>
          <p className="mt-1 text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <HiOutlineTrendingUp className="h-3 w-3" />
            <span>+5.3% from last month</span>
          </p>
        </div>

        {/* Metric 2: Average Monthly Cost */}
        <div className="group relative overflow-hidden rounded-2xl border border-glass-border bg-glass p-4 backdrop-blur-xl transition-all duration-300 hover:border-primary/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted">6-Mo Avg Monthly Spend</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <HiOutlineCalendar className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-text-primary">
            ${avgMonthlySpend.toFixed(2)}
          </p>
          <p className="mt-1 text-[11px] text-text-muted">Across 7 active subscriptions</p>
        </div>

        {/* Metric 3: Top Spending Category */}
        <div className="group relative overflow-hidden rounded-2xl border border-glass-border bg-glass p-4 backdrop-blur-xl transition-all duration-300 hover:border-primary/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted">Top Spending Category</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <HiOutlineTag className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-text-primary flex items-center gap-2">
            <span>{topCategory?.icon}</span>
            <span>{topCategory?.name.split(' ')[0]}</span>
          </p>
          <p className="mt-1 text-[11px] text-text-muted">
            ${topCategory?.value.toFixed(2)}/mo (
            {((topCategory?.value / totalCategorySpend) * 100).toFixed(0)}% of total)
          </p>
        </div>

        {/* Metric 4: AI Optimization Target */}
        <div className="group relative overflow-hidden rounded-2xl border border-glass-border bg-glass p-4 backdrop-blur-xl transition-all duration-300 hover:border-primary/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted">Potential AI Savings</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <HiOutlineLightBulb className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-400">$108.97/mo</p>
          <p className="mt-1 text-[11px] text-emerald-300/80 font-medium">
            4 AI recommendations ready
          </p>
        </div>
      </div>

      {/* Main Charts Grid: 1. Spending Trend Chart (Area/Line) & 2. Category Distribution (Donut/Pie) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Spending Trend Chart (Spans 2 Columns) */}
        <div className="group relative overflow-hidden rounded-2xl border border-glass-border bg-glass p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 lg:col-span-2">
          {/* Chart Header & Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-glass-border pb-5">
            <div>
              <div className="flex items-center gap-2">
                <HiOutlineChartBar className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-bold text-text-primary">
                  Monthly Subscription Spending Trend
                </h3>
              </div>
              <p className="mt-0.5 text-xs text-text-secondary">
                Historical 6-month expense progression & budget baseline
              </p>
            </div>

            {/* Interactive Toggle Controls */}
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

              {/* Chart View Toggle (Area vs Line) */}
              <div className="flex items-center rounded-xl border border-glass-border bg-surface/60 p-1">
                <button
                  type="button"
                  onClick={() => setSpendingView('area')}
                  className={cn(
                    'rounded-lg px-2.5 py-1 text-xs font-semibold transition-all',
                    spendingView === 'area'
                      ? 'bg-surface-light text-text-primary shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  Area
                </button>
                <button
                  type="button"
                  onClick={() => setSpendingView('line')}
                  className={cn(
                    'rounded-lg px-2.5 py-1 text-xs font-semibold transition-all',
                    spendingView === 'line'
                      ? 'bg-surface-light text-text-primary shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  Line
                </button>
              </div>

              {/* Toggle Budget Line */}
              <button
                type="button"
                onClick={() => setShowBudgetOverlay(!showBudgetOverlay)}
                className={cn(
                  'rounded-xl border px-2.5 py-1 text-xs font-semibold transition-all',
                  showBudgetOverlay
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                    : 'border-glass-border text-text-muted'
                )}
              >
                Budget Line
              </button>
            </div>
          </div>

          {/* Recharts Canvas */}
          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {spendingView === 'area' ? (
                <AreaChart
                  data={filteredTrendData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="gradientSpend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="gradientBudget" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" opacity={0.3} />
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
                  <Tooltip content={<SpendingTooltip />} />

                  {showBudgetOverlay && (
                    <Area
                      type="monotone"
                      dataKey="budget"
                      name="Budget Baseline"
                      stroke="#10B981"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      fillOpacity={1}
                      fill="url(#gradientBudget)"
                    />
                  )}

                  <Area
                    type="monotone"
                    dataKey="spending"
                    name="Actual Spending"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#gradientSpend)"
                  />
                </AreaChart>
              ) : (
                <LineChart
                  data={filteredTrendData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" opacity={0.3} />
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
                  <Tooltip content={<SpendingTooltip />} />

                  {showBudgetOverlay && (
                    <Line
                      type="monotone"
                      dataKey="budget"
                      stroke="#10B981"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={{ r: 4, fill: '#10B981' }}
                    />
                  )}

                  <Line
                    type="monotone"
                    dataKey="spending"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#3B82F6', strokeWidth: 2, stroke: '#0F172A' }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Donut / Pie Chart (1 Column) */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-glass-border bg-glass p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/40">
          {/* Header & Toggle */}
          <div>
            <div className="flex items-center justify-between border-b border-glass-border pb-4">
              <div className="flex items-center gap-2">
                <HiOutlinePieChart className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-bold text-text-primary">Category Distribution</h3>
              </div>

              {/* Donut vs Pie Toggle */}
              <div className="flex items-center rounded-xl border border-glass-border bg-surface/60 p-1">
                <button
                  type="button"
                  onClick={() => setCategoryView('donut')}
                  className={cn(
                    'rounded-lg px-2.5 py-1 text-xs font-semibold transition-all',
                    categoryView === 'donut'
                      ? 'bg-surface-light text-text-primary shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  Donut
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryView('pie')}
                  className={cn(
                    'rounded-lg px-2.5 py-1 text-xs font-semibold transition-all',
                    categoryView === 'pie'
                      ? 'bg-surface-light text-text-primary shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  Pie
                </button>
              </div>
            </div>

            {/* Donut Chart Canvas */}
            <div className="relative mt-4 h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CategoryTooltip />} />
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={categoryView === 'donut' ? 55 : 0}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="#0F172A"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center Donut Label */}
              {categoryView === 'donut' && (
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                    Total Spend
                  </span>
                  <span className="text-base font-extrabold text-text-primary">
                    ${totalCategorySpend.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Category Breakdown Legends List */}
          <div className="mt-4 space-y-2 border-t border-glass-border pt-4 text-xs">
            {categoryData.map((cat) => {
              const percentage = ((cat.value / totalCategorySpend) * 100).toFixed(1);
              return (
                <div
                  key={cat.name}
                  className="flex items-center justify-between rounded-lg px-2 py-1 transition-colors hover:bg-surface/50"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="font-medium text-text-primary flex items-center gap-1">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-text-primary">${cat.value.toFixed(2)}</span>
                    <span className="w-10 text-right font-medium text-text-muted text-[11px]">
                      {percentage}%
                    </span>
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

StatisticsCharts.propTypes = {
  trendData: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      spending: PropTypes.number.isRequired,
      budget: PropTypes.number,
      recurring: PropTypes.number,
      addOns: PropTypes.number,
    })
  ),
  categoryData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string,
      icon: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};

export default StatisticsCharts;
