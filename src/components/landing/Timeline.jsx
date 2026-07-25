import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineCloudUpload,
  HiOutlineChip,
  HiOutlineTrendingUp,
  HiOutlineLightningBolt,
  HiOutlineCheck,
} from 'react-icons/hi';

/**
 * Timeline — Interactive "How It Works" 4-step process component with Framer Motion line fill animation.
 * Showcases the end-to-end journey of SubSense AI from account connection to autonomous savings.
 */
const stepsList = [
  {
    step: '01',
    title: 'Upload Receipt or Connect Gmail',
    description:
      'Upload PDF invoices, snap a photo of physical receipts, or securely connect your Gmail for automated background sync.',
    highlights: ['Multi-format PDF upload', 'Camera receipt snap', 'Gmail auto-sync'],
    icon: HiOutlineCloudUpload,
    color: 'from-blue-500 to-cyan-500',
    accentHex: '#3B82F6',
  },
  {
    step: '02',
    title: 'AI Understands Bills',
    description:
      'Our fine-tuned AI automatically extracts vendor names, billing frequency, tax amounts, line items, and hidden renewal terms.',
    highlights: ['Deep OCR extraction', 'Renewal terms detection', 'Auto-tax categorization'],
    icon: HiOutlineChip,
    color: 'from-indigo-500 to-purple-500',
    accentHex: '#6366F1',
  },
  {
    step: '03',
    title: 'Predict Future Expenses',
    description:
      'Forecasts upcoming debits and subscription renewals 30 days in advance so you can optimize liquidity and prevent overdrafts.',
    highlights: ['30-day debit forecast', 'Overdraft guard', 'Recurring spend trends'],
    icon: HiOutlineTrendingUp,
    color: 'from-emerald-500 to-teal-500',
    accentHex: '#10B981',
  },
  {
    step: '04',
    title: 'Receive Smart Financial Insights',
    description:
      'Receive one-click subscription cancellation options, trial expiration warnings, and automated bill negotiation prompts.',
    highlights: ['1-click cancellations', 'Trial expiration alerts', 'Negotiation scripts'],
    icon: HiOutlineLightningBolt,
    color: 'from-amber-500 to-orange-500',
    accentHex: '#F59E0B',
  },
];

const Timeline = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-secondary/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-primary/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-xs font-semibold tracking-wide uppercase"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
          </span>
          How It Works
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight"
        >
          Four simple steps to <br className="hidden sm:block" />
          <span className="gradient-text">financial peace of mind</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
        >
          SubSense AI automates the tedious work of reading receipts, tracking renewal dates, and forecasting your budget.
        </motion.p>
      </div>

      {/* Timeline Section */}
      <div className="relative">
        {/* Vertical Line Container for Desktop & Mobile */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Animated Vertical Line (Desktop: center, Mobile: left aligned) */}
          <div className="absolute left-6 md:left-1/2 top-8 bottom-8 w-1 -translate-x-1/2 bg-surface-light/40 rounded-full overflow-hidden -z-10">
            {/* Framer Motion Line Fill Animation based on active step scroll/click */}
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-secondary to-success origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: (activeStep + 1) / stepsList.length }}
              animate={{ scaleY: (activeStep + 1) / stepsList.length }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              style={{ height: '100%' }}
            />
          </div>

          {/* Steps List */}
          <div className="space-y-12 md:space-y-16">
            {stepsList.map((stepItem, index) => {
              const Icon = stepItem.icon;
              const isEven = index % 2 === 0;
              const isActive = activeStep === index;

              return (
                <motion.div
                  key={stepItem.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  onClick={() => setActiveStep(index)}
                  className={`relative flex flex-col md:flex-row items-start md:items-center cursor-pointer group ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Step Content Card */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-8">
                    <div
                      className={`glass-card p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                        isActive
                          ? 'border-primary/50 shadow-glow bg-surface/90 scale-[1.02]'
                          : 'border-glass-border/70 hover:border-border-light bg-surface/60 group-hover:bg-surface/80'
                      }`}
                    >
                      {/* Step Badge & Icon Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full border bg-gradient-to-r ${stepItem.color} bg-clip-text text-transparent border-primary/20 bg-primary/5`}
                        >
                          Step {stepItem.step}
                        </span>

                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-light/60 border border-border/50 text-primary group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                        {stepItem.title}
                      </h3>

                      {/* Description */}
                      <p className="text-text-secondary text-sm leading-relaxed mb-5">
                        {stepItem.description}
                      </p>

                      {/* Highlight Pills */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30">
                        {stepItem.highlights.map((highlight, hIdx) => (
                          <span
                            key={hIdx}
                            className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-surface-light/40 text-text-secondary border border-border/40"
                          >
                            <HiOutlineCheck className="w-3 h-3 text-success" />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Central Node / Button */}
                  <div className="absolute left-6 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveStep(index);
                      }}
                      className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                        isActive
                          ? 'bg-primary text-white border-primary shadow-glow ring-4 ring-primary/20'
                          : 'bg-surface text-text-secondary border-border-light hover:border-primary hover:text-text-primary'
                      }`}
                    >
                      <span className="text-sm font-bold">{stepItem.step}</span>
                    </motion.button>
                  </div>

                  {/* Spacer for opposite column on Desktop */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Interactive Step Indicator Pills */}
        <div className="mt-16 flex items-center justify-center gap-2">
          {stepsList.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeStep === idx
                  ? 'w-10 bg-gradient-to-r from-primary to-secondary'
                  : 'w-2.5 bg-surface-light hover:bg-border-light'
              }`}
              aria-label={`Go to step ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
