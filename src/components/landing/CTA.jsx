import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineSparkles, HiOutlineArrowRight } from 'react-icons/hi';
import { ROUTES } from '../../utils/constants';

const CTA = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-[#121A2F]/60">
      {/* Background Ambient Orbs */}
      <div className="ambient-orb ambient-orb-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] opacity-30" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#171F2F] to-[#121A2F] p-10 sm:p-16 shadow-2xl backdrop-blur-2xl text-center max-w-4xl mx-auto overflow-hidden"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#5B8CFF]/30 bg-[#5B8CFF]/10 px-4 py-1.5 backdrop-blur-md mb-6">
            <HiOutlineSparkles className="h-4 w-4 text-[#5B8CFF] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wide text-white uppercase">
              START SAVING IN UNDER 60 SECONDS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Ready to Put Your Subscription Spending on <span className="gradient-text-primary">Autopilot?</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A1A8B5] max-w-2xl mx-auto leading-relaxed mb-8">
            Join thousands of modern founders and professionals saving an average of $340/mo with SubSense AI Copilot.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to={ROUTES.DASHBOARD}
              className="inline-flex items-center gap-2.5 rounded-xl gradient-primary px-8 py-4 text-base font-bold text-white shadow-glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Launch Autonomous Copilot Now</span>
              <HiOutlineArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <p className="text-xs font-mono text-[#A1A8B5] mt-6">
            No credit card required • Instant receipt upload • 100% free trial
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
