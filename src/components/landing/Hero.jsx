import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiPlay,
  HiStar,
  HiOutlineX,
  HiArrowRight,
  HiOutlineCheck,
} from 'react-icons/hi';
import { Odometer } from '../common';
import { ROUTES } from '../../utils/constants';

/**
 * Hero — Split layout with Fraunces serif editorial headline on the left
 * and a high-precision financial Statement Card on the right.
 */
const Hero = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [recommendationAction, setRecommendationAction] = useState(false);
  const [billPaused, setBillPaused] = useState(false);

  return (
    <section id="hero" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32 bg-[#0D0F0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Feature Tag */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F3F1EA]/10 bg-[#171A18] text-[#C2A155] text-xs font-mono tracking-widest uppercase mb-6"
            >
              <span>AUTONOMOUS FINANCIAL COPILOT</span>
            </motion.div>

            {/* Main Heading — Editorial Fraunces Serif */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#F3F1EA] leading-[1.15]"
            >
              Your Autonomous <br className="hidden sm:block" />
              <span className="text-[#C2A155]">Financial Copilot.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-[#96988F] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              SubSense AI automatically parses your bills, predicts upcoming subscriptions, and stops hidden charges before they drain your bank account.
            </motion.p>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                to={ROUTES.SIGNUP || '/signup'}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-bold text-[#0D0F0E] bg-[#C2A155] hover:bg-[#D4B468] transition-all rounded-lg shadow-sm group"
              >
                <span>Get Started Free</span>
                <HiArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-mono text-[#F3F1EA] rounded-lg border border-[#F3F1EA]/10 bg-[#171A18] hover:bg-[#212522] transition-all duration-200 group"
              >
                <div className="w-5 h-5 rounded-full bg-[#C2A155]/20 flex items-center justify-center mr-2.5">
                  <HiPlay className="w-3 h-3 text-[#C2A155]" />
                </div>
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Trust Metrics Bar — Tabular Mono Odometer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-[#F3F1EA]/10 grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-mono font-bold text-[#F3F1EA]">
                  <Odometer value={4250000} prefix="$" suffix="+" />
                </p>
                <p className="text-xs text-[#96988F] mt-1 font-mono uppercase tracking-wider">Saved for Users</p>
              </div>

              <div className="text-center lg:text-left border-x border-[#F3F1EA]/10 px-2">
                <p className="text-2xl sm:text-3xl font-mono font-bold text-[#F3F1EA]">
                  <Odometer value={99.4} suffix="%" decimals={1} />
                </p>
                <p className="text-xs text-[#96988F] mt-1 font-mono uppercase tracking-wider">Parsing Accuracy</p>
              </div>

              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1 mb-1">
                  <p className="text-2xl sm:text-3xl font-mono font-bold text-[#F3F1EA]">4.9/5</p>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-0.5 text-[#C2A155] text-xs">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-[#96988F] text-xs font-mono ml-1">(2.8k)</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Statement Card (Bank Ledger Snippet) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="rounded-xl border border-[#F3F1EA]/10 bg-[#171A18] p-6 shadow-2xl relative overflow-hidden"
            >
              {/* Statement Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F3F1EA]/10 mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#96988F]">STATEMENT SUMMARY</span>
                  <h3 className="text-base font-display font-bold text-[#F3F1EA]">SubSense Monthly Ledger</h3>
                </div>
                <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-[#C2A155]/15 text-[#C2A155] border border-[#C2A155]/30">
                  OPTIMIZED
                </span>
              </div>

              {/* Stat Summary Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-[#F3F1EA]/10">
                <div className="p-3 rounded-lg bg-[#0D0F0E] border border-[#F3F1EA]/10">
                  <span className="text-[10px] font-mono text-[#96988F] uppercase">Active Recurring</span>
                  <div className="text-xl font-mono font-bold text-[#F3F1EA] mt-1">14 Subscriptions</div>
                  <span className="text-[11px] font-mono text-[#3FA972] mt-0.5 block">2 Unused Flagged</span>
                </div>

                <div className="p-3 rounded-lg bg-[#0D0F0E] border border-[#F3F1EA]/10">
                  <span className="text-[10px] font-mono text-[#96988F] uppercase">Monthly Total</span>
                  <div className="text-xl font-mono font-bold text-[#F3F1EA] mt-1">
                    <Odometer value={1248.50} prefix="$" decimals={2} />
                  </div>
                  <span className="text-[11px] font-mono text-[#3FA972] mt-0.5 block">-$340.00 Saved</span>
                </div>
              </div>

              {/* Line Items List */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0D0F0E] border border-[#F3F1EA]/10 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#D65C4F]" />
                    <div>
                      <span className="font-semibold text-[#F3F1EA] block">Netflix Premium</span>
                      <span className="font-mono text-[10px] text-[#96988F]">Renews 28th Jul • Autopay</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-[#F3F1EA] block">$19.99/mo</span>
                    <button
                      onClick={() => setBillPaused(!billPaused)}
                      className="text-[10px] font-mono text-[#C2A155] hover:underline"
                    >
                      {billPaused ? '✔ Paused' : 'Pause Renewal'}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0D0F0E] border border-[#F3F1EA]/10 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#3FA972]" />
                    <div>
                      <span className="font-semibold text-[#F3F1EA] block">Gym Membership</span>
                      <span className="font-mono text-[10px] text-[#3FA972]">0 logins in 45 days</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-[#F3F1EA] block">$45.00/mo</span>
                    <button
                      onClick={() => setRecommendationAction(!recommendationAction)}
                      className="text-[10px] font-mono text-[#3FA972] font-bold hover:underline"
                    >
                      {recommendationAction ? '✔ Cancelled' : '1-Click Cancel'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer Audit Message */}
              <div className="pt-4 border-t border-[#F3F1EA]/10 flex items-center justify-between text-xs font-mono text-[#96988F]">
                <span>Ledger Status: Balanced</span>
                <span className="text-[#3FA972] font-bold">99.4% Precision</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Demo Video Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D0F0E]/90"
            onClick={() => setShowDemoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl p-6 border border-[#F3F1EA]/10 rounded-xl bg-[#171A18] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F3F1EA]/10">
                <h3 className="text-lg font-display font-bold text-[#F3F1EA]">SubSense AI — Product Walkthrough</h3>
                <button
                  type="button"
                  onClick={() => setShowDemoModal(false)}
                  className="p-1 rounded text-[#96988F] hover:text-[#F3F1EA]"
                >
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-video w-full rounded-lg bg-[#0D0F0E] border border-[#F3F1EA]/10 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="w-14 h-14 rounded-full bg-[#C2A155] flex items-center justify-center text-[#0D0F0E] shadow-sm mb-4 cursor-pointer hover:scale-105 transition-transform">
                  <HiPlay className="w-6 h-6 ml-0.5" />
                </div>
                <p className="text-[#F3F1EA] font-display font-bold text-sm">Ledger Product Walkthrough</p>
                <p className="text-[#96988F] text-xs font-mono mt-1">Autonomous Subscription & OCR Ledger Audit</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
