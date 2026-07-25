import { useState } from 'react';
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

/**
 * Sidebar — Vertical sidebar navigation with full menu and mobile responsiveness.
 * Menu Items: Dashboard, Upload Receipt, Subscriptions, AI Chat, Notifications, Profile, Settings, Logout.
 * Includes active route highlighting, user info badge, and responsive drawer overlay for mobile screens.
 */
const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Access auth logout safely with fallback
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
    // If rendered outside AuthProvider
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
    <div className="flex h-full flex-col justify-between p-4">
      {/* Top Header & Brand */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <Link
            to={ROUTES.DASHBOARD}
            onClick={() => setIsMobileOpen(false)}
            className="flex items-center gap-3 group"
          >
            <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl font-bold text-white text-lg shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-text-primary">
                {APP_NAME}
              </span>
              <span className="text-[10px] font-medium text-primary tracking-wider uppercase">
                Fintech Copilot
              </span>
            </div>
          </Link>
          {/* Close button for mobile menu drawer */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="rounded-lg p-1.5 text-text-secondary hover:bg-surface hover:text-text-primary lg:hidden"
            aria-label="Close sidebar"
          >
            <HiOutlineX className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Navigation Links */}
        <nav className="space-y-1.5" aria-label="Sidebar Navigation">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            Main Menu
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-primary/15 text-primary font-semibold border-l-4 border-primary shadow-sm shadow-primary/10'
                    : 'text-text-secondary hover:bg-surface/80 hover:text-text-primary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                      active ? 'text-primary' : 'text-text-muted group-hover:text-text-primary'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary border border-primary/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Card & Logout Button */}
      <div className="space-y-3 pt-4 border-t border-border">
        {/* User Card */}
        <div className="flex items-center gap-3 rounded-xl bg-surface/50 p-2.5 border border-border/60">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-9 w-9 rounded-lg object-cover ring-2 ring-primary/20"
          />
          <div className="flex-1 overflow-hidden">
            <h4 className="truncate text-xs font-semibold text-text-primary">
              {user.name}
            </h4>
            <p className="truncate text-[10px] text-text-muted">
              {user.email}
            </p>
          </div>
          <span className="flex items-center gap-0.5 rounded-md bg-success/15 px-1.5 py-0.5 text-[10px] font-medium text-success border border-success/30">
            <HiOutlineSparkles className="h-2.5 w-2.5" />
            Pro
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-danger/30 bg-danger/10 py-2.5 text-xs font-semibold text-danger transition-all duration-200 hover:bg-danger hover:text-white hover:shadow-md hover:shadow-danger/20"
        >
          <HiOutlineLogout className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar Bar Header Toggle Button (Visible < lg) */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="rounded-lg border border-border bg-surface/80 p-2 text-text-secondary hover:bg-surface hover:text-text-primary focus:outline-none"
          aria-label="Open menu"
        >
          <HiOutlineMenu className="h-6 w-6" />
        </button>

        <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2">
          <div className="gradient-primary flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white">
            S
          </div>
          <span className="text-base font-bold text-text-primary">{APP_NAME}</span>
        </Link>

        <Link
          to={ROUTES.PROFILE}
          className="flex items-center justify-center rounded-full ring-2 ring-primary/30"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="h-7 w-7 rounded-full object-cover"
          />
        </Link>
      </div>

      {/* Mobile Overlay Backdrop Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop Blur */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />
          {/* Slide Drawer */}
          <aside className="relative z-10 w-72 max-w-[80vw] bg-surface/95 text-text-primary shadow-2xl border-r border-border h-full flex flex-col">
            {navContent}
          </aside>
        </div>
      )}

      {/* Desktop Sticky Sidebar (Visible >= lg) */}
      <aside className="glass hidden lg:flex w-64 flex-col border-r border-border min-h-screen sticky top-0 h-screen overflow-y-auto">
        {navContent}
      </aside>
    </>
  );
};

export default Sidebar;
