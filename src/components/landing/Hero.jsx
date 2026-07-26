import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineSparkles,
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
  HiOutlineTrendingDown,
  HiOutlineCreditCard,
  HiOutlineCheck,
} from 'react-icons/hi';
import { Odometer } from '../common';
import { ROUTES } from '../../utils/constants';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
      {/* Background Ambient Orbs */}
      <div className="ambient-orb ambient-orb-1 -top-24 left-1/4 h-96 w-96 opacity-50" />
      <div className="ambient-orb ambient-orb-2 top-1/2 right-10 h-[500px] w-[500px] opacity-40" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Editorial Headline & Value Prop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start lg:col-span-7"
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#5B8CFF]/30 bg-[#5B8CFF]/10 px-4 py-1.5 backdrop-blur-md mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[#5B8CFF] animate-ping" />
              <HiOutlineSparkles className="h-4 w-4 text-[#5B8CFF]" />
              <span className="text-xs font-semibold tracking-wide text-white uppercase">
                Product Hunt #1 AI SaaS Financial Copilot
              </span>
            </div>

            {/* Main Hero Headline (64px target) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              Autonomous Financial Intelligence for <br />
              <span className="gradient-text-primary">Modern Teams & Individuals</span>
            </h1>

            {/* Sub-description (16px) */}
            <p className="text-base sm:text-lg text-[#A1A8B5] max-w-2xl leading-relaxed mb-8">
              SubSense AI continuously audits recurring SaaS subscriptions, detects hidden price hikes, and executes 1-click optimizations using fine-tuned vision LLMs.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <Link
                to={ROUTES.DASHBOARD}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl gradient-primary px-8 py-4 text-base font-bold text-white shadow-glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Launch Autonomous Copilot</span>
                <HiOutlineArrowRight className="h-5 w-5" />
              </Link>

              <a
                href="#dashboard-preview"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#171F2F]/80 px-6 py-4 text-base font-semibold text-white hover:bg-[#171F2F] hover:border-[#5B8CFF]/40 transition-all"
              >
                <span>Explore Live Demo</span>
              </a>
            </div>

            {/* Trust Proof Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10 text-xs font-mono text-[#A1A8B5]">
              <div className="flex items-center gap-2">
                <HiOutlineShieldCheck className="h-4 w-4 text-[#22C55E]" />
                <span>SOC-2 Type II Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineCheck className="h-4 w-4 text-[#5B8CFF]" />
                <span>99.4% LLM OCR Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineCheck className="h-4 w-4 text-[#8B5CF6]" />
                <span>Zero Bank Password Storage</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Statement Card Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CF6] opacity-30 blur-xl group-hover:opacity-60 transition duration-500" />
              
              <div className="relative rounded-2xl border border-white/10 bg-[#171F2F]/90 p-6 shadow-2xl backdrop-blur-2xl">
                {/* Statement Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#5B8CFF] tracking-widest">
                      SUBSENSE FINANCIAL AUDIT
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">Live Account Ledger</h3>
                  </div>
                  <span className="rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 px-3 py-1 text-xs font-mono font-bold text-[#22C55E] flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
                    AUDITED NOW
                  </span>
                </div>

                {/* Primary Metric */}
                <div className="p-4 rounded-xl bg-[#121A2F] border border-white/10 mb-5">
                  <span className="text-xs font-mono text-[#A1A8B5] uppercase">Monthly Recurring Spend</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-3xl font-mono font-bold text-white">
                      $<Odometer value={1248.50} />
                    </span>
                    <span className="text-xs font-mono font-bold text-[#22C55E] flex items-center gap-1">
                      <HiOutlineTrendingDown className="h-4 w-4" /> -$340.00 Saved
                    </span>
                  </div>
                </div>

                {/* Subscription Row Snippets */}
                <div className="space-y-3 font-mono text-xs mb-5">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#121A2F]/60 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-[#5B8CFF]/20 text-[#5B8CFF] flex items-center justify-center font-bold">
                        C
                      </div>
                      <div>
                        <div className="font-bold text-white">Canva Pro Team</div>
                        <div className="text-[10px] text-[#A1A8B5]">Unused Seat • 0 Logins in 60d</div>
                      </div>
                    </div>
                    <span className="font-bold text-[#EF4444]">$79.99/mo</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#121A2F]/60 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-[#8B5CF6]/20 text-[#8B5CF6] flex items-center justify-center font-bold">
                        F
                      </div>
                      <div>
                        <div className="font-bold text-white">Figma Enterprise</div>
                        <div className="text-[10px] text-[#22C55E]">Active • 4 Seats</div>
                      </div>
                    </div>
                    <span className="font-bold text-white">$180.00/mo</span>
                  </div>
                </div>

                {/* AI Recommendation Banner */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF]/15 to-[#8B5CF6]/15 border border-[#5B8CFF]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <HiOutlineSparkles className="h-5 w-5 text-[#5B8CFF] shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
                    <div className="text-xs">
                      <span className="font-bold text-white">Cancel Canva Pro</span>
                      <span className="block text-[11px] text-[#A1A8B5]">Saves $960.00 annually</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-[#5B8CFF] text-white text-xs font-bold shadow-glow-blue cursor-pointer">
                    1-Tap Cancel
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
