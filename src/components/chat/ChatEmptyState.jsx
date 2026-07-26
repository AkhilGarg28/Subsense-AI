import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';
import {
  HiOutlineSparkles,
  HiOutlineTrendingUp,
  HiOutlineCalendar,
  HiOutlineExclamationCircle,
  HiOutlineCreditCard,
  HiOutlineArrowRight,
  HiOutlineLightningBolt,
  HiOutlineSearchCircle
} from 'react-icons/hi';

/**
 * Suggested Prompts dataset organized by financial analysis categories
 */
const SUGGESTED_PROMPTS = [
  {
    id: 'top-subs',
    category: 'Subscription Audit',
    icon: HiOutlineCreditCard,
    prompt: 'What are my top 3 highest subscriptions by cost this month?',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
  },
  {
    id: 'upcoming-bills',
    category: 'Bill Reminders',
    icon: HiOutlineCalendar,
    prompt: 'Which upcoming bills or renewals are due in the next 14 days?',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
  },
  {
    id: 'savings-finder',
    category: 'Money Saving',
    icon: HiOutlineLightningBolt,
    prompt: 'Identify unused or duplicate services I can cancel to save money',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  {
    id: 'cashflow-forecast',
    category: 'Cashflow Forecast',
    icon: HiOutlineTrendingUp,
    prompt: 'Forecast my total recurring subscription expenses for next quarter',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  },
  {
    id: 'inbox-scan',
    category: 'Inbox Intelligence',
    icon: HiOutlineSearchCircle,
    prompt: 'Scan my receipts for price hikes or unexpected plan renewals',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  },
  {
    id: 'health-check',
    category: 'Financial Health',
    icon: HiOutlineExclamationCircle,
    prompt: 'Give me a summary of my financial health score and active plans',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  }
];

/**
 * ChatEmptyState — Empty chat state hero component for SubSense AI.
 * Displays glowing robot icon, title, subtitle, and an integrated grid of suggested prompts.
 */
const ChatEmptyState = ({ onSelectPrompt, className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center text-center px-4 py-8 max-w-4xl mx-auto ${className}`}>
      
      {/* Background Glowing Ambient Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-tr from-primary/30 via-purple-600/30 to-blue-400/20 rounded-full blur-3xl opacity-70 pointer-events-none -z-10 animate-pulse-glow" />

      {/* Hero Robot Avatar */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="relative mb-6"
      >
        {/* Outer Glow Ring */}
        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 opacity-60 blur-lg animate-pulse" />
        
        {/* Main Robot Badge Icon */}
        <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white shadow-2xl border border-white/20">
          <FaRobot className="w-10 h-10 transform hover:rotate-12 transition-transform duration-300 drop-shadow-md" />
          
          {/* Decorative Sparkle Badge */}
          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md border-2 border-background">
            <HiOutlineSparkles className="h-3.5 w-3.5" />
          </span>
        </div>
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2"
      >
        Start Your Financial Conversation
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="text-sm sm:text-base text-text-secondary max-w-xl leading-relaxed mb-8"
      >
        Ask anything about your subscriptions, upcoming bills, or cashflow forecasts.
      </motion.p>

      {/* Integrated Prompt Suggestions Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full"
      >
        <div className="flex items-center justify-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
          <HiOutlineSparkles className="h-4 w-4 text-primary" />
          <span>Suggested Prompts to Get Started</span>
        </div>

        {/* Prompt Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-left">
          {SUGGESTED_PROMPTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => onSelectPrompt && onSelectPrompt(item.prompt)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.25 + index * 0.05 }}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex flex-col justify-between p-4 rounded-xl bg-surface/80 hover:bg-surface border border-border hover:border-primary/50 backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/10"
              >
                <div>
                  {/* Category Header Tag */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${item.badgeColor}`}>
                      <Icon className="h-3.5 w-3.5" />
                      {item.category}
                    </span>
                  </div>

                  {/* Prompt Text */}
                  <p className="text-xs sm:text-sm font-medium text-text-primary group-hover:text-white leading-snug">
                    "{item.prompt}"
                  </p>
                </div>

                {/* Bottom Action Hint */}
                <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[11px] text-text-muted group-hover:text-primary transition-colors">
                  <span>Ask SubSense AI</span>
                  <HiOutlineArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

ChatEmptyState.propTypes = {
  onSelectPrompt: PropTypes.func,
  className: PropTypes.string
};

export default ChatEmptyState;
