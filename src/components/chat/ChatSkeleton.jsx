import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/helpers';

/**
 * Base Shimmer Skeleton Element with pulse animation and gradient sheen
 */
const Skeleton = ({ className = '', ...props }) => (
  <div
    className={cn(
      'animate-pulse rounded-xl bg-slate-800/80 bg-gradient-to-r from-slate-800/80 via-slate-700/50 to-slate-800/80 bg-[length:200%_100%]',
      className
    )}
    {...props}
  />
);

Skeleton.propTypes = {
  className: PropTypes.string,
};

/**
 * Chat Header Bar Skeleton Placeholder
 */
export const ChatHeaderSkeleton = ({ className = '' }) => (
  <div
    className={cn(
      'flex items-center justify-between border-b border-border bg-surface/80 px-4 py-3 sm:px-6 backdrop-blur-xl animate-pulse',
      className
    )}
  >
    {/* Left: Avatar + Title & Status */}
    <div className="flex items-center gap-3">
      <Skeleton className="h-9 w-9 rounded-xl lg:hidden" />
      <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-36 sm:w-44" />
          <Skeleton className="h-5 w-16 rounded-full hidden sm:block" />
        </div>
        <Skeleton className="h-3 w-28 sm:w-36" />
      </div>
    </div>

    {/* Right: New Chat + Menu Dots */}
    <div className="flex items-center gap-2 sm:gap-3">
      <Skeleton className="h-9 w-9 sm:w-28 rounded-xl" />
      <Skeleton className="h-9 w-9 rounded-xl" />
    </div>
  </div>
);

ChatHeaderSkeleton.propTypes = {
  className: PropTypes.string,
};

/**
 * Conversation History Sidebar Skeleton Placeholder
 */
