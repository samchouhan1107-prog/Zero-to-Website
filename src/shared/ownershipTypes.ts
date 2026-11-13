/**
 * ============================================================================
 * SHARED OWNERSHIP & LICENSING DATA TYPES
 * Platform Owner & Publisher Identity: Sameer Chouhan / WebZoneBW
 * ============================================================================
 */

export type LicenceType =
  | 'personal-learning'          // Standard personal online access
  | 'downloadable-learning'      // Personal online + downloadable PDF/code packs
  | 'commercial-use'             // Team/company internal training & commercial deployment
  | 'creator-distribution'       // Authorized redistribution/white-label rights
  | 'subscription-access'        // Recurring monthly/annual access
  | 'limited-term-access';       // 1-year or fixed-term student access

export type ContentOwnershipType =
  | 'platform-owned'             // Owned by Sameer Chouhan / WebZoneBW
  | 'creator-owned'              // Owned by independent instructor/author
  | 'commissioned'               // Commissioned by platform under work-for-hire
  | 'licensed-third-party';      // Licensed from open standards / partners with attribution

export interface LicenceTerms {
  type: LicenceType;
  title: string;
  description: string;
  permitted: string[];
  prohibited: string[];
  allowsDownload: boolean;
  allowsCommercialUse: boolean;
  allowsModification: boolean;
  allowsResale: boolean;
  termDuration: string;          // 'Lifetime', '1 Year', 'Active Subscription', etc.
}

export interface RightsRecord {
  contentId: string;
  contentTitle: string;
  contentType: 'course' | 'chapter' | 'lesson' | 'resource-pack' | 'sandbox-template';
  ownershipType: ContentOwnershipType;
  ownerName: string;             // Default: 'Sameer Chouhan / WebZoneBW'
  ownerContact: string;          // Empty until verified contact mailbox is configured
  publisherName: string;         // 'Sameer Chouhan / WebZoneBW'
  publisherContact: string;      // Empty until verified contact mailbox is configured
  creationDate: string;
  publicationDate: string;
  lastReviewedDate: string;
  nextReviewDueDate: string;     // 4-6 week review cycle
  reviewCycleWeeks: number;      // Default 4 to 6 weeks
  version: string;
  revisionHistory: Array<{
    version: string;
    date: string;
    changedBy: string;
    summary: string;
    originalityVerified: boolean;
  }>;
  availableLicences: LicenceType[];
  pricingUsd: Record<LicenceType, number>;
  sourceAttribution?: string;
  copyrightNotice: string;
  originalityScore: number;       // 0-100 verified score
  aiAssistedDisclosure: {
    isAiAssisted: boolean;
    humanReviewedAndFactChecked: boolean;
    reviewerName: string;
    reviewDate: string;
    editorialNotes: string;
  };
}

export interface UserAccessGrant {
  id: string;
  userId: string;
  contentId: string;
  licenceType: LicenceType;
  grantedAt: string;
  expiresAt: string | null;      // null = lifetime
  transactionId?: string;
  purchasePriceUsd?: number;
  status: 'active' | 'expired' | 'revoked' | 'refunded';
}

