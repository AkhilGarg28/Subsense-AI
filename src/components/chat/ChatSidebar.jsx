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

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groups = ['Today', 'Yesterday', 'Previous 7 Days', 'Previous 30 Days'];
  const groupedConversations = groups.reduce((acc, group) => {
    acc[group] = filteredConversations.filter((c) => c.date === group);
    return acc;
  }, {});

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
    <div className="flex h-full flex-col justify-between p-4 bg-[#121A2F]/90 font-mono text-xs">
      {/* Top Header & Search & History */}
      <div className="flex flex-col flex-1 min-h-0 space-y-4">
        {/* New Chat Primary Button */}
        <button
          onClick={() => {
            if (onNewChat) onNewChat();
            if (onCloseMobile) onCloseMobile();
          }}
          type="button"
          className="gradient-primary flex w-full items-center justify-center gap-2.5 rounded-xl py-3 px-4 text-xs font-bold text-white shadow-glow-blue transition-all cursor-pointer hover:opacity-95 active:scale-[0.98]"
        >
          <HiOutlineSparkles className="h-4.5 w-4.5" />
          <span>New Chat</span>
        </button>

        {/* Search History Input */}
        <div className="relative">
          <HiOutlineSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A1A8B5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search history..."
            className="w-full rounded-xl border border-white/10 bg-[#171F2F] py-2 pl-9 pr-8 text-xs text-white placeholder-[#A1A8B5] outline-none transition-all focus:border-[#5B8CFF]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A1A8B5] hover:text-white"
            >
              <HiOutlineX className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Grouped History Scrollable List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {Object.entries(groupedConversations).map(([groupName, items]) => {
            if (items.length === 0) return null;

            return (
              <div key={groupName} className="space-y-1">
                <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-[#A1A8B5]">
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
                      className={`group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold cursor-pointer transition-all duration-150 ${
                        isActive
                          ? 'bg-[#5B8CFF]/15 text-[#5B8CFF] border-l-4 border-[#5B8CFF] shadow-sm'
                          : 'text-[#A1A8B5] hover:bg-[#171F2F] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-2">
                        <HiOutlineChatAlt2
                          className={`h-4 w-4 flex-shrink-0 ${
                            isActive ? 'text-[#5B8CFF]' : 'text-[#A1A8B5] group-hover:text-white'
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
                            className="w-full rounded bg-[#171F2F] border border-[#5B8CFF] px-1.5 py-0.5 text-xs text-white focus:outline-none"
                          />
                        ) : (
                          <span className="truncate font-sans font-medium">{conv.title}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        {isEditing ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => handleSaveRename(e, conv.id)}
                              className="rounded p-1 text-[#22C55E] hover:bg-[#22C55E]/20"
                              title="Save"
                            >
                              <HiOutlineCheck className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={handleCancelRename}
                              className="rounded p-1 text-[#A1A8B5] hover:bg-white/5"
                              title="Cancel"
                            >
                              <HiOutlineX className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                            <button
                              onClick={(e) => handleStartRename(e, conv)}
                              className="rounded p-1 text-[#A1A8B5] hover:text-[#5B8CFF] hover:bg-[#5B8CFF]/10"
                              title="Rename conversation"
                            >
                              <HiOutlinePencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={(e) => handleDelete(e, conv.id)}
                              className="rounded p-1 text-[#A1A8B5] hover:text-[#EF4444] hover:bg-[#EF4444]/10"
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
            <div className="py-6 text-center text-xs text-[#A1A8B5]">
              No conversations found
            </div>
          )}
        </div>
      </div>

      {/* Bottom Pinned Pro Tier Card */}
      <div className="shrink-0 pt-4 border-t border-white/10 space-y-2">
        <div className="rounded-xl border border-white/10 bg-[#171F2F] p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#5B8CFF]/20 text-[#5B8CFF]">
                <HiOutlineShieldCheck className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-bold text-white">Pro Tier</p>
                <p className="text-[10px] text-[#A1A8B5]">Unlimited Copilot</p>
              </div>
            </div>
            <span className="rounded-full bg-[#22C55E]/15 px-2 py-0.5 text-[10px] font-bold text-[#22C55E] border border-[#22C55E]/30">
              Active
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 text-[10px] text-[#A1A8B5] border-t border-white/10">
            <span className="flex items-center gap-1">
              <HiOutlineChip className="h-3 w-3 text-[#5B8CFF]" /> Model
            </span>
            <span className="font-mono text-white">SubSense-v4-Turbo</span>
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
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={onCloseMobile}
          />
          <aside className="relative z-10 w-72 max-w-[85vw] bg-[#121A2F] text-white shadow-2xl border-r border-white/10 h-full flex flex-col">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-80 shrink-0 flex-col border-r border-white/10 h-full bg-[#121A2F]/90">
        {sidebarContent}
      </aside>
    </>
  );
};

ChatSidebar.propTypes = {
  conversations: PropTypes.array,
  activeConversationId: PropTypes.string,
  onSelectConversation: PropTypes.func,
  onNewChat: PropTypes.func,
  onDeleteConversation: PropTypes.func,
  onRenameConversation: PropTypes.func,
  isMobileOpen: PropTypes.bool,
  onCloseMobile: PropTypes.func,
};

export default ChatSidebar;
