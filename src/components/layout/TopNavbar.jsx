import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineCloudUpload,
  HiOutlineSparkles,
} from 'react-icons/hi';
import { mockDashboardData } from '../../data/mockDashboardData';
import { ROUTES } from '../../utils/constants';
import CommandPalette from '../common/CommandPalette';

const TopNavbar = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [unreadCount] = useState(3);
  const [greeting, setGreeting] = useState('Good Evening');

  const { user } = mockDashboardData;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

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
      <header className="glass-nav sticky top-0 z-40 w-full border-b border-white/10 px-4 py-3 sm:px-6 lg:px-8 backdrop-blur-xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Greeting */}
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white sm:text-xl tracking-tight">
                  {greeting}, {user.name.split(' ')[0]} 👋
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#5B8CFF]/15 px-2.5 py-0.5 text-xs font-bold text-[#5B8CFF] border border-[#5B8CFF]/30">
                  <HiOutlineSparkles className="h-3 w-3" />
                  {user.plan || 'Pro Copilot'}
                </span>
              </div>
              <p className="text-xs text-[#A1A8B5] sm:text-sm">
                Your autonomous AI copilot has audited your financial activity.
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            {/* Command Search Trigger */}
            <div
              onClick={() => setIsCommandPaletteOpen(true)}
              className="relative flex-1 max-w-xs sm:w-64 md:w-72 cursor-pointer group"
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <HiOutlineSearch className="h-4 w-4 text-[#A1A8B5] group-hover:text-[#5B8CFF] transition-colors" />
              </div>
              <div className="w-full rounded-xl border border-white/10 bg-[#171F2F]/80 py-2 pl-9 pr-12 text-xs text-[#A1A8B5] group-hover:border-[#5B8CFF]/40 transition-all flex items-center justify-between">
                <span className="truncate">Search subscriptions, commands...</span>
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
                <kbd className="hidden rounded border border-white/10 bg-[#1E293B] px-1.5 py-0.5 text-[10px] font-mono text-[#A1A8B5] md:inline-block">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Quick Upload Button */}
            <Link
              to={ROUTES.UPLOAD}
              className="inline-flex items-center gap-2 rounded-xl gradient-primary px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0"
            >
              <HiOutlineCloudUpload className="h-4.5 w-4.5" />
              <span className="hidden sm:inline">Quick Upload</span>
            </Link>

            {/* Notification Bell */}
            <Link
              to={ROUTES.NOTIFICATIONS}
              className="relative rounded-xl border border-white/10 bg-[#171F2F]/80 p-2.5 text-[#A1A8B5] hover:text-white transition-all"
              aria-label="Notifications"
            >
              <HiOutlineBell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#EF4444] text-[10px] font-bold text-white shadow-sm animate-pulse">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* User Profile Badge */}
            <Link
              to={ROUTES.PROFILE}
              className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#171F2F]/80 p-1.5 pr-3 hover:border-[#5B8CFF]/40 transition-all"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-lg object-cover ring-2 ring-[#5B8CFF]/30"
              />
              <div className="hidden text-left sm:block">
                <div className="text-xs font-bold text-white leading-tight">
                  {user.name}
                </div>
                <div className="text-[10px] font-mono text-[#A1A8B5] leading-tight">
                  {user.email}
                </div>
              </div>
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
