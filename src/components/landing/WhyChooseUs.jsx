import React from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineShieldCheck,
  HiOutlineArrowRight,
} from 'react-icons/hi';
import { LedgerRule } from '../common';

const WhyChooseUs = () => {
  const comparisonData = [
    {
      id: 1,
      feature: 'Invoice & Receipt Parsing',
      traditional: {
        text: 'Manual transaction tagging',
        subtext: 'Requires typing amounts, dates, and vendor names by hand.',
      },
      subsense: {
        text: '100% Autonomous AI parsing',
        subtext: 'Instant OCR extracts line items, tax, recurrence, and vendor details.',
        highlight: 'Instant OCR',
      },
    },
    {
      id: 2,
      feature: 'Price Increase Protection',
      traditional: {
        text: 'Reactive expense logging',
        subtext: 'Discovered weeks later after checking credit card statements.',
      },
      subsense: {
        text: 'Proactive price-hike alerts',
        subtext: 'Real-time detection alerts you the moment vendor rates increase.',
        highlight: 'Real-time Alerts',
      },
    },
    {
      id: 3,
      feature: 'Financial Forecasting',
      traditional: {
        text: 'Static charts',
        subtext: 'Backward-looking historical graphs without future insights.',
      },
      subsense: {
        text: 'Predictive cashflow forecasting',
        subtext: 'ML models project upcoming monthly spend & runway with 98% precision.',
        highlight: '98% Accuracy',
      },
    },
    {
      id: 4,
      feature: 'Subscription Management',
      traditional: {
        text: 'Missed subscription renewals',
        subtext: 'No warning before trial periods end or annual contracts auto-renew.',
      },
      subsense: {
        text: 'Instant 1-click subscription cancellation',
        subtext: 'Automated cancellation workflows and pre-renewal alerts.',
        highlight: '1-Click Action',
      },
    },
    {
      id: 5,
      feature: 'Financial Querying',
      traditional: {
        text: 'No context on PDF receipts',
        subtext: 'PDFs sit in folder archives with no searchable metadata.',
      },
      subsense: {
        text: 'Natural language financial chat assistant',
        subtext: 'Ask AI Copilot: "How much did I spend on SaaS tools this quarter?"',
        highlight: 'AI Copilot',
      },
    },
  ];

  return (
    <section id="why-us" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <LedgerRule label="COMPARATIVE LEDGER AUDIT" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F3F1EA]/10 bg-[#171A18] text-[#C2A155] text-xs font-mono tracking-wider uppercase"
        >
          <span>THE NEXT-GEN FINANCIAL STANDARD</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#F3F1EA] tracking-tight"
        >
          Traditional Finance Apps <br className="hidden sm:block" />
          <span className="text-[#C2A155]">vs SubSense AI</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-[#96988F] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans"
        >
          Stop relying on manual spreadsheets and reactive expense loggers. SubSense AI puts your cashflow and subscriptions on 100% autonomous autopilot.
        </motion.p>
      </div>

      {/* Side-by-Side Comparison Container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-xl border border-[#F3F1EA]/10 bg-[#171A18] overflow-hidden shadow-2xl"
      >
        {/* Table Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[#F3F1EA]/10 bg-[#0D0F0E]">
          <div className="hidden md:block md:col-span-4 p-6 font-mono font-bold text-[#96988F] text-xs uppercase tracking-wider border-r border-[#F3F1EA]/10">
            Core Capability
          </div>

          <div className="md:col-span-4 p-6 border-r border-[#F3F1EA]/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#96988F] uppercase tracking-wider block mb-1">Legacy Method</span>
              <h3 className="text-base font-display font-bold text-[#96988F]">Traditional Finance Apps</h3>
            </div>
            <HiOutlineXCircle className="w-5 h-5 text-[#D65C4F]" />
          </div>

          <div className="md:col-span-4 p-6 bg-[#C2A155]/10 border-l-2 border-l-[#C2A155] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#C2A155] text-[#0D0F0E] uppercase tracking-wider inline-block mb-1">
                RECOMMENDED
              </span>
              <h3 className="text-lg font-display font-extrabold text-[#F3F1EA]">SubSense AI</h3>
            </div>
            <HiOutlineCheckCircle className="w-6 h-6 text-[#3FA972]" />
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-[#F3F1EA]/10">
          {comparisonData.map((row, idx) => (
            <div key={row.id} className="grid grid-cols-1 md:grid-cols-12 hover:bg-[#0D0F0E]/40 transition-colors">
              <div className="hidden md:flex md:col-span-4 p-6 flex-col justify-center border-r border-[#F3F1EA]/10">
                <span className="text-[10px] font-mono text-[#C2A155] uppercase mb-1">0{idx + 1}. Feature</span>
                <h4 className="text-sm font-display font-bold text-[#F3F1EA]">{row.feature}</h4>
              </div>

              <div className="md:col-span-4 p-6 border-r border-[#F3F1EA]/10 space-y-1">
                <h5 className="text-xs font-semibold text-[#96988F] line-through decoration-[#D65C4F]/60">
                  {row.traditional.text}
                </h5>
                <p className="text-xs text-[#96988F]/80 leading-relaxed font-sans">{row.traditional.subtext}</p>
              </div>

              <div className="md:col-span-4 p-6 bg-[#C2A155]/5 border-l-2 border-l-[#3FA972] space-y-1">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-[#F3F1EA]">{row.subsense.text}</h5>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#3FA972]/15 text-[#3FA972] border border-[#3FA972]/30">
                    {row.subsense.highlight}
                  </span>
                </div>
                <p className="text-xs text-[#96988F] leading-relaxed font-sans">{row.subsense.subtext}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Banner */}
        <div className="p-6 bg-[#0D0F0E] border-t border-[#F3F1EA]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-sm font-display font-bold text-[#F3F1EA] flex items-center justify-center md:justify-start gap-2">
              <HiOutlineShieldCheck className="w-5 h-5 text-[#3FA972]" />
              Ready to automate your recurring spend?
            </h4>
            <p className="text-xs text-[#96988F]">
              Join thousands of professionals who saved an average of $3,400/yr with SubSense AI.
            </p>
          </div>

          <a
            href="/signup"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C2A155] hover:bg-[#D4B468] text-[#0D0F0E] text-xs font-bold shadow-sm transition-all whitespace-nowrap"
          >
            <span>Start Free Trial</span>
            <HiOutlineArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;
