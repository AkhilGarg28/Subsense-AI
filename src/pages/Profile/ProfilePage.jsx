import { HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { Card, Button, Input } from '../../components/ui';

/**
 * ProfilePage — User profile and account settings.
 * Placeholder data — will connect to backend later.
 */
const ProfilePage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">Profile</h1>
        <p className="mt-1 text-text-secondary">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="text-center" padding="lg">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <HiOutlineUser className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-text-primary">John Doe</h2>
          <p className="text-sm text-text-secondary">john@example.com</p>
          <div className="mt-4 flex justify-center gap-4">
            <div className="text-center">
              <p className="text-lg font-bold text-text-primary">12</p>
              <p className="text-xs text-text-muted">Subscriptions</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-lg font-bold text-text-primary">$2.4k</p>
              <p className="text-xs text-text-muted">Monthly</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="mt-6 w-full">
            Edit Avatar
          </Button>
        </Card>

        {/* Profile Form */}
        <Card padding="lg" className="lg:col-span-2">
          <Card.Header>
            <Card.Title>Personal Information</Card.Title>
          </Card.Header>
          <form className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                label="Full Name"
                id="profile-name"
                placeholder="John Doe"
                icon={HiOutlineUser}
              />
              <Input
                label="Email"
                id="profile-email"
                type="email"
                placeholder="john@example.com"
                icon={HiOutlineMail}
              />
              <Input
                label="Phone"
                id="profile-phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                icon={HiOutlinePhone}
              />
              <Input
                label="Location"
                id="profile-location"
                placeholder="New York, USA"
                icon={HiOutlineLocationMarker}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button variant="primary">Save Changes</Button>
            </div>
          </form>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card padding="lg" className="border border-danger/20">
        <Card.Header>
          <Card.Title className="text-danger">Danger Zone</Card.Title>
        </Card.Header>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-text-primary">Delete Account</p>
            <p className="text-sm text-text-secondary">Permanently delete your account and all associated data.</p>
          </div>
          <Button variant="danger" size="sm">Delete Account</Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
