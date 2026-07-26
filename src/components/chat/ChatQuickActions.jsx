import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineDocumentText,
  HiOutlineMail,
  HiOutlineViewGrid,
  HiOutlineCreditCard,
  HiOutlineChevronRight
} from 'react-icons/hi';

/**
 * Quick action item configuration data
 */
const QUICK_ACTIONS = [
  {
    id: 'upload-receipt',
    title: 'Upload Receipt',
    description: 'Scan bills & invoices with AI OCR',
    badge: 'Fast Scan',
    path: '/upload',
    icon: HiOutlineDocumentText,
    gradient: 'from-emerald-500/15 via-emerald-500/5 to-transparent',
    borderColor: 'border-emerald-500/30 hover:border-emerald-400/70',
    badgeBg: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    iconColor: 'text-emerald-400',
    glowColor: 'group-hover:shadow-emerald-500/20'
  },
  {
    id: 'connect-gmail',
    title: 'Connect Gmail',
    description: 'Auto-sync digital sub receipts',
    badge: 'Auto Sync',
    path: '/connect-gmail',
    icon: HiOutlineMail,
    gradient: 'from-rose-500/15 via-rose-500/5 to-transparent',
    borderColor: 'border-rose-500/30 hover:border-rose-400/70',
    badgeBg: 'bg-rose-500/20 text-rose-400 border border-rose-500/30',
    iconColor: 'text-rose-400',
    glowColor: 'group-hover:shadow-rose-500/20'
  },
  {
    id: 'go-dashboard',
    title: 'Go to Dashboard',
    description: 'Check financial score & analytics',
    badge: 'Overview',
    path: '/dashboard',
    icon: HiOutlineViewGrid,
    gradient: 'from-blue-500/15 via-blue-500/5 to-transparent',
    borderColor: 'border-blue-500/30 hover:border-blue-400/70',
    badgeBg: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    iconColor: 'text-blue-400',
    glowColor: 'group-hover:shadow-blue-500/20'
  },
  {
    id: 'view-subscriptions',
    title: 'View Subscriptions',
    description: 'Track recurring payments & trials',
    badge: 'Tracker',
    path: '/subscriptions',
    icon: HiOutlineCreditCard,
    gradient: 'from-purple-500/15 via-purple-500/5 to-transparent',
    borderColor: 'border-purple-500/30 hover:border-purple-400/70',
    badgeBg: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
    iconColor: 'text-purple-400',
    glowColor: 'group-hover:shadow-purple-500/20'
  }
];

/**
 * ChatQuickActions — Quick action navigation bar for AI Chat.
 * Renders interactive brand-badged action cards with hover effects.
 */
const ChatQuickActions = ({ onActionClick, className = '' }) => {
  const navigate = useNavigate();

  const handleAction = (action) => {
    if (onActionClick) {
      onActionClick(action.id, action);
    } else if (action.path) {
      navigate(action.path);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Grid container for quick action items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {QUICK_ACTIONS.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.id}
              type="button"
              onClick={() => handleAction(action)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative flex flex-col justify-between p-4 rounded-xl text-left bg-gradient-to-br ${action.gradient} bg-surface/80 border ${action.borderColor} backdrop-blur-md transition-all duration-300 shadow-md ${action.glowColor} hover:shadow-lg`}
            >
              {/* Top row: Icon + Vibrant Badge */}
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-surface-light/60 ${action.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full ${action.badgeBg}`}>
                  {action.badge}
                </span>
              </div>

              {/* Middle row: Action Title */}
              <div className="mt-1">
                <h4 className="text-sm font-semibold text-text-primary group-hover:text-white flex items-center justify-between">
                  {action.title}
                  <HiOutlineChevronRight className="h-4 w-4 text-text-muted opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                </h4>
                <p className="text-xs text-text-muted mt-0.5 line-clamp-1 group-hover:text-text-secondary transition-colors">
                  {action.description}
                </p>
              </div>

              {/* Bottom accent glow bar */}
              <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-b-xl bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

ChatQuickActions.propTypes = {
  onActionClick: PropTypes.func,
  className: PropTypes.string
};

export default ChatQuickActions;
