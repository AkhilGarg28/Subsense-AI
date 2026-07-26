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
} from 'react-icons/hi';
import { FaRobot } from 'react-icons/fa';

const FormattedMessageText = ({ text }) => {
  if (!text) return null;

  const lines = text.split('\n');
  const formattedElements = [];
  let currentList = [];
  let inList = false;

  const flushList = (key) => {
    if (currentList.length > 0) {
      formattedElements.push(
        <ul key={`list-${key}`} className="my-2 space-y-1.5 pl-1">
          {currentList.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-[#A1A8B5]">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#5B8CFF] shrink-0 shadow-sm shadow-[#5B8CFF]" />
              <span className="flex-1">{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const parseInline = (rawText) => {
    if (!rawText) return null;

    const parts = [];
    const regex = /(\*\*.*?\*\*|`.*?`|\$[0-9,]+(?:\.[0-9]{2})?\/[a-z]+|\$[0-9,]+(?:\.[0-9]{2})?)/g;
    let match;
    let lastIndex = 0;
    let keyIdx = 0;

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
            className="px-1.5 py-0.5 rounded bg-[#121A2F] text-[#5B8CFF] font-mono text-xs border border-white/10"
          >
            {matchText.slice(1, -1)}
          </code>
        );
      } else if (matchText.startsWith('$')) {
        parts.push(
          <span
            key={keyIdx++}
            className="inline-flex items-center font-mono font-bold text-[#22C55E] bg-[#22C55E]/15 px-1.5 py-0.5 rounded border border-[#22C55E]/30 text-xs"
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
          <h4 key={`h3-${lineIdx}`} className="text-base font-bold text-[#5B8CFF] mt-3 mb-1 flex items-center gap-1.5">
            <HiOutlineSparkles className="w-4 h-4 text-[#5B8CFF]" />
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
          <p key={`p-${lineIdx}`} className="text-sm leading-relaxed my-1 text-[#A1A8B5]">
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

const FinancialMetricsCard = ({ metrics }) => {
  if (!metrics) return null;

  const { potentialSavings, projectedSpend, unusedCount } = metrics;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-3.5 mb-2 overflow-hidden rounded-xl border border-white/10 bg-[#121A2F]/80 p-3.5 shadow-inner backdrop-blur-md font-mono"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <HiOutlineChartBar className="w-4 h-4 text-[#5B8CFF]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#5B8CFF]">
            SubSense Financial Summary
          </span>
        </div>
        <span className="text-[10px] bg-[#22C55E]/15 text-[#22C55E] font-bold px-2 py-0.5 rounded-full border border-[#22C55E]/30">
          AI Verified
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {potentialSavings !== undefined && (
          <div className="flex flex-col p-2.5 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/20">
            <div className="flex items-center gap-1.5 text-xs text-[#22C55E] font-bold mb-1">
              <HiOutlineTrendingDown className="w-3.5 h-3.5" />
              <span>Potential Savings</span>
            </div>
            <span className="text-base font-bold text-[#22C55E]">
              {typeof potentialSavings === 'number' ? `$${potentialSavings.toFixed(2)}/mo` : potentialSavings}
            </span>
          </div>
        )}

        {projectedSpend !== undefined && (
          <div className="flex flex-col p-2.5 rounded-lg bg-[#5B8CFF]/10 border border-[#5B8CFF]/20">
            <div className="flex items-center gap-1.5 text-xs text-[#5B8CFF] font-bold mb-1">
              <HiOutlineCreditCard className="w-3.5 h-3.5" />
              <span>Projected Spend</span>
            </div>
            <span className="text-base font-bold text-white">
              {typeof projectedSpend === 'number' ? `$${projectedSpend.toFixed(2)}/mo` : projectedSpend}
            </span>
          </div>
        )}

        {unusedCount !== undefined && (
          <div className="flex flex-col p-2.5 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20">
            <div className="flex items-center gap-1.5 text-xs text-[#F59E0B] font-bold mb-1">
              <HiOutlineExclamationCircle className="w-3.5 h-3.5" />
              <span>Unused Subscriptions</span>
            </div>
            <span className="text-base font-bold text-[#F59E0B]">
              {unusedCount} Services
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

FinancialMetricsCard.propTypes = {
  metrics: PropTypes.object
};

const MessageBubble = ({
  message,
  onActionClick,
  onFeedback,
  onCopy
}) => {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null);
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
    if (onFeedback) onFeedback(message.id, newFeedback);
  };

  const handleAction = async (action) => {
    const actionId = typeof action === 'string' ? action : action.id || action.label;
    setLoadingActionId(actionId);
    if (onActionClick) await onActionClick(action, message);
    setLoadingActionId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className={`flex items-start gap-3 my-3 w-full ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className="shrink-0 mt-0.5">
        {isUser ? (
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#5B8CFF] to-[#8B5CF6] flex items-center justify-center text-white shadow-md">
            <HiOutlineUser className="w-5 h-5" />
          </div>
        ) : (
          <div className="relative group">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#8B5CF6] opacity-70 blur-sm group-hover:opacity-100 transition animate-pulse" />
            <div className="relative w-9 h-9 rounded-xl bg-[#121A2F] border border-[#5B8CFF]/40 flex items-center justify-center text-[#5B8CFF] shadow-md">
              <FaRobot className="w-4 h-4 text-[#5B8CFF]" />
            </div>
          </div>
        )}
      </div>

      <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`flex items-center gap-2 mb-1 text-[11px] font-mono text-[#A1A8B5] px-1 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="font-bold text-white">{isUser ? 'You' : 'SubSense AI'}</span>
          <span>•</span>
          <span>{timestamp}</span>
        </div>

        <div
          className={`relative p-4 rounded-2xl transition-all duration-200 ${
            isUser
              ? 'gradient-primary text-white rounded-tr-none shadow-lg'
              : 'bg-[#171F2F]/90 backdrop-blur-xl border border-white/10 text-white rounded-tl-none shadow-2xl'
          }`}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{textContent}</p>
          ) : (
            <FormattedMessageText text={textContent} />
          )}

          {!isUser && metrics && <FinancialMetricsCard metrics={metrics} />}

          {!isUser && actions && actions.length > 0 && (
            <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2 font-mono">
              {actions.map((action, idx) => {
                const label = typeof action === 'string' ? action : action.label || action.text;
                const actionId = typeof action === 'string' ? action : action.id || label;
                const isLoading = loadingActionId === actionId;

                return (
                  <button
                    key={actionId || idx}
                    onClick={() => handleAction(action)}
                    disabled={isLoading}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold gradient-primary text-white shadow-glow-blue hover:scale-[1.02] transition-all cursor-pointer"
                  >
                    <span>{label}</span>
                    <HiOutlineArrowRight className="w-3.5 h-3.5" />
                  </button>
                );
              })}
            </div>
          )}

          <div className={`mt-2 pt-2 flex items-center gap-2 text-xs border-t ${isUser ? 'border-white/10 justify-end' : 'border-white/10 justify-between'}`}>
            {!isUser && (
              <div className="flex items-center gap-1">
                <button onClick={() => handleFeedback('up')} className={`p-1 rounded ${feedback === 'up' ? 'text-[#22C55E]' : 'text-[#A1A8B5] hover:text-white'}`}>
                  {feedback === 'up' ? <HiThumbUp className="w-3.5 h-3.5" /> : <HiOutlineThumbUp className="w-3.5 h-3.5" />}
                </button>
                <button onClick={() => handleFeedback('down')} className={`p-1 rounded ${feedback === 'down' ? 'text-[#EF4444]' : 'text-[#A1A8B5] hover:text-white'}`}>
                  {feedback === 'down' ? <HiThumbDown className="w-3.5 h-3.5" /> : <HiOutlineThumbDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}

            <button onClick={handleCopy} className="p-1 rounded text-[#A1A8B5] hover:text-white ml-auto">
              {copied ? <HiOutlineCheck className="w-3.5 h-3.5 text-[#22C55E]" /> : <HiOutlineClipboard className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

MessageBubble.propTypes = {
  message: PropTypes.object,
  onActionClick: PropTypes.func,
  onFeedback: PropTypes.func,
  onCopy: PropTypes.func
};

export default MessageBubble;
