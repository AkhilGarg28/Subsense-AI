import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineCloudUpload,
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
      <header className="sticky top-0 z-40 w-full border-b border-[#F3F1EA]/10 px-4 py-3 sm:px-6 lg:px-8 bg-[#171A18]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Greeting */}
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-display font-bold text-[#F3F1EA] sm:text-xl tracking-tight">
                  {greeting}, {user.name.split(' ')[0]} 👋
                </h1>
                <span className="rounded bg-[#C2A155]/20 px-2 py-0.5 text-[10px] font-mono font-bold text-[#C2A155] border border-[#C2A155]/30">
                  {user.plan || 'PRO LEDGER'}
                </span>
              </div>
              <p className="text-xs text-[#96988F] font-sans">
                Your autonomous AI copilot has audited your financial activity.
              </p>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            {/* Command Palette Trigger */}
            <div
              onClick={() => setIsCommandPaletteOpen(true)}
              className="relative flex-1 max-w-xs sm:w-64 md:w-72 cursor-pointer group"
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <HiOutlineSearch className="h-4 w-4 text-[#96988F] group-hover:text-[#C2A155] transition-colors" />
              </div>
              <div className="w-full rounded-lg border border-[#F3F1EA]/10 bg-[#0D0F0E] py-2 pl-9 pr-12 text-xs font-mono text-[#96988F] group-hover:border-[#C2A155]/40 transition-all flex items-center justify-between">
                <span className="truncate">Search ledger, commands...</span>
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
                <kbd className="hidden rounded border border-[#F3F1EA]/10 bg-[#171A18] px-1.5 py-0.5 text-[10px] font-mono text-[#96988F] md:inline-block">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Quick Upload Button */}
            <Link
              to={ROUTES.UPLOAD}
              className="inline-flex items-center gap-2 rounded-lg bg-[#C2A155] hover:bg-[#D4B468] px-3.5 py-2 text-xs font-bold text-[#0D0F0E] transition-all shrink-0"
            >
              <HiOutlineCloudUpload className="h-4 w-4" />
              <span className="hidden sm:inline">Quick Upload</span>
            </Link>

            {/* Notification Bell */}
            <Link
              to={ROUTES.NOTIFICATIONS}
              className="relative rounded-lg border border-[#F3F1EA]/10 bg-[#0D0F0E] p-2 text-[#96988F] hover:text-[#F3F1EA] transition-all"
              aria-label="Notifications"
            >
              <HiOutlineBell className="h-4.5 w-4.5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D65C4F] text-[10px] font-mono font-bold text-[#0D0F0E]">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* User Avatar Badge */}
            <Link
              to={ROUTES.PROFILE}
              className="flex items-center gap-2 rounded-lg border border-[#F3F1EA]/10 bg-[#0D0F0E] p-1.5 pr-3 hover:border-[#C2A155]/40"
            >
              <img src={user.avatar} alt={user.name} className="h-7 w-7 rounded object-cover" />
              <div className="hidden text-left sm:block">
                <div className="text-xs font-display font-bold text-[#F3F1EA] leading-tight">
                  {user.name}
                </div>
                <div className="text-[10px] font-mono text-[#96988F] leading-tight">
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
