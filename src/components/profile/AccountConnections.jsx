import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  HiOutlineLink,
  HiOutlineCheckCircle,
  HiOutlineRefresh,
  HiOutlinePlusCircle,
  HiOutlineShieldCheck,
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';
import { mockProfileData } from '../../data/mockProfileData';

/**
 * AccountConnections — Connected Accounts card component for SubSense AI.
 * Displays OAuth and bank integrations (Google, Gmail Auto-Sync, Plaid Bank Connection)
 * with real-time status indicators, email/details, and interactive Connect/Disconnect action buttons.
 */
const AccountConnections = ({
  connectedAccounts = mockProfileData.connectedAccounts,
  onToggleConnection,
  className = '',
}) => {
  const [connections, setConnections] = useState(connectedAccounts);
  const [loadingId, setLoadingId] = useState(null);

  const handleToggle = (id) => {
    setLoadingId(id);
    setTimeout(() => {
      setConnections((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            const isConn =
              item.status.includes('Connected') || item.status.includes('Syncing');
            const newStatus = isConn ? 'Disconnected' : 'Connected';
            const newStatusType = isConn ? 'danger' : 'success';
            if (onToggleConnection) {
              onToggleConnection(id, newStatus);
            }
            return {
              ...item,
              status: newStatus,
              statusType: newStatusType,
            };
          }
          return item;
        })
      );
      setLoadingId(null);
    }, 600);
  };

  const getStatusBadge = (status, statusType) => {
    if (status === 'Disconnected') {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-gray-500/20 bg-gray-500/10 px-2.5 py-0.5 text-xs font-semibold text-text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
          {status}
        </span>
      );
    }

    if (statusType === 'success' || status.includes('Syncing')) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
          <HiOutlineCheckCircle className="h-3.5 w-3.5" />
          {status}
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400">
        <HiOutlineShieldCheck className="h-3.5 w-3.5" />
        {status}
      </span>
    );
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-glass-border bg-glass p-6 backdrop-blur-xl transition-all duration-300 md:p-8',
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-glass-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-text-primary">Connected Accounts</h2>
            <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {connections.filter((c) => c.status !== 'Disconnected').length} Active
            </span>
          </div>
          <p className="mt-0.5 text-xs text-text-muted">
            Manage your SSO, email parsing sync, and financial institution connections
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-glass-border bg-glass/80 px-3.5 py-1.5 text-xs font-semibold text-text-secondary transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
        >
          <HiOutlinePlusCircle className="h-4 w-4" />
          <span>Add Connection</span>
        </button>
      </div>

      {/* Connection List */}
      <div className="mt-6 divide-y divide-glass-border/50">
        {connections.map((item) => {
          const isConnected =
            item.status.includes('Connected') || item.status.includes('Syncing');
          const isLoading = loadingId === item.id;

          return (
            <div
              key={item.id}
              className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between first:pt-0 last:pb-0"
            >
              {/* Account Icon & Meta */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-glass-border bg-background-card/80 text-xl shadow-md backdrop-blur-md">
                  {item.icon}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-text-primary">
                      {item.name}
                    </h3>
                    {getStatusBadge(item.status, item.statusType)}
                  </div>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {item.email}
                  </p>
                  {item.description && (
                    <p className="mt-1 text-xs text-text-muted">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-end sm:shrink-0">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleToggle(item.id)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200',
                    isLoading && 'opacity-60 cursor-not-allowed',
                    isConnected
                      ? 'border-rose-500/20 bg-rose-500/10 text-rose-400 hover:border-rose-500/40 hover:bg-rose-500/20'
                      : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/20'
                  )}
                >
                  {isLoading ? (
                    <HiOutlineRefresh className="h-3.5 w-3.5 animate-spin" />
                  ) : isConnected ? (
                    <HiOutlineLink className="h-3.5 w-3.5 rotate-45 text-rose-400" />
                  ) : (
                    <HiOutlineLink className="h-3.5 w-3.5 text-emerald-400" />
                  )}
                  <span>
                    {isLoading
                      ? 'Updating...'
                      : isConnected
                      ? 'Disconnect'
                      : 'Connect Account'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

AccountConnections.propTypes = {
  connectedAccounts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      statusType: PropTypes.string,
      icon: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  onToggleConnection: PropTypes.func,
  className: PropTypes.string,
};

export default AccountConnections;
