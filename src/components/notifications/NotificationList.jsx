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
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#171A18] border border-[#F3F1EA]/10 font-mono text-xs">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#96988F]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search notifications..."
            className="w-full pl-10 pr-9 py-2 rounded bg-[#0D0F0E] border border-[#F3F1EA]/10 text-[#F3F1EA] placeholder-[#96988F] focus:outline-none focus:border-[#C2A155]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange && onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#96988F] hover:text-[#F3F1EA]"
            >
              <FiXCircle className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onMarkAllAsRead}
            disabled={unreadCount === 0 || isLoading}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded font-bold border transition-all ${
              unreadCount > 0 && !isLoading
                ? 'bg-[#C2A155] text-[#0D0F0E] border-[#C2A155]'
                : 'bg-[#0D0F0E] text-[#96988F] border-[#F3F1EA]/10 opacity-50 cursor-not-allowed'
            }`}
          >
            <FiCheckCircle className="w-4 h-4" />
            <span>Mark All Read</span>
          </button>

          <button
            type="button"
            onClick={onClearAll}
            disabled={notifications.length === 0 || isLoading}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded font-bold border transition-all ${
              notifications.length > 0 && !isLoading
                ? 'bg-[#0D0F0E] text-[#D65C4F] border-[#D65C4F]/30 hover:bg-[#D65C4F]/20'
                : 'bg-[#0D0F0E] text-[#96988F] border-[#F3F1EA]/10 opacity-50 cursor-not-allowed'
            }`}
          >
            <FiTrash2 className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Notifications List Grouped by Time */}
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
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C2A155]" />
                    <h3 className="text-xs font-bold uppercase text-[#F3F1EA]">
                      {groupKey}
                    </h3>
                  </div>
                  <span className="text-[10px] text-[#96988F] bg-[#0D0F0E] px-2 py-0.5 rounded border border-[#F3F1EA]/10">
                    {groupItems.length} {groupItems.length === 1 ? 'ALERT' : 'ALERTS'}
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
        <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-xl bg-[#171A18] border border-[#F3F1EA]/10 font-mono">
          <div className="w-12 h-12 rounded-lg bg-[#0D0F0E] border border-[#F3F1EA]/10 flex items-center justify-center text-[#96988F] mb-3">
            <FiBellOff className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-[#F3F1EA] mb-1">
            {searchQuery ? 'No matching notifications found' : 'All caught up!'}
          </h3>
          <p className="text-xs text-[#96988F] max-w-md mb-4 font-sans">
            {searchQuery
              ? `No notifications matching "${searchQuery}".`
              : 'You have no notifications in this category. Important updates and alerts will appear here.'}
          </p>
          {searchQuery && onResetFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="px-4 py-2 rounded bg-[#C2A155] text-[#0D0F0E] text-xs font-bold"
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
