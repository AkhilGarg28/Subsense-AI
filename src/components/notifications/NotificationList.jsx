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

/**
 * NotificationList Component
 *
 * List container component managing:
 * - Search query input for filtering notifications
 * - Action controls: "Mark All as Read", "Clear All"
 * - Rendering list of NotificationCards with Framer Motion animations
 * - Empty state feedback when no notifications match search/tab filters
 * - Skeleton loading state
 */
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

  return (
    <div className="space-y-4">
      {/* Top Search & Actions Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 md:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl">
        {/* Search Bar Input */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search notifications by title or description..."
            className="w-full pl-10 pr-9 py-2 rounded-xl text-xs md:text-sm bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange && onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <FiXCircle className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Global Batch Action Triggers */}
        <div className="flex items-center justify-end gap-2 shrink-0">
          {/* Mark All Read Button */}
          <button
            type="button"
            onClick={onMarkAllAsRead}
            disabled={unreadCount === 0 || isLoading}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              unreadCount > 0 && !isLoading
                ? 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/30 cursor-pointer'
                : 'bg-slate-800/40 text-slate-400 border-slate-800 cursor-not-allowed opacity-50'
            }`}
            title="Mark all notifications as read"
          >
            <FiCheckCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Mark All Read</span>
            <span className="sm:hidden">Mark Read</span>
          </button>

          {/* Clear All Button */}
          <button
            type="button"
            onClick={onClearAll}
            disabled={notifications.length === 0 || isLoading}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              notifications.length > 0 && !isLoading
                ? 'bg-slate-800/80 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border-slate-700/80 hover:border-rose-500/30 cursor-pointer'
                : 'bg-slate-800/40 text-slate-400 border-slate-800 cursor-not-allowed opacity-50'
            }`}
            title="Clear all notifications"
          >
            <FiTrash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear All</span>
            <span className="sm:hidden">Clear</span>
          </button>
        </div>
      </div>

      {/* Notifications List Body */}
      {isLoading ? (
        <NotificationSkeleton count={4} />
      ) : filteredNotifications.length > 0 ? (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredNotifications.map((notification) => (
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
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-3xl bg-slate-900/60 border border-slate-800/80"
        >
          <div className="w-16 h-16 rounded-3xl bg-slate-800/80 border border-slate-700/70 flex items-center justify-center text-slate-400 mb-4 shadow-inner">
            {searchQuery ? <FiFilter className="w-8 h-8 text-blue-400" /> : <FiBellOff className="w-8 h-8 text-slate-400" />}
          </div>

          <h3 className="text-lg font-bold text-white mb-1.5">
            {searchQuery ? 'No matching notifications found' : 'All caught up!'}
          </h3>

          <p className="text-xs md:text-sm text-slate-400 max-w-md leading-relaxed mb-6">
            {searchQuery
              ? `We couldn't find any notifications matching "${searchQuery}". Try searching with different keywords.`
              : 'You have no notifications in this category. Important updates, bill renewals, and AI recommendations will appear here.'}
          </p>

          {searchQuery && onResetFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 transition-all"
            >
              Clear Search Filter
            </button>
          )}
        </motion.div>
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
