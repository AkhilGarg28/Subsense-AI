import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  HiOutlineShieldCheck,
  HiOutlineKey,
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

const SecurityPanel = ({ className = '', onPasswordChange, onToggle2FA }) => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(null);

  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [show2FAModal, setShow2FAModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handle2FAToggle = () => {
    const nextState = !is2FAEnabled;
    setIs2FAEnabled(nextState);
    if (onToggle2FA) {
      onToggle2FA(nextState);
    }
  };

  const handleExportData = () => {
    const exportPayload = {
      user: mockProfileData.user,
      preferences: mockProfileData.preferences,
      connectedAccounts: mockProfileData.connectedAccounts,
      exportTimestamp: new Date().toISOString(),
      appVersion: 'SubSense AI 2.4.0 (Pro)',
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `subsense-account-data-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDeleteAccountConfirm = () => {
    if (deleteConfirmText.toUpperCase() !== 'DELETE') return;

    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setShowDeleteModal(false);
      alert('Account deleted successfully.');
      window.location.href = '/';
    }, 1200);
  };

  return (
    <div className={cn('rounded-2xl border border-white/10 bg-[#171F2F]/80 p-6 shadow-2xl backdrop-blur-xl md:p-8', className)}>
      <div className="border-b border-white/10 pb-5">
        <h2 className="text-xl font-bold text-white">Security & Authentication</h2>
        <p className="mt-0.5 text-xs text-[#A1A8B5]">
          Manage your password, enable two-factor authentication, export data, and account deletion options.
        </p>
      </div>

      <div className="mt-6 space-y-8">
        {/* Change Password */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#5B8CFF]">
            <HiOutlineKey className="h-4 w-4" />
            <h3>CHANGE PASSWORD</h3>
          </div>

          {passwordStatus && (
            <div
              className={cn(
                'mt-3 flex items-center gap-2 rounded-xl p-3 text-xs font-mono',
                passwordStatus.type === 'error'
                  ? 'border border-[#EF4444]/30 bg-[#EF4444]/15 text-[#EF4444]'
                  : 'border border-[#22C55E]/30 bg-[#22C55E]/15 text-[#22C55E]'
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

          <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <label className="text-[#A1A8B5]">CURRENT PASSWORD</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwords.currentPassword}
                    onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/10 bg-[#121A2F] py-2 pl-3 pr-8 text-white focus:border-[#5B8CFF] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A1A8B5]"
                  >
                    {showCurrentPassword ? <HiOutlineEyeOff className="h-4 w-4" /> : <HiOutlineEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#A1A8B5]">NEW PASSWORD</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    placeholder="MIN. 8 CHARS"
                    className="w-full rounded-xl border border-white/10 bg-[#121A2F] py-2 pl-3 pr-8 text-white focus:border-[#5B8CFF] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A1A8B5]"
                  >
                    {showNewPassword ? <HiOutlineEyeOff className="h-4 w-4" /> : <HiOutlineEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#A1A8B5]">CONFIRM PASSWORD</label>
                <input
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                  placeholder="RE-ENTER PASSWORD"
                  className="w-full rounded-xl border border-white/10 bg-[#121A2F] py-2 px-3 text-white focus:border-[#5B8CFF] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl gradient-primary hover:brightness-110 px-5 py-2.5 text-xs font-bold text-white shadow-glow-blue transition-all cursor-pointer"
              >
                <HiOutlineSave className="h-4 w-4" />
                <span>Update Password</span>
              </button>
            </div>
          </form>
        </div>

        {/* 2FA */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
                <HiOutlineShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">
                    Two-Factor Authentication (2FA)
                  </h3>
                  <span className={cn('rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase', is2FAEnabled ? 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30' : 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30')}>
                    {is2FAEnabled ? 'Protected' : 'Disabled'}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-[#A1A8B5]">
                  Add an extra layer of security using TOTP Authenticator apps.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              {is2FAEnabled && (
                <button
                  type="button"
                  onClick={() => setShow2FAModal(!show2FAModal)}
                  className="hidden sm:flex items-center gap-1.5 rounded-xl bg-[#121A2F] border border-white/10 px-3 py-1.5 text-[#A1A8B5] hover:text-white"
                >
                  <HiOutlineQrcode className="h-4 w-4" />
                  <span>{show2FAModal ? 'Hide Key' : 'View Key'}</span>
                </button>
              )}

              <button
                type="button"
                onClick={handle2FAToggle}
                className={cn('px-4 py-1.5 rounded-full font-bold transition-all cursor-pointer', is2FAEnabled ? 'bg-[#22C55E] text-white shadow-sm' : 'bg-[#121A2F] text-[#A1A8B5] border border-white/10')}
              >
                {is2FAEnabled ? 'ENABLED' : 'ENABLE'}
              </button>
            </div>
          </div>

          {show2FAModal && is2FAEnabled && (
            <div className="mt-4 flex flex-col items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#121A2F] p-4 sm:flex-row font-mono text-xs">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white text-[#0B1020] font-bold text-[10px] text-center shadow-md">
                  [ QR CODE ]
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">AUTHENTICATOR SECRET KEY</h4>
                  <p className="mt-0.5 text-xs text-[#5B8CFF]">JBSWY3DPEHPK3PXP</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#22C55E]/15 text-[#22C55E] px-3 py-1 border border-[#22C55E]/30">
                <HiOutlineCheck className="h-4 w-4" /> Configured
              </span>
            </div>
          )}
        </div>

        {/* Data Export & Danger Zone */}
        <div className="border-t border-white/10 pt-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#121A2F] p-5">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <HiOutlineDownload className="h-4 w-4 text-[#5B8CFF]" />
                Export Account Data
              </h3>
              <p className="mt-0.5 text-xs text-[#A1A8B5]">
                Download a complete JSON export of your subscription history and receipts.
              </p>
            </div>
            <button
              type="button"
              onClick={handleExportData}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#5B8CFF]/30 bg-[#5B8CFF]/15 px-4 py-2 font-mono text-xs font-bold text-[#5B8CFF] hover:bg-[#5B8CFF] hover:text-white transition-all shrink-0 cursor-pointer"
            >
              <HiOutlineDownload className="h-4 w-4" />
              <span>Export JSON Backup</span>
            </button>
          </div>

          <div className="rounded-2xl border border-[#EF4444]/30 bg-[#EF4444]/10 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-[#EF4444] flex items-center gap-2">
                  <HiOutlineExclamation className="h-5 w-5" />
                  Danger Zone: Delete Account
                </h3>
                <p className="mt-0.5 text-xs text-[#EF4444]/80">
                  Permanently delete your account, connected Gmail tokens, and stored subscription ledgers.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] px-4 py-2 font-mono text-xs font-bold text-white shadow-lg shrink-0 cursor-pointer"
              >
                <HiOutlineTrash className="h-4 w-4" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-mono">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowDeleteModal(false)} />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-[#EF4444]/40 bg-[#171F2F] p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-[#EF4444]">
              <HiOutlineTrash className="h-6 w-6" />
              <h3 className="text-base font-bold text-white">Delete Account Permanently</h3>
            </div>
            <p className="text-xs text-[#A1A8B5] leading-relaxed">
              This action cannot be undone. All stored ledgers and receipts will be wiped.
            </p>
            <div className="space-y-1.5 pt-2 text-xs">
              <label className="text-[#A1A8B5]">Type <span className="font-bold text-[#EF4444]">DELETE</span> to confirm:</label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                className="w-full rounded-xl border border-[#EF4444]/40 bg-[#121A2F] px-3.5 py-2 text-white uppercase focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="rounded-xl border border-white/10 bg-[#121A2F] px-4 py-2 text-[#A1A8B5]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccountConfirm}
                disabled={deleteConfirmText.toUpperCase() !== 'DELETE' || isDeleting}
                className="rounded-xl bg-[#EF4444] disabled:opacity-50 px-4 py-2 font-bold text-white shadow-lg"
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
