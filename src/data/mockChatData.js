/**
 * Mock data for SubSense AI Chat Assistant (Financial Copilot).
 */
export const mockChatData = {
  suggestedPrompts: [
    {
      id: 'p-1',
      title: 'How much will I spend next month?',
      category: 'Cashflow Forecast',
      icon: '📊',
      prompt: 'How much will I spend next month based on my current recurring bills and spending habits?',
    },
    {
      id: 'p-2',
      title: 'Which subscriptions should I cancel?',
      category: 'Subscription Audit',
      icon: '✂️',
      prompt: 'Which subscriptions should I cancel to save money this month?',
    },
    {
      id: 'p-3',
      title: 'What bills are due this week?',
      category: 'Upcoming Bills',
      icon: '⚡',
      prompt: 'What bills and subscription renewals are due this week?',
    },
    {
      id: 'p-4',
      title: 'Can I reduce my monthly expenses?',
      category: 'Savings Advice',
      icon: '💡',
      prompt: 'Can I reduce my overall monthly expenses without sacrificing my essential services?',
    },
    {
      id: 'p-5',
      title: 'How healthy are my finances?',
      category: 'Health Score',
      icon: '❤️',
      prompt: 'Give me a complete audit of my financial health score and spending ratio.',
    },
    {
      id: 'p-6',
      title: 'What is my biggest expense category?',
      category: 'Expense Analysis',
      icon: '📈',
      prompt: 'What is my single biggest expense category this month and how can I optimize it?',
    },
  ],
  conversations: [
    {
      id: 'conv-1',
      title: 'Monthly Cashflow Audit & Savings',
      date: 'Today',
      messagesCount: 4,
      lastUpdated: '10:42 AM',
    },
    {
      id: 'conv-2',
      title: 'SaaS Subscription Cancellation Tips',
      date: 'Yesterday',
      messagesCount: 6,
      lastUpdated: 'Yesterday',
    },
    {
      id: 'conv-3',
      title: 'AWS Cloud Cost Optimization',
      date: 'Previous 7 Days',
      messagesCount: 8,
      lastUpdated: 'Jul 20',
    },
    {
      id: 'conv-4',
      title: 'Q3 Tax & Receipt Breakdown',
      date: 'Previous 30 Days',
      messagesCount: 12,
      lastUpdated: 'Jul 15',
    },
  ],
  initialMessages: [
    {
      id: 'm-1',
      sender: 'user',
      text: 'Which subscriptions should I cancel to save money this month?',
      timestamp: '10:41 AM',
    },
    {
      id: 'm-2',
      sender: 'ai',
      text: 'Based on your connected accounts and parsed receipt history, here is your personalized AI Subscription Optimization Plan:',
      timestamp: '10:41 AM',
      bullets: [
        'Cancel Canva Pro Seat — Zero activity detected for 45 days. Saves ₹6,000/year ($79.99/mo).',
        'Switch Spotify to Annual Plan — Currently paying $11.99/mo ($143.88/yr). Annual plan is $99/yr (saves $44.88/yr).',
        'Entertainment Spending Warning — Entertainment expenses are 18% above your target threshold ($312/mo vs $250/mo target).',
      ],
      metrics: {
        potentialMonthlySavings: '$98.50',
        potentialYearlySavings: '₹14,200',
        unusedCount: 2,
      },
      actionableButtons: [
        { label: '1-Click Cancel Canva', action: 'cancel-canva', variant: 'danger' },
        { label: 'Switch Spotify to Annual', action: 'switch-spotify', variant: 'primary' },
        { label: 'View All Subscriptions', action: 'view-subs', variant: 'outline' },
      ],
    },
  ],
  aiKnowledgeBase: {
    'spend': {
      text: 'Based on your financial data, your projected spending for next month is $1,248.50 (₹1,03,625). Here is the breakdown:',
      bullets: [
        'Fixed Subscriptions & Bills: $384.00 (Netflix, Spotify, AWS, Electricity)',
        'Food & Dining (Estimated): $375.00',
        'Utilities & Household: $250.00',
        'Discretionary & Shopping: $239.50',
      ],
      metrics: {
        projectedSpend: '$1,248.50',
        cashflowBuffer: 'Healthy (+$450.00)',
      },
    },
    'cancel': {
      text: 'Here are the subscriptions recommended for cancellation based on usage analytics:',
      bullets: [
        'Canva Pro Seat (₹6,000/yr / $79.99/mo) — 0 logins in 45 days.',
        'Coursera Plus ($39.00/mo) — Course completed on July 10.',
      ],
      metrics: {
        instantSavings: '$118.99/mo',
      },
    },
    'default': {
      text: 'I have analyzed your SubSense AI financial ledger. Here is what I found:',
      bullets: [
        'Your overall Financial Health Score is 89/100 (Healthy Spending).',
        '14 Active subscriptions tracked totaling $318.50/mo (₹26,450).',
        '4 Upcoming bills due in the next 14 days totaling $384.00.',
        'Potential savings opportunity identified: $640.00/year (₹53,100/yr).',
      ],
    },
  },
};
