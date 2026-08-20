import React from 'react';
import { Clock, BarChart2, BookOpen, Award, CheckCircle, ArrowRight, User } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { Badge } from './Badge';

export const CourseCard = ({ course, onSelectCourse, onOpenCertificate }) => {
  const isCompleted = course.progress === 100;
  const isStarted = course.progress > 0;

  // Curated clean enterprise gradients/SVGs for course banners
  const getBannerSvg = (id) => {
    switch (id) {
      case 'ai-fundamentals':
        return (
          <svg viewBox="0 0 400 180" className="w-full h-full" style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <defs>
              <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#1e40af" />
              </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#aiGrad)" />
            <circle cx="80" cy="90" r="40" fill="#3b82f6" opacity="0.25" />
            <circle cx="320" cy="90" r="60" fill="#60a5fa" opacity="0.15" />
            <line x1="80" y1="90" x2="200" y2="50" stroke="#93c5fd" strokeWidth="2" opacity="0.5" />
            <line x1="80" y1="90" x2="200" y2="130" stroke="#93c5fd" strokeWidth="2" opacity="0.5" />
            <line x1="200" y1="50" x2="320" y2="90" stroke="#93c5fd" strokeWidth="2" opacity="0.5" />
            <line x1="200" y1="130" x2="320" y2="90" stroke="#93c5fd" strokeWidth="2" opacity="0.5" />
            <circle cx="200" cy="50" r="6" fill="#bfdbfe" />
            <circle cx="200" cy="130" r="6" fill="#bfdbfe" />
            <circle cx="80" cy="90" r="8" fill="#ffffff" />
            <circle cx="320" cy="90" r="10" fill="#ffffff" />
            <text x="24" y="36" fill="#ffffff" fontSize="13" fontWeight="700" letterSpacing="0.05em" opacity="0.85">CSE-AI-501</text>
            <text x="24" y="156" fill="#bfdbfe" fontSize="11" fontWeight="600">Enterprise AI Foundations</text>
          </svg>
        );
      case 'ml-basics':
        return (
          <svg viewBox="0 0 400 180" style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <defs>
              <linearGradient id="mlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#mlGrad)" />
            <path d="M 40 140 Q 120 130 200 80 T 360 40" fill="none" stroke="#38bdf8" strokeWidth="3" opacity="0.8" />
            <circle cx="120" cy="115" r="5" fill="#38bdf8" />
            <circle cx="200" cy="80" r="5" fill="#38bdf8" />
            <circle cx="280" cy="55" r="5" fill="#38bdf8" />
            <circle cx="360" cy="40" r="6" fill="#ffffff" />
            <text x="24" y="36" fill="#ffffff" fontSize="13" fontWeight="700" letterSpacing="0.05em" opacity="0.85">CSE-ML-502</text>
            <text x="24" y="156" fill="#bae6fd" fontSize="11" fontWeight="600">Statistical Learning Algorithms</text>
          </svg>
        );
      case 'blockchain-essentials':
        return (
          <svg viewBox="0 0 400 180" style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <defs>
              <linearGradient id="bcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#bcGrad)" />
            <rect x="70" y="65" width="50" height="50" rx="6" fill="#ffffff" opacity="0.15" stroke="#93c5fd" strokeWidth="1.5" />
            <rect x="175" y="65" width="50" height="50" rx="6" fill="#ffffff" opacity="0.2" stroke="#93c5fd" strokeWidth="1.5" />
            <rect x="280" y="65" width="50" height="50" rx="6" fill="#ffffff" opacity="0.15" stroke="#93c5fd" strokeWidth="1.5" />
            <line x1="120" y1="90" x2="175" y2="90" stroke="#bfdbfe" strokeWidth="3" strokeDasharray="4 2" />
            <line x1="225" y1="90" x2="280" y2="90" stroke="#bfdbfe" strokeWidth="3" strokeDasharray="4 2" />
            <text x="24" y="36" fill="#ffffff" fontSize="13" fontWeight="700" letterSpacing="0.05em" opacity="0.85">CSE-BC-503</text>
            <text x="24" y="156" fill="#e0f2fe" fontSize="11" fontWeight="600">Secure Consensus & Smart Contracts</text>
          </svg>
        );
      case 'cyber-security-fundamentals':
        return (
          <svg viewBox="0 0 400 180" style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <defs>
              <linearGradient id="secGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#secGrad)" />
            <path d="M 200 45 L 250 65 L 250 110 Q 200 145 200 145 Q 150 110 150 65 Z" fill="#2563eb" opacity="0.3" stroke="#60a5fa" strokeWidth="2" />
            <circle cx="200" cy="85" r="10" fill="#ffffff" opacity="0.8" />
            <rect x="196" y="92" width="8" height="18" rx="2" fill="#ffffff" opacity="0.8" />
            <text x="24" y="36" fill="#ffffff" fontSize="13" fontWeight="700" letterSpacing="0.05em" opacity="0.85">CSE-SEC-504</text>
            <text x="24" y="156" fill="#cbd5e1" fontSize="11" fontWeight="600">Zero Trust & Threat Defense</text>
          </svg>
        );
      case 'cloud-computing-aws':
        return (
          <svg viewBox="0 0 400 180" style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <defs>
              <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#cloudGrad)" />
            <path d="M 160 115 A 25 25 0 0 1 185 85 A 35 35 0 0 1 245 85 A 25 25 0 0 1 265 115 Z" fill="#ffffff" opacity="0.3" />
            <circle cx="140" cy="115" r="14" fill="#ffffff" opacity="0.3" />
            <rect x="140" y="105" width="130" height="16" fill="#ffffff" opacity="0.3" />
            <text x="24" y="36" fill="#ffffff" fontSize="13" fontWeight="700" letterSpacing="0.05em" opacity="0.85">CSE-AWS-505</text>
            <text x="24" y="156" fill="#dbeafe" fontSize="11" fontWeight="600">Enterprise Cloud Architecture</text>
          </svg>
        );
      case 'generative-ai-apps':
      default:
        return (
          <svg viewBox="0 0 400 180" style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <defs>
              <linearGradient id="genAiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="100%" stopColor="#1e40af" />
              </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#genAiGrad)" />
            <circle cx="200" cy="90" r="38" fill="#818cf8" opacity="0.25" />
            <circle cx="200" cy="90" r="22" fill="#c7d2fe" opacity="0.3" />
            <circle cx="200" cy="90" r="8" fill="#ffffff" />
            <path d="M 140 90 Q 200 40 260 90 Q 200 140 140 90" fill="none" stroke="#a5b4fc" strokeWidth="2" opacity="0.6" />
            <text x="24" y="36" fill="#ffffff" fontSize="13" fontWeight="700" letterSpacing="0.05em" opacity="0.85">CSE-GENAI-506</text>
            <text x="24" y="156" fill="#e0e7ff" fontSize="11" fontWeight="600">LLM RAG & Cognitive Agents</text>
          </svg>
        );
    }
  };

  const getDifficultyBadgeVariant = (diff) => {
    switch (diff) {
      case 'Beginner':
        return 'success';
      case 'Intermediate':
        return 'primary';
      case 'Advanced':
      default:
        return 'warning';
    }
  };

  return (
    <div
      className="card card-hoverable"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      {/* Course Banner Image */}
      <div
        style={{
          height: '148px',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#1e3a8a',
          cursor: 'pointer'
        }}
        onClick={() => onSelectCourse(course.id)}
      >
        {getBannerSvg(course.id)}

        {/* Top Badges */}
        <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px' }}>
          {isCompleted && (
            <span
              style={{
                backgroundColor: '#15803d',
                color: '#ffffff',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '4px 8px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              <CheckCircle size={12} /> Completed
            </span>
          )}
          <Badge variant={getDifficultyBadgeVariant(course.difficulty)} size="sm">
            {course.difficulty}
          </Badge>
        </div>
      </div>

      {/* Card Content */}
      <div
        style={{
          padding: '20px 22px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}
      >
        {/* Category & Code */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-700)', textTransform: 'uppercase' }}>
            {course.category}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontFamily: 'monospace' }}>
            {course.code}
          </span>
        </div>

        {/* Course Name */}
        <h3
          onClick={() => onSelectCourse(course.id)}
          style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            color: 'var(--slate-900)',
            lineHeight: 1.35,
            marginBottom: '10px',
            cursor: 'pointer'
          }}
        >
          {course.name}
        </h3>

        {/* Instructor */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--slate-600)', marginBottom: '14px' }}>
          <User size={14} color="var(--slate-400)" />
          <span>{course.instructor}</span>
        </div>

        {/* Meta Info (Duration & Modules) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '0.75rem',
            color: 'var(--slate-500)',
            marginBottom: '18px',
            paddingBottom: '14px',
            borderBottom: '1px solid var(--slate-100)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={13} />
            <span>{course.duration}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <BookOpen size={13} />
            <span>4 Modules</span>
          </div>
        </div>

        {/* Progress Section */}
        <div style={{ marginTop: 'auto', marginBottom: '16px' }}>
          <ProgressBar progress={course.progress} height={6} />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onSelectCourse(course.id)}
            className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
            style={{ flex: 1, fontSize: '0.8125rem' }}
          >
            {isCompleted ? 'Review Course' : isStarted ? 'Continue Learning' : 'Start Course'}
            {!isCompleted && <ArrowRight size={14} />}
          </button>

          {isCompleted && onOpenCertificate && (
            <button
              onClick={() => onOpenCertificate(course)}
              className="btn btn-light-primary"
              style={{ fontSize: '0.8125rem', padding: '8px 12px' }}
              title="Download or View Certificate"
            >
              <Award size={15} />
              Certificate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
