import React, { useState } from 'react';
import {
  HiOutlineCurrencyDollar,
  HiOutlineCreditCard,
  HiOutlineCalendar,
  HiOutlineSparkles,
  HiOutlineRefresh,
} from 'react-icons/hi';
import { mockDashboardData } from '../../data/mockDashboardData';
import {
  StatCard,
  HealthScoreCard,
  AIInsightsPanel,
  ExpenseChart,
  CategoryChart,
  BillsList,
  SubscriptionsTable,
  RecommendationCard,
  ActivityTimeline,
  QuickActions,
  DashboardSkeleton,
} from '../../components/dashboard';

/**
 * DashboardPage — Core dashboard overview page for SubSense AI.
 * Assembles all analytical modules, AI Insights hero card, quick action bar, charts,
 * subscriptions table, AI recommendations, and activity timeline into a modern responsive layout.
 */
const DashboardPage = () => {
  // State for Time Filter ('This Month' | 'Last 3 Months' | 'Year to Date')
  const [timeFilter, setTimeFilter] = useState('This Month');

  // State for simulated skeleton loading state
  const [isLoading, setIsLoading] = useState(false);

  // Toggle simulated loading for testing skeletons
  const handleToggleLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  // Adjust metrics data dynamically based on selected time filter
  const getFilteredMetrics = () => {
    switch (timeFilter) {
      case 'Last 3 Months':
        return {
          spending: {
            value: '$3,820.00',
            trend: '+8.6%',
            sparkline: [1100, 1180, 1248, 1290, 1310, 1382],
          },
          subscriptions: {
            value: '16 Active',
            trend: '+4',
            sparkline: [12, 13, 14, 15, 15, 16],
          },
          upcomingBills: {
            value: '$1,150.00',
            trend: '-2.1%',
            sparkline: [410, 390, 420, 380, 395, 384],
          },
          savingsOpportunity: {
            value: '$1,020.00/yr',
            trend: '+24.2%',
            sparkline: [280, 450, 620, 780, 910, 1020],
          },
        };
      case 'Year to Date':
        return {
          spending: {
            value: '$8,450.00',
            trend: '+14.2%',
            sparkline: [950, 1020, 1180, 1050, 1120, 1248, 1310, 1580],
          },
          subscriptions: {
            value: '18 Total',
            trend: '+6',
            sparkline: [10, 12, 13, 14, 15, 18],
          },
          upcomingBills: {
            value: '$2,410.00',
            trend: '-4.8%',
            sparkline: [420, 400, 390, 410, 384, 406],
          },
          savingsOpportunity: {
            value: '$2,850.00/yr',
            trend: '+31.0%',
            sparkline: [500, 900, 1400, 1800, 2300, 2850],
          },
        };
      case 'This Month':
      default:
        return {
          spending: {
            value: mockDashboardData.metrics.monthlySpending.formatted,
            trend: `+${mockDashboardData.metrics.monthlySpending.trend}%`,
            sparkline: mockDashboardData.metrics.monthlySpending.sparkline,
          },
          subscriptions: {
            value: mockDashboardData.metrics.activeSubscriptions.formatted,
            trend: `+${mockDashboardData.metrics.activeSubscriptions.trend}`,
            sparkline: mockDashboardData.metrics.activeSubscriptions.sparkline,
          },
          upcomingBills: {
            value: mockDashboardData.metrics.upcomingBills.formatted,
            trend: `${mockDashboardData.metrics.upcomingBills.trend}%`,
            sparkline: mockDashboardData.metrics.upcomingBills.sparkline,
          },
          savingsOpportunity: {
            value: mockDashboardData.metrics.savingsOpportunity.formatted,
            trend: `+${mockDashboardData.metrics.savingsOpportunity.trend}%`,
            sparkline: mockDashboardData.metrics.savingsOpportunity.sparkline,
          },
        };
    }
  };

  const currentMetrics = getFilteredMetrics();

  // If loading skeleton state is active, render DashboardSkeleton
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6 w-full animate-fade-in pb-8">
      {/* Top Header Greeting Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-glass-border bg-glass p-6 backdrop-blur-xl shadow-glass">
        {/* Glow Accent Circles */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative z-10 space-y-6">
          {/* Header Title & Controls Row */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-black tracking-tight text-text-primary sm:text-3xl">
                  Good Evening, {mockDashboardData.user.name.split(' ')[0]}! 👋
                </h1>
                <span className="hidden rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:inline-block">
                  {mockDashboardData.user.plan}
                </span>
              </div>
              <p className="mt-1 text-sm text-text-secondary">
                Your autonomous AI copilot has audited your financial activity.
              </p>
            </div>

            {/* Controls Bar: Time Filter & Skeleton Simulator */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Time Filter Pills */}
              <div className="flex items-center rounded-xl border border-slate-700/80 bg-slate-900/90 p-1 backdrop-blur-md shadow-inner">
                {['This Month', 'Last 3 Months', 'Year to Date'].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setTimeFilter(filter)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                      timeFilter === filter
                        ? 'bg-primary text-white shadow-md'
                        : 'text-text-muted hover:text-text-primary hover:bg-slate-800/60'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Skeleton Loading Simulator Button */}
              <button
                type="button"
                onClick={handleToggleLoading}
                className="flex items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-900/90 px-3 py-2 text-xs font-semibold text-text-secondary transition-all hover:border-primary/40 hover:bg-slate-800 hover:text-white"
                title="Test smooth shimmering loading skeletons"
              >
                <HiOutlineRefresh className="h-3.5 w-3.5 text-primary" />
                <span className="hidden sm:inline">Simulate Loading</span>
              </button>
            </div>
          </div>

          {/* Embedded QuickActions Bar */}
          <div className="pt-2 border-t border-glass-border">
            <QuickActions />
          </div>
        </div>
      </div>

      {/* 4 StatCards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Monthly Spending"
          value={currentMetrics.spending.value}
          icon={HiOutlineCurrencyDollar}
          trend={currentMetrics.spending.trend}
          trendDirection="up"
          isPositiveGood={false}
          sparklineData={currentMetrics.spending.sparkline}
          sparklineColor="#3B82F6"
          badgeText={`vs ${timeFilter.toLowerCase()}`}
          iconBgColor="bg-blue-500/15 text-blue-400"
        />

        <StatCard
          title="Active Subscriptions"
          value={currentMetrics.subscriptions.value}
          icon={HiOutlineCreditCard}
          trend={currentMetrics.subscriptions.trend}
          trendDirection="up"
          isPositiveGood={true}
          sparklineData={currentMetrics.subscriptions.sparkline}
          sparklineColor="#10B981"
          badgeText="in auto-detect"
          iconBgColor="bg-emerald-500/15 text-emerald-400"
        />

        <StatCard
          title="Upcoming Bills"
          value={currentMetrics.upcomingBills.value}
          icon={HiOutlineCalendar}
          trend={currentMetrics.upcomingBills.trend}
          trendDirection="down"
          isPositiveGood={true}
          sparklineData={currentMetrics.upcomingBills.sparkline}
          sparklineColor="#F59E0B"
          badgeText="due in 14 days"
          iconBgColor="bg-amber-500/15 text-amber-400"
        />

        <StatCard
          title="Savings Opportunity"
          value={currentMetrics.savingsOpportunity.value}
          icon={HiOutlineSparkles}
          trend={currentMetrics.savingsOpportunity.trend}
          trendDirection="up"
          isPositiveGood={true}
          sparklineData={currentMetrics.savingsOpportunity.sparkline}
          sparklineColor="#8B5CF6"
          badgeText="identified by AI"
          iconBgColor="bg-purple-500/15 text-purple-400"
        />
      </div>

      {/* Hero Central AI Insights Panel */}
      <div className="w-full">
        <AIInsightsPanel />
      </div>

      {/* Row 1: HealthScoreCard + ExpenseChart */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 flex flex-col">
          <HealthScoreCard
            score={92}
            maxScore={100}
            statusBadge="Excellent"
            suggestions={[
              {
                id: 'h-sug-1',
                title: 'Low subscription waste',
                description: '92% of your active subscriptions show regular monthly usage.',
                savings: 'Optimal',
                badge: 'Healthy',
                actionText: 'View Report',
              },
              {
                id: 'h-sug-2',
                title: 'Cancel unused Canva seat',
                description: '0 logins detected in last 45 days.',
                savings: 'Save $79.99/mo',
                badge: 'Unused Sub',
                actionText: 'Cancel',
              },
              {
                id: 'h-sug-3',
                title: 'Switch Spotify to Annual Plan',
                description: 'Switching saves 16% on annual billing.',
                savings: 'Save $24.00/yr',
                badge: 'Quick Win',
                actionText: 'Switch',
              },
            ]}
            className="h-full"
          />
        </div>

        <div className="lg:col-span-2 flex flex-col">
          <ExpenseChart
            data={mockDashboardData.expenseHistory}
            timeFilter={timeFilter}
            className="h-full"
          />
        </div>
      </div>

      {/* Row 2: CategoryChart + BillsList */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CategoryChart
          data={mockDashboardData.categoryBreakdown}
          title="Expense Category Breakdown"
        />

        <BillsList
          bills={mockDashboardData.upcomingBills}
        />
      </div>

      {/* Row 3: SubscriptionsTable Section */}
      <div className="w-full">
        <SubscriptionsTable
          subscriptions={mockDashboardData.subscriptions}
        />
      </div>

      {/* Row 4: AI Recommendations + ActivityTimeline Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecommendationCard
          recommendations={mockDashboardData.aiRecommendations}
        />

        <ActivityTimeline
          activities={mockDashboardData.recentActivity}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
