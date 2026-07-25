import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  FiFileText,
  FiEye,
  FiDownload,
  FiTrash2,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiTag,
  FiArrowUpRight,
} from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { cn } from '../../utils/helpers';

/**
 * ReceiptCard Component
 *
 * Visual card component displaying a single scanned receipt's summary:
 * - Merchant name & Logo emoji / brand avatar
 * - Amount in USD & INR
 * - Category badge & File format
 * - Processing status badge (Completed, Processing, Failed)
 * - Quick action buttons for View details & Download
 *
 * @param {Object} props
 * @param {Object} props.receipt - Receipt data object
 * @param {Function} [props.onView] - Callback when viewing receipt
 * @param {Function} [props.onDownload] - Callback when downloading receipt
 * @param {Function} [props.onDelete] - Callback when deleting receipt
 * @param {string} [props.className] - Custom container styling
 */
const ReceiptCard = ({
  receipt = {},
  onView,
  onDownload,
  onDelete,
  className = '',
}) => {
  const {
    id = 'up-001',
    fileName = 'Receipt_Invoice.pdf',
    fileSize = '1.2 MB',
    fileType = 'pdf',
    merchantName = 'Netflix',
    logoEmoji = '🍿',
    merchantCategory = 'Entertainment',
    amountUSD = 19.99,
    amountINR = 499,
    formattedDate = 'Jul 25, 2026',
    status = 'Completed',
    failureReason = '',
  } = receipt;

  const isCompleted = status === 'Completed';
  const isProcessing = status === 'Processing';
  const isFailed = status === 'Failed';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl shadow-xl transition-all duration-300',
        'hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10',
        className
      )}
    >
      {/* Top Header Row: Merchant & Status Pill */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {/* Merchant Logo Emoji or File Icon */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-700/80 bg-gradient-to-br from-slate-800 to-slate-900 text-xl shadow-inner group-hover:scale-105 transition-transform duration-300">
              <span>{logoEmoji || '📄'}</span>
            </div>

            <div className="min-w-0">
              <h4 className="truncate text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                {merchantName}
              </h4>
              <p className="truncate text-xs text-slate-400 font-medium">
                {fileName}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                <FiCheckCircle className="h-3 w-3" />
                Completed
              </span>
            )}
            {isProcessing && (
              <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300 animate-pulse">
                <FiClock className="h-3 w-3 animate-spin" />
                Processing
              </span>
            )}
            {isFailed && (
              <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-0.5 text-[10px] font-bold text-rose-400">
                <FiAlertTriangle className="h-3 w-3" />
                Failed
              </span>
            )}
          </div>
        </div>

        {/* Amount & Dual Currency Display */}
        <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-950/40 p-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Extracted Total
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-lg font-extrabold text-emerald-400">
                ${Number(amountUSD).toFixed(2)}
              </span>
              <span className="text-xs font-bold text-slate-400">
                (₹{Number(amountINR).toLocaleString('en-IN')})
              </span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/90 px-2 py-1 text-[10px] font-medium text-slate-300">
            <FiTag className="h-3 w-3 text-purple-400" />
            {merchantCategory}
          </span>
        </div>
      </div>

      {/* Card Footer: Upload date & Action Buttons */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span className="font-mono text-[11px]">{formattedDate}</span>

        <div className="flex items-center gap-1.5">
          {onView && (
            <button
              type="button"
              onClick={() => onView(receipt)}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all cursor-pointer"
              title="View receipt details"
            >
              <FiEye className="h-3.5 w-3.5" />
            </button>
          )}

          {onDownload && (
            <button
              type="button"
              onClick={() => onDownload(receipt)}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all cursor-pointer"
              title="Download file"
            >
              <FiDownload className="h-3.5 w-3.5" />
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(id)}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-400 hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400 transition-all cursor-pointer"
              title="Delete receipt"
            >
              <FiTrash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

ReceiptCard.propTypes = {
  receipt: PropTypes.shape({
    id: PropTypes.string,
    fileName: PropTypes.string,
    fileSize: PropTypes.string,
    fileType: PropTypes.string,
    merchantName: PropTypes.string,
    logoEmoji: PropTypes.string,
    merchantCategory: PropTypes.string,
    amountUSD: PropTypes.number,
    amountINR: PropTypes.number,
    formattedDate: PropTypes.string,
    status: PropTypes.string,
    failureReason: PropTypes.string,
  }),
  onView: PropTypes.func,
  onDownload: PropTypes.func,
  onDelete: PropTypes.func,
  className: PropTypes.string,
};

export default ReceiptCard;
