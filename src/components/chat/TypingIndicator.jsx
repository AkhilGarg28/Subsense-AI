import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';

const DEFAULT_STAGES = [
  'SubSense AI is analyzing your cashflow...',
  'Parsing recurring debits...',
  'Generating insights...',
  'Auditing subscription patterns...',
  'Calculating potential savings...'
];

/**
 * TypingIndicator Component
 * Animated typing indicator with glowing AI robot avatar, 3 pulsing dots, and dynamic stage text
 */
const TypingIndicator = ({ stageText, customStages, className = '' }) => {
  const stages = customStages || DEFAULT_STAGES;
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  useEffect(() => {
    if (stageText) return; // Don't auto-cycle if explicit stageText prop is provided

    const interval = setInterval(() => {
      setCurrentStageIdx((prev) => (prev + 1) % stages.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [stageText, stages.length]);

  const activeText = stageText || stages[currentStageIdx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className={`flex items-center gap-3 my-3 ${className}`}
    >
      {/* Glowing AI Robot Avatar */}
      <div className="relative shrink-0">
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 opacity-75 blur-sm animate-pulse" />
        <div className="relative w-9 h-9 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/20">
          <FaRobot className="w-4 h-4 text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
        </div>
      </div>

      {/* Typing Bubble Container */}
      <div className="flex flex-col items-start bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 rounded-2xl rounded-tl-xs px-4 py-3 shadow-xl shadow-cyan-950/20 max-w-[85%] sm:max-w-[70%]">
        <div className="flex items-center gap-3">
          {/* Animated 3 Bouncing Dots */}
          <div className="flex items-center gap-1.5 py-1">
            {[0, 1, 2].map((dotIndex) => (
              <motion.span
                key={dotIndex}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400 shadow-sm shadow-cyan-400/50"
                animate={{
                  y: [0, -6, 0],
                  scale: [1, 1.25, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: 'loop',
                  delay: dotIndex * 0.18,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>

          <div className="w-[1px] h-4 bg-slate-800" />

          {/* Dynamic Stage Text with Smooth AnimatePresence */}
          <div className="overflow-hidden relative min-h-[20px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeText}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5 text-xs text-slate-300 font-medium tracking-wide"
              >
                <HiOutlineSparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 animate-spin-slow" />
                <span className="truncate">{activeText}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

TypingIndicator.propTypes = {
  stageText: PropTypes.string,
  customStages: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string
};

export default TypingIndicator;
