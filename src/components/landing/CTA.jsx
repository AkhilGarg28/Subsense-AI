import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight, HiOutlineShieldCheck, HiOutlineCheckCircle, HiOutlineCalendar } from 'react-icons/hi';
import { LedgerRule } from '../common';
import { ROUTES } from '../../utils/constants';

const CTA = () => {
  return (
    <section id="cta" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <LedgerRule label="GET STARTED TODAY" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-xl border border-[#F3F1EA]/10 bg-[#171A18] px-6 py-16 sm:px-12 sm:py-20 lg:px-16 text-center shadow-2xl"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F3F1EA]/10 bg-[#0D0F0E] text-[#C2A155] text-xs font-mono tracking-widest uppercase">
            <span>START SAVING IN UNDER 2 MINUTES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#F3F1EA] tracking-tight leading-tight">
            Take Control of Your <br className="hidden sm:block" />
            <span className="text-[#C2A155]">Financial Future Today.</span>
          </h2>

          <p className="text-[#96988F] text-base sm:text-xl leading-relaxed max-w-2xl mx-auto font-sans">
            Join 45,000+ smart individuals and teams saving an average of <span className="text-[#F3F1EA] font-mono font-bold">$640/year</span> with SubSense AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to={ROUTES.SIGNUP || '/signup'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#C2A155] hover:bg-[#D4B468] text-[#0D0F0E] font-bold text-sm shadow-sm transition-all"
            >
              <span>Get Started Free</span>
              <HiOutlineArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to={ROUTES.LOGIN || '/login'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#0D0F0E] hover:bg-[#212522] border border-[#F3F1EA]/10 text-[#F3F1EA] font-mono text-xs transition-all"
            >
              <HiOutlineCalendar className="w-4 h-4 text-[#C2A155]" />
              <span>Schedule Demo</span>
            </Link>
          </div>

          <div className="pt-6 border-t border-[#F3F1EA]/10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#96988F]">
            <div className="flex items-center gap-2">
              <HiOutlineCheckCircle className="w-4 h-4 text-[#3FA972]" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineShieldCheck className="w-4 h-4 text-[#C2A155]" />
              <span>14-day trial guarantee</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
