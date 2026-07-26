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
  const { user: authUser, logout } = useAuth();

  const user = authUser || mockDashboardData.user;

  const handleLogout = () => {
    setIsMobileOpen(false);
    logout();
    navigate(ROUTES.LOGIN);
  };

  const menuItems = [
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: HiOutlineHome },
    { name: 'Upload Receipt', path: ROUTES.UPLOAD, icon: HiOutlineCloudUpload },
    { name: 'Subscriptions', path: ROUTES.SUBSCRIPTIONS, icon: HiOutlineCreditCard },
    { name: 'AI Chat', path: ROUTES.CHAT, icon: HiOutlineChatAlt2, badge: 'AI' },
    { name: 'Notifications', path: ROUTES.NOTIFICATIONS, icon: HiOutlineBell, badge: 3 },
    { name: 'Profile', path: ROUTES.PROFILE, icon: HiOutlineUser },
    { name: 'Settings', path: '/settings', icon: HiOutlineCog },
  ];

  const isActive = (path) => {
    if (path === ROUTES.DASHBOARD) return location.pathname === ROUTES.DASHBOARD;
    return location.pathname.startsWith(path);
  };

  const navContent = (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#121A2F]/82 shadow-glass backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-[linear-gradient(135deg,rgba(91,140,255,0.28),transparent_28%,rgba(139,92,246,0.16)_72%,transparent)] opacity-70" />
      <div className="relative flex h-full min-h-0 flex-col justify-between p-5">
        <div className="min-h-0 space-y-8 overflow-y-auto pr-1 no-scrollbar">
          <div className="flex items-center justify-between px-1 pt-1">
            <Link
              to={ROUTES.DASHBOARD}
              onClick={() => setIsMobileOpen(false)}
              className="group flex min-w-0 items-center gap-3.5"
            >
              <div className="gradient-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl font-black text-white shadow-glow-blue transition-transform group-hover:scale-105">
                S
              </div>
              <div className="min-w-0">
                <span className="block truncate text-lg font-extrabold leading-tight tracking-tight text-white">
                  {APP_NAME}
                </span>
                <span className="block truncate text-[10px] font-extrabold uppercase tracking-widest text-primary">
                  Financial Copilot
                </span>
              </div>
            </Link>

            <button
              onClick={() => setIsMobileOpen(false)}
              className="rounded-xl p-2 text-text-secondary transition-colors hover:bg-white/5 hover:text-white lg:hidden"
              aria-label="Close sidebar"
              type="button"
            >
              <HiOutlineX className="h-6 w-6" />
            </button>
          </div>

          <nav className="space-y-2" aria-label="Sidebar Navigation">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-text-muted">
              Copilot Menu
            </p>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`group flex min-h-14 items-center justify-between rounded-2xl px-4 text-[17px] font-bold transition-all duration-200 ${
                    active
                      ? 'gradient-primary text-white shadow-glow-blue'
                      : 'text-text-secondary hover:bg-white/[0.06] hover:text-white '
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3.5">
                    <Icon
                      className={`h-6 w-6 shrink-0 transition-transform group-hover:scale-110 ${
                        active ? 'text-white' : 'text-text-muted group-hover:text-primary'
                      }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`ml-3 rounded-full px-2.5 py-1 text-[11px] font-extrabold ${
                        active
                          ? 'bg-white/18 text-white'
                          : 'border border-primary/30 bg-primary/[0.12] text-primary'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="relative mt-5 space-y-3 border-t border-white/10 pt-5">
          <div className="rounded-2xl border border-white/10 bg-card/80 p-3">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-11 w-11 shrink-0 rounded-2xl object-cover ring-2 ring-primary/30"
              />
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-extrabold leading-tight text-white">
                  {user.name}
                </h4>
                <p className="truncate text-xs text-text-secondary">{user.email}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-success/30 bg-success/[0.12] px-2 py-1 text-[10px] font-extrabold text-success">
                <HiOutlineSparkles className="h-3 w-3" />
                PRO
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="btn-danger min-h-12 w-full"
            type="button"
          >
            <HiOutlineLogout className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-background/92 px-4 backdrop-blur-2xl lg:hidden">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-card/80 text-text-secondary transition-colors hover:text-white"
          aria-label="Open menu"
          type="button"
        >
          <HiOutlineMenu className="h-6 w-6" />
        </button>

        <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2.5">
          <div className="gradient-primary flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black text-white">
            S
          </div>
          <span className="text-base font-extrabold tracking-tight text-white">{APP_NAME}</span>
        </Link>

        <Link to={ROUTES.PROFILE} aria-label="Open profile">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-9 w-9 rounded-xl object-cover ring-2 ring-primary/30"
          />
        </Link>
      </div>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex p-3 lg:hidden">
          <button
            aria-label="Close sidebar overlay"
            type="button"
            className="fixed inset-0 bg-black/72 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="relative z-10 h-full w-[280px] max-w-[calc(100vw-24px)]">
            {navContent}
          </aside>
        </div>
      )}

      <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 overflow-hidden p-4 lg:block">
        {navContent}
      </aside>
    </>
  );
};

export default Sidebar;

