import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

/**
 * SubmitButton — Gradient submit button with loading state.
 * Shows spinner and "Please wait..." when isLoading is true.
 */
const SubmitButton = ({
  children,
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <motion.button
      type="submit"
      disabled={disabled || isLoading}
      whileHover={!disabled && !isLoading ? { scale: 1.01 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.99 } : {}}
      className={cn(
        'w-full relative flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white',
        'bg-gradient-to-r from-primary to-secondary',
        'transition-all duration-200',
        'hover:shadow-glow',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          <span>Please wait...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default SubmitButton;
