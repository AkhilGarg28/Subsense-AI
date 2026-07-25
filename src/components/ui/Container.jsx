import { cn } from '../../utils/helpers';

/**
 * Container — Responsive content container with max-width constraint.
 * Centers content with consistent horizontal padding.
 */
const Container = ({ children, className = '', size = 'default', ...props }) => {
  const sizes = {
    sm: 'max-w-3xl',
    default: 'max-w-7xl',
    lg: 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
