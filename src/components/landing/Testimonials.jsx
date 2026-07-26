import React from 'react';
import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';

const reviews = [
  {
    quote: "SubSense AI caught three redundant Canva seats our design team forgot to cancel after a project wrapped up. Saved us over $960 within our first 10 days.",
    author: "Alex Rivera",
    role: "VP of Operations, TechFlow",
    verified: "Verified SaaS Buyer",
  },
  {
    quote: "The LLM OCR vision scanner parsed 45 PDF receipts from my email in less than 30 seconds. No manual data entry ever again.",
    author: "Sarah Chen",
    role: "Founder, Apex Creative",
    verified: "Verified Pro User",
  },
  {
    quote: "Finally a financial copilot that looks like a Linear or Apple product rather than a boring 90s accounting database.",
    author: "Marcus Vance",
    role: "Design Lead, Vercel Community",
    verified: "Verified Product Hunt Voter",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#5B8CFF] mb-3 block">
            USER TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-white tracking-tight leading-tight mb-4">
            Loved by Founders, Engineers & <span className="gradient-text-primary">Finance Teams</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A1A8B5] leading-relaxed">
            See how SubSense AI is helping thousands optimize their recurring subscription budgets.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#171F2F]/80 p-8 backdrop-blur-xl hover:border-[#5B8CFF]/40 transition-all"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#F59E0B] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className="h-5 w-5" />
                  ))}
                </div>

                <p className="text-sm text-[#A1A8B5] leading-relaxed mb-6 italic">
                  &quot;{rev.quote}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                <div>
                  <h4 className="font-bold text-white">{rev.author}</h4>
                  <p className="text-[10px] text-[#A1A8B5]">{rev.role}</p>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-[#22C55E]/15 border border-[#22C55E]/30 text-[10px] font-bold text-[#22C55E]">
                  {rev.verified}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
