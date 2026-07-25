import { HiOutlineCreditCard, HiOutlinePlus, HiOutlineSearch } from 'react-icons/hi';
import { Card, Button, Input } from '../../components/ui';

/**
 * SubscriptionsPage — Manage and view all tracked subscriptions.
 * Placeholder data — will connect to backend later.
 */
const SubscriptionsPage = () => {
  const placeholderSubs = [
    { name: 'Netflix', amount: '$15.99', status: 'Active', color: 'bg-danger', next: 'Aug 15, 2026' },
    { name: 'Spotify', amount: '$9.99', status: 'Active', color: 'bg-success', next: 'Aug 20, 2026' },
    { name: 'GitHub Pro', amount: '$4.00', status: 'Active', color: 'bg-text-primary', next: 'Sep 1, 2026' },
    { name: 'Adobe CC', amount: '$54.99', status: 'Active', color: 'bg-primary', next: 'Aug 25, 2026' },
    { name: 'AWS', amount: '$120.00', status: 'Active', color: 'bg-warning', next: 'Aug 1, 2026' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">Subscriptions</h1>
          <p className="mt-1 text-text-secondary">Track and manage all your subscriptions.</p>
        </div>
        <Button variant="primary">
          <HiOutlinePlus className="mr-2 h-4 w-4" />
          Add Subscription
        </Button>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <Input
          id="search-subs"
          placeholder="Search subscriptions..."
          icon={HiOutlineSearch}
        />
      </div>

      {/* Subscription List */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderSubs.map((sub, index) => (
          <Card key={index} hover>
            <div className="flex items-start gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${sub.color}/10`}>
                <HiOutlineCreditCard className={`h-6 w-6 ${sub.color.replace('bg-', 'text-')}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary">{sub.name}</h3>
                <p className="text-xl font-bold text-text-primary mt-1">{sub.amount}<span className="text-sm text-text-muted font-normal">/mo</span></p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                    {sub.status}
                  </span>
                  <span className="text-xs text-text-muted">Next: {sub.next}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
