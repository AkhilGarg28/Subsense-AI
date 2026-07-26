import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useInView, motion, animate } from 'framer-motion';

/**
 * Odometer — Restrained financial count-up animation for stat numbers.
 * Enforces IBM Plex Mono tabular numerals.
 */
const Odometer = ({
  value = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const targetNum = typeof value === 'number' ? value : parseFloat(value) || 0;
      const controls = animate(0, targetNum, {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplayValue(latest);
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  const formattedValue =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.round(displayValue).toLocaleString();

  return (
    <span ref={ref} className={`font-mono tabular-nums ${className}`}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};

Odometer.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  decimals: PropTypes.number,
  className: PropTypes.string,
};

export default Odometer;
