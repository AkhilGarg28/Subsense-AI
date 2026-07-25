import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import { HiOutlineChartPie, HiOutlineTag } from 'react-icons/hi';
import { cn } from '../../utils/helpers';

/**
 * Default categories spending dataset.
 */
const defaultCategories = [
  { name: 'Food & Dining', value: 850, color: '#3B82F6', icon: '🍔' },
  { name: 'Utilities & Bills', value: 610, color: '#10B981', icon: '⚡' },
  { name: 'Shopping', value: 540, color: '#F59E0B', icon: '🛍️' },
  { name: 'Entertainment', value: 420, color: '#8B5CF6', icon: '🎬' },
  { name: 'Travel & Transport', value: 380, color: '#EC4899', icon: '✈️' },
  { name: 'Subscriptions', value: 290, color: '#06B6D4', icon: '🔄' },
];

/**
 * Active sector renderer for hover highlight effect on Recharts Pie slice.
 */
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: `drop-shadow(0 0 10px ${fill}80)` }}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 14}
        fill={fill}
      />
    </g>
  );
};

/**
 * Custom dark glassmorphism tooltip for Recharts Pie.
 */
const CustomPieTooltip = ({ active, payload, total }) => {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0].payload;
  const percent = ((item.value / (total || 1)) * 100).toFixed(1);

  return (
    <div className="rounded-xl border border-slate-700/80 bg-slate-900/95 p-3.5 shadow-2xl backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="text-lg">{item.icon || '🏷️'}</span>
        <span className="text-xs font-bold text-text-primary">{item.name}</span>
      </div>
      <div className="mt-2 flex items-center justify-between gap-4 text-xs">
        <span className="font-semibold text-text-secondary">Amount:</span>
        <span className="font-bold text-text-primary">${item.value.toLocaleString()}</span>
      </div>
      <div className="mt-1 flex items-center justify-between gap-4 text-xs">
        <span className="font-semibold text-text-secondary">Share of Total:</span>
        <span className="font-bold text-emerald-400">{percent}%</span>
      </div>
    </div>
  );
};

/**
 * CategoryChart — Recharts Pie/Donut Chart component for SubSense AI dashboard.
 * Displays spending categories (Food, Entertainment, Utilities, Shopping, Travel, Subscriptions)
 * with hover highlights, active slice expansion, center donut total readout, and custom percentage legend.
 */
const CategoryChart = ({
  data = defaultCategories,
  title = 'Category Breakdown',
  subtitle = 'Expenses distributed across major categories',
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const totalSpending = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.value, 0);
  }, [data]);

  const activeCategory = activeIndex !== null && data[activeIndex] ? data[activeIndex] : null;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-glass-border bg-glass p-6 backdrop-blur-xl transition-all duration-300',
        'hover:border-primary/40 hover:shadow-glow',
        className
      )}
    >
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />

      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-glass-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <HiOutlineChartPie className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-bold text-text-primary">{title}</h3>
          </div>
          <p className="mt-0.5 text-xs text-text-secondary">{subtitle}</p>
        </div>

        <div className="rounded-full border border-glass-border bg-surface/60 px-3 py-1 text-xs font-semibold text-text-secondary">
          Total: <span className="text-text-primary font-bold">${totalSpending.toLocaleString()}</span>
        </div>
      </div>

      {/* Main Grid: Left Donut Chart, Right Interactive Legend */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        {/* Donut Chart Container */}
        <div className="relative flex items-center justify-center lg:col-span-6">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activeIndex !== null ? activeIndex : undefined}
                  activeShape={renderActiveShape}
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="rgba(15, 23, 42, 0.6)"
                      strokeWidth={2}
                      className="transition-all duration-200 cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip total={totalSpending} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Center Donut Text Readout */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            {activeCategory ? (
              <>
                <span className="text-xl">{activeCategory.icon || '🏷️'}</span>
                <span className="mt-0.5 text-base font-extrabold text-text-primary">
                  ${activeCategory.value.toLocaleString()}
                </span>
                <span className="text-[10px] font-semibold text-text-muted">
                  {((activeCategory.value / totalSpending) * 100).toFixed(1)}% Share
                </span>
              </>
            ) : (
              <>
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Total Spend
                </span>
                <span className="text-xl font-black text-text-primary tracking-tight">
                  ${totalSpending.toLocaleString()}
                </span>
                <span className="text-[10px] font-semibold text-purple-400">
                  {data.length} Categories
                </span>
              </>
            )}
          </div>
        </div>

        {/* Custom Legend & Category Breakdown List */}
        <div className="space-y-2.5 lg:col-span-6">
          {data.map((item, index) => {
            const percentage = ((item.value / totalSpending) * 100).toFixed(1);
            const isHovered = activeIndex === index;

            return (
              <div
                key={item.name}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                className={cn(
                  'group/item flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-glass-border p-2.5 backdrop-blur-md transition-all duration-200',
                  isHovered
                    ? 'border-primary/50 bg-surface/80 shadow-md translate-x-1'
                    : 'bg-surface/30 hover:bg-surface/50'
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-sm">{item.icon || '🏷️'}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <p className="truncate text-xs font-bold text-text-primary">
                        {item.name}
                      </p>
                    </div>

                    {/* Mini Progress Bar */}
                    <div className="mt-1 h-1 w-24 overflow-hidden rounded-full bg-surface-light">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-extrabold text-text-primary">
                    ${item.value.toLocaleString()}
                  </p>
                  <p className="text-[10px] font-semibold text-text-muted">
                    {percentage}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

CategoryChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      icon: PropTypes.string,
    })
  ),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string,
};

export default CategoryChart;
