import { HiOutlineBell, HiOutlineExclamation, HiOutlineCheckCircle, HiOutlineInformationCircle } from 'react-icons/hi';
import { Card } from '../../components/ui';

/**
 * NotificationsPage — View all alerts and notifications.
 * Placeholder data — will connect to real notifications later.
 */
const NotificationsPage = () => {
  const placeholderNotifications = [
    {
      type: 'warning',
      icon: HiOutlineExclamation,
      title: 'Subscription renewal approaching',
      message: 'Your Netflix subscription renews in 3 days ($15.99).',
      time: '2 hours ago',
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
    {
      type: 'success',
      icon: HiOutlineCheckCircle,
      title: 'Receipt processed successfully',
      message: 'Your uploaded receipt has been analyzed and categorized.',
      time: '5 hours ago',
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      type: 'info',
      icon: HiOutlineInformationCircle,
      title: 'Monthly report available',
      message: 'Your July spending report is ready to view.',
      time: '1 day ago',
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      type: 'danger',
      icon: HiOutlineExclamation,
      title: 'Price increase detected',
      message: 'Adobe CC subscription price will increase by $5.00 next month.',
      time: '2 days ago',
      color: 'text-danger',
      bg: 'bg-danger/10',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">Notifications</h1>
          <p className="mt-1 text-text-secondary">Stay updated with your financial alerts.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5">
          <HiOutlineBell className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">{placeholderNotifications.length} new</span>
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {placeholderNotifications.map((notif, index) => {
          const Icon = notif.icon;
          return (
            <Card key={index} hover className="transition-all">
              <div className="flex items-start gap-4">
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${notif.bg}`}>
                  <Icon className={`h-5 w-5 ${notif.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-text-primary">{notif.title}</h3>
                  <p className="mt-0.5 text-sm text-text-secondary">{notif.message}</p>
                  <p className="mt-1 text-xs text-text-muted">{notif.time}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsPage;
