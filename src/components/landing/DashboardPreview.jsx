import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  HiOutlineSparkles,
  HiOutlineShieldCheck,
  HiOutlineTrendingDown,
  HiOutlineCreditCard,
  HiOutlineCheck,
} from 'react-icons/hi';
import { Odometer } from '../common';

const chartData = [
  { month: 'Jan', spend: 1850, savings: 240 },
  { month: 'Feb', spend: 1720, savings: 290 },
  { month: 'Mar', spend: 1640, savings: 310 },
  { month: 'Apr', spend: 1510, savings: 340 },
  { month: 'May', spend: 1390, savings: 420 },
  { month: 'Jun', spend: 1248, savings: 480 },
];

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('insights');

  return (
    <section id="dashboard-preview" className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#5B8CFF] mb-3 block">
            LIVE PRODUCT DEMO
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-white tracking-tight leading-tight mb-4">
            The Command Center for <span className="gradient-text-primary">Your Subscriptions</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A1A8B5] leading-relaxed">
            Experience real-time financial health scoring, AI Insights, and spend forecasting in one clean dashboard.
          </p>
        </div>

        {/* Interactive Dashboard Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl border border-white/10 bg-[#171F2F]/90 shadow-2xl backdrop-blur-2xl overflow-hidden p-6 sm:p-8"
        >
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center text-white font-bold">
                <HiOutlineSparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">SubSense AI Operating Ledger</h3>
                <span className="text-xs font-mono text-[#A1A8B5]">Real-time spend forecast & live audit</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#121A2F] p-1.5 rounded-xl border border-white/10 font-mono text-xs">
              <button
                onClick={() => setActiveTab('insights')}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  activeTab === 'insights'
                    ? 'bg-[#5B8CFF] text-white shadow-glow-blue'
                    : 'text-[#A1A8B5] hover:text-white'
                }`}
              >
                AI Insights
              </button>
              <button
                onClick={() => setActiveTab('chart')}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  activeTab === 'chart'
                    ? 'bg-[#5B8CFF] text-white shadow-glow-blue'
                    : 'text-[#A1A8B5] hover:text-white'
                }`}
              >
                Spend Forecast
              </button>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Metrics & Charts (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Stat Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                <div className="p-5 rounded-xl bg-[#121A2F] border border-white/10">
                  <span className="text-xs text-[#A1A8B5] uppercase">Monthly Recurring</span>
                  <div className="text-2xl font-bold text-white mt-1">
                    $<Odometer value={1248.50} />
                  </div>
                  <span className="text-[11px] text-[#22C55E] flex items-center gap-1 mt-1">
                    <HiOutlineTrendingDown className="h-3.5 w-3.5" /> -12.4% vs last mo
                  </span>
                </div>

                <div className="p-5 rounded-xl bg-[#121A2F] border border-white/10">
                  <span className="text-xs text-[#A1A8B5] uppercase">Active SaaS Seats</span>
                  <div className="text-2xl font-bold text-white mt-1">
                    <Odometer value={14} /> Seats
                  </div>
                  <span className="text-[11px] text-[#8B5CF6] mt-1 block">3 Unused Flagged</span>
                </div>

                <div className="p-5 rounded-xl bg-[#121A2F] border border-white/10">
                  <span className="text-xs text-[#A1A8B5] uppercase">Annual Savings</span>
                  <div className="text-2xl font-bold text-[#22C55E] mt-1">
                    $<Odometer value={4080.00} />
                  </div>
                  <span className="text-[11px] text-[#22C55E] mt-1 block">99.4% AI Match</span>
                </div>
              </div>

              {/* Area Chart Component */}
              <div className="p-6 rounded-xl bg-[#121A2F] border border-white/10 h-72">
                <div className="flex items-center justify-between mb-4 font-mono text-xs">
                  <span className="font-bold text-white">SPEND REDUCTION TRAJECTORY</span>
                  <span className="text-[#22C55E]">$480.00 Saved in June</span>
                </div>
                <ResponsiveContainer width="100%" height="80%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5B8CFF" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#5B8CFF" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                    <YAxis stroke="#64748B" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#171F2F', borderColor: '#5B8CFF', color: '#fff' }} />
                    <Area type="monotone" dataKey="spend" stroke="#5B8CFF" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Health Score Gauge & AI Feed (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Score Box */}
              <div className="p-6 rounded-xl bg-[#121A2F] border border-white/10 flex flex-col items-center justify-center text-center font-mono">
                <div className="flex items-center gap-2 mb-4">
                  <HiOutlineShieldCheck className="h-5 w-5 text-[#22C55E]" />
                  <span className="text-xs font-bold text-[#22C55E] uppercase">FINANCIAL HEALTH SCORE</span>
                </div>

                <div className="relative flex items-center justify-center my-2">
                  <div className="h-28 w-28 rounded-full border-8 border-[#5B8CFF] border-t-transparent animate-spin" style={{ animationDuration: '10s' }} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-extrabold text-white">92</span>
                    <span className="text-[10px] text-[#A1A8B5] uppercase">/ 100 PTS</span>
                  </div>
                </div>

                <span className="mt-3 px-3 py-1 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-xs font-bold text-[#22C55E]">
                  OPTIMAL SPENDING
                </span>
              </div>

              {/* Feed Card */}
              <div className="p-5 rounded-xl bg-[#121A2F] border border-white/10 space-y-3">
                <span className="text-xs font-mono font-bold text-[#5B8CFF] uppercase block">
                  ACTIONABLE RECS (2)
                </span>

                <div className="p-3 rounded-lg bg-[#171F2F] border border-white/5 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>Spotify Annual Switch</span>
                    <span className="text-[#22C55E]">Save $24/yr</span>
                  </div>
                  <p className="text-[11px] text-[#A1A8B5]">Switching to yearly billing reduces tier fee.</p>
                </div>

                <div className="p-3 rounded-lg bg-[#171F2F] border border-white/5 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>Duplicate Apple Music</span>
                    <span className="text-[#EF4444]">Cancel Sub</span>
                  </div>
                  <p className="text-[11px] text-[#A1A8B5]">Overlap detected with Spotify Premium.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;
