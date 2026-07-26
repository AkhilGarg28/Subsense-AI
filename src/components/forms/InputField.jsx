import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { cn } from '../../utils/helpers';

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
    <div className="space-y-1.5 font-sans">
      {label && (
        <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wider text-[#A1A8B5]">
          {label}
          {required && <span className="ml-1 text-[#EF4444]">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <Icon
              className={cn(
                'h-4 w-4 transition-colors',
                showError ? 'text-[#EF4444]' : 'text-[#A1A8B5]'
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
            'w-full rounded-xl border bg-[#121A2F] py-3 px-4 text-sm text-white placeholder-[#64748B] transition-all',
            'focus:border-[#5B8CFF] focus:outline-none focus:ring-2 focus:ring-[#5B8CFF]/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            Icon && 'pl-11',
            showError
              ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20'
              : 'border-white/10 hover:border-white/20',
            className
          )}
          {...props}
        />
      </div>

      <AnimatePresence mode="wait">
        {showError && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-[#EF4444] font-mono"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  touched: PropTypes.bool,
  icon: PropTypes.elementType,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  autoComplete: PropTypes.string,
  className: PropTypes.string,
};

export default InputField;
