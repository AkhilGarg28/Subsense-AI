import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCopy,
  FiCheck,
  FiDownload,
  FiZap,
  FiCreditCard,
  FiCalendar,
  FiTag,
  FiChevronDown,
  FiChevronUp,
  FiCheckCircle,
  FiDollarSign,
  FiFileText,
  FiBookmark,
} from 'react-icons/fi';
import { HiOutlineShieldCheck, HiOutlineSparkles } from 'react-icons/hi';
import { cn } from '../../utils/helpers';

/**
 * Default mock AI-extracted receipt data
 */
const DEFAULT_EXTRACTED_DATA = {
  merchantName: 'Netflix',
  logoEmoji: '🍿',
  amountUSD: 19.99,
  amountINR: 499,
  category: 'Entertainment',
  paymentMethod: 'UPI / Credit Card (Visa •••• 4242)',
  paymentType: 'UPI',
  billingDate: '2026-07-25',
  nextRenewalDate: '2026-08-25',
  isSubscription: true,
  recurringPeriod: 'Monthly',
  confidenceScore: 99.4,
  invoiceNumber: 'INV-2026-88912',
  taxAmountUSD: 0.00,
  taxAmountINR: 0,
  lineItems: [
    {
      id: 'item-1',
      description: 'Netflix Premium (4K Ultra HD + 4 Screens)',
      qty: 1,
      priceUSD: 19.99,
      priceINR: 499,
    },
    {
      id: 'item-2',
      description: 'Digital Entertainment Service Tax',
      qty: 1,
      priceUSD: 0.00,
      priceINR: 0,
    },
  ],
  fieldConfidence: {
    merchant: 100,
    amount: 99.8,
    dates: 99.2,
    category: 98.6,
  },
};

/**
 * ExtractedInfoCard Component
 *
 * Glassmorphic card displaying AI-extracted information from uploaded receipt:
 * - Merchant Name & Logo badge (e.g. Netflix 🍿)
 * - Extracted Amount (Dual USD $19.99 / INR ₹499 display)
 * - Category badge (Entertainment)
 * - Payment Method (UPI / Credit Card)
 * - Billing Date & Next Renewal Date
 * - Subscription Detected badge ("⚡ Monthly Recurring Subscription")
 * - Line items list & Confidence Score (99.4%)
 * - Copy / Export buttons
 *
 * @param {Object} props
 * @param {Object} [props.data] - Extracted receipt data object
 * @param {Function} [props.onSave] - Callback when saving to subscriptions
 * @param {Function} [props.onExport] - Callback when exporting extracted data
 * @param {string} [props.className] - Extra Tailwind CSS classes
 */
