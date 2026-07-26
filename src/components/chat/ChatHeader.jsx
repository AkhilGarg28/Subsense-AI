import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  HiOutlinePlus,
  HiOutlineDotsVertical,
  HiOutlineTrash,
  HiOutlineDownload,
  HiOutlineSparkles,
  HiOutlineMenu,
  HiOutlineCheckCircle,
} from 'react-icons/hi';

const ChatHeader = ({
  onNewChat,
  onClearHistory,
  onExportChat,
  onToggleMobileSidebar,
  title = 'SubSense AI Copilot',
  status = 'Online • Financial Fine-tune v4',
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (actionFn) => {
    setIsDropdownOpen(false);
    if (actionFn) actionFn();
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#171F2F]/90 px-4 py-3 sm:px-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#121A2F] text-[#A1A8B5] hover:text-white transition-all lg:hidden"
            aria-label="Open conversation history"
          >
            <HiOutlineMenu className="h-5 w-5" />
          </button>
        )}

        <div className="flex items-center gap-3">
          <div className="gradient-primary relative flex h-9 w-9 items-center justify-center rounded-xl font-bold text-white shadow-glow-blue">
            <HiOutlineSparkles className="h-4.5 w-4.5" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-[#121A2F] bg-[#22C55E]" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white sm:text-base">
                {title}
              </h2>
              <span className="hidden items-center gap-1 rounded-full bg-[#22C55E]/15 px-2 py-0.5 text-[10px] font-mono font-bold text-[#22C55E] border border-[#22C55E]/30 sm:inline-flex">
                <HiOutlineCheckCircle className="h-3 w-3" />
                Active
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#A1A8B5]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span>{status}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs">
        <button
          onClick={onNewChat}
          type="button"
          className="flex items-center gap-1.5 rounded-xl gradient-primary px-3.5 py-2 font-bold text-white shadow-glow-blue transition-all cursor-pointer"
        >
          <HiOutlinePlus className="h-4 w-4" />
          <span className="hidden sm:inline">New Chat</span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#121A2F] text-[#A1A8B5] hover:text-white transition-all cursor-pointer"
            aria-label="Chat options"
          >
            <HiOutlineDotsVertical className="h-4.5 w-4.5" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#171F2F] p-1.5 shadow-2xl backdrop-blur-xl z-50">
              <button
                onClick={() => handleAction(onExportChat)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-white hover:bg-[#121A2F] transition-colors"
              >
                <HiOutlineDownload className="h-4 w-4 text-[#5B8CFF]" />
                <span>Export Chat JSON</span>
              </button>

              <div className="my-1 border-t border-white/10" />

              <button
                onClick={() => handleAction(onClearHistory)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-[#EF4444] hover:bg-[#EF4444]/15 transition-colors"
              >
                <HiOutlineTrash className="h-4 w-4" />
                <span>Clear History</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

ChatHeader.propTypes = {
  onNewChat: PropTypes.func,
  onClearHistory: PropTypes.func,
  onExportChat: PropTypes.func,
  onToggleMobileSidebar: PropTypes.func,
  title: PropTypes.string,
  status: PropTypes.string,
};

export default ChatHeader;
