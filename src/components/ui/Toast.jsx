import { motion } from 'framer-motion';
import {
  HiOutlineX,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
} from 'react-icons/hi';

/**
 * Toast — Individual toast notification with enter/exit animations.
 * Supports success, error, warning, and info types.
 */
const toastConfig = {
  success: {
    icon: HiOutlineCheckCircle,
    bg: 'bg-success/10',
    border: 'border-success/30',
    iconColor: 'text-success',
  },
  error: {
    icon: HiOutlineExclamationCircle,
    bg: 'bg-danger/10',
    border: 'border-danger/30',
    iconColor: 'text-danger',
  },
  warning: {
    icon: HiOutlineExclamationCircle,
    bg: 'bg-warning/10',
    border: 'border-warning/30',
    iconColor: 'text-warning',
  },
  info: {
    icon: HiOutlineInformationCircle,
    bg: 'bg-primary/10',
    border: 'border-primary/30',
    iconColor: 'text-primary',
  },
};

const Toast = ({ message, type = 'info', onClose }) => {
  const config = toastConfig[type] || toastConfig.info;
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`pointer-events-auto flex items-center gap-3 rounded-xl border ${config.border} ${config.bg} backdrop-blur-xl px-4 py-3 shadow-lg min-w-[300px] max-w-[420px]`}
    >
      <Icon className={`h-5 w-5 flex-shrink-0 ${config.iconColor}`} />
      <p className="flex-1 text-sm font-medium text-text-primary">{message}</p>
      <button
        onClick={onClose}
        className="rounded-lg p-1 text-text-muted hover:bg-surface hover:text-text-primary transition-colors"
        aria-label="Dismiss notification"
      >
        <HiOutlineX className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

export default Toast;
