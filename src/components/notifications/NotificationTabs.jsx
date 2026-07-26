import React from 'react';
import PropTypes from 'prop-types';
import { FiLayers, FiMail, FiDollarSign, FiCreditCard, FiZap } from 'react-icons/fi';

/**
 * Category Tab configuration definitions
 */
const TABS = [
  { id: 'All', label: 'All', icon: FiLayers },
  { id: 'Unread', label: 'Unread', icon: FiMail },
  { id: 'Bills', label: 'Bills', icon: FiDollarSign },
  { id: 'Subscriptions', label: 'Subscriptions', icon: FiCreditCard },
  { id: 'AI Insights', label: 'AI Insights', icon: FiZap }
];

/**
 * NotificationTabs Component
 *
 * Horizontal tab navigation bar for filtering notifications by category:
 * - All, Unread, Bills, Subscriptions, AI Insights
 * - Renders dynamic unread count badges for tabs
 */
const NotificationTabs = ({
  activeTab = 'All',
  onTabChange,
  notifications = []
}) => {
  // Helper to get unread count or category count
  const getBadgeCount = (tabId) => {
    if (!notifications || notifications.length === 0) return 0;

    if (tabId === 'All') {
      return notifications.length;
    }
    if (tabId === 'Unread') {
      return notifications.filter((n) => !n.isRead).length;
    }
    return notifications.filter((n) => n.category === tabId).length;
  };

  const getUnreadCountForTab = (tabId) => {
    if (!notifications || notifications.length === 0) return 0;
    if (tabId === 'All' || tabId === 'Unread') {
      return notifications.filter((n) => !n.isRead).length;
    }
    return notifications.filter((n) => n.category === tabId && !n.isRead).length;
  };

  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl overflow-x-auto no-scrollbar scroll-smooth max-w-full">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        const totalCount = getBadgeCount(tab.id);
        const unreadCount = getUnreadCountForTab(tab.id);

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange && onTabChange(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              isActive
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
            <span>{tab.label}</span>

            {/* Count Badge */}
            {totalCount > 0 && (
              <span
                className={`ml-0.5 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : unreadCount > 0
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                }`}
              >
                {unreadCount > 0 && tab.id !== 'Unread' ? unreadCount : totalCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

NotificationTabs.propTypes = {
  activeTab: PropTypes.string,
  onTabChange: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      category: PropTypes.string,
      isRead: PropTypes.bool
    })
  )
};

export default NotificationTabs;
