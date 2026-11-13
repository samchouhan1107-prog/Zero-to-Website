import React, { useState, useEffect, useCallback } from 'react';
import {
  CreditCard,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Landmark,
  RotateCcw,
  FileText,
} from 'lucide-react';
import type {
  FinancialStatus,
  MerchantDashboardSummary,
  PaymentOrderRecord,
} from '../../shared/paymentTypes';
import * as authService from '../../utils/authService';

interface MerchantDashboardViewProps {
  onAddToast: (title: string, message: string, type?: 'info' | 'success' | 'update') => void;
}

const ALL_FINANCIAL_STATUSES: FinancialStatus[] = [
  'Payment Initiated',
  'Payment Pending',
  'Payment Successful',
  'Subscription Activated',
  'Settlement Pending',
  'Funds Settled',
  'Payment Failed / Refunded',
];

function getStatusBadgeClass(status: FinancialStatus): string {
  switch (status) {
    case 'Subscription Activated':
    case 'Funds Settled':
    case 'Payment Successful':
      return 'badge-success';
    case 'Payment Pending':
    case 'Settlement Pending':
      return 'badge-warning';
    case 'Payment Failed / Refunded':
      return 'badge-danger';
    default:
      return 'badge-primary';
  }
}

export const MerchantDashboardView: React.FC<MerchantDashboardViewProps> = ({
  onAddToast,
}) => {
  const [summary, setSummary] = useState<MerchantDashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyOrderId, setBusyOrderId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const loadSummary = useCallback(async () => {
    setLoading(true);
    try {
      const res = await authService.fetchMerchantDashboard();
      if (res.success && res.summary) {
        setSummary(res.summary);
      }
    } catch {
      onAddToast('Dashboard Error', 'Could not load merchant records.', 'info');
    } finally {
      setLoading(false);
    }
  }, [onAddToast]);

  useEffect(() => {
    void loadSummary();
  }, [loadSummary]);

  const handleSettlePayout = async (order: PaymentOrderRecord) => {
    setBusyOrderId(order.orderId);
    try {
      const res = await authService.reconcileMerchantSettlement(order.orderId);
      if (res.success) {
        onAddToast(
          'Settlement Reconciled',
          `Order ${order.orderId} marked Funds Settled (${res.order?.payoutReference}).`,
          'success'
        );
        await loadSummary();
      } else {
        onAddToast('Settlement Error', res.error || 'Failed to settle order.', 'info');
      }
    } finally {
      setBusyOrderId(null);
    }
  };

  const handleRefundOrder = async (order: PaymentOrderRecord) => {
    setBusyOrderId(order.orderId);
    try {
      const res = await authService.refundMerchantOrder(
        order.orderId,
        'Admin / 14-day refund processed'
      );
      if (res.success) {
        onAddToast(
          'Order Refunded',
          `Order ${order.orderId} refunded and student access revoked.`,
          'info'
        );
        await loadSummary();
      } else {
        onAddToast('Refund Error', res.error || 'Refund failed.', 'info');
      }
    } finally {
      setBusyOrderId(null);
    }
  };

  const filteredOrders = (summary?.orders || []).filter((order) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'Settlement Pending') {
      return order.paymentStatus === 'succeeded' && order.settlementStatus === 'settlement_pending';
    }
    if (statusFilter === 'Funds Settled') {
      return order.settlementStatus === 'funds_settled';
    }
    if (statusFilter === 'Payment Successful') {
      return order.paymentStatus === 'succeeded';
    }
    return order.financialStatus === statusFilter;
  });

  return (
    <div className="app-main">
      {/* Header */}
      <div className="section-heading-bar">
        <div>
          <h2>Merchant Payments, Subscriptions &amp; Settlement Ledger</h2>
          <p className="lead-paragraph" style={{ margin: '0.25rem 0 0 0', fontSize: 'var(--text-sm)' }}>
            Server-verified order lifecycle tracking for <strong>Sameer Chouhan / WebZoneBW</strong>. Distinguishes authorized payments, active student subscriptions, and settled bank payouts.
          </p>
        </div>

        <button
          type="button"
          onClick={loadSummary}
          disabled={loading}
          className="btn btn-secondary btn-sm"
        >
          <RefreshCw size={14} />
          <span>{loading ? 'Refreshing...' : 'Refresh Ledger'}</span>
        </button>
      </div>

      {/* Provider & Financial Distinction Disclosure */}
      {summary && (
        <div
          className="card"
          style={{
            marginBottom: 'var(--space-6)',
            padding: 'var(--space-5)',
            borderLeft: '4px solid var(--color-primary)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={18} style={{ color: 'var(--color-primary)' }} />
              <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-strong)' }}>
                Connected Provider: {summary.providerModeLabel}
              </strong>
            </div>
            <span
              className={`badge ${
                summary.liveCredentialsConfigured ? 'badge-success' : 'badge-warning'
              }`}
            >
              {summary.liveCredentialsConfigured
                ? 'Live Merchant Credentials Active'
                : 'Sandbox Test Mode (No Live Keys in Env)'}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
            <strong>Accounting Integrity Rule:</strong> <em>Payment Successful</em> and{' '}
            <em>Subscription Activated</em> record verified merchant authorization.{' '}
            <em>Settlement Pending</em> indicates funds clearing with the merchant processor. Net revenue is marked{' '}
            <em>Funds Settled</em> only after payout reconciliation with an explicit payout reference and deposit date — never assumed directly from bank balances.
          </p>
        </div>
      )}

      {/* KPI Metrics Grid */}
      {summary && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(195px, 1fr))',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-6)',
          }}
        >
          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <div style={{ fontSize: '11px', color: 'var(--color-text-subtle)', fontWeight: 700, textTransform: 'uppercase' }}>
              Verified Gross Volume
            </div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginTop: '0.25rem' }}>
              ${summary.verifiedGrossUsd.toFixed(2)}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              {summary.verifiedSuccessfulCount} verified orders · Fees: ${summary.totalMerchantFeesUsd.toFixed(2)}
            </div>
          </div>

          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <div style={{ fontSize: '11px', color: 'var(--color-text-subtle)', fontWeight: 700, textTransform: 'uppercase' }}>
              Settlement Pending
            </div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-warning)', marginTop: '0.25rem' }}>
              ${summary.pendingSettlementUsd.toFixed(2)}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              Authorized &amp; clearing before bank deposit
            </div>
          </div>

          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <div style={{ fontSize: '11px', color: 'var(--color-text-subtle)', fontWeight: 700, textTransform: 'uppercase' }}>
              Funds Settled (Net Payouts)
            </div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-success)', marginTop: '0.25rem' }}>
              ${summary.settledNetUsd.toFixed(2)}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              Reconciled with merchant payout reference
            </div>
          </div>

          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <div style={{ fontSize: '11px', color: 'var(--color-text-subtle)', fontWeight: 700, textTransform: 'uppercase' }}>
              Active Subscriptions
            </div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-primary)', marginTop: '0.25rem' }}>
              {summary.activeSubscriptionsCount}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              Pending Verification: {summary.pendingVerificationCount} · Failed/Refunded: {summary.failedOrRefundedCount}
            </div>
          </div>
        </div>
      )}

      {/* 7 Explicit Lifecycle Status Legend & Filter */}
      <div
        className="card"
        style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-6)' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '0.75rem',
          }}
        >
          <strong style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--color-text-subtle)' }}>
            7 Merchant Payment &amp; Settlement Lifecycle States:
          </strong>
          {statusFilter !== 'all' && (
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className="btn btn-subtle btn-sm"
              style={{ fontSize: '11px' }}
            >
              Show All Orders
            </button>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
          {ALL_FINANCIAL_STATUSES.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(statusFilter === st ? 'all' : st)}
              className={`badge ${getStatusBadgeClass(st)}`}
              style={{
                cursor: 'pointer',
                border: statusFilter === st ? '2px solid var(--color-text-strong)' : undefined,
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders & Settlement Table */}
      <div className="card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <CreditCard size={18} style={{ color: 'var(--color-primary)' }} />
          <h3 style={{ margin: 0, fontSize: 'var(--text-lg)' }}>
            Orders, Verification Timing &amp; Settlement Payouts ({filteredOrders.length})
          </h3>
        </div>

        {filteredOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
            No merchant orders match this filter yet.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left', color: 'var(--color-text-subtle)' }}>
                  <th style={{ padding: '0.6rem 0.5rem' }}>Order &amp; Student</th>
                  <th style={{ padding: '0.6rem 0.5rem' }}>Merchant Txn Ref</th>
                  <th style={{ padding: '0.6rem 0.5rem' }}>Amounts (USD)</th>
                  <th style={{ padding: '0.6rem 0.5rem' }}>Order Status</th>
                  <th style={{ padding: '0.6rem 0.5rem' }}>Settlement &amp; Payout</th>
                  <th style={{ padding: '0.6rem 0.5rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.orderId}
                    style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
                  >
                    <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top' }}>
                      <strong style={{ display: 'block', color: 'var(--color-text-strong)' }}>
                        {order.orderId}
                      </strong>
                      <div style={{ color: 'var(--color-text-muted)' }}>
                        {order.studentName} ({order.studentEmail})
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-subtle)' }}>
                        {order.planTitle}
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top' }}>
                      <div>
                        <code>{order.merchantTransactionId || order.providerOrderRef}</code>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-subtle)' }}>
                        {order.provider}
                        {order.verificationTimeMs !== null ? ` · Verified in ${order.verificationTimeMs}ms` : ''}
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top' }}>
                      <div>
                        Gross: <strong>${order.grossAmountUsd.toFixed(2)}</strong>
                      </div>
                      {order.paymentStatus === 'succeeded' && (
                        <>
                          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                            Fee: -${order.merchantFeeUsd.toFixed(2)}
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--color-success)', fontWeight: 700 }}>
                            Net: ${order.netSettlementUsd.toFixed(2)}
                          </div>
                        </>
                      )}
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top' }}>
                      <span className={`badge ${getStatusBadgeClass(order.financialStatus)}`}>
                        {order.financialStatus}
                      </span>
                      {order.failureReason && (
                        <div style={{ fontSize: '11px', color: 'var(--color-danger)', marginTop: '0.25rem' }}>
                          {order.failureReason}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top', maxWidth: '240px' }}>
                      <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>
                        {order.settlementStatus === 'funds_settled'
                          ? 'Funds Settled'
                          : order.settlementStatus === 'settlement_pending'
                          ? 'Settlement Pending'
                          : order.settlementStatus === 'reversed'
                          ? 'Reversed / Refunded'
                          : 'Not Collected'}
                      </div>
                      {order.payoutReference && (
                        <div style={{ fontSize: '11px' }}>
                          Payout: <code>{order.payoutReference}</code> ({order.settledAt?.slice(0, 10)})
                        </div>
                      )}
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                        {order.bankDepositNote}
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {order.paymentStatus === 'succeeded' &&
                          order.settlementStatus === 'settlement_pending' && (
                            <button
                              type="button"
                              disabled={busyOrderId === order.orderId}
                              onClick={() => handleSettlePayout(order)}
                              className="btn btn-primary btn-sm"
                              style={{ fontSize: '11px', padding: '0.25rem 0.55rem' }}
                            >
                              <Landmark size={12} />
                              <span>Reconcile Settlement</span>
                            </button>
                          )}
                        {order.paymentStatus === 'succeeded' && (
                          <button
                            type="button"
                            disabled={busyOrderId === order.orderId}
                            onClick={() => handleRefundOrder(order)}
                            className="btn btn-secondary btn-sm"
                            style={{ fontSize: '11px', padding: '0.25rem 0.55rem' }}
                          >
                            <RotateCcw size={12} />
                            <span>Issue Refund &amp; Revoke</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Immutable Audit Log */}
      {summary && (
        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <FileText size={18} style={{ color: 'var(--color-primary)' }} />
            <h3 style={{ margin: 0, fontSize: 'var(--text-lg)' }}>
              Immutable Merchant Audit Log ({summary.auditLogs.length})
            </h3>
          </div>

          {summary.auditLogs.length === 0 ? (
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
              No payment audit events logged yet.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', maxHeight: '340px', overflowY: 'auto' }}>
              {summary.auditLogs.slice(0, 50).map((log) => (
                <div
                  key={log.id}
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-surface-subtle)',
                    border: '1px solid var(--color-border-subtle)',
                    fontSize: '11px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    <span className="badge badge-subtle" style={{ marginRight: '0.5rem', fontSize: '10px' }}>
                      {log.eventType}
                    </span>
                    <span style={{ color: 'var(--color-text-strong)' }}>{log.message}</span>
                  </div>
                  <div style={{ color: 'var(--color-text-subtle)', whiteSpace: 'nowrap' }}>
                    [{log.actor}] · {new Date(log.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
