import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineExclamation,
  HiOutlineCheckCircle,
  HiOutlineCreditCard,
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineViewList,
  HiOutlineViewGrid,
  HiOutlineInformationCircle,
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';

/**
 * Sample upcoming renewals data matching urgency levels:
 * - Today (Red)
 * - Tomorrow (Amber)
 * - This Week (Blue)
 * - This Month (Green)
 */
const defaultRenewals = [
  {
    id: 'ren-1',
    name: 'Netflix Premium',
    category: 'Entertainment',
    amount: 19.99,
    cycle: 'monthly',
    date: '2026-07-25', // Today
    urgency: 'today',
    paymentMethod: 'Chase Visa ****4821',
    autoRenew: true,
    logoColor: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
  {
    id: 'ren-2',
    name: 'ChatGPT Plus',
    category: 'AI & Productivity',
    amount: 20.0,
    cycle: 'monthly',
    date: '2026-07-25', // Today
    urgency: 'today',
    paymentMethod: 'Amex Gold ****1092',
    autoRenew: true,
    logoColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  {
    id: 'ren-3',
    name: 'Spotify Family',
    category: 'Entertainment',
    amount: 16.99,
    cycle: 'monthly',
    date: '2026-07-26', // Tomorrow
    urgency: 'tomorrow',
    paymentMethod: 'Chase Visa ****4821',
    autoRenew: true,
    logoColor: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  {
    id: 'ren-4',
    name: 'Figma Professional',
    category: 'Design Tools',
    amount: 15.0,
    cycle: 'monthly',
    date: '2026-07-28', // This Week
    urgency: 'this_week',
    paymentMethod: 'Capital One ****8831',
    autoRenew: true,
    alertNote: 'Price increase to $17.25 next cycle',
    logoColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  },
  {
    id: 'ren-5',
    name: 'GitHub Copilot',
    category: 'Developer Tools',
    amount: 10.0,
    cycle: 'monthly',
    date: '2026-07-29', // This Week
    urgency: 'this_week',
    paymentMethod: 'PayPal Account',
    autoRenew: true,
    logoColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  {
    id: 'ren-6',
    name: 'Adobe Creative Cloud',
    category: 'Design Tools',
    amount: 54.99,
    cycle: 'monthly',
    date: '2026-08-04', // This Month
    urgency: 'this_month',
    paymentMethod: 'Chase Visa ****4821',
    autoRenew: false,
    logoColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  },
  {
    id: 'ren-7',
    name: 'AWS Cloud Hosting',
    category: 'Infrastructure',
    amount: 84.5,
    cycle: 'monthly',
    date: '2026-08-12', // This Month
    urgency: 'this_month',
    paymentMethod: 'Corporate Credit Card ****9901',
    autoRenew: true,
    logoColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
];

/**
 * Color badge mapping helper according to requirements:
 * Today (Red), Tomorrow (Amber), This Week (Blue), This Month (Green)
 */
export const urgencyBadgeStyles = {
  today: {
    label: 'Today',
    badge: 'bg-red-500/20 text-red-400 border-red-500/40 font-bold',
    dot: 'bg-red-500',
    banner: 'border-red-500/40 bg-red-500/10 text-red-300',
  },
  tomorrow: {
    label: 'Tomorrow',
    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/40 font-bold',
    dot: 'bg-amber-500',
    banner: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
  },
  this_week: {
    label: 'This Week',
    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/40 font-semibold',
    dot: 'bg-blue-500',
    banner: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
  },
  this_month: {
    label: 'This Month',
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-medium',
    dot: 'bg-emerald-500',
    banner: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  },
};

/**
 * RenewalCalendar — Mini Renewal Calendar & Timeline component for SubSense AI.
 * Highlights renewals color-coded by urgency (Today=Red, Tomorrow=Amber, This Week=Blue, This Month=Green),
 * quick alert banners, cost breakdown, auto-renew management, and interactive month calendar grid.
 */
const RenewalCalendar = ({
  renewals: initialRenewals = defaultRenewals,
  onManageRenewal = null,
  className = '',
}) => {
  const [renewalsList, setRenewalsList] = useState(initialRenewals);
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' | 'calendar'
  const [filterUrgency, setFilterUrgency] = useState('all'); // 'all' | 'today' | 'tomorrow' | 'this_week' | 'this_month'
  const [searchQuery, setSearchQuery] = useState('');
  const [snoozedMap, setSnoozedMap] = useState({});
  const [currentDate] = useState(new Date(2026, 6, 25)); // July 2026

  // Toggle Auto-Renew status
  const handleToggleAutoRenew = (id) => {
    setRenewalsList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, autoRenew: !item.autoRenew } : item))
    );
  };

  // Snooze notification reminder
  const handleSnooze = (id) => {
    setSnoozedMap((prev) => ({ ...prev, [id]: true }));
  };

  // Filtered Renewals calculation
  const filteredRenewals = useMemo(() => {
    return renewalsList.filter((item) => {
      if (filterUrgency !== 'all' && item.urgency !== filterUrgency) return false;
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [renewalsList, filterUrgency, searchQuery]);

  // Urgent renewals count calculation for Banner
  const todayRenewals = renewalsList.filter((r) => r.urgency === 'today');
  const todayTotalCost = todayRenewals.reduce((sum, r) => sum + r.amount, 0);

  // Calendar Grid helper: days in July 2026
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-indexed, 6 = July
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay(); // Sunday=0

    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ day: null });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const itemsOnDate = renewalsList.filter((r) => r.date === dateStr);
      days.push({
        day: d,
        dateStr,
        isToday: d === 25,
        items: itemsOnDate,
      });
    }
    return days;
  }, [currentDate, renewalsList]);

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-glass-border bg-glass p-6 backdrop-blur-xl transition-all duration-300',
        'hover:border-primary/40 hover:shadow-glow',
        className
      )}
    >
      {/* Background Lighting */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-rose-500/10 blur-3xl" />

      {/* Top Quick Renewal Alert Banner */}
      {todayRenewals.length > 0 && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-500/40 bg-red-500/15 p-3.5 shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
              <HiOutlineExclamation className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold text-red-200">
                ⚡ Quick Alert: {todayRenewals.length} Subscription{todayRenewals.length > 1 ? 's' : ''} Renewing Today!
              </p>
              <p className="text-[11px] text-red-300/80">
                Total auto-debit charge today:{' '}
                <strong className="text-white">${todayTotalCost.toFixed(2)}</strong> across Chase & Amex cards.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFilterUrgency('today')}
            className="rounded-lg bg-red-500 px-3 py-1 text-xs font-bold text-slate-950 hover:bg-red-400 transition-all shadow-xs"
          >
            Review Today ({todayRenewals.length})
          </button>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-glass-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <HiOutlineCalendar className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-text-primary">Renewal Calendar & Timeline</h3>
          </div>
          <p className="mt-0.5 text-xs text-text-secondary">
            Color-coded upcoming billing schedule & cost breakdown
          </p>
        </div>

        {/* View Switcher & Search */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <HiOutlineSearch className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search renewals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 rounded-xl border border-glass-border bg-surface/60 pl-8 pr-3 text-xs text-text-primary placeholder-text-muted focus:border-primary focus:outline-none"
            />
          </div>

          {/* Timeline / Calendar View Switch */}
          <div className="flex items-center rounded-xl border border-glass-border bg-surface/60 p-1">
            <button
              type="button"
              onClick={() => setViewMode('timeline')}
              className={cn(
                'flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all',
                viewMode === 'timeline'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              <HiOutlineViewList className="h-3.5 w-3.5" />
              <span>Timeline</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              className={cn(
                'flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all',
                viewMode === 'calendar'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              <HiOutlineViewGrid className="h-3.5 w-3.5" />
              <span>Calendar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Urgency Filter Tabs (Color-coded legend) */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setFilterUrgency('all')}
          className={cn(
            'rounded-lg px-3 py-1 text-xs transition-all font-semibold',
            filterUrgency === 'all'
              ? 'bg-surface-light text-text-primary border border-glass-border'
              : 'text-text-muted hover:text-text-primary'
          )}
        >
          All ({renewalsList.length})
        </button>

        <button
          type="button"
          onClick={() => setFilterUrgency('today')}
          className={cn(
            'flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold transition-all',
            urgencyBadgeStyles.today.badge,
            filterUrgency === 'today' && 'ring-2 ring-red-500/50'
          )}
        >
          <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
          <span>Today (Red)</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterUrgency('tomorrow')}
          className={cn(
            'flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold transition-all',
            urgencyBadgeStyles.tomorrow.badge,
            filterUrgency === 'tomorrow' && 'ring-2 ring-amber-500/50'
          )}
        >
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span>Tomorrow (Amber)</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterUrgency('this_week')}
          className={cn(
            'flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold transition-all',
            urgencyBadgeStyles.this_week.badge,
            filterUrgency === 'this_week' && 'ring-2 ring-blue-500/50'
          )}
        >
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span>This Week (Blue)</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterUrgency('this_month')}
          className={cn(
            'flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold transition-all',
            urgencyBadgeStyles.this_month.badge,
            filterUrgency === 'this_month' && 'ring-2 ring-emerald-500/50'
          )}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>This Month (Green)</span>
        </button>
      </div>

      {/* Main Content Area: Timeline List View vs Mini Calendar Grid */}
      {viewMode === 'timeline' ? (
        <div className="mt-5 space-y-3">
          <AnimatePresence>
            {filteredRenewals.map((item) => {
              const badgeStyle = urgencyBadgeStyles[item.urgency] || urgencyBadgeStyles.this_month;
              const isSnoozed = snoozedMap[item.id];

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className={cn(
                    'group/card flex flex-wrap items-center justify-between gap-4 rounded-xl border border-glass-border bg-surface/40 p-4 transition-all duration-300',
                    'hover:border-primary/40 hover:bg-surface/70',
                    item.urgency === 'today' && 'border-red-500/30 bg-red-950/10'
                  )}
                >
                  {/* Left: Icon & Subscription Details */}
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-xl border font-bold text-sm shadow-sm',
                        item.logoColor
                      )}
                    >
                      {item.name.charAt(0)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-text-primary">{item.name}</h4>
                        {/* Urgency Badge */}
                        <span
                          className={cn(
                            'rounded-md border px-2 py-0.5 text-[11px]',
                            badgeStyle.badge
                          )}
                        >
                          {badgeStyle.label}
                        </span>
                        {item.alertNote && (
                          <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                            ⚠️ {item.alertNote}
                          </span>
                        )}
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-text-muted">
                        <span className="flex items-center gap-1">
                          <HiOutlineCalendar className="h-3.5 w-3.5 text-text-secondary" />
                          <span>{item.date}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <HiOutlineCreditCard className="h-3.5 w-3.5 text-text-secondary" />
                          <span>{item.paymentMethod}</span>
                        </span>
                        <span>•</span>
                        <span className="rounded-sm bg-slate-800/60 px-1.5 py-0.5 text-[10px] font-medium text-text-secondary">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Cost Breakdown & Auto-renew Toggle */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-bold text-text-primary">${item.amount.toFixed(2)}</p>
                      <p className="text-[11px] text-text-muted capitalize">/{item.cycle}</p>
                    </div>

                    <div className="flex items-center gap-2 border-l border-glass-border pl-4">
                      {/* Auto-renew Toggle */}
                      <button
                        type="button"
                        onClick={() => handleToggleAutoRenew(item.id)}
                        className={cn(
                          'flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all',
                          item.autoRenew
                            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                            : 'border-slate-700 bg-slate-800/60 text-text-muted'
                        )}
                        title="Click to toggle Auto-Renew"
                      >
                        <span
                          className={cn(
                            'h-2 w-2 rounded-full',
                            item.autoRenew ? 'bg-emerald-400' : 'bg-slate-500'
                          )}
                        />
                        <span>{item.autoRenew ? 'Auto-Renew ON' : 'OFF'}</span>
                      </button>

                      {/* Snooze Button */}
                      <button
                        type="button"
                        onClick={() => handleSnooze(item.id)}
                        className={cn(
                          'flex h-7 w-7 items-center justify-center rounded-lg border border-glass-border bg-surface-light/40 text-text-muted hover:text-text-primary transition-all',
                          isSnoozed && 'text-amber-400 border-amber-500/40'
                        )}
                        title="Snooze notification"
                      >
                        <HiOutlineBell className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredRenewals.length === 0 && (
            <div className="rounded-xl border border-glass-border bg-surface/30 p-8 text-center">
              <HiOutlineCheckCircle className="mx-auto h-8 w-8 text-emerald-400 opacity-60" />
              <p className="mt-2 text-sm font-semibold text-text-primary">No renewals found</p>
              <p className="text-xs text-text-muted">Try clearing search or changing urgency filters.</p>
            </div>
          )}
        </div>
      ) : (
        /* Calendar Grid View */
        <div className="mt-5">
          <div className="flex items-center justify-between border-b border-glass-border pb-3">
            <span className="text-xs font-bold text-text-primary uppercase tracking-wider">
              July 2026 Schedule
            </span>
            <div className="flex items-center gap-4 text-xs font-medium text-text-muted">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-500" /> Today
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> Tomorrow
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-blue-500" /> This Week
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> This Month
              </span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-1.5 text-center text-xs font-semibold text-text-muted">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div className="mt-2 grid grid-cols-7 gap-1.5">
            {calendarDays.map((cell, index) => {
              if (!cell.day) {
                return <div key={`empty-${index}`} className="h-16 rounded-lg bg-surface/20 opacity-30" />;
              }

              const hasItems = cell.items.length > 0;

              return (
                <div
                  key={cell.dateStr}
                  className={cn(
                    'flex flex-col justify-between rounded-xl border p-2 min-h-16 transition-all',
                    cell.isToday
                      ? 'border-red-500/60 bg-red-950/20 text-white font-bold ring-1 ring-red-500/40'
                      : hasItems
                      ? 'border-glass-border bg-surface/60 text-text-primary hover:border-primary/40'
                      : 'border-glass-border/40 bg-surface/20 text-text-muted opacity-60'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn('text-xs', cell.isToday && 'text-red-400 font-extrabold')}>
                      {cell.day}
                    </span>
                    {cell.isToday && (
                      <span className="rounded bg-red-500 px-1 py-0.2 text-[9px] text-slate-950 font-bold">
                        Today
                      </span>
                    )}
                  </div>

                  {hasItems && (
                    <div className="mt-1 space-y-1">
                      {cell.items.map((item) => {
                        const badgeStyle =
                          urgencyBadgeStyles[item.urgency] || urgencyBadgeStyles.this_month;
                        return (
                          <div
                            key={item.id}
                            className={cn(
                              'truncate rounded px-1.5 py-0.5 text-[10px] font-semibold border',
                              badgeStyle.badge
                            )}
                            title={`${item.name} - $${item.amount}`}
                          >
                            {item.name.split(' ')[0]} ${item.amount}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Summary Footer */}
      <div className="mt-6 flex flex-wrap items-center justify-between border-t border-glass-border pt-4 text-xs text-text-secondary">
        <div className="flex items-center gap-2">
          <HiOutlineInformationCircle className="h-4 w-4 text-text-muted" />
          <span>
            Total upcoming renewals in July:{' '}
            <strong className="text-text-primary">${renewalsList.reduce((acc, r) => acc + r.amount, 0).toFixed(2)}</strong>
          </span>
        </div>
        <div className="text-text-muted">
          Active Subscriptions Tracked: <strong className="text-text-primary">{renewalsList.length}</strong>
        </div>
      </div>
    </div>
  );
};

RenewalCalendar.propTypes = {
  renewals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string,
      amount: PropTypes.number.isRequired,
      cycle: PropTypes.string,
      date: PropTypes.string.isRequired,
      urgency: PropTypes.oneOf(['today', 'tomorrow', 'this_week', 'this_month']).isRequired,
      paymentMethod: PropTypes.string,
      autoRenew: PropTypes.bool,
      alertNote: PropTypes.string,
      logoColor: PropTypes.string,
    })
  ),
  onManageRenewal: PropTypes.func,
  className: PropTypes.string,
};

export default RenewalCalendar;
