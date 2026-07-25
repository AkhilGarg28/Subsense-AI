import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

/**
 * AuthCard — Glassmorphism card wrapper for authentication forms.
 * Animates in with a smooth fade + scale + slide-up entrance.
 */
const AuthCard = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'w-full max-w-[440px] mx-auto',
        'rounded-2xl border border-glass-border',
        'bg-glass backdrop-blur-2xl',
        'shadow-glass',
        'p-8 sm:p-10',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default AuthCard;
