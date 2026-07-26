import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCheck, HiOutlineX } from 'react-icons/hi';

const comparisons = [
  {
    feature: 'AI LLM Receipt & PDF Vision OCR',
    subsense: true,
    traditional: false,
    excel: false,
  },
  {
    feature: 'Automated Unused Seat Detection',
    subsense: true,
    traditional: false,
    excel: false,
  },
  {
    feature: '1-Click Cancellation Execution',
    subsense: true,
    traditional: false,
    excel: false,
  },
  {
    feature: 'Silent Price Hike Shields',
    subsense: true,
    traditional: false,
    excel: false,
  },
  {
    feature: 'SOC-2 Zero Password Storage',
    subsense: true,
    traditional: false,
    excel: false,
  },
  {
    feature: 'Real-time Financial Health Score',
    subsense: true,
    traditional: 'Basic Graphs',
    excel: false,
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-[#121A2F]/40">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#5B8CFF] mb-3 block">
            THE COMPETITIVE ADVANTAGE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-white tracking-tight leading-tight mb-4">
            Why SubSense AI Outperforms <span className="gradient-text-primary">Legacy Tools</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A1A8B5] leading-relaxed">
            Stop relying on manual spreadsheets or outdated budgeting apps that lack autonomous AI scanning.
          </p>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 bg-[#171F2F]/90 overflow-hidden shadow-2xl backdrop-blur-2xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#121A2F]/80 text-xs font-mono">
                  <th className="p-5 font-bold uppercase text-[#A1A8B5] sm:w-2/5">Platform Feature</th>
                  <th className="p-5 font-bold uppercase text-[#5B8CFF] bg-[#5B8CFF]/10 text-center sm:w-1/5">
                    SubSense AI Copilot
                  </th>
                  <th className="p-5 font-bold uppercase text-[#A1A8B5] text-center sm:w-1/5">
                    Legacy Apps (Rocket/Mint)
                  </th>
                  <th className="p-5 font-bold uppercase text-[#A1A8B5] text-center sm:w-1/5">
                    Spreadsheets / Excel
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {comparisons.map((row) => (
                  <tr key={row.feature} className="hover:bg-white/5 transition-colors">
                    <td className="p-5 font-medium text-white">{row.feature}</td>

                    <td className="p-5 bg-[#5B8CFF]/5 text-center">
                      {row.subsense === true ? (
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#5B8CFF]/20 text-[#5B8CFF] mx-auto">
                          <HiOutlineCheck className="h-5 w-5" />
                        </span>
                      ) : (
                        <span className="text-xs font-mono font-bold text-[#5B8CFF]">{row.subsense}</span>
                      )}
                    </td>

                    <td className="p-5 text-center">
                      {row.traditional === true ? (
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#22C55E]/20 text-[#22C55E] mx-auto">
                          <HiOutlineCheck className="h-5 w-5" />
                        </span>
                      ) : row.traditional === false ? (
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-[#A1A8B5] mx-auto">
                          <HiOutlineX className="h-5 w-5" />
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-[#A1A8B5]">{row.traditional}</span>
                      )}
                    </td>

                    <td className="p-5 text-center">
                      {row.excel === true ? (
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#22C55E]/20 text-[#22C55E] mx-auto">
                          <HiOutlineCheck className="h-5 w-5" />
                        </span>
                      ) : (
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-[#A1A8B5] mx-auto">
                          <HiOutlineX className="h-5 w-5" />
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
