import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
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
          'relative flex flex-col items-center justify-center rounded-2xl border p-8 sm:p-12 text-center transition-all duration-300 bg-[#171F2F]/80 backdrop-blur-xl select-none shadow-2xl',
          disabled || isUploading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          isDragging
            ? 'border-[#5B8CFF] bg-[#5B8CFF]/10 shadow-glow-blue'
            : 'border-white/10 hover:border-[#5B8CFF]/40 hover:shadow-glow-blue'
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

        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary text-white shadow-glow-blue">
          <HiOutlineCloudUpload className="h-8 w-8 animate-bounce" style={{ animationDuration: '2.5s' }} />
        </div>

        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
          {isDragging ? (
            <span className="text-[#5B8CFF]">Drop receipt or invoice to scan</span>
          ) : (
            'Drag & drop your document here to analyze'
          )}
        </h3>
        <p className="text-sm text-[#A1A8B5] max-w-md mb-6 leading-relaxed">
          Upload physical receipts, PDF statements, or digital invoices for AI expense extraction.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-6 font-mono">
          <button
            type="button"
            onClick={handleBrowseClick}
            disabled={disabled || isUploading}
            className="inline-flex items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-xs font-bold text-white shadow-glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <HiOutlineFolderOpen className="h-4 w-4" />
            <span>Choose File</span>
          </button>

          <button
            type="button"
            onClick={handleCameraClick}
            disabled={disabled || isUploading}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#121A2F] hover:bg-[#1E293B] px-6 py-3 text-xs font-bold text-white transition-all cursor-pointer"
          >
            <HiOutlineCamera className="h-4 w-4 text-[#5B8CFF]" />
            <span>Camera Upload</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[10px]">
          {['PDF DOCUMENT', 'IMAGE FILE', 'RECEIPT PHOTO', 'VENDOR INVOICE'].map((fmt) => (
            <span
              key={fmt}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#121A2F] px-3 py-1 text-[#A1A8B5]"
            >
              <HiOutlineDocumentText className="h-3.5 w-3.5 text-[#5B8CFF]" />
              {fmt}
            </span>
          ))}

          <span className="inline-flex items-center rounded-full border border-[#22C55E]/30 bg-[#22C55E]/15 px-3 py-1 font-bold text-[#22C55E]">
            MAX 10 MB
          </span>
        </div>

        {errorMessage && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/30 px-4 py-2 text-xs font-mono text-[#EF4444]">
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
