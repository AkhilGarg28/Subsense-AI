import React, { useState } from 'react';
import {
  HiOutlineUser,
  HiOutlineLink,
  HiOutlineAdjustments,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineRefresh,
  HiOutlineCog,
  HiOutlineCheckCircle,
} from 'react-icons/hi';
import {
  ProfileHeader,
  ProfileCard,
  AccountConnections,
  PreferencePanel,
  SecurityPanel,
  StatsCard,
  AchievementCard,
  ProfileSkeleton,
} from '../../components/profile';
import { mockProfileData } from '../../data/mockProfileData';
import { cn } from '../../utils/helpers';

/**
 * ProfilePage — Complete User Profile & Settings Page for SubSense AI.
 * Assembles profile components into a GitHub/Notion style settings dashboard layout:
 * - Top Header: ProfileHeader with avatar, name, health score badge, edit triggers
 * - Navigation Sidebar / Tabs: "General Profile", "Connected Accounts", "Preferences & Notifications", "Security", "Statistics & Badges"
 * - Active Tab Panels
 * - Simulated loading toggle option to preview shimmer skeleton loaders
 * - Full responsive layout for Mobile, Tablet, and Desktop
 */
const ProfilePage = () => {
  // Navigation active tab state
  const [activeTab, setActiveTab] = useState('general');

  // Interactive profile data state
  const [userData, setUserData] = useState(mockProfileData.user);

  // Edit Mode toggle state
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Simulated Loading state toggle to demonstrate skeleton loader
  const [isLoading, setIsLoading] = useState(false);

  // Navigation tab definitions
  const tabs = [
    {
      id: 'general',
      label: 'General Profile',
      description: 'Personal info, avatar, & account overview',
      icon: HiOutlineUser,
      badge: 'Personal',
    },
    {
      id: 'connections',
      label: 'Connected Accounts',
      description: 'SSO, Gmail receipt auto-sync, & bank monitoring',
      icon: HiOutlineLink,
      badge: '3 Active',
    },
    {
      id: 'preferences',
      label: 'Preferences & Notifications',
      description: 'Theme, currency, language & alert settings',
      icon: HiOutlineAdjustments,
      badge: null,
    },
    {
      id: 'security',
      label: 'Security & Auth',
      description: 'Password, 2FA, & active sessions',
      icon: HiOutlineShieldCheck,
      badge: '2FA On',
    },
    {
      id: 'statistics',
      label: 'Statistics & Badges',
      description: 'Parsing metrics & gamified rewards',
      icon: HiOutlineSparkles,
      badge: '4 Badges',
    },
  ];

  // Handler for ProfileCard updates
  const handleSaveProfile = (updatedDetails) => {
    setUserData((prev) => ({
      ...prev,
      ...updatedDetails,
    }));
    setIsEditingProfile(false);
  };

  // Toggle simulated skeleton loader
  const handleToggleSimulatedLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Page Title Bar & Skeleton Demo Toggle */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <HiOutlineCog className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-black tracking-tight text-text-primary sm:text-3xl">
              Account Settings & Profile
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary sm:text-sm">
            Manage your SubSense AI account details, connected services, and preferences.
          </p>
        </div>

        {/* Skeleton Preview Control */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleToggleSimulatedLoading}
            disabled={isLoading}
            className={cn(
              'flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold backdrop-blur-md transition-all duration-200',
              isLoading
                ? 'border-primary/40 bg-primary/20 text-primary cursor-wait'
                : 'border-glass-border bg-glass/80 text-text-secondary hover:border-primary/30 hover:bg-primary/10 hover:text-primary'
            )}
          >
            <HiOutlineRefresh
              className={cn('h-4 w-4', isLoading && 'animate-spin text-primary')}
            />
            <span>{isLoading ? 'Loading Skeleton...' : 'Simulate Loading'}</span>
          </button>
        </div>
      </div>

      {/* Main Profile Header Banner */}
      {isLoading ? (
        <ProfileSkeleton variant="header" />
      ) : (
        <ProfileHeader
          user={userData}
          isEditing={isEditingProfile}
          onEditClick={() => {
            setIsEditingProfile(!isEditingProfile);
            setActiveTab('general');
          }}
        />
      )}

      {/* GitHub/Notion Style Navigation Sidebar & Content Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Navigation Sidebar (Desktop) / Horizontal Scrollable Tabs (Mobile & Tablet) */}
        <div className="lg:col-span-3">
          <nav className="sticky top-20 rounded-3xl border border-glass-border bg-glass p-3 backdrop-blur-xl">
            {/* Desktop Navigation List */}
            <div className="hidden lg:flex flex-col space-y-1">
              <span className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                Settings Menu
              </span>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center justify-between rounded-2xl px-3.5 py-3 text-left transition-all duration-200',
                      isActive
                        ? 'border border-primary/40 bg-primary/20 text-primary font-bold shadow-glow'
                        : 'border border-transparent text-text-secondary hover:border-glass-border hover:bg-glass/60 hover:text-text-primary'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={cn(
                          'h-5 w-5 shrink-0',
                          isActive ? 'text-primary' : 'text-text-muted'
                        )}
                      />
                      <div>
                        <span className="block text-xs font-semibold">{tab.label}</span>
                      </div>
                    </div>

                    {tab.badge && (
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                          isActive
                            ? 'bg-primary/30 text-primary-light'
                            : 'bg-glass-border/50 text-text-muted'
                        )}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile & Tablet Horizontal Tab Pills */}
            <div className="flex overflow-x-auto gap-2 p-1 no-scrollbar lg:hidden">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all',
                      isActive
                        ? 'border border-primary/40 bg-primary/20 text-primary shadow-glow'
                        : 'border border-glass-border bg-glass/40 text-text-secondary hover:bg-glass'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Active Tab Panel Content */}
        <div className="lg:col-span-9">
          {isLoading ? (
            <ProfileSkeleton
              variant={
                activeTab === 'general'
                  ? 'card'
                  : activeTab === 'connections'
                  ? 'connections'
                  : activeTab === 'preferences'
                  ? 'preferences'
                  : activeTab === 'security'
                  ? 'security'
                  : 'achievements'
              }
            />
          ) : (
            <div className="space-y-6">
              {/* TAB 1: GENERAL PROFILE */}
              {activeTab === 'general' && (
                <div className="space-y-6 animate-fade-in">
                  <ProfileCard
                    user={userData}
                    initialIsEditing={isEditingProfile}
                    onSave={handleSaveProfile}
                  />
                  <StatsCard statistics={mockProfileData.statistics} />
                </div>
              )}

              {/* TAB 2: CONNECTED ACCOUNTS */}
              {activeTab === 'connections' && (
                <div className="animate-fade-in">
                  <AccountConnections
                    connectedAccounts={mockProfileData.connectedAccounts}
                  />
                </div>
              )}

              {/* TAB 3: PREFERENCES & NOTIFICATIONS */}
              {activeTab === 'preferences' && (
                <div className="animate-fade-in">
                  <PreferencePanel
                    initialPreferences={mockProfileData.preferences}
                    initialNotifications={mockProfileData.notificationSettings}
                  />
                </div>
              )}

              {/* TAB 4: SECURITY */}
              {activeTab === 'security' && (
                <div className="animate-fade-in">
                  <SecurityPanel />
                </div>
              )}

              {/* TAB 5: STATISTICS & BADGES */}
              {activeTab === 'statistics' && (
                <div className="space-y-6 animate-fade-in">
                  <StatsCard statistics={mockProfileData.statistics} />
                  <AchievementCard achievements={mockProfileData.achievements} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
