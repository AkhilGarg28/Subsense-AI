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
    // If outside AuthProvider
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
    <div className="flex h-full flex-col justify-between p-4 bg-[#171A18]">
      {/* Header & Brand */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <Link
            to={ROUTES.DASHBOARD}
            onClick={() => setIsMobileOpen(false)}
            className="flex items-center gap-3 group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C2A155] font-display font-extrabold text-[#0D0F0E] text-base">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-base font-display font-extrabold text-[#F3F1EA]">
                {APP_NAME}
              </span>
              <span className="text-[10px] font-mono text-[#C2A155] tracking-widest uppercase">
                FINANCIAL COPILOT
              </span>
            </div>
          </Link>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="rounded p-1.5 text-[#96988F] hover:text-[#F3F1EA] lg:hidden"
            aria-label="Close sidebar"
          >
            <HiOutlineX className="h-5 w-5" />
          </button>
        </div>

        {/* Menu Links */}
        <nav className="space-y-1" aria-label="Sidebar Navigation">
          <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-widest text-[#96988F] mb-2">
            MAIN LEDGER MENU
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-mono transition-all duration-200 ${
                  active
                    ? 'bg-[#0D0F0E] text-[#C2A155] font-bold border-l-2 border-[#C2A155]'
                    : 'text-[#96988F] hover:bg-[#0D0F0E]/50 hover:text-[#F3F1EA]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 flex-shrink-0 ${
                      active ? 'text-[#C2A155]' : 'text-[#96988F] group-hover:text-[#F3F1EA]'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="rounded bg-[#C2A155]/20 px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#C2A155] border border-[#C2A155]/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Card & Logout */}
      <div className="space-y-3 pt-4 border-t border-[#F3F1EA]/10">
        <div className="flex items-center gap-3 rounded-lg bg-[#0D0F0E] p-2.5 border border-[#F3F1EA]/10">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-8 w-8 rounded object-cover"
          />
          <div className="flex-1 overflow-hidden">
            <h4 className="truncate text-xs font-display font-bold text-[#F3F1EA]">
              {user.name}
            </h4>
            <p className="truncate text-[10px] font-mono text-[#96988F]">
              {user.email}
            </p>
          </div>
          <span className="rounded bg-[#3FA972]/15 px-1.5 py-0.5 text-[10px] font-mono text-[#3FA972] border border-[#3FA972]/30">
            PRO
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#D65C4F]/30 bg-[#D65C4F]/10 py-2 text-xs font-mono font-bold text-[#D65C4F] hover:bg-[#D65C4F] hover:text-[#0D0F0E] transition-all"
        >
          <HiOutlineLogout className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[#F3F1EA]/10 bg-[#0D0F0E] px-4 py-3 lg:hidden">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="rounded border border-[#F3F1EA]/10 bg-[#171A18] p-2 text-[#96988F] focus:outline-none"
          aria-label="Open menu"
        >
          <HiOutlineMenu className="h-5 w-5" />
        </button>

        <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-[#C2A155] text-xs font-bold text-[#0D0F0E]">
            S
          </div>
          <span className="text-sm font-display font-bold text-[#F3F1EA]">{APP_NAME}</span>
        </Link>

        <Link to={ROUTES.PROFILE} className="flex items-center justify-center">
          <img src={user.avatar} alt={user.name} className="h-6 w-6 rounded object-cover" />
        </Link>
      </div>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-[#0D0F0E]/80" onClick={() => setIsMobileOpen(false)} />
          <aside className="relative z-10 w-64 bg-[#171A18] text-[#F3F1EA] border-r border-[#F3F1EA]/10 h-full flex flex-col">
            {navContent}
          </aside>
        </div>
      )}

      <aside className="hidden lg:flex w-60 flex-col border-r border-[#F3F1EA]/10 min-h-screen sticky top-0 h-screen bg-[#171A18]">
        {navContent}
      </aside>
    </>
  );
};

export default Sidebar;
