import { FcGoogle } from 'react-icons/fc';
import { cn } from '../../utils/helpers';

/**
 * GoogleButton — Styled OAuth button for Google sign-in/sign-up.
 */
const GoogleButton = ({
  onClick,
  disabled = false,
  children = 'Continue with Google',
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full flex items-center justify-center gap-3 rounded-xl border border-border/50 bg-surface/50 px-4 py-3 text-sm font-medium text-text-primary',
        'transition-all duration-200',
        'hover:bg-surface hover:border-border-light',
        'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    >
      <FcGoogle className="h-5 w-5" />
      {children}
    </button>
  );
};

export default GoogleButton;
