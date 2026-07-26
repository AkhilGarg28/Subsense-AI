import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineCloudUpload,
  HiOutlineChip,
  HiOutlineTrendingUp,
  HiOutlineLightningBolt,
  HiOutlineCheck,
} from 'react-icons/hi';
import { LedgerRule } from '../common';

const stepsList = [
  {
    step: '01',
    title: 'Upload Receipt or Connect Gmail',
    description:
      'Upload PDF invoices, snap a photo of physical receipts, or securely connect your Gmail for automated background sync.',
    highlights: ['Multi-format PDF upload', 'Camera receipt snap', 'Gmail auto-sync'],
    icon: HiOutlineCloudUpload,
  },
  {
    step: '02',
    title: 'AI Understands Bills',
    description:
      'Our fine-tuned AI automatically extracts vendor names, billing frequency, tax amounts, line items, and hidden renewal terms.',
    highlights: ['Deep OCR extraction', 'Renewal terms detection', 'Auto-tax categorization'],
    icon: HiOutlineChip,
  },
  {
    step: '03',
    title: 'Predict Future Expenses',
    description:
      'Forecasts upcoming debits and subscription renewals 30 days in advance so you can optimize liquidity and prevent overdrafts.',
    highlights: ['30-day debit forecast', 'Overdraft guard', 'Recurring spend trends'],
    icon: HiOutlineTrendingUp,
  },
  {
    step: '04',
    title: 'Receive Smart Financial Insights',
    description:
      'Receive one-click subscription cancellation options, trial expiration warnings, and automated bill negotiation prompts.',
    highlights: ['1-click cancellations', 'Trial expiration alerts', 'Negotiation scripts'],
    icon: HiOutlineLightningBolt,
  },
];

const Timeline = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <LedgerRule label="PROCEDURAL TIMELINE" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F3F1EA]/10 bg-[#171A18] text-[#C2A155] text-xs font-mono tracking-widest uppercase"
        >
          <span>HOW IT WORKS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#F3F1EA] tracking-tight"
        >
          Four simple steps to <br className="hidden sm:block" />
          <span className="text-[#C2A155]">financial peace of mind</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#96988F] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-sans"
        >
          SubSense AI automates the tedious work of reading receipts, tracking renewal dates, and forecasting your budget.
        </motion.p>
      </div>

      {/* Sequential Ledger Line Items */}
      <div className="max-w-4xl mx-auto space-y-6">
        {stepsList.map((stepItem, index) => {
          const Icon = stepItem.icon;
          const isActive = activeStep === index;

          return (
            <motion.div
              key={stepItem.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setActiveStep(index)}
              className={`rounded-xl border p-6 transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-[#171A18] border-[#C2A155] shadow-sm'
                  : 'bg-[#171A18]/60 border-[#F3F1EA]/10 hover:border-[#F3F1EA]/20'
              }`}
            >
              <div className="flex items-start gap-4 sm:gap-6">
                {/* Monospace Step Indicator Badge */}
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0D0F0E] border border-[#F3F1EA]/10 text-[#C2A155] font-mono font-bold text-sm shrink-0 mt-0.5">
                  [{stepItem.step}]
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-display font-bold text-[#F3F1EA]">
                      {stepItem.title}
                    </h3>
                    <span className="text-[11px] font-mono text-[#96988F]">
                      SECTION {stepItem.step} OF 04
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#96988F] leading-relaxed mb-4 font-sans">
                    {stepItem.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-3 border-t border-[#F3F1EA]/10">
                    {stepItem.highlights.map((highlight, hIdx) => (
                      <span
                        key={hIdx}
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded bg-[#0D0F0E] text-[#96988F] border border-[#F3F1EA]/10"
                      >
                        <HiOutlineCheck className="w-3 h-3 text-[#3FA972]" />
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Timeline;
