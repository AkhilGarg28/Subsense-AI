import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineMenu,
  HiOutlineX,
  HiArrowRight,
} from 'react-icons/hi';
import { ROUTES } from '../../utils/constants';

/**
 * Navbar — Restrained header bar matching "The Ledger" design system.
 * Features 1px hairline border, Fraunces serif branding, and Brass CTAs.
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

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
    { name: 'Ledger Audit', href: '#why-us' },
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
          ? 'bg-[#0D0F0E]/95 border-b border-[#F3F1EA]/10 py-3 shadow-2xl'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo with Fraunces Editorial Serif */}
          <Link
            to={ROUTES.HOME || '/'}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#C2A155] text-[#0D0F0E] font-display font-extrabold text-lg shadow-sm">
              S
            </div>
            <span className="text-xl font-display font-extrabold text-[#F3F1EA] tracking-tight">
              SubSense <span className="text-[#C2A155] font-mono text-xs uppercase tracking-widest ml-1 font-normal">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#171A18] px-4 py-1.5 rounded-full border border-[#F3F1EA]/10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-[#F3F1EA] bg-[#C2A155]/20 border border-[#C2A155]/40 font-semibold'
                      : 'text-[#96988F] hover:text-[#F3F1EA] hover:bg-[#F3F1EA]/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to={ROUTES.LOGIN || '/login'}
              className="text-xs font-mono text-[#96988F] hover:text-[#F3F1EA] px-3 py-1.5 rounded-lg transition-colors"
            >
              Log In
            </Link>
            <Link
              to={ROUTES.SIGNUP || '/signup'}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-[#0D0F0E] bg-[#C2A155] hover:bg-[#D4B468] transition-all rounded-lg shadow-sm group"
            >
              <span>Get Started</span>
              <HiArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#96988F] hover:text-[#F3F1EA] rounded-lg bg-[#171A18] border border-[#F3F1EA]/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#171A18] border-b border-[#F3F1EA]/10 shadow-2xl"
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
                      className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                        isActive
                          ? 'text-[#F3F1EA] bg-[#C2A155]/20 border border-[#C2A155]/30'
                          : 'text-[#96988F] hover:text-[#F3F1EA]'
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-[#F3F1EA]/10 flex flex-col gap-3">
                <Link
                  to={ROUTES.LOGIN || '/login'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-xs font-mono text-[#F3F1EA] rounded-lg border border-[#F3F1EA]/10 bg-[#0D0F0E]"
                >
                  Log In
                </Link>
                <Link
                  to={ROUTES.SIGNUP || '/signup'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-xs font-bold text-[#0D0F0E] bg-[#C2A155] rounded-lg flex items-center justify-center gap-2"
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