const ExtractedInfoCard = ({
  data = DEFAULT_EXTRACTED_DATA,
  onSave,
  onExport,
  className = '',
}) => {
  // Merge default data with props
  const info = { ...DEFAULT_EXTRACTED_DATA, ...data };

  const [copiedField, setCopiedField] = useState(null);
  const [showLineItems, setShowLineItems] = useState(true);
  const [showConfidenceDetails, setShowConfidenceDetails] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Copy helper with feedback timer
  const handleCopy = (text, fieldName) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  // Copy full JSON data
  const handleCopyJSON = () => {
    const jsonString = JSON.stringify(info, null, 2);
    handleCopy(jsonString, 'json');
  };

  // Export CSV representation
  const handleExportCSV = () => {
    const csvHeader = 'Merchant,Amount USD,Amount INR,Category,Payment Method,Billing Date,Renewal Date,Confidence\n';
    const csvRow = `"${info.merchantName}",${info.amountUSD},${info.amountINR},"${info.category}","${info.paymentMethod}",${info.billingDate},${info.nextRenewalDate},${info.confidenceScore}%\n`;
    const blob = new Blob([csvHeader + csvRow], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${info.merchantName.toLowerCase()}_extracted_info.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (onExport) onExport(info);
  };

  // Handle Save Action
  const handleSave = () => {
    setIsSaved(true);
    if (onSave) onSave(info);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl shadow-2xl transition-all duration-300',
        'hover:border-blue-500/40 hover:shadow-blue-500/10',
        className
      )}
    >
      {/* Background Decorative Ambient Glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl transition-opacity duration-500 group-hover:bg-blue-500/20" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl transition-opacity duration-500 group-hover:bg-emerald-500/20" />

      {/* Top Banner: Subscription Detected Badge & Confidence Score */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        {/* Subscription Detected Badge */}
        {info.isSubscription ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 shadow-sm animate-pulse-glow">
            <FiZap className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span>⚡ {info.recurringPeriod} Recurring Subscription</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
            <FiFileText className="h-3.5 w-3.5 text-slate-400" />
            <span>One-time Receipt</span>
          </div>
        )}

        {/* Confidence Score Pill */}
        <button
          type="button"
          onClick={() => setShowConfidenceDetails(!showConfidenceDetails)}
          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer"
          title="Click to view extraction accuracy breakdown"
        >
          <HiOutlineShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>AI Confidence: <strong className="font-bold text-emerald-300">{info.confidenceScore}%</strong></span>
        </button>
      </div>

      {/* Field-by-field Confidence Score Breakdown Dropdown */}
      <AnimatePresence>
        {showConfidenceDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="my-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs space-y-2"
          >
            <div className="flex items-center justify-between text-slate-400 font-medium">
              <span>Extraction Precision Breakdown</span>
              <span className="text-[10px] text-slate-500">LLM Vision OCR v4.2</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800/60">
                <span className="text-slate-400 block text-[10px]">Merchant</span>
                <span className="font-bold text-emerald-400">{info.fieldConfidence?.merchant || 100}%</span>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800/60">
                <span className="text-slate-400 block text-[10px]">Amount</span>
                <span className="font-bold text-emerald-400">{info.fieldConfidence?.amount || 99.8}%</span>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800/60">
                <span className="text-slate-400 block text-[10px]">Dates</span>
                <span className="font-bold text-emerald-400">{info.fieldConfidence?.dates || 99.2}%</span>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800/60">
                <span className="text-slate-400 block text-[10px]">Category</span>
                <span className="font-bold text-emerald-400">{info.fieldConfidence?.category || 98.6}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Extracted Header: Merchant & Dual Amount Display */}
      <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Merchant Name & Logo Badge */}
        <div className="flex items-center gap-3.5">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700/80 bg-gradient-to-br from-slate-800 to-slate-900 text-2xl shadow-md group-hover:scale-105 transition-transform duration-300">
            <span>{info.logoEmoji || '🏢'}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                {info.merchantName}
              </h3>
              <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20">
                Verified AI
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
              <span>Ref: {info.invoiceNumber}</span>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleCopy(info.merchantName, 'merchant')}
                className="text-slate-400 hover:text-blue-400 inline-flex items-center gap-1 transition-colors cursor-pointer"
                title="Copy merchant name"
              >
                {copiedField === 'merchant' ? (
                  <FiCheck className="h-3 w-3 text-emerald-400" />
                ) : (
                  <FiCopy className="h-3 w-3" />
                )}
              </button>
            </p>
          </div>
        </div>

        {/* Dual Currency Display (USD & INR) */}
        <div className="sm:text-right bg-slate-800/40 p-3 sm:p-0 rounded-xl sm:bg-transparent border border-slate-800 sm:border-none">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Extracted Amount
          </div>
          <div className="flex items-baseline gap-2 sm:justify-end mt-0.5">
            <span className="text-2xl font-extrabold text-emerald-400 tracking-tight sm:text-3xl">
              ${Number(info.amountUSD).toFixed(2)}
            </span>
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
              ₹{Number(info.amountINR).toLocaleString('en-IN')}
            </span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Dual Display (USD / INR) • Tax included
          </div>
        </div>
      </div>

      {/* Metadata Key-Value Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Category */}
        <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-3.5">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
            <FiTag className="h-3.5 w-3.5 text-purple-400" />
            <span>Category</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300">
            {info.category}
          </div>
        </div>

        {/* Payment Method */}
        <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-3.5">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
            <FiCreditCard className="h-3.5 w-3.5 text-blue-400" />
            <span>Payment Method</span>
          </div>
          <div className="text-xs font-semibold text-white truncate" title={info.paymentMethod}>
            {info.paymentMethod}
          </div>
        </div>

        {/* Billing Date */}
        <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-3.5">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
            <FiCalendar className="h-3.5 w-3.5 text-amber-400" />
            <span>Billing Date</span>
          </div>
          <div className="text-xs font-semibold text-white">
            {info.billingDate}
          </div>
        </div>

        {/* Next Renewal Date */}
        <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-3.5">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
            <HiOutlineSparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Next Renewal</span>
          </div>
          <div className="text-xs font-semibold text-emerald-300">
            {info.nextRenewalDate}
          </div>
        </div>
      </div>

      {/* Accordion: Line Items List */}
      <div className="mt-6 border-t border-slate-800 pt-4">
        <button
          type="button"
          onClick={() => setShowLineItems(!showLineItems)}
          className="flex w-full items-center justify-between text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <FiFileText className="h-4 w-4 text-blue-400" />
            <span>Itemized Line Items ({info.lineItems?.length || 0})</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-[11px]">
            <span>{showLineItems ? 'Hide Details' : 'Show Details'}</span>
            {showLineItems ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        </button>

        <AnimatePresence>
          {showLineItems && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/40"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 bg-slate-900/60 text-[11px] uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="py-2.5 px-3.5">Description</th>
                      <th className="py-2.5 px-3.5 text-center">Qty</th>
                      <th className="py-2.5 px-3.5 text-right">Price (USD / INR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {info.lineItems && info.lineItems.length > 0 ? (
                      info.lineItems.map((item, idx) => (
                        <tr key={item.id || idx} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-2.5 px-3.5 text-white font-medium">
                            {item.description}
                          </td>
                          <td className="py-2.5 px-3.5 text-center text-slate-400">
                            {item.qty}
                          </td>
                          <td className="py-2.5 px-3.5 text-right font-semibold text-emerald-400">
                            ${Number(item.priceUSD).toFixed(2)}
                            <span className="ml-1 text-[10px] text-slate-400 font-normal">
                              (₹{item.priceINR})
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="py-3 px-3.5 text-center text-slate-500">
                          No line items extracted.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Action Buttons: Copy, Export, Save */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
        {/* Secondary Actions: Copy JSON & Export CSV */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopyJSON}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
          >
            {copiedField === 'json' ? (
              <>
                <FiCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">JSON Copied!</span>
              </>
            ) : (
              <>
                <FiCopy className="h-3.5 w-3.5 text-slate-400" />
                <span>Copy JSON</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
          >
            <FiDownload className="h-3.5 w-3.5 text-slate-400" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Primary CTA: Save to Subscriptions */}
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaved}
          className={cn(
            'inline-flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold transition-all duration-300 cursor-pointer shadow-lg',
            isSaved
              ? 'bg-emerald-600 text-white shadow-emerald-600/20'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 hover:scale-[1.02]'
          )}
        >
          {isSaved ? (
            <>
              <FiCheckCircle className="h-4 w-4" />
              <span>Saved to Portfolio!</span>
            </>
          ) : (
            <>
              <FiBookmark className="h-4 w-4" />
              <span>Save to Subscriptions</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

ExtractedInfoCard.propTypes = {
  data: PropTypes.shape({
    merchantName: PropTypes.string,
    logoEmoji: PropTypes.string,
    amountUSD: PropTypes.number,
    amountINR: PropTypes.number,
    category: PropTypes.string,
    paymentMethod: PropTypes.string,
    paymentType: PropTypes.string,
    billingDate: PropTypes.string,
    nextRenewalDate: PropTypes.string,
    isSubscription: PropTypes.bool,
    recurringPeriod: PropTypes.string,
    confidenceScore: PropTypes.number,
    invoiceNumber: PropTypes.string,
    taxAmountUSD: PropTypes.number,
    taxAmountINR: PropTypes.number,
    lineItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        description: PropTypes.string,
        qty: PropTypes.number,
        priceUSD: PropTypes.number,
        priceINR: PropTypes.number,
      })
    ),
    fieldConfidence: PropTypes.object,
  }),
  onSave: PropTypes.func,
  onExport: PropTypes.func,
  className: PropTypes.string,
};

export default ExtractedInfoCard;
