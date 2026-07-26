import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  HiOutlineSparkles,
  HiOutlineSearch,
  HiOutlineChatAlt2,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineChip,
  HiOutlineShieldCheck,
} from 'react-icons/hi';
import { mockChatData } from '../../data/mockChatData';

/**
 * ChatSidebar — Conversation History Sidebar for SubSense AI Financial Copilot.
 * Includes: New Chat button with sparkles icon, search history filter, grouped threads,
 * active state highlight, rename/delete hover controls, and Pro tier model status.
 */
const ChatSidebar = ({
  conversations = mockChatData.conversations,
  activeConversationId = 'conv-1',
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  onRenameConversation,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  // Filter conversations by search query
  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group conversations by date category
  const groups = ['Today', 'Yesterday', 'Previous 7 Days', 'Previous 30 Days'];
  const groupedConversations = groups.reduce((acc, group) => {
    acc[group] = filteredConversations.filter((c) => c.date === group);
    return acc;
  }, {});

  // Add any uncategorized filtered conversations under 'Older'
  const categorizedIds = new Set(
    Object.values(groupedConversations).flatMap((items) => items.map((i) => i.id))
  );
  const uncategorized = filteredConversations.filter((c) => !categorizedIds.has(c.id));
  if (uncategorized.length > 0) {
    groupedConversations['Older'] = uncategorized;
  }

  const handleStartRename = (e, conv) => {
    e.stopPropagation();
    setEditingId(conv.id);
    setEditTitle(conv.title);
  };

  const handleSaveRename = (e, id) => {
    e.stopPropagation();
    if (editTitle.trim() && onRenameConversation) {
      onRenameConversation(id, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle('');
  };

  const handleCancelRename = (e) => {
    e.stopPropagation();
    setEditingId(null);
    setEditTitle('');
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (onDeleteConversation) {
      onDeleteConversation(id);
    }
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between p-4 bg-surface/50">
      {/* Top Header & Actions */}
      <div className="space-y-4">
        {/* New Chat Primary Button */}
        <button
          onClick={() => {
            if (onNewChat) onNewChat();
            if (onCloseMobile) onCloseMobile();
          }}
          type="button"
          className="gradient-primary flex w-full items-center justify-center gap-2.5 rounded-xl py-3 px-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:opacity-95 hover:shadow-primary/40 active:scale-[0.98]"
        >
          <HiOutlineSparkles className="h-5 w-5" />
          <span>New Chat</span>
        </button>

        {/* Search History Input */}
        <div className="relative">
          <HiOutlineSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search history..."
            className="w-full rounded-xl border border-border bg-surface/80 py-2 pl-9 pr-8 text-xs text-text-primary placeholder-text-muted outline-none transition-all focus:border-primary focus:bg-surface focus:ring-1 focus:ring-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
            >
              <HiOutlineX className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Grouped History List */}
        <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
          {Object.entries(groupedConversations).map(([groupName, items]) => {
            if (items.length === 0) return null;

            return (
              <div key={groupName} className="space-y-1">
                <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  {groupName}
                </p>
                {items.map((conv) => {
                  const isActive = conv.id === activeConversationId;
                  const isEditing = editingId === conv.id;

                  return (
                    <div
                      key={conv.id}
                      onClick={() => {
                        if (!isEditing && onSelectConversation) {
                          onSelectConversation(conv.id);
                          if (onCloseMobile) onCloseMobile();
                        }
                      }}
                      className={`group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium cursor-pointer transition-all duration-150 ${
                        isActive
                          ? 'bg-primary/15 text-primary border-l-4 border-primary font-semibold shadow-sm'
                          : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-2">
                        <HiOutlineChatAlt2
                          className={`h-4 w-4 flex-shrink-0 ${
                            isActive ? 'text-primary' : 'text-text-muted group-hover:text-text-primary'
                          }`}
                        />
                        {isEditing ? (
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveRename(e, conv.id);
                              if (e.key === 'Escape') handleCancelRename(e);
                            }}
                            autoFocus
                            className="w-full rounded bg-surface border border-primary px-1.5 py-0.5 text-xs text-text-primary focus:outline-none"
                          />
                        ) : (
                          <span className="truncate">{conv.title}</span>
                        )}
                      </div>

                      {/* Inline Controls (Rename/Delete) or Timestamp */}
                      <div className="flex items-center gap-1">
                        {isEditing ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => handleSaveRename(e, conv.id)}
                              className="rounded p-1 text-success hover:bg-success/20"
                              title="Save"
                            >
                              <HiOutlineCheck className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={handleCancelRename}
                              className="rounded p-1 text-text-muted hover:bg-surface-light"
                              title="Cancel"
                            >
                              <HiOutlineX className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                            <button
                              onClick={(e) => handleStartRename(e, conv)}
                              className="rounded p-1 text-text-muted hover:text-primary hover:bg-primary/10"
                              title="Rename conversation"
                            >
                              <HiOutlinePencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={(e) => handleDelete(e, conv.id)}
                              className="rounded p-1 text-text-muted hover:text-danger hover:bg-danger/10"
                              title="Delete conversation"
                            >
                              <HiOutlineTrash className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {filteredConversations.length === 0 && (
            <div className="py-6 text-center text-xs text-text-muted">
              No conversations found
            </div>
          )}
        </div>
      </div>

      {/* Bottom Pro User Tier Badge & Model Status */}
      <div className="space-y-2 pt-4 border-t border-border">
        <div className="rounded-xl border border-border/80 bg-surface/80 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <HiOutlineShieldCheck className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-bold text-text-primary">Pro Tier</p>
                <p className="text-[10px] text-text-muted">Unlimited Financial AI</p>
              </div>
            </div>
            <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success border border-success/30">
              Active
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 text-[10px] text-text-muted border-t border-border/50">
            <span className="flex items-center gap-1">
              <HiOutlineChip className="h-3 w-3 text-primary" /> Model
            </span>
            <span className="font-mono text-text-secondary">SubSense-v4-Turbo</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <aside className="relative z-10 w-72 max-w-[85vw] bg-background text-text-primary shadow-2xl border-r border-border h-full flex flex-col">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-border h-[calc(100vh-4rem)] bg-surface/30">
        {sidebarContent}
      </aside>
    </>
  );
};

ChatSidebar.propTypes = {
  conversations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string,
      messagesCount: PropTypes.number,
      lastUpdated: PropTypes.string,
    })
  ),
  activeConversationId: PropTypes.string,
  onSelectConversation: PropTypes.func,
  onNewChat: PropTypes.func,
  onDeleteConversation: PropTypes.func,
  onRenameConversation: PropTypes.func,
  isMobileOpen: PropTypes.bool,
  onCloseMobile: PropTypes.func,
};

export default ChatSidebar;
