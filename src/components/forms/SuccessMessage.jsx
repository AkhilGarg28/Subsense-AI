import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineCheckCircle } from 'react-icons/hi';

/**
 * SuccessMessage — Animated success alert box.
 * Slides in with a fade animation when visible.
 */
const SuccessMessage = ({ message, visible = true }) => {
  return (
    <AnimatePresence>
      {visible && message && (
        <motion.div
          initial={{ opacity: 0, y: -8, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -8, height: 0 }}
          transition={{ duration: 0.3 }}
          role="status"
          className="flex items-center gap-2.5 rounded-xl border border-success/20 bg-success/10 px-4 py-3"
        >
          <HiOutlineCheckCircle className="h-5 w-5 flex-shrink-0 text-success" />
          <p className="text-sm text-success">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessMessage;
