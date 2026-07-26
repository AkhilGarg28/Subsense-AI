import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HiOutlineHome,
  HiOutlineCloudUpload,
  HiOutlineCreditCard,
  HiOutlineChatAlt2,
  HiOutlineBell,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineSparkles,
} from 'react-icons/hi';
import { ROUTES, APP_NAME } from '../../utils/constants';
import { mockDashboardData } from '../../data/mockDashboardData';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  let logoutHandler = () => {
    navigate(ROUTES.LOGIN);
  };

  try {
    const auth = useAuth();
    if (auth && auth.logout) {
      logoutHandler = () => {
        auth.logout();
        navigate(ROUTES.LOGIN);
      };
    }
  } catch {
    // Outside AuthProvider
  }

  const menuItems = [
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: HiOutlineHome },
    { name: 'Upload Receipt', path: ROUTES.UPLOAD, icon: HiOutlineCloudUpload },
    { name: 'Subscriptions', path: ROUTES.SUBSCRIPTIONS, icon: HiOutlineCreditCard },
    { name: 'AI Chat', path: ROUTES.CHAT, icon: HiOutlineChatAlt2 },
    { name: 'Notifications', path: ROUTES.NOTIFICATIONS, icon: HiOutlineBell, badge: 3 },
    { name: 'Profile', path: ROUTES.PROFILE, icon: HiOutlineUser },
    { name: 'Settings', path: '/settings', icon: HiOutlineCog },
  ];

  const isActive = (path) => {
    if (path === ROUTES.DASHBOARD) {
      return location.pathname === ROUTES.DASHBOARD || location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const user = mockDashboardData.user;

  const handleLogout = () => {
    setIsMobileOpen(false);
    logoutHandler();
  };

  const navContent = (
    <div className="flex h-full flex-col justify-between p-4 bg-[#121A2F]">
      {/* Header & Brand */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <Link
            to={ROUTES.DASHBOARD}
            onClick={() => setIsMobileOpen(false)}
            className="flex items-center gap-3 group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary font-black text-white text-lg shadow-glow-blue transition-transform group-hover:scale-105">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-white">
                {APP_NAME}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#5B8CFF] uppercase font-bold">
                FINANCIAL COPILOT
              </span>
            </div>
          </Link>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="rounded p-1.5 text-[#A1A8B5] hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <HiOutlineX className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Links */}
        <nav className="space-y-1.5" aria-label="Sidebar Navigation">
          <p className="px-3 text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B] mb-2">
            MAIN COPILOT MENU
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-[#5B8CFF]/15 text-[#5B8CFF] font-bold border-l-4 border-[#5B8CFF] shadow-sm shadow-[#5B8CFF]/20'
                    : 'text-[#A1A8B5] hover:bg-[#171F2F] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110 ${
                      active ? 'text-[#5B8CFF]' : 'text-[#64748B] group-hover:text-white'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="rounded-full bg-[#5B8CFF]/20 px-2 py-0.5 text-[10px] font-mono font-bold text-[#5B8CFF] border border-[#5B8CFF]/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Card & Logout */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <div className="flex items-center gap-3 rounded-xl bg-[#171F2F] p-2.5 border border-white/10">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-9 w-9 rounded-lg object-cover ring-2 ring-[#5B8CFF]/30"
          />
          <div className="flex-1 overflow-hidden">
            <h4 className="truncate text-xs font-bold text-white">
              {user.name}
            </h4>
            <p className="truncate text-[10px] font-mono text-[#A1A8B5]">
              {user.email}
            </p>
          </div>
          <span className="rounded-md bg-[#22C55E]/15 px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#22C55E] border border-[#22C55E]/30 flex items-center gap-0.5">
            <HiOutlineSparkles className="h-2.5 w-2.5" />
            PRO
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#EF4444]/30 bg-[#EF4444]/10 py-2.5 text-xs font-bold text-[#EF4444] hover:bg-[#EF4444] hover:text-white transition-all shadow-sm"
        >
          <HiOutlineLogout className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#0B1020]/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="rounded-lg border border-white/10 bg-[#121A2F] p-2 text-[#A1A8B5] hover:text-white focus:outline-none"
          aria-label="Open menu"
        >
          <HiOutlineMenu className="h-6 w-6" />
        </button>

        <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2">
          <div className="gradient-primary flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black text-white">
            S
          </div>
          <span className="text-base font-extrabold text-white">{APP_NAME}</span>
        </Link>

        <Link to={ROUTES.PROFILE} className="flex items-center justify-center">
          <img src={user.avatar} alt={user.name} className="h-7 w-7 rounded-full object-cover ring-2 ring-[#5B8CFF]/30" />
        </Link>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <aside className="relative z-10 w-64 bg-[#121A2F] text-white border-r border-white/10 h-full flex flex-col shadow-2xl">
            {navContent}
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-white/10 min-h-screen sticky top-0 h-screen overflow-y-auto bg-[#121A2F]">
        {navContent}
      </aside>
    </>
  );
};

export default Sidebar;
