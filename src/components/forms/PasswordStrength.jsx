import { motion } from 'framer-motion';
import { getPasswordStrength } from '../../utils/validators';

/**
 * PasswordStrength — Visual password strength indicator.
 * Shows 4 animated bars that fill based on password complexity.
 */
const PasswordStrength = ({ password }) => {
  const { score, label, color, textColor } = getPasswordStrength(password);

  if (!password) return null;

  return (
    <div className="space-y-1.5">
      {/* Strength bars */}
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((level) => (
          <motion.div
            key={level}
            className={`h-1 flex-1 rounded-full ${
              level <= score ? color : 'bg-border/50'
            }`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, delay: level * 0.05 }}
            style={{ transformOrigin: 'left' }}
          />
        ))}
      </div>
      {/* Strength label */}
      {label && (
        <p className={`text-xs font-medium ${textColor}`}>{label}</p>
      )}
    </div>
  );
};

export default PasswordStrength;
