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

const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState(
    mockSubscriptionsData.subscriptions
  );
  const [summary] = useState(mockSubscriptionsData.summary);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('highest-cost');
  const [viewMode, setViewMode] = useState('grid');
  const [currency, setCurrency] = useState('USD');

  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [simulateEmptyState, setSimulateEmptyState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleCurrencyToggle = () => {
    const nextCurrency = currency === 'USD' ? 'INR' : 'USD';
    setCurrency(nextCurrency);
    showToast(`Switched currency display to ${nextCurrency}`, 'info');
  };

  const filteredSubscriptions = useMemo(() => {
    if (simulateEmptyState) return [];

    let result = [...subscriptions];

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

    if (selectedStatus && selectedStatus !== 'All') {
      result = result.filter(
        (sub) => sub.status?.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(
        (sub) => sub.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

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
    }, 1200);
  };

  return (
    <div className="space-y-6 w-full animate-fade-in pb-12">
      {/* Toast Feedback Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#171F2F]/95 px-4 py-3 shadow-2xl backdrop-blur-xl"
          >
            {toastMessage.type === 'success' && <FiCheckCircle className="h-5 w-5 text-[#22C55E]" />}
            {toastMessage.type === 'warning' && <FiAlertCircle className="h-5 w-5 text-[#F59E0B]" />}
            {toastMessage.type === 'danger' && <FiAlertCircle className="h-5 w-5 text-[#EF4444]" />}
            {toastMessage.type === 'info' && <FiSparkles className="h-5 w-5 text-[#5B8CFF]" />}
            <span className="text-xs font-semibold text-white">{toastMessage.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Control Banner */}
      <div className="rounded-[20px] border border-white/10 bg-[#171F2F]/90 p-6 sm:p-8 backdrop-blur-2xl flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="gradient-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-glow-blue">
            <FiCreditCard className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Subscription Portfolio
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#5B8CFF]/15 px-3 py-1 text-xs font-mono font-bold text-[#5B8CFF] border border-[#5B8CFF]/30">
                <FiSparkles className="h-3.5 w-3.5" />
                AI Auto-Detect
              </span>
            </div>
            <p className="mt-1 text-sm text-[#A1A8B5] max-w-2xl leading-relaxed">
              Track, optimize, and cancel recurring debits with automated AI savings intelligence.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
          <button
            type="button"
            onClick={handleCurrencyToggle}
            className="btn-secondary"
            title="Toggle USD / INR Currency"
          >
            <FiDollarSign className="h-4 w-4 text-[#22C55E]" />
            <span>{currency} Mode</span>
          </button>

          <button
            type="button"
            onClick={toggleSimulatedLoading}
            className="btn-secondary"
            title="Simulate Skeleton Loading"
          >
            <FiRefreshCw className="h-4 w-4 text-[#5B8CFF]" />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>

          <button
            type="button"
            onClick={() => setSimulateEmptyState(!simulateEmptyState)}
            className={`flex items-center gap-1.5 rounded-[14px] border px-3.5 py-3 text-xs font-bold transition-all ${
              simulateEmptyState
                ? 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40'
                : 'border-white/10 bg-[#121A2F] text-[#A1A8B5] hover:text-white'
            }`}
            title="Toggle Simulated Empty State"
          >
            {simulateEmptyState ? (
              <FiToggleRight className="h-4 w-4 text-[#F59E0B]" />
            ) : (
              <FiToggleLeft className="h-4 w-4 text-[#64748B]" />
            )}
            <span>Empty State Demo</span>
          </button>

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
        <div className="xl:col-span-4">
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
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#171F2F] px-4 py-2.5 text-xs text-[#A1A8B5] font-mono">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-white">Active Filters:</span>
              {searchQuery && (
                <span className="rounded-lg bg-[#5B8CFF]/15 px-2 py-0.5 text-[#5B8CFF] border border-[#5B8CFF]/30">
                  Search: &quot;{searchQuery}&quot;
                </span>
              )}
              {selectedStatus !== 'All' && (
                <span className="rounded-lg bg-[#22C55E]/15 px-2 py-0.5 text-[#22C55E] border border-[#22C55E]/30">
                  Status: {selectedStatus}
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="rounded-lg bg-[#8B5CF6]/15 px-2 py-0.5 text-[#8B5CF6] border border-[#8B5CF6]/30">
                  Category: {selectedCategory}
                </span>
              )}
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-[#5B8CFF] hover:underline font-bold cursor-pointer"
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
