import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  HiOutlineDocumentText,
  HiOutlineX,
  HiOutlineCheckCircle,
  HiOutlineRefresh,
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';

/**
 * ProgressBar — Upload & AI Processing progress bar component.
 * Displays percentage indicator (0%-100%), status stages, color-coded gradients, and cancel/clear button.
 */
const ProgressBar = ({
  progress = 0,
  statusText = 'Uploading...',
  fileName = '',
  fileSize = '',
  onCancel,
  className = '',
}) => {
  const isComplete = progress >= 100;
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={cn('w-full rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl shadow-xl', className)}>
      {/* Top Meta Header: File info & Cancel button */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-inner transition-colors duration-300',
              isComplete
                ? 'border-emerald-500/30 bg-emerald-500/20 text-emerald-400'
                : 'border-slate-700 bg-slate-800/80 text-teal-400'
            )}
          >
            {isComplete ? (
              <HiOutlineCheckCircle className="h-5 w-5" />
            ) : (
              <HiOutlineDocumentText className="h-5 w-5 animate-pulse" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="truncate text-sm font-semibold text-white">
              {fileName || 'Receipt Document'}
            </h4>
            {fileSize && (
              <p className="text-xs text-slate-400 font-medium">{fileSize}</p>
            )}
          </div>
        </div>

        {/* Action Button: Cancel / Clear */}
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            title={isComplete ? 'Clear upload' : 'Cancel upload'}
            aria-label={isComplete ? 'Clear upload' : 'Cancel upload'}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/60 text-slate-400 hover:border-slate-600 hover:bg-slate-700 hover:text-white transition-all duration-200"
          >
            <HiOutlineX className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Progress Status Bar Info (Status text & percentage) */}
      <div className="flex items-center justify-between text-xs font-semibold mb-2">
        <div className="flex items-center gap-2">
          {!isComplete && (
            <HiOutlineRefresh className="h-3.5 w-3.5 animate-spin text-emerald-400" />
          )}
          <span className={isComplete ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
            {statusText}
          </span>
        </div>
        <span className={isComplete ? 'text-emerald-400 font-bold' : 'text-emerald-400'}>
          {Math.round(clampedProgress)}%
        </span>
      </div>

      {/* Progress Track & Fill */}
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-800/90 p-0.5 border border-slate-700/50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={cn(
            'h-full rounded-full transition-all duration-300 relative',
            isComplete
              ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-green-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
              : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 shadow-[0_0_10px_rgba(20,184,166,0.4)]'
          )}
        >
          {/* Animated active shimmer line */}
          {!isComplete && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          )}
        </motion.div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number,
  statusText: PropTypes.string,
  fileName: PropTypes.string,
  fileSize: PropTypes.string,
  onCancel: PropTypes.func,
  className: PropTypes.string,
};

export default ProgressBar;
