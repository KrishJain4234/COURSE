import React, { useState } from 'react';
import { ShieldCheck, Award, Download, ExternalLink, X, CheckCircle, Hash } from 'lucide-react';
import { secureVaultApi } from '../../services/secureVaultApi';

export const CertificateModal = ({
  certificate,
  onClose,
  onOpenFullPreview,
  onOpenVerifyDialog
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!certificate) return null;

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await secureVaultApi.downloadCertificate(certificate.certificateId);
      setDownloading(false);
      setDownloadSuccess(true);
      // Automatically trigger browser print/save or preview
      setTimeout(() => {
        onOpenFullPreview(certificate);
      }, 600);
    } catch (e) {
      console.error(e);
      setDownloading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '540px' }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px',
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
                backgroundColor: 'var(--primary-50)',
                color: 'var(--primary-700)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--primary-200)'
              }}
            >
              <Award size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Certificate Ready
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
                Official Academic & Industry Credential
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
        <div style={{ padding: '28px' }}>
          {/* Certificate Highlight Card */}
          <div
            style={{
              padding: '20px',
              backgroundColor: 'var(--slate-50)',
              border: '1px solid var(--slate-200)',
              borderRadius: '12px',
              marginBottom: '24px'
            }}
          >
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-500)', textTransform: 'uppercase' }}>
                Course Completed
              </span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--slate-900)', marginTop: '2px' }}>
                {certificate.courseTitle}
              </h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--slate-600)' }}>
                Issued to: <strong style={{ color: 'var(--slate-800)' }}>{certificate.learnerName}</strong> ({certificate.learnerId})
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid var(--slate-200)', paddingTop: '14px' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--slate-500)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
                  Certificate ID
                </span>
                <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--primary-800)', fontFamily: 'monospace' }}>
                  {certificate.certificateId}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--slate-500)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
                  Status
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    color: 'var(--success-700)'
                  }}
                >
                  <CheckCircle size={14} /> Verified
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--slate-500)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
                  Verification Protocol
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    color: 'var(--primary-700)'
                  }}
                >
                  <ShieldCheck size={14} /> SecureVault Enabled
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--slate-500)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
                  Issue Date
                </span>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-700)' }}>
                  {certificate.issueDate}
                </span>
              </div>
            </div>
          </div>

          {/* SecureVault Notice */}
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '24px'
            }}
          >
            <ShieldCheck size={20} color="var(--success-700)" />
            <span style={{ fontSize: '0.8125rem', color: 'var(--success-700)', fontWeight: 500 }}>
              Cryptographically signed by BMS Institute of Technology & EduVerse Board.
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => {
                onClose();
                onOpenFullPreview(certificate);
              }}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              <ExternalLink size={18} />
              View Official Certificate
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="btn btn-secondary"
                style={{ width: '100%' }}
              >
                <Download size={16} />
                {downloading ? 'Preparing...' : downloadSuccess ? 'Export Ready!' : 'Download PDF'}
              </button>

              <button
                onClick={() => {
                  onClose();
                  if (onOpenVerifyDialog) onOpenVerifyDialog(certificate.certificateId);
                }}
                className="btn btn-light-primary"
                style={{ width: '100%' }}
              >
                <Hash size={16} />
                Verify on Ledger
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
