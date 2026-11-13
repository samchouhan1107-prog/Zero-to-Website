/**
 * ============================================================================
 * SHARED PAYMENT, VERIFICATION, SUBSCRIPTION & SETTLEMENT TYPES
 * Platform Owner & Publisher Identity: Sameer Chouhan / WebZoneBW
 * ============================================================================
 */

export type FinancialStatus =
  | 'Payment Initiated'
  | 'Payment Pending'
  | 'Payment Successful'
  | 'Subscription Activated'
  | 'Settlement Pending'
  | 'Funds Settled'
  | 'Payment Failed / Refunded';

export type PaymentVerificationState =
  | 'initiated'
  | 'pending_verification'
  | 'succeeded'
  | 'failed'
  | 'refunded';

export type SettlementState =
  | 'not_applicable'
  | 'settlement_pending'
  | 'funds_settled'
  | 'reversed';

export type SubscriptionLifecycleStatus =
  | 'none'
  | 'active'
  | 'expired'
  | 'cancelled_active_until_expiry'
  | 'refunded';

export type MerchantProviderType = 'stripe' | 'razorpay' | 'webzone-sandbox';

export interface PlanCatalogItem {
  planId: string;
  licenceType: 'subscription-access' | 'downloadable-learning' | 'commercial-use';
  contentId: string;
  title: string;
  description: string;
  amountUsd: number;
  amountCents: number;
  currency: 'USD';
  durationDays: number | null; // 30 for monthly pack, null for lifetime
  isRecurringMonthly: boolean;
}

export interface PaymentOrderRecord {
  orderId: string;
  idempotencyKey: string;
  userId: string;
  studentName: string;
  studentEmail: string;
  planId: string;
  planTitle: string;
  contentId: string;
  licenceType: 'subscription-access' | 'downloadable-learning' | 'commercial-use';
  provider: MerchantProviderType;
  providerOrderRef: string;
  checkoutUrl: string;
  grossAmountUsd: number;
  amountCents: number;
  currency: 'USD';
  paymentStatus: PaymentVerificationState;
  financialStatus: FinancialStatus;
  merchantTransactionId: string | null;
  merchantPaymentMethodSummary?: string | null; // e.g. "Sandbox Checkout" or "Card •••• 4242" (never raw PAN/CVV)
  verificationTimeMs: number | null;
  verifiedAt: string | null;
  subscriptionId: string | null;
  subscriptionActivated: boolean;
  settlementStatus: SettlementState;
  merchantFeeUsd: number;
  netSettlementUsd: number;
  payoutReference: string | null;
  settledAt: string | null;
  bankDepositNote: string;
  failureReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaidSubscriptionRecord {
  subscriptionId: string;
  userId: string;
  studentEmail: string;
  studentName: string;
  planId: string;
  planTitle: string;
  contentId: string;
  licenceType: 'subscription-access' | 'downloadable-learning' | 'commercial-use';
  orderId: string;
  merchantTransactionId: string;
  verifiedAmountUsd: number;
  currency: 'USD';
  status: SubscriptionLifecycleStatus;
  startDate: string;
  expiresAt: string | null;
  nextRenewalDate: string | null;
  autoRenew: boolean;
  cancelledAt: string | null;
  refundedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentAuditLogEntry {
  id: string;
  timestamp: string;
  eventType:
    | 'ORDER_CREATED'
    | 'CHECKOUT_SUBMITTED'
    | 'VERIFICATION_STARTED'
    | 'VERIFICATION_PENDING'
    | 'VERIFICATION_SUCCEEDED'
    | 'VERIFICATION_FAILED'
    | 'WEBHOOK_RECEIVED'
    | 'WEBHOOK_REJECTED'
    | 'SUBSCRIPTION_ACTIVATED'
    | 'SUBSCRIPTION_CANCELLED'
    | 'SUBSCRIPTION_EXPIRED'
    | 'PAYMENT_REFUNDED'
    | 'SETTLEMENT_RECONCILED'
    | 'SECURITY_REJECTION';
  orderId?: string;
  userId?: string;
  merchantTransactionId?: string;
  actor: 'student' | 'merchant-api' | 'webhook' | 'admin' | 'system';
  message: string;
  metadata?: Record<string, unknown>;
}

export interface StudentEntitlementSummary {
  userId: string;
  hasActiveMonthlyPack: boolean;
  hasDownloadAccess: boolean;
  unlockedAllChapters: boolean;
  status: SubscriptionLifecycleStatus;
  activeSubscription: PaidSubscriptionRecord | null;
  freeChaptersAllowed: string[];
}

export interface MerchantDashboardSummary {
  provider: MerchantProviderType;
  providerModeLabel: string;
  liveCredentialsConfigured: boolean;
  totalOrders: number;
  verifiedSuccessfulCount: number;
  pendingVerificationCount: number;
  failedOrRefundedCount: number;
  activeSubscriptionsCount: number;
  verifiedGrossUsd: number;
  totalMerchantFeesUsd: number;
  pendingSettlementUsd: number;
  settledNetUsd: number;
  orders: PaymentOrderRecord[];
  subscriptions: PaidSubscriptionRecord[];
  auditLogs: PaymentAuditLogEntry[];
}
