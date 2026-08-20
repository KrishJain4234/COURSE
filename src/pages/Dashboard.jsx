import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  Award,
  Clock,
  Flame,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Calendar,
  AlertCircle,
  Download
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLearning } from '../context/LearningContext';
import { secureVaultApi } from '../services/secureVaultApi';
import { StatCard } from '../components/common/StatCard';
import { CourseCard } from '../components/common/CourseCard';
import { ProgressBar } from '../components/common/ProgressBar';

export const Dashboard = ({ onNavigate, onSelectCourse }) => {
  const { user } = useAuth();
  const {
    courses,
    learningSummary,
    certificates,
    generateAndDownloadCertificate,
    setActiveCertificateModal,
    setActiveCertificatePreview
  } = useLearning();

  // Find the primary active in-progress course
  const activeCourse = courses.find((c) => c.progress > 0 && c.progress < 100) || courses[0];
  const inProgressCourses = courses.filter((c) => c.progress > 0 && c.progress < 100);
  const completedCourses = courses.filter((c) => c.isCompleted);

  return (
    <div className="page-container">
      {/* Welcome Banner */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--primary-700)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Academic Portal • {user?.institution || 'BMS Institute of Technology'}
            </span>
          </div>
          <h1 className="responsive-title" style={{ fontWeight: 800, color: 'var(--slate-900)', letterSpacing: '-0.02em' }}>
            Welcome back, {user?.name || 'Krish Jain'}
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', marginTop: '4px' }}>
            Learner ID: <strong style={{ color: 'var(--slate-800)' }}>{user?.learnerId || 'STU-2026-001'}</strong> • Department of Computer Science & Engineering
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button
            onClick={() => onNavigate('catalog')}
            className="btn btn-secondary"
          >
            Explore Catalog
          </button>
          <button
            onClick={() => onSelectCourse(activeCourse?.id || 'ai-fundamentals')}
            className="btn btn-primary"
          >
            Resume Learning
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Learning Summary - 5 Modern Statistic Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}
      >
        <StatCard
          title="Enrolled Courses"
          value={learningSummary.enrolledCourses}
          subtitle="6 Total Specializations"
          icon={BookOpen}
          color="blue"
          trend={{ text: 'Active Track', isPositive: true }}
          onClick={() => onNavigate('my-learning')}
        />

        <StatCard
          title="Completed Courses"
          value={learningSummary.completedCourses}
          subtitle="Accredited Modules"
          icon={CheckCircle2}
          color="green"
          trend={{ text: `${Math.round((learningSummary.completedCourses / learningSummary.enrolledCourses) * 100)}% Complete`, isPositive: true }}
          onClick={() => onNavigate('my-learning')}
        />

        <StatCard
          title="Certificates Earned"
          value={learningSummary.certificatesEarned}
          subtitle="SecureVault Verified"
          icon={Award}
          color="indigo"
          trend={{ text: 'Ledger Verified', isPositive: true }}
          onClick={() => onNavigate('certificates')}
        />

        <StatCard
          title="Learning Hours"
          value={`${learningSummary.learningHours}h`}
          subtitle="Total Study & Labs"
          icon={Clock}
          color="cyan"
          trend={{ text: '+4.5h this week', isPositive: true }}
        />

        <StatCard
          title="Current Streak"
          value={`${learningSummary.currentStreak} Days`}
          subtitle="Consistent Attendance"
          icon={Flame}
          color="amber"
          trend={{ text: 'Personal Best 🔥', isPositive: true }}
        />
      </div>

      {/* Active Learning Hero Widget */}
      {activeCourse && (
        <div
          className="card"
          style={{
            padding: '28px',
            marginBottom: '36px',
            backgroundColor: '#ffffff',
            borderLeft: '4px solid var(--primary-700)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px'
          }}
        >
          <div style={{ flex: '1 1 500px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  backgroundColor: 'var(--primary-50)',
                  color: 'var(--primary-800)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '4px',
                  textTransform: 'uppercase'
                }}
              >
                In Progress • High Priority
              </span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
                {activeCourse.code} • {activeCourse.instructor}
              </span>
            </div>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '8px' }}>
              {activeCourse.name}
            </h2>

            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginBottom: '18px', maxWidth: '640px' }}>
              {activeCourse.overview}
            </p>

            <div style={{ maxWidth: '440px' }}>
              <ProgressBar progress={activeCourse.progress} height={8} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
            <button
              onClick={() => onSelectCourse(activeCourse.id)}
              className="btn btn-primary btn-lg"
            >
              Continue Module
              <ArrowRight size={18} />
            </button>
            <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
              Next lesson: Module 4 Capstone Assessment
            </span>
          </div>
        </div>
      )}

      {/* Grid: In-Progress & Recommended Specializations */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              Curriculum Specializations
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
              Explore your registered enterprise engineering modules
            </p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="btn btn-secondary btn-sm"
          >
            View All Courses
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: '20px'
          }}
        >
          {courses.slice(0, 3).map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelectCourse={onSelectCourse}
              onOpenCertificate={(c) => generateAndDownloadCertificate(c)}
            />
          ))}
        </div>
      </div>

      {/* My Certificates Section on Dashboard */}
      {certificates.length > 0 && (
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={20} color="var(--primary-700)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                My Certificates ({certificates.length})
              </h2>
            </div>
            <button onClick={() => onNavigate('certificates')} className="btn btn-secondary btn-sm">
              Manage All
            </button>
          </div>

          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--slate-50)', borderBottom: '1px solid var(--slate-200)', color: 'var(--slate-600)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '12px 18px' }}>Course Name</th>
                    <th style={{ padding: '12px 18px' }}>Certificate ID</th>
                    <th style={{ padding: '12px 18px' }}>Issue Date</th>
                    <th style={{ padding: '12px 18px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.slice(0, 3).map((cert) => {
                    const verifyUrl = cert.verificationUrl || `${secureVaultApi.getVerifyBaseUrl()}/${cert.certificateId}`;
                    return (
                      <tr key={cert.certificateId} style={{ borderBottom: '1px solid var(--slate-100)' }}>
                        <td style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--slate-900)' }}>
                          {cert.courseTitle || cert.course}
                        </td>
                        <td style={{ padding: '14px 18px', fontFamily: 'monospace', fontWeight: 700, color: 'var(--primary-800)' }}>
                          {cert.certificateId}
                        </td>
                        <td style={{ padding: '14px 18px', color: 'var(--slate-600)' }}>
                          {cert.issueDate || cert.rawIssueDate}
                        </td>
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '8px' }}>
                            <a
                              href={verifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-secondary btn-sm"
                              style={{ fontSize: '0.75rem' }}
                            >
                              <ShieldCheck size={13} />
                              Verify
                            </a>
                            <button
                              onClick={() => secureVaultApi.triggerPdfDownload(cert)}
                              className="btn btn-primary btn-sm"
                              style={{ fontSize: '0.75rem' }}
                            >
                              <Download size={13} />
                              Download Again
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
        </div>
      )}

      {/* Bottom Row: Academic Deadlines & SecureVault Trust Card */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Deadlines Card */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} color="var(--primary-700)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                Upcoming Academic Deadlines
              </h3>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-500)' }}>Semester 2026</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: 'var(--slate-50)', borderRadius: '8px', border: '1px solid var(--slate-200)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                  AI Fundamentals Capstone Project
                </span>
                <span style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: 700, backgroundColor: '#fffbeb', padding: '1px 6px', borderRadius: '4px' }}>
                  Due in 3 Days
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-600)' }}>
                Submission for automated grading & peer evaluation.
              </div>
            </div>

            <div style={{ padding: '12px', backgroundColor: 'var(--slate-50)', borderRadius: '8px', border: '1px solid var(--slate-200)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                  AWS Solutions Architect Lab 3
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--slate-600)' }}>
                  Due next Monday
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-600)' }}>
                Multi-AZ Aurora configuration and Terraform manifests.
              </div>
            </div>
          </div>
        </div>

        {/* SecureVault Trust Card */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <ShieldCheck size={20} color="var(--primary-700)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-900)' }}>
              Enterprise Verification Active
            </h3>
          </div>

          <p style={{ fontSize: '0.8125rem', color: 'var(--slate-600)', marginBottom: '16px', lineHeight: 1.5 }}>
            All course completions, lab submissions, and academic credentials are cryptographically stamped with SHA-256 digital signatures on the SecureVault ledger for instant employer verification.
          </p>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => onNavigate('certificates')}
              className="btn btn-primary btn-sm"
            >
              <Award size={15} />
              View Certificates ({learningSummary.certificatesEarned})
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="btn btn-secondary btn-sm"
            >
              Academic Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
