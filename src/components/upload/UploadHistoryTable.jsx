import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiFileText,
  FiSearch,
  FiFilter,
  FiEye,
  FiDownload,
  FiTrash2,
  FiCheckCircle,
  FiAlertTriangle,
  FiClock,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiTag,
  FiRefreshCw
} from 'react-icons/fi';
import { HiOutlineCloudUpload, HiOutlineSparkles } from 'react-icons/hi';
import { FaAws, FaSpotify, FaGithub, FaGoogle } from 'react-icons/fa';
import { SiNetflix } from 'react-icons/si';

/**
 * Default mock receipt upload history dataset
 */
const INITIAL_UPLOADS = [
  {
    id: 'up-101',
    fileName: 'AWS_Invoice_July_2026.pdf',
    fileSize: '2.4 MB',
    fileType: 'pdf',
    merchantName: 'Amazon Web Services',
    merchantCategory: 'Cloud & Hosting',
    amountUSD: 142.30,
    amountINR: 11840,
    uploadDate: '2026-07-25 18:30',
    formattedDate: 'Jul 25, 2026 • 06:30 PM',
    status: 'Completed',
    taxUSD: 12.40,
    paymentMethod: 'Corporate Visa •••• 8821',
    lineItems: [
      { name: 'Amazon EC2 Running Hours', qty: 1, priceUSD: 98.00 },
      { name: 'Amazon S3 Standard Storage', qty: 1, priceUSD: 31.90 },
      { name: 'AWS CloudWatch Logs', qty: 1, priceUSD: 12.40 }
    ]
  },
  {
    id: 'up-102',
    fileName: 'Spotify_Family_Receipt.png',
    fileSize: '840 KB',
    fileType: 'png',
    merchantName: 'Spotify AB',
    merchantCategory: 'Streaming & Media',
    amountUSD: 15.99,
    amountINR: 1329,
    uploadDate: '2026-07-25 14:15',
    formattedDate: 'Jul 25, 2026 • 02:15 PM',
    status: 'Completed',
    taxUSD: 1.20,
    paymentMethod: 'Mastercard •••• 4242',
    lineItems: [{ name: 'Spotify Family Subscription (Monthly)', qty: 1, priceUSD: 15.99 }]
  },
  {
    id: 'up-103',
    fileName: 'ChatGPT_Plus_July2026.pdf',
    fileSize: '1.1 MB',
    fileType: 'pdf',
    merchantName: 'OpenAI Inc.',
    merchantCategory: 'AI Tools',
    amountUSD: 20.00,
    amountINR: 1660,
    uploadDate: '2026-07-25 09:40',
    formattedDate: 'Jul 25, 2026 • 09:40 AM',
    status: 'Processing',
    taxUSD: 0.00,
    paymentMethod: 'Visa •••• 1102',
    lineItems: [{ name: 'ChatGPT Plus Monthly Subscription', qty: 1, priceUSD: 20.00 }]
  },
  {
    id: 'up-104',
    fileName: 'Adobe_CC_AllApps_Invoice.pdf',
    fileSize: '3.2 MB',
    fileType: 'pdf',
    merchantName: 'Adobe Systems',
    merchantCategory: 'Software / SaaS',
    amountUSD: 54.99,
    amountINR: 4575,
    uploadDate: '2026-07-24 16:20',
    formattedDate: 'Jul 24, 2026 • 04:20 PM',
    status: 'Completed',
    taxUSD: 4.50,
    paymentMethod: 'Amex •••• 9012',
    lineItems: [{ name: 'Creative Cloud All Apps Plan', qty: 1, priceUSD: 54.99 }]
  },
  {
    id: 'up-105',
    fileName: 'Corrupted_Receipt_Scan.jpg',
    fileSize: '410 KB',
    fileType: 'jpg',
    merchantName: 'Unknown Vendor',
    merchantCategory: 'Uncategorized',
    amountUSD: 0.00,
    amountINR: 0,
    uploadDate: '2026-07-23 21:05',
    formattedDate: 'Jul 23, 2026 • 09:05 PM',
    status: 'Failed',
    failureReason: 'Image blur detected. OCR engine could not parse total amount or line items.',
    lineItems: []
  },
  {
    id: 'up-106',
    fileName: 'GitHub_Enterprise_Seats.pdf',
    fileSize: '1.8 MB',
    fileType: 'pdf',
    merchantName: 'GitHub Inc.',
    merchantCategory: 'Productivity',
    amountUSD: 210.00,
    amountINR: 17470,
    uploadDate: '2026-07-22 11:10',
    formattedDate: 'Jul 22, 2026 • 11:10 AM',
    status: 'Completed',
    taxUSD: 18.00,
    paymentMethod: 'Corporate Visa •••• 8821',
    lineItems: [{ name: 'GitHub Enterprise Team Seats (10 Developer Seats)', qty: 10, priceUSD: 21.00 }]
  },
  {
    id: 'up-107',
    fileName: 'Google_Workspace_Receipt.pdf',
    fileSize: '1.4 MB',
    fileType: 'pdf',
    merchantName: 'Google Cloud Services',
    merchantCategory: 'Productivity',
    amountUSD: 36.00,
    amountINR: 2990,
    uploadDate: '2026-07-21 08:30',
    formattedDate: 'Jul 21, 2026 • 08:30 AM',
    status: 'Completed',
    taxUSD: 3.10,
    paymentMethod: 'Mastercard •••• 4242',
    lineItems: [{ name: 'Business Standard Workspace Seats (3 Users)', qty: 3, priceUSD: 12.00 }]
  },
  {
    id: 'up-108',
    fileName: 'Netflix_4K_Premium.png',
    fileSize: '920 KB',
    fileType: 'png',
    merchantName: 'Netflix International',
    merchantCategory: 'Streaming & Media',
    amountUSD: 22.99,
    amountINR: 1910,
    uploadDate: '2026-07-20 19:45',
    formattedDate: 'Jul 20, 2026 • 07:45 PM',
    status: 'Completed',
    taxUSD: 1.90,
    paymentMethod: 'Visa •••• 1102',
    lineItems: [{ name: 'Netflix Premium 4K UHD Plan', qty: 1, priceUSD: 22.99 }]
  }
];

