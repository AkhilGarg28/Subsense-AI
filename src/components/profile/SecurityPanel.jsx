import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
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
      appVersion: 'SubSense AI 2.4.0 (Ledger)',
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `subsense-ledger-data-${Date.now()}.json`);
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
    <div className={cn('rounded-xl border border-[#F3F1EA]/10 bg-[#171A18] p-6 shadow-2xl md:p-8', className)}>
      <div className="border-b border-[#F3F1EA]/10 pb-5">
        <h2 className="text-xl font-display font-bold text-[#F3F1EA]">Security & Authentication</h2>
        <p className="mt-0.5 text-xs text-[#96988F] font-sans">
          Manage your password, enable two-factor authentication, export data, and account deletion options.
        </p>
      </div>

      <div className="mt-6 space-y-8">
        {/* Change Password */}
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#C2A155]">
            <HiOutlineKey className="h-4 w-4" />
            <h3>CHANGE PASSWORD</h3>
          </div>

          {passwordStatus && (
            <div
              className={cn(
                'mt-3 flex items-center gap-2 rounded p-3 text-xs font-mono',
                passwordStatus.type === 'error'
                  ? 'border border-[#D65C4F]/30 bg-[#D65C4F]/15 text-[#D65C4F]'
                  : 'border border-[#3FA972]/30 bg-[#3FA972]/15 text-[#3FA972]'
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
                <label className="text-[#96988F]">CURRENT PASSWORD</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwords.currentPassword}
                    onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full rounded border border-[#F3F1EA]/10 bg-[#0D0F0E] py-2 pl-3 pr-8 text-[#F3F1EA] focus:border-[#C2A155] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#96988F]"
                  >
                    {showCurrentPassword ? <HiOutlineEyeOff className="h-4 w-4" /> : <HiOutlineEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#96988F]">NEW PASSWORD</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    placeholder="MIN. 8 CHARS"
                    className="w-full rounded border border-[#F3F1EA]/10 bg-[#0D0F0E] py-2 pl-3 pr-8 text-[#F3F1EA] focus:border-[#C2A155] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#96988F]"
                  >
                    {showNewPassword ? <HiOutlineEyeOff className="h-4 w-4" /> : <HiOutlineEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#96988F]">CONFIRM PASSWORD</label>
                <input
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                  placeholder="RE-ENTER PASSWORD"
                  className="w-full rounded border border-[#F3F1EA]/10 bg-[#0D0F0E] py-2 px-3 text-[#F3F1EA] focus:border-[#C2A155] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded bg-[#C2A155] hover:bg-[#D4B468] px-4 py-2 text-xs font-bold text-[#0D0F0E] transition-all"
              >
                <HiOutlineSave className="h-4 w-4" />
                <span>Update Password</span>
              </button>
            </div>
          </form>
        </div>

        {/* 2FA */}
        <div className="border-t border-[#F3F1EA]/10 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#3FA972]/15 text-[#3FA972] border border-[#3FA972]/30">
                <HiOutlineShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-mono font-bold text-[#F3F1EA] uppercase">
                    Two-Factor Authentication (2FA)
                  </h3>
                  <span className={cn('rounded px-2 py-0.5 text-[9px] font-mono font-bold uppercase', is2FAEnabled ? 'bg-[#3FA972]/15 text-[#3FA972] border border-[#3FA972]/30' : 'bg-[#D97706]/15 text-[#D97706] border border-[#D97706]/30')}>
                    {is2FAEnabled ? 'Protected' : 'Disabled'}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-[#96988F] font-sans">
                  Add an extra layer of security using TOTP Authenticator apps.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              {is2FAEnabled && (
                <button
                  type="button"
                  onClick={() => setShow2FAModal(!show2FAModal)}
                  className="hidden sm:flex items-center gap-1 rounded bg-[#0D0F0E] border border-[#F3F1EA]/10 px-3 py-1.5 text-[#96988F] hover:text-[#F3F1EA]"
                >
                  <HiOutlineQrcode className="h-4 w-4" />
                  <span>{show2FAModal ? 'Hide Key' : 'View Key'}</span>
                </button>
              )}

              <button
                type="button"
                onClick={handle2FAToggle}
                className={cn('px-3 py-1 rounded font-bold transition-all', is2FAEnabled ? 'bg-[#3FA972] text-[#0D0F0E]' : 'bg-[#0D0F0E] text-[#96988F] border border-[#F3F1EA]/10')}
              >
                {is2FAEnabled ? 'ENABLED' : 'ENABLE'}
              </button>
            </div>
          </div>

          {show2FAModal && is2FAEnabled && (
            <div className="mt-4 flex flex-col items-center justify-between gap-4 rounded border border-[#F3F1EA]/10 bg-[#0D0F0E] p-4 sm:flex-row font-mono text-xs">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded bg-[#F3F1EA] text-[#0D0F0E] font-bold text-[10px] text-center">
                  [ QR CODE ]
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#F3F1EA]">AUTHENTICATOR SECRET KEY</h4>
                  <p className="mt-0.5 text-xs text-[#C2A155]">JBSWY3DPEHPK3PXP</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded bg-[#3FA972]/15 text-[#3FA972] px-3 py-1 border border-[#3FA972]/30">
                <HiOutlineCheck className="h-4 w-4" /> Configured
              </span>
            </div>
          )}
        </div>

        {/* Data Export & Danger Zone */}
        <div className="border-t border-[#F3F1EA]/10 pt-6 space-y-6 font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded border border-[#F3F1EA]/10 bg-[#0D0F0E] p-4">
            <div>
              <h3 className="font-bold text-[#F3F1EA] flex items-center gap-2">
                <HiOutlineDownload className="h-4 w-4 text-[#C2A155]" />
                EXPORT ACCOUNT LEDGER
              </h3>
              <p className="mt-0.5 text-[11px] text-[#96988F] font-sans">
                Download a complete JSON export of your subscription history and receipts.
              </p>
            </div>
            <button
              type="button"
              onClick={handleExportData}
              className="inline-flex items-center justify-center gap-2 rounded bg-[#C2A155] hover:bg-[#D4B468] px-4 py-2 font-bold text-[#0D0F0E] shrink-0"
            >
              <HiOutlineDownload className="h-4 w-4" />
              <span>Export JSON</span>
            </button>
          </div>

          <div className="rounded border border-[#D65C4F]/40 bg-[#D65C4F]/10 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-[#D65C4F] flex items-center gap-2">
                  <HiOutlineExclamation className="h-5 w-5" />
                  DANGER ZONE: DELETE ACCOUNT
                </h3>
                <p className="mt-0.5 text-[11px] text-[#96988F] font-sans">
                  Permanently delete your account, connected Gmail tokens, and stored subscription ledgers.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded bg-[#D65C4F] hover:bg-[#E06D60] px-4 py-2 font-bold text-[#0D0F0E] shrink-0 cursor-pointer"
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
          <div className="fixed inset-0 bg-[#0D0F0E]/90" onClick={() => setShowDeleteModal(false)} />
          <div className="relative z-10 w-full max-w-md rounded-xl border border-[#D65C4F]/40 bg-[#171A18] p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-[#D65C4F]">
              <HiOutlineTrash className="h-6 w-6" />
              <h3 className="text-base font-bold text-[#F3F1EA]">Delete Account Permanently</h3>
            </div>
            <p className="text-xs text-[#96988F] font-sans leading-relaxed">
              This action cannot be undone. All stored ledgers and receipts will be wiped.
            </p>
            <div className="space-y-1.5 pt-2 text-xs">
              <label className="text-[#96988F]">Type <span className="font-bold text-[#D65C4F]">DELETE</span> to confirm:</label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                className="w-full rounded border border-[#D65C4F]/40 bg-[#0D0F0E] px-3.5 py-2 text-[#F3F1EA] uppercase focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F3F1EA]/10 text-xs">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="rounded border border-[#F3F1EA]/10 bg-[#0D0F0E] px-4 py-2 text-[#96988F]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccountConfirm}
                disabled={deleteConfirmText.toUpperCase() !== 'DELETE' || isDeleting}
                className="rounded bg-[#D65C4F] disabled:opacity-50 px-4 py-2 font-bold text-[#0D0F0E]"
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
