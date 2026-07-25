import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineSparkles, HiOutlineArrowRight, HiOutlineShieldCheck, HiOutlineCheckCircle, HiOutlineCalendar } from 'react-icons/hi';
import { ROUTES } from '../../utils/constants';

/**
 * CTA — High-impact Call To Action banner with glowing background, gradient border,
 * action buttons, and trial guarantees.
 */
const CTA = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Outer Glowing Background & Gradient Border Wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative rounded-3xl p-[1px] bg-gradient-to-r from-primary via-secondary to-primary animate-pulse-glow shadow-glow"
      >
        {/* Background glow orbs behind card */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/30 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-secondary/30 blur-[100px] rounded-full pointer-events-none" />

        {/* Main Card Container */}
        <div className="relative rounded-[23px] bg-surface/95 backdrop-blur-2xl px-6 py-16 sm:px-12 sm:py-20 lg:px-16 text-center border border-glass-border overflow-hidden">
          {/* Subtle Radial Gradient Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs sm:text-sm font-semibold tracking-wide">
              <HiOutlineSparkles className="w-4 h-4 text-primary animate-spin" style={{ animationDuration: '6s' }} />
              <span>Start Saving in Under 2 Minutes</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-tight">
              Take Control of Your <br className="hidden sm:block" />
              <span className="gradient-text">Financial Future Today.</span>
            </h2>

            {/* Subtitle */}
            <p className="text-text-secondary text-base sm:text-xl leading-relaxed max-w-2xl mx-auto font-normal">
              Join 45,000+ smart individuals and teams saving an average of <span className="text-text-primary font-semibold">$640/year</span> with SubSense AI.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to={ROUTES.SIGNUP || '/signup'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl gradient-primary text-white font-bold text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Get Started Free</span>
                <HiOutlineArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to={ROUTES.LOGIN || '/login'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-surface-light/60 hover:bg-surface-light border border-border text-text-primary font-bold text-base hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <HiOutlineCalendar className="w-5 h-5 text-primary" />
                <span>Schedule Demo</span>
              </Link>
            </div>

            {/* Guarantees & Badges Footer */}
            <div className="pt-6 border-t border-border/40 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <HiOutlineCheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>No credit card required</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-border-light hidden sm:block" />
              <div className="flex items-center gap-2">
                <HiOutlineShieldCheck className="w-5 h-5 text-primary shrink-0" />
                <span>14-day free trial guarantee</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-border-light hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Instant setup & import</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