/**
 * Render Brand / Category Icon Helper
 */
const RenderMerchantIcon = ({ merchantName }) => {
  const name = merchantName.toLowerCase();
  if (name.includes('aws') || name.includes('amazon')) {
    return <FaAws className="w-4 h-4 text-amber-400" />;
  }
  if (name.includes('spotify')) {
    return <FaSpotify className="w-4 h-4 text-emerald-400" />;
  }
  if (name.includes('openai') || name.includes('chatgpt')) {
    return <HiOutlineSparkles className="w-4 h-4 text-cyan-300" />;
  }
  if (name.includes('github')) {
    return <FaGithub className="w-4 h-4 text-purple-300" />;
  }
  if (name.includes('google')) {
    return <FaGoogle className="w-4 h-4 text-rose-400" />;
  }
  if (name.includes('netflix')) {
    return <SiNetflix className="w-4 h-4 text-red-500" />;
  }
  return <FiTag className="w-4 h-4 text-blue-400" />;
};

/**
 * UploadHistoryTable Component
 *
 * Full Upload History Table component with searchable filter bar, category dropdown,
 * status badges, detail modal preview, download triggers, and row deletion.
 *
 * @param {Object} props
 * @param {Array} [props.uploads] - Custom uploads array
 * @param {Function} [props.onView] - View callback
 * @param {Function} [props.onDelete] - Delete callback
 */
