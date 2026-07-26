import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  HiOutlineTrendingUp,
  HiOutlineSparkles,
  HiOutlineCalendar,
  HiOutlineSearch,
  HiOutlineAdjustments,
  HiOutlineShieldCheck,
  HiOutlineArrowRight,
  HiOutlineLightBulb
} from 'react-icons/hi';

const SUGGESTIONS = [
  {
    id: '1',
    text: 'How much will I spend next month?',
    category: 'Spending',
    icon: HiOutlineTrendingUp,
    accentColor: 'from-cyan-500 to-blue-500',
    tagBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
  },
  {
    id: '2',
    text: 'Which subscriptions should I cancel?',
    category: 'Savings',
    icon: HiOutlineSparkles,
    accentColor: 'from-emerald-500 to-teal-500',
    tagBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
  },
  {
    id: '3',
    text: 'What bills are due this week?',
    category: 'Bills',
    icon: HiOutlineCalendar,
    accentColor: 'from-amber-500 to-orange-500',
    tagBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30'
  },
  {
    id: '4',
    text: 'Find duplicate or unused services',
    category: 'Audit',
    icon: HiOutlineSearch,
    accentColor: 'from-purple-500 to-indigo-500',
    tagBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30'
  },
  {
    id: '5',
    text: 'Optimize my streaming plans',
    category: 'Optimization',
    icon: HiOutlineAdjustments,
    accentColor: 'from-pink-500 to-rose-500',
    tagBg: 'bg-pink-500/10 text-pink-300 border-pink-500/30'
  },
  {
    id: '6',
    text: 'Show my financial health score',
    category: 'Health',
    icon: HiOutlineShieldCheck,
    accentColor: 'from-blue-500 to-indigo-500',
    tagBg: 'bg-blue-500/10 text-blue-300 border-blue-500/30'
  }
];

/**
 * PromptSuggestions Component
 * Suggested question cards grid component with category tags, hover scale animations, and click-to-submit handler
 */
const PromptSuggestions = ({ onSelectPrompt, title, suggestions = SUGGESTIONS, className = '' }) => {
  const handleCardClick = (promptText) => {
    if (onSelectPrompt) {
      onSelectPrompt(promptText);
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto my-4 ${className}`}>
      {/* Header title */}
      <div className="flex items-center gap-2 mb-3 text-slate-300">
        <HiOutlineLightBulb className="w-4 h-4 text-amber-400 animate-pulse" />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title || 'Suggested Questions'}
        </h3>
      </div>

      {/* Grid of 6 Prompt Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {suggestions.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id || index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardClick(item.text)}
              className="group relative flex flex-col justify-between p-3.5 rounded-xl bg-slate-900/70 hover:bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 shadow-md hover:shadow-cyan-500/15 hover:shadow-lg transition-all duration-300 text-left cursor-pointer backdrop-blur-md overflow-hidden"
            >
              {/* Top Row: Category Tag & Icon */}
              <div className="flex items-center justify-between w-full mb-2">
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${item.tagBg}`}>
                  {item.category}
                </span>

                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${item.accentColor} text-white shadow-sm opacity-80 group-hover:opacity-100 transition-opacity`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Card Question Text */}
              <p className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white transition-colors leading-snug my-1">
                {item.text}
              </p>

              {/* Bottom Row: Action hint */}
              <div className="flex items-center justify-end w-full mt-2 pt-1 border-t border-slate-800/40 text-[11px] text-slate-500 group-hover:text-cyan-400 transition-colors">
                <span className="flex items-center gap-1 font-medium">
                  Ask SubSense <HiOutlineArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

PromptSuggestions.propTypes = {
  onSelectPrompt: PropTypes.func,
  title: PropTypes.string,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
      accentColor: PropTypes.string,
      tagBg: PropTypes.string
    })
  ),
  className: PropTypes.string
};

export default PromptSuggestions;
