import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineCloudUpload,
  HiOutlineSparkles,
  HiOutlineViewGrid,
  HiOutlineArrowRight
} from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { FiZap } from 'react-icons/fi';

/**
 * Quick action buttons bar for SubSense AI Upload section
 *
 * Provides vibrant cards for:
 * 1. Upload Another Receipt
 * 2. Connect Gmail Auto-Sync
 * 3. Ask AI Copilot
 * 4. Go to Dashboard
 *
 * @param {Object} props
 * @param {Function} [props.onUploadAnother] - Callback for Upload Another action
 * @param {Function} [props.onConnectGmail] - Callback for Gmail Auto-Sync action
 * @param {Function} [props.onAskCopilot] - Callback for Ask AI Copilot action
 * @param {Function} [props.onGoToDashboard] - Callback for Go to Dashboard action
 */
const UploadQuickActions = ({
  onUploadAnother,
  onConnectGmail,
  onAskCopilot,
  onGoToDashboard
}) => {
  const navigate = useNavigate();

  // Action definitions
  const actions = [
    {
      id: 'upload',
      title: 'Upload Another Receipt',
      description: 'Scan JPG, PNG, or PDF receipts with instant AI extraction.',
      badge: 'Quick Scan',
      icon: HiOutlineCloudUpload,
      gradient: 'from-blue-600/90 via-blue-500/90 to-cyan-500/90',
      borderGlow: 'border-cyan-400/40 hover:border-cyan-300 shadow-cyan-500/20',
      iconBg: 'bg-blue-400/20 text-cyan-200',
      tagColor: 'bg-cyan-400/20 text-cyan-200 border-cyan-400/30',
      onClick: () => {
        if (onUploadAnother) onUploadAnother();
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'gmail',
      title: 'Connect Gmail Auto-Sync',
      description: 'Auto-detect subscription invoices from your inbox.',
      badge: 'Auto-Sync',
      icon: FcGoogle,
      isCustomIcon: true,
      gradient: 'from-rose-600/90 via-rose-500/90 to-amber-500/90',
      borderGlow: 'border-rose-400/40 hover:border-rose-300 shadow-rose-500/20',
      iconBg: 'bg-white/20 text-white',
      tagColor: 'bg-amber-400/20 text-amber-200 border-amber-400/30',
      onClick: () => {
        if (onConnectGmail) onConnectGmail();
        else alert('Gmail Auto-Sync modal or OAuth flow triggered!');
      }
    },
    {
      id: 'copilot',
      title: 'Ask AI Copilot',
      description: 'Analyze receipt line items & negotiate plan downgrades.',
      badge: 'AI Assistant',
      icon: HiOutlineSparkles,
      gradient: 'from-purple-600/90 via-purple-500/90 to-indigo-600/90',
      borderGlow: 'border-purple-400/40 hover:border-purple-300 shadow-purple-500/20',
      iconBg: 'bg-purple-400/20 text-purple-200',
      tagColor: 'bg-purple-400/20 text-purple-200 border-purple-400/30',
      onClick: () => {
        if (onAskCopilot) onAskCopilot();
        else navigate('/ai-chat');
      }
    },
    {
      id: 'dashboard',
      title: 'Go to Dashboard',
      description: 'Review total monthly spend, active bills & alerts.',
      badge: 'Analytics',
      icon: HiOutlineViewGrid,
      gradient: 'from-emerald-600/90 via-teal-600/90 to-cyan-600/90',
      borderGlow: 'border-emerald-400/40 hover:border-emerald-300 shadow-emerald-500/20',
      iconBg: 'bg-emerald-400/20 text-emerald-200',
      tagColor: 'bg-emerald-400/20 text-emerald-200 border-emerald-400/30',
      onClick: () => {
        if (onGoToDashboard) onGoToDashboard();
        else navigate('/dashboard');
      }
    }
  ];

  return (
    <div className="w-full space-y-3">
      {/* Section Subheader */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <FiZap className="w-4 h-4 text-amber-400 fill-amber-400/20" />
          <h3 className="text-sm font-bold text-white tracking-wide uppercase">
            Quick Actions
          </h3>
        </div>
        <span className="text-xs text-slate-400">Automate & manage your receipts</span>
      </div>

      {/* Grid of Vibrant Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((act) => {
          const IconComp = act.icon;
          return (
            <motion.div
              key={act.id}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              onClick={act.onClick}
              className={`group relative p-5 rounded-2xl bg-gradient-to-br ${act.gradient} border ${act.borderGlow} shadow-xl hover:shadow-2xl cursor-pointer overflow-hidden backdrop-blur-md flex flex-col justify-between min-h-[160px]`}
            >
              {/* Background Glow Orb Accent */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

              {/* Card Top Row: Icon & Tag */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl ${act.iconBg} backdrop-blur-sm flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300`}
                  >
                    {act.isCustomIcon ? (
                      <FcGoogle className="w-6 h-6" />
                    ) : (
                      <IconComp className="w-5 h-5" />
                    )}
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${act.tagColor}`}
                  >
                    {act.badge}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-base font-bold text-white group-hover:text-white transition-colors leading-tight">
                  {act.title}
                </h4>

                {/* Subtitle */}
                <p className="text-xs text-white/80 mt-1 line-clamp-2 leading-relaxed">
                  {act.description}
                </p>
              </div>

              {/* Card Footer CTA Link */}
              <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-semibold text-white group-hover:text-white">
                <span>Launch action</span>
                <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default UploadQuickActions;
