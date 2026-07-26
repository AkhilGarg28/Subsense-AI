import { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlinePaperAirplane,
  HiOutlinePaperClip,
  HiOutlineMicrophone,
  HiOutlineX,
  HiOutlineDocumentText,
  HiOutlineStop
} from 'react-icons/hi';

/**
 * ChatInput — Interactive Chat Input Box for SubSense AI.
 * Includes auto-resizing textarea, voice input simulation, file attachments,
 * character counter, keyboard shortcut badge, and gradient glow send button.
 */
const ChatInput = ({
  onSendMessage,
  disabled = false,
  placeholder = 'Ask SubSense AI anything about your subscriptions, bills, or cashflow...',
  maxLength = 1000,
  className = ''
}) => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [attachedFile, setAttachedFile] = useState(null);
  const [fileError, setFileError] = useState('');

  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const recordingTimerRef = useRef(null);

  // Auto-resize textarea height based on content
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 180);
    textarea.style.height = `${newHeight}px`;
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [text, adjustTextareaHeight]);

  // Voice recording timer effect
  useEffect(() => {
    if (isListening) {
      setRecordingSeconds(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    }

    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isListening]);

  // Handle voice simulation toggle
  const toggleVoiceInput = () => {
    if (disabled) return;

    if (isListening) {
      // Stop listening and insert simulated voice query
      setIsListening(false);
      if (!text.trim()) {
        const sampleQueries = [
          'What is my total monthly subscription spending?',
          'Do I have any recurring bills due this week?',
          'Analyze my recent Netflix & Spotify charges',
          'How much money can I save by optimizing active plans?'
        ];
        const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
        setText(randomQuery);
      }
    } else {
      setIsListening(true);
    }
  };

  // Format recording seconds into mm:ss
  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setFileError('File size exceeds 10MB limit');
      setTimeout(() => setFileError(''), 3000);
      return;
    }

    setAttachedFile(file);
    setFileError('');
    // Reset file input value so re-selecting same file triggers onChange
    e.target.value = '';
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
  };

  // Handle form submission
  const handleSend = () => {
    if (disabled) return;
    const trimmed = text.trim();
    if (!trimmed && !attachedFile) return;

    if (onSendMessage) {
      onSendMessage({
        text: trimmed,
        attachment: attachedFile
      });
    }

    setText('');
    setAttachedFile(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  // Handle key press (Enter sends, Shift+Enter new line)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const charCount = text.length;
  const isNearLimit = charCount > maxLength * 0.85;
  const canSend = (text.trim().length > 0 || attachedFile !== null) && !disabled;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,.pdf,.doc,.docx,.csv"
        className="hidden"
      />

      {/* Main Container */}
      <div className="group relative rounded-2xl border border-border bg-surface/90 backdrop-blur-xl shadow-xl transition-all duration-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        
        {/* Active Voice Input Overlay / Banner */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-b border-primary/20 bg-primary/10 px-4 py-2.5 rounded-t-2xl flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="text-xs font-semibold text-text-primary tracking-wide flex items-center gap-1.5">
                  <HiOutlineMicrophone className="h-4 w-4 text-red-400 animate-pulse" />
                  Listening... ({formatTime(recordingSeconds)})
                </span>
                <span className="text-xs text-text-secondary hidden sm:inline">
                  Speak clearly into your microphone
                </span>
              </div>
              <button
                type="button"
                onClick={toggleVoiceInput}
                className="flex items-center gap-1 text-xs font-medium text-red-400 hover:text-red-300 transition-colors bg-red-500/10 px-2.5 py-1 rounded-lg border border-red-500/20"
              >
                <HiOutlineStop className="h-3.5 w-3.5" />
                Done
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Attached File Preview Pill */}
        <AnimatePresence>
          {attachedFile && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="p-3 border-b border-border/60 flex items-center justify-between bg-surface-light/30 rounded-t-2xl"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="p-1.5 rounded-lg bg-primary/20 text-primary">
                  <HiOutlineDocumentText className="h-4 w-4" />
                </div>
                <div className="truncate text-xs">
                  <p className="font-medium text-text-primary truncate max-w-[200px] sm:max-w-[320px]">
                    {attachedFile.name}
                  </p>
                  <p className="text-[10px] text-text-muted">
                    {(attachedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="p-1 text-text-muted hover:text-text-primary hover:bg-surface-light rounded-lg transition-colors"
                title="Remove attachment"
              >
                <HiOutlineX className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* File Error Notification */}
        {fileError && (
          <div className="px-4 py-1.5 bg-danger/10 text-danger text-xs font-medium border-b border-danger/20">
            {fileError}
          </div>
        )}

        {/* Text Input Area */}
        <div className="p-3 sm:p-4 pb-2">
          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                setText(e.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full resize-none bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none min-h-[44px] max-h-[180px] leading-relaxed transition-all"
          />
        </div>

        {/* Footer Actions & Shortcut Row */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-t border-border/40 bg-surface/40 rounded-b-2xl">
          {/* Left Action Buttons */}
          <div className="flex items-center gap-1.5">
            {/* Attach Document Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              title="Attach receipt or document"
              className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200 disabled:opacity-50 group/btn"
            >
              <HiOutlinePaperClip className="h-5 w-5 transition-transform group-hover/btn:rotate-45" />
            </button>

            {/* Simulated Voice Button */}
            <button
              type="button"
              onClick={toggleVoiceInput}
              disabled={disabled}
              title={isListening ? 'Stop listening' : 'Voice search simulation'}
              className={`p-2 rounded-xl transition-all duration-200 ${
                isListening
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse'
                  : 'text-text-secondary hover:text-secondary hover:bg-secondary/10'
              } disabled:opacity-50`}
            >
              <HiOutlineMicrophone className="h-5 w-5" />
            </button>

            {/* Keyboard Shortcut Helper Badge */}
            <div className="hidden md:flex items-center gap-1.5 text-[11px] text-text-muted ml-2 pl-2 border-l border-border/60">
              <span className="px-1.5 py-0.5 rounded bg-surface-light border border-border text-text-secondary font-mono text-[10px]">
                Enter ↵
              </span>
              <span>to send</span>
              <span className="text-text-muted/60">•</span>
              <span className="px-1.5 py-0.5 rounded bg-surface-light border border-border text-text-secondary font-mono text-[10px]">
                Shift + ↵
              </span>
              <span>new line</span>
            </div>
          </div>

          {/* Right Action Controls: Character Count & Send Button */}
          <div className="flex items-center gap-3">
            {/* Character Counter */}
            <span
              className={`text-[11px] font-mono transition-colors ${
                isNearLimit ? 'text-warning font-semibold' : 'text-text-muted'
              }`}
            >
              {charCount} / {maxLength}
            </span>

            {/* Send Button with Gradient Glow */}
            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              title="Send Message"
              className={`relative flex items-center justify-center p-2.5 sm:px-4 sm:py-2.5 rounded-xl font-medium text-white transition-all duration-300 ${
                canSend
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0'
                  : 'bg-surface-light text-text-muted cursor-not-allowed opacity-50'
              }`}
            >
              {/* Subtle spark glow background effect */}
              {canSend && (
                <span className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 blur-sm group-hover:opacity-60 transition duration-300"></span>
              )}
              <span className="relative flex items-center gap-1.5 text-xs font-semibold tracking-wide">
                <span className="hidden sm:inline">Send</span>
                <HiOutlinePaperAirplane className="h-4 w-4 rotate-90 transform transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ChatInput.propTypes = {
  onSendMessage: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  className: PropTypes.string
};

export default ChatInput;
