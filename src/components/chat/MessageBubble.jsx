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
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineRefresh
} from 'react-icons/hi';

const FormattedMessageText = ({ text }) => {
  if (!text) return null;

  const lines = text.split('\n');
  const formattedElements = [];
  let currentList = [];
  let inList = false;

  const flushList = (key) => {
    if (currentList.length > 0) {
      formattedElements.push(
        <ul key={`list-${key}`} className="my-2 space-y-1.5 pl-1 font-sans">
          {currentList.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-[#F3F1EA]">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#C2A155] shrink-0" />
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
          <strong key={keyIdx++} className="font-display font-bold text-[#F3F1EA]">
            {matchText.slice(2, -2)}
          </strong>
        );
      } else if (matchText.startsWith('`') && matchText.endsWith('`')) {
        parts.push(
          <code
            key={keyIdx++}
            className="px-1.5 py-0.5 rounded bg-[#0D0F0E] text-[#C2A155] font-mono text-xs border border-[#F3F1EA]/10"
          >
            {matchText.slice(1, -1)}
          </code>
        );
      } else if (matchText.startsWith('$')) {
        parts.push(
          <span
            key={keyIdx++}
            className="inline-flex items-center font-mono font-bold text-[#3FA972] bg-[#3FA972]/15 px-1.5 py-0.5 rounded border border-[#3FA972]/30 text-xs"
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
          <h4 key={`h3-${lineIdx}`} className="text-xs font-mono font-bold text-[#C2A155] uppercase tracking-wider mt-3 mb-1">
            {trimmed.replace('### ', '')}
          </h4>
        );
      } else if (trimmed.startsWith('## ')) {
        formattedElements.push(
          <h3 key={`h2-${lineIdx}`} className="text-sm font-display font-bold text-[#F3F1EA] mt-4 mb-2">
            {trimmed.replace('## ', '')}
          </h3>
        );
      } else {
        formattedElements.push(
          <p key={`p-${lineIdx}`} className="text-xs font-sans leading-relaxed my-1 text-[#F3F1EA]">
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
    <div className="mt-3.5 mb-2 rounded-lg border border-[#F3F1EA]/10 bg-[#0D0F0E] p-3 font-mono">
      <div className="flex items-center justify-between border-b border-[#F3F1EA]/10 pb-2 mb-3">
        <span className="text-[10px] uppercase font-bold text-[#C2A155]">
          SubSense Financial Summary
        </span>
        <span className="text-[9px] bg-[#3FA972]/20 text-[#3FA972] font-bold px-2 py-0.5 rounded border border-[#3FA972]/30">
          AI VERIFIED
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
        {potentialSavings !== undefined && (
          <div className="p-2 rounded bg-[#171A18] border border-[#3FA972]/30">
            <span className="text-[10px] text-[#3FA972] uppercase block">Savings</span>
            <span className="font-bold text-[#3FA972]">
              {typeof potentialSavings === 'number' ? `$${potentialSavings.toFixed(2)}/mo` : potentialSavings}
            </span>
          </div>
        )}

        {projectedSpend !== undefined && (
          <div className="p-2 rounded bg-[#171A18] border border-[#F3F1EA]/10">
            <span className="text-[10px] text-[#96988F] uppercase block">Projected Spend</span>
            <span className="font-bold text-[#F3F1EA]">
              {typeof projectedSpend === 'number' ? `$${projectedSpend.toFixed(2)}/mo` : projectedSpend}
            </span>
          </div>
        )}

        {unusedCount !== undefined && (
          <div className="p-2 rounded bg-[#171A18] border border-[#D97706]/30">
            <span className="text-[10px] text-[#D97706] uppercase block">Unused Seats</span>
            <span className="font-bold text-[#D97706]">
              {unusedCount} Services
            </span>
          </div>
        )}
      </div>
    </div>
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
    <div className={`flex items-start gap-3 my-3 w-full ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="shrink-0 mt-0.5">
        {isUser ? (
          <div className="w-8 h-8 rounded bg-[#0D0F0E] border border-[#F3F1EA]/10 flex items-center justify-center text-[#F3F1EA]">
            <HiOutlineUser className="w-4 h-4" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded bg-[#C2A155] flex items-center justify-center text-[#0D0F0E] font-bold">
            <HiOutlineSparkles className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`flex items-center gap-2 mb-1 text-[10px] font-mono text-[#96988F] px-1 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="font-bold text-[#F3F1EA]">{isUser ? 'You' : 'SubSense AI'}</span>
          <span>•</span>
          <span>{timestamp}</span>
        </div>

        <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
          isUser
            ? 'bg-[#0D0F0E] border-[#C2A155]/40 text-[#F3F1EA]'
            : 'bg-[#171A18] border-[#F3F1EA]/10 text-[#F3F1EA]'
        }`}>
          {isUser ? (
            <p className="whitespace-pre-wrap font-sans">{textContent}</p>
          ) : (
            <FormattedMessageText text={textContent} />
          )}

          {!isUser && metrics && <FinancialMetricsCard metrics={metrics} />}

          {!isUser && actions && actions.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[#F3F1EA]/10 flex flex-wrap gap-2 font-mono">
              {actions.map((action, idx) => {
                const label = typeof action === 'string' ? action : action.label || action.text;
                const actionId = typeof action === 'string' ? action : action.id || label;
                const isLoading = loadingActionId === actionId;

                return (
                  <button
                    key={actionId || idx}
                    onClick={() => handleAction(action)}
                    disabled={isLoading}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold bg-[#C2A155] text-[#0D0F0E] hover:bg-[#D4B468] transition-colors"
                  >
                    <span>{label}</span>
                    <HiOutlineArrowRight className="w-3 h-3" />
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-2 pt-2 flex items-center justify-between border-t border-[#F3F1EA]/10 text-[10px] font-mono text-[#96988F]">
            {!isUser && (
              <div className="flex items-center gap-1">
                <button onClick={() => handleFeedback('up')} className="p-1 hover:text-[#C2A155]">
                  <HiOutlineThumbUp className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleFeedback('down')} className="p-1 hover:text-[#D65C4F]">
                  <HiOutlineThumbDown className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button onClick={handleCopy} className="p-1 hover:text-[#F3F1EA] ml-auto">
              {copied ? 'Copied' : <HiOutlineClipboard className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

MessageBubble.propTypes = {
  message: PropTypes.object,
  onActionClick: PropTypes.func,
  onFeedback: PropTypes.func,
  onCopy: PropTypes.func
};

export default MessageBubble;
