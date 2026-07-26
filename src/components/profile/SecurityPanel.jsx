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
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';

/**
 * SecurityPanel — Account Security, Password, 2FA, Active Sessions, and Danger Zone component.
 * Provides controls to update passwords, toggle Two-Factor Authentication (2FA),
 * manage active browser/device sessions, review security encryption standards, and initiate account deletion.
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
          Manage your password, enable two-factor authentication, and monitor connected devices.
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

        {/* SECTION 3: ACTIVE SESSIONS */}
        <div className="border-t border-glass-border pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                Active Sessions & Logged-in Devices
              </h3>
              <p className="mt-0.5 text-xs text-text-muted">
                Review devices currently authenticated with your SubSense AI account.
              </p>
            </div>
            <span className="rounded-md border border-glass-border bg-glass/60 px-2 py-0.5 text-xs font-medium text-text-muted">
              {activeSessions.length} Devices
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {activeSessions.map((session) => {
              const Icon = session.icon;
              return (
                <div
                  key={session.id}
                  className="flex flex-col gap-3 rounded-2xl border border-glass-border/60 bg-glass/30 p-3.5 transition-all sm:flex-row sm:items-center sm:justify-between hover:bg-glass/60"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-glass-border bg-background-card/80 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-semibold text-text-primary">
                          {session.device}
                        </h4>
                        {session.isCurrent && (
                          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                            Current Session
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-[11px] text-text-muted">
                        {session.location} • <span className="font-mono">{session.ip}</span> •{' '}
                        {session.lastActive}
                      </p>
                    </div>
                  </div>

                  {!session.isCurrent && (
                    <button
                      type="button"
                      onClick={() => handleRevokeSession(session.id)}
                      className="self-end sm:self-auto flex items-center gap-1.5 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-400 transition-all hover:bg-rose-500/20"
                    >
                      <HiOutlineTrash className="h-3.5 w-3.5" />
                      <span>Revoke</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 4: SECURITY & COMPLIANCE BADGES */}
        <div className="border-t border-glass-border pt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl border border-glass-border/40 bg-glass/20 p-3.5">
              <HiOutlineLockClosed className="h-5 w-5 text-primary shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-text-primary">AES-256 Encryption</h4>
                <p className="text-[10px] text-text-muted">Bank-grade data encryption at rest</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-glass-border/40 bg-glass/20 p-3.5">
              <HiOutlineShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-text-primary">SOC2 Type II Ready</h4>
                <p className="text-[10px] text-text-muted">Strict privacy compliance controls</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-glass-border/40 bg-glass/20 p-3.5">
              <HiOutlineKey className="h-5 w-5 text-accent-purple shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-text-primary">OAuth 2.0 Auth</h4>
                <p className="text-[10px] text-text-muted">Zero plain-text password sharing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SecurityPanel.propTypes = {
  className: PropTypes.string,
  onPasswordChange: PropTypes.func,
  onToggle2FA: PropTypes.func,
};

export default SecurityPanel;
