import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineCreditCard,
  HiOutlineRefresh,
  HiOutlineTrendingUp,
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
  HiOutlineLockClosed,
  HiOutlineChevronRight,
  HiOutlineArrowNarrowUp,
  HiOutlinePaperAirplane,
  HiOutlineShieldCheck,
  HiOutlineLightBulb,
  HiOutlineXCircle,
} from 'react-icons/hi';
import { FaAws, FaFigma, FaSpotify, FaCloud, FaRobot } from 'react-icons/fa';
import { LedgerRule, Odometer } from '../common';

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
    },
  ];

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', text: userText, timestamp: 'Just now' },
    ]);
    setChatInput('');

    setTimeout(() => {
      let aiResponseText = `SubSense AI processed "${userText}". All subscriptions are currently tracked and optimized.`;
      if (userText.toLowerCase().includes('adobe') || userText.toLowerCase().includes('cancel')) {
        aiResponseText = `AI Copilot: Adobe Creative Cloud ($79.99/mo) has had 0 logins in 45 days. Click "1-Click Cancel" in the Audit tab to save $959.88/yr immediately.`;
      } else if (userText.toLowerCase().includes('renew') || userText.toLowerCase().includes('week')) {
        aiResponseText = `AI Copilot: Upcoming renewals: Adobe CC ($79.99 on Jul 28) & AWS Cloud ($420.00 on Jul 29). Total: $499.99.`;
      }

      setChatMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: aiResponseText, timestamp: 'Just now' },
      ]);
    }, 600);
  };

  const tabs = [
    { id: 'overview', label: 'Executive Overview' },
    { id: 'audit', label: 'AI Subscription Audit', badge: '3 Savings' },
    { id: 'forecast', label: 'Cashflow Forecast' },
  ];

  return (
    <section id="preview" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <LedgerRule label="INTERACTIVE DEMO" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F3F1EA]/10 bg-[#171A18] text-[#C2A155] text-xs font-mono uppercase tracking-wider"
        >
          <span>INTERACTIVE PRODUCT SHOWCASE</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#F3F1EA] tracking-tight"
        >
          See SubSense AI in action <br className="hidden sm:block" />
          <span className="text-[#C2A155]">before you even sign up</span>
        </motion.h2>
      </div>

      {/* Feature Tab Navigation Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <div className="inline-flex p-1 rounded-lg bg-[#171A18] border border-[#F3F1EA]/10">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-mono transition-all duration-200 ${
                  isActive
                    ? 'text-[#0D0F0E] bg-[#C2A155] font-bold'
                    : 'text-[#96988F] hover:text-[#F3F1EA]'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-[#0D0F0E]/20 text-[#0D0F0E]' : 'bg-[#3FA972]/20 text-[#3FA972]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Ledger Browser Frame */}
      <div className="relative max-w-6xl mx-auto rounded-xl border border-[#F3F1EA]/10 bg-[#171A18] overflow-hidden shadow-2xl">
        {/* Top Window Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#F3F1EA]/10 bg-[#0D0F0E]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D65C4F]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#3FA972]" />
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#171A18] border border-[#F3F1EA]/10 text-xs font-mono text-[#96988F]">
            <HiOutlineLockClosed className="w-3.5 h-3.5 text-[#3FA972]" />
            <span>app.subsense.ai/{activeTab}</span>
          </div>

          <div className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#3FA972]/20 text-[#3FA972] border border-[#3FA972]/30">
            LEDGER LIVE
          </div>
        </div>

        {/* Interior Container */}
        <div className="p-6 space-y-6 min-h-[520px]">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* 3 Metric Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-[#0D0F0E] border border-[#F3F1EA]/10">
                    <span className="text-[10px] font-mono uppercase text-[#96988F]">Monthly Total</span>
                    <div className="text-2xl font-mono font-bold text-[#F3F1EA] mt-1">
                      <Odometer value={1248.50} prefix="$" decimals={2} />
                    </div>
                    <span className="text-[11px] font-mono text-[#3FA972] mt-1 block">+4.2% vs last month</span>
                  </div>

                  <div className="p-4 rounded-lg bg-[#0D0F0E] border border-[#F3F1EA]/10">
                    <span className="text-[10px] font-mono uppercase text-[#96988F]">Active Subscriptions</span>
                    <div className="text-2xl font-mono font-bold text-[#F3F1EA] mt-1">14 Active</div>
                    <span className="text-[11px] font-mono text-[#D97706] mt-1 block">2 Renewing Soon</span>
                  </div>

                  <div className="p-4 rounded-lg bg-[#0D0F0E] border border-[#C2A155]/30">
                    <span className="text-[10px] font-mono uppercase text-[#C2A155]">AI Savings Identified</span>
                    <div className="text-2xl font-mono font-bold text-[#C2A155] mt-1">$340.00/mo</div>
                    <span className="text-[11px] font-mono text-[#3FA972] mt-1 block">3 Action Items</span>
                  </div>
                </div>

                {/* Subscriptions Table List */}
                <div className="rounded-lg border border-[#F3F1EA]/10 bg-[#0D0F0E] overflow-hidden">
                  <div className="p-3 border-b border-[#F3F1EA]/10 flex items-center justify-between text-xs font-mono text-[#96988F]">
                    <span>TRACKED RECURRING LEDGER</span>
                    <span>5 ITEMS SHOWN</span>
                  </div>

                  <div className="divide-y divide-[#F3F1EA]/10">
                    {subscriptions.map((sub) => (
                      <div key={sub.id} className="p-3.5 flex items-center justify-between hover:bg-[#171A18] transition-colors text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-[#171A18] border border-[#F3F1EA]/10 flex items-center justify-center text-base text-[#F3F1EA]">
                            <sub.icon />
                          </div>
                          <div>
                            <span className="font-semibold text-[#F3F1EA] block">{sub.name}</span>
                            <span className="font-mono text-[10px] text-[#96988F]">{sub.category} • {sub.renewal}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-mono font-bold text-[#F3F1EA]">{sub.cost}</span>
                          <span className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                            sub.statusType === 'success' ? 'bg-[#3FA972]/15 text-[#3FA972] border-[#3FA972]/30' :
                            sub.statusType === 'warning' ? 'bg-[#D97706]/15 text-[#D97706] border-[#D97706]/30' :
                            'bg-[#D65C4F]/15 text-[#D65C4F] border-[#D65C4F]/30'
                          }`}>
                            {sub.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'audit' && (
              <motion.div
                key="audit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="p-4 rounded-lg bg-[#0D0F0E] border border-[#C2A155]/40 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-display font-bold text-[#F3F1EA] text-sm block">Autonomous Audit Report</span>
                    <span className="text-[#96988F] font-mono">Invoice OCR & Transaction Price Hike Scan</span>
                  </div>
                  <span className="font-mono font-bold text-[#3FA972] bg-[#3FA972]/20 px-3 py-1 rounded border border-[#3FA972]/30">
                    Savings: $340.00/mo
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-lg bg-[#0D0F0E] border border-[#D65C4F]/40 space-y-2">
                    <span className="text-[#D65C4F] font-bold block">[01] UNUSED SUBSCRIPTION</span>
                    <h4 className="font-bold text-[#F3F1EA]">Adobe Creative Cloud</h4>
                    <p className="text-[#96988F] text-[11px]">0 logins in 45 days. $79.99/mo</p>
                    <button className="w-full py-1.5 rounded bg-[#D65C4F]/20 text-[#D65C4F] font-bold border border-[#D65C4F]/40 hover:bg-[#D65C4F]/30">
                      1-Click Cancel
                    </button>
                  </div>

                  <div className="p-4 rounded-lg bg-[#0D0F0E] border border-[#D97706]/40 space-y-2">
                    <span className="text-[#D97706] font-bold block">[02] PRICE SPIKE DETECTED</span>
                    <h4 className="font-bold text-[#F3F1EA]">Figma Enterprise</h4>
                    <p className="text-[#96988F] text-[11px]">Increased from $30 to $45/mo</p>
                    <button className="w-full py-1.5 rounded bg-[#D97706]/20 text-[#D97706] font-bold border border-[#D97706]/40 hover:bg-[#D97706]/30">
                      Generate Script
                    </button>
                  </div>

                  <div className="p-4 rounded-lg bg-[#0D0F0E] border border-[#C2A155]/40 space-y-2">
                    <span className="text-[#C2A155] font-bold block">[03] IDLE INFRASTRUCTURE</span>
                    <h4 className="font-bold text-[#F3F1EA]">AWS EC2 Instances</h4>
                    <p className="text-[#96988F] text-[11px]">Unattached EBS volumes ($245/mo)</p>
                    <button className="w-full py-1.5 rounded bg-[#C2A155]/20 text-[#C2A155] font-bold border border-[#C2A155]/40 hover:bg-[#C2A155]/30">
                      Auto-Stop Nodes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'forecast' && (
              <motion.div
                key="forecast"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="p-4 rounded-lg bg-[#0D0F0E] border border-[#F3F1EA]/10 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#F3F1EA] font-bold">3-MONTH PREDICTIVE CASHFLOW LEDGER</span>
                    <span className="text-[#3FA972]">$4,080.00/YR SAVINGS TARGET</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <div className="flex justify-between mb-1 text-[#96988F]">
                        <span>JULY 2026 (CURRENT)</span>
                        <span className="text-[#F3F1EA]">$1,248.50</span>
                      </div>
                      <div className="w-full h-2 bg-[#171A18] rounded overflow-hidden flex">
                        <div className="h-full bg-[#C2A155]" style={{ width: '85%' }} />
                        <div className="h-full bg-[#D65C4F]" style={{ width: '15%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1 text-[#96988F]">
                        <span>AUGUST 2026 (UNUSED CANCELED)</span>
                        <span className="text-[#3FA972]">$1,168.51 (-$79.99)</span>
                      </div>
                      <div className="w-full h-2 bg-[#171A18] rounded overflow-hidden">
                        <div className="h-full bg-[#3FA972]" style={{ width: '74%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1 text-[#96988F]">
                        <span>SEPTEMBER 2026 (FULLY OPTIMIZED)</span>
                        <span className="text-[#3FA972]">$908.50 (-$340.00)</span>
                      </div>
                      <div className="w-full h-2 bg-[#171A18] rounded overflow-hidden">
                        <div className="h-full bg-[#3FA972]" style={{ width: '58%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
