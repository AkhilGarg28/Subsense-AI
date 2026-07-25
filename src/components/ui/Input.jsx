import { cn } from '../../utils/helpers';

/**
 * Input — Reusable form input with label, error state, and icon support.
 */
const Input = ({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  className = '',
  required = false,
  disabled = false,
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-text-secondary"
        >
          {label}
          {required && <span className="ml-1 text-danger">*</span>}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative">
        {/* Leading icon */}
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="h-5 w-5 text-text-muted" />
          </div>
        )}

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={cn(
            'w-full rounded-lg border bg-surface px-4 py-2.5 text-sm text-text-primary',
            'placeholder:text-text-muted',
            'transition-all duration-200',
            'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-danger focus:border-danger focus:ring-danger/20'
              : 'border-border hover:border-border-light',
            Icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="text-xs text-danger">{error}</p>
      )}
    </div>
  );
};

export default Input;
