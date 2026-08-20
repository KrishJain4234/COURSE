import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Download,
  ExternalLink,
  X,
  CheckCircle,
  Hash,
  Copy,
  Check,
  Globe,
  FileText,
  Lock
} from 'lucide-react';
import { secureVaultApi } from '../../services/secureVaultApi';
import { DigiLockerButton } from '../common/DigiLockerButton';

export const CertificateModal = ({
  certificate,
  loadingStep = null,
  onClose,
  onOpenFullPreview
}) => {
  const [copiedField, setCopiedField] = useState(null);

  if (!certificate && !loadingStep) return null;

  const handleCopy = (text, fieldName) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const verifyUrl = certificate?.verificationUrl || `${secureVaultApi.getVerifyBaseUrl()}/${certificate?.certificateId}`;

  // If currently in loading sequence
  if (loadingStep) {
    const steps = [
      'Generating Certificate...',
      'Creating Hash...',
      'Anchoring to IPFS...',
      'Preparing Download...'
    ];

    const currentStepIndex = steps.indexOf(loadingStep);

    return (
      <div className="modal-backdrop">
        <div
          className="modal-content"
          style={{ maxWidth: '460px', padding: '36px 30px', textAlign: 'center' }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              backgroundColor: 'var(--primary-50)',
              color: 'var(--primary-700)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              border: '2px solid var(--primary-200)'
            }}
          >
            <ShieldCheck size={32} className="animate-pulse" />
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '6px' }}>
            Issuing SecureVault Credential
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', marginBottom: '24px' }}>
            {certificate?.courseTitle || 'Course Certificate'}
          </p>

          {/* Stepper list with exact 4 steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left', marginBottom: '24px' }}>
            {steps.map((step, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex || (currentStepIndex === -1 && idx === 0);

              return (
                <div
                  key={step}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: isCurrent ? 'var(--primary-50)' : isPast ? '#f0fdf4' : 'var(--slate-50)',
                    border: isCurrent ? '1px solid var(--primary-300)' : isPast ? '1px solid #bbf7d0' : '1px solid var(--slate-200)'
                  }}
                >
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      backgroundColor: isPast ? 'var(--success-500)' : isCurrent ? 'var(--primary-700)' : 'var(--slate-300)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.6875rem',
                      fontWeight: 700
                    }}
                  >
                    {isPast ? <Check size={12} /> : idx + 1}
                  </div>
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: isCurrent ? 700 : isPast ? 600 : 500,
                      color: isCurrent ? 'var(--primary-900)' : isPast ? 'var(--success-700)' : 'var(--slate-500)'
                    }}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>
            Processing cryptographic signature & IPFS ledger record...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '580px' }}
      >
        {/* Header */}
        <div
          style={{
            padding: '22px 26px',
            borderBottom: '1px solid var(--slate-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#f0fdf4',
                color: 'var(--success-700)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #bbf7d0'
              }}
            >
              <CheckCircle size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Certificate Successfully Issued
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
                Anchored to SecureVault & IPFS Decentralized Storage
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--slate-400)',
              padding: '6px',
              borderRadius: '6px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '26px' }}>
          {/* Course Summary */}
          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--slate-50)',
              border: '1px solid var(--slate-200)',
              borderRadius: '10px',
              marginBottom: '20px'
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-500)', textTransform: 'uppercase' }}>
              Specialization Course
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '2px' }}>
              {certificate.courseTitle || certificate.course}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--slate-600)', marginTop: '4px' }}>
              Issued to: <strong>{certificate.studentName || certificate.learnerName}</strong> • {certificate.organization || 'SkillForge Academy'}
            </div>
          </div>

          {/* Technical Data Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {/* Certificate ID */}
            <div
              style={{
                padding: '12px 14px',
                border: '1px solid var(--slate-200)',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--slate-500)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                  Certificate ID
                </span>
                <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--primary-800)', fontFamily: 'monospace' }}>
                  {certificate.certificateId}
                </span>
              </div>
              <button
                onClick={() => handleCopy(certificate.certificateId, 'id')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem' }}
              >
                {copiedField === 'id' ? <><Check size={14} color="var(--success-700)" /> Copied</> : <><Copy size={14} /> Copy</>}
              </button>
            </div>

            {/* SHA256 Hash */}
            <div
              style={{
                padding: '12px 14px',
                border: '1px solid var(--slate-200)',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px'
              }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--slate-500)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                  SHA256 Hash
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'monospace',
                    color: 'var(--slate-800)',
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  title={certificate.hash || certificate.signatureHash}
                >
                  {certificate.hash || certificate.signatureHash}
                </span>
              </div>
              <button
                onClick={() => handleCopy(certificate.hash || certificate.signatureHash || '', 'hash')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem', flexShrink: 0 }}
              >
                {copiedField === 'hash' ? <><Check size={14} color="var(--success-700)" /> Copied</> : <><Copy size={14} /> Copy</>}
              </button>
            </div>

            {/* IPFS CID */}
            <div
              style={{
                padding: '12px 14px',
                border: '1px solid var(--slate-200)',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px'
              }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--slate-500)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                  IPFS CID
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'monospace',
                    color: 'var(--slate-800)',
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  title={certificate.ipfsCID}
                >
                  {certificate.ipfsCID || 'none'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                {certificate.ipfsGateway && (
                  <a
                    href={certificate.ipfsGateway}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem' }}
                    title="Open on IPFS Gateway"
                  >
                    <Globe size={14} />
                  </a>
                )}
                <button
                  onClick={() => handleCopy(certificate.ipfsCID || '', 'cid')}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.75rem' }}
                >
                  {copiedField === 'cid' ? <><Check size={14} color="var(--success-700)" /> Copied</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Add To DigiLocker Button (Prominent) */}
            <DigiLockerButton
              certificate={certificate}
              fullWidth={true}
              size="lg"
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {/* Verify Button */}
              <a
                href={verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: '100%', textDecoration: 'none' }}
              >
                <ShieldCheck size={16} />
                Verify Ledger
                <ExternalLink size={13} style={{ marginLeft: '2px' }} />
              </a>

              {/* Download Again Button */}
              <button
                onClick={() => {
                  secureVaultApi.triggerPdfDownload(certificate);
                }}
                className="btn btn-secondary"
                style={{ width: '100%' }}
              >
                <Download size={16} />
                Download PDF
              </button>
            </div>

            <button
              onClick={() => {
                onClose();
                if (onOpenFullPreview) onOpenFullPreview(certificate);
              }}
              className="btn btn-light-primary"
              style={{ width: '100%' }}
            >
              <FileText size={16} />
              Open Full Certificate Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
