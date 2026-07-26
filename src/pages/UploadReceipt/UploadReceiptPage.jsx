import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineSparkles,
  HiOutlineCloudUpload,
  HiOutlineRefresh,
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineEye,
  HiOutlineSwitchHorizontal,
} from 'react-icons/hi';
import {
  FiZap,
  FiFileText,
  FiCheckCircle,
  FiUploadCloud,
  FiGrid,
  FiList,
  FiInfo,
  FiRefreshCw,
  FiPlay,
} from 'react-icons/fi';
import {
  UploadBox,
  ProgressBar,
  ReceiptCard,
  ReceiptPreview,
  ExtractedInfoCard,
  ProcessingTimeline,
  UploadHistoryTable,
  UploadQuickActions,
  UploadSkeleton,
} from '../../components/upload';
import { billsAPI } from '../../services/api';

/**
 * Sample pre-configured demo receipt payloads for interactive testing
 */
const DEMO_RECEIPTS = [
  {
    fileName: 'Netflix_Premium_July_2026.pdf',
    fileSize: '1.25 MB',
    fileType: 'PDF Document',
    extracted: {
      merchantName: 'Netflix',
      logoEmoji: '🍿',
      amountUSD: 19.99,
      amountINR: 499,
      category: 'Entertainment',
      paymentMethod: 'UPI / Visa •••• 4242',
      paymentType: 'UPI',
      billingDate: '2026-07-25',
      nextRenewalDate: '2026-08-25',
      isSubscription: true,
      recurringPeriod: 'Monthly',
      confidenceScore: 99.4,
      invoiceNumber: 'INV-2026-88912',
      lineItems: [
        {
          id: 'item-1',
          description: 'Netflix Premium (4K Ultra HD + 4 Screens)',
          qty: 1,
          priceUSD: 19.99,
          priceINR: 499,
        },
      ],
    },
    preview: {
      fileName: 'Netflix_Premium_July_2026.pdf',
      fileSize: '1.25 MB',
      fileType: 'PDF Document',
      uploadDate: '2026-07-25 14:32:00',
      status: 'Processed',
    },
  },
  {
    fileName: 'AWS_Cloud_Invoice_July.pdf',
    fileSize: '2.40 MB',
    fileType: 'PDF Document',
    extracted: {
      merchantName: 'Amazon Web Services',
      logoEmoji: '☁️',
      amountUSD: 142.30,
      amountINR: 11840,
      category: 'Cloud & Hosting',
      paymentMethod: 'Corporate Visa •••• 8821',
      paymentType: 'Credit Card',
      billingDate: '2026-07-25',
      nextRenewalDate: '2026-08-25',
      isSubscription: true,
      recurringPeriod: 'Monthly',
      confidenceScore: 98.9,
      invoiceNumber: 'AWS-2026-90412',
      lineItems: [
        { id: 'aws-1', description: 'Amazon EC2 Instance Hours', qty: 1, priceUSD: 98.00, priceINR: 8150 },
        { id: 'aws-2', description: 'Amazon S3 Standard Storage', qty: 1, priceUSD: 31.90, priceINR: 2650 },
        { id: 'aws-3', description: 'AWS CloudWatch Metrics', qty: 1, priceUSD: 12.40, priceINR: 1040 },
      ],
    },
    preview: {
      fileName: 'AWS_Cloud_Invoice_July.pdf',
      fileSize: '2.40 MB',
      fileType: 'PDF Document',
      uploadDate: '2026-07-25 18:30:00',
      status: 'Processed',
    },
  },
  {
    fileName: 'Spotify_Family_Receipt.png',
    fileSize: '840 KB',
    fileType: 'PNG Image',
    extracted: {
      merchantName: 'Spotify AB',
      logoEmoji: '🎵',
      amountUSD: 15.99,
      amountINR: 1329,
      category: 'Streaming & Media',
      paymentMethod: 'Mastercard •••• 4242',
      paymentType: 'Debit Card',
      billingDate: '2026-07-25',
      nextRenewalDate: '2026-08-25',
      isSubscription: true,
      recurringPeriod: 'Monthly',
      confidenceScore: 99.7,
      invoiceNumber: 'SPOT-881204',
      lineItems: [
        { id: 'sp-1', description: 'Spotify Family Subscription (6 Accounts)', qty: 1, priceUSD: 15.99, priceINR: 1329 },
      ],
    },
    preview: {
      fileName: 'Spotify_Family_Receipt.png',
      fileSize: '840 KB',
      fileType: 'PNG Image',
      uploadDate: '2026-07-25 14:15:00',
      status: 'Processed',
    },
  },
];

