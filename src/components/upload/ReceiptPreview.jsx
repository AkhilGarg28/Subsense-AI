import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiZoomIn,
  FiZoomOut,
  FiRotateCw,
  FiMaximize2,
  FiMinimize2,
  FiDownload,
  FiRefreshCw,
  FiFileText,
  FiCheckCircle,
  FiEye,
  FiImage,
  FiLayers,
  FiX,
  FiCpu,
  FiZap,
} from 'react-icons/fi';
import { cn } from '../../utils/helpers';

/**
 * Default simulated document metadata
 */
const DEFAULT_METADATA = {
  fileName: 'netflix_invoice_july_2026.pdf',
  fileSize: '1.25 MB',
  fileType: 'PDF Document',
  uploadDate: '2026-07-25 14:32:00',
  status: 'Processed',
  previewUrl: null, // If provided, renders actual image; otherwise renders simulated visual receipt canvas
};

/**
 * ReceiptPreview Component
 *
 * Receipt & Document Preview component:
 * - Image / Document view frame (simulated invoice receipt image with zoom-in, zoom-out, rotate, and full screen buttons)
 * - Download PDF/Image button
 * - Document metadata header (File name, size, type)
 *
 * @param {Object} props
 * @param {Object} [props.fileMetadata] - Metadata object for the preview document
 * @param {Function} [props.onDownload] - Handler for downloading document
 * @param {string} [props.className] - Extra Tailwind CSS classes
 */
