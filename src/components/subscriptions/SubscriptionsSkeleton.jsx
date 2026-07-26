import React from 'react';
import PropTypes from 'prop-types';

/**
 * SubscriptionsSkeleton — Shimmer pulse loading placeholders for SubSense AI Subscriptions Page.
 * Includes skeleton variants for:
 * - Summary metric cards
 * - AI Insights & Renewal Calendar grid
 * - Search & Filter control bar
 * - Subscription Grid Cards
 * - Subscription Table rows
 * - Recharts statistics charts section
 */

export const SummaryCardsSkeleton = ({ count = 4 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
    {Array.from({ length: count }).map((_, idx) => (
      <div
        key={idx}
        className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-xl animate-pulse"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-slate-800" />
            <div className="h-3 w-28 rounded bg-slate-800" />
          </div>
          <div className="h-5 w-12 rounded-lg bg-slate-800" />
        </div>
        <div className="mt-4">
          <div className="h-8 w-36 rounded-lg bg-slate-800" />
          <div className="mt-3 flex items-center justify-between border-t border-slate-800/60 pt-3">
            <div className="h-3 w-24 rounded bg-slate-800" />
            <div className="h-4 w-16 rounded-full bg-slate-800" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const InsightsAndCalendarSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Insights Panel Skeleton */}
    <div className="lg:col-span-2 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl animate-pulse">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-slate-800" />
          <div className="space-y-2">
            <div className="h-4 w-40 rounded bg-slate-800" />
            <div className="h-3 w-56 rounded bg-slate-800" />
          </div>
        </div>
        <div className="h-6 w-24 rounded-full bg-slate-800" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="rounded-xl border border-slate-800 bg-slate-800/40 p-4 space-y-3">
            <div className="flex justify-between">
              <div className="h-4 w-20 rounded bg-slate-800" />
              <div className="h-4 w-16 rounded bg-slate-800" />
            </div>
            <div className="h-5 w-32 rounded bg-slate-800" />
            <div className="h-3 w-full rounded bg-slate-800" />
            <div className="h-3 w-3/4 rounded bg-slate-800" />
            <div className="h-8 w-full rounded-lg bg-slate-800 pt-2" />
          </div>
        ))}
      </div>
    </div>

    {/* Renewal Calendar Skeleton */}
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl animate-pulse">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-slate-800" />
          <div className="h-4 w-32 rounded bg-slate-800" />
        </div>
        <div className="h-5 w-16 rounded bg-slate-800" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-800/30">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-slate-800" />
              <div className="space-y-1.5">
                <div className="h-3.5 w-28 rounded bg-slate-800" />
                <div className="h-2.5 w-16 rounded bg-slate-800" />
              </div>
            </div>
            <div className="h-4 w-20 rounded bg-slate-800" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const ControlsSkeleton = () => (
  <div className="w-full rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-xl animate-pulse flex flex-col md:flex-row items-center justify-between gap-4">
    <div className="h-10 w-full md:w-80 rounded-xl bg-slate-800" />
    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
      <div className="h-9 w-28 rounded-xl bg-slate-800" />
      <div className="h-9 w-36 rounded-xl bg-slate-800" />
      <div className="h-9 w-36 rounded-xl bg-slate-800" />
      <div className="h-9 w-20 rounded-xl bg-slate-800" />
    </div>
  </div>
);

export const SubscriptionCardsSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {Array.from({ length: count }).map((_, idx) => (
      <div
        key={idx}
        className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-xl animate-pulse flex flex-col justify-between space-y-4"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-slate-800" />
            <div className="space-y-2">
              <div className="h-4 w-32 rounded bg-slate-800" />
              <div className="h-3 w-24 rounded bg-slate-800" />
            </div>
          </div>
          <div className="h-6 w-16 rounded-full bg-slate-800" />
        </div>

        <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800/60 flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-3 w-20 rounded bg-slate-800" />
            <div className="h-6 w-28 rounded bg-slate-800" />
          </div>
          <div className="h-6 w-24 rounded-lg bg-slate-800" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="h-10 rounded-xl bg-slate-800/40 border border-slate-800/60" />
          <div className="h-10 rounded-xl bg-slate-800/40 border border-slate-800/60" />
        </div>

        <div className="pt-3 border-t border-slate-800/60 flex items-center gap-2">
          <div className="h-9 flex-1 rounded-xl bg-slate-800" />
          <div className="h-9 flex-1 rounded-xl bg-slate-800" />
          <div className="h-9 w-16 rounded-xl bg-slate-800" />
        </div>
      </div>
    ))}
  </div>
);

export const SubscriptionTableSkeleton = ({ rows = 6 }) => (
  <div className="w-full rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl overflow-hidden animate-pulse">
    <div className="border-b border-slate-800 p-4 bg-slate-800/30 flex items-center justify-between">
      <div className="h-4 w-32 rounded bg-slate-800" />
      <div className="h-4 w-24 rounded bg-slate-800" />
    </div>
    <div className="divide-y divide-slate-800/60">
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-1/4">
            <div className="h-10 w-10 rounded-xl bg-slate-800 shrink-0" />
            <div className="space-y-1.5 min-w-0">
              <div className="h-4 w-28 rounded bg-slate-800" />
              <div className="h-3 w-16 rounded bg-slate-800" />
            </div>
          </div>
          <div className="h-4 w-20 rounded bg-slate-800 hidden md:block" />
          <div className="h-4 w-24 rounded bg-slate-800" />
          <div className="h-4 w-24 rounded bg-slate-800 hidden sm:block" />
          <div className="h-6 w-20 rounded-full bg-slate-800" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-slate-800" />
            <div className="h-8 w-8 rounded-lg bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const StatisticsChartsSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
    <div className="lg:col-span-2 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl h-80 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="h-5 w-48 rounded bg-slate-800" />
        <div className="h-4 w-24 rounded bg-slate-800" />
      </div>
      <div className="h-56 w-full rounded-xl bg-slate-800/40" />
    </div>
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl h-80 flex flex-col justify-between">
      <div className="h-5 w-40 rounded bg-slate-800" />
      <div className="h-48 w-48 mx-auto rounded-full bg-slate-800/40" />
      <div className="flex justify-center gap-4">
        <div className="h-3 w-16 rounded bg-slate-800" />
        <div className="h-3 w-16 rounded bg-slate-800" />
      </div>
    </div>
  </div>
);

/**
 * SubscriptionsSkeleton — Full Page Shimmer Loader
 */
const SubscriptionsSkeleton = ({ viewMode = 'grid', cardCount = 6 }) => {
  return (
    <div className="w-full space-y-8 py-6">
      {/* 1. Summary Cards Grid Skeleton */}
      <SummaryCardsSkeleton />

      {/* 2. Insights & Renewal Calendar Grid Skeleton */}
      <InsightsAndCalendarSkeleton />

      {/* 3. Controls Bar Skeleton */}
      <ControlsSkeleton />

      {/* 4. Subscriptions List Skeleton (Grid or Table) */}
      {viewMode === 'table' ? (
        <SubscriptionTableSkeleton rows={cardCount} />
      ) : (
        <SubscriptionCardsSkeleton count={cardCount} />
      )}

      {/* 5. Statistics Charts Section Skeleton */}
      <StatisticsChartsSkeleton />
    </div>
  );
};

SubscriptionsSkeleton.propTypes = {
  viewMode: PropTypes.oneOf(['grid', 'table', 'list']),
  cardCount: PropTypes.number,
};

export default SubscriptionsSkeleton;
