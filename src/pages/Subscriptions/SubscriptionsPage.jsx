import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCreditCard,
  FiUploadCloud,
  FiRefreshCw,
  FiDollarSign,
  FiAlertCircle,
  FiCheckCircle,
  FiToggleLeft,
  FiToggleRight,
} from 'react-icons/fi';
import { HiOutlineSparkles as FiSparkles } from 'react-icons/hi';
import {
  SummaryCard,
  SearchBar,
  FilterPanel,
  SubscriptionCard,
  SubscriptionTable,
  SubscriptionModal,
  InsightsPanel,
  RenewalCalendar,
  StatisticsCharts,
  SubscriptionsEmptyState,
  SubscriptionsSkeleton,
} from '../../components/subscriptions';
import { mockSubscriptionsData } from '../../data/mockSubscriptionsData';

/**
 * SubscriptionsPage — SubSense AI Subscription Management Dashboard Page
 *
 * Full responsive dashboard assembling:
 * 1. Page Header with Title, Subtitle, Currency mode, Upload CTA, & Simulated Empty State toggle
 * 2. 4 Summary Metric Cards Grid
 * 3. AI Recommendations Insights Panel & Renewal Calendar Grid
 * 4. Search, Status & Category Filter, Sort, and View Mode Controls bar
 * 5. Subscription Grid Cards / Subscription Table List view with active filtering
 * 6. Interactive Subscription Details & Manage Modal
 * 7. Recharts Monthly Spending Trend & Category Distribution Statistics Section
 */
