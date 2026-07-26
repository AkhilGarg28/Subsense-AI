import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { cn } from '../../utils/helpers';

const AuthCard = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'w-full max-w-[440px] mx-auto',
        'rounded-2xl border border-white/10',
        'bg-[#171F2F]/90 backdrop-blur-2xl',
        'shadow-2xl',
        'p-8 sm:p-10',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

AuthCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default AuthCard;
