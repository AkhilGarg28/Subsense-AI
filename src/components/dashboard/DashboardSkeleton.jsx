import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/helpers';

/**
 * Common Skeleton Box with shimmer pulse animation
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

/**
 * Stat Card Skeleton Placeholder
 */
export const StatCardSkeleton = () => (
  <div className="relative overflow-hidden rounded-2xl border border-glass-border bg-glass p-5 backdrop-blur-xl space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="h-11 w-11 rounded-xl" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>

    <div className="space-y-2 pt-2">
      <Skeleton className="h-8 w-36" />
      <Skeleton className="h-3 w-28" />
    </div>

    {/* Sparkline area shimmer */}
    <div className="h-12 w-full pt-2">
      <Skeleton className="h-full w-full rounded-lg" />
    </div>
  </div>
);

/**
 * Quick Action Bar Skeleton Placeholder
 */
export const QuickActionsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 w-full">
    {[1, 2, 3, 4].map((item) => (
      <div
        key={item}
        className="flex items-center justify-between rounded-2xl border border-glass-border bg-glass p-4 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3 w-full">
          <Skeleton className="h-11 w-11 rounded-xl shrink-0" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-36" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

/**
 * Chart Box Skeleton Placeholder
 */
export const ChartSkeleton = ({ height = 'h-72', titleWidth = 'w-40' }) => (
  <div className="rounded-2xl border border-glass-border bg-glass p-6 backdrop-blur-xl space-y-5">
    <div className="flex items-center justify-between border-b border-glass-border pb-4">
      <div className="space-y-1.5">
        <Skeleton className={`h-5 ${titleWidth}`} />
        <Skeleton className="h-3.5 w-48" />
      </div>
      <Skeleton className="h-8 w-28 rounded-lg" />
    </div>

    <div className={cn('w-full flex items-end gap-3 pt-4', height)}>
      {[40, 65, 30, 85, 55, 75, 90, 60, 80, 45, 95, 70].map((h, idx) => (
        <div key={idx} className="flex-1 flex flex-col justify-end h-full">
          <Skeleton className="w-full rounded-t-md" style={{ height: `${h}%` }} />
        </div>
      ))}
    </div>
  </div>
);

/**
 * Table Rows Skeleton Placeholder
 */
export const TableSkeleton = ({ rows = 5 }) => (
  <div className="rounded-2xl border border-glass-border bg-glass p-6 backdrop-blur-xl space-y-4">
    <div className="flex items-center justify-between pb-3 border-b border-glass-border">
      <div className="space-y-1">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-3.5 w-60" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-24 rounded-lg" />
        <Skeleton className="h-9 w-28 rounded-lg" />
      </div>
    </div>

    <div className="space-y-3 pt-2">
      {Array.from({ length: rows }).map((_, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between gap-4 p-3.5 rounded-xl border border-slate-800/60 bg-slate-900/50"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-4 w-20 hidden md:block" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      ))}
    </div>
  </div>
);

/**
 * DashboardSkeleton — Master loading skeleton for the SubSense AI Dashboard page.
 * Renders shimmering placeholder layouts for header, stat grid, charts, tables, and AI cards.
 */
const DashboardSkeleton = ({ className = '' }) => {
  return (
    <div className={cn('space-y-6 w-full animate-fade-in', className)}>
      {/* Header Greeting Banner Skeleton */}
      <div className="rounded-2xl border border-glass-border bg-glass p-6 backdrop-blur-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-56 rounded-lg" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-4 w-80 rounded-md" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-32 rounded-xl" />
            <Skeleton className="h-10 w-36 rounded-xl" />
          </div>
        </div>

        {/* Quick Actions Skeleton */}
        <QuickActionsSkeleton />
      </div>

      {/* 4 Stat Cards Skeleton Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* Health Score + Expense Chart Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 rounded-2xl border border-glass-border bg-glass p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-glass-border pb-3">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="flex justify-center py-4">
            <Skeleton className="h-36 w-36 rounded-full" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-4/5" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        </div>

        <div className="lg:col-span-2">
          <ChartSkeleton height="h-64" titleWidth="w-48" />
        </div>
      </div>

      {/* Category Chart + Bills List Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-glass-border bg-glass p-6 backdrop-blur-xl space-y-5">
          <div className="flex items-center justify-between border-b border-glass-border pb-4">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-6">
            <Skeleton className="h-44 w-44 rounded-full shrink-0" />
            <div className="space-y-3 w-full sm:w-48">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>

        <TableSkeleton rows={4} />
      </div>

      {/* Subscriptions Table Section Skeleton */}
      <TableSkeleton rows={5} />

      {/* AI Recommendations + Activity Timeline Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-glass-border bg-glass p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-glass-border pb-3">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="space-y-3 pt-2">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-8 w-28 rounded-lg mt-2" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-glass-border bg-glass p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-glass-border pb-3">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="space-y-4 pt-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex gap-3 items-start">
                <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-60" />
                  <Skeleton className="h-2.5 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardSkeleton.propTypes = {
  className: PropTypes.string,
};

export default DashboardSkeleton;