const SubscriptionsPage = () => {
  // Main Data State
  const [subscriptions, setSubscriptions] = useState(
    mockSubscriptionsData.subscriptions
  );
  const [summary, setSummary] = useState(mockSubscriptionsData.summary);

  // Filter & View State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('highest-cost');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [currency, setCurrency] = useState('USD'); // 'USD' | 'INR'

  // Modal State
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Testing & Demo Toggles
  const [simulateEmptyState, setSimulateEmptyState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Toast Feedback State
  const [toastMessage, setToastMessage] = useState(null);

  // Helper to trigger toast notifications
  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Toggle currency between USD and INR
  const handleCurrencyToggle = () => {
    const nextCurrency = currency === 'USD' ? 'INR' : 'USD';
    setCurrency(nextCurrency);
    showToast(`Switched currency display to ${nextCurrency}`, 'info');
  };

  // Filter & Sort Logic
  const filteredSubscriptions = useMemo(() => {
    if (simulateEmptyState) return [];

    let result = [...subscriptions];

    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (sub) =>
          sub.name?.toLowerCase().includes(q) ||
          sub.merchant?.toLowerCase().includes(q) ||
          sub.category?.toLowerCase().includes(q) ||
          sub.paymentMethod?.toLowerCase().includes(q)
      );
    }

    // 2. Status Filter
    if (selectedStatus && selectedStatus !== 'All') {
      result = result.filter(
        (sub) => sub.status?.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    // 3. Category Filter
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(
        (sub) => sub.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 4. Sort Logic
    result.sort((a, b) => {
      if (selectedSort === 'highest-cost') {
        const valA = currency === 'INR' ? a.costINR || 0 : a.costUSD || 0;
        const valB = currency === 'INR' ? b.costINR || 0 : b.costUSD || 0;
        return valB - valA;
      }
      if (selectedSort === 'lowest-cost') {
        const valA = currency === 'INR' ? a.costINR || 0 : a.costUSD || 0;
        const valB = currency === 'INR' ? b.costINR || 0 : b.costUSD || 0;
        return valA - valB;
      }
      if (selectedSort === 'alphabetical') {
        return (a.name || '').localeCompare(b.name || '');
      }
      if (selectedSort === 'renewal-date') {
        const dateA = a.renewalRaw ? new Date(a.renewalRaw) : new Date(8640000000000000);
        const dateB = b.renewalRaw ? new Date(b.renewalRaw) : new Date(8640000000000000);
        return dateA - dateB;
      }
      return 0;
    });

    return result;
  }, [
    subscriptions,
    searchQuery,
    selectedStatus,
    selectedCategory,
    selectedSort,
    currency,
    simulateEmptyState,
  ]);

  // Action Handlers
  const handleOpenModal = (sub) => {
    setSelectedSubscription(sub);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubscription(null);
  };

  const handlePauseSub = (sub) => {
    setSubscriptions((prev) =>
      prev.map((item) =>
        item.id === sub.id ? { ...item, status: 'Paused', statusType: 'warning' } : item
      )
    );
    showToast(`Paused subscription: ${sub.name}`, 'warning');
  };

  const handleResumeSub = (sub) => {
    setSubscriptions((prev) =>
      prev.map((item) =>
        item.id === sub.id ? { ...item, status: 'Active', statusType: 'success' } : item
      )
    );
    showToast(`Resumed subscription: ${sub.name}`, 'success');
  };

  const handleCancelSub = (sub) => {
    setSubscriptions((prev) =>
      prev.map((item) =>
        item.id === sub.id ? { ...item, status: 'Cancelled', statusType: 'danger' } : item
      )
    );
    showToast(`Cancelled subscription: ${sub.name}`, 'danger');
  };

  const handleInsightAction = (insight) => {
    showToast(`Executed AI action: ${insight.title}`, 'success');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All');
    setSelectedCategory('All');
    setSelectedSort('highest-cost');
    setSimulateEmptyState(false);
    showToast('Reset all filters to default', 'info');
  };

  const toggleSimulatedLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="app-page page-stack">
      {/* Toast Feedback Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/95 px-4 py-3 shadow-2xl backdrop-blur-xl"
          >
            {toastMessage.type === 'success' && <FiCheckCircle className="h-5 w-5 text-emerald-400" />}
            {toastMessage.type === 'warning' && <FiAlertCircle className="h-5 w-5 text-amber-400" />}
            {toastMessage.type === 'danger' && <FiAlertCircle className="h-5 w-5 text-rose-400" />}
            {toastMessage.type === 'info' && <FiSparkles className="h-5 w-5 text-blue-400" />}
            <span className="text-xs font-semibold text-slate-200">{toastMessage.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header Section */}
      <div className="page-hero p-6 sm:p-8 lg:p-10 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-4">
          <div className="gradient-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-glow-blue">
            <FiCreditCard className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="section-title">
                Subscription Management
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-bold text-blue-400 border border-blue-500/20">
                <FiSparkles className="h-3 w-3" />
                AI Powered
              </span>
            </div>
            <p className="section-subtitle mt-2 max-w-2xl">
              Track, optimize, and cancel recurring debits with AI recommendations
            </p>
          </div>
        </div>

        {/* Action Controls & Demo Options */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Currency Toggle */}
          <button
            type="button"
            onClick={handleCurrencyToggle}
            className="btn-secondary"
            title="Toggle USD / INR Currency"
          >
            <FiDollarSign className="h-3.5 w-3.5 text-emerald-400" />
            <span>{currency} Mode</span>
          </button>

          {/* Simulate Skeleton Loader */}
          <button
            type="button"
            onClick={toggleSimulatedLoading}
            className="btn-secondary"
            title="Simulate Skeleton Loading"
          >
            <FiRefreshCw className="h-3.5 w-3.5 text-blue-400" />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>

          {/* Simulate Empty State Toggle */}
          <button
            type="button"
            onClick={() => setSimulateEmptyState(!simulateEmptyState)}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
              simulateEmptyState
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Simulated Empty State"
          >
            {simulateEmptyState ? (
              <FiToggleRight className="h-4 w-4 text-amber-400" />
            ) : (
              <FiToggleLeft className="h-4 w-4 text-slate-500" />
            )}
            <span>Empty State Demo</span>
          </button>

          {/* Upload Receipt Primary Action */}
          <Link
            to="/upload"
            className="btn-primary"
          >
            <FiUploadCloud className="h-4 w-4" />
            <span>Upload Receipt</span>
          </Link>
        </div>
      </div>

      {/* 1. Summary Cards Grid */}
      <SummaryCard
        summary={summary}
        currency={currency}
        onCurrencyToggle={handleCurrencyToggle}
      />

      {/* 2. AI Insights Panel & Renewal Calendar Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <InsightsPanel
            insights={mockSubscriptionsData.aiInsights}
            onAction={handleInsightAction}
          />
        </div>
        <div>
          <RenewalCalendar
            renewals={mockSubscriptionsData.renewalCalendar}
            onReminderClick={(item) =>
              showToast(`Reminder set for ${item.name} on ${item.date}`, 'success')
            }
          />
        </div>
      </div>

      {/* 3. Search, Filter & Sort Controls Section */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="w-full md:w-80">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClearSearch={() => setSearchQuery('')}
            />
          </div>
          <div className="w-full md:flex-1">
            <FilterPanel
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedSort={selectedSort}
              onSortChange={setSelectedSort}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              currency={currency}
              onCurrencyToggle={handleCurrencyToggle}
            />
          </div>
        </div>

        {/* Active Filters Summary Bar */}
        {(searchQuery || selectedStatus !== 'All' || selectedCategory !== 'All') && (
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs text-slate-400 backdrop-blur-md">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-300">Active Filters:</span>
              {searchQuery && (
                <span className="rounded-lg bg-blue-500/10 px-2 py-0.5 text-blue-400 border border-blue-500/20">
                  Search: &quot;{searchQuery}&quot;
                </span>
              )}
              {selectedStatus !== 'All' && (
                <span className="rounded-lg bg-emerald-500/10 px-2 py-0.5 text-emerald-400 border border-emerald-500/20">
                  Status: {selectedStatus}
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="rounded-lg bg-purple-500/10 px-2 py-0.5 text-purple-400 border border-purple-500/20">
                  Category: {selectedCategory}
                </span>
              )}
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-blue-400 hover:text-blue-300 underline font-medium"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* 4. Main Subscription Cards / Table View or Empty State */}
      {isLoading ? (
        <SubscriptionsSkeleton viewMode={viewMode} cardCount={6} />
      ) : simulateEmptyState || filteredSubscriptions.length === 0 ? (
        <SubscriptionsEmptyState
          isFilteredState={!simulateEmptyState && (Boolean(searchQuery) || selectedStatus !== 'All' || selectedCategory !== 'All')}
          onResetFilters={handleResetFilters}
        />
      ) : viewMode === 'table' ? (
        <SubscriptionTable
          subscriptions={filteredSubscriptions}
          onViewDetails={handleOpenModal}
          onPause={handlePauseSub}
          onResume={handleResumeSub}
          onCancel={handleCancelSub}
          currencyMode={currency}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredSubscriptions.map((sub) => (
            <SubscriptionCard
              key={sub.id}
              subscription={sub}
              onViewDetails={handleOpenModal}
              onPause={handlePauseSub}
              onResume={handleResumeSub}
              onCancel={handleCancelSub}
              currencyMode={currency}
            />
          ))}
        </div>
      )}

      {/* 5. Recharts Statistics Section */}
      <div className="pt-2">
        <StatisticsCharts
          statistics={mockSubscriptionsData.statistics}
          currency={currency}
        />
      </div>

      {/* 6. Interactive Details & Manage Modal */}
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        subscription={selectedSubscription}
        onPause={handlePauseSub}
        onResume={handleResumeSub}
        onCancel={handleCancelSub}
        currencyMode={currency}
      />
    </div>
  );
};

export default SubscriptionsPage;