const UploadHistoryTable = ({
  uploads: initialPropsUploads,
  onView,
  onDelete
}) => {
  const [uploads, setUploads] = useState(initialPropsUploads || INITIAL_UPLOADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');
  const [selectedItem, setSelectedItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Categories list
  const categories = [
    'All',
    'Cloud & Hosting',
    'Software / SaaS',
    'Streaming & Media',
    'AI Tools',
    'Productivity',
    'Uncategorized'
  ];

  // Statuses list
  const statuses = ['All', 'Completed', 'Processing', 'Failed'];

  // Trigger temporary toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered & Sorted uploads list
  const filteredUploads = useMemo(() => {
    return uploads
      .filter((item) => {
        const matchesSearch =
          item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.merchantCategory.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCat =
          selectedCategory === 'All' || item.merchantCategory === selectedCategory;

        const matchesStatus =
          selectedStatus === 'All' || item.status === selectedStatus;

        return matchesSearch && matchesCat && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') {
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        }
        if (sortBy === 'date-asc') {
          return new Date(a.uploadDate) - new Date(b.uploadDate);
        }
        if (sortBy === 'amount-desc') {
          return b.amountUSD - a.amountUSD;
        }
        if (sortBy === 'amount-asc') {
          return a.amountUSD - b.amountUSD;
        }
        return 0;
      });
  }, [uploads, searchQuery, selectedCategory, selectedStatus, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredUploads.length / itemsPerPage) || 1;
  const paginatedUploads = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUploads.slice(start, start + itemsPerPage);
  }, [filteredUploads, currentPage, itemsPerPage]);

  // Action Handlers
  const handleView = (item) => {
    setSelectedItem(item);
    if (onView) onView(item);
  };

  const handleDownload = (item) => {
    showToast(`Downloading receipt "${item.fileName}"...`);
  };

  const handleDelete = (id, fileName) => {
    setUploads((prev) => prev.filter((u) => u.id !== id));
    showToast(`Deleted receipt "${fileName}"`);
    if (onDelete) onDelete(id);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStatus('All');
    setSortBy('date-desc');
    setCurrentPage(1);
  };

  return (
    <div className="w-full space-y-4">
      {/* Toast Alert Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 rounded-xl bg-blue-600/90 text-white border border-blue-400/50 shadow-lg text-xs font-semibold flex items-center justify-between"
          >
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-white hover:opacity-80">
              <FiX className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table Top Controls & Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by file name, merchant, or category..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <FiX className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Category Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 rounded-xl px-3 py-1.5">
            <FiTag className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900 text-white">
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 rounded-xl px-3 py-1.5">
            <FiFilter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              {statuses.map((st) => (
                <option key={st} value={st} className="bg-slate-900 text-white">
                  {st === 'All' ? 'All Statuses' : st}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 rounded-xl px-3 py-1.5">
            <FiClock className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="date-desc" className="bg-slate-900 text-white">Newest First</option>
              <option value="date-asc" className="bg-slate-900 text-white">Oldest First</option>
              <option value="amount-desc" className="bg-slate-900 text-white">Amount: High to Low</option>
              <option value="amount-asc" className="bg-slate-900 text-white">Amount: Low to High</option>
            </select>
          </div>

          {/* Reset Filters */}
          {(searchQuery || selectedCategory !== 'All' || selectedStatus !== 'All') && (
            <button
              onClick={handleResetFilters}
              className="px-2.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-medium transition-colors"
              title="Reset all filters"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Upload History Data Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="bg-slate-800/60 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">File Name & Icon</th>
                <th className="py-3.5 px-4">Merchant Name</th>
                <th className="py-3.5 px-4">Amount (USD / INR)</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Upload Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-800/70 text-slate-300">
              {paginatedUploads.length > 0 ? (
                paginatedUploads.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-800/50 transition-colors group"
                  >
                    {/* File Name & Icon */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                          <FiFileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-white truncate group-hover:text-cyan-300 transition-colors max-w-[180px] sm:max-w-[220px]">
                            {item.fileName}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {item.fileSize} • {item.fileType.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Merchant Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2 font-medium text-slate-200">
                        <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700">
                          <RenderMerchantIcon merchantName={item.merchantName} />
                        </div>
                        <span>{item.merchantName}</span>
                      </div>
                    </td>

                    {/* Amount USD & INR */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-emerald-400">
                        ${item.amountUSD.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        ₹{item.amountINR.toLocaleString()}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700/80 text-[11px] font-medium text-slate-300">
                        {item.merchantCategory}
                      </span>
                    </td>

                    {/* Upload Date */}
                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                      {item.formattedDate}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      {item.status === 'Completed' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          <FiCheckCircle className="w-3.5 h-3.5" /> Completed
                        </span>
                      )}
                      {item.status === 'Processing' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 animate-pulse">
                          <FiRefreshCw className="w-3.5 h-3.5 animate-spin" /> Processing
                        </span>
                      )}
                      {item.status === 'Failed' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                          <FiAlertTriangle className="w-3.5 h-3.5" /> Failed
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Button */}
                        <button
                          onClick={() => handleView(item)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 border border-slate-700 transition-colors"
                          title="View receipt details"
                        >
                          <FiEye className="w-3.5 h-3.5" />
                        </button>

                        {/* Download Button */}
                        <button
                          onClick={() => handleDownload(item)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 border border-slate-700 transition-colors"
                          title="Download receipt"
                        >
                          <FiDownload className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(item.id, item.fileName)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors"
                          title="Delete upload"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-500">
                    <div className="space-y-3">
                      <HiOutlineCloudUpload className="w-10 h-10 mx-auto text-slate-600" />
                      <div className="text-sm font-semibold text-slate-300">
                        No receipt uploads match your filter criteria
                      </div>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Try adjusting your search terms or clearing category filters.
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            Showing{' '}
            <strong className="text-white">
              {filteredUploads.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}
            </strong>{' '}
            to{' '}
            <strong className="text-white">
              {Math.min(currentPage * itemsPerPage, filteredUploads.length)}
            </strong>{' '}
            of <strong className="text-white">{filteredUploads.length}</strong> receipt uploads
          </div>

          {/* Page Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-slate-800 disabled:opacity-40 text-slate-300 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 font-semibold text-white bg-slate-800 rounded-lg border border-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1.5 rounded-lg bg-slate-800 disabled:opacity-40 text-slate-300 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Receipt View Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg p-6 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <FiFileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedItem.fileName}</h3>
                    <p className="text-xs text-slate-400">
                      ID: {selectedItem.id} • {selectedItem.fileSize}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-800">
                  <div className="text-slate-400">Merchant Name</div>
                  <div className="font-bold text-white mt-0.5">{selectedItem.merchantName}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-800">
                  <div className="text-slate-400">Category</div>
                  <div className="font-bold text-cyan-300 mt-0.5">{selectedItem.merchantCategory}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-800">
                  <div className="text-slate-400">Total Amount</div>
                  <div className="font-bold text-emerald-400 text-sm mt-0.5">
                    ${selectedItem.amountUSD.toFixed(2)} (₹{selectedItem.amountINR.toLocaleString()})
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-800">
                  <div className="text-slate-400">Status</div>
                  <div className="font-semibold text-white mt-0.5">{selectedItem.status}</div>
                </div>
              </div>

              {/* Failure details if failed */}
              {selectedItem.status === 'Failed' && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                  <FiAlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-rose-200">Processing Error:</strong>
                    {selectedItem.failureReason}
                  </div>
                </div>
              )}

              {/* Extracted Line Items Breakdown */}
              {selectedItem.lineItems && selectedItem.lineItems.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Extracted Line Items
                  </h4>
                  <div className="space-y-1 bg-slate-950/60 p-3 rounded-xl border border-slate-800 max-h-36 overflow-y-auto">
                    {selectedItem.lineItems.map((line, idx) => (
                      <div key={idx} className="flex justify-between text-xs py-1 border-b border-slate-800/60 last:border-0">
                        <span className="text-slate-300 font-medium">{line.name}</span>
                        <span className="text-emerald-400 font-mono">${line.priceUSD.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => handleDownload(selectedItem)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                >
                  <FiDownload className="w-3.5 h-3.5" /> Download File
                </button>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadHistoryTable;
