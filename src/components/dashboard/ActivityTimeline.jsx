import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiFileText,
  FiCheckCircle,
  FiPlusCircle,
  FiAlertCircle,
  FiClock,
  FiFilter,
  FiChevronRight,
  FiSearch,
  FiTrash2,
  FiArrowUpRight,
  FiDownload,
  FiTag,
  FiDollarSign,
  FiActivity
} from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';

/**
 * Default mock timeline activity events for SubSense AI
 */
const DEFAULT_ACTIVITIES = [
  {
    id: 'act-1',
    type: 'Receipt Uploaded', // 'Receipt Uploaded' | 'Bill Paid' | 'Subscription Added' | 'AI Recommendation Generated' | 'Price Alert'
    title: 'AWS Cloud Invoice #8921 Processed',
    description: 'AI extracted $142.30 (₹11,840) line items from PDF receipt.',
    relativeTime: '2 mins ago',
    timestamp: '2026-07-25T21:02:00',
    amountUSD: 142.30,
    amountINR: 11840,
    category: 'Receipts',
    iconType: 'receipt',
    badgeColor: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    dotColor: 'bg-sky-500',
    metadata: {
      fileName: 'AWS_Invoice_July_2026.pdf',
      vendor: 'Amazon Web Services',
      taxExtracted: '$12.40'
    }
  },
  {
    id: 'act-2',
    type: 'Bill Paid',
    title: 'Spotify Family Plan Bill Paid',
    description: 'Autopay processed successfully via Visa •••• 4242.',
    relativeTime: '1 hour ago',
    timestamp: '2026-07-25T20:00:00',
    amountUSD: 15.99,
    amountINR: 1329,
    category: 'Payments',
    iconType: 'payment',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    dotColor: 'bg-emerald-500',
    metadata: {
      transactionId: 'TXN-9021481',
      paymentMethod: 'Autopay (Visa •••• 4242)',
      status: 'Settled'
    }
  },
  {
    id: 'act-3',
    type: 'AI Recommendation Generated',
    title: 'Unused Adobe Subscription Alert',
    description: 'SubSense AI identified $54.99/mo potential savings on inactive account.',
    relativeTime: '3 hours ago',
    timestamp: '2026-07-25T18:00:00',
    amountUSD: 54.99,
    amountINR: 4575,
    category: 'AI Insights',
    iconType: 'ai',
    badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    dotColor: 'bg-purple-500',
    metadata: {
      insightType: 'Unused Service Cleanup',
      confidence: '98%',
      suggestedAction: '1-Click Cancel'
    }
  },
  {
    id: 'act-4',
    type: 'Subscription Added',
    title: 'Claude Pro Added to Tracking',
    description: 'New recurring service ($20.00/mo) detected from email confirmation receipt.',
    relativeTime: 'Yesterday at 4:15 PM',
    timestamp: '2026-07-24T16:15:00',
    amountUSD: 20.00,
    amountINR: 1660,
    category: 'Subscriptions',
    iconType: 'added',
    badgeColor: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    dotColor: 'bg-indigo-500',
    metadata: {
      service: 'Claude Pro (Anthropic)',
      billingCycle: 'Monthly',
      nextRenewal: '2026-08-24'
    }
  },
  {
    id: 'act-5',
    type: 'Price Alert',
    title: 'ChatGPT Plus Price Increase Detected',
    description: 'Monthly cost increased from $18.00 to $20.00 (+11.1%).',
    relativeTime: '2 days ago',
    timestamp: '2026-07-23T11:30:00',
    amountUSD: 2.00,
    amountINR: 165,
    category: 'AI Insights',
    iconType: 'alert',
    badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    dotColor: 'bg-amber-500',
    metadata: {
      previousPrice: '$18.00',
      newPrice: '$20.00',
      percentageChange: '+11.1%'
    }
  }
];

/**
 * Event Icon Badge Renderer
 */
const RenderEventIcon = ({ type }) => {
  switch (type) {
    case 'receipt':
      return <FiFileText className="w-4 h-4 text-sky-400" />;
    case 'payment':
      return <FiCheckCircle className="w-4 h-4 text-emerald-400" />;
    case 'added':
      return <FiPlusCircle className="w-4 h-4 text-indigo-400" />;
    case 'ai':
      return <HiOutlineSparkles className="w-4 h-4 text-purple-400 animate-pulse" />;
    case 'alert':
      return <FiAlertCircle className="w-4 h-4 text-amber-400" />;
    default:
      return <FiActivity className="w-4 h-4 text-blue-400" />;
  }
};

