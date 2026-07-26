import React from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiOutlineBadgeCheck, HiOutlineShieldCheck, HiOutlineTrendingUp } from 'react-icons/hi';
import { LedgerRule } from '../common';

const testimonialsData = [
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    role: 'CTO at TechScale',
    company: 'TechScale',
    quote: "SubSense AI caught $1,200/year in forgotten SaaS seats we hadn't used in 6 months.",
    rating: 5,
    initials: 'MC',
    savingsBadge: 'Saved $1,200/yr',
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'Design Director',
    company: 'Studio Create',
    quote: 'The receipt scanner is magic. I just forward invoice emails and my spending forecast updates instantly.',
    rating: 5,
    initials: 'SJ',
    savingsBadge: 'Instant Sync',
  },
  {
    id: 'david-k',
    name: 'David K.',
    role: 'Product Lead',
    company: 'ProductPulse',
    quote: 'The AI chat assistant answered my quarterly tax & expense breakdown in 5 seconds.',
    rating: 5,
    initials: 'DK',
    savingsBadge: '5s AI Response',
  },
];

const trustBadges = [
  { icon: HiOutlineShieldCheck, title: 'SOC-2 Certified', desc: 'Enterprise Security' },
  { icon: HiStar, title: '4.9/5 Rating', desc: 'Over 2,000+ Reviews' },
  { icon: HiOutlineBadgeCheck, title: '256-bit Encryption', desc: 'Bank-Grade Safety' },
  { icon: HiOutlineTrendingUp, title: '$4.2M+ Saved', desc: 'For Users Nationwide' },
];

const Testimonials = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <LedgerRule label="CLIENT VERIFICATION" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F3F1EA]/10 bg-[#171A18] text-[#C2A155] text-xs font-mono tracking-widest uppercase"
        >
          <span>LOVED BY TEAMS & PROFESSIONALS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#F3F1EA] tracking-tight"
        >
          Don't just take our word for it. <br className="hidden sm:block" />
          <span className="text-[#C2A155]">See what our users achieve.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#96988F] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-sans"
        >
          From startup executives to independent creators, SubSense AI helps thousands eliminate wasted spend and automate financial clarity.
        </motion.p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
        {testimonialsData.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-[#F3F1EA]/10 bg-[#171A18] p-6 sm:p-8 flex flex-col justify-between hover:border-[#C2A155]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1 text-[#C2A155]">
                  {[...Array(item.rating)].map((_, i) => (
                    <HiStar key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0D0F0E] text-[#3FA972] border border-[#3FA972]/30">
                  {item.savingsBadge}
                </span>
              </div>

              <p className="text-[#F3F1EA] text-sm sm:text-base leading-relaxed mb-6 font-sans italic">
                "{item.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-[#F3F1EA]/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0D0F0E] border border-[#F3F1EA]/10 flex items-center justify-center text-[#C2A155] font-mono font-bold text-sm">
                {item.initials}
              </div>

              <div>
                <h4 className="text-sm font-display font-bold text-[#F3F1EA]">{item.name}</h4>
                <p className="text-xs text-[#96988F] font-mono">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Strip */}
      <div className="p-6 sm:p-8 rounded-xl border border-[#F3F1EA]/10 bg-[#171A18]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#F3F1EA]/10">
          {trustBadges.map((badge, idx) => {
            const BadgeIcon = badge.icon;
            return (
              <div key={idx} className={`flex flex-col items-center justify-center ${idx !== 0 ? 'pt-4 md:pt-0' : ''}`}>
                <BadgeIcon className="w-5 h-5 text-[#C2A155] mb-2" />
                <h5 className="text-xs font-mono font-bold text-[#F3F1EA]">{badge.title}</h5>
                <p className="text-[11px] text-[#96988F] mt-0.5">{badge.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
