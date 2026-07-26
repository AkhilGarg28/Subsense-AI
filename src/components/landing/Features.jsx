import React from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineSparkles,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineShieldCheck,
  HiOutlineBell,
  HiOutlineLightningBolt,
} from 'react-icons/hi';

const features = [
  {
    icon: HiOutlineDocumentText,
    badge: 'LLM OCR VISION',
    title: 'Autonomous Receipt & PDF OCR',
    description: 'Instantly extract vendor line-items, tax amounts, renewal terms, and recurring billing dates from uploaded invoices with 99.4% accuracy.',
    gradient: 'from-[#5B8CFF] to-[#38BDF8]',
  },
  {
    icon: HiOutlineSparkles,
    badge: 'AUTO-AUDIT ENGINE',
    title: 'Unused Seat & Duplicate Detector',
    description: 'Scans connected SaaS workspaces and bank feeds to flag redundant streaming or software seats that haven’t logged activity in 30+ days.',
    gradient: 'from-[#8B5CF6] to-[#EC4899]',
  },
  {
    icon: HiOutlineChartBar,
    badge: 'REAL-TIME FORECAST',
    title: 'Financial Health & Predictive Runway',
    description: 'Calculates your monthly liquidity health score (0–100) and projects upcoming renewal cliffs 90 days into the future.',
    gradient: 'from-[#10B981] to-[#06B6D4]',
  },
  {
    icon: HiOutlineBell,
    badge: 'PRICE HIKE SHIELD',
    title: 'Hidden Price Hike Early Alerts',
    description: 'Detects silent price tier increases across Netflix, AWS, Canva, or Spotify before auto-debits process on your credit cards.',
    gradient: 'from-[#F59E0B] to-[#EF4444]',
  },
  {
    icon: HiOutlineLightningBolt,
    badge: '1-CLICK ACTION',
    title: 'Automated Cancellation & Pause',
    description: 'Trigger autonomous cancellation emails or liquidity pauses directly through SubSense Copilot with 1-click execution.',
    gradient: 'from-[#5B8CFF] to-[#8B5CF6]',
  },
  {
    icon: HiOutlineShieldCheck,
    badge: 'BANK-GRADE SECURITY',
    title: 'SOC-2 Type II Privacy Shield',
    description: 'End-to-end encrypted storage with zero plain-text password logging. Your financial data is protected by enterprise tokenization.',
    gradient: 'from-[#3B82F6] to-[#10B981]',
  },
];

const Features = () => {
  return (
    <section id="features" className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#5B8CFF] mb-3 block">
            ENTERPRISE CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-white tracking-tight leading-tight mb-4">
            Engineered for <span className="gradient-text-primary">Precision & Autonomy</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A1A8B5] leading-relaxed">
            SubSense AI combines vision AI models with automated financial ledger analytics to eliminate wasteful subscription spending.
          </p>
        </div>

        {/* 6 Equal Height Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#171F2F]/80 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#5B8CFF]/40 hover:shadow-glow-blue"
              >
                <div>
                  {/* Icon & Badge Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${feat.gradient} text-white shadow-md transition-transform group-hover:scale-110`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-mono font-bold tracking-wider text-[#5B8CFF] uppercase">
                      {feat.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#5B8CFF] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-[#A1A8B5] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono font-bold text-[#5B8CFF] group-hover:translate-x-1 transition-transform">
                  <span>Learn more</span>
                  <span>→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
