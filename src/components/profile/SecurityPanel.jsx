import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  HiOutlineLockClosed,
  HiOutlineShieldCheck,
  HiOutlineKey,
  HiOutlineDesktopComputer,
  HiOutlineDeviceMobile,
  HiOutlineTrash,
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineSave,
  HiOutlineQrcode,
  HiOutlineCheck,
  HiOutlineDownload,
  HiOutlineExclamation,
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';
import { mockProfileData } from '../../data/mockProfileData';

/**
 * SecurityPanel — Account Security, Password, 2FA, Active Sessions, Data Export, and Danger Zone component.
 * Provides controls to update passwords, toggle Two-Factor Authentication (2FA),
 * manage active sessions, export account data, and initiate account deletion.
 */
const SecurityPanel = ({ className = '', onPasswordChange, onToggle2FA }) => {
  // State for Password Change Form
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(null);

  // State for 2FA
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [show2FAModal, setShow2FAModal] = useState(false);

  // State for Delete Account Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // State for Active Sessions
  const [activeSessions, setActiveSessions] = useState([
    {
      id: 'sess-1',
      device: 'Windows PC • Chrome 126.0',
      location: 'New York, United States',
      ip: '192.168.1.104',
      isCurrent: true,
      lastActive: 'Active Now',
      icon: HiOutlineDesktopComputer,
    },
    {
      id: 'sess-2',
      device: 'iPhone 15 Pro • SubSense Mobile App',
      location: 'New York, United States',
      ip: '172.56.21.90',
      isCurrent: false,
      lastActive: '2 hours ago',
      icon: HiOutlineDeviceMobile,
    },
    {
      id: 'sess-3',
      device: 'MacBook Air • Safari 17.4',
      location: 'Boston, United States',
      ip: '68.192.44.12',
      isCurrent: false,
      lastActive: '3 days ago',
      icon: HiOutlineDesktopComputer,
    },
  ]);

  // Handle password form submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwords.currentPassword) {
      setPasswordStatus({ type: 'error', message: 'Please enter your current password.' });
      return;
    }
    if (passwords.newPassword.length < 8) {
      setPasswordStatus({ type: 'error', message: 'New password must be at least 8 characters long.' });
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'New passwords do not match.' });
      return;
    }

    if (onPasswordChange) {
      onPasswordChange(passwords);
    }

    setPasswordStatus({ type: 'success', message: 'Password updated successfully!' });
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });

    setTimeout(() => {
      setPasswordStatus(null);
    }, 4000);
  };

  // Handle 2FA Toggle
  const handle2FAToggle = () => {
    const nextState = !is2FAEnabled;
    setIs2FAEnabled(nextState);
    if (onToggle2FA) {
      onToggle2FA(nextState);
    }
  };

  // Revoke session
  const handleRevokeSession = (sessionId) => {
    setActiveSessions((prev) => prev.filter((s) => s.id !== sessionId));
  };

  // Export Data JSON handler
  const handleExportData = () => {
    const exportPayload = {
      user: mockProfileData.user,
      preferences: mockProfileData.preferences,
      connectedAccounts: mockProfileData.connectedAccounts,
      exportTimestamp: new Date().toISOString(),
      appVersion: 'SubSense AI 2.4.0',
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `subsense-account-data-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Execute Account Deletion
  const handleDeleteAccountConfirm = () => {
    if (deleteConfirmText.toUpperCase() !== 'DELETE') return;

    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setShowDeleteModal(false);
      alert('Account deleted successfully. Redirecting to home...');
      window.location.href = '/';
    }, 1200);
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-glass-border bg-glass p-6 backdrop-blur-xl transition-all duration-300 md:p-8',
        className
      )}
    >
      {/* Header */}
      <div className="border-b border-glass-border pb-5">
        <h2 className="text-xl font-bold text-text-primary">Security & Authentication</h2>
        <p className="mt-0.5 text-xs text-text-muted">
          Manage your password, enable two-factor authentication, export data, and account deletion options.
        </p>
      </div>

      <div className="mt-6 space-y-8">
        {/* SECTION 1: PASSWORD MANAGEMENT */}
        <div>
          <div className="flex items-center gap-2">
            <HiOutlineKey className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
              Change Password
            </h3>
          </div>

          {passwordStatus && (
            <div
              className={cn(
                'mt-3 flex items-center gap-2 rounded-xl p-3 text-xs font-semibold backdrop-blur-md',
                passwordStatus.type === 'error'
                  ? 'border border-rose-500/30 bg-rose-500/10 text-rose-400'
                  : 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
              )}
            >
              {passwordStatus.type === 'error' ? (
                <HiOutlineExclamationCircle className="h-4 w-4 shrink-0" />
              ) : (
                <HiOutlineCheckCircle className="h-4 w-4 shrink-0" />
              )}
              <span>{passwordStatus.message}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* Current Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="current-password"
                  className="text-xs font-semibold text-text-secondary"
                >
                  Current Password
                </label>
                <div className="relative">
                  <input
                    id="current-password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwords.currentPassword}
                    onChange={(e) =>
                      setPasswords({ ...passwords, currentPassword: e.target.value })
                    }
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-glass-border bg-background-card/80 py-2 pl-3.5 pr-9 text-xs font-medium text-text-primary backdrop-blur-md focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                  >
                    {showCurrentPassword ? (
                      <HiOutlineEyeOff className="h-4 w-4" />
                    ) : (
                      <HiOutlineEye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="new-password"
                  className="text-xs font-semibold text-text-secondary"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="new-password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwords.newPassword}
                    onChange={(e) =>
                      setPasswords({ ...passwords, newPassword: e.target.value })
                    }
                    placeholder="Min. 8 characters"
                    className="w-full rounded-xl border border-glass-border bg-background-card/80 py-2 pl-3.5 pr-9 text-xs font-medium text-text-primary backdrop-blur-md focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                  >
                    {showNewPassword ? (
                      <HiOutlineEyeOff className="h-4 w-4" />
                    ) : (
                      <HiOutlineEye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="confirm-password"
                  className="text-xs font-semibold text-text-secondary"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirmPassword: e.target.value })
                  }
                  placeholder="Re-enter password"
                  className="w-full rounded-xl border border-glass-border bg-background-card/80 py-2 px-3.5 text-xs font-medium text-text-primary backdrop-blur-md focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl border border-primary/40 bg-primary/20 px-4 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary/30 hover:shadow-glow"
              >
                <HiOutlineSave className="h-4 w-4" />
                <span>Update Password</span>
              </button>
            </div>
          </form>
        </div>

        {/* SECTION 2: TWO-FACTOR AUTHENTICATION (2FA) */}
        <div className="border-t border-glass-border pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <HiOutlineShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-text-primary">
                    Two-Factor Authentication (2FA)
                  </h3>
                  <span
                    className={cn(
                      'rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                      is2FAEnabled
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                        : 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                    )}
                  >
                    {is2FAEnabled ? 'Protected' : 'Disabled'}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-text-muted">
                  Add an extra layer of security to your account using TOTP Authenticator apps (Google Authenticator, 1Password, Authy).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {is2FAEnabled && (
                <button
                  type="button"
                  onClick={() => setShow2FAModal(!show2FAModal)}
                  className="hidden sm:flex items-center gap-1.5 rounded-xl border border-glass-border bg-glass/60 px-3 py-1.5 text-xs font-semibold text-text-secondary transition-all hover:bg-glass hover:text-text-primary"
                >
                  <HiOutlineQrcode className="h-4 w-4" />
                  <span>{show2FAModal ? 'Hide Key' : 'View QR Key'}</span>
                </button>
              )}

              <button
                type="button"
                role="switch"
                aria-checked={is2FAEnabled}
                onClick={handle2FAToggle}
                className={cn(
                  'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary',
                  is2FAEnabled ? 'bg-emerald-500' : 'bg-glass-border'
                )}
              >
                <span
                  className={cn(
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out',
                    is2FAEnabled ? 'translate-x-5' : 'translate-x-0'
                  )}
                />
              </button>
            </div>
          </div>

          {/* Expanded 2FA Info Box */}
          {show2FAModal && is2FAEnabled && (
            <div className="mt-4 flex flex-col items-center justify-between gap-4 rounded-2xl border border-glass-border bg-background-card/60 p-4 sm:flex-row backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white p-1 text-background-dark font-mono text-[10px] font-bold text-center border border-gray-300 shadow-sm">
                  [ QR CODE ]
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text-primary">Authenticator Secret Key</h4>
                  <p className="mt-0.5 text-xs font-mono text-primary">JBSWY3DPEHPK3PXP</p>
                  <p className="mt-1 text-[11px] text-text-muted">
                    Scan with Google Authenticator or 1Password to sync device.
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <HiOutlineCheck className="h-4 w-4" /> Configured
              </span>
            </div>
          )}
        </div>

        {/* SECTION 3: EXPORT DATA & DANGER ZONE */}
        <div className="border-t border-glass-border pt-6 space-y-6">
          {/* Export Account Data */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-glass-border bg-glass/40 p-4">
            <div>
              <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <HiOutlineDownload className="h-4 w-4 text-primary" />
                Export Account Data
              </h3>
              <p className="mt-0.5 text-xs text-text-muted">
                Download a complete JSON export of your subscription history, receipts, and settings.
              </p>
            </div>
            <button
              type="button"
              onClick={handleExportData}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-white shrink-0"
            >
              <HiOutlineDownload className="h-4 w-4" />
              <span>Export JSON Backup</span>
            </button>
          </div>

          {/* Delete Account Danger Zone */}
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                  <HiOutlineExclamation className="h-5 w-5" />
                  Danger Zone: Delete Account
                </h3>
                <p className="mt-0.5 text-xs text-rose-200/70">
                  Permanently delete your account, connected Gmail tokens, subscription ledgers, and all stored data.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-500 px-4 py-2 text-xs font-bold text-white transition-all shadow-lg shrink-0 cursor-pointer"
              >
                <HiOutlineTrash className="h-4 w-4" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal Dialog */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="relative z-10 w-full max-w-md rounded-3xl border border-rose-500/30 bg-surface p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/20 border border-rose-500/40">
                <HiOutlineTrash className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Delete Account Permanently</h3>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              This action <strong className="text-rose-400">cannot be undone</strong>. All your parsed bills, linked Gmail sessions, and AI health score history will be deleted immediately.
            </p>
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-text-secondary">
                Type <span className="font-bold text-rose-400">DELETE</span> to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                className="w-full rounded-xl border border-rose-500/40 bg-surface-light px-3.5 py-2 text-xs text-white uppercase placeholder-text-muted outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="rounded-xl border border-border bg-surface-light px-4 py-2 text-xs font-semibold text-text-secondary hover:bg-surface"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccountConfirm}
                disabled={deleteConfirmText.toUpperCase() !== 'DELETE' || isDeleting}
                className="rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 px-4 py-2 text-xs font-bold text-white shadow-lg transition-all"
              >
                {isDeleting ? 'Deleting...' : 'Confirm Deletion'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

SecurityPanel.propTypes = {
  className: PropTypes.string,
  onPasswordChange: PropTypes.func,
  onToggle2FA: PropTypes.func,
};

export default SecurityPanel;
