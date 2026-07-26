import React from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineCloudUpload,
  HiOutlineChip,
  HiOutlineSparkles,
  HiOutlineCheckCircle,
} from 'react-icons/hi';

const steps = [
  {
    step: '01',
    icon: HiOutlineCloudUpload,
    title: 'Connect & Upload Receipts',
    description: 'Sync your Gmail inbox or drop PDF invoices and physical receipt photos into the high-precision OCR Vision drag-and-drop scanner.',
    badge: 'Step 1 • Sync',
  },
  {
    step: '02',
    icon: HiOutlineChip,
    title: 'Vision LLM Parsing',
    description: 'SubSense Copilot automatically extracts vendor line-items, tax breakdown, renewal intervals, and billing account metadata.',
    badge: 'Step 2 • Parse',
  },
  {
    step: '03',
    icon: HiOutlineSparkles,
    title: 'AI Subscription Audit',
    description: 'Identifies duplicate streaming accounts, dormant SaaS seats, and upcoming renewal spikes to compute your Financial Health Score.',
    badge: 'Step 3 • Audit',
  },
  {
    step: '04',
    icon: HiOutlineCheckCircle,
    title: '1-Tap Autonomous Action',
    description: 'Execute instant cancellations, switch to lower tier annual plans, or set automated payment liquidity alerts with a single click.',
    badge: 'Step 4 • Optimize',
  },
];

const Timeline = () => {
  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-[#121A2F]/40">
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#5B8CFF] mb-3 block">
            WORKFLOW PROTOCOL
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-white tracking-tight leading-tight mb-4">
            How SubSense AI <span className="gradient-text-primary">Optimizes Your Money</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A1A8B5] leading-relaxed">
            From raw receipt ingestion to autonomous execution in 4 seamless, automated steps.
          </p>
        </div>

        {/* Timeline Items Grid with Connectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#171F2F]/90 p-6 backdrop-blur-xl hover:border-[#5B8CFF]/40 transition-all group"
              >
                <div>
                  {/* Step Header Badge & Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-white font-bold shadow-glow-blue transition-transform group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-mono font-black text-[#5B8CFF]">
                      [{item.step}]
                    </span>
                  </div>

                  <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-mono font-bold text-[#8B5CF6] uppercase block w-fit mb-3">
                    {item.badge}
                  </span>

                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight group-hover:text-[#5B8CFF] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#A1A8B5] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
