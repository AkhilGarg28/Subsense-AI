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

const UploadBox = ({
  onFileSelect,
  isUploading = false,
  disabled = false,
  className = '',
  acceptTypes = ['.png', '.jpg', '.jpeg', '.pdf'],
  maxSizeBytes = 10 * 1024 * 1024,
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
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
        className={cn(
          'relative flex flex-col items-center justify-center rounded-xl border p-8 sm:p-12 text-center transition-all duration-200 bg-[#171A18] select-none',
          disabled || isUploading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          isDragging
            ? 'border-[#C2A155] bg-[#0D0F0E]'
            : 'border-[#F3F1EA]/10 hover:border-[#C2A155]/50'
        )}
      >
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

        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-[#0D0F0E] border border-[#F3F1EA]/10 text-[#C2A155]">
          <HiOutlineCloudUpload className="h-8 w-8" />
        </div>

        <h3 className="text-lg font-display font-bold text-[#F3F1EA] mb-1.5 tracking-tight">
          {isDragging ? (
            <span className="text-[#C2A155]">Drop receipt or invoice to scan</span>
          ) : (
            'Drag & drop your document here to analyze'
          )}
        </h3>
        <p className="text-xs text-[#96988F] max-w-md mb-6 leading-relaxed font-sans">
          Upload physical receipts, PDF statements, or digital invoices for AI expense extraction.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-6 font-mono">
          <button
            type="button"
            onClick={handleBrowseClick}
            disabled={disabled || isUploading}
            className="inline-flex items-center gap-2 rounded-lg bg-[#C2A155] hover:bg-[#D4B468] px-5 py-2.5 text-xs font-bold text-[#0D0F0E] transition-all cursor-pointer"
          >
            <HiOutlineFolderOpen className="h-4 w-4" />
            <span>Choose File</span>
          </button>

          <button
            type="button"
            onClick={handleCameraClick}
            disabled={disabled || isUploading}
            className="inline-flex items-center gap-2 rounded-lg border border-[#F3F1EA]/10 bg-[#0D0F0E] hover:bg-[#212522] px-5 py-2.5 text-xs font-bold text-[#F3F1EA] transition-all cursor-pointer"
          >
            <HiOutlineCamera className="h-4 w-4 text-[#C2A155]" />
            <span>Camera Upload</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[10px]">
          {['PDF DOCUMENT', 'IMAGE FILE', 'RECEIPT PHOTO', 'VENDOR INVOICE'].map((fmt) => (
            <span
              key={fmt}
              className="inline-flex items-center gap-1 rounded border border-[#F3F1EA]/10 bg-[#0D0F0E] px-2.5 py-1 text-[#96988F]"
            >
              <HiOutlineDocumentText className="h-3 w-3 text-[#C2A155]" />
              {fmt}
            </span>
          ))}

          <span className="inline-flex items-center rounded border border-[#3FA972]/30 bg-[#3FA972]/15 px-2.5 py-1 font-bold text-[#3FA972]">
            MAX 10 MB
          </span>
        </div>

        {errorMessage && (
          <div className="mt-4 flex items-center gap-2 rounded bg-[#D65C4F]/15 border border-[#D65C4F]/30 px-3 py-1.5 text-xs font-mono text-[#D65C4F]">
            <HiOutlineExclamationCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
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
