import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineCloudUpload,
  HiOutlineDocumentText,
  HiOutlineExclamationCircle,
  HiOutlineCamera,
  HiOutlineFolderOpen,
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';

/**
 * UploadBox — Interactive Drag & Drop receipt and invoice file upload zone.
 * Features drag enter/leave state, Choose File button, Camera Snap button, and format badges.
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
  const cameraInputRef = useRef(null);

  const allowedExtensions = ['png', 'jpg', 'jpeg', 'pdf'];

  const validateFile = (file) => {
    if (!file) return false;

    if (file.size > maxSizeBytes) {
      setErrorMessage('File size exceeds the 10 MB limit.');
      return false;
    }

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
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isUploading) setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isUploading && !isDragging) setIsDragging(true);
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

  const handleBrowseClick = (e) => {
    e.stopPropagation();
    if (!disabled && !isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCameraClick = (e) => {
    e.stopPropagation();
    if (!disabled && !isUploading && cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <motion.div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
        animate={{
          scale: isDragging ? 1.01 : 1,
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          'relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-300 backdrop-blur-2xl select-none',
          disabled || isUploading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          isDragging
            ? 'bg-emerald-500/10 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.25)] ring-4 ring-emerald-500/20'
            : 'bg-card/80 border-glass-border hover:border-primary/50 hover:bg-surface/80 hover:shadow-card-hover'
        )}
      >
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 rounded-3xl border-2 border-emerald-400/80 pointer-events-none"
              style={{
                boxShadow: '0 0 25px rgba(16, 185, 129, 0.4), inset 0 0 25px rgba(16, 185, 129, 0.15)',
              }}
            />
          )}
        </AnimatePresence>

        {/* File Picker Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptTypes.join(',')}
          onChange={handleFileChange}
          disabled={disabled || isUploading}
          className="hidden"
        />

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
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
                : 'gradient-blue-purple text-white border-primary/40 shadow-glow-blue group-hover:scale-105'
            )}
          >
            <HiOutlineCloudUpload className="h-8 w-8 text-white" />
          </motion.div>
        </div>

        {/* Header & Instructions */}
        <h3 className="text-lg font-bold text-white mb-1.5 tracking-tight">
          {isDragging ? (
            <span className="text-emerald-400">Drop receipt or invoice to scan</span>
          ) : (
            'Drag & drop your document here to analyze'
          )}
        </h3>
        <p className="text-xs text-text-secondary max-w-md mb-6 leading-relaxed">
          Upload physical receipts, PDF statements, or digital invoices for AI expense extraction.
        </p>

        {/* Action Buttons Row: Choose File & Camera Snap */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <button
            type="button"
            onClick={handleBrowseClick}
            disabled={disabled || isUploading}
            className="inline-flex items-center gap-2 rounded-xl gradient-primary px-5 py-2.5 text-xs font-bold text-white shadow-glow-blue hover:brightness-110 transition-all cursor-pointer"
          >
            <HiOutlineFolderOpen className="h-4 w-4" />
            <span>Choose File</span>
          </button>

          <button
            type="button"
            onClick={handleCameraClick}
            disabled={disabled || isUploading}
            className="inline-flex items-center gap-2 rounded-xl border border-glass-border bg-surface-light px-5 py-2.5 text-xs font-bold text-white hover:border-primary/40 hover:bg-surface transition-all cursor-pointer"
          >
            <HiOutlineCamera className="h-4 w-4 text-primary" />
            <span>Camera Upload</span>
          </button>
        </div>

        {/* Format Badges: PDF, Image, Receipt, Invoice */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {['PDF Document', 'Image File', 'Receipt Photo', 'Vendor Invoice'].map((fmt) => (
            <span
              key={fmt}
              className="inline-flex items-center gap-1 rounded-full border border-glass-border bg-surface/60 px-3 py-1 text-xs font-medium text-text-secondary"
            >
              <HiOutlineDocumentText className="h-3.5 w-3.5 text-primary" />
              {fmt}
            </span>
          ))}

          <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
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
