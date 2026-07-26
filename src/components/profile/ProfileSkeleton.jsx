import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/helpers';

/**
 * ProfileHeaderSkeleton — Shimmer pulse skeleton for ProfileHeader component.
 */
export const ProfileHeaderSkeleton = ({ className = '' }) => (
  <div
    className={cn(
      'relative overflow-hidden rounded-3xl border border-glass-border bg-glass p-6 backdrop-blur-xl md:p-8 animate-pulse',
      className
    )}
  >
    <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
      {/* Left side: Avatar & User Text info */}
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        {/* Avatar skeleton */}
        <div className="h-24 w-24 rounded-2xl bg-glass-border/60 sm:h-28 sm:w-28" />

        {/* Text lines */}
        <div className="flex flex-col items-center space-y-3 sm:items-start">
          <div className="flex items-center gap-3">
            <div className="h-7 w-48 rounded-lg bg-glass-border/80" />
            <div className="h-5 w-24 rounded-full bg-glass-border/50" />
          </div>
          <div className="h-4 w-40 rounded-md bg-glass-border/50" />
          <div className="flex items-center gap-3 pt-1">
            <div className="h-6 w-36 rounded-xl bg-glass-border/60" />
            <div className="h-6 w-32 rounded-xl bg-glass-border/40" />
          </div>
        </div>
      </div>

      {/* Right side: Action Button skeleton */}
      <div className="h-10 w-32 rounded-xl bg-glass-border/60 self-center md:self-start" />
    </div>
  </div>
);

ProfileHeaderSkeleton.propTypes = { className: PropTypes.string };

/**
 * ProfileCardSkeleton — Shimmer pulse skeleton for ProfileCard (Personal Details).
 */
export const ProfileCardSkeleton = ({ className = '' }) => (
  <div
    className={cn(
      'relative overflow-hidden rounded-3xl border border-glass-border bg-glass p-6 backdrop-blur-xl md:p-8 animate-pulse',
      className
    )}
  >
    <div className="flex items-center justify-between border-b border-glass-border pb-4">
      <div className="space-y-2">
        <div className="h-6 w-40 rounded-lg bg-glass-border/80" />
        <div className="h-3 w-64 rounded-md bg-glass-border/50" />
      </div>
      <div className="h-8 w-24 rounded-xl bg-glass-border/60" />
    </div>

    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-28 rounded-md bg-glass-border/60" />
          <div className="h-10 w-full rounded-xl bg-glass-border/40" />
        </div>
      ))}
    </div>
  </div>
);

ProfileCardSkeleton.propTypes = { className: PropTypes.string };

/**
 * AccountConnectionsSkeleton — Shimmer pulse skeleton for AccountConnections component.
 */
export const AccountConnectionsSkeleton = ({ className = '' }) => (
  <div
    className={cn(
      'relative overflow-hidden rounded-3xl border border-glass-border bg-glass p-6 backdrop-blur-xl md:p-8 animate-pulse',
      className
    )}
  >
    <div className="flex items-center justify-between border-b border-glass-border pb-4">
      <div className="space-y-2">
        <div className="h-6 w-48 rounded-lg bg-glass-border/80" />
        <div className="h-3 w-72 rounded-md bg-glass-border/50" />
      </div>
      <div className="h-8 w-32 rounded-xl bg-glass-border/60" />
    </div>

    <div className="mt-6 space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-2xl bg-glass-border/70" />
            <div className="space-y-2">
              <div className="h-4 w-36 rounded-md bg-glass-border/80" />
              <div className="h-3 w-48 rounded-md bg-glass-border/50" />
            </div>
          </div>
          <div className="h-8 w-28 rounded-xl bg-glass-border/60" />
        </div>
      ))}
    </div>
  </div>
);

AccountConnectionsSkeleton.propTypes = { className: PropTypes.string };

/**
 * PreferencePanelSkeleton — Shimmer pulse skeleton for PreferencePanel.
 */
export const PreferencePanelSkeleton = ({ className = '' }) => (
  <div
    className={cn(
      'relative overflow-hidden rounded-3xl border border-glass-border bg-glass p-6 backdrop-blur-xl md:p-8 animate-pulse',
      className
    )}
  >
    <div className="border-b border-glass-border pb-4 space-y-2">
      <div className="h-6 w-56 rounded-lg bg-glass-border/80" />
      <div className="h-3 w-80 rounded-md bg-glass-border/50" />
    </div>

    <div className="mt-6 space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-32 rounded-md bg-glass-border/60" />
            <div className="h-10 w-full rounded-xl bg-glass-border/40" />
          </div>
        ))}
      </div>

      <div className="border-t border-glass-border pt-6 space-y-4">
        <div className="h-5 w-44 rounded-md bg-glass-border/70" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between py-2">
            <div className="space-y-1.5">
              <div className="h-4 w-40 rounded-md bg-glass-border/70" />
              <div className="h-3 w-64 rounded-md bg-glass-border/40" />
            </div>
            <div className="h-6 w-11 rounded-full bg-glass-border/60" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

PreferencePanelSkeleton.propTypes = { className: PropTypes.string };

/**
 * SecurityPanelSkeleton — Shimmer pulse skeleton for SecurityPanel.
 */
