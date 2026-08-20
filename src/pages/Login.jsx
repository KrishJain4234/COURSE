import React, { useState } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Award,
  BookOpen,
  CheckCircle2,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  Building2,
  FileCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = ({ onLoginSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('demo@eduverse.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      if (onLoginSuccess) onLoginSuccess();
    } else {
      setError(res.error || 'Authentication failed.');
    }
  };

  const handleUseDemoCreds = () => {
    setEmail('demo@eduverse.com');
    setPassword('password123');
    setError('');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: '#f8fafc'
      }}
    >
      {/* Left Column: Brand, Institutional Benefits, & Learning Illustration */}
      <div
        style={{
          flex: '1 1 50%',
          backgroundColor: '#1e3a8a',
          backgroundImage: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
          color: '#ffffff',
          padding: '60px 64px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle geometric lines */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        {/* Top Header */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}
            >
              <GraduationCap size={28} />
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                EduVerse
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Enterprise Learning Portal
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              padding: '6px 12px',
              borderRadius: '9999px',
              fontSize: '0.78125rem',
              color: '#dbeafe',
              fontWeight: 500
            }}
          >
            <Building2 size={14} color="#93c5fd" />
            <span>Academic Partner: BMS Institute of Technology</span>
          </div>
        </div>

        {/* Center: Welcome Banner & Value Highlights */}
        <div style={{ position: 'relative', zIndex: 2, margin: '40px 0' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '16px', letterSpacing: '-0.03em' }}>
            Enterprise Skill Infrastructure for Future Leaders.
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.6, maxWidth: '520px', marginBottom: '32px' }}>
            Access accredited university courses, hands-on enterprise capstone evaluations, and cryptographically verifiable digital credentials.
          </p>

          {/* Benefits Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '520px' }}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '16px', borderRadius: '10px' }}>
              <Award size={20} color="#60a5fa" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '2px' }}>Verifiable Credentials</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>SecureVault blockchain and PKI ledger anchored certificates.</div>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '16px', borderRadius: '10px' }}>
              <BookOpen size={20} color="#60a5fa" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '2px' }}>Accredited Syllabus</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Designed in partnership with top university engineering faculties.</div>
            </div>
          </div>
        </div>

        {/* Bottom: Secure Certification Messaging */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 18px',
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '0.78125rem',
            color: '#94a3b8'
          }}
        >
          <ShieldCheck size={20} color="#34d399" />
          <span>
            Compliant with ISO/IEC 27001 Security Protocols & National Digital Skill Verification Frameworks.
          </span>
        </div>
      </div>

      {/* Right Column: Clean Corporate Login Card */}
      <div
        style={{
          flex: '1 1 50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px 32px'
        }}
      >
        <div style={{ width: '100%', maxWidth: '440px' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)', letterSpacing: '-0.02em' }}>
              Learner Portal Sign In
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', marginTop: '4px' }}>
              Please enter your institutional credentials to continue.
            </p>
          </div>

          {/* Quick Demo Credentials Autofill Banner */}
          <div
            style={{
              padding: '14px 16px',
              backgroundColor: 'var(--primary-50)',
              border: '1px solid var(--primary-200)',
              borderRadius: '8px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-900)' }}>
                Demo Credentials Provided
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--primary-700)', fontFamily: 'monospace', marginTop: '2px' }}>
                demo@eduverse.com / password123
              </div>
            </div>
            <button
              type="button"
              onClick={handleUseDemoCreds}
              className="btn btn-sm btn-primary"
              style={{ fontSize: '0.75rem' }}
            >
              Fill Credentials
            </button>
          </div>

          {error && (
            <div
              style={{
                padding: '12px 14px',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                color: '#b91c1c',
                fontSize: '0.8125rem',
                marginBottom: '20px'
              }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Institutional Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--slate-400)'
                  }}
                />
                <input
                  type="email"
                  required
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  placeholder="name@bmsit.edu.in or demo@eduverse.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary-700)', cursor: 'pointer', fontWeight: 600 }}>
                  Forgot password?
                </span>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--slate-400)'
                  }}
                />
                <input
                  type="password"
                  required
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--slate-600)', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary-700)' }} />
                Remember this device
              </label>
              <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                STU Session 2026
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', fontSize: '0.9375rem' }}
            >
              {loading ? 'Authenticating...' : 'Sign In to Portal'}
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Institutional Single Sign-On Helper */}
          <div style={{ marginTop: '32px', textAlign: 'center', borderTop: '1px solid var(--slate-200)', paddingTop: '24px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', display: 'block', marginBottom: '12px' }}>
              Enterprise & University Integrations
            </span>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                type="button"
                onClick={handleUseDemoCreds}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem' }}
              >
                BMSIT Student SSO
              </button>
              <button
                type="button"
                onClick={handleUseDemoCreds}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem' }}
              >
                EduVerse Academic ID
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
