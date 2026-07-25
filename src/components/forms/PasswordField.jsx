import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineLockClosed } from 'react-icons/hi';
import PasswordStrength from './PasswordStrength';
import { cn } from '../../utils/helpers';

/**
 * PasswordField — Password input with show/hide toggle,
 * optional strength indicator, and animated error state.
 */
const PasswordField = ({
  label,
  id,
  name,
  placeholder = 'Enter your password',
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  disabled = false,
  showStrength = false,
  autoComplete,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const showError = touched && error;

  return (
    <div className="space-y-1.5">
      {/* Label */}
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-text-secondary">
          {label}
          {required && <span className="ml-1 text-danger">*</span>}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative">
        {/* Lock icon */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <HiOutlineLockClosed
            className={cn(
              'h-[18px] w-[18px] transition-colors',
              showError ? 'text-danger' : 'text-text-muted'
            )}
          />
        </div>

        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={showError ? 'true' : 'false'}
          aria-describedby={showError ? `${id}-error` : undefined}
          className={cn(
            'w-full rounded-xl border bg-surface/80 pl-11 pr-12 py-3 text-sm text-text-primary',
            'placeholder:text-text-muted/60',
            'transition-all duration-200',
            'focus:bg-surface focus:outline-none focus:ring-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            showError
              ? 'border-danger/50 focus:border-danger focus:ring-danger/20'
              : 'border-border/50 hover:border-border-light focus:border-primary focus:ring-primary/20',
            className
          )}
          {...props}
        />

        {/* Show/Hide toggle */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-text-muted hover:text-text-secondary transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {showPassword ? (
            <HiOutlineEyeOff className="h-[18px] w-[18px]" />
          ) : (
            <HiOutlineEye className="h-[18px] w-[18px]" />
          )}
        </button>
      </div>

      {/* Password strength indicator */}
      {showStrength && value && <PasswordStrength password={value} />}

      {/* Animated error message */}
      <AnimatePresence mode="wait">
        {showError && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-danger"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PasswordField;
