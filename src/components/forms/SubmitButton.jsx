import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { cn } from '../../utils/helpers';

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
        'w-full h-12 relative flex items-center justify-center gap-2 rounded-[14px] px-6 text-sm font-bold text-white',
        'gradient-primary shadow-glow-blue',
        'transition-all duration-200 cursor-pointer',
        'disabled:cursor-not-allowed disabled:opacity-60',
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

SubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default SubmitButton;
