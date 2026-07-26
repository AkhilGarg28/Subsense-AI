import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineCloudUpload,
  HiOutlineSparkles,
} from 'react-icons/hi';
import { mockDashboardData } from '../../data/mockDashboardData';
import { ROUTES } from '../../utils/constants';
import CommandPalette from '../common/CommandPalette';
import { useAuth } from '../../context/AuthContext';

const pageTitles = {
  '/dashboard': 'Dashboard Overview',
  '/upload': 'AI Receipt Scanner',
  '/subscriptions': 'Subscription Portfolio',
  '/chat': 'SubSense AI Chat',
  '/notifications': 'Notifications Center',
  '/profile': 'Profile & Settings',
  '/settings': 'Profile & Settings',
};

const pageSubtitles = {
  '/dashboard': 'Monitor spend, renewals, savings, and autonomous recommendations.',
  '/upload': 'Parse receipts, invoices, and PDF bills with AI vision extraction.',
  '/subscriptions': 'Track recurring products, renewal dates, and cancellation opportunities.',
  '/chat': 'Ask your financial copilot to audit, forecast, and act.',
  '/notifications': 'Review upcoming renewals, price changes, and account activity.',
  '/profile': 'Manage your account, integrations, security, and preferences.',
  '/settings': 'Manage your account, integrations, security, and preferences.',
};

const TopNavbar = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const location = useLocation();
  const { user: authUser } = useAuth();
  const user = authUser || mockDashboardData.user;

  const currentTitle = pageTitles[location.pathname] || 'SubSense AI';
  const currentSubtitle = pageSubtitles[location.pathname] || 'Autonomous financial workspace';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="glass-nav sticky top-0 z-30 hidden h-[88px] w-full items-center lg:flex">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-8 xl:px-10">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h1 className="truncate text-[28px] font-extrabold leading-tight tracking-tight text-white">
                {currentTitle}
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/[0.12] px-3 py-1 text-xs font-extrabold text-primary">
                <HiOutlineSparkles className="h-3.5 w-3.5" />
                {user.plan || 'Pro Copilot'}
              </span>
            </div>
            <p className="mt-1 truncate text-sm text-text-secondary">{currentSubtitle}</p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCommandPaletteOpen(true)}
              className="group relative hidden h-12 w-[320px] items-center rounded-[14px] border border-white/10 bg-card/[0.86] px-4 text-left transition-all hover:border-primary/40 xl:flex"
            >
              <HiOutlineSearch className="mr-3 h-5 w-5 shrink-0 text-text-secondary transition-colors group-hover:text-primary" />
              <span className="min-w-0 flex-1 truncate text-sm text-text-secondary">
                Search commands, subscriptions...
              </span>
              <kbd className="ml-3 rounded-lg border border-white/10 bg-surface px-2 py-1 text-[11px] font-extrabold text-text-secondary">
                Ctrl K
              </kbd>
            </button>

            <Link to={ROUTES.UPLOAD} className="btn-primary shrink-0">
              <HiOutlineCloudUpload className="h-5 w-5" />
              <span>Quick Upload</span>
            </Link>

            <Link
              to={ROUTES.NOTIFICATIONS}
              className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-white/10 bg-card/[0.86] text-text-secondary transition-all hover:border-primary/40 hover:text-white"
              aria-label="Notifications"
            >
              <HiOutlineBell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-[10px] font-extrabold text-white shadow-lg">
                3
              </span>
            </Link>

            <Link
              to={ROUTES.PROFILE}
              className="flex h-12 shrink-0 items-center gap-3 rounded-[14px] border border-white/10 bg-card/[0.86] p-1.5 pr-4 transition-all hover:border-primary/40"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="h-9 w-9 rounded-xl object-cover ring-2 ring-primary/30"
              />
              <span className="max-w-24 truncate text-sm font-bold text-white">
                {user.name.split(' ')[0]}
              </span>
            </Link>
          </div>
        </div>
      </header>

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </>
  );
};

export default TopNavbar;

