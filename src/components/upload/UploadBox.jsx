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
          'app-card relative flex min-h-[360px] flex-col items-center justify-center border-2 p-10 text-center select-none transition-all duration-300 sm:p-14',
          disabled || isUploading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          isDragging
            ? 'border-primary bg-primary/[0.15] shadow-glow-blue'
            : 'border-dashed border-primary/40 hover:border-primary hover:shadow-glow-blue'
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

        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary text-white shadow-glow-blue">
          <HiOutlineCloudUpload className="h-8 w-8 animate-bounce" style={{ animationDuration: '2.5s' }} />
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
          {isDragging ? (
            <span className="text-primary">Drop receipt or invoice to scan</span>
          ) : (
            'Drag & drop your document here to analyze'
          )}
        </h3>
        <p className="text-base text-text-secondary max-w-lg mb-8 leading-relaxed">
          Upload physical receipts, PDF statements, or digital invoices for AI vision expense extraction.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <button
            type="button"
            onClick={handleBrowseClick}
            disabled={disabled || isUploading}
            className="btn-primary"
          >
            <HiOutlineFolderOpen className="h-5 w-5" />
            <span>Choose File</span>
          </button>

          <button
            type="button"
            onClick={handleCameraClick}
            disabled={disabled || isUploading}
            className="btn-secondary"
          >
            <HiOutlineCamera className="h-5 w-5 text-primary" />
            <span>Camera Upload</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
          {['PDF DOCUMENT', 'IMAGE FILE', 'RECEIPT PHOTO', 'VENDOR INVOICE'].map((fmt) => (
            <span
              key={fmt}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-surface px-3.5 py-1.5 text-text-secondary"
            >
              <HiOutlineDocumentText className="h-4 w-4 text-primary" />
              {fmt}
            </span>
          ))}

          <span className="inline-flex items-center rounded-full border border-success/30 bg-success/[0.15] px-3.5 py-1.5 font-bold text-success">
            MAX 10 MB
          </span>
        </div>

        {errorMessage && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-danger/[0.15] border border-danger/30 px-4 py-2 text-xs font-mono text-danger">
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

