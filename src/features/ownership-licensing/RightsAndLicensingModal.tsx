import React, { useState } from 'react';
import {
  ShieldCheck,
  Scale,
  Calendar,
  UserCheck,
  FileText,
  DollarSign,
  AlertTriangle,
  Check,
  X,
  ExternalLink,
  Clock,
} from 'lucide-react';
import { STANDARD_LICENCES, LicenceType } from '../../shared/ownershipTypes';

interface RightsAndLicensingModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentId?: string;
  contentTitle?: string;
  ownerName?: string;
  publisherIdentity?: string;
  contactEmail?: string;
  reviewCycleWeeks?: number;
  lastReviewedDate?: string;
  nextReviewDueDate?: string;
  version?: string;
  copyrightNotice?: string;
  onSelectLicenceForPurchase?: (licenceType: LicenceType) => void;
}

export const RightsAndLicensingModal: React.FC<RightsAndLicensingModalProps> = ({
  isOpen,
  onClose,
  contentId = 'curriculum-core-webzone',
  contentTitle = 'Zero-to-Website: Full-Stack Web Architecture Curriculum',
  ownerName = 'Sameer Chouhan / WebZoneBW',
  publisherIdentity = 'Sameer Chouhan / WebZoneBW',
  contactEmail,
  reviewCycleWeeks = 5,
  lastReviewedDate = new Date().toLocaleDateString(),
  nextReviewDueDate = new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  version = '2.4.0',
  copyrightNotice = '© Sameer Chouhan / WebZoneBW. All rights reserved. Published via WebZoneBW Publishing.',
  onSelectLicenceForPurchase,
}) => {
  const [selectedLicenceTab, setSelectedLicenceTab] = useState<LicenceType>('personal-learning');

  if (!isOpen) return null;

  const activeLicence = STANDARD_LICENCES[selectedLicenceTab];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 'var(--z-modal)',
        padding: 'var(--space-4)',
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          maxWidth: '740px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-xl)',
          padding: 'var(--space-6)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Scale size={20} style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ margin: 0, fontSize: 'var(--text-xl)', fontWeight: 800 }}>
                Content Ownership &amp; Licensing Framework
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              Verified intellectual property, legal attribution, and permitted commercial usage terms.
            </p>
          </div>
          <button type="button" onClick={onClose} className="btn btn-subtle btn-sm">
            <X size={18} />
          </button>
        </div>

        {/* Ownership Summary Banner */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-subtle)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', fontSize: 'var(--text-xs)' }}>
            <div>
              <span style={{ color: 'var(--color-text-subtle)', display: 'block' }}>Platform Owner &amp; Author:</span>
              <strong style={{ color: 'var(--color-text-strong)', fontSize: 'var(--text-sm)' }}>{ownerName}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-subtle)', display: 'block' }}>Publisher Identity:</span>
              <strong style={{ color: 'var(--color-text-strong)' }}>{publisherIdentity}</strong>
              {contactEmail && <div style={{ color: 'var(--color-accent)' }}>{contactEmail}</div>}
            </div>
            <div>
              <span style={{ color: 'var(--color-text-subtle)', display: 'block' }}>Maintenance Review Cycle:</span>
              <strong style={{ color: 'var(--color-text-strong)' }}>Every {reviewCycleWeeks} Weeks</strong>
              <div style={{ color: 'var(--color-success)' }}>Next Audit: {nextReviewDueDate}</div>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-subtle)', display: 'block' }}>Version &amp; Integrity:</span>
              <span className="badge badge-primary">v{version} Verified</span>
              <div style={{ color: 'var(--color-text-subtle)', marginTop: '2px' }}>Last Audited: {lastReviewedDate}</div>
            </div>
          </div>
          <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--color-border-subtle)', fontSize: '11px', color: 'var(--color-text-muted)' }}>
            <strong>Copyright Notice:</strong> {copyrightNotice}
          </div>
        </div>

        {/* Licence Selector Tabs */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-subtle)', marginBottom: '0.5rem', display: 'block' }}>
            Select Commercial / Learning Licence Tier:
          </label>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {Object.keys(STANDARD_LICENCES).map((key) => {
              const lic = STANDARD_LICENCES[key as LicenceType];
              const isSelected = selectedLicenceTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedLicenceTab(key as LicenceType)}
                  className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '11px' }}
                >
                  {lic.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Licence Detail Box */}
        <div
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-5)',
            backgroundColor: 'var(--color-surface)',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h4 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--color-primary)' }}>
              {activeLicence.title}
            </h4>
            <span className="badge badge-accent">{activeLicence.termDuration}</span>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>
            {activeLicence.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {/* Permitted */}
            <div style={{ backgroundColor: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)', borderRadius: 'var(--radius-md)', padding: '0.75rem' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-success)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Check size={14} /> Permitted Activities
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '11px', color: 'var(--color-text)', display: 'grid', gap: '0.35rem' }}>
                {activeLicence.permitted.map((perm, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
                    <span style={{ color: 'var(--color-success)' }}>✓</span>
                    <span>{perm}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prohibited */}
            <div style={{ backgroundColor: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)', borderRadius: 'var(--radius-md)', padding: '0.75rem' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-danger)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <X size={14} /> Prohibited Actions
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '11px', color: 'var(--color-text)', display: 'grid', gap: '0.35rem' }}>
                {activeLicence.prohibited.map((proh, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
                    <span style={{ color: 'var(--color-danger)' }}>✕</span>
                    <span>{proh}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Rights Indicators Matrix */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', fontSize: '11px' }}>
            <span className={`badge ${activeLicence.allowsDownload ? 'badge-success' : ''}`}>
              {activeLicence.allowsDownload ? '✓ Offline Downloads Permitted' : '✕ No Offline Downloads'}
            </span>
            <span className={`badge ${activeLicence.allowsCommercialUse ? 'badge-success' : ''}`}>
              {activeLicence.allowsCommercialUse ? '✓ Commercial Deployment Permitted' : '✕ Personal Use Only'}
            </span>
            <span className={`badge ${activeLicence.allowsResale ? 'badge-success' : ''}`}>
              {activeLicence.allowsResale ? '✓ Resale / Partner Distribution' : '✕ Resale Strictly Prohibited'}
            </span>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div style={{ fontSize: '11px', color: 'var(--color-text-subtle)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
          <strong>Notice to Purchasers &amp; Students:</strong> Purchasing an educational licence grants personal or commercial rights according to the terms selected above. It does <em>not</em> transfer underlying copyright ownership from Sameer Chouhan / WebZoneBW.
        </div>

        {/* Modal Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button type="button" onClick={onClose} className="btn btn-secondary btn-md">
            Close
          </button>
          {onSelectLicenceForPurchase && (
            <button
              type="button"
              onClick={() => {
                onSelectLicenceForPurchase(selectedLicenceTab);
                onClose();
              }}
              className="btn btn-accent btn-md"
            >
              <DollarSign size={16} />
              <span>Purchase / Upgrade with This Licence</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
