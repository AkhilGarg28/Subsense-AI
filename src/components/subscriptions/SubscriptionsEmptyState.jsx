import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiUploadCloud,
  FiFileText,
  FiCreditCard,
  FiRefreshCw,
  FiPlusCircle,
} from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { cn } from '../../utils/helpers';

/**
 * SubscriptionsEmptyState — SubSense AI Empty State Component
 *
 * Rendered when no subscriptions match current filter criteria or when zero subscriptions exist.
 * Encourages users to upload a receipt/invoice for AI automated tracking.
 */
const SubscriptionsEmptyState = ({
  title = 'No subscriptions detected yet.',
  subtitle = 'Upload a receipt or invoice to let AI automatically track your recurring debits.',
  actionText = 'Upload Your First Receipt',
  actionLink = '/upload',
  onActionClick,
  isFilteredState = false,
  onResetFilters,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn(
        'relative mx-auto flex w-full max-w-2xl flex-col items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center backdrop-blur-2xl shadow-2xl sm:p-12 overflow-hidden',
        className
      )}
    >
      {/* Subtle Background Glow Spheres */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-indigo-600/10 blur-3xl" />

      {/* Floating Animated Graphic Illustration Badge */}
      <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
        {/* Decorative Pulsing Halo Outer Rings */}
        <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/10 duration-1000" />
        <div className="absolute -inset-2 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md" />
        
        {/* Main Center Icon Circle */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-500/30 bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl">
          <FiFileText className="h-9 w-9 text-blue-400" />
          
          {/* Badge Icon Mini Overlays */}
          <span className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md border border-indigo-400/40">
            <HiOutlineSparkles className="h-4 w-4 animate-spin-slow" />
          </span>
          <span className="absolute -top-1.5 -left-1.5 flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <FiCreditCard className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      {/* Text Content */}
      <h3 className="mb-2.5 text-xl font-bold tracking-tight text-white sm:text-2xl">
        {isFilteredState ? 'No matching subscriptions found' : title}
      </h3>
      <p className="mb-8 max-w-md text-sm leading-relaxed text-slate-400">
        {isFilteredState
          ? 'No recurring debits matched your active status, category, or search filters. Try clearing your search query or filter tags.'
          : subtitle}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {isFilteredState && onResetFilters ? (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-200 shadow-md transition-all hover:bg-slate-700 hover:text-white hover:border-slate-600"
          >
            <FiRefreshCw className="h-4 w-4 text-blue-400" />
            <span>Reset All Filters</span>
          </button>
        ) : (
          <>
            {onActionClick ? (
              <button
                type="button"
                onClick={onActionClick}
                className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] hover:shadow-blue-500/40 active:scale-[0.98]"
              >
                <FiUploadCloud className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{actionText}</span>
              </button>
            ) : (
              <Link
                to={actionLink}
                className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] hover:shadow-blue-500/40 active:scale-[0.98]"
              >
                <FiUploadCloud className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{actionText}</span>
              </Link>
            )}

            {/* Quick Add Manual Option */}
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-800/80 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-300 transition-all hover:bg-slate-700 hover:text-white"
            >
              <FiPlusCircle className="h-4 w-4 text-slate-400" />
              <span>Scan Invoice</span>
            </Link>
          </>
        )}
      </div>

      {/* Feature Bullet Perks */}
      {!isFilteredState && (
        <div className="mt-10 border-t border-slate-800/80 pt-6 w-full max-w-lg">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Why use SubSense AI Receipt Scanning?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-left text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <span>Instant AI OCR Extraction</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              <span>Auto Renewal Alerts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Price Hike Alerts</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

SubscriptionsEmptyState.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  actionText: PropTypes.string,
  actionLink: PropTypes.string,
  onActionClick: PropTypes.func,
  isFilteredState: PropTypes.bool,
  onResetFilters: PropTypes.func,
  className: PropTypes.string,
};

export default SubscriptionsEmptyState;