/**
 * Initial Recent Uploads Grid Data
 */
const INITIAL_RECENT_UPLOADS = [
  {
    id: 'up-101',
    fileName: 'AWS_Invoice_July_2026.pdf',
    fileSize: '2.4 MB',
    fileType: 'pdf',
    merchantName: 'Amazon Web Services',
    logoEmoji: '☁️',
    merchantCategory: 'Cloud & Hosting',
    amountUSD: 142.30,
    amountINR: 11840,
    formattedDate: 'Jul 25, 2026',
    status: 'Completed',
  },
  {
    id: 'up-102',
    fileName: 'Spotify_Family_Receipt.png',
    fileSize: '840 KB',
    fileType: 'png',
    merchantName: 'Spotify AB',
    logoEmoji: '🎵',
    merchantCategory: 'Streaming & Media',
    amountUSD: 15.99,
    amountINR: 1329,
    formattedDate: 'Jul 25, 2026',
    status: 'Completed',
  },
  {
    id: 'up-103',
    fileName: 'ChatGPT_Plus_July2026.pdf',
    fileSize: '1.1 MB',
    fileType: 'pdf',
    merchantName: 'OpenAI Inc.',
    logoEmoji: '🤖',
    merchantCategory: 'AI Tools',
    amountUSD: 20.00,
    amountINR: 1660,
    formattedDate: 'Jul 25, 2026',
    status: 'Processing',
  },
];

/**
 * UploadReceiptPage — Full-featured Receipt & Invoice Scanner page for SubSense AI
 * Assembles UploadBox, ProgressBar, ProcessingTimeline, ExtractedInfoCard, ReceiptPreview,
 * UploadHistoryTable, UploadQuickActions, and UploadSkeleton into an interactive workflow.
 */
