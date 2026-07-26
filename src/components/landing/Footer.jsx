import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMail, HiOutlineCheckCircle, HiOutlineArrowRight } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter, FaDiscord } from 'react-icons/fa';
import { APP_NAME, APP_TAGLINE, ROUTES } from '../../utils/constants';

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
    <footer className="relative bg-[#0D0F0E] border-t border-[#F3F1EA]/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-[#F3F1EA]/10">
          <div className="lg:col-span-5 space-y-4">
            <Link to={ROUTES.HOME || '/'} className="inline-flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C2A155] font-display font-bold text-[#0D0F0E] text-base">
                S
              </div>
              <span className="text-xl font-display font-extrabold text-[#F3F1EA] tracking-tight">
                {APP_NAME}
              </span>
            </Link>

            <p className="text-[#96988F] text-xs sm:text-sm leading-relaxed max-w-sm font-sans">
              {APP_TAGLINE}. Autonomous subscription tracking, AI receipt scanning, and real-time spending insights.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#171A18] border border-[#F3F1EA]/10 text-xs font-mono text-[#3FA972]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3FA972]" />
              <span>SYSTEMS OPERATIONAL (V2.4 LEDGER)</span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="p-6 rounded-xl border border-[#F3F1EA]/10 bg-[#171A18]">
              <span className="text-[#C2A155] font-mono text-xs uppercase tracking-wider block mb-1">
                STAY AHEAD OF YOUR FINANCES
              </span>
              <h4 className="text-base font-display font-bold text-[#F3F1EA] mb-2">
                Subscribe to the SubSense AI Ledger Digest
              </h4>

              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded bg-[#3FA972]/15 text-[#3FA972] text-xs font-mono border border-[#3FA972]/30">
                  <HiOutlineCheckCircle className="w-4 h-4 shrink-0" />
                  <span>Subscribed! Check your inbox for confirmation.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#96988F]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter corporate email..."
                      required
                      className="w-full pl-9 pr-3 py-2 rounded bg-[#0D0F0E] border border-[#F3F1EA]/10 text-[#F3F1EA] font-mono text-xs placeholder:text-[#96988F] focus:outline-none focus:border-[#C2A155]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded bg-[#C2A155] hover:bg-[#D4B468] text-[#0D0F0E] font-bold text-xs transition-all shrink-0"
                  >
                    <span>Subscribe</span>
                    <HiOutlineArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#F3F1EA]/10 font-mono text-xs">
          <div>
            <h5 className="font-bold text-[#F3F1EA] uppercase tracking-wider mb-4">Product</h5>
            <ul className="space-y-2.5">
              {footerNavigation.product.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-[#96988F] hover:text-[#C2A155] transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#F3F1EA] uppercase tracking-wider mb-4">Resources</h5>
            <ul className="space-y-2.5">
              {footerNavigation.resources.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-[#96988F] hover:text-[#C2A155] transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#F3F1EA] uppercase tracking-wider mb-4">Company</h5>
            <ul className="space-y-2.5">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-[#96988F] hover:text-[#C2A155] transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#F3F1EA] uppercase tracking-wider mb-4">Legal</h5>
            <ul className="space-y-2.5">
              {footerNavigation.legal.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-[#96988F] hover:text-[#C2A155] transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#96988F]">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}, Inc. All rights reserved. High-Precision Ledger.</p>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-8 h-8 rounded bg-[#171A18] border border-[#F3F1EA]/10 flex items-center justify-center text-[#96988F] hover:text-[#C2A155] hover:border-[#C2A155]/40 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
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
