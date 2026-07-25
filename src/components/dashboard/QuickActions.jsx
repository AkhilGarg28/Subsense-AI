import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineDocumentAdd,
  HiOutlineMail,
  HiOutlineSparkles,
  HiOutlineCreditCard,
  HiOutlineChevronRight,
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';

/**
 * QuickActions — Bar featuring action buttons for quick navigation & AI tools.
 * Includes "Upload Receipt", "Connect Gmail", "Ask AI Copilot", and "View Subscriptions".
 * Features vibrant icons, gradient borders, and smooth hover state micro-interactions.
 */
const QuickActions = ({
  onUploadReceipt,
  onConnectGmail,
  onAskAICopilot,
  onViewSubscriptions,
  className = '',
  compact = false,
}) => {
  const navigate = useNavigate();

  const handleAction = (customHandler, path) => {
    if (customHandler) {
      customHandler();
    } else if (path) {
      navigate(path);
    }
  };

  const actions = [
    {
      id: 'upload-receipt',
      label: 'Upload Receipt',
      description: 'Scan & parse with AI',
      icon: HiOutlineDocumentAdd,
      onClick: () => handleAction(onUploadReceipt, '/upload-receipt'),
      bgGradient: 'from-emerald-500/15 via-teal-500/10 to-transparent',
      borderColor: 'border-emerald-500/30 hover:border-emerald-400/60',
      iconBg: 'bg-emerald-500/20 text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white',
      shadowGlow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]',
      badge: 'OCR AI',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 'connect-gmail',
      label: 'Connect Gmail',
      description: 'Auto-detect subscriptions',
      icon: HiOutlineMail,
      onClick: () => handleAction(onConnectGmail, '/notifications'),
      bgGradient: 'from-rose-500/15 via-red-500/10 to-transparent',
      borderColor: 'border-rose-500/30 hover:border-rose-400/60',
      iconBg: 'bg-rose-500/20 text-rose-400 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white',
      shadowGlow: 'hover:shadow-[0_0_20px_rgba(244,63,94,0.25)]',
      badge: 'Auto Sync',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    },
    {
      id: 'ask-ai',
      label: 'Ask AI Copilot',
      description: 'Optimize spending & savings',
      icon: HiOutlineSparkles,
      onClick: () => handleAction(onAskAICopilot, '/ai-chat'),
      bgGradient: 'from-purple-500/15 via-indigo-500/10 to-transparent',
      borderColor: 'border-purple-500/30 hover:border-purple-400/60',
      iconBg: 'bg-purple-500/20 text-purple-400 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white',
      shadowGlow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]',
      badge: 'Live Assistant',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    },
    {
      id: 'view-subs',
      label: 'View Subscriptions',
      description: 'Manage 14 active plans',
      icon: HiOutlineCreditCard,
      onClick: () => handleAction(onViewSubscriptions, '/subscriptions'),
      bgGradient: 'from-blue-500/15 via-sky-500/10 to-transparent',
      borderColor: 'border-blue-500/30 hover:border-blue-400/60',
      iconBg: 'bg-blue-500/20 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white',
      shadowGlow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]',
      badge: '14 Active',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    },
  ];

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'grid gap-3.5',
          compact
            ? 'grid-cols-2 sm:grid-cols-4'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        )}
      >
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              type="button"
              onClick={action.onClick}
              className={cn(
                'group relative flex items-center justify-between overflow-hidden rounded-2xl border p-4 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1',
                'bg-slate-900/80 hover:bg-slate-800/90',
                `bg-gradient-to-br ${action.bgGradient}`,
                action.borderColor,
                action.shadowGlow
              )}
            >
              {/* Subtle top glow bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex items-center gap-3.5 z-10 min-w-0">
                <div
                  className={cn(
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 shadow-inner',
                    action.iconBg
                  )}
                >
                  <Icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-6" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-text-primary group-hover:text-white">
                      {action.label}
                    </span>
                  </div>
                  {!compact && (
                    <p className="truncate text-xs text-text-muted group-hover:text-text-secondary">
                      {action.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0 z-10">
                {compact && action.badge && (
                  <span
                    className={cn(
                      'hidden xl:inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold',
                      action.badgeColor
                    )}
                  >
                    {action.badge}
                  </span>
                )}
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface/40 text-text-muted transition-all duration-300 group-hover:bg-white/10 group-hover:text-white group-hover:translate-x-0.5">
                  <HiOutlineChevronRight className="h-4 w-4" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

QuickActions.propTypes = {
  onUploadReceipt: PropTypes.func,
  onConnectGmail: PropTypes.func,
  onAskAICopilot: PropTypes.func,
  onViewSubscriptions: PropTypes.func,
  className: PropTypes.string,
  compact: PropTypes.bool,
};

export default QuickActions;
