import React from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiOutlineBadgeCheck, HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineTrendingUp } from 'react-icons/hi';
import { FaQuoteLeft } from 'react-icons/fa';

/**
 * Testimonials — Showcases social proof, user testimonials with glassmorphism cards,
 * vibrant avatar gradients, dynamic star ratings, company tags, and trust badges.
 */
const testimonialsData = [
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    role: 'CTO at TechScale',
    company: 'TechScale',
    quote: "SubSense AI caught $1,200/year in forgotten SaaS seats we hadn't used in 6 months.",
    rating: 5,
    initials: 'MC',
    gradient: 'from-blue-500 via-indigo-500 to-blue-700',
    verified: true,
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
    gradient: 'from-purple-500 via-pink-500 to-rose-600',
    verified: true,
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
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    verified: true,
    savingsBadge: '5s AI Response',
  },
];

const trustBadges = [
  { icon: HiOutlineShieldCheck, title: 'SOC-2 Certified', desc: 'Enterprise Security' },
  { icon: HiStar, title: '4.9/5 Rating', desc: 'Over 2,000+ Reviews' },
  { icon: HiOutlineBadgeCheck, title: '256-bit Encryption', desc: 'Bank-Grade Safety' },
  { icon: HiOutlineTrendingUp, title: '$2.4M Saved', desc: 'For Users Nationwide' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const Testimonials = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-96 h-96 bg-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 w-96 h-96 bg-secondary/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase"
        >
          <HiOutlineSparkles className="w-4 h-4 text-primary animate-pulse" />
          Loved by Teams & Professionals
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight"
        >
          Don't just take our word for it. <br className="hidden sm:block" />
          <span className="gradient-text">See what our users achieve.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
        >
          From startup executives to independent creators, SubSense AI helps thousands eliminate wasted spend and automate financial clarity.
        </motion.p>
      </div>

      {/* Testimonials Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16"
      >
        {testimonialsData.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
            className="group relative h-full rounded-2xl p-[1px] bg-gradient-to-b from-border/60 via-border/30 to-transparent hover:from-primary/50 hover:via-secondary/40 hover:to-primary/30 transition-all duration-500 hover:shadow-glow"
          >
            {/* Inner Glass Card */}
            <div className="relative h-full flex flex-col justify-between rounded-[15px] bg-surface/80 backdrop-blur-xl p-6 sm:p-8 border border-glass-border/60 transition-all duration-300 group-hover:bg-surface/90">
              {/* Quote Decor Icon */}
              <div className="absolute top-6 right-6 text-primary/10 group-hover:text-primary/20 transition-colors">
                <FaQuoteLeft className="w-8 h-8" />
              </div>

              <div>
                {/* Star Rating & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <HiStar key={i} className="w-5 h-5 text-amber-400 fill-amber-400 drop-shadow-sm" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {item.savingsBadge}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-text-primary text-base sm:text-lg leading-relaxed font-normal mb-8 italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Avatar */}
              <div className="pt-6 border-t border-border/40 flex items-center gap-4">
                {/* Avatar Circle with Gradient */}
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr ${item.gradient} text-white font-bold text-base shadow-md ring-2 ring-surface/80`}
                >
                  {item.initials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-base font-bold text-text-primary truncate">
                      {item.name}
                    </h4>
                    {item.verified && (
                      <HiOutlineBadgeCheck
                        className="w-4 h-4 text-primary shrink-0"
                        title="Verified User"
                      />
                    )}
                  </div>
                  <p className="text-xs text-text-secondary truncate">{item.role}</p>
                </div>

                {/* Company Tag */}
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-surface-light/50 text-text-secondary border border-border/40 shrink-0">
                  {item.company}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Trust Badges Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="glass-card p-6 sm:p-8 rounded-2xl border border-glass-border bg-surface/40 backdrop-blur-xl"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-border/40">
          {trustBadges.map((badge, idx) => {
            const BadgeIcon = badge.icon;
            return (
              <div key={idx} className={`flex flex-col items-center justify-center ${idx !== 0 ? 'pt-4 md:pt-0' : ''}`}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 text-primary">
                  <BadgeIcon className="w-5 h-5" />
                </div>
                <h5 className="text-sm font-bold text-text-primary">{badge.title}</h5>
                <p className="text-xs text-text-secondary mt-0.5">{badge.desc}</p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
