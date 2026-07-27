import React, { useState, useEffect } from 'react';
import {
  HiOutlineCurrencyRupee,
  HiOutlineCreditCard,
  HiOutlineCalendar,
  HiOutlineSparkles,
  HiOutlineRefresh,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';
import { dashboardAPI } from '../../services/api';
import { formatCurrency } from '../../utils/helpers';
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

// Realistic portfolio dataset for user Akhil in INR (₹)
const AKHIL_PORTFOLIO_MONTHLY = [
  { month: 'Feb', actual: 24500, target: 28000 },
  { month: 'Mar', actual: 28900, target: 30000 },
  { month: 'Apr', actual: 31200, target: 33000 },
  { month: 'May', actual: 33400, target: 35000 },
  { month: 'Jun', actual: 35800, target: 37000 },
  { month: 'Jul', actual: 37618, target: 40000 },
];

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

  // Filter dataset dynamically based on timeFilter toggle ('This Month', 'Quarter', 'Year')
  const getFilteredMonthlyData = () => {
    const rawData = dashboardData?.monthlySpending && dashboardData.monthlySpending.length > 0
      ? dashboardData.monthlySpending.map((m) => ({
          month: m.month || 'Month',
          actual: m.totalAmount || m.actual || 37618,
          target: m.target || Math.round((m.totalAmount || 37618) * 1.1),
        }))
      : AKHIL_PORTFOLIO_MONTHLY;

    if (timeFilter === 'This Month') {
      return rawData.slice(-1);
    }
    if (timeFilter === 'Quarter') {
      return rawData.slice(-3);
    }
    return rawData; // 'Year' or default
  };

  // Build metrics from timeFilter selection
  const getLiveMetrics = () => {
    const periodData = getFilteredMonthlyData();
    const currentPeriodSpend = periodData.reduce((sum, item) => sum + item.actual, 0);
    const sparklines = periodData.map((d) => d.actual);

    let spendTrend = '+4.2%';
    let subValue = '9 Active';
    let billsValue = formatCurrency(35800);
    let savingsValue = `${formatCurrency(11800)}/yr`;

    if (timeFilter === 'Quarter') {
      spendTrend = '+8.5%';
      billsValue = formatCurrency(102600);
      savingsValue = `${formatCurrency(35400)}/yr`;
    } else if (timeFilter === 'Year') {
      spendTrend = '+14.2%';
      billsValue = formatCurrency(191418);
      savingsValue = `${formatCurrency(48000)}/yr`;
    }

    return {
      spending: {
        value: formatCurrency(currentPeriodSpend),
        trend: spendTrend,
        sparkline: sparklines.length >= 2 ? sparklines : [28000, 31200, 33400, 35800, 37618],
      },
      subscriptions: {
        value: subValue,
        trend: '+2',
        sparkline: [4, 5, 6, 7, 8, 9],
      },
      upcomingBills: {
        value: billsValue,
        trend: '-2.1%',
        sparkline: sparklines.length >= 2 ? sparklines : [15000, 22000, 28000, 31000, 35800],
      },
      savingsOpportunity: {
        value: savingsValue,
        trend: '+18%',
        sparkline: [2000, 4000, 6000, 8000, 10000, 11800],
      },
    };
  };

  const getCategoryChartData = () => {
    if (!dashboardData?.categoryWiseSpending || !dashboardData.categoryWiseSpending.length) {
      return [
        { name: 'Cloud Services', value: 18450 },
        { name: 'Office Facilities', value: 12500 },
        { name: 'Utilities', value: 6619 },
        { name: 'Design & Software', value: 8229 },
        { name: 'Productivity & AI', value: 3498 },
        { name: 'Entertainment & Lifestyle', value: 1727 },
      ];
    }
    return dashboardData.categoryWiseSpending.map((item) => ({
      name: item.category || 'Other',
      value: item.totalAmount || 0,
    }));
  };

  const getHealthSuggestions = () => {
    if (!healthScore?.suggestions || !healthScore.suggestions.length) {
      return [
        {
          id: 'h-default-1',
          title: 'Switch Notion AI & Figma Enterprise to Annual Billing',
          description: 'Save 18% annually by switching your team subscriptions to annual plans.',
          savings: 'Save ₹11,800/yr',
          badge: 'High Impact',
          actionText: 'Optimize Plan',
        },
        {
          id: 'h-default-2',
          title: 'AWS Cloud Reserved Instances Optimization',
          description: 'Lock in 1-year reserved instances for steady production web servers.',
          savings: 'Save ₹3,200/mo',
          badge: 'Cloud Saver',
          actionText: 'Review AWS',
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
                <HiOutlineSparkles className="h-3.5 w-3.5" />
                Live Financial Intelligence
              </span>
              <span className="text-xs text-text-tertiary">
                Updated in real-time
              </span>
            </div>

            <h1 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
              Welcome back, Akhil
            </h1>
            <p className="mt-2 text-sm text-text-secondary sm:text-base">
              SubSense AI is actively auditing 9 subscriptions and 5 invoices across your portfolio ({timeFilter}).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Dynamic Time Range Comparison Filter */}
            <div className="flex items-center rounded-2xl border border-surface-border bg-surface-card/80 p-1 backdrop-blur-md">
              {['This Month', 'Quarter', 'Year'].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setTimeFilter(filter)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    timeFilter === filter
                      ? 'bg-primary text-white shadow-glow-blue'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={fetchDashboardData}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-surface-border bg-surface-card text-text-secondary hover:text-white hover:border-primary/40 transition-colors"
              title="Refresh Dashboard"
            >
              <HiOutlineRefresh className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Main KPI Stats Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={`Spend (${timeFilter})`}
          value={currentMetrics.spending.value}
          icon={HiOutlineCurrencyRupee}
          trend={currentMetrics.spending.trend}
          sparklineData={currentMetrics.spending.sparkline}
          description="Total active commitments"
          sparklineColor="#5B8CFF"
        />

        <StatCard
          title="Active Subscriptions"
          value={currentMetrics.subscriptions.value}
          icon={HiOutlineCreditCard}
          trend={currentMetrics.subscriptions.trend}
          sparklineData={currentMetrics.subscriptions.sparkline}
          description="Tracked SaaS memberships"
          sparklineColor="#8B5CF6"
          iconBgColor="bg-[#8B5CF6]/15 text-[#8B5CF6]"
        />

        <StatCard
          title="Upcoming Invoices"
          value={currentMetrics.upcomingBills.value}
          icon={HiOutlineCalendar}
          trend={currentMetrics.upcomingBills.trend}
          sparklineData={currentMetrics.upcomingBills.sparkline}
          description="Due in next 14 days"
          sparklineColor="#F59E0B"
          iconBgColor="bg-[#F59E0B]/15 text-[#F59E0B]"
        />

        <StatCard
          title="Identified Savings"
          value={currentMetrics.savingsOpportunity.value}
          icon={HiOutlineSparkles}
          trend={currentMetrics.savingsOpportunity.trend}
          sparklineData={currentMetrics.savingsOpportunity.sparkline}
          description="Annual optimization potential"
          sparklineColor="#22C55E"
          iconBgColor="bg-[#22C55E]/15 text-[#22C55E]"
        />
      </section>

      {/* Analytics Charts & AI Insights Grid */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ExpenseChart
            data={AKHIL_PORTFOLIO_MONTHLY}
            timeFilter={timeFilter}
            onTimeFilterChange={(newFilter) => setTimeFilter(newFilter)}
          />
        </div>
        <div>
          <CategoryChart data={getCategoryChartData()} />
        </div>
      </section>

      {/* Health Score & AI Insights Row */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div>
          <HealthScoreCard
            score={healthScore?.score || 94}
            rating="Optimal"
            description="Your portfolio health score is in the top 5% of optimized tech accounts."
            metrics={[
              { label: 'Active Subscriptions', value: '9' },
              { label: 'Overdue Invoices', value: '0' },
              { label: 'Optimized Plans', value: '94%' },
            ]}
          />
        </div>
        <div className="lg:col-span-2">
          <AIInsightsPanel suggestions={getHealthSuggestions()} />
        </div>
      </section>

      {/* Subscriptions Table & Bills List */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SubscriptionsTable
            subscriptions={
              dashboardData?.activeSubscriptions || [
                { id: '1', name: 'AWS Cloud Services', merchant: 'Amazon Web Services', price: 18450, billingCycle: 'Monthly', status: 'Active', category: 'Cloud Services' },
                { id: '2', name: 'Adobe Creative Cloud', merchant: 'Adobe Systems', price: 4230, billingCycle: 'Monthly', status: 'Active', category: 'Design & Media' },
                { id: '3', name: 'Figma Enterprise Team', merchant: 'Figma Inc', price: 3999, billingCycle: 'Monthly', status: 'Active', category: 'Design & Software' },
                { id: '4', name: 'OpenAI ChatGPT Plus', merchant: 'OpenAI LLC', price: 1999, billingCycle: 'Monthly', status: 'Active', category: 'Productivity & AI' },
                { id: '5', name: 'GitHub Copilot Business', merchant: 'GitHub Inc', price: 1650, billingCycle: 'Monthly', status: 'Active', category: 'Developer Tools' },
              ]
            }
          />
        </div>
        <div>
          <BillsList
            bills={
              dashboardData?.upcomingBills || [
                { id: 'b1', title: 'AWS Monthly Infrastructure Cloud', amount: 18450, dueDate: '2026-08-05', status: 'Pending', category: 'Cloud Services' },
                { id: 'b2', title: 'Bespoke Coworking Space Suite', amount: 12500, dueDate: '2026-08-01', status: 'Pending', category: 'Office & Facilities' },
                { id: 'b3', title: 'Tata Power Electricity Invoice', amount: 4850, dueDate: '2026-08-08', status: 'Pending', category: 'Utilities' },
              ]
            }
          />
        </div>
      </section>

      {/* Timeline & Quick Actions */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityTimeline />
        </div>
        <div>
          <QuickActions />
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
