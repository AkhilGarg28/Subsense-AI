import { cn } from '../../utils/helpers';

const Card = ({
  children,
  className = '',
  hover = false,
  padding = 'lg',
  ...props
}) => {
  const paddings = {
    none: '!p-0',
    sm: '!p-4',
    md: '!p-6',
    lg: '!p-8',
  };

  return (
    <div
      className={cn(
        'app-card',
        paddings[padding],
        hover && 'cursor-pointer hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Header = ({ children, className = '' }) => (
  <div className={cn('mb-6 border-b border-white/10 pb-5', className)}>
    {children}
  </div>
);

Card.Title = ({ children, className = '' }) => (
  <h3 className={cn('text-[22px] font-extrabold leading-tight text-white', className)}>
    {children}
  </h3>
);

Card.Footer = ({ children, className = '' }) => (
  <div className={cn('mt-6 border-t border-white/10 pt-5', className)}>
    {children}
  </div>
);

export default Card;
