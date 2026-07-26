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

  const toggleVoiceInput = () => {
    if (disabled) return;

    if (isListening) {
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

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setFileError('File size exceeds 10MB limit');
      setTimeout(() => setFileError(''), 3000);
      return;
    }

    setAttachedFile(file);
    setFileError('');
    e.target.value = '';
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
  };

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
    <div className={`relative w-full font-mono text-xs ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,.pdf,.doc,.docx,.csv"
        className="hidden"
      />

      <div className="group relative rounded-[14px] border border-white/10 bg-[#121A2F] shadow-2xl transition-all duration-300 focus-within:border-[#5B8CFF] focus-within:ring-1 focus-within:ring-[#5B8CFF]">
        {/* Active Voice Overlay */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-b border-[#EF4444]/30 bg-[#EF4444]/10 px-4 py-2 rounded-t-[14px] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#EF4444]"></span>
                </span>
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <HiOutlineMicrophone className="h-4 w-4 text-[#EF4444] animate-pulse" />
                  Listening... ({formatTime(recordingSeconds)})
                </span>
              </div>
              <button
                type="button"
                onClick={toggleVoiceInput}
                className="flex items-center gap-1 text-xs font-bold text-[#EF4444] bg-[#EF4444]/20 px-2.5 py-1 rounded-lg border border-[#EF4444]/30 cursor-pointer"
              >
                <HiOutlineStop className="h-3.5 w-3.5" />
                Done
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Attached File Preview */}
        <AnimatePresence>
          {attachedFile && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="p-3 border-b border-white/10 flex items-center justify-between bg-[#171F2F] rounded-t-[14px]"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="p-1.5 rounded-lg bg-[#5B8CFF]/20 text-[#5B8CFF]">
                  <HiOutlineDocumentText className="h-4 w-4" />
                </div>
                <div className="truncate text-xs">
                  <p className="font-bold text-white truncate max-w-[200px] sm:max-w-[320px]">
                    {attachedFile.name}
                  </p>
                  <p className="text-[10px] text-[#A1A8B5]">
                    {(attachedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="p-1 text-[#A1A8B5] hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                title="Remove attachment"
              >
                <HiOutlineX className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {fileError && (
          <div className="px-4 py-1.5 bg-[#EF4444]/15 text-[#EF4444] text-xs font-bold border-b border-[#EF4444]/20">
            {fileError}
          </div>
        )}

        {/* Text Area */}
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
            className="w-full resize-none bg-transparent text-sm text-white placeholder-[#64748B] focus:outline-none min-h-[44px] max-h-[180px] leading-relaxed transition-all font-sans"
          />
        </div>

        {/* Action Controls Footer */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-t border-white/10 bg-[#171F2F]/60 rounded-b-[14px]">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              title="Attach receipt or document"
              className="p-2 text-[#A1A8B5] hover:text-[#5B8CFF] hover:bg-[#5B8CFF]/10 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
            >
              <HiOutlinePaperClip className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={toggleVoiceInput}
              disabled={disabled}
              title={isListening ? 'Stop listening' : 'Voice input simulation'}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isListening
                  ? 'bg-[#EF4444] text-white shadow-lg shadow-[#EF4444]/30 animate-pulse'
                  : 'text-[#A1A8B5] hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/10'
              } disabled:opacity-50`}
            >
              <HiOutlineMicrophone className="h-5 w-5" />
            </button>

            <div className="hidden md:flex items-center gap-1.5 text-[10px] text-[#A1A8B5] ml-2 pl-2 border-l border-white/10">
              <span className="px-1.5 py-0.5 rounded bg-[#171F2F] border border-white/10 text-white font-mono">
                Enter ↵
              </span>
              <span>to send</span>
              <span className="text-[#A1A8B5]/60">•</span>
              <span className="px-1.5 py-0.5 rounded bg-[#171F2F] border border-white/10 text-white font-mono">
                Shift + ↵
              </span>
              <span>new line</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-[10px] font-mono ${
                isNearLimit ? 'text-[#F59E0B] font-bold' : 'text-[#A1A8B5]'
              }`}
            >
              {charCount} / {maxLength}
            </span>

            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              title="Send Message"
              className={`relative flex items-center justify-center h-10 px-4 rounded-xl font-bold text-white transition-all cursor-pointer ${
                canSend
                  ? 'gradient-primary shadow-glow-blue hover:opacity-95'
                  : 'bg-[#171F2F] text-[#64748B] cursor-not-allowed border border-white/10'
              }`}
            >
              <span className="relative flex items-center gap-1.5 text-xs font-bold">
                <span className="hidden sm:inline">Send</span>
                <HiOutlinePaperAirplane className="h-4 w-4 rotate-90" />
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
