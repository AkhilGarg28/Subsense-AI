import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/helpers';

/**
 * Common Skeleton Box with shimmer pulse animation matching SubSense AI design language
 */
const Skeleton = ({ className = '', ...props }) => (
  <div
    className={cn(
      'animate-pulse rounded-xl bg-slate-800/80 bg-gradient-to-r from-slate-800/80 via-slate-700/50 to-slate-800/80 bg-[length:200%_100%]',
      className
    )}
    {...props}
  />
);

Skeleton.propTypes = {
  className: PropTypes.string,
};

/**
 * Upload Box Skeleton Placeholder
 * Replicates drag & drop upload zone structure
 */
export const UploadBoxSkeleton = ({ className = '' }) => (
  <div
    className={cn(
      'relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-800/80 bg-slate-900/60 p-8 sm:p-12 text-center backdrop-blur-xl space-y-4',
      className
    )}
  >
    {/* Upload Icon Placeholder */}
    <Skeleton className="h-16 w-16 rounded-2xl" />

    {/* Header & Description Placeholders */}
    <div className="space-y-2 flex flex-col items-center w-full max-w-md">
      <Skeleton className="h-6 w-3/4 rounded-lg" />
      <Skeleton className="h-4 w-5/6 rounded-md" />
      <Skeleton className="h-3.5 w-2/3 rounded-md" />
    </div>

    {/* Format Badges Placeholders */}
    <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
      <Skeleton className="h-7 w-16 rounded-full" />
      <Skeleton className="h-7 w-16 rounded-full" />
      <Skeleton className="h-7 w-16 rounded-full" />
      <Skeleton className="h-7 w-16 rounded-full" />
      <Skeleton className="h-7 w-20 rounded-full" />
    </div>
  </div>
);

UploadBoxSkeleton.propTypes = {
  className: PropTypes.string,
};

/**
 * Extracted Info Card Skeleton Placeholder
 * Replicates AI extracted summary card layout with dual amounts, category, line items table
 */
export const ExtractedInfoCardSkeleton = ({ className = '' }) => (
  <div
    className={cn(
      'rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl space-y-6',
      className
    )}
  >
    {/* Top Bar: Subscription Pill & Confidence Score */}
    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
      <Skeleton className="h-6 w-44 rounded-full" />
      <Skeleton className="h-6 w-32 rounded-full" />
    </div>

    {/* Header: Merchant Logo Avatar & Dual Amounts */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        <Skeleton className="h-14 w-14 rounded-2xl shrink-0" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-40 rounded-lg" />
          <Skeleton className="h-3.5 w-28 rounded-md" />
        </div>
      </div>

      <div className="space-y-1.5 sm:text-right">
        <Skeleton className="h-3 w-28 rounded-md" />
        <Skeleton className="h-8 w-36 rounded-lg" />
        <Skeleton className="h-3 w-32 rounded-md" />
      </div>
    </div>

    {/* 4-Item Grid Key-Values */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-3.5 rounded-xl border border-slate-800 bg-slate-800/40 space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-5 w-28 rounded-lg" />
        </div>
      ))}
    </div>

    {/* Line Items Table Placeholder */}
    <div className="space-y-3 pt-2 border-t border-slate-800">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/40 space-y-2.5">
        {[1, 2].map((r) => (
          <div key={r} className="flex justify-between items-center">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>

    {/* Bottom Action Buttons */}
    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
      <div className="flex gap-2">
        <Skeleton className="h-9 w-28 rounded-xl" />
        <Skeleton className="h-9 w-28 rounded-xl" />
      </div>
      <Skeleton className="h-9 w-44 rounded-xl" />
    </div>
  </div>
);

ExtractedInfoCardSkeleton.propTypes = {
  className: PropTypes.string,
};

/**
 * Processing Timeline Skeleton Placeholder
 * Replicates the 5-stage vertical timeline progress box
 */
export const ProcessingTimelineSkeleton = ({ className = '' }) => (
  <div
    className={cn(
      'rounded-2xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-xl space-y-6',
      className
    )}
  >
    {/* Engine Header */}
    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
      <div className="flex items-center gap-3">
        <Skeleton className="h-11 w-11 rounded-xl" />
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-48 rounded-lg" />
          <Skeleton className="h-3.5 w-64 rounded-md" />
        </div>
      </div>
      <Skeleton className="h-8 w-28 rounded-xl" />
    </div>

    {/* 5-Step Vertical Nodes */}
    <div className="space-y-6 relative pl-4">
      {[1, 2, 3, 4, 5].map((step) => (
        <div key={step} className="flex items-start gap-4">
          <Skeleton className="h-10 w-10 rounded-2xl shrink-0" />
          <div className="flex-1 p-3.5 rounded-xl border border-slate-800 bg-slate-800/40 space-y-2">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-3 w-56" />
          </div>
        </div>
      ))}
    </div>

    {/* Footer Latency Summary */}
    <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-48" />
    </div>
  </div>
);

ProcessingTimelineSkeleton.propTypes = {
  className: PropTypes.string,
};

/**
 * History Table Rows Skeleton Placeholder
 * Replicates search filter bar and table rows
 */
export const UploadHistoryTableSkeleton = ({ rows = 5, className = '' }) => (
  <div
    className={cn(
      'rounded-2xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-xl space-y-5',
      className
    )}
  >
    {/* Table Header Controls */}
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
      <Skeleton className="h-10 w-full sm:w-72 rounded-xl" />
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Skeleton className="h-9 w-28 rounded-xl" />
        <Skeleton className="h-9 w-28 rounded-xl" />
        <Skeleton className="h-9 w-28 rounded-xl" />
      </div>
    </div>

    {/* Table Rows Placeholder */}
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 p-4 rounded-xl border border-slate-800/80 bg-slate-900/60"
        >
          <div className="flex items-center gap-3 min-w-[200px]">
            <Skeleton className="h-9 w-9 rounded-xl shrink-0" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-4 w-28 hidden md:block" />
          <Skeleton className="h-5 w-24 rounded-lg" />
          <Skeleton className="h-4 w-28 hidden lg:block" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        </div>
      ))}
    </div>

    {/* Pagination Footer */}
    <div className="flex justify-between items-center pt-3 border-t border-slate-800">
      <Skeleton className="h-4 w-44" />
      <Skeleton className="h-8 w-36 rounded-lg" />
    </div>
  </div>
);

UploadHistoryTableSkeleton.propTypes = {
  rows: PropTypes.number,
  className: PropTypes.string,
};

/**
 * UploadSkeleton — Master loading skeleton for the Receipt Upload & Scanner section.
 * Renders shimmering placeholders for Page Header, Upload Box, Timeline, AI Card, and History Table.
 */
const UploadSkeleton = ({ className = '' }) => {
  return (
    <div className={cn('space-y-6 w-full animate-fade-in', className)}>
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-72 rounded-lg" />
        <Skeleton className="h-4 w-full max-w-xl rounded-md" />
      </div>

      {/* Upload Box & Quick Actions Top Row */}
      <UploadBoxSkeleton />

      {/* Processing Timeline + AI Extracted Info Card Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProcessingTimelineSkeleton />
        <ExtractedInfoCardSkeleton />
      </div>

      {/* Recent Uploads Table Skeleton */}
      <UploadHistoryTableSkeleton rows={5} />
    </div>
  );
};

UploadSkeleton.propTypes = {
  className: PropTypes.string,
};

export default UploadSkeleton;
