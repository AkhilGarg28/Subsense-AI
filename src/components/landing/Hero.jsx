import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiSparkles,
  HiPlay,
  HiStar,
  HiOutlineLightningBolt,
  HiOutlineX,
  HiArrowRight,
  HiOutlineBell,
} from 'react-icons/hi';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { ROUTES } from '../../utils/constants';

// Sample chart data for Spending Pulse widget
const chartData = [
  { month: 'Jan', spend: 480, optimized: 320 },
  { month: 'Feb', spend: 520, optimized: 310 },
  { month: 'Mar', spend: 450, optimized: 290 },
  { month: 'Apr', spend: 610, optimized: 340 },
  { month: 'May', spend: 430, optimized: 280 },
  { month: 'Jun', spend: 380, optimized: 250 },
];

/**
 * Custom Tooltip component for Recharts widget in Hero mockup
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface/95 border border-glass-border p-2.5 rounded-lg shadow-xl backdrop-blur-md text-xs">
        <p className="font-semibold text-text-primary mb-1">{label} Overview</p>
        <p className="text-danger flex items-center justify-between gap-3">
          <span>Actual:</span>
          <span className="font-bold">${payload[0].value}</span>
        </p>
        {payload[1] && (
          <p className="text-success flex items-center justify-between gap-3">
            <span>AI Target:</span>
            <span className="font-bold">${payload[1].value}</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

/**
 * Hero — Main conversion section with dynamic ambient glows, interactive dashboard mockup,
 * trust metrics, and AI recommendation demo.
 */
