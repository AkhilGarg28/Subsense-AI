import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  FiEye,
  FiDownload,
  FiTrash2,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiTag,
  FiFileText,
} from 'react-icons/fi';
import { cn } from '../../utils/helpers';

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
    merchantCategory = 'Entertainment',
    amountUSD = 19.99,
    amountINR = 499,
    formattedDate = 'Jul 25, 2026',
    status = 'Completed',
  } = receipt;

  const isCompleted = status === 'Completed';
  const isProcessing = status === 'Processing';
  const isFailed = status === 'Failed';
  const initial = merchantName?.charAt(0)?.toUpperCase() || 'R';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn('app-card flex min-h-[260px] flex-col justify-between !p-5', className)}
    >
      <div>
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="gradient-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-base font-black text-white shadow-glow-blue">
              {initial}
            </div>

            <div className="min-w-0">
              <h4 className="truncate text-base font-extrabold text-white">
                {merchantName}
              </h4>
              <p className="truncate text-xs text-text-secondary">
                {fileName} - {fileSize} - {String(fileType).toUpperCase()}
              </p>
            </div>
          </div>

          {isCompleted && (
            <span className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success/[0.12] px-2.5 py-1 text-[10px] font-extrabold text-success">
              <FiCheckCircle className="h-3 w-3" />
              Done
            </span>
          )}
          {isProcessing && (
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/[0.12] px-2.5 py-1 text-[10px] font-extrabold text-primary">
              <FiClock className="h-3 w-3 animate-spin" />
              Scanning
            </span>
          )}
          {isFailed && (
            <span className="inline-flex items-center gap-1 rounded-full border border-danger/30 bg-danger/[0.12] px-2.5 py-1 text-[10px] font-extrabold text-danger">
              <FiAlertTriangle className="h-3 w-3" />
              Failed
            </span>
          )}
        </div>

        <div className="surface-panel flex items-center justify-between gap-4 p-4">
          <div>
            <span className="block text-[10px] font-extrabold uppercase tracking-wider text-text-muted">
              Extracted Total
            </span>
            <div className="mt-1 flex flex-wrap items-baseline gap-2">
              <span className="text-2xl font-black text-white">${Number(amountUSD).toFixed(2)}</span>
              <span className="text-sm font-bold text-success">INR {Number(amountINR).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 rounded-xl border border-secondary/30 bg-secondary/[0.12] px-3 py-1.5 text-xs font-bold text-secondary">
            <FiTag className="h-3.5 w-3.5" />
            {merchantCategory}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-text-secondary">
        <span className="font-bold">{formattedDate}</span>

        <div className="flex items-center gap-2">
          {onView && (
            <button
              type="button"
              onClick={() => onView(receipt)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-surface text-text-secondary transition-all hover:border-primary/40 hover:text-white"
              title="View receipt details"
            >
              <FiEye className="h-4 w-4" />
            </button>
          )}

          {onDownload && (
            <button
              type="button"
              onClick={() => onDownload(receipt)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-surface text-text-secondary transition-all hover:border-success/40 hover:text-white"
              title="Download file"
            >
              <FiDownload className="h-4 w-4" />
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(id)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-danger/25 bg-danger/[0.1] text-danger transition-all hover:bg-danger/[0.18]"
              title="Delete receipt"
            >
              <FiTrash2 className="h-4 w-4" />
            </button>
          )}

          {!onView && !onDownload && !onDelete && <FiFileText className="h-4 w-4" />}
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
    merchantCategory: PropTypes.string,
    amountUSD: PropTypes.number,
    amountINR: PropTypes.number,
    formattedDate: PropTypes.string,
    status: PropTypes.string,
  }),
  onView: PropTypes.func,
  onDownload: PropTypes.func,
  onDelete: PropTypes.func,
  className: PropTypes.string,
};

export default ReceiptCard;
