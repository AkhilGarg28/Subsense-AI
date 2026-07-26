import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineSparkles, HiOutlineCheck } from 'react-icons/hi';
import { APP_NAME, ROUTES } from '../../utils/constants';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#0B1020] pt-16 pb-12 text-[#A1A8B5] text-sm">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary text-white font-black text-base shadow-glow-blue">
                S
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-xs text-[#A1A8B5] leading-relaxed max-w-sm">
              The world’s first autonomous financial copilot powered by fine-tuned vision LLMs. Auditing subscriptions, detecting price hikes, and saving money on autopilot.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#5B8CFF]">
              <HiOutlineSparkles className="h-4 w-4" />
              <span>SOC-2 Type II Certified • 256-bit Encryption</span>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#dashboard-preview" className="hover:text-white transition-colors">Live Preview</a></li>
              <li><Link to={ROUTES.DASHBOARD} className="hover:text-white transition-colors">Dashboard Shell</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
              <li><Link to={ROUTES.LOGIN} className="hover:text-white transition-colors">Sign In</Link></li>
              <li><Link to={ROUTES.PROFILE} className="hover:text-white transition-colors">Settings</Link></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="space-y-3">
            <h4 className="font-bold text-white font-mono text-xs uppercase tracking-wider">Newsletter</h4>
            <p className="text-xs text-[#A1A8B5]">Get weekly AI financial audit reports & SaaS price hike digest.</p>
            
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@work.com"
                  className="w-full rounded-xl border border-white/10 bg-[#171F2F] py-2 pl-3 pr-20 text-xs text-white placeholder-[#64748B] focus:border-[#5B8CFF] focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 rounded-lg gradient-primary px-3 text-xs font-bold text-white shadow-glow-blue"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#22C55E]">
                  <HiOutlineCheck className="h-3.5 w-3.5" />
                  <span>Subscribed successfully!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <p>© {new Date().getFullYear()} SubSense AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[#A1A8B5]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
