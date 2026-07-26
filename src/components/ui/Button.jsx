import { cn } from '../../utils/helpers';

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
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-primary from-success to-primary',
    warning: 'border border-warning/35 bg-warning/15 text-warning hover:bg-warning/25',
    danger: 'btn-danger',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  };

  const sizes = {
    sm: 'min-h-10 px-3 text-xs',
    md: 'min-h-12 px-5 text-sm',
    lg: 'min-h-13 px-6 text-base',
    xl: 'min-h-14 px-8 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'disabled:cursor-not-allowed disabled:opacity-50',
        'focus:outline-none focus:ring-4 focus:ring-primary/20',
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
