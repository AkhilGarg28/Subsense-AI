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

const DashboardPage = () => {
  const [timeFilter, setTimeFilter] = useState('This Month');
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

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

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="app-page page-stack">
      <section className="page-hero p-6 sm:p-8 lg:p-10">
        <div className="relative z-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.12] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-primary">
                <HiOutlineSparkles className="h-4 w-4" />
                {mockDashboardData.user.plan}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-bold text-text-secondary">
                Updated just now
              </span>
            </div>
            <h1 className="section-title">Autonomous Portfolio Summary</h1>
            <p className="section-subtitle mt-3 max-w-2xl">
              Real-time audit of recurring spend, upcoming renewals, financial health, and AI savings recommendations.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row xl:justify-end">
            <div className="flex rounded-2xl border border-white/10 bg-background/50 p-1">
              {['This Month', 'Last 3 Months', 'Year to Date'].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setTimeFilter(filter)}
                  className={`min-h-11 rounded-xl px-4 text-sm font-extrabold transition-all ${
                    timeFilter === filter
                      ? 'gradient-primary text-white shadow-glow-blue'
                      : 'text-text-secondary hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleToggleLoading}
              className="btn-secondary shrink-0"
              title="Test loading skeleton"
            >
              <HiOutlineRefresh className="h-4 w-4 text-primary" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-8 border-t border-white/10 pt-6">
          <QuickActions />
        </div>
      </section>

      <section className="kpi-grid">
        <StatCard
          title="Monthly Spending"
          value={currentMetrics.spending.value}
          icon={HiOutlineCurrencyDollar}
          trend={currentMetrics.spending.trend}
          trendDirection="up"
          isPositiveGood={false}
          sparklineData={currentMetrics.spending.sparkline}
          sparklineColor="#5B8CFF"
          badgeText={`vs ${timeFilter.toLowerCase()}`}
          iconBgColor="bg-primary/[0.15] text-primary"
        />

        <StatCard
          title="Active Subscriptions"
          value={currentMetrics.subscriptions.value}
          icon={HiOutlineCreditCard}
          trend={currentMetrics.subscriptions.trend}
          trendDirection="up"
          isPositiveGood={true}
          sparklineData={currentMetrics.subscriptions.sparkline}
          sparklineColor="#22C55E"
          badgeText="in auto-detect"
          iconBgColor="bg-success/[0.15] text-success"
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
          iconBgColor="bg-warning/[0.15] text-warning"
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
          iconBgColor="bg-secondary/[0.15] text-secondary"
        />
      </section>

      <AIInsightsPanel />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <HealthScoreCard
          score={92}
          maxScore={100}
          statusBadge="Excellent"
          suggestions={[
            {
              id: 'h-sug-1',
              title: 'Low subscription waste',
              description: '92% of active subscriptions show regular monthly usage.',
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
              title: 'Switch Spotify to annual',
              description: 'Switching saves 16% on annual billing.',
              savings: 'Save $24.00/yr',
              badge: 'Quick Win',
              actionText: 'Switch',
            },
          ]}
          className="xl:col-span-5"
        />

        <ExpenseChart
          data={mockDashboardData.expenseHistory}
          timeFilter={timeFilter}
          className="xl:col-span-7"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <CategoryChart
          data={mockDashboardData.categoryBreakdown}
          title="Expense Category Breakdown"
          className="xl:col-span-6"
        />

        <div className="xl:col-span-6">
          <BillsList bills={mockDashboardData.upcomingBills} />
        </div>
      </section>

      <SubscriptionsTable subscriptions={mockDashboardData.subscriptions} />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-6">
          <RecommendationCard recommendations={mockDashboardData.aiRecommendations} />
        </div>

        <div className="xl:col-span-6">
          <ActivityTimeline activities={mockDashboardData.recentActivity} />
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;

