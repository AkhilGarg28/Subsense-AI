import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiCheck,
  FiCheckCircle,
  FiTrash2,
  FiArrowRight,
  FiClock,
  FiTag,
  FiAlertCircle,
  FiAlertTriangle,
  FiInfo,
  FiCheckSquare
} from 'react-icons/fi';

/**
 * Priority Badge Renderer
 */
const renderPriorityBadge = (priority, priorityType) => {
  const pType = (priorityType || '').toLowerCase();
  const pName = priority || 'Medium';

  let badgeClasses = 'bg-slate-800 text-slate-300 border-slate-700';
  let Icon = FiInfo;

  if (pType === 'danger' || pName === 'High') {
    badgeClasses = 'bg-rose-500/10 text-rose-400 border-rose-500/25';
    Icon = FiAlertCircle;
  } else if (pType === 'warning') {
    badgeClasses = 'bg-amber-500/10 text-amber-400 border-amber-500/25';
    Icon = FiAlertTriangle;
  } else if (pType === 'success' || pName === 'Low') {
    badgeClasses = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25';
    Icon = FiCheckSquare;
  } else if (pType === 'info' || pName === 'Medium') {
    badgeClasses = 'bg-blue-500/10 text-blue-400 border-blue-500/25';
    Icon = FiInfo;
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeClasses}`}>
      <Icon className="w-3 h-3 shrink-0" />
      <span>{pName}</span>
    </span>
  );
};

/**
 * Category Badge Renderer
 */
const renderCategoryBadge = (category) => {
  let catClasses = 'bg-slate-800/80 text-slate-400 border-slate-700/60';

  if (category === 'Bills') {
    catClasses = 'bg-amber-500/10 text-amber-300 border-amber-500/20';
  } else if (category === 'AI Insights') {
    catClasses = 'bg-purple-500/10 text-purple-300 border-purple-500/20';
  } else if (category === 'Subscriptions') {
    catClasses = 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20';
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium border ${catClasses}`}>
      <FiTag className="w-3 h-3 shrink-0" />
      <span>{category}</span>
    </span>
  );
};

/**
 * NotificationCard Component
 *
 * Renders an individual notification item with:
 * - Unread status dot & background highlighting
 * - Emoji / custom icon avatar
 * - Priority badge & Category tag
 * - Title, description, and relative timestamp
 * - Action button leading to relevant view
 * - Quick triggers to mark as read or delete
 */
const NotificationCard = ({
  notification,
  onMarkAsRead,
  onDelete,
  onActionClick
}) => {
  if (!notification) return null;

  const {
    id,
    title,
    description,
    category,
    priority,
    priorityType,
    timestamp,
    isRead,
    icon,
    actionText,
    link
  } = notification;

  const handleToggleRead = (e) => {
    e.stopPropagation();
    if (onMarkAsRead) {
      onMarkAsRead(id);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleAction = (e) => {
    if (onActionClick) {
      onActionClick(notification);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -8 }}
      transition={{ duration: 0.2 }}
      className={`relative group rounded-2xl border transition-all p-4 md:p-5 overflow-hidden ${
        isRead
          ? 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700/80'
          : 'bg-slate-900/95 border-blue-500/40 shadow-lg shadow-blue-500/5 hover:border-blue-500/60'
      }`}
    >
      {/* Unread Accent Left Bar */}
      {!isRead && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500" />
      )}

      <div className="flex items-start gap-3.5 md:gap-4">
        {/* Notification Icon Avatar */}
        <div className="relative shrink-0">
          <div
            className={`w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner border ${
              isRead
                ? 'bg-slate-800/80 border-slate-700/70 text-slate-300'
                : 'bg-gradient-to-br from-slate-800 to-slate-900 border-blue-500/30 text-white'
            }`}
          >
            <span>{icon || '🔔'}</span>
          </div>

          {/* Unread Blue Pulse Dot */}
          {!isRead && (
            <span
              className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-slate-900 animate-pulse"
              title="Unread Notification"
            />
          )}
        </div>

        {/* Card Content Main Section */}
        <div className="flex-1 min-w-0">
          {/* Header Row: Badges & Timestamp */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              {renderPriorityBadge(priority, priorityType)}
              {renderCategoryBadge(category)}
            </div>

            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
              <FiClock className="w-3 h-3 text-slate-500" />
              <span>{timestamp}</span>
            </div>
          </div>

          {/* Title */}
          <h4
            className={`text-sm md:text-base font-bold tracking-tight mb-1 transition-colors ${
              isRead ? 'text-slate-300 group-hover:text-white' : 'text-white font-extrabold'
            }`}
          >
            {title}
          </h4>

          {/* Description */}
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-3.5 line-clamp-2 md:line-clamp-none">
            {description}
          </p>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
            {/* Primary Action Button */}
            {actionText && (
              link ? (
                <Link
                  to={link}
                  onClick={handleAction}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 hover:text-blue-300 border border-blue-500/30 transition-colors"
                >
                  <span>{actionText}</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleAction}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 hover:text-blue-300 border border-blue-500/30 transition-colors"
                >
                  <span>{actionText}</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </button>
              )
            )}

            {!actionText && <div />}

            {/* Icon Trigger Buttons: Mark as Read & Delete */}
            <div className="flex items-center gap-1.5 ml-auto">
              <button
                type="button"
                onClick={handleToggleRead}
                title={isRead ? 'Mark as Unread' : 'Mark as Read'}
                className={`p-2 rounded-xl text-xs font-medium transition-colors border ${
                  isRead
                    ? 'bg-slate-800/40 text-slate-400 hover:text-blue-400 hover:bg-slate-800 border-slate-700/50'
                    : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/30'
                }`}
              >
                {isRead ? (
                  <FiCheck className="w-4 h-4" />
                ) : (
                  <FiCheckCircle className="w-4 h-4" />
                )}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                title="Delete Notification"
                className="p-2 rounded-xl text-xs font-medium bg-slate-800/40 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-slate-700/50 hover:border-rose-500/30 transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

NotificationCard.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string,
    priority: PropTypes.string,
    priorityType: PropTypes.string,
    timestamp: PropTypes.string,
    isRead: PropTypes.bool,
    icon: PropTypes.string,
    actionText: PropTypes.string,
    link: PropTypes.string
  }).isRequired,
  onMarkAsRead: PropTypes.func,
  onDelete: PropTypes.func,
  onActionClick: PropTypes.func
};

export default NotificationCard;
