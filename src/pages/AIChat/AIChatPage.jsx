import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineExclamationCircle,
  HiOutlineTrash,
  HiOutlineCreditCard
} from 'react-icons/hi';
import {
  ChatHeader,
  ChatSidebar,
  MessageBubble,
  TypingIndicator,
  ChatInput,
  ChatQuickActions,
  ChatEmptyState,
  ChatSkeleton,
} from '../../components/chat';
import Toast from '../../components/ui/Toast';
import { aiAPI } from '../../services/api';
import { mockChatData } from '../../data/mockChatData';

/**
<<<<<<< HEAD
 * AIChatPage — Autonomous AI Financial Assistant Page.
 * Pure Apple/Stripe/Linear/Notion AI interface with:
 * - 100vh precision viewport layout anchored under top navbar (no clipping/no double scroll)
 * - Independent scrolling history sidebar with pinned bottom tier card
 * - Fixed header, smooth-scrolling message thread, and pinned bottom input area
=======
 * AIChatPage — Complete AI Financial Assistant Page for SubSense AI.
 * Uses real backend Gemini AI via POST /api/ai/chat.
>>>>>>> c70c8b85ac5aed7d2bcfa256981a0e868082a169
 */
const AIChatPage = () => {
  const [conversations, setConversations] = useState(mockChatData.conversations);
  const [activeConversationId, setActiveConversationId] = useState('conv-1');
  const [messagesMap, setMessagesMap] = useState({
    'conv-1': mockChatData.initialMessages,
    'conv-2': [
      {
        id: 'm-2-1',
        sender: 'user',
        text: 'How can I cancel SaaS subscriptions that trick you into auto-renewing?',
        timestamp: 'Yesterday 4:15 PM',
      },
      {
        id: 'm-2-2',
        sender: 'ai',
        text: 'SubSense AI can automatically send legal opt-out notices and virtual card auto-block rules for hidden recurring charges. Here is your audit summary:',
        timestamp: 'Yesterday 4:16 PM',
        metrics: {
          potentialSavings: '$149.00/mo',
          unusedCount: 3,
        },
        actions: [
          { label: 'Auto-Block Virtual Card', id: 'block-card', variant: 'danger' },
          { label: 'Send Opt-out Email', id: 'send-optout', variant: 'primary' },
        ],
      },
    ],
  });

  const [isTyping, setIsTyping] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [toastNotification, setToastNotification] = useState(null);
  const [actionModal, setActionModal] = useState(null);
  const [isLoadingPage] = useState(false);

  const messagesEndRef = useRef(null);

  const activeMessages = messagesMap[activeConversationId] || [];
  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeMessages, isTyping, scrollToBottom]);

  const showToast = (message, type = 'success') => {
    setToastNotification({ message, type });
    setTimeout(() => {
      setToastNotification(null);
    }, 4000);
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleNewChat = () => {
    const newId = `conv-${Date.now()}`;
    const newConv = {
      id: newId,
      title: 'New Financial Audit',
      date: 'Today',
      messagesCount: 0,
      lastUpdated: getCurrentTime(),
    };

    setConversations((prev) => [newConv, ...prev]);
    setMessagesMap((prev) => ({ ...prev, [newId]: [] }));
    setActiveConversationId(newId);
    setIsMobileSidebarOpen(false);
    showToast('Started new financial chat session', 'info');
  };

  const handleSelectConversation = (convId) => {
    setActiveConversationId(convId);
    setIsMobileSidebarOpen(false);
  };

  const handleRenameConversation = (convId, newTitle) => {
    setConversations((prev) =>
      prev.map((conv) => (conv.id === convId ? { ...conv, title: newTitle } : conv))
    );
    showToast('Conversation renamed', 'info');
  };

  const handleDeleteConversation = (convId) => {
    const target = conversations.find((c) => c.id === convId);
    const title = target ? target.title : 'Conversation';

    setConversations((prev) => prev.filter((conv) => conv.id !== convId));
    setMessagesMap((prev) => {
      const nextMap = { ...prev };
      delete nextMap[convId];
      return nextMap;
    });

    if (activeConversationId === convId) {
      const remaining = conversations.filter((c) => c.id !== convId);
      if (remaining.length > 0) {
        setActiveConversationId(remaining[0].id);
      } else {
        handleNewChat();
      }
    }

    showToast(`Deleted "${title}"`, 'warning');
  };

  const handleClearHistory = () => {
    setActionModal({
      isOpen: true,
      title: 'Clear Chat History?',
      description: 'Are you sure you want to clear all messages in this conversation thread? This action cannot be undone.',
      confirmText: 'Clear Messages',
      confirmVariant: 'danger',
      icon: HiOutlineTrash,
      onConfirm: () => {
        setMessagesMap((prev) => ({
          ...prev,
          [activeConversationId]: [],
        }));
        showToast('Chat history cleared', 'info');
      },
    });
  };

  const handleExportChat = () => {
    if (activeMessages.length === 0) {
      showToast('No messages to export', 'warning');
      return;
    }

    const exportData = {
      title: activeConversation?.title || 'SubSense AI Chat',
      exportDate: new Date().toISOString(),
      messages: activeMessages,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `subsense-chat-${activeConversationId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast('Exported chat history transcript JSON', 'success');
  };

<<<<<<< HEAD
  const handleSendMessage = ({ text, attachment }) => {
=======
  /**
   * Send User Message & Call Real Gemini AI via Backend API
   */
  const handleSendMessage = async ({ text, attachment }) => {
>>>>>>> c70c8b85ac5aed7d2bcfa256981a0e868082a169
    if (!text.trim() && !attachment) return;

    const userMsgText = text.trim() + (attachment ? `\n[Attached File: ${attachment.name}]` : '');

    const userMessageObj = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      role: 'user',
      text: userMsgText,
      timestamp: getCurrentTime(),
    };

<<<<<<< HEAD
=======
    // Auto-title new conversation
>>>>>>> c70c8b85ac5aed7d2bcfa256981a0e868082a169
    if (activeMessages.length === 0) {
      const generateTitle = text.slice(0, 35) + (text.length > 35 ? '...' : '');
      setConversations((prev) =>
        prev.map((c) => (c.id === activeConversationId ? { ...c, title: generateTitle } : c))
      );
    }

<<<<<<< HEAD
=======
    // Append User Message immediately
>>>>>>> c70c8b85ac5aed7d2bcfa256981a0e868082a169
    setMessagesMap((prev) => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] || []), userMessageObj],
    }));

<<<<<<< HEAD
=======
    // Show typing indicator
>>>>>>> c70c8b85ac5aed7d2bcfa256981a0e868082a169
    setIsTyping(true);

    try {
      // Call real backend Gemini AI endpoint
      const res = await aiAPI.chatMessage({ question: text.trim() });
      const aiAnswer = res.data?.data?.answer || res.data?.answer || 'I could not process your request at this time.';
      const modelUsed = res.data?.data?.model || 'gemini-1.5-flash';

      const aiResponseObj = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        role: 'assistant',
        timestamp: getCurrentTime(),
        text: aiAnswer,
        model: modelUsed,
        actions: [
          { label: 'Audit All Subscriptions', id: 'audit-all' },
          { label: 'View Spending Breakdown', id: 'view-breakdown' },
        ],
      };

      setMessagesMap((prev) => ({
        ...prev,
        [activeConversationId]: [...(prev[activeConversationId] || []), aiResponseObj],
      }));
    } catch (err) {
      console.error('[AI Chat] API call failed:', err);

      // Fallback: use intelligent local response engine
      const queryLower = text.toLowerCase();
      let fallbackText = '';

      if (queryLower.includes('spend') || queryLower.includes('month') || queryLower.includes('next')) {
        fallbackText = mockChatData.aiKnowledgeBase.spend.text;
      } else if (queryLower.includes('cancel') || queryLower.includes('unused') || queryLower.includes('reduce')) {
        fallbackText = mockChatData.aiKnowledgeBase.cancel.text;
      } else {
        fallbackText = 'SubSense AI is currently unable to reach the server. Please check your connection and try again. In the meantime, you can explore your subscriptions and upload receipts for offline analysis.';
      }

      const fallbackResponse = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        role: 'assistant',
        timestamp: getCurrentTime(),
        text: fallbackText,
        isOffline: true,
      };

      setMessagesMap((prev) => ({
        ...prev,
        [activeConversationId]: [...(prev[activeConversationId] || []), fallbackResponse],
      }));

      showToast('AI is offline — using fallback responses', 'warning');
    } finally {
      setIsTyping(false);
<<<<<<< HEAD
    }, 1400);
=======
    }
>>>>>>> c70c8b85ac5aed7d2bcfa256981a0e868082a169
  };

  const handleSelectPrompt = (promptText) => {
    handleSendMessage({ text: promptText });
  };

  const handleQuickAction = (actionId, actionObj) => {
    if (actionId === 'upload-receipt') {
      handleSendMessage({ text: 'I want to upload a receipt for AI OCR parsing and auto-logging.' });
    } else if (actionId === 'connect-gmail') {
      handleSendMessage({ text: 'Check my connected Gmail inbox for new subscription invoices and price hikes.' });
    } else if (actionId === 'go-dashboard') {
      handleSendMessage({ text: 'Summarize my complete financial health score and active monthly commitments.' });
    } else if (actionId === 'view-subscriptions') {
      handleSendMessage({ text: 'List all active recurring subscriptions sorted by monthly price.' });
    } else if (actionObj?.prompt) {
      handleSendMessage({ text: actionObj.prompt });
    }
  };

  const handleActionClick = (action, _messageObj) => {
    const actionLabel = typeof action === 'string' ? action : action.label || action.id;
    const actionId = typeof action === 'string' ? action : action.id;

    if (actionId === 'cancel-canva' || actionLabel.includes('Cancel Canva')) {
      setActionModal({
        isOpen: true,
        title: 'Confirm 1-Click Cancellation',
        description: 'SubSense AI will issue an automated cancellation request for your Canva Pro seat ($79.99/mo). Save $960.00 per year.',
        confirmText: 'Execute Cancellation',
        confirmVariant: 'danger',
        icon: HiOutlineCreditCard,
        onConfirm: () => {
          showToast('Canva Pro subscription cancelled! Saved $79.99/mo.', 'success');

          const confirmMsg = {
            id: `msg-${Date.now()}`,
            sender: 'ai',
            role: 'assistant',
            text: '### Canva Pro Seat Cancelled Successfully\n\nSubSense AI agent has verified the cancellation receipt. Your recurring ledger has been updated.\n\n* **Monthly Savings Added:** $79.99/mo (₹6,640/mo)\n* **Annual Impact:** $959.88 saved',
            timestamp: getCurrentTime(),
            metrics: {
              potentialSavings: '$0.00 (Captured!)',
              projectedSpend: '$238.51/mo',
            },
          };

          setMessagesMap((prev) => ({
            ...prev,
            [activeConversationId]: [...(prev[activeConversationId] || []), confirmMsg],
          }));
        },
      });
    } else if (actionId === 'switch-spotify' || actionLabel.includes('Switch Spotify')) {
      showToast('Switched Spotify to Annual plan! Saved $44.88/year.', 'success');

      const confirmMsg = {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        role: 'assistant',
        text: '### Spotify Plan Updated to Annual Billing\n\nYour plan is now locked in at $99.00/yr instead of $143.88/yr.',
        timestamp: getCurrentTime(),
      };

      setMessagesMap((prev) => ({
        ...prev,
        [activeConversationId]: [...(prev[activeConversationId] || []), confirmMsg],
      }));
    } else {
      showToast(`Triggered AI action: ${actionLabel}`, 'info');
    }
  };

  if (isLoadingPage) {
    return <ChatSkeleton viewMode="full" />;
  }

  return (
    <div className="flex h-[calc(100vh-128px)] min-h-[580px] w-full flex-col lg:flex-row bg-[#171F2F]/90 border border-white/10 rounded-[20px] shadow-2xl overflow-hidden relative">
      {/* Toast Notification Container */}
      <AnimatePresence>
        {toastNotification && (
          <div className="fixed top-6 right-6 z-50 pointer-events-auto">
            <Toast
              message={toastNotification.message}
              type={toastNotification.type}
              onClose={() => setToastNotification(null)}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Action Modal */}
      <AnimatePresence>
        {actionModal?.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActionModal(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative z-10 w-full max-w-md rounded-[20px] border border-white/10 bg-[#171F2F] p-6 shadow-2xl backdrop-blur-xl font-mono text-xs"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
                    actionModal.confirmVariant === 'danger'
                      ? 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/30'
                      : 'bg-[#5B8CFF]/20 text-[#5B8CFF] border-[#5B8CFF]/30'
                  }`}
                >
                  {actionModal.icon ? (
                    <actionModal.icon className="h-6 w-6" />
                  ) : (
                    <HiOutlineExclamationCircle className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{actionModal.title}</h3>
                  <p className="text-[10px] text-[#A1A8B5]">SubSense AI Action</p>
                </div>
              </div>

              <p className="text-xs text-[#A1A8B5] leading-relaxed mb-6 font-sans">
                {actionModal.description}
              </p>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setActionModal(null)}
                  className="rounded-xl border border-white/10 bg-[#121A2F] px-4 py-2 font-bold text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (actionModal.onConfirm) actionModal.onConfirm();
                    setActionModal(null);
                  }}
                  className={`rounded-xl px-4 py-2 font-bold text-white shadow-lg transition-all cursor-pointer ${
                    actionModal.confirmVariant === 'danger'
                      ? 'bg-[#EF4444] hover:bg-[#EF4444]/90'
                      : 'gradient-primary shadow-glow-blue'
                  }`}
                >
                  {actionModal.confirmText || 'Confirm'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Left Sidebar History Component */}
      <ChatSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Chat Interface Window */}
      <div className="flex flex-1 flex-col h-full min-w-0 bg-[#0B1020] overflow-hidden relative">
        {/* Pinned Top Header Bar */}
        <ChatHeader
          onNewChat={handleNewChat}
          onClearHistory={handleClearHistory}
          onExportChat={handleExportChat}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
          title={activeConversation?.title || 'SubSense AI Copilot'}
          status="Online • Gemini 1.5 Flash"
        />

        {/* Scrollable Messages Thread Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeMessages.length === 0 ? (
            <div className="flex min-h-full items-center justify-center py-6">
              <ChatEmptyState onSelectPrompt={handleSelectPrompt} />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {activeMessages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  onActionClick={handleActionClick}
                  onFeedback={(_msgId, feedbackType) => {
                    showToast(
                      feedbackType ? `Thank you for your feedback!` : 'Feedback removed',
                      'info'
                    );
                  }}
                  onCopy={() => showToast('Copied message to clipboard', 'info')}
                />
              ))}

              <AnimatePresence>
                {isTyping && <TypingIndicator key="typing-indicator" />}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Pinned Bottom Input Area & Quick Actions */}
        <div className="shrink-0 border-t border-white/10 bg-[#171F2F]/90 backdrop-blur-xl p-4 space-y-3 z-20">
          <div className="max-w-4xl mx-auto space-y-3">
            <ChatQuickActions onActionClick={handleQuickAction} />
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isTyping}
              placeholder="Ask SubSense AI about subscriptions, bills, savings, or receipts..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatPage;
