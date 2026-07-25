import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/helpers';

/**
 * InputField — Reusable form input with label, icon, animated error,
 * and proper accessibility attributes.
 */
const InputField = ({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  icon: Icon,
  required = false,
  disabled = false,
  autoComplete,
  className = '',
  ...props
}) => {
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
        {/* Leading icon */}
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <Icon
              className={cn(
                'h-[18px] w-[18px] transition-colors',
                showError ? 'text-danger' : 'text-text-muted'
              )}
            />
          </div>
        )}

        <input
          id={id}
          name={name}
          type={type}
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
            'w-full rounded-xl border bg-surface/80 px-4 py-3 text-sm text-text-primary',
            'placeholder:text-text-muted/60',
            'transition-all duration-200',
            'focus:bg-surface focus:outline-none focus:ring-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            Icon && 'pl-11',
            showError
              ? 'border-danger/50 focus:border-danger focus:ring-danger/20'
              : 'border-border/50 hover:border-border-light focus:border-primary focus:ring-primary/20',
            className
          )}
          {...props}
        />
      </div>

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

export default InputField;
