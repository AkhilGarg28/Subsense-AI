import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

/**
 * ErrorMessage — Animated error alert box.
 * Slides in with a fade animation when visible.
 */
const ErrorMessage = ({ message, visible = true }) => {
  return (
    <AnimatePresence>
      {visible && message && (
        <motion.div
          initial={{ opacity: 0, y: -8, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -8, height: 0 }}
          transition={{ duration: 0.3 }}
          role="alert"
          className="flex items-center gap-2.5 rounded-xl border border-danger/20 bg-danger/10 px-4 py-3"
        >
          <HiOutlineExclamationCircle className="h-5 w-5 flex-shrink-0 text-danger" />
          <p className="text-sm text-danger">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorMessage;