/**
 * ActivityTimeline Component
 * 
 * Timeline component displaying recent activity events (Receipt Uploaded, Bill Paid,
 * Subscription Added, AI Recommendation Generated) with icon badges, relative time tags,
 * event filtering, search, and detail modal preview.
 *
 * @param {Object} props
 * @param {Array} [props.activities] - Custom activities array
 * @param {Function} [props.onItemClick] - Click handler for an activity item
 * @param {number} [props.limit] - Optional item count limit
 */
const ActivityTimeline = ({
  activities = DEFAULT_ACTIVITIES,
  onItemClick,
  limit
}) => {
  const [data, setData] = useState(activities);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Filter activities
  const filteredActivities = data
    .filter((act) => {
      const matchesSearch =
        act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === 'All' || act.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .slice(0, limit || data.length);

  const handleClearHistory = () => {
    setData([]);
  };

  const handleSelectActivity = (act) => {
    setSelectedActivity(act);
    if (onItemClick) onItemClick(act);
  };

  return (
    <div className="w-full space-y-4">
      {/* Top Header Card */}
      <div className="p-4 rounded-2xl glass border border-slate-700/60 bg-slate-900/90 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <FiActivity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Recent Activity Log</h2>
            <p className="text-xs text-slate-400">
              Audit trail of payments, uploaded receipts, and AI alerts
            </p>
          </div>
        </div>

        {/* Toolbar controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search Box */}
          <div className="relative min-w-[180px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
            <input
              type="text"
              placeholder="Search timeline..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Clear Button */}
          {data.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 border border-slate-700 text-xs transition-colors"
              title="Clear timeline history"
            >
              <FiTrash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {['All', 'Payments', 'Receipts', 'AI Insights', 'Subscriptions'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-900/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Timeline List Container */}
      <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md shadow-xl relative">
        {filteredActivities.length > 0 ? (
          <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
            <AnimatePresence>
              {filteredActivities.map((act) => (
                <motion.div
                  key={act.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => handleSelectActivity(act)}
                  className="relative group cursor-pointer"
                >
                  {/* Timeline Dot Icon */}
                  <div
                    className={`absolute -left-6 top-0 -translate-x-1/2 w-7 h-7 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform ${act.dotColor}`}
                  >
                    <RenderEventIcon type={act.iconType} />
                  </div>

                  {/* Activity Item Card */}
                  <div className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all duration-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border ${act.badgeColor}`}
                        >
                          {act.type}
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <FiClock className="w-3 h-3 text-slate-500" />
                          {act.relativeTime}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                        {act.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {act.description}
                      </p>
                    </div>

                    {/* Amount & Arrow CTA */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-700/50">
                      {act.amountUSD && (
                        <div className="text-right">
                          <div className="text-xs font-bold text-emerald-400">
                            ${act.amountUSD.toFixed(2)}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            ₹{act.amountINR.toLocaleString()}
                          </div>
                        </div>
                      )}
                      <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                        <FiChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-12 text-center text-slate-500 space-y-2">
            <FiActivity className="w-10 h-10 mx-auto text-slate-600" />
            <div className="text-sm font-medium text-slate-300">No activity events recorded</div>
            <p className="text-xs text-slate-500">
              When bills are paid or receipts are scanned, they will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <RenderEventIcon type={selectedActivity.iconType} />
                <h3 className="text-base font-bold text-white">{selectedActivity.type}</h3>
              </div>
              <button
                onClick={() => setSelectedActivity(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">{selectedActivity.title}</h4>
              <p className="text-xs text-slate-300 bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                {selectedActivity.description}
              </p>

              {/* Metadata key-value list */}
              {selectedActivity.metadata && (
                <div className="space-y-1.5 text-xs text-slate-300">
                  {Object.entries(selectedActivity.metadata).map(([key, val]) => (
                    <div
                      key={key}
                      className="flex justify-between py-1 border-b border-slate-800/60"
                    >
                      <span className="text-slate-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="font-semibold text-white">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedActivity(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityTimeline;
