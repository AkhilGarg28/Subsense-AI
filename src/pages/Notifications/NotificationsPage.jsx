import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FiBell,
  FiMail,
  FiAlertTriangle,
  FiRefreshCw,
  FiLayers
} from 'react-icons/fi';
import {
  NotificationTabs,
  NotificationList
} from '../../components/notifications';
import { notificationsAPI } from '../../services/api';
import { mockNotificationsData } from '../../data/mockNotificationsData';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch notifications from backend API
  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const res = await notificationsAPI.getAll();
      const data = res.data?.data || res.data?.notifications || [];
      setNotifications(Array.isArray(data) && data.length > 0 ? data : mockNotificationsData);
    } catch (err) {
      console.error('[Notifications] Fetch error:', err);
      // Fallback to mock data so UI always shows content
      setNotifications(mockNotificationsData);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notif) => {
      let matchesTab = true;
      if (activeTab === 'Unread') {
        matchesTab = !notif.isRead;
      } else if (activeTab !== 'All') {
        matchesTab = notif.category === activeTab;
      }

      const q = searchQuery.toLowerCase().trim();
      let matchesSearch = true;
      if (q) {
        matchesSearch =
          notif.title?.toLowerCase().includes(q) ||
          notif.description?.toLowerCase().includes(q) ||
          (notif.category && notif.category.toLowerCase().includes(q));
      }

      return matchesTab && matchesSearch;
    });
  }, [notifications, activeTab, searchQuery]);

  const totalCount = notifications.length;
  const unreadCount = useMemo(() => notifications.filter((n) => !n.isRead).length, [notifications]);
  const highPriorityCount = useMemo(
    () => notifications.filter((n) => n.priority === 'High' && !n.isRead).length,
    [notifications]
  );

  const handleMarkAsRead = async (id) => {
    // Optimistic update
    setNotifications((prev) =>
      prev.map((notif) =>
        (notif._id || notif.id) === id ? { ...notif, isRead: !notif.isRead } : notif
      )
    );
    try {
      await notificationsAPI.markAsRead(id);
    } catch (err) {
      // Revert on error — already updated optimistically
      console.warn('[Notifications] Mark-read failed:', err.message);
    }
  };

  const handleMarkAllAsRead = async () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
    try {
      await notificationsAPI.markAllRead();
    } catch (err) {
      console.warn('[Notifications] Mark-all-read failed:', err.message);
    }
  };

  const handleDelete = async (id) => {
    setNotifications((prev) => prev.filter((notif) => (notif._id || notif.id) !== id));
  };

  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
      try {
        await notificationsAPI.clearAll();
      } catch (err) {
        console.warn('[Notifications] Clear-all failed:', err.message);
      }
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveTab('All');
  };

  const handleRefresh = () => {
    fetchNotifications();
  };

  const handleActionClick = (notification) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification._id || notification.id);
    }
  };

  return (
    <div className="w-full space-y-6 pb-12 animate-fade-in">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl bg-[#171F2F]/80 border border-white/10 backdrop-blur-xl flex items-center gap-4 shadow-xl"
        >
          <div className="w-11 h-11 rounded-xl bg-[#5B8CFF]/15 border border-[#5B8CFF]/30 flex items-center justify-center text-[#5B8CFF]">
            <FiLayers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#A1A8B5] uppercase tracking-wider">Total Feed</div>
            <div className="text-2xl font-bold text-white">{totalCount}</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl bg-[#171F2F]/80 border border-white/10 backdrop-blur-xl flex items-center gap-4 shadow-xl"
        >
          <div className="w-11 h-11 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6]">
            <FiMail className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#A1A8B5] uppercase tracking-wider">Unread Alerts</div>
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              <span>{unreadCount}</span>
              {unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#5B8CFF] animate-ping" />
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl bg-[#171F2F]/80 border border-white/10 backdrop-blur-xl flex items-center gap-4 shadow-xl"
        >
          <div className="w-11 h-11 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/30 flex items-center justify-center text-[#EF4444]">
            <FiAlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold text-[#A1A8B5] uppercase tracking-wider">High Priority</div>
              <div className="text-2xl font-bold text-white">{highPriorityCount}</div>
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={isLoading}
              className="p-2 rounded-xl bg-[#121A2F] border border-white/10 text-[#A1A8B5] hover:text-white transition-all cursor-pointer"
              title="Refresh Feed"
            >
              <FiRefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#5B8CFF]' : ''}`} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Category Filter Tabs */}
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
