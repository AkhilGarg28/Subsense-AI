import React from 'react';
import PropTypes from 'prop-types';
import { FiSearch, FiX } from 'react-icons/fi';
import { cn } from '../../utils/helpers';

/**
 * SearchBar — SubSense AI Search Bar Component
 * Real-time text filtering input for subscription name, category, and merchant,
 * featuring a quick clear button, search icon indicator, and optional result counter.
 */
const SearchBar = ({
  value = '',
  onChange,
  placeholder = 'Search by name, category, or merchant...',
  onClear,
  resultCount,
  className = '',
}) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange('');
    }
  };

  const hasValue = Boolean(value && value.trim().length > 0);

  return (
    <div className={cn('relative flex-1 w-full', className)}>
      {/* Search Icon Indicator */}
      <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
        <FiSearch className="h-4 w-4 transition-colors group-focus-within:text-blue-400" />
      </div>

      {/* Controlled Input */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-xl border border-slate-700/70 bg-slate-900/90 py-2.5 pl-10 text-sm text-white placeholder-slate-400 shadow-sm transition-all duration-200',
          'focus:border-blue-500 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
          hasValue ? 'pr-20' : 'pr-10'
        )}
      />

      {/* Right Controls: Result Count & Clear Button */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {resultCount !== undefined && (
          <span className="hidden sm:inline-block rounded-md bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-400 border border-slate-700/60">
            {resultCount} {resultCount === 1 ? 'item' : 'items'}
          </span>
        )}

        {hasValue && (
          <button
            type="button"
            onClick={handleClear}
            className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
            title="Clear search"
            aria-label="Clear search input"
          >
            <FiX className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  onClear: PropTypes.func,
  resultCount: PropTypes.number,
  className: PropTypes.string,
};

export default SearchBar;
