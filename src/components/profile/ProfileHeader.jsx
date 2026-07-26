import React from 'react';
import PropTypes from 'prop-types';
import {
  HiOutlinePencilAlt,
  HiOutlineSparkles,
  HiOutlineCalendar,
  HiOutlineMail,
  HiOutlineCamera,
  HiOutlineCheck,
} from 'react-icons/hi';
import { cn, getInitials } from '../../utils/helpers';
import { mockProfileData } from '../../data/mockProfileData';

/**
 * ProfileHeader — Header banner for user profile in SubSense AI.
 * Displays user avatar, name, email, Financial Health Score badge,
 * member since date, Pro Plan badge, and Edit Profile button.
 */
const ProfileHeader = ({
  user = mockProfileData.user,
  onEditClick,
  isEditing = false,
  className = '',
}) => {
  const currentUser = { ...mockProfileData.user, ...user };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-glass-border bg-glass p-6 backdrop-blur-xl transition-all duration-300 md:p-8',
        'hover:border-primary/30 hover:shadow-glow',
        className
      )}
    >
      {/* Background Subtle Gradient Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent-teal/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
        {/* Left Side: Avatar + Main User Details */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
          {/* Avatar Container */}
          <div className="group relative">
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-2 border-primary/40 bg-background-card p-0.5 shadow-xl sm:h-28 sm:w-28">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-full w-full rounded-[14px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-primary/20 text-2xl font-bold text-primary sm:text-3xl">
                  {getInitials(currentUser.name || 'User')}
                </div>
              )}

              {/* Camera Hover Overlay */}
              <button
                type="button"
                aria-label="Change Profile Photo"
                className="absolute inset-0 flex items-center justify-center rounded-[14px] bg-background-dark/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              >
                <HiOutlineCamera className="h-6 w-6 text-text-primary" />
              </button>
            </div>

            {/* Active Status Pulse Dot */}
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-500" />
            </span>
          </div>

          {/* Text Content */}
          <div className="text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
              <h1 className="text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
                {currentUser.name}
              </h1>

              {/* Pro Plan Badge */}
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary backdrop-blur-md">
                <HiOutlineSparkles className="h-3.5 w-3.5" />
                {currentUser.plan || 'Pro Plan (Active)'}
              </span>
            </div>

            {/* Email & Occupation */}
            <div className="mt-1.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-text-secondary sm:justify-start">
              <span className="flex items-center gap-1.5">
                <HiOutlineMail className="h-4 w-4 text-text-muted" />
                {currentUser.email}
              </span>
              {currentUser.occupation && (
                <span className="hidden text-text-muted sm:inline">•</span>
              )}
              {currentUser.occupation && (
                <span className="font-medium text-text-muted">
                  {currentUser.occupation}
                </span>
              )}
            </div>

            {/* Badges Row: Health Score & Member Since */}
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
              {/* Financial Health Score Badge */}
              <div className="flex items-center gap-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Financial Health:</span>
                <strong className="font-bold text-emerald-300">
                  {currentUser.healthScore || '89/100 Healthy'}
                </strong>
              </div>

              {/* Member Since Date */}
              <div className="flex items-center gap-1.5 rounded-xl border border-glass-border bg-glass/60 px-3 py-1 text-xs font-medium text-text-muted">
                <HiOutlineCalendar className="h-3.5 w-3.5 text-text-secondary" />
                <span>Member since {currentUser.memberSince}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Action Button */}
        <div className="w-full sm:w-auto md:self-start">
          <button
            type="button"
            onClick={onEditClick}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 sm:w-auto',
              isEditing
                ? 'border border-emerald-500/40 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                : 'border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 hover:shadow-glow'
            )}
          >
            {isEditing ? (
              <>
                <HiOutlineCheck className="h-4 w-4" />
                <span>Editing Profile</span>
              </>
            ) : (
              <>
                <HiOutlinePencilAlt className="h-4 w-4" />
                <span>Edit Profile</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    avatar: PropTypes.string,
    country: PropTypes.string,
    currency: PropTypes.string,
    occupation: PropTypes.string,
    memberSince: PropTypes.string,
    healthScore: PropTypes.string,
    plan: PropTypes.string,
  }),
  onEditClick: PropTypes.func,
  isEditing: PropTypes.bool,
  className: PropTypes.string,
};

export default ProfileHeader;
