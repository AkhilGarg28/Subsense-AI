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

const UploadQuickActions = ({
  onUploadAnother,
  onConnectGmail,
  onAskCopilot,
  onGoToDashboard
}) => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'upload',
      title: 'Upload Another Receipt',
      description: 'Scan JPG, PNG, or PDF receipts with instant AI extraction.',
      badge: 'Quick Scan',
      icon: HiOutlineCloudUpload,
      accentColor: 'text-[#5B8CFF]',
      borderColor: 'hover:border-[#5B8CFF]/40',
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
      accentColor: 'text-[#F59E0B]',
      borderColor: 'hover:border-[#F59E0B]/40',
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
      accentColor: 'text-[#8B5CF6]',
      borderColor: 'hover:border-[#8B5CF6]/40',
      onClick: () => {
        if (onAskCopilot) onAskCopilot();
        else navigate('/chat');
      }
    },
    {
      id: 'dashboard',
      title: 'Go to Dashboard',
      description: 'Review total monthly spend, active bills & alerts.',
      badge: 'Analytics',
      icon: HiOutlineViewGrid,
      accentColor: 'text-[#22C55E]',
      borderColor: 'hover:border-[#22C55E]/40',
      onClick: () => {
        if (onGoToDashboard) onGoToDashboard();
        else navigate('/dashboard');
      }
    }
  ];

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between px-1 font-mono">
        <div className="flex items-center gap-2">
          <FiZap className="w-4 h-4 text-[#F59E0B]" />
          <h3 className="text-xs font-bold text-white tracking-wider uppercase">
            Quick Actions
          </h3>
        </div>
        <span className="text-xs text-[#A1A8B5]">Automate & manage your receipts</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((act) => {
          const IconComp = act.icon;
          return (
            <motion.div
              key={act.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={act.onClick}
              className={`group relative p-5 rounded-2xl bg-[#171F2F]/80 border border-white/10 ${act.borderColor} shadow-2xl cursor-pointer backdrop-blur-xl flex flex-col justify-between min-h-[150px] transition-all`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#121A2F] border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    {act.isCustomIcon ? (
                      <FcGoogle className="w-5 h-5" />
                    ) : (
                      <IconComp className={`w-5 h-5 ${act.accentColor}`} />
                    )}
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-[#A1A8B5]">
                    {act.badge}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-[#5B8CFF] transition-colors leading-tight">
                  {act.title}
                </h4>

                <p className="text-xs text-[#A1A8B5] mt-1 leading-relaxed">
                  {act.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono font-bold text-[#5B8CFF]">
                <span>Launch action</span>
                <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default UploadQuickActions;
