import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineSparkles, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { ROUTES, APP_NAME } from '../../utils/constants';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Preview', href: '#dashboard-preview' },
    { name: 'Comparison', href: '#why-us' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled
        ? 'glass-nav py-3 border-b border-white/10 shadow-lg'
        : 'bg-transparent py-5'
    }`}>
      <div className="container-custom flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-white font-black text-lg shadow-glow-blue transition-transform group-hover:scale-105">
            S
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
              {APP_NAME}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#5B8CFF] uppercase font-semibold">
              AUTONOMOUS COPILOT
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#A1A8B5] hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to={ROUTES.LOGIN}
            className="text-sm font-semibold text-[#A1A8B5] hover:text-white px-4 py-2 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to={ROUTES.DASHBOARD}
            className="inline-flex items-center gap-2 rounded-xl gradient-primary px-5 py-2.5 text-sm font-bold text-white shadow-glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <HiOutlineSparkles className="h-4 w-4 animate-pulse" />
            <span>Launch Copilot</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden rounded-lg p-2 text-[#A1A8B5] hover:text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <HiOutlineX className="h-6 w-6" /> : <HiOutlineMenu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-card border-b border-white/10 px-6 py-6 space-y-4 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#A1A8B5] hover:text-white py-1"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link
              to={ROUTES.LOGIN}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center text-sm font-semibold text-[#A1A8B5] py-2"
            >
              Sign In
            </Link>
            <Link
              to={ROUTES.DASHBOARD}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center rounded-xl gradient-primary py-3 text-sm font-bold text-white shadow-glow-blue"
            >
              Launch Copilot
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