const ReceiptPreview = ({
  fileMetadata = DEFAULT_METADATA,
  onDownload,
  className = '',
}) => {
  const meta = { ...DEFAULT_METADATA, ...fileMetadata };

  // View state: Zoom level (0.5 to 2.5), Rotation angle (0, 90, 180, 270), Fullscreen toggle, OCR Bounding Box toggle
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOcrOverlay, setShowOcrOverlay] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  // Zoom handlers
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  // Rotation handler
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  // Download simulation
  const handleDownloadAction = (format = 'PDF') => {
    setIsDownloading(true);
    if (onDownload) {
      onDownload(meta, format);
    }

    // Trigger synthetic file download if previewUrl exists or simulated text file download
    setTimeout(() => {
      const dummyContent = `SubSense AI Receipt Preview Export\nFileName: ${meta.fileName}\nUploaded: ${meta.uploadDate}\nFormat: ${format}`;
      const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${meta.fileName.split('.')[0]}_preview.${format.toLowerCase()}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 1000);
  };

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border border-slate-700/60 bg-slate-900/90 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300',
        isFullscreen ? 'fixed inset-4 z-50 m-0 max-w-none' : 'w-full',
        className
      )}
    >
      {/* Top Document Metadata Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-950/60 px-5 py-3.5">
        {/* Document Info */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            {meta.fileType.toLowerCase().includes('pdf') ? (
              <FiFileText className="h-5 w-5" />
            ) : (
              <FiImage className="h-5 w-5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white truncate max-w-[220px] sm:max-w-xs" title={meta.fileName}>
                {meta.fileName}
              </h4>
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                <FiCheckCircle className="h-3 w-3" />
                {meta.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              <span>{meta.fileSize}</span>
              <span>•</span>
              <span>{meta.fileType}</span>
              <span>•</span>
              <span>{meta.uploadDate}</span>
            </p>
          </div>
        </div>

        {/* Download Buttons Bar */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleDownloadAction('PDF')}
            disabled={isDownloading}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 text-xs font-semibold shadow-md transition-all cursor-pointer disabled:opacity-50"
            title="Download document as PDF"
          >
            <FiDownload className="h-3.5 w-3.5" />
            <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {/* Control Toolbar (Zoom, Rotate, OCR Overlay, Fullscreen) */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 bg-slate-900/60 px-4 py-2 text-xs">
        {/* Left: View Controls */}
        <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Zoom Out (-)"
          >
            <FiZoomOut className="h-4 w-4" />
          </button>

          <span className="px-2 font-mono font-semibold text-blue-400 text-[11px] min-w-[48px] text-center">
            {Math.round(zoom * 100)}%
          </span>

          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Zoom In (+)"
          >
            <FiZoomIn className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          <button
            type="button"
            onClick={handleRotate}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Rotate Clockwise (90°)"
          >
            <FiRotateCw className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Reset Zoom & Rotation"
          >
            <FiRefreshCw className="h-4 w-4" />
          </button>
        </div>

        {/* Right: AI OCR Overlay & Fullscreen Toggles */}
        <div className="flex items-center gap-2">
          {/* Toggle OCR Bounding Boxes */}
          <button
            type="button"
            onClick={() => setShowOcrOverlay(!showOcrOverlay)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[11px] font-medium transition-all cursor-pointer',
              showOcrOverlay
                ? 'border-blue-500/40 bg-blue-500/10 text-blue-300'
                : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
            )}
            title="Toggle AI OCR Bounding Box overlays"
          >
            <FiCpu className="h-3.5 w-3.5 text-blue-400" />
            <span>AI OCR Overlay</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Full Screen' : 'Full Screen Preview'}
          >
            {isFullscreen ? <FiMinimize2 className="h-4 w-4" /> : <FiMaximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Main Preview Container Viewport */}
      <div className="relative flex-1 min-h-[380px] max-h-[600px] overflow-auto bg-slate-950/90 p-6 flex items-center justify-center select-none">
        {/* Animated Document Holder with Scaled/Rotated Visual Frame */}
        <motion.div
          animate={{
            scale: zoom,
            rotate: rotation,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="relative transition-transform duration-200 ease-out origin-center"
        >
          {meta.previewUrl ? (
            /* Render actual image if previewUrl passed */
            <div className="relative overflow-hidden rounded-xl border border-slate-800 shadow-2xl max-w-md">
              <img
                src={meta.previewUrl}
                alt={meta.fileName}
                className="w-full h-auto object-contain max-h-[500px]"
              />
            </div>
          ) : (
            /* Render Simulated Receipt Invoice Canvas with Realistic Details & AI OCR Overlays */
            <div className="relative w-[340px] sm:w-[380px] min-h-[460px] bg-slate-900 text-slate-100 p-6 rounded-xl border border-slate-700 shadow-2xl text-xs space-y-4 font-sans">
              {/* Simulated Paper Texture / Receipt Top */}
              <div className="flex items-center justify-between border-b border-dashed border-slate-700 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 font-bold text-lg">
                    🍿
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm tracking-wide text-white">NETFLIX INC.</h5>
                    <p className="text-[10px] text-slate-400">100 Winchester Circle, Los Gatos, CA</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  PAID
                </span>
              </div>

              {/* Invoice Metadata Section */}
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase">Invoice No</span>
                  <span className="font-mono font-semibold text-slate-200">#INV-2026-88912</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase">Date</span>
                  <span className="font-semibold text-slate-200">25 Jul 2026</span>
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1">
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                <div className="flex justify-between items-center text-[11px] py-1 border-b border-slate-800/40">
                  <div>
                    <div className="font-semibold text-white">Netflix Premium Plan</div>
                    <div className="text-[9px] text-slate-400">Monthly Ultra HD Subscription</div>
                  </div>
                  <span className="font-mono font-bold text-emerald-400">$19.99</span>
                </div>
                <div className="flex justify-between items-center text-[11px] py-1">
                  <span className="text-slate-400">Tax & Fees</span>
                  <span className="font-mono text-slate-300">$0.00</span>
                </div>
              </div>

              {/* Receipt Total */}
              <div className="border-t-2 border-slate-700 pt-3 flex items-center justify-between font-bold text-sm bg-slate-950/80 p-3 rounded-lg">
                <span className="text-slate-300">TOTAL CHARGED:</span>
                <span className="text-emerald-400 font-mono text-base">$19.99 (₹499)</span>
              </div>

              {/* Payment Info */}
              <div className="text-[10px] text-slate-400 space-y-0.5 border-t border-dashed border-slate-800 pt-2">
                <div>Payment Method: VISA ending in •••• 4242</div>
                <div>Transaction ID: TXN_9018247910</div>
              </div>

              {/* Simulated Barcode */}
              <div className="pt-2 text-center">
                <div className="inline-block bg-slate-950 px-4 py-2 rounded border border-slate-800">
                  <div className="h-6 w-48 bg-[repeating-linear-gradient(90deg,#fff,#fff_2px,#000_2px,#000_5px)] opacity-75 mx-auto" />
                  <span className="text-[8px] font-mono text-slate-400 block mt-1">
                    *984102948120*
                  </span>
                </div>
              </div>

              {/* AI OCR Highlight Box Overlays (AI Bounding Boxes Simulation) */}
              {showOcrOverlay && (
                <div className="pointer-events-none absolute inset-0 rounded-xl">
                  {/* Bounding Box 1: Merchant */}
                  <div
                    className="absolute top-5 left-5 right-20 h-10 rounded border-2 border-emerald-400 bg-emerald-400/10 animate-pulse"
                    title="OCR Extracted: Merchant Name"
                  >
                    <span className="absolute -top-3 left-1 bg-emerald-500 text-slate-950 text-[8px] font-extrabold px-1 rounded">
                      Merchant (100%)
                    </span>
                  </div>

                  {/* Bounding Box 2: Total Amount */}
                  <div
                    className="absolute bottom-28 left-5 right-5 h-12 rounded border-2 border-blue-400 bg-blue-400/10 animate-pulse"
                    title="OCR Extracted: Total Amount ($19.99)"
                  >
                    <span className="absolute -top-3 left-1 bg-blue-500 text-slate-950 text-[8px] font-extrabold px-1 rounded">
                      Amount (99.8%)
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer Info & Instructions */}
      <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/60 px-5 py-2.5 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <FiZap className="h-3.5 w-3.5 text-amber-400" />
          <span>SubSense AI Vision Engine v4.2 active</span>
        </div>
        <div>
          <span>Use zoom & rotation controls to examine document details</span>
        </div>
      </div>
    </div>
  );
};

ReceiptPreview.propTypes = {
  fileMetadata: PropTypes.shape({
    fileName: PropTypes.string,
    fileSize: PropTypes.string,
    fileType: PropTypes.string,
    uploadDate: PropTypes.string,
    status: PropTypes.string,
    previewUrl: PropTypes.string,
  }),
  onDownload: PropTypes.func,
  className: PropTypes.string,
};

export default ReceiptPreview;
