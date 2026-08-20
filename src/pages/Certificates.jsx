import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  Download,
  ExternalLink,
  Search,
  CheckCircle2,
  Lock,
  FileCheck,
  Hash,
  Sparkles,
  Printer
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../components/common/Badge';

export const Certificates = ({
  onOpenCertificateModal,
  onOpenCertificatePreview,
  onOpenVerifyDialog
}) => {
  const { user } = useAuth();
  const { certificates, courses } = useLearning();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCerts = certificates.filter((cert) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      cert.courseTitle.toLowerCase().includes(q) ||
      cert.certificateId.toLowerCase().includes(q) ||
      cert.learnerName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="page-container">
      {/* Header Banner */}
      <div
        style={{
          padding: '32px 36px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid var(--slate-200)',
          marginBottom: '32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--primary-50)',
              color: 'var(--primary-800)',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}
          >
            <ShieldCheck size={14} />
            SecureVault Ledger Verified
          </div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--slate-900)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
            Academic Credentials & Certificates
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
            Official digital diplomas and industry credentials anchored to the SecureVault cryptographic registry.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => onOpenVerifyDialog && onOpenVerifyDialog('')}
            className="btn btn-secondary"
          >
            <Hash size={16} />
            Verify on Ledger
          </button>
        </div>
      </div>

      {/* Search and Filters Strip */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--slate-800)' }}>
            Issued Certificates ({filteredCerts.length})
          </span>
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search
            size={15}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--slate-400)'
            }}
          />
          <input
            type="text"
            className="form-input"
            style={{ padding: '8px 12px 8px 32px', fontSize: '0.8125rem' }}
            placeholder="Search by ID or course title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Certificates Table / Cards View */}
      {filteredCerts.length > 0 ? (
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--slate-50)', borderBottom: '1px solid var(--slate-200)', color: 'var(--slate-600)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '16px 20px' }}>Certificate & Specialization</th>
                  <th style={{ padding: '16px 20px' }}>Certificate ID</th>
                  <th style={{ padding: '16px 20px' }}>Issue Date</th>
                  <th style={{ padding: '16px 20px' }}>Status</th>
                  <th style={{ padding: '16px 20px' }}>Verification Status</th>
                  <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCerts.map((cert) => (
                  <tr
                    key={cert.certificateId}
                    style={{
                      borderBottom: '1px solid var(--slate-100)',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--slate-50)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Course & Recipient */}
                    <td style={{ padding: '18px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '8px',
                            backgroundColor: 'var(--primary-50)',
                            color: 'var(--primary-700)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <Award size={20} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--slate-900)', fontSize: '0.9375rem' }}>
                            {cert.courseTitle}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                            Recipient: {cert.learnerName} ({cert.learnerId})
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Certificate ID */}
                    <td style={{ padding: '18px 20px', fontFamily: 'monospace', fontWeight: 700, color: 'var(--primary-800)' }}>
                      {cert.certificateId}
                    </td>

                    {/* Issue Date */}
                    <td style={{ padding: '18px 20px', color: 'var(--slate-600)', fontSize: '0.8125rem' }}>
                      {cert.issueDate}
                    </td>

                    {/* Status */}
                    <td style={{ padding: '18px 20px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          backgroundColor: '#f0fdf4',
                          color: '#15803d',
                          border: '1px solid #bbf7d0',
                          padding: '3px 8px',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}
                      >
                        <CheckCircle2 size={12} /> {cert.status || 'Verified'}
                      </span>
                    </td>

                    {/* Verification Status */}
                    <td style={{ padding: '18px 20px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          backgroundColor: 'var(--primary-50)',
                          color: 'var(--primary-800)',
                          border: '1px solid var(--primary-200)',
                          padding: '3px 8px',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        <ShieldCheck size={13} color="var(--primary-700)" />
                        {cert.verificationStatus || 'SecureVault Enabled'}
                      </span>
                    </td>

                    {/* Actions: Download / View */}
                    <td style={{ padding: '18px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          onClick={() => onOpenCertificatePreview(cert)}
                          className="btn btn-secondary btn-sm"
                          title="View Official Certificate"
                        >
                          <ExternalLink size={14} />
                          View
                        </button>
                        <button
                          onClick={() => onOpenCertificateModal(cert)}
                          className="btn btn-primary btn-sm"
                          title="Download Certificate Flow"
                        >
                          <Download size={14} />
                          Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
          <Award size={40} color="var(--slate-400)" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '6px' }}>
            No Certificates Issued Yet
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', maxWidth: '420px', margin: '0 auto 16px auto' }}>
            Complete all modules and pass the final evaluation of any course to earn your verified credential.
          </p>
        </div>
      )}

      {/* SecureVault Technical Integration Note Card */}
      <div
        className="card"
        style={{
          marginTop: '32px',
          padding: '24px',
          backgroundColor: '#ffffff',
          border: '1px solid var(--slate-200)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <ShieldCheck size={18} color="var(--primary-700)" />
          <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--slate-900)' }}>
            Enterprise API Architecture: `services/secureVaultApi.js`
          </h4>
        </div>
        <p style={{ fontSize: '0.8125rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
          EduVerse employs a decoupled cryptographic service layer implementing <code>generateCertificate()</code>, <code>verifyCertificate()</code>, and <code>downloadCertificate()</code>. When fully deployed to production, this layer seamlessly anchors tamper-proof hashes to the enterprise consortium ledger.
        </p>
      </div>
    </div>
  );
};
