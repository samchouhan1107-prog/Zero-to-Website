import fs from 'fs';
import path from 'path';

/**
 * ============================================================================
 * OWNERSHIP, LICENSING & COMMERCIAL RIGHTS ENGINE
 * Platform Owner & Publisher Identity: Sameer Chouhan / WebZoneBW
 * ============================================================================
 */

export type {
  LicenceType,
  ContentOwnershipType,
  LicenceTerms,
  RightsRecord,
  UserAccessGrant,
} from '../src/shared/ownershipTypes';

export {
  STANDARD_LICENCES,
  calculateCommercialPricing,
} from '../src/shared/ownershipTypes';

import {
  LicenceType,
  RightsRecord,
  UserAccessGrant,
  STANDARD_LICENCES,
} from '../src/shared/ownershipTypes';

const RIGHTS_DATA_FILE = path.join(process.cwd(), 'server', 'rights-records.json');
const ACCESS_GRANTS_FILE = path.join(process.cwd(), 'server', 'access-grants.json');

// In-memory caches synced to disk
let rightsMemory: RightsRecord[] = [];
let accessMemory: UserAccessGrant[] = [];

function loadRightsFromDisk(): void {
  try {
    if (fs.existsSync(RIGHTS_DATA_FILE)) {
      rightsMemory = JSON.parse(fs.readFileSync(RIGHTS_DATA_FILE, 'utf-8'));
    } else {
      rightsMemory = getInitialPlatformRights();
      saveRightsToDisk();
    }
  } catch (err) {
    console.warn('[OwnershipEngine] Could not load rights file, initializing defaults:', err);
    rightsMemory = getInitialPlatformRights();
  }
}

