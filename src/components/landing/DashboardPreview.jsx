import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineSparkles,
  HiOutlineCreditCard,
  HiOutlineRefresh,
  HiOutlineTrendingUp,
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
  HiOutlineChatAlt2,
  HiOutlineLockClosed,
  HiOutlineChevronRight,
  HiOutlineArrowNarrowUp,
  HiOutlinePaperAirplane,
  HiOutlineShieldCheck,
  HiOutlineLightBulb,
  HiOutlineChartSquareBar,
  HiOutlineXCircle,
} from 'react-icons/hi';
import { FaAws, FaFigma, FaSpotify, FaCloud, FaRobot } from 'react-icons/fa';

/**
 * DashboardPreview — Interactive showcase preview of the SubSense AI app interface.
 * Features:
 * - Feature tab controls ("Executive Overview", "AI Subscription Audit", "Cashflow Forecast")
 * - Responsive browser mockup frame with Mac OS traffic lights
 * - Key metric widgets (Total Spend, Active Subscriptions, AI Savings Opportunities)
 * - Interactive Subscription List preview with status tags (Active, Price Increased, Unused)
 * - Simulated AI Chat Copilot Widget overlay
 */
const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSub, setSelectedSub] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'AI Copilot: You have 2 subscriptions renewing this week totaling $84.00.',
      timestamp: 'Just now',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Sample Subscriptions List
  const subscriptions = [
    {
      id: 'aws',
      name: 'AWS Cloud Services',
      category: 'Infrastructure',
      cost: '$420.00',
      cycle: '/mo',
      renewal: 'Jul 29, 2026',
      status: 'Active',
      statusType: 'success',
      icon: FaAws,
      iconBg: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      note: 'Normal usage',
    },
    {
      id: 'figma',
      name: 'Figma Enterprise',
      category: 'Design & Collaboration',
      cost: '$45.00',
      cycle: '/mo',
      renewal: 'Aug 02, 2026',
      status: 'Price Increased',
      statusType: 'warning',
      badge: '+$15.00/mo spike',
      icon: FaFigma,
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      note: 'Rate increased from $30.00 to $45.00',
    },
    {
      id: 'spotify',
      name: 'Spotify Premium',
      category: 'Entertainment',
      cost: '$11.99',
      cycle: '/mo',
      renewal: 'Aug 05, 2026',
      status: 'Active',
      statusType: 'success',
      icon: FaSpotify,
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      note: 'Individual plan',
    },
    {
      id: 'adobe',
      name: 'Adobe Creative Cloud',
      category: 'Design & Video',
      cost: '$79.99',
      cycle: '/mo',
      renewal: 'Jul 28, 2026',
      status: 'Unused',
      statusType: 'danger',
      badge: '0 logins in 45 days',
      icon: FaCloud,
      iconBg: 'bg-red-500/10 text-red-400 border-red-500/20',
      note: 'Recommended for 1-Click cancellation',
    },
    {
      id: 'openai',
      name: 'OpenAI ChatGPT Plus',
      category: 'AI Tools',
      cost: '$20.00',
      cycle: '/mo',
      renewal: 'Aug 10, 2026',
      status: 'Active',
      statusType: 'success',
      icon: FaRobot,
      iconBg: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
      note: 'Team workspace seat',
    },
  ];

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      timestamp: 'Just now',
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');

    // Simulated automated response
    setTimeout(() => {
      let aiResponseText = `SubSense AI processed "${userText}". All subscriptions are currently tracked and optimized.`;
      if (userText.toLowerCase().includes('adobe') || userText.toLowerCase().includes('cancel')) {
        aiResponseText = `AI Copilot: Adobe Creative Cloud ($79.99/mo) has had 0 logins in 45 days. Click "1-Click Cancel" in the Audit tab to save $959.88/yr immediately.`;
      } else if (userText.toLowerCase().includes('renew') || userText.toLowerCase().includes('week')) {
        aiResponseText = `AI Copilot: Upcoming renewals: Adobe CC ($79.99 on Jul 28) & AWS Cloud ($420.00 on Jul 29). Total: $499.99.`;
      } else if (userText.toLowerCase().includes('save') || userText.toLowerCase().includes('audit')) {
        aiResponseText = `AI Copilot: You have $340.00/mo in potential savings by removing unused Adobe CC and negotiating Figma team seats.`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: aiResponseText,
          timestamp: 'Just now',
        },
      ]);
    }, 600);
  };

  const tabs = [
    { id: 'overview', label: 'Executive Overview', icon: HiOutlineChartSquareBar },
    { id: 'audit', label: 'AI Subscription Audit', icon: HiOutlineSparkles, badge: '3 Savings' },
    { id: 'forecast', label: 'Cashflow Forecast', icon: HiOutlineTrendingUp },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Lighting & Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[450px] bg-gradient-to-tr from-primary/15 via-indigo-500/10 to-purple-500/15 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider"
        >
          <HiOutlineSparkles className="w-4 h-4 animate-pulse" />
          Interactive Product Showcase
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight"
        >
          See SubSense AI in action <br className="hidden sm:block" />
          <span className="gradient-text">before you even sign up</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Experience our real-time interactive dashboard. Switch views, inspect active subscriptions, analyze AI savings, and converse with the AI Copilot.
        </motion.p>
      </div>

      {/* Feature Tab Navigation Controls */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="flex flex-wrap items-center justify-center gap-2 mb-8"
      >
        <div className="inline-flex p-1.5 rounded-xl bg-surface/90 border border-border/80 backdrop-blur-md shadow-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'text-white bg-primary shadow-md shadow-primary/25'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-light/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-text-muted'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Responsive Mockup Browser Frame */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative max-w-6xl mx-auto rounded-2xl border border-border/80 bg-surface/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* Top Window Navigation Bar (Mac OS Controls) */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-surface-light/30">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block shadow-sm" />
          </div>

          {/* Browser URL Bar */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/80 border border-border/60 text-xs text-text-secondary w-full max-w-md mx-auto justify-center shadow-inner">
            <HiOutlineLockClosed className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-text-primary">app.subsense.ai</span>
            <span className="text-text-muted">/</span>
            <span className="text-primary font-medium capitalize">{activeTab}</span>
          </div>

          {/* Live Status Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="hidden sm:inline">LIVE DEMO</span>
          </div>
        </div>

        {/* Dashboard Content Interior */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 min-h-[580px] relative">
          <AnimatePresence mode="wait">
            {/* TAB 1: EXECUTIVE OVERVIEW */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Metric Widgets Grid (3 Cards) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                  {/* Metric 1: Total Monthly Spend */}
                  <div className="p-5 rounded-xl bg-surface-light/30 border border-border/60 hover:border-primary/40 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-text-secondary">Total Monthly Spend</span>
                      <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                        <HiOutlineCreditCard className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">$1,248.50</span>
                      <span className="inline-flex items-center text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <HiOutlineArrowNarrowUp className="w-3 h-3 mr-0.5" />
                        +4.2%
                      </span>
                    </div>
                    <p className="text-xs text-text-muted mt-2">Across 14 linked accounts & cards</p>
                  </div>

                  {/* Metric 2: Active Subscriptions */}
                  <div className="p-5 rounded-xl bg-surface-light/30 border border-border/60 hover:border-indigo-500/40 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-text-secondary">Active Subscriptions</span>
                      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        <HiOutlineRefresh className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">14 Active</span>
                      <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                        2 renewing soon
                      </span>
                    </div>
                    <p className="text-xs text-text-muted mt-2">Auto-detected via AI receipt parser</p>
                  </div>

                  {/* Metric 3: AI Savings Opportunities */}
                  <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-500/10 via-surface-light/40 to-teal-500/10 border border-emerald-500/30 hover:border-emerald-500/60 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-emerald-400">AI Savings Opportunities</span>
                      <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <HiOutlineSparkles className="w-5 h-5 animate-spin-slow" />
                      </div>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight">$340.00<span className="text-sm font-normal text-text-secondary">/mo</span></span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        3 Actions
                      </span>
                    </div>
                    <p className="text-xs text-emerald-300/80 mt-2 font-medium">Unused seats & price hike alerts found</p>
                  </div>
                </div>

                {/* Interactive Subscription List Section */}
                <div className="rounded-xl border border-border/70 bg-surface-light/20 overflow-hidden">
                  <div className="p-4 border-b border-border/60 flex flex-wrap items-center justify-between gap-3 bg-surface-light/30">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-text-primary">Tracked Subscriptions</h3>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                        5 Shown
                      </span>
                    </div>
                    <span className="text-xs text-text-muted">Click any row to inspect details</span>
                  </div>

                  <div className="divide-y divide-border/50">
                    {subscriptions.map((sub) => {
                      const Icon = sub.icon;
                      const isSelected = selectedSub === sub.id;
                      return (
                        <div
                          key={sub.id}
                          onClick={() => setSelectedSub(isSelected ? null : sub.id)}
                          className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? 'bg-primary/10 border-l-4 border-l-primary'
                              : 'hover:bg-surface-light/40'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border text-lg ${sub.iconBg}`}>
                              <Icon />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-text-primary">{sub.name}</h4>
                                {sub.badge && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                                    {sub.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-text-muted">{sub.category} • Renews {sub.renewal}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-4">
                            <div className="text-left sm:text-right">
                              <span className="text-sm font-extrabold text-text-primary">{sub.cost}</span>
                              <span className="text-xs text-text-muted">{sub.cycle}</span>
                            </div>

                            {/* Status Tags */}
                            <div>
                              {sub.statusType === 'success' && (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                  <HiOutlineCheckCircle className="w-3.5 h-3.5" />
                                  {sub.status}
                                </span>
                              )}
                              {sub.statusType === 'warning' && (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse">
                                  <HiOutlineExclamationCircle className="w-3.5 h-3.5" />
                                  {sub.status}
                                </span>
                              )}
                              {sub.statusType === 'danger' && (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30">
                                  <HiOutlineXCircle className="w-3.5 h-3.5" />
                                  {sub.status}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: AI SUBSCRIPTION AUDIT */}
            {activeTab === 'audit' && (
              <motion.div
                key="audit"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Audit Highlight Banner */}
                <div className="p-5 rounded-xl bg-gradient-to-r from-primary/20 via-indigo-500/20 to-purple-500/20 border border-primary/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <HiOutlineShieldCheck className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-base font-bold text-text-primary">Autonomous Audit Report</h3>
                    </div>
                    <p className="text-xs text-text-secondary">
                      SubSense AI continuously analyzes invoice PDFs & transaction patterns for hidden inflation.
                    </p>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm whitespace-nowrap">
                    Potential Savings: $340.00/mo
                  </div>
                </div>

                {/* Audit Action Items */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Action Item 1 */}
                  <div className="p-5 rounded-xl bg-surface-light/30 border border-red-500/30 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-red-500/20 text-red-400 border border-red-500/30">
                          Unused Tool
                        </span>
                        <span className="text-xs font-extrabold text-red-400">Save $79.99/mo</span>
                      </div>
                      <h4 className="text-sm font-bold text-text-primary">Adobe Creative Cloud</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        0 logins recorded across connected SSO & browser sessions in 45 days.
                      </p>
                    </div>
                    <button className="w-full py-2 px-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5">
                      <span>1-Click Cancel</span>
                      <HiOutlineChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Action Item 2 */}
                  <div className="p-5 rounded-xl bg-surface-light/30 border border-amber-500/30 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          Price Spike
                        </span>
                        <span className="text-xs font-extrabold text-amber-400">+$15.00/mo Spike</span>
                      </div>
                      <h4 className="text-sm font-bold text-text-primary">Figma Enterprise</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Subscription fee increased from $30.00 to $45.00 without formal notice.
                      </p>
                    </div>
                    <button className="w-full py-2 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5">
                      <span>Generate Negotiation Script</span>
                      <HiOutlineChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Action Item 3 */}
                  <div className="p-5 rounded-xl bg-surface-light/30 border border-blue-500/30 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          Idle EC2 Instances
                        </span>
                        <span className="text-xs font-extrabold text-blue-400">Save $245.00/mo</span>
                      </div>
                      <h4 className="text-sm font-bold text-text-primary">AWS Infrastructure</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Unattached EBS volumes & dev instances detected running 24/7.
                      </p>
                    </div>
                    <button className="w-full py-2 px-3 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5">
                      <span>Auto-Stop Idle Nodes</span>
                      <HiOutlineChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: CASHFLOW FORECAST */}
            {activeTab === 'forecast' && (
              <motion.div
                key="forecast"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="p-5 rounded-xl bg-surface-light/30 border border-border/70">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-base font-bold text-text-primary">3-Month Predictive Cashflow</h3>
                      <p className="text-xs text-text-secondary">ML modeling trained on historical receipt recurring patterns</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1.5 text-text-secondary">
                        <span className="w-3 h-3 rounded-sm bg-primary inline-block" /> Current Spend
                      </span>
                      <span className="flex items-center gap-1.5 text-text-secondary">
                        <span className="w-3 h-3 rounded-sm bg-emerald-400 inline-block" /> AI Optimized Spend
                      </span>
                    </div>
                  </div>

                  {/* Visual Forecast Bars */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-text-primary">July 2026 (Current)</span>
                        <span className="text-text-secondary">$1,248.50 / mo</span>
                      </div>
                      <div className="w-full h-3 bg-surface-light rounded-full overflow-hidden flex">
                        <div className="h-full bg-primary" style={{ width: '85%' }} />
                        <div className="h-full bg-red-500/80" style={{ width: '15%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-text-primary">August 2026 (Projected - Unused Canceled)</span>
                        <span className="text-emerald-400 font-bold">$1,168.51 / mo (-$79.99)</span>
                      </div>
                      <div className="w-full h-3 bg-surface-light rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400" style={{ width: '74%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-text-primary">September 2026 (Projected - Fully Optimized)</span>
                        <span className="text-emerald-400 font-bold">$908.50 / mo (-$340.00)</span>
                      </div>
                      <div className="w-full h-3 bg-surface-light rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: '58%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Predictive Insights Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-surface-light/20 border border-border/60 flex items-start gap-3">
                    <HiOutlineLightBulb className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-text-primary">Zero Hidden Fee Warning</h4>
                      <p className="text-xs text-text-muted mt-1">
                        No upcoming automatic annual plan renewals detected for the next 60 days.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-light/20 border border-border/60 flex items-start gap-3">
                    <HiOutlineTrendingUp className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-text-primary">Annualized Savings Target</h4>
                      <p className="text-xs text-text-muted mt-1">
                        Executing all 3 recommendations will save $4,080.00 per calendar year.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SIMULATED AI CHAT WIDGET OVERLAY */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-full max-w-sm z-20">
            <div className="rounded-2xl border border-primary/40 bg-surface/95 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-primary/30">
              {/* Chat Header */}
              <div className="px-4 py-2.5 bg-gradient-to-r from-primary/30 via-indigo-600/20 to-surface-light/40 border-b border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    <HiOutlineSparkles className="w-3.5 h-3.5 animate-spin-slow" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-primary leading-tight">AI Copilot</h4>
                    <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> Active Assistant
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                  GPT-4o
                </span>
              </div>

              {/* Chat Body */}
              <div className="p-3 max-h-48 overflow-y-auto space-y-2.5 scrollbar-thin">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-primary text-white font-medium rounded-br-none'
                          : 'bg-surface-light/80 border border-border/60 text-text-primary rounded-bl-none shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Prompt Suggestions & Input */}
              <div className="p-2.5 border-t border-border/60 bg-surface-light/20 space-y-2">
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  <button
                    onClick={() => {
                      setChatInput('Cancel Adobe CC');
                    }}
                    className="text-[10px] font-medium px-2 py-1 rounded-md bg-surface-light/50 hover:bg-primary/20 text-text-secondary hover:text-primary border border-border/50 whitespace-nowrap transition-colors"
                  >
                    "Cancel Adobe CC"
                  </button>
                  <button
                    onClick={() => {
                      setChatInput('Show upcoming renewals');
                    }}
                    className="text-[10px] font-medium px-2 py-1 rounded-md bg-surface-light/50 hover:bg-primary/20 text-text-secondary hover:text-primary border border-border/50 whitespace-nowrap transition-colors"
                  >
                    "Show renewals"
                  </button>
                </div>

                <form onSubmit={handleSendMessage} className="relative flex items-center">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask AI Copilot..."
                    className="w-full text-xs bg-background/90 text-text-primary rounded-xl pl-3 pr-8 py-2 border border-border/70 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-muted"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 p-1 rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors"
                  >
                    <HiOutlinePaperAirplane className="w-3.5 h-3.5 rotate-90" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DashboardPreview;
