import React from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineDocumentSearch,
  HiOutlineRefresh,
  HiOutlineTrendingUp,
  HiOutlineSparkles,
  HiOutlineChartBar,
  HiOutlineChatAlt2,
} from 'react-icons/hi';

/**
 * Features — Landing page feature grid highlighting SubSense AI's core capabilities.
 * Features glassmorphism cards, subtle gradient borders on hover, icons, and staggered entrance animations.
 */
const featureList = [
  {
    id: 'bill-scanner',
    icon: HiOutlineDocumentSearch,
    title: 'AI Bill Scanner',
    description: 'Automatically parses invoices, receipts, and PDF bills in seconds.',
    badge: 'Instant OCR',
    gradient: 'from-blue-500/20 via-indigo-500/20 to-purple-500/20',
    iconColor: 'text-blue-400',
    borderColor: 'group-hover:border-blue-500/50',
  },
  {
    id: 'subscription-detection',
    icon: HiOutlineRefresh,
    title: 'Subscription Detection',
    description: 'Identifies recurring charges, trial traps, and price hikes across all accounts.',
    badge: 'Auto-Audit',
    gradient: 'from-indigo-500/20 via-sky-500/20 to-blue-500/20',
    iconColor: 'text-indigo-400',
    borderColor: 'group-hover:border-indigo-500/50',
  },
  {
    id: 'expense-prediction',
    icon: HiOutlineTrendingUp,
    title: 'Expense Prediction',
    description: 'ML model forecasts your end-of-month cashflow with 98% accuracy.',
    badge: '98% Accuracy',
    gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
    iconColor: 'text-emerald-400',
    borderColor: 'group-hover:border-emerald-500/50',
  },
  {
    id: 'smart-recommendations',
    icon: HiOutlineSparkles,
    title: 'Smart Recommendations',
    description: 'Get personalized actionable tips to optimize recurring bills and negotiate rates.',
    badge: 'AI Insights',
    gradient: 'from-amber-500/20 via-orange-500/20 to-yellow-500/20',
    iconColor: 'text-amber-400',
    borderColor: 'group-hover:border-amber-500/50',
  },
  {
    id: 'financial-health-score',
    icon: HiOutlineChartBar,
    title: 'Financial Health Score',
    description: 'Dynamic 0-100 score analyzing liquidity, recurring ratio, and savings buffer.',
    badge: 'Real-time 0-100',
    gradient: 'from-purple-500/20 via-fuchsia-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
    borderColor: 'group-hover:border-purple-500/50',
  },
  {
    id: 'ai-chat-assistant',
    icon: HiOutlineChatAlt2,
    title: 'AI Chat Assistant',
    description: 'Query your finances in natural language: "How much did I spend on SaaS this month?"',
    badge: 'Natural NLP',
    gradient: 'from-cyan-500/20 via-blue-500/20 to-indigo-500/20',
    iconColor: 'text-cyan-400',
    borderColor: 'group-hover:border-cyan-500/50',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const Features = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase"
        >
          <HiOutlineSparkles className="w-4 h-4 text-primary animate-pulse" />
          Intelligent Financial Control
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight"
        >
          Cutting-edge features for <br className="hidden sm:block" />
          <span className="gradient-text">effortless subscription management</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
        >
          SubSense AI combines deep invoice OCR, predictive cashflow modeling, and autonomous cost optimization to put your finances on autopilot.
        </motion.p>
      </div>

      {/* Grid of 6 Feature Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {featureList.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative h-full rounded-2xl p-[1px] transition-all duration-500 bg-gradient-to-b from-border/50 via-border/20 to-transparent hover:from-primary/40 hover:via-secondary/40 hover:to-primary/20 hover:shadow-glow"
            >
              {/* Inner Glass Container */}
              <div className="relative h-full flex flex-col justify-between rounded-[15px] bg-surface/80 backdrop-blur-xl p-6 lg:p-7 border border-glass-border/60 transition-colors group-hover:bg-surface/90">
                {/* Background Subtle Gradient Patch */}
                <div
                  className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${feature.gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-surface-light/50 border border-border/50 group-hover:scale-110 group-hover:border-primary/40 transition-all duration-300 shadow-sm ${feature.iconColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface-light/40 text-text-secondary border border-border/40 group-hover:text-text-primary transition-colors">
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors duration-200">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle Interactive Footer link indicator */}
                <div className="flex items-center text-xs font-semibold text-text-muted group-hover:text-primary transition-colors pt-4 border-t border-border/30">
                  <span>Learn more</span>
                  <svg
                    className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Features;
