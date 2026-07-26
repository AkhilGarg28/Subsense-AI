import { cn } from '../../utils/helpers';

const Container = ({ children, className = '', size = 'default', ...props }) => {
  const sizes = {
    sm: 'max-w-3xl',
    default: 'max-w-[1440px]',
    lg: 'max-w-[1440px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn('mx-auto w-full px-5 sm:px-8 lg:px-10', sizes[size], className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
