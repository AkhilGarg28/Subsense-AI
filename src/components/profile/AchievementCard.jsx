import React from 'react';
import PropTypes from 'prop-types';
import {
  HiOutlineBadgeCheck,
  HiOutlineLockClosed,
  HiOutlineSparkles,
  HiOutlineCalendar,
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';
import { mockProfileData } from '../../data/mockProfileData';

/**
 * AchievementCard — Gamified Badges & Milestones component.
 * Renders user unlocked achievements, milestone progression, unlock dates,
 * and locked upcoming badges with interactive tooltips.
 */
const AchievementCard = ({
  achievements = mockProfileData.achievements,
  className = '',
}) => {
  // Sample upcoming locked achievement to show roadmap
  const allAchievements = [
    ...achievements.map((item) => ({ ...item, unlocked: true })),
    {
      id: 'ach-locked-1',
      title: 'Power Optimizer',
      description: 'Cancel 5 unused subscription services using AI one-click',
      icon: '⚡',
      badgeColor: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
      date: 'Locked (3/5)',
      unlocked: false,
      progress: 60,
    },
    {
      id: 'ach-locked-2',
      title: 'Zero Waste Scholar',
      description: 'Maintain 100% bill audit score for 6 consecutive months',
      icon: '🛡️',
      badgeColor: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
      date: 'Locked (4/6)',
      unlocked: false,
      progress: 66,
    },
  ];

  const unlockedCount = achievements.length;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-glass-border bg-glass p-6 backdrop-blur-xl transition-all duration-300 md:p-8',
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-glass-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <HiOutlineSparkles className="h-5 w-5 text-amber-400" />
            <h2 className="text-xl font-bold text-text-primary">Achievements & Badges</h2>
          </div>
          <p className="mt-0.5 text-xs text-text-muted">
            Track your financial optimization milestones and unlocked app rewards
          </p>
        </div>

        {/* Progress Counter Pill */}
        <div className="flex items-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 backdrop-blur-md">
          <HiOutlineBadgeCheck className="h-5 w-5 text-amber-400 shrink-0" />
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-amber-400/80">
              Badge Progress
            </span>
            <span className="text-xs font-bold text-amber-300">
              {unlockedCount} / {allAchievements.length} Unlocked
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allAchievements.map((badge) => (
          <div
            key={badge.id}
            className={cn(
              'group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300',
              badge.unlocked
                ? 'border-glass-border bg-glass/40 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-glass/80 hover:shadow-lg'
                : 'border-glass-border/40 bg-glass/10 opacity-70'
            )}
          >
            {/* Top Row: Icon & Status */}
            <div className="flex items-start justify-between">
              <div
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-2xl border text-2xl shadow-md transition-transform duration-300 group-hover:scale-110',
                  badge.badgeColor
                )}
              >
                {badge.icon}
              </div>

              {badge.unlocked ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                  <HiOutlineBadgeCheck className="h-3.5 w-3.5" />
                  Unlocked
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full border border-gray-500/30 bg-gray-500/10 px-2.5 py-0.5 text-[10px] font-bold text-text-muted">
                  <HiOutlineLockClosed className="h-3.5 w-3.5" />
                  Locked
                </span>
              )}
            </div>

            {/* Badge Title & Details */}
            <div className="mt-4">
              <h3 className="text-sm font-extrabold text-text-primary">
                {badge.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                {badge.description}
              </p>
            </div>

            {/* Progress bar for locked badges OR Unlock Date for unlocked */}
            <div className="mt-4 border-t border-glass-border/40 pt-3">
              {badge.unlocked ? (
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-text-muted">
                  <HiOutlineCalendar className="h-3.5 w-3.5 text-primary" />
                  <span>Earned in {badge.date}</span>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between text-[11px] font-medium text-text-muted">
                    <span>Progress</span>
                    <span>{badge.date}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-glass-border">
                    <div
                      className="h-full bg-amber-400 transition-all duration-500"
                      style={{ width: `${badge.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

AchievementCard.propTypes = {
  achievements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      badgeColor: PropTypes.string,
      date: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};

export default AchievementCard;
