import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * LedgerRule — Reusable horizontal hairline divider with tick marks
 * Inspired by graph paper, financial ledgers, and measuring scales.
 */
const LedgerRule = ({ label, className = '', showTicks = true }) => {
  return (
    <div className={`relative my-10 w-full overflow-hidden ${className}`}>
      <div className="relative flex items-center justify-between">
        {/* Draw-in Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-[1px] w-full bg-[#F3F1EA]/10 origin-left"
        />

        {/* Centered Label */}
        {label && (
          <div className="absolute left-1/2 -translate-x-1/2 bg-[#0D0F0E] px-4 text-[11px] font-mono font-semibold uppercase tracking-widest text-[#C2A155] border border-[#F3F1EA]/10 rounded-full py-0.5">
            {label}
          </div>
        )}
      </div>

      {/* Tick Marks along the line */}
      {showTicks && (
        <div className="flex justify-between px-2 pt-1 opacity-25">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`w-[1px] bg-[#F3F1EA] ${i % 3 === 0 ? 'h-2' : 'h-1'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

LedgerRule.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  showTicks: PropTypes.bool,
};

export default LedgerRule;
