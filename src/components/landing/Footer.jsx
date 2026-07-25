import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMail, HiOutlineCheckCircle, HiOutlineSparkles, HiOutlineArrowRight } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter, FaDiscord } from 'react-icons/fa';
import { APP_NAME, APP_TAGLINE, ROUTES } from '../../utils/constants';

/**
 * Footer — Modern startup footer for SubSense AI landing page.
 * Includes brand section, multi-column navigation links, newsletter signup,
 * copyright notice, and social media icons.
 */
const footerNavigation = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Security', href: '#security' },
    { name: 'Roadmap', href: '#roadmap' },
  ],
  resources: [
    { name: 'Documentation', href: '#docs' },
    { name: 'Blog', href: '#blog' },
    { name: 'API Reference', href: '#api' },
    { name: 'Case Studies', href: '#case-studies' },
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Careers', href: '#careers' },
    { name: 'Press', href: '#press' },
    { name: 'Contact', href: '#contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Security', href: '#security-policy' },
    { name: 'Cookie Settings', href: '#cookies' },
  ],
};

const socialLinks = [
  { name: 'GitHub', icon: FaGithub, href: 'https://github.com' },
  { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com' },
  { name: 'Twitter / X', icon: FaTwitter, href: 'https://twitter.com' },
  { name: 'Discord', icon: FaDiscord, href: 'https://discord.com' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative bg-surface/60 border-t border-border/80 pt-16 pb-12 overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-primary/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Brand + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-border/50">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <Link to={ROUTES.HOME || '/'} className="inline-flex items-center gap-2.5">
              <div className="gradient-primary flex h-9 w-9 items-center justify-center rounded-xl font-bold text-white text-lg shadow-md shadow-primary/20">
                S
              </div>
              <span className="text-xl font-extrabold text-text-primary tracking-tight">
                {APP_NAME}
              </span>
            </Link>

            <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
              {APP_TAGLINE}. Autonomous subscription tracking, AI receipt scanning, and real-time spending insights.
            </p>

            {/* AI Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-light/40 border border-border/60 text-xs text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational (v2.4)</span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="glass-card p-6 sm:p-7 rounded-2xl border border-glass-border bg-surface/80">
              <div className="flex items-center gap-2 text-primary font-semibold text-xs tracking-wide uppercase mb-1">
                <HiOutlineSparkles className="w-4 h-4" />
                <span>Stay Ahead of Your Finances</span>
              </div>
              <h4 className="text-lg font-bold text-text-primary mb-2">
                Subscribe to the SubSense AI Digest
              </h4>
              <p className="text-xs sm:text-sm text-text-secondary mb-4">
                Get monthly SaaS optimization tips, market reports, and product updates. No spam ever.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium animate-fade-in">
                  <HiOutlineCheckCircle className="w-5 h-5 shrink-0" />
                  <span>Thanks for subscribing! Check your inbox for confirmation.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border/80 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/20 shrink-0"
                  >
                    <span>Subscribe</span>
                    <HiOutlineArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Middle Section: Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-border/50">
          {/* Column 1: Product */}
          <div>
            <h5 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">
              Product
            </h5>
            <ul className="space-y-2.5">
              {footerNavigation.product.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h5 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">
              Resources
            </h5>
            <ul className="space-y-2.5">
              {footerNavigation.resources.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h5 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">
              Company
            </h5>
            <ul className="space-y-2.5">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h5 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">
              Legal
            </h5>
            <ul className="space-y-2.5">
              {footerNavigation.legal.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted text-center sm:text-left">
            &copy; {new Date().getFullYear()} {APP_NAME}, Inc. All rights reserved. Built with AI precision.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-surface-light/30 border border-border/50 text-text-secondary hover:text-primary hover:border-primary/40 hover:bg-surface-light/60 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
