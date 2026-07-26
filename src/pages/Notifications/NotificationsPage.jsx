import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FiBell,
  FiMail,
  FiAlertTriangle,
  FiCheckCircle,
  FiRefreshCw,
  FiZap,
  FiLayers
} from 'react-icons/fi';
import {
  NotificationTabs,
  NotificationList
} from '../../components/notifications';
import { mockNotificationsData } from '../../data/mockNotificationsData';

/**
 * NotificationsPage Component
 *
 * SubSense AI Notifications Center Page providing:
 * - Summary metric header cards (Total notifications, Unread, High Priority)
 * - Category Tab filter bar (All, Unread, Bills, Subscriptions, AI Insights)
 * - Real-time keyword search across notification titles & descriptions
 * - Interactive batch actions: Mark All as Read, Clear All, Toggle Single Read, Delete
 * - Direct navigation action links for bill renewals, savings recommendations, and receipts
 */
const NotificationsPage = () => {
  // Main Notifications state initialized from mock data
  const [notifications, setNotifications] = useState(mockNotificationsData);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Filtered Notifications based on category tab & search query
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notif) => {
      // Category / Tab filter condition
      let matchesTab = true;
      if (activeTab === 'Unread') {
        matchesTab = !notif.isRead;
      } else if (activeTab !== 'All') {
        matchesTab = notif.category === activeTab;
      }

      // Keyword Search filter condition
      const q = searchQuery.toLowerCase().trim();
      let matchesSearch = true;
      if (q) {
        matchesSearch =
          notif.title.toLowerCase().includes(q) ||
          notif.description.toLowerCase().includes(q) ||
          (notif.category && notif.category.toLowerCase().includes(q));
      }

      return matchesTab && matchesSearch;
    });
  }, [notifications, activeTab, searchQuery]);

  // Statistics calculation
  const totalCount = notifications.length;
  const unreadCount = useMemo(() => notifications.filter((n) => !n.isRead).length, [notifications]);
  const highPriorityCount = useMemo(
    () => notifications.filter((n) => n.priority === 'High' && !n.isRead).length,
    [notifications]
  );

  // Handlers
  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: !notif.isRead } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveTab('All');
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setNotifications(mockNotificationsData);
      setIsLoading(false);
    }, 600);
  };

  const handleActionClick = (notification) => {
    // Automatically mark notification as read when clicking its action
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-8 space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <FiBell className="w-5 h-5" />
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Notifications Center
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl">
            Stay updated on upcoming subscription renewals, price changes, bill due dates, and AI-driven cost optimization recommendations.
          </p>
        </div>

        {/* Refresh / Restore Sample Data CTA */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all shadow-sm"
            title="Reload notification updates"
          >
            <FiRefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-blue-400' : ''}`} />
            <span>Reset Feed</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        {/* Total Notifications Card */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl flex items-center gap-3.5 shadow-lg"
        >
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <FiLayers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total Feed</div>
            <div className="text-xl md:text-2xl font-black text-white">{totalCount}</div>
          </div>
        </motion.div>

        {/* Unread Notifications Card */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl flex items-center gap-3.5 shadow-lg"
        >
          <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <FiMail className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Unread Alerts</div>
            <div className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
              <span>{unreadCount}</span>
              {unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              )}
            </div>
          </div>
        </motion.div>

        {/* High Priority Alerts Card */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl flex items-center gap-3.5 shadow-lg"
        >
          <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <FiAlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">High Priority</div>
            <div className="text-xl md:text-2xl font-black text-white">{highPriorityCount}</div>
          </div>
        </motion.div>
      </div>

      {/* Category Filter Tabs Bar */}
      <NotificationTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        notifications={notifications}
      />

      {/* Main Notifications List Container */}
      <NotificationList
        notifications={notifications}
        filteredNotifications={filteredNotifications}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDelete}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearAll={handleClearAll}
        onActionClick={handleActionClick}
        onResetFilters={handleResetFilters}
        isLoading={isLoading}
      />
    </div>
  );
};

export default NotificationsPage;
