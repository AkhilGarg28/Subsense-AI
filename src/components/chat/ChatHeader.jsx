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

/**
 * ChatHeader — Header bar for SubSense AI Financial Copilot Chat.
 * Features title, pulsing status dot, New Chat button, dropdown options menu, and mobile drawer toggle.
 */
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

  // Close dropdown on click outside
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
    <header className="glass sticky top-0 z-30 flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
      {/* Left: Mobile Sidebar Toggle + AI Title & Pulsing Status */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Toggle Drawer Button */}
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface/80 text-text-secondary transition-all hover:bg-surface hover:text-text-primary lg:hidden"
            aria-label="Open conversation history"
            title="Open conversation history"
          >
            <HiOutlineMenu className="h-5 w-5" />
          </button>
        )}

        {/* AI Copilot Badge & Status */}
        <div className="flex items-center gap-3">
          <div className="gradient-primary relative flex h-10 w-10 items-center justify-center rounded-xl font-bold text-white shadow-md shadow-primary/20">
            <HiOutlineSparkles className="h-5 w-5" />
            {/* Pulsing status indicator dot */}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-background bg-success" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-text-primary sm:text-lg">
                {title}
              </h2>
              <span className="hidden items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success border border-success/30 sm:inline-flex">
                <HiOutlineCheckCircle className="h-3 w-3" />
                Active
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <span className="inline-block h-2 w-2 rounded-full bg-success animate-pulse" />
              <span>{status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: New Chat Button + Actions Dropdown Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* New Chat Button */}
        <button
          onClick={onNewChat}
          type="button"
          className="flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-primary/20 transition-all duration-200 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30 active:scale-95 sm:text-sm"
        >
          <HiOutlinePlus className="h-4 w-4" />
          <span className="hidden sm:inline">New Chat</span>
        </button>

        {/* Actions Dropdown Menu (Clear History / Export Chat) */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface/80 text-text-secondary transition-all hover:border-primary/40 hover:bg-surface hover:text-text-primary"
            aria-label="Chat options"
            aria-expanded={isDropdownOpen}
          >
            <HiOutlineDotsVertical className="h-5 w-5" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-surface p-1.5 shadow-xl backdrop-blur-lg animate-in fade-in zoom-in-95 z-50">
              <button
                onClick={() => handleAction(onExportChat)}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-text-primary hover:bg-surface-light hover:text-primary transition-colors"
              >
                <HiOutlineDownload className="h-4 w-4 text-text-muted" />
                <span>Export Chat History</span>
              </button>

              <div className="my-1 border-t border-border" />

              <button
                onClick={() => handleAction(onClearHistory)}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-danger hover:bg-danger/10 transition-colors"
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
