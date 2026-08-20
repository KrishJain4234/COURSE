import React from 'react';
import { ShieldCheck, Download, Printer, X, CheckCircle2, Award, QrCode, ExternalLink, Hash } from 'lucide-react';
import { DigiLockerButton } from '../common/DigiLockerButton';

export const CertificatePreview = ({ certificate, onClose, onVerify }) => {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ padding: '16px', overflowY: 'auto' }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '920px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          overflow: 'hidden'
        }}
      >
        {/* Top Action Toolbar (hidden during print) */}
        <div
          style={{
            padding: '14px 20px',
            backgroundColor: 'var(--slate-900)',
            color: '#ffffff',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
            <Award size={20} color="#60a5fa" />
            <span style={{ fontSize: '0.9375rem', fontWeight: 700 }}>
              Verifiable Credential
            </span>
            <span
              style={{
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                color: '#93c5fd',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 600
              }}
            >
              Block #{certificate.blockNumber || '14285942'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <DigiLockerButton
              certificate={certificate}
              size="sm"
            />

            <button
              onClick={handlePrint}
              className="btn btn-sm"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <Printer size={15} />
              Print / Save PDF
            </button>

            <button
              onClick={() => onVerify && onVerify(certificate.certificateId)}
              className="btn btn-sm btn-primary"
            >
              <ShieldCheck size={15} />
              Verify Ledger
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '4px',
                marginLeft: '6px'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Certificate Frame Area */}
        <div style={{ padding: '32px', backgroundColor: '#f8fafc', overflowX: 'auto' }}>
          <div
            className="printable-certificate"
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              backgroundColor: '#ffffff',
              border: '12px double #1e3a8a',
              borderRadius: '6px',
              padding: '44px 48px',
              position: 'relative',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)'
            }}
          >
            {/* Corner Decorative Ornaments */}
            <div style={{ position: 'absolute', top: '12px', left: '12px', width: '24px', height: '24px', borderTop: '3px solid #1e3a8a', borderLeft: '3px solid #1e3a8a' }} />
            <div style={{ position: 'absolute', top: '12px', right: '12px', width: '24px', height: '24px', borderTop: '3px solid #1e3a8a', borderRight: '3px solid #1e3a8a' }} />
            <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '24px', height: '24px', borderBottom: '3px solid #1e3a8a', borderLeft: '3px solid #1e3a8a' }} />
            <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '24px', height: '24px', borderBottom: '3px solid #1e3a8a', borderRight: '3px solid #1e3a8a' }} />

            {/* Header: Institutional Branding & Seal */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '12px' }}>
                {/* BMSIT Emblem Placeholder */}
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: '#1e3a8a',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.875rem',
                    border: '2px solid #93c5fd'
                  }}
                >
                  BMSIT
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    BMS Institute of Technology
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    In Academic Partnership with EduVerse Enterprise Portal
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-serif-cert)',
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: '#1e3a8a',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginTop: '16px',
                  marginBottom: '6px'
                }}
              >
                Certificate of Completion
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
                This is to certify that
              </div>
            </div>

            {/* Recipient Name */}
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <div
                style={{
                  fontFamily: 'var(--font-serif-cert)',
                  fontSize: '2.25rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  letterSpacing: '0.02em',
                  borderBottom: '2px solid #cbd5e1',
                  display: 'inline-block',
                  padding: '0 32px 8px 32px'
                }}
              >
                {certificate.learnerName || 'Krish Jain'}
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#475569', marginTop: '6px' }}>
                Learner ID: <strong style={{ color: '#0f172a' }}>{certificate.learnerId || 'STU-2026-001'}</strong> • {certificate.institution || 'BMS Institute of Technology'}
              </div>
            </div>

            {/* Achievement Body */}
            <div style={{ textAlign: 'center', margin: '24px auto', maxWidth: '640px' }}>
              <p style={{ fontSize: '0.9375rem', color: '#334155', lineHeight: 1.6 }}>
                has successfully fulfilled all required curriculum modules, rigorous laboratory assessments, and enterprise evaluation standards for the professional specialization course:
              </p>
              <div
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: '#1e40af',
                  marginTop: '12px',
                  marginBottom: '8px'
                }}
              >
                {certificate.courseTitle}
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>
                Grade Achieved: <strong style={{ color: '#15803d' }}>{certificate.grade || 'Distinction (96.4%)'}</strong> • {certificate.creditHours || '3.0 Academic Credits'}
              </div>
            </div>

            {/* Signatures & Seal Section */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 120px 1fr',
                alignItems: 'center',
                marginTop: '36px',
                marginBottom: '28px',
                textAlign: 'center'
              }}
            >
              {/* Left Signature */}
              <div style={{ padding: '0 16px' }}>
                <div style={{ fontFamily: 'var(--font-serif-cert)', fontSize: '1.125rem', color: '#1e3a8a', fontStyle: 'italic', marginBottom: '4px' }}>
                  Ramesh Sundaram
                </div>
                <div style={{ height: '1px', backgroundColor: '#94a3b8', width: '180px', margin: '0 auto 6px auto' }} />
                <div style={{ fontSize: '0.78125rem', fontWeight: 700, color: '#0f172a' }}>
                  Dr. Ramesh Sundaram
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                  Dean of Academic Affairs, BMSIT
                </div>
              </div>

              {/* Center Official Gold Seal Badge */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    backgroundColor: '#1e3a8a',
                    border: '4px double #d97706',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fef3c7',
                    boxShadow: '0 4px 10px rgba(30, 58, 138, 0.25)'
                  }}
                >
                  <ShieldCheck size={24} color="#fbbf24" />
                  <span style={{ fontSize: '0.5625rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '2px' }}>
                    OFFICIAL
                  </span>
                </div>
                <span style={{ fontSize: '0.625rem', fontWeight: 700, color: '#d97706', marginTop: '4px', textTransform: 'uppercase' }}>
                  SecureVault
                </span>
              </div>

              {/* Right Signature */}
              <div style={{ padding: '0 16px' }}>
                <div style={{ fontFamily: 'var(--font-serif-cert)', fontSize: '1.125rem', color: '#1e3a8a', fontStyle: 'italic', marginBottom: '4px' }}>
                  Aris Thorne
                </div>
                <div style={{ height: '1px', backgroundColor: '#94a3b8', width: '180px', margin: '0 auto 6px auto' }} />
                <div style={{ fontSize: '0.78125rem', fontWeight: 700, color: '#0f172a' }}>
                  Dr. Aris Thorne
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                  Director of Enterprise Learning, EduVerse
                </div>
              </div>
            </div>

            {/* Verification Strip with QR Code & URL Placeholder */}
            <div
              style={{
                borderTop: '1px dashed #cbd5e1',
                paddingTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: '#64748b'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* QR Code Vector Placeholder */}
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '4px',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Scan to verify online"
                >
                  <QrCode size={44} color="#1e293b" />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.7rem', color: '#475569', textTransform: 'uppercase', fontWeight: 700 }}>
                    Certificate Verification ID
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1e3a8a', fontFamily: 'monospace' }}>
                    {certificate.certificateId}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                    Verification URL: <span style={{ color: '#2563eb', textDecoration: 'underline' }}>{certificate.qrVerificationUrl || `https://verify.eduverse.com/cert/${certificate.certificateId}`}</span>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div>Date of Issuance: <strong style={{ color: '#0f172a' }}>{certificate.issueDate}</strong></div>
                <div style={{ fontSize: '0.6875rem', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', marginTop: '2px' }}>
                  <CheckCircle2 size={12} /> SecureVault Status: {certificate.verificationStatus || 'Verified'}
                </div>
                <div style={{ fontSize: '0.625rem', fontFamily: 'monospace', color: '#94a3b8', marginTop: '2px' }}>
                  Digest: {certificate.signatureHash?.slice(0, 18)}...
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info banner */}
        <div
          style={{
            padding: '14px 24px',
            backgroundColor: '#ffffff',
            borderTop: '1px solid var(--slate-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8125rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--slate-600)' }}>
            <ShieldCheck size={16} color="var(--primary-700)" />
            <span>This credential is permanently preserved in the EduVerse SecureVault registry.</span>
          </div>

          <button onClick={onClose} className="btn btn-secondary btn-sm">
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
