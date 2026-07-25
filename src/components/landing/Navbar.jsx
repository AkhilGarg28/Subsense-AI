import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineMenu,
  HiOutlineX,
  HiSparkles,
  HiArrowRight,
} from 'react-icons/hi';
import { ROUTES } from '../../utils/constants';

/**
 * Navbar — Sticky glassmorphism header component with dynamic scroll detection,
 * responsive mobile navigation menu, and glowing CTAs.
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Handle scroll detection for dynamic glass background and active section link
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section on scroll
      const sections = ['hero', 'features', 'how-it-works', 'preview', 'why-us', 'testimonials'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'About', href: '#why-us' },
    { name: 'Contact', href: '#cta' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-glass-border shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Glowing Gradient Icon */}
          <Link
            to={ROUTES.HOME || '/'}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 text-white shadow-glow transition-transform duration-300 group-hover:scale-105">
              <HiSparkles className="w-5 h-5 text-white animate-pulse" />
              <div className="absolute inset-0 rounded-xl bg-primary/40 blur-md -z-10 group-hover:bg-primary/60 transition-all" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              SubSense <span className="gradient-text">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-surface/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-primary/20 border border-primary/30 shadow-sm'
                      : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to={ROUTES.LOGIN || '/login'}
              className="text-sm font-medium text-text-secondary hover:text-white px-4 py-2 rounded-lg transition-colors hover:bg-surface/50"
            >
              Log In
            </Link>
            <Link
              to={ROUTES.SIGNUP || '/signup'}
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 rounded-xl gradient-primary shadow-glow hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] hover:scale-[1.02] active:scale-[0.98] group"
            >
              <span>Get Started</span>
              <HiArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative p-2.5 text-text-secondary hover:text-white rounded-xl bg-surface/50 border border-glass-border focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-surface/95 backdrop-blur-xl border-b border-glass-border shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`px-4 py-3 text-base font-medium rounded-xl transition-all ${
                        isActive
                          ? 'text-white bg-primary/20 border border-primary/30'
                          : 'text-text-secondary hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-glass-border flex flex-col gap-3">
                <Link
                  to={ROUTES.LOGIN || '/login'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center text-sm font-medium text-text-primary rounded-xl border border-glass-border bg-surface/40 hover:bg-surface transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to={ROUTES.SIGNUP || '/signup'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center text-sm font-semibold text-white rounded-xl gradient-primary shadow-glow hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all flex items-center justify-center gap-2"
                >
                  <span>Get Started</span>
                  <HiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
