import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  Download,
  ExternalLink,
  Search,
  CheckCircle2,
  Lock,
  Hash,
  Globe,
  FileText
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { useAuth } from '../context/AuthContext';
import { secureVaultApi } from '../services/secureVaultApi';

export const Certificates = ({
  onOpenCertificateModal,
  onOpenCertificatePreview,
  onOpenVerifyDialog
}) => {
  const { user } = useAuth();
  const { certificates } = useLearning();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCerts = certificates.filter((cert) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (cert.courseTitle && cert.courseTitle.toLowerCase().includes(q)) ||
      (cert.certificateId && cert.certificateId.toLowerCase().includes(q)) ||
      (cert.studentName && cert.studentName.toLowerCase().includes(q))
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
            My Certificates
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
            Every issued credential is cryptographically anchored to SecureVault and IPFS for permanent tamper-proof validation.
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

      {/* Search and Count */}
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
          <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--slate-800)' }}>
            Issued Credentials ({filteredCerts.length})
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

      {/* Certificates Table View */}
      {filteredCerts.length > 0 ? (
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--slate-50)', borderBottom: '1px solid var(--slate-200)', color: 'var(--slate-600)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '16px 20px' }}>Course Name</th>
                  <th style={{ padding: '16px 20px' }}>Certificate ID</th>
                  <th style={{ padding: '16px 20px' }}>Issue Date</th>
                  <th style={{ padding: '16px 20px' }}>SHA256 / IPFS</th>
                  <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCerts.map((cert) => {
                  const verifyUrl = cert.verificationUrl || `${secureVaultApi.getVerifyBaseUrl()}/${cert.certificateId}`;

                  return (
                    <tr
                      key={cert.certificateId}
                      style={{
                        borderBottom: '1px solid var(--slate-100)',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--slate-50)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {/* Course Name */}
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
                              {cert.courseTitle || cert.course}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                              Recipient: {cert.studentName || cert.learnerName}
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
                        {cert.issueDate || cert.rawIssueDate}
                      </td>

                      {/* SHA256 / IPFS summary */}
                      <td style={{ padding: '18px 20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'var(--slate-500)' }} title={cert.hash}>
                            Hash: {cert.hash ? `${cert.hash.slice(0, 10)}...` : '0x8f4be92c...'}
                          </span>
                          <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'var(--primary-700)' }}>
                            IPFS: {cert.ipfsCID && cert.ipfsCID !== 'none' ? `${cert.ipfsCID.slice(0, 12)}...` : 'Anchored'}
                          </span>
                        </div>
                      </td>

                      {/* Actions: Verify Button, Download Again Button */}
                      <td style={{ padding: '18px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          {/* Verify Button */}
                          <a
                            href={verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-sm"
                            title="Verify on SecureVault"
                          >
                            <ShieldCheck size={14} />
                            Verify
                          </a>

                          {/* Download Again Button */}
                          <button
                            onClick={() => secureVaultApi.triggerPdfDownload(cert)}
                            className="btn btn-primary btn-sm"
                            title="Download Certificate PDF Again"
                          >
                            <Download size={14} />
                            Download Again
                          </button>

                          {/* Preview Button */}
                          <button
                            onClick={() => onOpenCertificatePreview(cert)}
                            className="btn btn-light-primary btn-sm"
                            title="View Preview"
                          >
                            <ExternalLink size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
            Complete all modules for any course to 100% and click "Download Verified Certificate" to generate and anchor your credential into SecureVault.
          </p>
        </div>
      )}
    </div>
  );
};
