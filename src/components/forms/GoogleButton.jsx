import { FcGoogle } from 'react-icons/fc';
import PropTypes from 'prop-types';
import { cn } from '../../utils/helpers';

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
        'w-full h-12 flex items-center justify-center gap-3 rounded-[14px] border border-white/10 bg-[#121A2F] text-sm font-semibold text-white',
        'transition-all duration-200 cursor-pointer',
        'hover:bg-[#1E293B] hover:border-white/20',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    >
      <FcGoogle className="h-5 w-5" />
      {children}
    </button>
  );
};

GoogleButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default GoogleButton;