const Hero = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [recommendationAction, setRecommendationAction] = useState(false);
  const [billPaused, setBillPaused] = useState(false);

  return (
    <section id="hero" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32 bg-background">
      {/* Animated Background Gradient Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-10 left-10 w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Feature Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs sm:text-sm font-medium backdrop-blur-md shadow-sm mb-6 hover:border-primary/50 transition-all cursor-default"
            >
              <HiSparkles className="w-4 h-4 text-primary animate-spin" style={{ animationDuration: '4s' }} />
              <span>Powered by Next-Gen Financial Intelligence</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]"
            >
              Your Autonomous{' '}
              <span className="gradient-text block sm:inline">Financial Copilot.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed"
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
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white rounded-xl gradient-primary shadow-glow hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
              >
                <span>Get Started Free</span>
                <HiArrowRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 text-base font-medium text-white rounded-xl border border-glass-border bg-surface/40 hover:bg-surface/80 backdrop-blur-md transition-all duration-200 group"
              >
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center mr-3 group-hover:bg-primary/40 transition-colors">
                  <HiPlay className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Trust Metrics Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-glass-border grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-extrabold text-white gradient-text">$4.2M+</p>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">Saved for Users</p>
              </div>

              <div className="text-center lg:text-left border-x border-glass-border/60 px-2">
                <p className="text-2xl sm:text-3xl font-extrabold text-white">99.4%</p>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">Parsing Accuracy</p>
              </div>

              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1 mb-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">4.9/5</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-0.5 text-amber-400 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-text-muted text-xs ml-1">(2.8k reviews)</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Interactive Dark Glassmorphism Dashboard Mockup */}
          <div className="lg:col-span-5 relative">
            
            {/* Floating Badge: Unused Subscriptions Alert */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -left-2 sm:-left-4 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface/90 border border-warning/50 backdrop-blur-xl shadow-xl text-xs font-semibold text-warning"
            >
              <HiOutlineLightningBolt className="w-4 h-4 text-warning animate-bounce" />
              <span>⚡ 3 Unused Subscriptions Detected</span>
            </motion.div>

            {/* Dashboard Mockup Main Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="glass-card p-5 sm:p-6 border border-glass-border rounded-2xl bg-surface/80 backdrop-blur-xl shadow-2xl relative overflow-hidden"
            >
              {/* Top Window Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-glass-border mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-danger/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-background/60 border border-glass-border text-xs text-text-muted">
                  <HiSparkles className="w-3.5 h-3.5 text-primary" />
                  <span>subsense.ai/dashboard</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-success bg-success/10 px-2.5 py-1 rounded-full border border-success/20">
                  <span className="w-2 h-2 rounded-full bg-success animate-ping" />
                  <span className="font-medium">Live</span>
                </div>
              </div>

              {/* Floating Bill Card (Netflix) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="glass p-4 rounded-xl border border-glass-border bg-surface-light/40 mb-5 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 font-bold text-lg">
                      N
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Netflix Premium</h4>
                      <p className="text-xs text-text-secondary">Entertainment • Monthly</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">$19.99<span className="text-xs text-text-muted font-normal">/mo</span></p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-warning/15 text-warning border border-warning/30 text-[10px] font-semibold mt-1">
                      Autopay in 3 days
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-text-muted flex items-center gap-1">
                    <HiOutlineBell className="w-3.5 h-3.5 text-text-secondary" /> Auto-renewal alert
                  </span>
                  <button
                    type="button"
                    onClick={() => setBillPaused(!billPaused)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                      billPaused
                        ? 'bg-success/20 text-success border border-success/30'
                        : 'bg-surface hover:bg-surface-light text-text-secondary hover:text-white border border-glass-border'
                    }`}
                  >
                    {billPaused ? '✓ Renewal Paused' : 'Pause Renewal'}
                  </button>
                </div>
              </motion.div>

              {/* Animated Spending Pulse Chart Widget */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Spending Pulse</h4>
                    <p className="text-sm font-bold text-white">$380 <span className="text-xs text-success font-normal">(-21% vs last mo)</span></p>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="flex items-center gap-1 text-text-muted">
                      <span className="w-2 h-2 rounded-full bg-primary" /> Actual
                    </span>
                    <span className="flex items-center gap-1 text-text-muted">
                      <span className="w-2 h-2 rounded-full bg-success" /> AI Optimized
                    </span>
                  </div>
                </div>

                <div className="h-36 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="optimizedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="spend"
                        stroke="#2563EB"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#spendGradient)"
                      />
                      <Area
                        type="monotone"
                        dataKey="optimized"
                        stroke="#10B981"
                        strokeWidth={2}
                        strokeDasharray="3 3"
                        fillOpacity={1}
                        fill="url(#optimizedGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AI Savings Recommendation Banner */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="p-3.5 rounded-xl border border-success/30 bg-success/10 backdrop-blur-md flex items-center justify-between gap-3 text-xs text-white"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-success/20 flex items-center justify-center shrink-0">
                    <HiSparkles className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <span className="font-semibold block text-white">AI Recommendation</span>
                    <span className="text-text-secondary text-[11px]">Cancel unused Gym Membership — Save $45/mo</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setRecommendationAction(!recommendationAction)}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-[11px] shrink-0 transition-all shadow-sm ${
                    recommendationAction
                      ? 'bg-success text-white'
                      : 'bg-success/20 hover:bg-success/30 text-success border border-success/40'
                  }`}
                >
                  {recommendationAction ? 'Cancelled! Saved $45' : 'One-Click Cancel'}
                </button>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* Demo Video Modal Popup */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
            onClick={() => setShowDemoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-3xl glass-card p-6 border border-glass-border rounded-2xl bg-surface shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-glass-border">
                <div className="flex items-center gap-2">
                  <HiSparkles className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-white">SubSense AI — Interactive Demo</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDemoModal(false)}
                  className="p-1 rounded-lg text-text-secondary hover:text-white hover:bg-white/10"
                >
                  <HiOutlineX className="w-6 h-6" />
                </button>
              </div>

              <div className="aspect-video w-full rounded-xl bg-slate-900 border border-glass-border flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-purple-900/30" />
                <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center text-white shadow-glow mb-4 cursor-pointer group-hover:scale-110 transition-transform">
                  <HiPlay className="w-8 h-8 ml-1" />
                </div>
                <p className="text-white font-semibold text-sm">Product Walkthrough Video</p>
                <p className="text-text-secondary text-xs mt-1">See how SubSense AI saves you time & money in under 2 minutes</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Hero;