// Canonical Licence Definitions
export const STANDARD_LICENCES: Record<LicenceType, LicenceTerms> = {
  'personal-learning': {
    type: 'personal-learning',
    title: 'Personal Learning Licence',
    description: 'Single-seat access for personal self-study and interactive practice.',
    permitted: [
      'Interactive online viewing across all personal devices',
      'Completion of quizzes, checkpoints, and sandbox practice labs',
      'Earning cryptographically verifiable certificates of completion',
    ],
    prohibited: [
      'Redistribution or sharing of account credentials',
      'Commercial broadcast, classroom projection, or resale',
      'Scraping or harvesting curriculum content',
    ],
    allowsDownload: false,
    allowsCommercialUse: false,
    allowsModification: false,
    allowsResale: false,
    termDuration: 'Lifetime Student Access',
  },
  'downloadable-learning': {
    type: 'downloadable-learning',
    title: 'Downloadable Study Pack Licence',
    description: 'Includes complete offline PDF textbooks, code project archives, and assets.',
    permitted: [
      'Downloading printable PDF lesson textbooks with official copyright watermarks',
      'Offline storage of code solutions, starter files, and sandbox projects',
      'Printing physical hard-copies for personal study desks',
    ],
    prohibited: [
      'Uploading downloadable PDFs to public file shares, Discord, or GitHub',
      'Removal or alteration of Sameer Chouhan / WebZoneBW publisher notices',
      'Reselling downloaded study packs or course archives',
    ],
    allowsDownload: true,
    allowsCommercialUse: false,
    allowsModification: false,
    allowsResale: false,
    termDuration: 'Lifetime Personal & Download Access',
  },
  'commercial-use': {
    type: 'commercial-use',
    title: 'Commercial & Team Training Licence',
    description: 'Enterprise and agency licence for employee training and client project delivery.',
    permitted: [
      'Internal team training up to 25 developers within an organization',
      'Incorporation of code patterns, resets, and boilerplate into commercial client websites',
      'Classroom presentation rights for internal engineering onboarding',
    ],
    prohibited: [
      'Resale of course lessons as competing educational courses',
      'Claiming original curriculum authorship',
    ],
    allowsDownload: true,
    allowsCommercialUse: true,
    allowsModification: true,
    allowsResale: false,
    termDuration: 'Annual Corporate / Team Term',
  },
  'creator-distribution': {
    type: 'creator-distribution',
    title: 'Creator Distribution & Partner Licence',
    description: 'Explicitly authorized distribution or co-branded delivery rights.',
    permitted: [
      'Delivery of curriculum through authorized educational partner institutions',
      'Co-branded completion certificates with verified cryptographic hashes',
    ],
    prohibited: [
      'Unauthorized alteration of publisher copyright notices and author attribution',
      'Sub-licensing to unauthorized third parties',
    ],
    allowsDownload: true,
    allowsCommercialUse: true,
    allowsModification: false,
    allowsResale: true,
    termDuration: 'Multi-Year Contractual Partnership',
  },
  'subscription-access': {
    type: 'subscription-access',
    title: 'Weekly Learning Subscription',
    description: 'Continuous access to new weekly lessons, expanded chapters, and live updates.',
    permitted: [
      'Full access to all released chapters, weekly updates, and revisions',
      'Weekly subscriber email digests and downloadable study sheets',
      'Participation in priority AI tutor question answering',
    ],
    prohibited: [
      'Continued offline distribution after subscription termination',
      'Sharing subscription access credentials with third parties',
    ],
    allowsDownload: true,
    allowsCommercialUse: false,
    allowsModification: false,
    allowsResale: false,
    termDuration: 'Active Recurring Subscription',
  },
  'limited-term-access': {
    type: 'limited-term-access',
    title: 'Limited-Term Academic Licence',
    description: 'Fixed-duration student access for university or boot-camp semesters.',
    permitted: [
      'Full personal learning access for a specified duration (e.g., 6 months to 1 year)',
      'Submitting assignments and receiving milestone badges during term',
    ],
    prohibited: [
      'Access continuation following term expiry without renewal',
      'Sharing or commercial distribution',
    ],
    allowsDownload: false,
    allowsCommercialUse: false,
    allowsModification: false,
    allowsResale: false,
    termDuration: '1 Year Academic Term',
  },
};

// Calculate transparent platform and payment gateway breakdown
export function calculateCommercialPricing(
  basePriceUsd: number,
  licenceType: LicenceType
): {
  grossPriceUsd: number;
  paymentGatewayFeeUsd: number;
  platformCommissionUsd: number;
  creatorNetUsd: number;
  platformRatePercent: number;
} {
  const multipliers: Record<LicenceType, number> = {
    'personal-learning': 1.0,
    'downloadable-learning': 1.4,
    'commercial-use': 3.5,
    'creator-distribution': 6.0,
    'subscription-access': 0.35, // Monthly
    'limited-term-access': 0.8,
  };

  const gross = Math.round(basePriceUsd * (multipliers[licenceType] || 1.0));
  const gatewayFee = Number((gross * 0.029 + 0.30).toFixed(2));
  const platformRatePercent = 12; // 12% sustainable ecosystem fee
  const netBeforePlatform = gross - gatewayFee;
  const platformFee = Number((netBeforePlatform * (platformRatePercent / 100)).toFixed(2));
  const creatorNet = Number(Math.max(0, netBeforePlatform - platformFee).toFixed(2));

  return {
    grossPriceUsd: gross,
    paymentGatewayFeeUsd: gatewayFee,
    platformCommissionUsd: platformFee,
    creatorNetUsd: creatorNet,
    platformRatePercent,
  };
}
