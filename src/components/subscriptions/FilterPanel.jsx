import React from 'react';
import PropTypes from 'prop-types';
import {
  FiFilter,
  FiSliders,
  FiGrid,
  FiList,
  FiCheckCircle,
  FiPauseCircle,
  FiSlash,
  FiLayers,
  FiDollarSign,
} from 'react-icons/fi';
import { cn } from '../../utils/helpers';

/**
 * FilterPanel — SubSense AI Filter & Controls Panel Component
 * Provides interactive controls for:
 * 1. Status filter pills (All, Active, Paused, Cancelled)
 * 2. Category dropdown (All, Entertainment, Music, Productivity, Education, Finance, Shopping)
 * 3. Sort dropdown (Highest Cost, Lowest Cost, Renewal Date, Alphabetical)
 * 4. View mode toggle (Grid Cards View vs Table List View)
 * 5. Optional Currency Toggle (USD / INR)
 */
const DEFAULT_CATEGORIES = [
  'All',
  'Entertainment',
  'Music',
  'Productivity',
  'Education',
  'Finance',
  'Shopping',
];

const DEFAULT_SORT_OPTIONS = [
  { label: 'Highest Cost', value: 'highest-cost' },
  { label: 'Lowest Cost', value: 'lowest-cost' },
  { label: 'Renewal Date', value: 'renewal-date' },
  { label: 'Alphabetical', value: 'alphabetical' },
];

const DEFAULT_STATUS_OPTIONS = ['All', 'Active', 'Paused', 'Cancelled'];

const FilterPanel = ({
  selectedStatus = 'All',
  onStatusChange,
  selectedCategory = 'All',
  onCategoryChange,
  selectedSort = 'highest-cost',
  onSortChange,
  viewMode = 'grid',
  onViewModeChange,
  categories = DEFAULT_CATEGORIES,
  sortOptions = DEFAULT_SORT_OPTIONS,
  statusOptions = DEFAULT_STATUS_OPTIONS,
  currency,
  onCurrencyToggle,
  className = '',
}) => {
  // Helper for status pill icon
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <FiCheckCircle className="h-3.5 w-3.5 text-emerald-400" />;
      case 'paused':
        return <FiPauseCircle className="h-3.5 w-3.5 text-amber-400" />;
      case 'cancelled':
      case 'canceled':
        return <FiSlash className="h-3.5 w-3.5 text-rose-400" />;
      default:
        return <FiLayers className="h-3.5 w-3.5 text-blue-400" />;
    }
  };

  // Helper for status active pill class styling
  const getStatusActiveClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm';
      case 'paused':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm';
      case 'cancelled':
      case 'canceled':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-sm';
    }
  };

  return (
    <div
      className={cn(
        'w-full rounded-2xl border border-slate-800 bg-slate-900/90 p-4 backdrop-blur-xl shadow-xl',
        'flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between',
        className
      )}
    >
      {/* 1. Status Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline-block">
          Status:
        </span>
        {statusOptions.map((status) => {
          const isSelected =
            selectedStatus.toLowerCase() === status.toLowerCase();
          return (
            <button
              key={status}
              type="button"
              onClick={() => onStatusChange && onStatusChange(status)}
              className={cn(
                'flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all duration-200',
                isSelected
                  ? getStatusActiveClass(status)
                  : 'border-slate-700/60 bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              )}
            >
              {getStatusIcon(status)}
              <span>{status}</span>
            </button>
          );
        })}
      </div>

      {/* Controls Container: Dropdowns, Currency, and View Mode */}
      <div className="flex flex-wrap items-center gap-3">
        {/* 2. Category Dropdown */}
        <div className="relative flex-1 sm:flex-initial min-w-[150px]">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <FiFilter className="h-3.5 w-3.5" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-700/70 bg-slate-800/90 py-1.5 pl-9 pr-8 text-xs font-medium text-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer transition-colors"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-slate-900 text-white">
                Category: {cat}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">
            ▼
          </div>
        </div>

        {/* 3. Sort Dropdown */}
        <div className="relative flex-1 sm:flex-initial min-w-[160px]">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <FiSliders className="h-3.5 w-3.5" />
          </div>
          <select
            value={selectedSort}
            onChange={(e) => onSortChange && onSortChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-700/70 bg-slate-800/90 py-1.5 pl-9 pr-8 text-xs font-medium text-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer transition-colors"
          >
            {sortOptions.map((opt) => {
              const val = typeof opt === 'string' ? opt : opt.value;
              const label = typeof opt === 'string' ? opt : opt.label;
              return (
                <option key={val} value={val} className="bg-slate-900 text-white">
                  Sort: {label}
                </option>
              );
            })}
          </select>
          <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">
            ▼
          </div>
        </div>

        {/* Optional Currency Mode Toggle */}
        {currency && onCurrencyToggle && (
          <button
            type="button"
            onClick={onCurrencyToggle}
            className="flex items-center gap-1 rounded-xl border border-slate-700/70 bg-slate-800/90 px-2.5 py-1.5 text-xs font-bold text-emerald-400 hover:bg-slate-700 transition-colors"
            title="Toggle Currency"
          >
            <FiDollarSign className="h-3.5 w-3.5" />
            <span>{currency}</span>
          </button>
        )}

        {/* 4. View Mode Toggle (Grid vs Table View) */}
        {onViewModeChange && (
          <div className="flex items-center rounded-xl border border-slate-700/70 bg-slate-800/60 p-1">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-200',
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              )}
              title="Grid Cards View"
            >
              <FiGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('table')}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-200',
                viewMode === 'table' || viewMode === 'list'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              )}
              title="Table List View"
            >
              <FiList className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Table</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  selectedStatus: PropTypes.string,
  onStatusChange: PropTypes.func,
  selectedCategory: PropTypes.string,
  onCategoryChange: PropTypes.func,
  selectedSort: PropTypes.string,
  onSortChange: PropTypes.func,
  viewMode: PropTypes.oneOf(['grid', 'table', 'list']),
  onViewModeChange: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.string),
  sortOptions: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ])
  ),
  statusOptions: PropTypes.arrayOf(PropTypes.string),
  currency: PropTypes.string,
  onCurrencyToggle: PropTypes.func,
  className: PropTypes.string,
};

export default FilterPanel;
