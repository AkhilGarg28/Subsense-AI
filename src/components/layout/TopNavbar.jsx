import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineSparkles,
} from 'react-icons/hi';
import { mockDashboardData } from '../../data/mockDashboardData';
import { ROUTES } from '../../utils/constants';

/**
 * TopNavbar — Main top header bar for SubSense AI dashboard.
 * Includes welcome greeting, quick search input, theme toggle badge,
 * notification bell with count badge, and user profile avatar info.
 */
const TopNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [unreadCount] = useState(3);

  const { user } = mockDashboardData;

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    // Theme toggle indicator handling
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('light-theme', isDarkMode);
    }
  };

  return (
    <header className="glass sticky top-0 z-40 w-full border-b border-border px-4 py-3 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Section: Welcome Greeting */}
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-text-primary sm:text-xl">
                Welcome back, {user.name.split(' ')[0]} 👋
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary border border-primary/30">
                <HiOutlineSparkles className="h-3 w-3" />
                {user.plan}
              </span>
            </div>
            <p className="text-xs text-text-secondary sm:text-sm">
              Here is your AI-powered financial summary for today.
            </p>
          </div>
        </div>

        {/* Middle & Right Section Controls */}
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          {/* Search Input Bar */}
          <div className="relative flex-1 max-w-xs sm:w-64 md:w-80">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <HiOutlineSearch className="h-4 w-4 text-text-muted" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subscriptions, bills..."
              className="w-full rounded-xl border border-border bg-surface/60 py-2 pl-9 pr-12 text-xs text-text-primary placeholder-text-muted outline-none transition-all duration-200 focus:border-primary focus:bg-surface focus:ring-1 focus:ring-primary sm:text-sm"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
              <kbd className="hidden rounded border border-border-light bg-surface-light px-1.5 py-0.5 text-[10px] font-medium text-text-secondary md:inline-block">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Theme Toggle Badge */}
          <button
            onClick={toggleTheme}
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-border bg-surface/80 px-3 py-1.5 text-xs font-medium text-text-secondary transition-all hover:border-primary/40 hover:bg-surface hover:text-text-primary"
            title="Toggle theme"
          >
            {isDarkMode ? (
              <>
                <HiOutlineMoon className="h-4 w-4 text-primary" />
                <span className="hidden md:inline">Dark</span>
              </>
            ) : (
              <>
                <HiOutlineSun className="h-4 w-4 text-warning" />
                <span className="hidden md:inline">Light</span>
              </>
            )}
          </button>

          {/* Notifications Bell */}
          <Link
            to={ROUTES.NOTIFICATIONS}
            className="relative rounded-xl border border-border bg-surface/80 p-2 text-text-secondary transition-all hover:bg-surface hover:text-text-primary"
            aria-label="Notifications"
          >
            <HiOutlineBell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white shadow-sm animate-pulse-glow">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* User Profile Badge */}
          <Link
            to={ROUTES.PROFILE}
            className="flex items-center gap-2.5 rounded-xl border border-border bg-surface/60 p-1.5 pr-3 transition-all hover:bg-surface hover:border-primary/40"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="h-8 w-8 rounded-lg object-cover ring-2 ring-primary/30"
            />
            <div className="hidden text-left sm:block">
              <div className="text-xs font-semibold text-text-primary leading-tight">
                {user.name}
              </div>
              <div className="text-[10px] text-text-muted leading-tight">
                {user.email}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
