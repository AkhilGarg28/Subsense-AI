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
import { LedgerRule } from '../common';

const featureList = [
  {
    id: 'bill-scanner',
    icon: HiOutlineDocumentSearch,
    title: 'AI Bill Scanner',
    description: 'Automatically parses invoices, receipts, and PDF bills in seconds.',
    badge: 'Instant OCR',
  },
  {
    id: 'subscription-detection',
    icon: HiOutlineRefresh,
    title: 'Subscription Detection',
    description: 'Identifies recurring charges, trial traps, and price hikes across all accounts.',
    badge: 'Auto-Audit',
  },
  {
    id: 'expense-prediction',
    icon: HiOutlineTrendingUp,
    title: 'Expense Prediction',
    description: 'ML model forecasts your end-of-month cashflow with 98% accuracy.',
    badge: '98% Accuracy',
  },
  {
    id: 'smart-recommendations',
    icon: HiOutlineSparkles,
    title: 'Smart Recommendations',
    description: 'Get personalized actionable tips to optimize recurring bills and negotiate rates.',
    badge: 'AI Insights',
  },
  {
    id: 'financial-health-score',
    icon: HiOutlineChartBar,
    title: 'Financial Health Score',
    description: 'Dynamic 0-100 score analyzing liquidity, recurring ratio, and savings buffer.',
    badge: 'Real-time 0-100',
  },
  {
    id: 'ai-chat-assistant',
    icon: HiOutlineChatAlt2,
    title: 'AI Chat Assistant',
    description: 'Query your finances in natural language: "How much did I spend on SaaS this month?"',
    badge: 'Natural NLP',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const Features = () => {
  return (
    <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <LedgerRule label="CORE CAPABILITIES" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#F3F1EA]/10 bg-[#171A18] text-[#C2A155] text-xs font-mono tracking-widest uppercase"
        >
          <span>INTELLIGENT FINANCIAL CONTROL</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#F3F1EA] tracking-tight"
        >
          Cutting-edge features for <br className="hidden sm:block" />
          <span className="text-[#C2A155]">effortless subscription management</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#96988F] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-sans"
        >
          SubSense AI combines deep invoice OCR, predictive cashflow modeling, and autonomous cost optimization to put your finances on autopilot.
        </motion.p>
      </div>

      {/* Grid of 6 Flat Charcoal Feature Cards */}
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
              className="group relative h-full rounded-xl border border-[#F3F1EA]/10 bg-[#171A18] p-6 lg:p-7 transition-colors hover:border-[#C2A155]/40 flex flex-col justify-between"
            >
              <div>
                {/* Header: Icon & Monospace Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0D0F0E] border border-[#F3F1EA]/10 text-[#C2A155]">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-mono font-medium px-2.5 py-1 rounded bg-[#0D0F0E] text-[#96988F] border border-[#F3F1EA]/10">
                    [{feature.badge}]
                  </span>
                </div>

                {/* Title — Fraunces Serif */}
                <h3 className="text-lg font-display font-bold text-[#F3F1EA] mb-2 group-hover:text-[#C2A155] transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-[#96988F] text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                  {feature.description}
                </p>
              </div>

              {/* Monospace Indicator */}
              <div className="flex items-center text-xs font-mono text-[#96988F] group-hover:text-[#C2A155] transition-colors pt-4 border-t border-[#F3F1EA]/10">
                <span>View Specification →</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Features;
