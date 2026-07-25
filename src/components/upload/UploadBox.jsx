import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineCloudUpload,
  HiOutlineDocumentText,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';

/**
 * UploadBox — Interactive Drag & Drop receipt and invoice file upload zone.
 * Features drag enter/leave glowing state, file input picker, format badges, and Framer Motion ring animations.
 */
const UploadBox = ({
  onFileSelect,
  isUploading = false,
  disabled = false,
  className = '',
  acceptTypes = ['.png', '.jpg', '.jpeg', '.pdf'],
  maxSizeBytes = 10 * 1024 * 1024, // 10 MB default
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const allowedExtensions = ['png', 'jpg', 'jpeg', 'pdf'];

  const validateFile = (file) => {
    if (!file) return false;

    // Check file size limit (10MB)
    if (file.size > maxSizeBytes) {
      setErrorMessage('File size exceeds the 10 MB limit.');
      return false;
    }

    // Check extension
    const ext = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      setErrorMessage('Unsupported file format. Please upload PNG, JPG, JPEG, or PDF.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      onFileSelect?.(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isUploading) {
      setIsDragging(true);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isUploading && !isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled || isUploading) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onFileSelect?.(file);
      }
    }
  };

  const handleClick = () => {
    if (!disabled && !isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <motion.div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        animate={{
          scale: isDragging ? 1.01 : 1,
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          'relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-300 backdrop-blur-xl select-none',
          disabled || isUploading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          isDragging
            ? 'bg-emerald-500/10 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.25)] ring-4 ring-emerald-500/20'
            : 'bg-slate-900/70 border-slate-700/60 hover:border-emerald-500/50 hover:bg-slate-800/70 hover:shadow-[0_0_20px_rgba(16,185,129,0.12)]'
        )}
      >
        {/* Animated Drag Hover Glow Ring with Framer Motion */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 rounded-2xl border-2 border-emerald-400/80 pointer-events-none"
              style={{
                boxShadow: '0 0 25px rgba(16, 185, 129, 0.4), inset 0 0 25px rgba(16, 185, 129, 0.15)',
              }}
            />
          )}
        </AnimatePresence>

        {/* Hidden File Input Picker */}
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptTypes.join(',')}
          onChange={handleFileChange}
          disabled={disabled || isUploading}
          className="hidden"
        />

        {/* Upload Icon */}
        <div className="relative mb-5 flex h-20 w-20 items-center justify-center">
          <motion.div
            animate={{
              scale: isDragging ? [1, 1.12, 1] : 1,
            }}
            transition={{
              repeat: isDragging ? Infinity : 0,
              duration: 1.4,
              ease: 'easeInOut',
            }}
            className={cn(
              'flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-300 shadow-xl',
              isDragging
                ? 'bg-emerald-500 text-white border-emerald-300 shadow-emerald-500/40'
                : 'bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-slate-800/80 text-emerald-400 border-emerald-500/30 group-hover:scale-105'
            )}
          >
            <HiOutlineCloudUpload className="h-8 w-8" />
          </motion.div>
        </div>

        {/* Header & Instructions */}
        <h3 className="text-lg font-semibold text-white mb-1.5">
          {isDragging ? (
            <span className="text-emerald-400">Drop receipt or invoice to upload</span>
          ) : (
            <>
              Drag & drop your receipt or invoice here, or{' '}
              <span className="text-emerald-400 font-bold underline decoration-emerald-500/50 underline-offset-4 hover:text-emerald-300">
                browse files
              </span>
            </>
          )}
        </h3>
        <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
          Supports PNG, JPG, JPEG, and PDF files. Automatic AI expense scanning & recurring payment detection.
        </p>

        {/* Visual File Format Badges & Limit Indicator */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
          {['PNG', 'JPG', 'JPEG', 'PDF'].map((fmt) => (
            <span
              key={fmt}
              className="inline-flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-800/90 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-md shadow-sm"
            >
              <HiOutlineDocumentText className="h-3.5 w-3.5 text-emerald-400" />
              {fmt}
            </span>
          ))}

          <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            Max 10 MB
          </span>
        </div>

        {/* Error Alert Display */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/30 px-4 py-2 text-xs font-medium text-rose-300"
          >
            <HiOutlineExclamationCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

UploadBox.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  isUploading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  acceptTypes: PropTypes.arrayOf(PropTypes.string),
  maxSizeBytes: PropTypes.number,
};

export default UploadBox;
