import { cn } from '../../utils/helpers';

/**
 * Button — Reusable button component with multiple variants and sizes.
 * Supports primary, secondary, success, warning, danger, outline, and ghost variants.
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) => {
  // Variant styles
  const variants = {
    primary: 'bg-primary hover:bg-primary-hover text-white shadow-sm',
    secondary: 'bg-secondary hover:bg-secondary-hover text-white shadow-sm',
    success: 'bg-success hover:bg-success-hover text-white shadow-sm',
    warning: 'bg-warning hover:bg-warning-hover text-white shadow-sm',
    danger: 'bg-danger hover:bg-danger-hover text-white shadow-sm',
    outline: 'border border-border text-text-secondary hover:bg-surface hover:text-text-primary',
    ghost: 'text-text-secondary hover:bg-surface hover:text-text-primary',
  };

  // Size styles
  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg',
    xl: 'px-8 py-4 text-lg rounded-xl',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