const UploadReceiptPage = () => {
  // Global view state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isEmptyState, setIsEmptyState] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Interactive Upload Workflow State
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatusText, setUploadStatusText] = useState('Preparing receipt scan...');
  const [currentTimelineStep, setCurrentTimelineStep] = useState(1);
  const [currentFileMeta, setCurrentFileMeta] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [previewMeta, setPreviewMeta] = useState(null);

  // Recent Uploads list state
  const [recentUploads, setRecentUploads] = useState(INITIAL_RECENT_UPLOADS);
  const uploadTimerRef = useRef(null);

  // Initial simulation timer to show skeleton or load
  useEffect(() => {
    // Page readiness
    setIsLoadingPage(false);
    return () => {
      if (uploadTimerRef.current) clearInterval(uploadTimerRef.current);
    };
  }, []);

  /**
   * Start interactive simulated upload workflow
   */
  const startUploadPipeline = (selectedFileOrDemoIndex = 0) => {
    // Reset prior state
    if (uploadTimerRef.current) clearInterval(uploadTimerRef.current);
    setIsUploading(true);
    setIsUploadComplete(false);
    setUploadProgress(0);
    setCurrentTimelineStep(1);

    // Pick demo payload or create file metadata
    let demoObj;
    if (typeof selectedFileOrDemoIndex === 'number') {
      demoObj = DEMO_RECEIPTS[selectedFileOrDemoIndex % DEMO_RECEIPTS.length];
    } else if (selectedFileOrDemoIndex instanceof File) {
      const file = selectedFileOrDemoIndex;
      demoObj = {
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        fileType: file.type || 'Receipt Document',
        extracted: {
          merchantName: file.name.split('.')[0].replace(/[-_]/g, ' ') || 'Uploaded Receipt',
          logoEmoji: '📄',
          amountUSD: 29.99,
          amountINR: 2490,
          category: 'Software / SaaS',
          paymentMethod: 'Credit Card (Visa •••• 1102)',
          paymentType: 'Credit Card',
          billingDate: '2026-07-25',
          nextRenewalDate: '2026-08-25',
          isSubscription: true,
          recurringPeriod: 'Monthly',
          confidenceScore: 99.1,
          invoiceNumber: `INV-${Math.floor(10000 + Math.random() * 90000)}`,
          lineItems: [
            {
              id: 'custom-1',
              description: file.name.split('.')[0],
              qty: 1,
              priceUSD: 29.99,
              priceINR: 2490,
            },
          ],
        },
        preview: {
          fileName: file.name,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          fileType: file.type || 'PDF Document',
          uploadDate: '2026-07-25 21:49:00',
          status: 'Processed',
        },
      };
    } else {
      demoObj = DEMO_RECEIPTS[0];
    }

    setCurrentFileMeta({
      name: demoObj.fileName,
      size: demoObj.fileSize,
    });
    setExtractedData(demoObj.extracted);
    setPreviewMeta(demoObj.preview);

    // Step-by-step progress timer simulation
    let currentPct = 0;
    uploadTimerRef.current = setInterval(() => {
      currentPct += 4;

      if (currentPct <= 25) {
        setUploadStatusText('Uploading receipt document & verifying format...');
        setCurrentTimelineStep(1);
      } else if (currentPct <= 50) {
        setUploadStatusText('Running LLM Vision OCR & extracting raw line items...');
        setCurrentTimelineStep(2);
      } else if (currentPct <= 75) {
        setUploadStatusText('AI categorizing merchant, tax breakdown & currency...');
        setCurrentTimelineStep(3);
      } else if (currentPct <= 95) {
        setUploadStatusText('Matching recurring subscription patterns & renewal dates...');
        setCurrentTimelineStep(4);
      } else if (currentPct >= 100) {
        currentPct = 100;
        clearInterval(uploadTimerRef.current);
        setUploadStatusText('Scan & Extraction Complete!');
        setCurrentTimelineStep(5);
        setIsUploading(false);
        setIsUploadComplete(true);

        // Add newly processed item to recent uploads grid
        const newCard = {
          id: `up-${Date.now()}`,
          fileName: demoObj.fileName,
          fileSize: demoObj.fileSize,
          fileType: demoObj.fileType.toLowerCase().includes('png') ? 'png' : 'pdf',
          merchantName: demoObj.extracted.merchantName,
          logoEmoji: demoObj.extracted.logoEmoji,
          merchantCategory: demoObj.extracted.category,
          amountUSD: demoObj.extracted.amountUSD,
          amountINR: demoObj.extracted.amountINR,
          formattedDate: 'Just now',
          status: 'Completed',
        };
        setRecentUploads((prev) => [newCard, ...prev.slice(0, 5)]);
      }

      setUploadProgress(currentPct);
    }, 120);
  };

  /**
   * Cancel / Reset current upload pipeline
   */
  const handleCancelUpload = () => {
    if (uploadTimerRef.current) clearInterval(uploadTimerRef.current);
    setIsUploading(false);
    setIsUploadComplete(false);
    setUploadProgress(0);
    setCurrentTimelineStep(1);
  };

  /**
   * Remove item from recent uploads grid
   */
  const handleDeleteRecent = (id) => {
    setRecentUploads((prev) => prev.filter((item) => item.id !== id));
  };

  if (isLoadingPage) {
    return <UploadSkeleton />;
  }

  return (
    <div className="app-page page-stack">
      {/* 1. Page Header */}
      <div className="page-hero p-6 sm:p-8 lg:p-10 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="gradient-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-glow-blue">
              <HiOutlineCloudUpload className="h-7 w-7 animate-bounce-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="section-title">
                  AI Receipt & Invoice Scanner
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-bold text-emerald-300">
                  <FiZap className="h-3.5 w-3.5 fill-emerald-300" />
                  SubSense Vision 4.2
                </span>
              </div>
              <p className="section-subtitle mt-2 max-w-2xl">
                Upload PDF bills, receipt images, or invoices to extract subscription data instantly
              </p>
            </div>
          </div>
        </div>

        {/* Action Bar: Sample Simulation Buttons & Empty State Toggle */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Empty State Toggle Option */}
          <button
            type="button"
            onClick={() => setIsEmptyState(!isEmptyState)}
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold border transition-all cursor-pointer shadow-md ${
              isEmptyState
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
            }`}
            title="Toggle between Empty State and Populated View"
          >
            <HiOutlineSwitchHorizontal className="h-4 w-4 text-amber-400" />
            <span>{isEmptyState ? 'Mode: Empty State' : 'Mode: Populated View'}</span>
          </button>

          {/* Simulate Demo Buttons */}
          <button
            type="button"
            onClick={() => startUploadPipeline(0)}
            disabled={isUploading}
            className="btn-primary disabled:opacity-50"
          >
            <FiPlay className="h-3.5 w-3.5 fill-white" />
            <span>Simulate Netflix Upload</span>
          </button>

          <button
            type="button"
            onClick={() => startUploadPipeline(1)}
            disabled={isUploading}
            className="btn-secondary disabled:opacity-50"
          >
            <span>AWS Demo</span>
          </button>
        </div>
      </div>

      {/* 2. Quick Actions Bar */}
      <UploadQuickActions
        onUploadAnother={() => {
          handleCancelUpload();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onConnectGmail={() => alert('Connect Gmail Auto-Sync modal initialized!')}
      />

      {/* 3. Interactive Upload Zone & Active Progress Bar */}
      <div className="page-stack">
        {/* Upload Box Dropzone */}
        <UploadBox
          onFileSelect={(file) => startUploadPipeline(file)}
          isUploading={isUploading}
        />

        {/* Animated Progress Bar (Visible during uploading or completion) */}
        <AnimatePresence>
          {(isUploading || isUploadComplete) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ProgressBar
                progress={uploadProgress}
                statusText={uploadStatusText}
                fileName={currentFileMeta?.name || 'Scanned_Receipt.pdf'}
                fileSize={currentFileMeta?.size || '1.25 MB'}
                onCancel={handleCancelUpload}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Processing Timeline & AI Extracted Info / Bill Preview */}
      <AnimatePresence>
        {(isUploading || isUploadComplete) && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="space-y-6 pt-2"
          >
            {/* Timeline & AI Extracted Info Card 2-Column Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
              {/* 5-Step Processing Timeline */}
              <ProcessingTimeline
                currentStep={currentTimelineStep}
                isProcessing={isUploading}
                onStepChange={(stepId) => setCurrentTimelineStep(stepId)}
                onComplete={() => {
                  setIsUploading(false);
                  setIsUploadComplete(true);
                  setUploadProgress(100);
                }}
              />

              {/* AI Extracted Info Card */}
              <ExtractedInfoCard
                data={extractedData || DEMO_RECEIPTS[0].extracted}
                onSave={(info) => {
                  alert(`Saved subscription "${info.merchantName}" to your SubSense AI portfolio!`);
                }}
              />
            </div>

            {/* Document Preview Frame */}
            <div className="w-full pt-2">
              <div className="flex items-center gap-2 mb-3">
                <FiFileText className="h-4 w-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Live Bill Preview & AI OCR Vision Inspection
                </h3>
              </div>
              <ReceiptPreview
                fileMetadata={previewMeta || DEMO_RECEIPTS[0].preview}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Recent Uploads & Empty State Section */}
      <div className="page-stack pt-2">
        <div className="app-card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <FiGrid className="h-5 w-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Recent Scanned Receipts
            </h2>
            <span className="rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
              {isEmptyState ? 0 : recentUploads.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Grid / Table View Mode Toggle */}
            <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FiGrid className="h-3.5 w-3.5" />
                <span>Grid View</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                  viewMode === 'table'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FiList className="h-3.5 w-3.5" />
                <span>Table View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Render Empty State OR Recent Receipts */}
        {isEmptyState ? (
          /* Empty State Toggle Option View */
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/60 p-12 text-center backdrop-blur-xl space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-400">
              <HiOutlineDocumentText className="h-8 w-8 text-slate-500" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-base font-bold text-white">No receipts uploaded yet</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Drag & drop your PDF bills, PNG/JPG receipt photos above, or use the sample demo buttons to test AI extraction.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsEmptyState(false);
                  startUploadPipeline(0);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-bold text-white transition-all cursor-pointer shadow-lg"
              >
                <HiOutlineCloudUpload className="h-4 w-4" />
                <span>Upload First Receipt</span>
              </button>
            </div>
          </div>
        ) : (
          /* Populated View (Grid or History Table) */
          <div>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {recentUploads.map((receipt) => (
                  <ReceiptCard
                    key={receipt.id}
                    receipt={receipt}
                    onView={() => {
                      setExtractedData(DEMO_RECEIPTS[0].extracted);
                      setPreviewMeta(DEMO_RECEIPTS[0].preview);
                      setIsUploadComplete(true);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    onDownload={() => alert(`Downloading "${receipt.fileName}"...`)}
                    onDelete={handleDeleteRecent}
                  />
                ))}
              </div>
            ) : (
              <UploadHistoryTable
                onView={() => {
                  setExtractedData(DEMO_RECEIPTS[0].extracted);
                  setIsUploadComplete(true);
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* 6. Full Receipt History Table Section */}
      {!isEmptyState && viewMode === 'grid' && (
        <div className="page-stack pt-4">
          <div className="flex items-center gap-2">
            <FiList className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Full Receipt Upload History & Search
            </h2>
          </div>
          <UploadHistoryTable />
        </div>
      )}
    </div>
  );
};

export default UploadReceiptPage;