export const SidebarHistorySkeleton = ({ className = '' }) => (
  <div className={cn('flex h-full flex-col justify-between p-4 space-y-4 bg-surface/40 animate-pulse', className)}>
    <div className="space-y-4">
      {/* New Chat Primary Button */}
      <Skeleton className="h-11 w-full rounded-xl" />

      {/* Search Input */}
      <Skeleton className="h-9 w-full rounded-xl" />

      {/* History Items Grouped */}
      <div className="space-y-4 pt-2">
        {/* Today Group */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-16 rounded ml-1" />
          <Skeleton className="h-9 w-full rounded-xl" />
          <Skeleton className="h-9 w-full rounded-xl" />
        </div>

        {/* Yesterday Group */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-20 rounded ml-1" />
          <Skeleton className="h-9 w-full rounded-xl" />
          <Skeleton className="h-9 w-full rounded-xl" />
        </div>

        {/* Previous 7 Days Group */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-28 rounded ml-1" />
          <Skeleton className="h-9 w-full rounded-xl" />
        </div>
      </div>
    </div>

    {/* Bottom Pro Tier Badge */}
    <div className="pt-3 border-t border-border">
      <Skeleton className="h-16 w-full rounded-xl" />
    </div>
  </div>
);

SidebarHistorySkeleton.propTypes = {
  className: PropTypes.string,
};

/**
 * Message Bubble Thread Skeleton Placeholder
 */
export const MessageBubbleSkeleton = ({ count = 2 }) => (
  <div className="space-y-6 w-full py-4 px-2 sm:px-4 animate-pulse">
    {Array.from({ length: count }).map((_, idx) => (
      <React.Fragment key={idx}>
        {/* User Message Skeleton (Right Aligned) */}
        <div className="flex flex-row-reverse items-start gap-3 w-full">
          <Skeleton className="h-9 w-9 rounded-full shrink-0" />
          <div className="flex flex-col items-end space-y-1.5 max-w-[80%] sm:max-w-[65%]">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-16 w-full rounded-2xl rounded-tr-xs" />
          </div>
        </div>

        {/* AI Assistant Message Skeleton (Left Aligned) */}
        <div className="flex flex-row items-start gap-3 w-full">
          <Skeleton className="h-9 w-9 rounded-xl shrink-0" />
          <div className="flex flex-col items-start space-y-2 max-w-[85%] sm:max-w-[75%] w-full">
            <Skeleton className="h-3 w-24 rounded" />
            
            {/* Text lines */}
            <div className="w-full rounded-2xl rounded-tl-xs p-4 border border-slate-800/80 bg-slate-900/60 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />

              {/* Embedded Metrics Summary Card Skeleton */}
              <div className="mt-4 p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-16 rounded-full" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <Skeleton className="h-14 w-full rounded-lg" />
                  <Skeleton className="h-14 w-full rounded-lg" />
                  <Skeleton className="h-14 w-full rounded-lg" />
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/60">
                <Skeleton className="h-8 w-36 rounded-lg" />
                <Skeleton className="h-8 w-44 rounded-lg" />
                <Skeleton className="h-8 w-32 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    ))}
  </div>
);

MessageBubbleSkeleton.propTypes = {
  count: PropTypes.number,
};

/**
 * Prompt Suggestions Grid Skeleton Placeholder
 */
export const PromptCardsSkeleton = ({ count = 6 }) => (
  <div className="w-full max-w-4xl mx-auto py-6 space-y-4 animate-pulse">
    {/* Heading Shimmer */}
    <div className="flex justify-center items-center gap-2 mb-4">
      <Skeleton className="h-5 w-48 rounded-lg" />
    </div>

    {/* Grid of Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col justify-between p-4 rounded-xl border border-border/80 bg-surface/70 space-y-3"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-7 w-7 rounded-lg" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="pt-2 border-t border-border/40 flex justify-end">
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

PromptCardsSkeleton.propTypes = {
  count: PropTypes.number,
};

/**
 * Chat Input Bar Skeleton Placeholder
 */
export const ChatInputSkeleton = ({ className = '' }) => (
  <div className={cn('w-full rounded-2xl border border-border bg-surface/90 p-4 space-y-3 animate-pulse', className)}>
    <Skeleton className="h-10 w-full rounded-xl" />
    <div className="flex items-center justify-between pt-2 border-t border-border/40">
      <div className="flex gap-2">
        <Skeleton className="h-8 w-8 rounded-xl" />
        <Skeleton className="h-8 w-8 rounded-xl" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-3 w-16 hidden sm:block" />
        <Skeleton className="h-9 w-20 rounded-xl" />
      </div>
    </div>
  </div>
);

ChatInputSkeleton.propTypes = {
  className: PropTypes.string,
};

/**
 * Quick Actions Bar Skeleton Placeholder
 */
export const ChatQuickActionsSkeleton = ({ count = 4 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full animate-pulse">
    {Array.from({ length: count }).map((_, idx) => (
      <div
        key={idx}
        className="flex flex-col justify-between p-4 rounded-xl border border-border bg-surface/70 space-y-2"
      >
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-36" />
      </div>
    ))}
  </div>
);

ChatQuickActionsSkeleton.propTypes = {
  count: PropTypes.number,
};

/**
 * ChatSkeleton — Full Page Shimmer Loader for SubSense AI Financial Assistant.
 * Renders shimmering placeholders for sidebar, chat header, conversation bubbles,
 * prompt suggestions, quick actions, and input control bar.
 */
const ChatSkeleton = ({ viewMode = 'full', showSidebar = true, className = '' }) => {
  return (
    <div className={cn('flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-background animate-fade-in', className)}>
      {/* Left History Sidebar (Desktop) */}
      {showSidebar && (
        <aside className="hidden lg:flex w-72 flex-col border-r border-border h-full shrink-0">
          <SidebarHistorySkeleton />
        </aside>
      )}

      {/* Main Chat Interface */}
      <div className="flex flex-1 flex-col h-full min-w-0 overflow-hidden">
        {/* Header Bar */}
        <ChatHeaderSkeleton />

        {/* Main Workspace Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {viewMode === 'empty' ? (
            <PromptCardsSkeleton count={6} />
          ) : (
            <MessageBubbleSkeleton count={2} />
          )}

          {/* Quick Actions Bar */}
          <ChatQuickActionsSkeleton count={4} />
        </div>

        {/* Input Bar Bottom */}
        <div className="p-4 border-t border-border bg-background/80 backdrop-blur-md">
          <ChatInputSkeleton />
        </div>
      </div>
    </div>
  );
};

ChatSkeleton.propTypes = {
  viewMode: PropTypes.oneOf(['full', 'thread', 'empty']),
  showSidebar: PropTypes.bool,
  className: PropTypes.string,
};

export default ChatSkeleton;
