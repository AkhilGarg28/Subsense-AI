import React, { useState, useEffect } from 'react';
import {
  HiOutlineCurrencyDollar,
  HiOutlineCreditCard,
  HiOutlineCalendar,
  HiOutlineSparkles,
  HiOutlineRefresh,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';
import { dashboardAPI } from '../../services/api';
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

// Fallback static data for empty database state
const FALLBACK_METRICS = {
  spending: { value: '$0.00', trend: '0%', sparkline: [0, 0, 0, 0, 0, 0] },
  subscriptions: { value: '0 Active', trend: '+0', sparkline: [0, 0, 0, 0, 0, 0] },
  upcomingBills: { value: '$0.00', trend: '0%', sparkline: [0, 0, 0, 0, 0, 0] },
  savingsOpportunity: { value: '$0.00/yr', trend: '+0%', sparkline: [0, 0, 0, 0, 0, 0] },
};

const DashboardPage = () => {
  const [timeFilter, setTimeFilter] = useState('This Month');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Live data from API
  const [dashboardData, setDashboardData] = useState(null);
  const [healthScore, setHealthScore] = useState(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [summaryRes, healthRes] = await Promise.allSettled([
        dashboardAPI.getSummary(),
        dashboardAPI.getHealthScore(),
      ]);

      if (summaryRes.status === 'fulfilled') {
        setDashboardData(summaryRes.value.data?.data || summaryRes.value.data || null);
      }
      if (healthRes.status === 'fulfilled') {
        setHealthScore(healthRes.value.data?.data || healthRes.value.data || null);
      }
    } catch (err) {
      console.error('[Dashboard] Fetch error:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Build metrics from live API data
  const getLiveMetrics = () => {
    if (!dashboardData) return FALLBACK_METRICS;

    const summary = dashboardData.summary || {};
    const monthlySpending = dashboardData.monthlySpending || [];
    const latestMonth = monthlySpending[monthlySpending.length - 1];
    const prevMonth = monthlySpending[monthlySpending.length - 2];

    const currentMonthSpend = latestMonth?.totalAmount || 0;
    const prevMonthSpend = prevMonth?.totalAmount || currentMonthSpend;
    const spendTrend = prevMonthSpend > 0
      ? (((currentMonthSpend - prevMonthSpend) / prevMonthSpend) * 100).toFixed(1)
      : '0.0';

    const sparklineData = monthlySpending.slice(-6).map((m) => m.totalAmount || 0);

    return {
      spending: {
        value: `$${currentMonthSpend.toFixed(2)}`,
        trend: `${spendTrend >= 0 ? '+' : ''}${spendTrend}%`,
        sparkline: sparklineData.length ? sparklineData : [0, 0, 0, 0, 0, currentMonthSpend],
      },
      subscriptions: {
        value: `${summary.totalSpentAllTime !== undefined ? 'See Subscriptions' : 'N/A'}`,
        trend: '+0',
        sparkline: [0, 0, 0, 0, 0, 0],
      },
      upcomingBills: {
        value: `$${(summary.averageMonthlyExpense || 0).toFixed(2)}`,
        trend: '0%',
        sparkline: sparklineData.length ? sparklineData : [0, 0, 0, 0, 0, 0],
      },
      savingsOpportunity: {
        value: `$${((summary.totalSpentAllTime || 0) * 0.1).toFixed(2)}/yr`,
        trend: '+10%',
        sparkline: [0, 100, 200, 300, 400, Math.round((summary.totalSpentAllTime || 0) * 0.1)],
      },
    };
  };

  // Build chart data from API
  const getExpenseChartData = () => {
    if (!dashboardData?.monthlySpending) return [];
    return dashboardData.monthlySpending.map((item) => ({
      month: item.month,
      amount: item.totalAmount || 0,
      count: item.count || 0,
    }));
  };

  const getCategoryChartData = () => {
    if (!dashboardData?.categoryWiseSpending) return [];
    return dashboardData.categoryWiseSpending.map((item) => ({
      name: item.category || 'Other',
      value: item.totalAmount || 0,
    }));
  };

  const getHealthSuggestions = () => {
    if (!healthScore?.suggestions) {
      return [
        {
          id: 'h-default-1',
          title: 'Add subscriptions to track savings',
          description: 'Upload receipts or add subscriptions to get AI-powered savings recommendations.',
          savings: 'Potential savings TBD',
          badge: 'Get Started',
          actionText: 'Upload Receipt',
        },
      ];
    }
    return healthScore.suggestions.map((s, i) => ({
      id: `h-sug-${i}`,
      title: s.title || s.message,
      description: s.description || s.message,
      savings: s.savings || '',
      badge: s.badge || 'Tip',
      actionText: s.actionText || 'View',
    }));
  };

  const currentMetrics = getLiveMetrics();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <HiOutlineExclamationCircle className="h-12 w-12 text-danger" />
        <p className="text-text-secondary">{error}</p>
        <button
          type="button"
          onClick={fetchDashboardData}
          className="btn-primary"
        >
          <HiOutlineRefresh className="h-4 w-4" />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  return (
    <div className="app-page page-stack">
      <section className="page-hero p-6 sm:p-8 lg:p-10">
        <div className="relative z-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.12] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-primary">
                <HiOutlineSparkles className="h-4 w-4" />
                Pro Plan
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
              onClick={fetchDashboardData}
              className="btn-secondary shrink-0"
              title="Refresh dashboard data"
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
          title="Total Tracked Expense"
          value={`$${(dashboardData?.summary?.totalSpentAllTime || 0).toFixed(2)}`}
          icon={HiOutlineCreditCard}
          trend={`+${dashboardData?.summary?.activeMonthsCount || 0} months`}
          trendDirection="up"
          isPositiveGood={true}
          sparklineData={currentMetrics.subscriptions.sparkline}
          sparklineColor="#22C55E"
          badgeText="all time"
          iconBgColor="bg-success/[0.15] text-success"
        />

        <StatCard
          title="Avg Monthly Expense"
          value={`$${(dashboardData?.summary?.averageMonthlyExpense || 0).toFixed(2)}`}
          icon={HiOutlineCalendar}
          trend={currentMetrics.upcomingBills.trend}
          trendDirection="down"
          isPositiveGood={true}
          sparklineData={currentMetrics.upcomingBills.sparkline}
          sparklineColor="#F59E0B"
          badgeText="per month"
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
          score={healthScore?.score || 75}
          maxScore={100}
          statusBadge={healthScore?.status || 'Good'}
          suggestions={getHealthSuggestions()}
          className="xl:col-span-5"
        />

        <ExpenseChart
          data={getExpenseChartData()}
          timeFilter={timeFilter}
          className="xl:col-span-7"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <CategoryChart
          data={getCategoryChartData()}
          title="Expense Category Breakdown"
          className="xl:col-span-6"
        />

        <div className="xl:col-span-6">
          <BillsList bills={[]} />
        </div>
      </section>

      <SubscriptionsTable subscriptions={[]} />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-6">
          <RecommendationCard recommendations={[]} />
        </div>

        <div className="xl:col-span-6">
          <ActivityTimeline activities={[]} />
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