function saveRightsToDisk(): void {
  try {
    fs.writeFileSync(RIGHTS_DATA_FILE, JSON.stringify(rightsMemory, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[OwnershipEngine] Failed to save rights file:', err);
  }
}

function loadAccessFromDisk(): void {
  try {
    if (fs.existsSync(ACCESS_GRANTS_FILE)) {
      accessMemory = JSON.parse(fs.readFileSync(ACCESS_GRANTS_FILE, 'utf-8'));
    } else {
      // Default: Grant all standard users access to free core curriculum
      accessMemory = [
        {
          id: 'grant-default-core',
          userId: 'default',
          contentId: 'curriculum-core-webzone',
          licenceType: 'personal-learning',
          grantedAt: new Date().toISOString(),
          expiresAt: null,
          status: 'active',
        },
      ];
      saveAccessToDisk();
    }
  } catch (err) {
    console.warn('[OwnershipEngine] Could not load access file, using defaults:', err);
    accessMemory = [];
  }
}

function saveAccessToDisk(): void {
  try {
    fs.writeFileSync(ACCESS_GRANTS_FILE, JSON.stringify(accessMemory, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[OwnershipEngine] Failed to save access file:', err);
  }
}

// Compute next review date (5 weeks out)
function computeReviewDate(fromIso: string = new Date().toISOString(), weeks: number = 5): string {
  const d = new Date(fromIso);
  d.setDate(d.getDate() + weeks * 7);
  return d.toISOString();
}

function getInitialPlatformRights(): RightsRecord[] {
  const now = new Date().toISOString();
  return [
    {
      contentId: 'curriculum-core-webzone',
      contentTitle: 'Zero-to-Website: Full-Stack Web Architecture Curriculum (Ch 00 - 10)',
      contentType: 'course',
      ownershipType: 'platform-owned',
      ownerName: 'Sameer Chouhan / WebZoneBW',
      ownerContact: '',
      publisherName: 'Sameer Chouhan / WebZoneBW',
      publisherContact: '',
      creationDate: '2026-01-15T00:00:00.000Z',
      publicationDate: '2026-02-01T00:00:00.000Z',
      lastReviewedDate: now,
      nextReviewDueDate: computeReviewDate(now, 5),
      reviewCycleWeeks: 5,
      version: '2.4.0',
      revisionHistory: [
        {
          version: '2.4.0',
          date: now,
          changedBy: 'Sameer Chouhan / WebZoneBW',
          summary: 'Complete human-centred CSS3 typography overhaul and ownership rights registry integration.',
          originalityVerified: true,
        },
        {
          version: '2.0.0',
          date: '2026-02-01T00:00:00.000Z',
          changedBy: 'Sameer Chouhan / WebZoneBW',
          summary: 'Initial 11-track curriculum publication.',
          originalityVerified: true,
        },
      ],
      availableLicences: ['personal-learning', 'downloadable-learning', 'commercial-use', 'subscription-access'],
      pricingUsd: {
        'personal-learning': 0,        // Free core access
        'downloadable-learning': 29,   // Downloadable PDF & sandbox starter repo
        'commercial-use': 149,         // Team deployment rights
        'creator-distribution': 499,   // Partner licensing
        'subscription-access': 19,     // $19/month weekly updates
        'limited-term-access': 0,
      },
      copyrightNotice: '© Sameer Chouhan / WebZoneBW. All rights reserved. Published via WebZoneBW Publishing.',
      originalityScore: 98,
      aiAssistedDisclosure: {
        isAiAssisted: true,
        humanReviewedAndFactChecked: true,
        reviewerName: 'Sameer Chouhan',
        reviewDate: now,
        editorialNotes: 'Synthesized with Gemini 3.7 Flash, thoroughly audited, structured, and verified against W3C and MDN Web Docs standards by human engineering editor.',
      },
    },
    {
      contentId: 'course-ai-fullstack-cloud-llms',
      contentTitle: 'Full-Stack AI Engineer with Local & Cloud LLMs',
      contentType: 'course',
      ownershipType: 'platform-owned',
      ownerName: 'Sameer Chouhan / WebZoneBW',
      ownerContact: '',
      publisherName: 'Sameer Chouhan / WebZoneBW',
      publisherContact: '',
      creationDate: now,
      publicationDate: now,
      lastReviewedDate: now,
      nextReviewDueDate: computeReviewDate(now, 4),
      reviewCycleWeeks: 4,
      version: '1.0.0',
      revisionHistory: [
        {
          version: '1.0.0',
          date: now,
          changedBy: 'Sameer Chouhan / WebZoneBW',
          summary: 'Initial course proposal and commercial licensing specification.',
          originalityVerified: true,
        },
      ],
      availableLicences: ['personal-learning', 'downloadable-learning', 'commercial-use', 'subscription-access'],
      pricingUsd: {
        'personal-learning': 99,
        'downloadable-learning': 149,
        'commercial-use': 299,
        'creator-distribution': 999,
        'subscription-access': 19,
        'limited-term-access': 79,
      },
      copyrightNotice: '© Sameer Chouhan / WebZoneBW. All rights reserved. Published via WebZoneBW Publishing.',
      originalityScore: 96,
      aiAssistedDisclosure: {
        isAiAssisted: true,
        humanReviewedAndFactChecked: true,
        reviewerName: 'Sameer Chouhan',
        reviewDate: now,
        editorialNotes: 'Full-stack LLM architectural course. Code examples and fallback logic verified on node 20+ runtime.',
      },
    },
    {
      contentId: 'course-modern-css-design-systems',
      contentTitle: 'High-Performance Modern CSS Architecture & Design Systems',
      contentType: 'course',
      ownershipType: 'platform-owned',
      ownerName: 'Sameer Chouhan / WebZoneBW',
      ownerContact: '',
      publisherName: 'Sameer Chouhan / WebZoneBW',
      publisherContact: '',
      creationDate: now,
      publicationDate: now,
      lastReviewedDate: now,
      nextReviewDueDate: computeReviewDate(now, 5),
      reviewCycleWeeks: 5,
      version: '1.0.0',
      revisionHistory: [
        {
          version: '1.0.0',
          date: now,
          changedBy: 'Sameer Chouhan / WebZoneBW',
          summary: 'Standard CSS3 grid, subgrid, fluid clamp typography, and zero-runtime design token system.',
          originalityVerified: true,
        },
      ],
      availableLicences: ['personal-learning', 'downloadable-learning', 'commercial-use', 'subscription-access'],
      pricingUsd: {
        'personal-learning': 49,
        'downloadable-learning': 79,
        'commercial-use': 189,
        'creator-distribution': 599,
        'subscription-access': 12,
        'limited-term-access': 39,
      },
      copyrightNotice: '© Sameer Chouhan / WebZoneBW. All rights reserved. Published via WebZoneBW Publishing.',
      originalityScore: 99,
      aiAssistedDisclosure: {
        isAiAssisted: false,
        humanReviewedAndFactChecked: true,
        reviewerName: 'Sameer Chouhan',
        reviewDate: now,
        editorialNotes: 'Created directly from production UI/UX engineering experience with standard CSS3 standards.',
      },
    },
  ];
}

// Initialize on load
loadRightsFromDisk();
loadAccessFromDisk();

// Get all registered rights records
export function getAllRightsRecords(): RightsRecord[] {
  return rightsMemory;
}

// Get rights record by content ID
export function getRightsRecordById(contentId: string): RightsRecord | null {
  return rightsMemory.find((r) => r.contentId === contentId) || null;
}

// Register or update a rights record
export function saveRightsRecord(record: RightsRecord): RightsRecord {
  const idx = rightsMemory.findIndex((r) => r.contentId === record.contentId);
  const now = new Date().toISOString();
  if (idx >= 0) {
    rightsMemory[idx] = {
      ...record,
      lastReviewedDate: now,
      nextReviewDueDate: computeReviewDate(now, record.reviewCycleWeeks || 5),
    };
  } else {
    rightsMemory.unshift({
      ...record,
      ownerName: record.ownerName || 'Sameer Chouhan / WebZoneBW',
      ownerContact: record.ownerContact || '',
      publisherName: record.publisherName || 'Sameer Chouhan / WebZoneBW',
      publisherContact: record.publisherContact || '',
      creationDate: record.creationDate || now,
      publicationDate: record.publicationDate || now,
      lastReviewedDate: now,
      nextReviewDueDate: computeReviewDate(now, record.reviewCycleWeeks || 5),
      copyrightNotice:
        record.copyrightNotice ||
        '© Sameer Chouhan / WebZoneBW. All rights reserved. Published via WebZoneBW Publishing.',
    });
  }
  saveRightsToDisk();
  return rightsMemory.find((r) => r.contentId === record.contentId)!;
}

// Server-side Access Control Check
export function verifyUserAccess(
  userId: string,
  contentId: string,
  requiredLicence?: LicenceType
): { hasAccess: boolean; grant: UserAccessGrant | null; reason?: string } {
  // Check if content is free personal learning
  const record = getRightsRecordById(contentId);
  if (record && record.pricingUsd['personal-learning'] === 0 && (!requiredLicence || requiredLicence === 'personal-learning')) {
    return {
      hasAccess: true,
      grant: {
        id: `free-access-${contentId}`,
        userId,
        contentId,
        licenceType: 'personal-learning',
        grantedAt: new Date().toISOString(),
        expiresAt: null,
        status: 'active',
      },
    };
  }

  // Find explicit grant belonging to this authenticated user
  const grant = accessMemory.find(
    (g) =>
      g.contentId === contentId &&
      g.userId === userId &&
      g.status === 'active'
  );

  if (!grant) {
    return { hasAccess: false, grant: null, reason: 'No active licence found for this content.' };
  }

  // Check expiry
  if (grant.expiresAt && new Date(grant.expiresAt).getTime() < Date.now()) {
    grant.status = 'expired';
    saveAccessToDisk();
    return { hasAccess: false, grant, reason: 'Licence has expired.' };
  }

  // Check if specific licence level required (e.g. downloadable file requires 'downloadable-learning' or higher)
  if (requiredLicence) {
    const licenceHierarchy: LicenceType[] = [
      'personal-learning',
      'downloadable-learning',
      'commercial-use',
      'creator-distribution',
    ];
    const grantRank = licenceHierarchy.indexOf(grant.licenceType);
    const requiredRank = licenceHierarchy.indexOf(requiredLicence);

    if (grant.licenceType === 'subscription-access' && requiredLicence === 'downloadable-learning') {
      // Subscriptions include downloads
      return { hasAccess: true, grant };
    }

    if (grantRank < requiredRank && grant.licenceType !== requiredLicence) {
      return {
        hasAccess: false,
        grant,
        reason: `Current licence (${grant.licenceType}) does not permit this operation. Requires ${requiredLicence}.`,
      };
    }
  }

  return { hasAccess: true, grant };
}

// Record a new purchase / access grant (Server-Side)
export function grantUserAccess(grantData: Omit<UserAccessGrant, 'id' | 'grantedAt' | 'status'>): UserAccessGrant {
  const newGrant: UserAccessGrant = {
    ...grantData,
    id: `grant-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    grantedAt: new Date().toISOString(),
    status: 'active',
  };
  accessMemory.unshift(newGrant);
  saveAccessToDisk();
  return newGrant;
}

export function revokeGrantsByTransactionId(
  transactionId: string,
  reasonStatus: 'revoked' | 'refunded' = 'refunded'
): number {
  let updatedCount = 0;
  for (const grant of accessMemory) {
    if (grant.transactionId === transactionId && grant.status === 'active') {
      grant.status = reasonStatus;
      updatedCount++;
    }
  }
  if (updatedCount > 0) {
    saveAccessToDisk();
  }
  return updatedCount;
}

// Calculate Commercial Creator Revenue & Platform Fee Split
export function calculateRevenueSplit(sellingPriceUsd: number, platformCommissionPct: number = 12): {
  sellingPriceUsd: number;
  platformFeeUsd: number;
  paymentProcessingFeeUsd: number; // 2.9% + $0.30 standard
  estimatedTaxesUsd: number;
  creatorNetUsd: number;
} {
  const price = Math.max(0, sellingPriceUsd);
  if (price === 0) {
    return {
      sellingPriceUsd: 0,
      platformFeeUsd: 0,
      paymentProcessingFeeUsd: 0,
      estimatedTaxesUsd: 0,
      creatorNetUsd: 0,
    };
  }

  const paymentProcessing = Number((price * 0.029 + 0.30).toFixed(2));
  const platformFee = Number(((price - paymentProcessing) * (platformCommissionPct / 100)).toFixed(2));
  const estimatedTaxes = 0; // Tax collected depends on buyer jurisdiction
  const creatorNet = Number((price - paymentProcessing - platformFee).toFixed(2));

  return {
    sellingPriceUsd: price,
    platformFeeUsd: platformFee,
    paymentProcessingFeeUsd: paymentProcessing,
    estimatedTaxesUsd: estimatedTaxes,
    creatorNetUsd: Math.max(0, creatorNet),
  };
}
