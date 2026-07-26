import React from 'react';
import PropTypes from 'prop-types';

/**
 * NotificationSkeleton Component
 *
 * Displays animated shimmer loading skeleton cards while notification data is loading.
 */
const NotificationSkeleton = ({ count = 4 }) => {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="space-y-3">
      {items.map((index) => (
        <div
          key={index}
          className="p-4 md:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 animate-pulse flex items-start gap-4"
        >
          {/* Avatar Skeleton */}
          <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-slate-800/80 shrink-0" />

          {/* Body Content Skeleton */}
          <div className="flex-1 space-y-3">
            {/* Header badges & time */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-16 h-5 rounded-full bg-slate-800" />
                <div className="w-20 h-5 rounded-md bg-slate-800/60" />
              </div>
              <div className="w-20 h-4 rounded bg-slate-800/50" />
            </div>

            {/* Title Skeleton */}
            <div className="w-3/4 h-5 rounded-lg bg-slate-800" />

            {/* Description Skeleton */}
            <div className="space-y-1.5">
              <div className="w-full h-3.5 rounded bg-slate-800/60" />
              <div className="w-4/5 h-3.5 rounded bg-slate-800/40" />
            </div>

            {/* Bottom Bar Skeleton */}
            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
              <div className="w-24 h-7 rounded-xl bg-slate-800" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-slate-800" />
                <div className="w-8 h-8 rounded-xl bg-slate-800" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

NotificationSkeleton.propTypes = {
  count: PropTypes.number
};

export default NotificationSkeleton;
