import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineTranslate,
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineBell,
  HiOutlineMail,
  HiOutlineDeviceMobile,
  HiOutlineCalendar,
  HiOutlineSparkles,
  HiOutlineCheck,
  HiOutlineRefresh,
  HiOutlineSave,
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';
import { mockProfileData } from '../../data/mockProfileData';

/**
 * PreferencePanel — Preferences & Notification Settings panel component for SubSense AI.
 * Includes Theme Selector, Language Selector, Default Currency, Time Zone Dropdown,
 * and interactive toggle switches for notification preferences.
 */
const PreferencePanel = ({
  initialPreferences = mockProfileData.preferences,
  initialNotifications = mockProfileData.notificationSettings,
  onSave,
  className = '',
}) => {
  // State for Preferences
  const [theme, setTheme] = useState(
    initialPreferences?.theme?.toLowerCase().includes('light') ? 'light' : 'dark'
  );
  const [language, setLanguage] = useState(
    initialPreferences?.language || 'English (US)'
  );
  const [currency, setCurrency] = useState(
    initialPreferences?.currency?.includes('INR') ? 'INR' : 'USD'
  );
  const [timeZone, setTimeZone] = useState(
    initialPreferences?.timeZone || 'UTC-05:00 Eastern Time'
  );

  // State for Notification Toggles
  const [notifications, setNotifications] = useState({
    emailNotifications: initialNotifications?.emailNotifications ?? true,
    pushNotifications: initialNotifications?.pushNotifications ?? true,
    billReminders: initialNotifications?.billReminders ?? true,
    renewalAlerts: initialNotifications?.renewalAlerts ?? true,
    aiRecommendations: initialNotifications?.aiRecommendations ?? true,
  });

  const [savedNotification, setSavedNotification] = useState(false);

  // Handle Toggle Switches
  const handleToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Save handler
  const handleSave = (e) => {
    e.preventDefault();
    const updatedData = {
      preferences: {
        theme: theme === 'dark' ? 'Dark Mode' : 'Light Mode',
        language,
        currency: currency === 'USD' ? 'USD ($)' : currency === 'INR' ? 'INR (₹)' : currency === 'EUR' ? 'EUR (€)' : 'GBP (£)',
        timeZone,
      },
      notificationSettings: notifications,
    };

    if (onSave) {
      onSave(updatedData);
    }

    setSavedNotification(true);
    setTimeout(() => {
      setSavedNotification(false);
    }, 3500);
  };

  // Reset handler
  const handleReset = () => {
    setTheme('dark');
    setLanguage('English (US)');
    setCurrency('USD');
    setTimeZone('UTC-05:00 Eastern Time');
    setNotifications({
      emailNotifications: true,
      pushNotifications: true,
      billReminders: true,
      renewalAlerts: true,
      aiRecommendations: true,
    });
  };

  const languageOptions = [
    { label: 'English (US)', value: 'English (US)', flag: '🇺🇸' },
    { label: 'Spanish (Español)', value: 'Spanish (ES)', flag: '🇪🇸' },
    { label: 'French (Français)', value: 'French (FR)', flag: '🇫🇷' },
    { label: 'Hindi (हिन्दी)', value: 'Hindi (IN)', flag: '🇮🇳' },
  ];

  const currencyOptions = [
    { label: 'USD ($)', value: 'USD', symbol: '$', name: 'US Dollar' },
    { label: 'INR (₹)', value: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { label: 'EUR (€)', value: 'EUR', symbol: '€', name: 'Euro' },
    { label: 'GBP (£)', value: 'GBP', symbol: '£', name: 'British Pound' },
  ];

  const timeZoneOptions = [
    'UTC-08:00 Pacific Time (US & Canada)',
    'UTC-05:00 Eastern Time (US & Canada)',
    'UTC+00:00 Greenwich Mean Time (GMT)',
    'UTC+01:00 Central European Time (CET)',
    'UTC+05:30 India Standard Time (IST)',
    'UTC+08:00 Singapore / China Standard Time',
    'UTC+09:00 Japan Standard Time (JST)',
  ];

  const notificationItems = [
    {
      id: 'emailNotifications',
      title: 'Email Notifications',
      description: 'Receive weekly spending digests and critical account alerts via email.',
      icon: HiOutlineMail,
    },
    {
      id: 'pushNotifications',
      title: 'Push Notifications',
      description: 'Get real-time browser and mobile notifications for immediate updates.',
      icon: HiOutlineDeviceMobile,
    },
    {
      id: 'billReminders',
      title: 'Bill Reminders',
      description: 'Notify me 3 days prior to upcoming bill & invoice payment due dates.',
      icon: HiOutlineCalendar,
    },
    {
      id: 'renewalAlerts',
      title: 'Renewal Alerts',
      description: 'Warn me 7 days before automated subscription auto-renewals occur.',
      icon: HiOutlineBell,
    },
    {
      id: 'aiRecommendations',
      title: 'AI Recommendations',
      description: 'Allow SubSense AI to suggest cost savings & redundant subscription cancellations.',
      icon: HiOutlineSparkles,
    },
  ];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-glass-border bg-glass p-6 backdrop-blur-xl transition-all duration-300 md:p-8',
        className
      )}
    >
      {/* Header Section */}
      <div className="flex flex-col justify-between border-b border-glass-border pb-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Preferences & Notifications</h2>
          <p className="mt-0.5 text-xs text-text-muted">
            Customize your app appearance, localization settings, and notification frequency.
          </p>
        </div>
        <div className="mt-3 flex items-center gap-2 sm:mt-0">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-xl border border-glass-border bg-glass/60 px-3 py-1.5 text-xs font-semibold text-text-secondary transition-all hover:bg-glass hover:text-text-primary"
          >
            <HiOutlineRefresh className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {savedNotification && (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs font-semibold text-emerald-400 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <HiOutlineCheck className="h-4 w-4 shrink-0" />
            <span>Preferences and notification settings saved successfully!</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="mt-6 space-y-8">
        {/* SECTION 1: SYSTEM PREFERENCES */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
            System & Localization Preferences
          </h3>

          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Theme Selector */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
                <HiOutlineSun className="h-4 w-4 text-primary" />
                <span>Interface Theme</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={cn(
                    'flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-semibold transition-all',
                    theme === 'dark'
                      ? 'border-primary bg-primary/20 text-primary shadow-glow'
                      : 'border-glass-border bg-glass/40 text-text-muted hover:border-glass-border/80 hover:text-text-secondary'
                  )}
                >
                  <HiOutlineMoon className="h-4 w-4" />
                  <span>Dark Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={cn(
                    'flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-semibold transition-all',
                    theme === 'light'
                      ? 'border-primary bg-primary/20 text-primary shadow-glow'
                      : 'border-glass-border bg-glass/40 text-text-muted hover:border-glass-border/80 hover:text-text-secondary'
                  )}
                >
                  <HiOutlineSun className="h-4 w-4" />
                  <span>Light Mode</span>
                </button>
              </div>
            </div>

            {/* Language Selector */}
            <div className="space-y-2">
              <label htmlFor="pref-language" className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
                <HiOutlineTranslate className="h-4 w-4 text-primary" />
                <span>Preferred Language</span>
              </label>
              <select
                id="pref-language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-xl border border-glass-border bg-background-card/80 px-3.5 py-2.5 text-xs font-medium text-text-primary backdrop-blur-md focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {languageOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-background-card text-text-primary">
                    {opt.flag} {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Default Currency Selector */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
                <HiOutlineCurrencyDollar className="h-4 w-4 text-primary" />
                <span>Default Currency</span>
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {currencyOptions.map((curr) => (
                  <button
                    type="button"
                    key={curr.value}
                    onClick={() => setCurrency(curr.value)}
                    className={cn(
                      'flex flex-col items-center justify-center rounded-xl border p-2.5 text-xs transition-all',
                      currency === curr.value
                        ? 'border-primary bg-primary/20 font-bold text-primary shadow-glow'
                        : 'border-glass-border bg-glass/30 text-text-muted hover:bg-glass hover:text-text-secondary'
                    )}
                  >
                    <span className="text-base font-extrabold">{curr.symbol}</span>
                    <span className="mt-0.5 text-[10px] font-semibold">{curr.value}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Zone Dropdown */}
            <div className="space-y-2">
              <label htmlFor="pref-timezone" className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
                <HiOutlineClock className="h-4 w-4 text-primary" />
                <span>Time Zone</span>
              </label>
              <select
                id="pref-timezone"
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="w-full rounded-xl border border-glass-border bg-background-card/80 px-3.5 py-2.5 text-xs font-medium text-text-primary backdrop-blur-md focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {timeZoneOptions.map((tz) => (
                  <option key={tz} value={tz} className="bg-background-card text-text-primary">
                    {tz}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 2: NOTIFICATION TOGGLES */}
        <div className="border-t border-glass-border pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                Notification Channels & Alerts
              </h3>
              <p className="mt-0.5 text-xs text-text-muted">
                Control how and when SubSense AI contacts you about your subscriptions.
              </p>
            </div>
          </div>

          <div className="mt-4 divide-y divide-glass-border/40">
            {notificationItems.map((item) => {
              const Icon = item.icon;
              const isChecked = notifications[item.id];

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3.5 transition-colors hover:bg-glass/20"
                >
                  <div className="flex items-start gap-3 pr-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-glass-border bg-glass/60 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-text-primary">{item.title}</h4>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-text-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isChecked}
                    onClick={() => handleToggle(item.id)}
                    className={cn(
                      'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
                      isChecked ? 'bg-primary' : 'bg-glass-border'
                    )}
                  >
                    <span
                      className={cn(
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out',
                        isChecked ? 'translate-x-5' : 'translate-x-0'
                      )}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className="flex items-center justify-end gap-3 border-t border-glass-border pt-5">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/20 px-6 py-2.5 text-xs font-semibold text-primary transition-all hover:bg-primary/30 hover:shadow-glow"
          >
            <HiOutlineSave className="h-4 w-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};

PreferencePanel.propTypes = {
  initialPreferences: PropTypes.shape({
    theme: PropTypes.string,
    language: PropTypes.string,
    currency: PropTypes.string,
    timeZone: PropTypes.string,
  }),
  initialNotifications: PropTypes.shape({
    emailNotifications: PropTypes.bool,
    pushNotifications: PropTypes.bool,
    billReminders: PropTypes.bool,
    renewalAlerts: PropTypes.bool,
    aiRecommendations: PropTypes.bool,
  }),
  onSave: PropTypes.func,
  className: PropTypes.string,
};

export default PreferencePanel;
