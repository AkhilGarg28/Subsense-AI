import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineSparkles,
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineDocumentText,
  HiOutlineArrowRight,
  HiOutlineChartBar,
  HiOutlineChatAlt2,
} from 'react-icons/hi';

/**
 * WhyChooseUs — Side-by-side comparison table/cards contrasting
 * "Traditional Finance Apps" vs "SubSense AI".
 * Features:
 * - Highlights 5 core comparative vectors with green checkmarks & red crossmarks
 * - Interactive tab toggle for mobile view & comprehensive grid for desktop view
 * - Glowing glassmorphism design system matching Tailwind CSS v4 & theme variables
 */
const WhyChooseUs = () => {
  const [activeMobileView, setActiveMobileView] = useState('comparison');

  const comparisonData = [
    {
      id: 1,
      feature: 'Invoice & Receipt Parsing',
      traditional: {
        text: 'Manual transaction tagging',
        subtext: 'Requires typing amounts, dates, and vendor names by hand for every receipt.',
        supported: false,
      },
      subsense: {
        text: '100% Autonomous AI parsing',
        subtext: 'Instant OCR extracts line items, tax, recurrence, and vendor details from PDF/images.',
        supported: true,
        highlight: 'Instant OCR',
      },
    },
    {
      id: 2,
      feature: 'Price Increase Protection',
      traditional: {
        text: 'Reactive expense logging',
        subtext: 'You only discover rate hikes weeks later after checking credit card statements.',
        supported: false,
      },
      subsense: {
        text: 'Proactive price-hike alerts',
        subtext: 'Real-time detection alerts you the moment a vendor increases monthly charges.',
        supported: true,
        highlight: 'Real-time Alerts',
      },
    },
    {
      id: 3,
      feature: 'Financial Forecasting',
      traditional: {
        text: 'Static charts',
        subtext: 'Shows backward-looking historical graphs without actionable future insights.',
        supported: false,
      },
      subsense: {
        text: 'Predictive cashflow forecasting',
        subtext: 'ML models project upcoming monthly spend & runway with 98% precision.',
        supported: true,
        highlight: '98% Accuracy',
      },
    },
    {
      id: 4,
      feature: 'Subscription Management',
      traditional: {
        text: 'Missed subscription renewals',
        subtext: 'No warning before trial periods end or annual contracts auto-renew.',
        supported: false,
      },
      subsense: {
        text: 'Instant 1-click subscription cancellation',
        subtext: 'Automated cancellation workflows and pre-renewal alert notifications.',
        supported: true,
        highlight: '1-Click Action',
      },
    },
    {
      id: 5,
      feature: 'Financial Querying',
      traditional: {
        text: 'No context on PDF receipts',
        subtext: 'PDFs sit in folder archives with no searchable or queryable metadata.',
        supported: false,
      },
      subsense: {
        text: 'Natural language financial chat assistant',
        subtext: 'Ask AI Copilot questions like: "How much did I spend on SaaS tools this quarter?"',
        supported: true,
        highlight: 'AI Copilot',
      },
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Accent Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-r from-primary/10 via-indigo-500/10 to-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider"
        >
          <HiOutlineLightningBolt className="w-4 h-4 text-primary animate-bounce" />
          The Next-Gen Financial Standard
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight"
        >
          Traditional Finance Apps <br className="hidden sm:block" />
          <span className="gradient-text">vs SubSense AI</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Stop relying on manual spreadsheets and reactive expense loggers. SubSense AI puts your cashflow and subscriptions on 100% autonomous autopilot.
        </motion.p>
      </div>

      {/* Mobile Toggle Selector (Visible on small screens) */}
      <div className="flex md:hidden justify-center mb-8">
        <div className="p-1 rounded-xl bg-surface/90 border border-border/80 flex items-center">
          <button
            onClick={() => setActiveMobileView('comparison')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeMobileView === 'comparison'
                ? 'bg-primary text-white shadow-md'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Full Comparison
          </button>
          <button
            onClick={() => setActiveMobileView('subsense')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeMobileView === 'subsense'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            SubSense AI Features
          </button>
        </div>
      </div>

      {/* Side-by-Side Comparison Container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-2xl border border-border/80 bg-surface/80 backdrop-blur-xl shadow-2xl overflow-hidden"
      >
        {/* Comparison Header Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-border/70 bg-surface-light/30">
          <div className="hidden md:block md:col-span-4 p-6 font-bold text-text-muted text-sm uppercase tracking-wider border-r border-border/60">
            Core Capability
          </div>

          <div className="md:col-span-4 p-6 bg-surface-light/20 border-r border-border/60 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-1">
                Legacy Method
              </span>
              <h3 className="text-lg font-bold text-text-secondary">Traditional Finance Apps</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <HiOutlineXCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="md:col-span-4 p-6 bg-gradient-to-r from-primary/20 via-indigo-600/20 to-emerald-500/20 border-l-2 border-l-primary flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-primary text-white uppercase tracking-wider">
                  RECOMMENDED
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                SubSense AI
                <HiOutlineSparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
              </h3>
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-glow">
              <HiOutlineCheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Comparison Rows */}
        <div className="divide-y divide-border/60">
          {comparisonData.map((row, idx) => (
            <div
              key={row.id}
              className="grid grid-cols-1 md:grid-cols-12 hover:bg-surface-light/20 transition-colors"
            >
              {/* Feature Title (Desktop Column 1) */}
              <div className="hidden md:flex md:col-span-4 p-6 flex-col justify-center border-r border-border/60">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                  0{idx + 1}. Feature
                </span>
                <h4 className="text-base font-bold text-text-primary">{row.feature}</h4>
              </div>

              {/* Traditional Apps Column */}
              <div className="md:col-span-4 p-6 border-r border-border/60 bg-surface-light/10 space-y-2">
                <div className="md:hidden text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                  {row.feature} — Traditional Apps
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 flex-shrink-0 mt-0.5">
                    <HiOutlineXCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-text-secondary line-through decoration-red-400/60">
                      {row.traditional.text}
                    </h5>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">
                      {row.traditional.subtext}
                    </p>
                  </div>
                </div>
              </div>

              {/* SubSense AI Column */}
              <div className="md:col-span-4 p-6 bg-gradient-to-r from-primary/5 via-indigo-500/5 to-emerald-500/5 border-l-2 border-l-emerald-500/60 space-y-2 relative">
                <div className="md:hidden text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                  {row.feature} — SubSense AI
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5 shadow-sm">
                    <HiOutlineCheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h5 className="text-sm font-extrabold text-text-primary">
                        {row.subsense.text}
                      </h5>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {row.subsense.highlight}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mt-1 leading-relaxed font-medium">
                      {row.subsense.subtext}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner & Call-To-Action inside comparison card */}
        <div className="p-6 lg:p-8 bg-gradient-to-r from-primary/20 via-indigo-600/30 to-purple-600/20 border-t border-border/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <HiOutlineShieldCheck className="w-5 h-5 text-emerald-400" />
              Ready to automate your recurring spend?
            </h4>
            <p className="text-xs sm:text-sm text-text-secondary max-w-xl">
              Join thousands of smart professionals and teams who saved an average of $3,400/yr with SubSense AI.
            </p>
          </div>

          <a
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
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
