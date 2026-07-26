import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineSparkles,
  HiOutlineUser,
  HiOutlineClipboard,
  HiOutlineCheck,
  HiOutlineThumbUp,
  HiOutlineThumbDown,
  HiThumbUp,
  HiThumbDown,
  HiOutlineTrendingDown,
  HiOutlineCreditCard,
  HiOutlineExclamationCircle,
  HiOutlineArrowRight,
  HiOutlineChartBar,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineRefresh
} from 'react-icons/hi';
import { FaRobot } from 'react-icons/fa';

/**
 * Rich Text & Basic Markdown Formatter for Chat Messages
 */
const FormattedMessageText = ({ text }) => {
  if (!text) return null;

  // Split into lines to format headers, bullet points, and code blocks
  const lines = text.split('\n');
  const formattedElements = [];
  let currentList = [];
  let inList = false;

  const flushList = (key) => {
    if (currentList.length > 0) {
      formattedElements.push(
        <ul key={`list-${key}`} className="my-2 space-y-1.5 pl-1">
          {currentList.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-slate-200">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0 shadow-sm shadow-cyan-400/50" />
              <span className="flex-1">{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  // Inline formatting helper for bold (**text**), code (`code`), and italics (*text*)
  const parseInline = (rawText) => {
    if (!rawText) return null;

    // Pattern for bold, inline code, or key metrics highlighting
    const parts = [];
    let remaining = rawText;
    let keyIdx = 0;

    // Replace bold **text** or inline `code`
    const regex = /(\*\*.*?\*\*|`.*?`|\$[0-9,]+(?:\.[0-9]{2})?\/[a-z]+|\$[0-9,]+(?:\.[0-9]{2})?)/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(rawText)) !== null) {
      if (match.index > lastIndex) {
        parts.push(rawText.substring(lastIndex, match.index));
      }

      const matchText = match[0];
      if (matchText.startsWith('**') && matchText.endsWith('**')) {
        parts.push(
          <strong key={keyIdx++} className="font-semibold text-white">
            {matchText.slice(2, -2)}
          </strong>
        );
      } else if (matchText.startsWith('`') && matchText.endsWith('`')) {
        parts.push(
          <code
            key={keyIdx++}
            className="px-1.5 py-0.5 rounded bg-slate-800/90 text-cyan-300 font-mono text-xs border border-cyan-500/20"
          >
            {matchText.slice(1, -1)}
          </code>
        );
      } else if (matchText.startsWith('$')) {
        parts.push(
          <span
            key={keyIdx++}
            className="inline-flex items-center font-semibold text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/30 text-xs"
          >
            {matchText}
          </span>
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < rawText.length) {
      parts.push(rawText.substring(lastIndex));
    }

    return parts.length > 0 ? parts : rawText;
  };

  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();

    // Bullet points (* or - or numbered)
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || /^\d+\.\s/.test(trimmed)) {
      inList = true;
      const content = trimmed.replace(/^(\* |- |\d+\.\s)/, '');
      currentList.push(content);
    } else {
      if (inList) {
        flushList(lineIdx);
        inList = false;
      }

      if (trimmed === '') {
        formattedElements.push(<div key={`space-${lineIdx}`} className="h-2" />);
      } else if (trimmed.startsWith('### ')) {
        formattedElements.push(
          <h4 key={`h3-${lineIdx}`} className="text-base font-bold text-cyan-300 mt-3 mb-1 flex items-center gap-1.5">
            <HiOutlineSparkles className="w-4 h-4 text-cyan-400" />
            {trimmed.replace('### ', '')}
          </h4>
        );
      } else if (trimmed.startsWith('## ')) {
        formattedElements.push(
          <h3 key={`h2-${lineIdx}`} className="text-lg font-bold text-white mt-4 mb-2">
            {trimmed.replace('## ', '')}
          </h3>
        );
      } else {
        formattedElements.push(
          <p key={`p-${lineIdx}`} className="text-sm leading-relaxed my-1">
            {parseInline(trimmed)}
          </p>
        );
      }
    }
  });

  if (inList) {
    flushList('end');
  }

  return <div className="space-y-1">{formattedElements}</div>;
};

FormattedMessageText.propTypes = {
  text: PropTypes.string
};

/**
 * Embedded Financial Metrics Summary Card Component
 */
const FinancialMetricsCard = ({ metrics }) => {
  if (!metrics) return null;

  const { potentialSavings, projectedSpend, unusedCount } = metrics;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-3.5 mb-2 overflow-hidden rounded-xl border border-indigo-500/20 bg-slate-950/70 p-3.5 shadow-inner backdrop-blur-md"
    >
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-indigo-500/10 text-indigo-400">
            <HiOutlineChartBar className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
            SubSense Financial Summary
          </span>
        </div>
        <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-medium px-2 py-0.5 rounded-full border border-indigo-500/30">
          AI Verified
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Potential Savings */}
        {potentialSavings !== undefined && (
          <div className="flex flex-col p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mb-1">
              <HiOutlineTrendingDown className="w-3.5 h-3.5" />
              <span>Potential Savings</span>
            </div>
            <span className="text-base font-bold text-emerald-300">
              {typeof potentialSavings === 'number' ? `$${potentialSavings.toFixed(2)}/mo` : potentialSavings}
            </span>
          </div>
        )}

        {/* Projected Spend */}
        {projectedSpend !== undefined && (
          <div className="flex flex-col p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-medium mb-1">
              <HiOutlineCreditCard className="w-3.5 h-3.5" />
              <span>Projected Spend</span>
            </div>
            <span className="text-base font-bold text-cyan-200">
              {typeof projectedSpend === 'number' ? `$${projectedSpend.toFixed(2)}/mo` : projectedSpend}
            </span>
          </div>
        )}

        {/* Unused Count */}
        {unusedCount !== undefined && (
          <div className="flex flex-col p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium mb-1">
              <HiOutlineExclamationCircle className="w-3.5 h-3.5" />
              <span>Unused Subscriptions</span>
            </div>
            <span className="text-base font-bold text-amber-300">
              {unusedCount} {typeof unusedCount === 'number' && unusedCount === 1 ? 'Service' : 'Services'}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

FinancialMetricsCard.propTypes = {
  metrics: PropTypes.shape({
    potentialSavings: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    projectedSpend: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    unusedCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })
};

/**
 * MessageBubble Component
 */
const MessageBubble = ({
  message,
  onActionClick,
  onFeedback,
  onCopy
}) => {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'up' | 'down' | null
  const [loadingActionId, setLoadingActionId] = useState(null);

  if (!message) return null;

  const isUser = message.sender === 'user' || message.role === 'user';
  const textContent = message.text || message.content || '';
  const timestamp = message.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const metrics = message.metrics || message.financialMetrics;
  const actions = message.actions || message.recommendations || [];

  const handleCopy = () => {
    if (textContent) {
      navigator.clipboard.writeText(textContent);
      setCopied(true);
      if (onCopy) onCopy(textContent);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFeedback = (type) => {
    const newFeedback = feedback === type ? null : type;
    setFeedback(newFeedback);
    if (onFeedback) {
      onFeedback(message.id, newFeedback);
    }
  };

  const handleAction = async (action) => {
    const actionId = typeof action === 'string' ? action : action.id || action.label;
    setLoadingActionId(actionId);
    if (onActionClick) {
      await onActionClick(action, message);
    }
    setLoadingActionId(null);
  };

  const getActionIcon = (action) => {
    const label = (typeof action === 'string' ? action : action.label || '').toLowerCase();
    if (label.includes('cancel')) return <HiOutlineXCircle className="w-4 h-4 text-rose-400" />;
    if (label.includes('switch') || label.includes('upgrade')) return <HiOutlineRefresh className="w-4 h-4 text-amber-400" />;
    if (label.includes('audit') || label.includes('details')) return <HiOutlineCheckCircle className="w-4 h-4 text-emerald-400" />;
    return <HiOutlineArrowRight className="w-4 h-4 text-cyan-400" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`flex items-start gap-3 my-3 w-full ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar Container */}
      <div className="shrink-0 mt-0.5">
        {isUser ? (
          <div className="relative group">
            {message.userAvatar ? (
              <img
                src={message.userAvatar}
                alt="User Avatar"
                className="w-9 h-9 rounded-full border-2 border-indigo-500/50 object-cover shadow-md shadow-indigo-500/20"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30 border border-violet-400/30">
                <HiOutlineUser className="w-5 h-5" />
              </div>
            )}
          </div>
        ) : (
          <div className="relative group">
            {/* Glowing animated background aura */}
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 opacity-65 blur-sm group-hover:opacity-100 transition duration-500 animate-pulse" />
            <div className="relative w-9 h-9 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-md shadow-cyan-500/20">
              <FaRobot className="w-4 h-4 text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            </div>
          </div>
        )}
      </div>

      {/* Message Content Bubble Container */}
      <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Header Sender Info & Timestamp */}
        <div className={`flex items-center gap-2 mb-1 text-[11px] text-slate-400 px-1 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="font-medium text-slate-300">{isUser ? 'You' : 'SubSense AI'}</span>
          <span>•</span>
          <span>{timestamp}</span>
        </div>

        {/* Bubble Box */}
        <div
          className={`relative group p-4 rounded-2xl transition-all duration-200 ${
            isUser
              ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-700 text-white rounded-tr-xs shadow-lg shadow-indigo-600/20 border border-indigo-400/30'
              : 'bg-slate-900/85 backdrop-blur-xl border border-slate-800/90 text-slate-100 rounded-tl-xs shadow-xl shadow-cyan-950/20'
          }`}
        >
          {/* Main Message Text */}
          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{textContent}</p>
          ) : (
            <FormattedMessageText text={textContent} />
          )}

          {/* Embedded Financial Metrics Summary Card if present */}
          {!isUser && metrics && <FinancialMetricsCard metrics={metrics} />}

          {/* Interactive Recommendation Action Buttons */}
          {!isUser && actions && actions.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap gap-2">
              {actions.map((action, idx) => {
                const label = typeof action === 'string' ? action : action.label || action.text;
                const actionId = typeof action === 'string' ? action : action.id || label;
                const isLoading = loadingActionId === actionId;

                return (
                  <motion.button
                    key={actionId || idx}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAction(action)}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/60 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="h-3.5 w-3.5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                    ) : (
                      getActionIcon(action)
                    )}
                    <span>{label}</span>
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Bottom Toolbar (Copy & Feedback) for AI messages */}
          <div className={`mt-2 pt-2 flex items-center gap-2 text-xs border-t ${isUser ? 'border-indigo-500/20 justify-end' : 'border-slate-800/50 justify-between'}`}>
            {!isUser && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleFeedback('up')}
                  title="Helpful response"
                  className={`p-1 rounded transition-colors ${
                    feedback === 'up'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {feedback === 'up' ? <HiThumbUp className="w-3.5 h-3.5" /> : <HiOutlineThumbUp className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => handleFeedback('down')}
                  title="Unhelpful response"
                  className={`p-1 rounded transition-colors ${
                    feedback === 'down'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {feedback === 'down' ? <HiThumbDown className="w-3.5 h-3.5" /> : <HiOutlineThumbDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}

            {/* Copy Button & Toast notification badge */}
            <div className="flex items-center gap-1.5 ml-auto">
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, x: 5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] font-medium text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30"
                  >
                    Copied!
                  </motion.span>
                )}
              </AnimatePresence>

              <button
                onClick={handleCopy}
                title="Copy message to clipboard"
                className={`p-1 rounded transition-colors ${
                  isUser
                    ? 'text-indigo-200 hover:text-white hover:bg-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {copied ? <HiOutlineCheck className="w-3.5 h-3.5 text-emerald-400" /> : <HiOutlineClipboard className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

MessageBubble.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sender: PropTypes.string,
    role: PropTypes.string,
    text: PropTypes.string,
    content: PropTypes.string,
    timestamp: PropTypes.string,
    userAvatar: PropTypes.string,
    metrics: PropTypes.object,
    financialMetrics: PropTypes.object,
    actions: PropTypes.array,
    recommendations: PropTypes.array
  }),
  onActionClick: PropTypes.func,
  onFeedback: PropTypes.func,
  onCopy: PropTypes.func
};

export default MessageBubble;
