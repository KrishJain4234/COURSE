import React from 'react';
import {
  User,
  Building2,
  Mail,
  Award,
  BookOpen,
  Clock,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLearning } from '../context/LearningContext';
import { Badge } from '../components/common/Badge';

export const Profile = ({ onOpenCertificatePreview, onNavigate }) => {
  const { user } = useAuth();
  const { learningSummary, certificates, courses } = useLearning();

  const achievements = [
    {
      id: 1,
      title: 'Decentralized Systems Pioneer',
      category: 'Blockchain Specialization',
      date: 'Earned Aug 2026',
      icon: ShieldCheck,
      color: 'blue'
    },
    {
      id: 2,
      title: '7-Day Continuous Study Streak',
      category: 'Dedication & Attendance',
      date: 'Active Streak',
      icon: Flame,
      color: 'amber'
    },
    {
      id: 3,
      title: 'Academic Honor Roll',
      category: 'BMSIT Dean Merit List',
      date: 'Session 2026',
      icon: Award,
      color: 'indigo'
    },
    {
      id: 4,
      title: 'Enterprise AI Lab Champion',
      category: 'Practical Implementation',
      date: 'Earned Aug 2026',
      icon: Sparkles,
      color: 'green'
    }
  ];

  return (
    <div className="page-container">
      {/* Header Profile Card */}
      <div
        className="card responsive-banner"
        style={{
          marginBottom: '32px',
          backgroundColor: '#ffffff'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' }}>
            {/* Avatar Pill */}
            <div
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '16px',
                backgroundColor: 'var(--primary-700)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.85rem',
                fontWeight: 800,
                border: '3px solid var(--primary-100)',
                boxShadow: '0 4px 12px rgba(30, 58, 138, 0.15)',
                flexShrink: 0
              }}
            >
              KJ
            </div>

            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <h1 className="responsive-title" style={{ fontWeight: 800, color: 'var(--slate-900)' }}>
                  {user?.name || 'Krish Jain'}
                </h1>
                <span
                  style={{
                    backgroundColor: 'var(--primary-50)',
                    color: 'var(--primary-800)',
                    border: '1px solid var(--primary-200)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <ShieldCheck size={13} /> {user?.role || 'Student'}
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px', fontSize: '0.8125rem', color: 'var(--slate-600)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Building2 size={15} color="var(--slate-400)" />
                  <span>{user?.institution || 'BMS Institute of Technology'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={15} color="var(--slate-400)" />
                  <span>{user?.email || 'demo@eduverse.com'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <GraduationCap size={15} color="var(--slate-400)" />
                  <span>ID: <strong style={{ color: 'var(--slate-800)', fontFamily: 'monospace' }}>{user?.learnerId || 'STU-2026-001'}</strong></span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => onNavigate('certificates')}
              className="btn btn-primary btn-sm"
            >
              <Award size={15} />
              View Certificates ({certificates.length})
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Learning Statistics & Academic Information */}
      <div className="responsive-profile-grid" style={{ marginBottom: '32px' }}>
        {/* Academic Details & Department */}
        <div className="card" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '18px' }}>
            Institutional Registration
          </h2>

          <div className="responsive-subgrid" style={{ fontSize: '0.8125rem' }}>
            <div style={{ padding: '12px', backgroundColor: 'var(--slate-50)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--slate-500)', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
                Academic Institution
              </span>
              <strong style={{ color: 'var(--slate-900)', fontSize: '0.875rem' }}>{user?.institution}</strong>
            </div>

            <div style={{ padding: '12px', backgroundColor: 'var(--slate-50)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--slate-500)', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
                Department
              </span>
              <strong style={{ color: 'var(--slate-900)', fontSize: '0.875rem' }}>Department of Computer Science</strong>
            </div>

            <div style={{ padding: '12px', backgroundColor: 'var(--slate-50)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--slate-500)', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
                Academic Program
              </span>
              <strong style={{ color: 'var(--slate-900)', fontSize: '0.875rem' }}>B.E. Computer Science (Honors)</strong>
            </div>

            <div style={{ padding: '12px', backgroundColor: 'var(--slate-50)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--slate-500)', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
                SecureVault Identity Status
              </span>
              <span style={{ color: 'var(--success-700)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={14} /> Verified Student Identity
              </span>
            </div>
          </div>
        </div>

        {/* Learning Statistics Summary */}
        <div className="card" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '18px' }}>
            Academic Statistics
          </h2>

          <div className="responsive-subgrid">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: 'var(--slate-50)', borderRadius: '8px' }}>
              <BookOpen size={20} color="var(--primary-700)" />
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  {learningSummary.enrolledCourses}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Total Enrolled</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: 'var(--slate-50)', borderRadius: '8px' }}>
              <CheckCircle2 size={20} color="var(--success-700)" />
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  {learningSummary.completedCourses}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Completed Courses</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: 'var(--slate-50)', borderRadius: '8px' }}>
              <Clock size={20} color="var(--info-700)" />
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  {learningSummary.learningHours}h
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Study & Labs</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: 'var(--slate-50)', borderRadius: '8px' }}>
              <Flame size={20} color="var(--warning-700)" />
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  {learningSummary.currentStreak} Days
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Active Streak</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '18px' }}>
          Badges & Honors
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
          {achievements.map((ach) => {
            const Icon = ach.icon;
            return (
              <div
                key={ach.id}
                className="card"
                style={{
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--primary-50)',
                    color: 'var(--primary-700)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                    {ach.title}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                    {ach.category}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--primary-700)', fontWeight: 600, marginTop: '2px' }}>
                    {ach.date}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificates Earned List */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Certificates Earned ({certificates.length})
          </h2>
          <button
            onClick={() => onNavigate('certificates')}
            className="btn btn-secondary btn-sm"
          >
            Manage All
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
          {certificates.map((cert) => (
            <div
              key={cert.certificateId}
              className="card card-hoverable"
              style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-800)', fontFamily: 'monospace' }}>
                    {cert.certificateId}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <CheckCircle2 size={12} /> Verified
                  </span>
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '4px' }}>
                  {cert.courseTitle}
                </h3>
                <p style={{ fontSize: '0.78125rem', color: 'var(--slate-500)' }}>
                  Issued: {cert.issueDate} • {cert.institution}
                </p>
              </div>

              <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => onOpenCertificatePreview(cert)}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                >
                  <ExternalLink size={14} />
                  View Credential
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
