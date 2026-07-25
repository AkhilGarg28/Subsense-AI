import { cn } from '../../utils/helpers';

/**
 * Loader — Animated loading spinner with size variants.
 * Uses the primary brand color.
 */
const Loader = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-primary/30 border-t-primary',
          sizes[size]
        )}
      />
    </div>
  );
};

export default Loader;
