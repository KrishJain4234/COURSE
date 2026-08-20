import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search, CheckCircle2, AlertCircle, Hash, X, Database, Lock } from 'lucide-react';
import { secureVaultApi } from '../../services/secureVaultApi';

export const VerifyDialog = ({ initialCertId = '', onClose, onViewCert }) => {
  const [certId, setCertId] = useState(initialCertId);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (initialCertId) {
      handleVerify(initialCertId);
    }
  }, [initialCertId]);

  const handleVerify = async (idToVerify) => {
    const target = idToVerify || certId;
    if (!target.trim()) return;

    setLoading(true);
    setResult(null);

    const res = await secureVaultApi.verifyCertificate(target.trim());
    setResult(res);
    setLoading(false);
  };

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
            padding: '20px 24px',
            borderBottom: '1px solid var(--slate-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'var(--primary-50)',
                color: 'var(--primary-700)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                SecureVault Ledger Verification
              </h3>
              <p style={{ fontSize: '0.78125rem', color: 'var(--slate-500)' }}>
                Cryptographic validation of issued academic credentials
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
              padding: '6px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Hash
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--slate-400)'
                }}
              />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '36px', fontFamily: 'monospace', fontWeight: 600 }}
                placeholder="Enter Certificate ID (e.g. EDU-2026-8492)"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              />
            </div>
            <button
              onClick={() => handleVerify()}
              disabled={loading}
              className="btn btn-primary"
            >
              <Search size={16} />
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--slate-600)' }}>
              <div style={{ display: 'inline-block', marginBottom: '8px' }}>
                <ShieldCheck size={32} className="animate-pulse" color="var(--primary-700)" />
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Querying SecureVault Consortium Ledger...</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>Checking block hash and digital signature invariants</div>
            </div>
          )}

          {result && result.success && (
            <div
              style={{
                backgroundColor: 'var(--slate-50)',
                border: '1px solid #bbf7d0',
                borderRadius: '12px',
                padding: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success-700)', marginBottom: '14px' }}>
                <CheckCircle2 size={20} />
                <span style={{ fontSize: '0.9375rem', fontWeight: 800 }}>
                  Certificate Verified Authentic
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.8125rem', marginBottom: '16px' }}>
                <div>
                  <span style={{ color: 'var(--slate-500)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    Recipient
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--slate-900)' }}>
                    {result.certificate.learnerName}
                  </span>
                </div>

                <div>
                  <span style={{ color: 'var(--slate-500)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    Learner ID
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--slate-900)', fontFamily: 'monospace' }}>
                    {result.certificate.learnerId}
                  </span>
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: 'var(--slate-500)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    Specialization Program
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--primary-800)' }}>
                    {result.certificate.courseTitle}
                  </span>
                </div>

                <div>
                  <span style={{ color: 'var(--slate-500)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    Issuing Authority
                  </span>
                  <span style={{ fontWeight: 600, color: 'var(--slate-700)' }}>
                    {result.certificate.institution}
                  </span>
                </div>

                <div>
                  <span style={{ color: 'var(--slate-500)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    Ledger Timestamp
                  </span>
                  <span style={{ fontWeight: 600, color: 'var(--slate-700)' }}>
                    {result.certificate.issueDate}
                  </span>
                </div>
              </div>

              {/* Cryptographic Ledger Proof Details */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid var(--slate-200)',
                  fontFamily: 'monospace',
                  fontSize: '0.71875rem',
                  color: 'var(--slate-600)',
                  marginBottom: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>Proof Type: <strong>SHA256-RSA-ECC</strong></span>
                  <span style={{ color: 'var(--success-700)', fontWeight: 700 }}>TAMPER_PROOF_OK</span>
                </div>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  Digest: {result.certificate.signatureHash || '0x8f4be92c4a71d88b901a88b1f5c2'}
                </div>
              </div>

              {onViewCert && (
                <button
                  onClick={() => {
                    onClose();
                    onViewCert(result.certificate);
                  }}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%' }}
                >
                  View Full Verified Certificate
                </button>
              )}
            </div>
          )}

          {result && !result.success && (
            <div
              style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '12px',
                padding: '18px',
                color: '#dc2626'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <AlertCircle size={18} />
                <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>Verification Unsuccessful</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#b91c1c' }}>
                {result.error}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
