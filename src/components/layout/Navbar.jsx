import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX, HiOutlineBell, HiOutlineUser } from 'react-icons/hi';
import { ROUTES, APP_NAME } from '../../utils/constants';

/**
 * Navbar — Top navigation bar with responsive mobile menu.
 * Displays on all authenticated pages.
 */
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: ROUTES.DASHBOARD },
    { name: 'Subscriptions', path: ROUTES.SUBSCRIPTIONS },
    { name: 'Upload', path: ROUTES.UPLOAD },
    { name: 'AI Chat', path: ROUTES.CHAT },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass sticky top-0 z-50 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2">
            <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white">
              S
            </div>
            <span className="text-lg font-bold text-text-primary">{APP_NAME}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-primary/20 text-primary'
                    : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <Link
              to={ROUTES.NOTIFICATIONS}
              className="relative rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
            >
              <HiOutlineBell className="h-5 w-5" />
              {/* Notification dot */}
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
            </Link>
            <Link
              to={ROUTES.PROFILE}
              className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
            >
              <HiOutlineUser className="h-5 w-5" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-text-secondary md:hidden hover:bg-surface"
            >
              {isMobileMenuOpen ? (
                <HiOutlineX className="h-5 w-5" />
              ) : (
                <HiOutlineMenu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="border-t border-border pb-4 pt-2 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-primary/20 text-primary'
                    : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
