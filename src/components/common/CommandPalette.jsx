import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineSearch,
  HiOutlineHome,
  HiOutlineCloudUpload,
  HiOutlineCreditCard,
  HiOutlineChatAlt2,
  HiOutlineBell,
  HiOutlineUser,
  HiOutlineSparkles,
  HiOutlineDocumentText,
  HiOutlineDownload,
  HiOutlineArrowRight,
  HiOutlineX,
} from 'react-icons/hi';
import { ROUTES } from '../../utils/constants';

const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const commands = [
    {
      id: 'nav-dashboard',
      title: 'Go to Dashboard',
      subtitle: 'Overview of spending, health score, & forecasts',
      category: 'Navigation',
      icon: HiOutlineHome,
      action: () => navigate(ROUTES.DASHBOARD),
    },
    {
      id: 'nav-upload',
      title: 'Upload Receipt or Invoice',
      subtitle: 'Scan PDF/Image bills with LLM OCR Vision',
      category: 'Navigation',
      icon: HiOutlineCloudUpload,
      action: () => navigate(ROUTES.UPLOAD),
    },
    {
      id: 'nav-subscriptions',
      title: 'Subscription Manager',
      subtitle: 'Track active SaaS seats, pricing, & renewals',
      category: 'Navigation',
      icon: HiOutlineCreditCard,
      action: () => navigate(ROUTES.SUBSCRIPTIONS),
    },
    {
      id: 'nav-chat',
      title: 'AI Financial Assistant Chat',
      subtitle: 'ChatGPT style conversational audit copilot',
      category: 'Navigation',
      icon: HiOutlineChatAlt2,
      action: () => navigate(ROUTES.CHAT),
    },
    {
      id: 'nav-notifications',
      title: 'Notifications Center',
      subtitle: 'View price hikes, due dates, & renewal alerts',
      category: 'Navigation',
      icon: HiOutlineBell,
      action: () => navigate(ROUTES.NOTIFICATIONS),
    },
    {
      id: 'nav-profile',
      title: 'Account & Settings',
      subtitle: 'Connected accounts, security, & preferences',
      category: 'Navigation',
      icon: HiOutlineUser,
      action: () => navigate(ROUTES.PROFILE),
    },
    {
      id: 'ai-audit',
      title: 'Run AI Subscription Audit',
      subtitle: 'Identify unused seats & potential savings',
      category: 'AI Copilot Actions',
      icon: HiOutlineSparkles,
      action: () => navigate(ROUTES.CHAT),
    },
    {
      id: 'ai-receipt',
      title: 'Scan PDF Receipt with OCR',
      subtitle: 'Extract line items and recurring schedule',
      category: 'AI Copilot Actions',
      icon: HiOutlineDocumentText,
      action: () => navigate(ROUTES.UPLOAD),
    },
    {
      id: 'export-data',
      title: 'Export Complete Financial Ledger',
      subtitle: 'Download full account JSON backup file',
      category: 'Quick Tools',
      icon: HiOutlineDownload,
      action: () => navigate(ROUTES.PROFILE),
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#171F2F] shadow-2xl backdrop-blur-2xl"
        >
          {/* Top Search Input Box */}
          <div className="flex items-center border-b border-white/10 px-4 py-3.5 bg-[#121A2F]/60">
            <HiOutlineSearch className="h-5 w-5 text-[#5B8CFF] shrink-0 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Type a command or search subscriptions, bills..."
              className="w-full bg-transparent text-sm text-white placeholder-[#A1A8B5] outline-none font-medium"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-[#A1A8B5] hover:text-white p-1"
              >
                <HiOutlineX className="h-4 w-4" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-block rounded border border-white/10 bg-[#1E293B] px-2 py-0.5 text-[10px] font-mono text-[#A1A8B5]">
                ESC
              </kbd>
            )}
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-2 space-y-1">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd, idx) => {
                const Icon = cmd.icon;
                const isSelected = idx === selectedIndex;

                return (
                  <button
                    key={cmd.id}
                    type="button"
                    onClick={() => {
                      cmd.action();
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-all duration-150 ${
                      isSelected
                        ? 'bg-[#5B8CFF]/20 text-white border border-[#5B8CFF]/30 shadow-sm'
                        : 'text-[#A1A8B5] hover:bg-[#121A2F] hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                          isSelected
                            ? 'bg-[#5B8CFF] text-white shadow-glow-blue'
                            : 'bg-[#1E293B] text-[#A1A8B5]'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold truncate text-white">
                            {cmd.title}
                          </span>
                          <span className="rounded-full bg-[#1E293B] px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-[#A1A8B5] border border-white/10">
                            {cmd.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#A1A8B5] truncate mt-0.5">
                          {cmd.subtitle}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="flex items-center gap-1 text-[#5B8CFF] text-xs font-semibold shrink-0">
                        <span>Select</span>
                        <HiOutlineArrowRight className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-[#A1A8B5]">
                <p className="text-sm font-semibold">No matching commands found</p>
              </div>
            )}
          </div>

          {/* Footer Shortcuts hint */}
          <div className="flex items-center justify-between border-t border-white/10 bg-[#121A2F]/60 px-4 py-2 text-[11px] font-mono text-[#A1A8B5]">
            <div className="flex items-center gap-3">
              <span><kbd className="rounded border border-white/10 bg-[#171F2F] px-1.5 py-0.5 text-[10px]">↑↓</kbd> Navigate</span>
              <span><kbd className="rounded border border-white/10 bg-[#171F2F] px-1.5 py-0.5 text-[10px]">↵</kbd> Open</span>
            </div>
            <span className="text-[#5B8CFF] font-bold">SubSense AI Copilot</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

CommandPalette.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CommandPalette;