export const SecurityPanelSkeleton = ({ className = '' }) => (
  <div
    className={cn(
      'relative overflow-hidden rounded-3xl border border-glass-border bg-glass p-6 backdrop-blur-xl md:p-8 animate-pulse',
      className
    )}
  >
    <div className="border-b border-glass-border pb-4 space-y-2">
      <div className="h-6 w-48 rounded-lg bg-glass-border/80" />
      <div className="h-3 w-72 rounded-md bg-glass-border/50" />
    </div>

    <div className="mt-6 space-y-8">
      {/* Password section skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-36 rounded-md bg-glass-border/70" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 rounded-xl bg-glass-border/40" />
          ))}
        </div>
      </div>

      {/* 2FA section skeleton */}
      <div className="border-t border-glass-border pt-6 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-5 w-48 rounded-md bg-glass-border/70" />
          <div className="h-3 w-80 rounded-md bg-glass-border/40" />
        </div>
        <div className="h-6 w-11 rounded-full bg-glass-border/60" />
      </div>

      {/* Active sessions skeleton */}
      <div className="border-t border-glass-border pt-6 space-y-3">
        <div className="h-5 w-44 rounded-md bg-glass-border/70" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-14 rounded-2xl bg-glass-border/40" />
        ))}
      </div>
    </div>
  </div>
);

SecurityPanelSkeleton.propTypes = { className: PropTypes.string };

/**
 * StatsCardSkeleton — Shimmer pulse skeleton for StatsCard.
 */
export const StatsCardSkeleton = ({ className = '' }) => (
  <div
    className={cn(
      'relative overflow-hidden rounded-3xl border border-glass-border bg-glass p-6 backdrop-blur-xl md:p-8 animate-pulse',
      className
    )}
  >
    <div className="flex items-center justify-between border-b border-glass-border pb-4">
      <div className="space-y-2">
        <div className="h-6 w-44 rounded-lg bg-glass-border/80" />
        <div className="h-3 w-64 rounded-md bg-glass-border/50" />
      </div>
      <div className="h-8 w-36 rounded-2xl bg-glass-border/60" />
    </div>

    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-2xl border border-glass-border/60 bg-glass/40 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-11 w-11 rounded-xl bg-glass-border/60" />
            <div className="h-3 w-16 rounded-md bg-glass-border/40" />
          </div>
          <div className="h-7 w-20 rounded-md bg-glass-border/80" />
          <div className="h-3 w-28 rounded-md bg-glass-border/50" />
        </div>
      ))}
    </div>
  </div>
);

StatsCardSkeleton.propTypes = { className: PropTypes.string };

/**
 * AchievementCardSkeleton — Shimmer pulse skeleton for AchievementCard.
 */
export const AchievementCardSkeleton = ({ className = '' }) => (
  <div
    className={cn(
      'relative overflow-hidden rounded-3xl border border-glass-border bg-glass p-6 backdrop-blur-xl md:p-8 animate-pulse',
      className
    )}
  >
    <div className="flex items-center justify-between border-b border-glass-border pb-4">
      <div className="space-y-2">
        <div className="h-6 w-48 rounded-lg bg-glass-border/80" />
        <div className="h-3 w-72 rounded-md bg-glass-border/50" />
      </div>
      <div className="h-8 w-32 rounded-2xl bg-glass-border/60" />
    </div>

    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="rounded-2xl border border-glass-border/40 bg-glass/20 p-5 space-y-3">
          <div className="flex items-start justify-between">
            <div className="h-12 w-12 rounded-2xl bg-glass-border/60" />
            <div className="h-5 w-20 rounded-full bg-glass-border/50" />
          </div>
          <div className="h-5 w-32 rounded-md bg-glass-border/80" />
          <div className="h-3 w-full rounded-md bg-glass-border/40" />
          <div className="h-3 w-3/4 rounded-md bg-glass-border/40" />
        </div>
      ))}
    </div>
  </div>
);

AchievementCardSkeleton.propTypes = { className: PropTypes.string };

/**
 * ProfileSkeleton — Universal Skeleton container rendering shimmer pulse placeholders.
 * Accepts `variant` prop: 'header' | 'card' | 'connections' | 'preferences' | 'security' | 'stats' | 'achievements' | 'all'
 */
const ProfileSkeleton = ({ variant = 'all', className = '' }) => {
  if (variant === 'header') return <ProfileHeaderSkeleton className={className} />;
  if (variant === 'card') return <ProfileCardSkeleton className={className} />;
  if (variant === 'connections') return <AccountConnectionsSkeleton className={className} />;
  if (variant === 'preferences') return <PreferencePanelSkeleton className={className} />;
  if (variant === 'security') return <SecurityPanelSkeleton className={className} />;
  if (variant === 'stats') return <StatsCardSkeleton className={className} />;
  if (variant === 'achievements') return <AchievementCardSkeleton className={className} />;

  // Full page skeleton overview layout
  return (
    <div className={cn('space-y-6', className)}>
      <ProfileHeaderSkeleton />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProfileCardSkeleton />
        </div>
        <div>
          <StatsCardSkeleton />
        </div>
      </div>
    </div>
  );
};

ProfileSkeleton.propTypes = {
  variant: PropTypes.oneOf([
    'header',
    'card',
    'connections',
    'preferences',
    'security',
    'stats',
    'achievements',
    'all',
  ]),
  className: PropTypes.string,
};

export default ProfileSkeleton;
