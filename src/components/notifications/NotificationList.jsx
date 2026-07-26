import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FiSearch,
  FiCheckCircle,
  FiTrash2,
  FiBellOff,
  FiXCircle,
  FiFilter
} from 'react-icons/fi';
import NotificationCard from './NotificationCard';
import NotificationSkeleton from './NotificationSkeleton';

const NotificationList = ({
  notifications = [],
  filteredNotifications = [],
  searchQuery = '',
  onSearchChange,
  onMarkAsRead,
  onDelete,
  onMarkAllAsRead,
  onClearAll,
  onActionClick,
  onResetFilters,
  isLoading = false
}) => {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const groupNotificationsByTime = (items) => {
    const groups = {
      Today: [],
      Tomorrow: [],
      'This Week': [],
      Earlier: [],
    };

    items.forEach((item) => {
      const timeStr = (item.time || item.timestamp || '').toLowerCase();
      if (timeStr.includes('today') || timeStr.includes('hour') || timeStr.includes('min') || timeStr.includes('2 hours ago') || timeStr.includes('10 minutes ago')) {
        groups.Today.push(item);
      } else if (timeStr.includes('tomorrow') || timeStr.includes('in 1 day') || timeStr.includes('due tomorrow')) {
        groups.Tomorrow.push(item);
      } else if (timeStr.includes('this week') || timeStr.includes('days ago') || timeStr.includes('yesterday') || timeStr.includes('in 3 days') || timeStr.includes('in 5 days')) {
        groups['This Week'].push(item);
      } else {
        groups.Earlier.push(item);
      }
    });

    return groups;
  };

  const grouped = groupNotificationsByTime(filteredNotifications);
  const timePeriodKeys = ['Today', 'Tomorrow', 'This Week', 'Earlier'];

  return (
    <div className="space-y-6">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#171F2F]/80 border border-white/10 backdrop-blur-xl">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A8B5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search notifications..."
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#121A2F] border border-white/10 text-white placeholder-[#64748B] focus:outline-none focus:border-[#5B8CFF] text-xs font-mono"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange && onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A8B5] hover:text-white"
            >
              <FiXCircle className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 shrink-0 font-mono text-xs">
          <button
            type="button"
            onClick={onMarkAllAsRead}
            disabled={unreadCount === 0 || isLoading}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold border transition-all ${
              unreadCount > 0 && !isLoading
                ? 'bg-[#5B8CFF]/15 text-[#5B8CFF] border-[#5B8CFF]/30 cursor-pointer hover:bg-[#5B8CFF]/25'
                : 'bg-[#121A2F] text-[#64748B] border-white/5 opacity-50 cursor-not-allowed'
            }`}
          >
            <FiCheckCircle className="w-4 h-4" />
            <span>Mark All Read</span>
          </button>

          <button
            type="button"
            onClick={onClearAll}
            disabled={notifications.length === 0 || isLoading}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold border transition-all ${
              notifications.length > 0 && !isLoading
                ? 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30 hover:bg-[#EF4444]/20 cursor-pointer'
                : 'bg-[#121A2F] text-[#64748B] border-white/5 opacity-50 cursor-not-allowed'
            }`}
          >
            <FiTrash2 className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Grouped Notifications */}
      {isLoading ? (
        <NotificationSkeleton count={4} />
      ) : filteredNotifications.length > 0 ? (
        <div className="space-y-6">
          {timePeriodKeys.map((groupKey) => {
            const groupItems = grouped[groupKey];
            if (!groupItems || groupItems.length === 0) return null;

            return (
              <div key={groupKey} className="space-y-3">
                <div className="flex items-center justify-between px-1 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#5B8CFF]" />
                    <h3 className="text-xs font-bold uppercase text-white">
                      {groupKey}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-[#A1A8B5] bg-[#121A2F] px-2.5 py-0.5 rounded-full border border-white/10">
                    {groupItems.length} {groupItems.length === 1 ? 'Alert' : 'Alerts'}
                  </span>
                </div>

                <div className="space-y-2.5">
                  <AnimatePresence mode="popLayout">
                    {groupItems.map((notification) => (
                      <NotificationCard
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={onMarkAsRead}
                        onDelete={onDelete}
                        onActionClick={onActionClick}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-2xl bg-[#171F2F]/80 border border-white/10">
          <div className="w-14 h-14 rounded-2xl bg-[#121A2F] border border-white/10 flex items-center justify-center text-[#A1A8B5] mb-4">
            <FiBellOff className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">
            {searchQuery ? 'No matching notifications found' : 'All caught up!'}
          </h3>
          <p className="text-xs text-[#A1A8B5] max-w-md leading-relaxed mb-4">
            {searchQuery
              ? `No notifications matching "${searchQuery}".`
              : 'You have no notifications in this category. Important updates and alerts will appear here.'}
          </p>
          {searchQuery && onResetFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="px-4 py-2 rounded-xl gradient-primary text-white text-xs font-bold shadow-glow-blue"
            >
              Clear Search Filter
            </button>
          )}
        </div>
      )}
    </div>
  );
};

NotificationList.propTypes = {
  notifications: PropTypes.array,
  filteredNotifications: PropTypes.array,
  searchQuery: PropTypes.string,
  onSearchChange: PropTypes.func,
  onMarkAsRead: PropTypes.func,
  onDelete: PropTypes.func,
  onMarkAllAsRead: PropTypes.func,
  onClearAll: PropTypes.func,
  onActionClick: PropTypes.func,
  onResetFilters: PropTypes.func,
  isLoading: PropTypes.bool
};

export default NotificationList;
