import { cn } from '../../utils/helpers';

/**
 * Card — Glassmorphism card component with optional header and footer.
 * Uses dark glass effect consistent with the SubSense AI theme.
 */
const Card = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  ...props
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'glass-card',
        paddings[padding],
        hover && 'transition-all duration-300 hover:scale-[1.02] hover:shadow-glow cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Header sub-component
Card.Header = ({ children, className = '' }) => (
  <div className={cn('mb-4 border-b border-glass-border pb-4', className)}>
    {children}
  </div>
);

// Card Title sub-component
Card.Title = ({ children, className = '' }) => (
  <h3 className={cn('text-lg font-semibold text-text-primary', className)}>
    {children}
  </h3>
);

// Card Footer sub-component
Card.Footer = ({ children, className = '' }) => (
  <div className={cn('mt-4 border-t border-glass-border pt-4', className)}>
    {children}
  </div>
);

export default Card;
