import React, { useState } from 'react';
import {
  HiOutlineUser,
  HiOutlineLink,
  HiOutlineAdjustments,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineRefresh,
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

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [userData, setUserData] = useState(mockProfileData.user);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSaveProfile = (updatedDetails) => {
    setUserData((prev) => ({
      ...prev,
      ...updatedDetails,
    }));
    setIsEditingProfile(false);
  };

  const handleToggleSimulatedLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in w-full">
      {/* Top Header Controls Bar */}
      <div className="flex items-center justify-between font-mono text-xs">
        <span className="text-[#A1A8B5] font-bold uppercase tracking-wider">
          USER SETTINGS PANEL
        </span>

        <button
          type="button"
          onClick={handleToggleSimulatedLoading}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#171F2F] px-3.5 py-1.5 font-bold text-[#A1A8B5] hover:text-white transition-all cursor-pointer"
        >
          <HiOutlineRefresh className={cn('h-3.5 w-3.5 text-[#5B8CFF]', isLoading && 'animate-spin')} />
          <span>{isLoading ? 'Loading...' : 'Simulate Loading'}</span>
        </button>
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

      {/* Navigation Sidebar & Active Panel Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3">
          <nav className="sticky top-20 rounded-2xl border border-white/10 bg-[#171F2F]/90 p-3 backdrop-blur-xl">
            <div className="hidden lg:flex flex-col space-y-1 font-mono text-xs">
              <span className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                SETTINGS MENU
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
                      'flex items-center justify-between rounded-xl px-3.5 py-3 text-left transition-all duration-200 cursor-pointer',
                      isActive
                        ? 'border border-[#5B8CFF]/40 bg-[#5B8CFF]/15 text-[#5B8CFF] font-bold shadow-glow-blue'
                        : 'border border-transparent text-[#A1A8B5] hover:bg-[#121A2F] hover:text-white'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={cn(
                          'h-4.5 w-4.5 shrink-0',
                          isActive ? 'text-[#5B8CFF]' : 'text-[#64748B]'
                        )}
                      />
                      <span className="text-xs font-semibold">{tab.label}</span>
                    </div>

                    {tab.badge && (
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-[10px] font-mono font-bold',
                          isActive
                            ? 'bg-[#5B8CFF]/30 text-white'
                            : 'bg-white/5 text-[#A1A8B5]'
                        )}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex overflow-x-auto gap-2 p-1 no-scrollbar lg:hidden font-mono text-xs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition-all',
                      isActive
                        ? 'border border-[#5B8CFF]/40 bg-[#5B8CFF]/15 text-[#5B8CFF]'
                        : 'border border-white/10 bg-[#121A2F] text-[#A1A8B5]'
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

        {/* Active Panel */}
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

              {activeTab === 'connections' && (
                <div className="animate-fade-in">
                  <AccountConnections
                    connectedAccounts={mockProfileData.connectedAccounts}
                  />
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="animate-fade-in">
                  <PreferencePanel
                    initialPreferences={mockProfileData.preferences}
                    initialNotifications={mockProfileData.notificationSettings}
                  />
                </div>
              )}

              {activeTab === 'security' && (
                <div className="animate-fade-in">
                  <SecurityPanel />
                </div>
              )}

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
