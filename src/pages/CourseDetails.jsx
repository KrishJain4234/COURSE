import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  ShieldCheck,
  User,
  GraduationCap,
  PlayCircle,
  FileText,
  Code,
  CheckSquare,
  Square,
  Sparkles,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Lock
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { useAuth } from '../context/AuthContext';
import { ProgressBar } from '../components/common/ProgressBar';
import { Badge } from '../components/common/Badge';

export const CourseDetails = ({
  courseId,
  onBack,
  onOpenCertificateModal,
  onOpenCertificatePreview
}) => {
  const { user } = useAuth();
  const {
    courses,
    toggleLesson,
    markCourseCompleted,
    generateAndDownloadCertificate,
    resetCourseProgress,
    certificates
  } = useLearning();

  const [expandedModules, setExpandedModules] = useState({
    m1: true,
    m2: true,
    m3: true,
    m4: true
  });

  const course = courses.find((c) => c.id === courseId) || courses[0];
  const isCompleted = course.progress === 100;

  // Find issued certificate if course is completed
  const issuedCert = certificates.find((c) => c.courseId === course.id);

  const toggleModule = (modId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const getLessonIcon = (type) => {
    switch (type) {
      case 'Video & Lecture':
        return <PlayCircle size={16} color="var(--primary-700)" />;
      case 'Hands-on Lab':
      case 'Coding Exercise':
        return <Code size={16} color="var(--primary-700)" />;
      case 'Assessment':
      case 'Proctored Exam':
      case 'Project Submission':
        return <Award size={16} color="var(--warning-700)" />;
      default:
        return <FileText size={16} color="var(--slate-500)" />;
    }
  };

  const handleMarkCompleted = async () => {
    await markCourseCompleted(course.id);
  };

  return (
    <div className="page-container">
      {/* Back button */}
      <button
        onClick={onBack}
        className="btn btn-secondary btn-sm"
        style={{ marginBottom: '20px' }}
      >
        <ArrowLeft size={16} />
        Back to Courses
      </button>

      {/* Course Banner Header */}
      <div
        style={{
          padding: '36px 40px',
          backgroundColor: '#1e3a8a',
          backgroundImage: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
          color: '#ffffff',
          borderRadius: '16px',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
          <div style={{ maxWidth: '780px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
              <span
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#bfdbfe',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '4px',
                  fontFamily: 'monospace'
                }}
              >
                {course.code}
              </span>
              <span
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '3px 10px',
                  borderRadius: '4px'
                }}
              >
                {course.category}
              </span>
              <span
                style={{
                  backgroundColor: isCompleted ? '#15803d' : 'rgba(59, 130, 246, 0.3)',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '4px'
                }}
              >
                {isCompleted ? '✓ Completed' : 'In Progress'}
              </span>
            </div>

            <h1 style={{ fontSize: '2.1rem', fontWeight: 800, lineHeight: 1.25, letterSpacing: '-0.02em', marginBottom: '12px' }}>
              {course.name}
            </h1>

            <p style={{ fontSize: '0.9375rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '20px' }}>
              {course.overview}
            </p>

            {/* Instructor & Meta strip */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '24px', fontSize: '0.8125rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={16} color="#93c5fd" />
                <span>Instructor: <strong style={{ color: '#ffffff' }}>{course.instructor}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} color="#93c5fd" />
                <span>{course.duration}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GraduationCap size={16} color="#93c5fd" />
                <span>{course.credits}</span>
              </div>
            </div>
          </div>

          {/* Quick Progress & Completion Action Box */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '12px',
              padding: '24px',
              minWidth: '280px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '6px', color: '#dbeafe' }}>
                <span>Completion Status</span>
                <strong style={{ color: '#ffffff' }}>{course.progress}%</strong>
              </div>
              <div className="progress-track" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', height: '10px' }}>
                <div
                  className={`progress-fill ${isCompleted ? 'completed' : ''}`}
                  style={{ width: `${course.progress}%`, backgroundColor: isCompleted ? '#22c55e' : '#3b82f6' }}
                />
              </div>
            </div>

            {isCompleted ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => generateAndDownloadCertificate(course)}
                  className="btn btn-success btn-lg"
                  style={{ width: '100%', fontWeight: 700 }}
                >
                  <Award size={18} />
                  Download Verified Certificate
                </button>

                {issuedCert && (
                  <button
                    onClick={() => onOpenCertificatePreview(issuedCert)}
                    className="btn btn-sm"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.2)' }}
                  >
                    <ExternalLink size={15} />
                    View Certificate ({issuedCert.certificateId})
                  </button>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={handleMarkCompleted}
                  className="btn btn-primary"
                  style={{ width: '100%', backgroundColor: '#2563eb' }}
                >
                  <CheckCircle2 size={18} />
                  Mark Course Completed
                </button>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '0.75rem',
                    color: '#cbd5e1',
                    padding: '4px',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '6px'
                  }}
                >
                  <Lock size={12} />
                  <span>Certificate unlocks at 100% completion</span>
                </div>
              </div>
            )}

            <button
              onClick={() => resetCourseProgress(course.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#93c5fd',
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              <RefreshCw size={12} /> Reset progress for demo
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Left Modules vs Right Details */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '32px' }}>
        {/* Left: Interactive Modules Curriculum */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Course Modules & Lessons
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
                Click lessons or checkboxes to update your real-time academic progress.
              </p>
            </div>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--primary-700)' }}>
              {course.completedLessons.length} of {course.modules.reduce((a, m) => a + m.lessons.length, 0)} Completed
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {course.modules.map((mod, index) => {
              const isModExpanded = expandedModules[mod.id] ?? true;
              const completedInMod = mod.lessons.filter((l) => course.completedLessons.includes(l.id)).length;
              const isModDone = completedInMod === mod.lessons.length;

              return (
                <div key={mod.id} className="card" style={{ overflow: 'hidden' }}>
                  {/* Module Accordion Header */}
                  <div
                    onClick={() => toggleModule(mod.id)}
                    style={{
                      padding: '18px 24px',
                      backgroundColor: isModDone ? '#f0fdf4' : 'var(--slate-50)',
                      borderBottom: isModExpanded ? '1px solid var(--slate-200)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: isModDone ? 'var(--success-500)' : 'var(--primary-700)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.8125rem',
                          fontWeight: 700
                        }}
                      >
                        {isModDone ? <CheckCircle2 size={16} /> : index + 1}
                      </div>

                      <div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                          {mod.title}
                        </div>
                        <div style={{ fontSize: '0.78125rem', color: 'var(--slate-500)' }}>
                          {mod.duration} • {mod.description}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: isModDone ? 'var(--success-700)' : 'var(--slate-500)'
                        }}
                      >
                        {completedInMod}/{mod.lessons.length}
                      </span>
                      {isModExpanded ? <ChevronUp size={18} color="var(--slate-400)" /> : <ChevronDown size={18} color="var(--slate-400)" />}
                    </div>
                  </div>

                  {/* Lesson List */}
                  {isModExpanded && (
                    <div style={{ padding: '8px 16px' }}>
                      {mod.lessons.map((lesson) => {
                        const isLessonDone = course.completedLessons.includes(lesson.id);

                        return (
                          <div
                            key={lesson.id}
                            onClick={() => toggleLesson(course.id, mod.id, lesson.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '12px 14px',
                              borderRadius: '8px',
                              margin: '4px 0',
                              backgroundColor: isLessonDone ? 'var(--slate-50)' : '#ffffff',
                              cursor: 'pointer',
                              border: '1px solid transparent',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--slate-200)')}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <button
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  color: isLessonDone ? 'var(--success-500)' : 'var(--slate-300)',
                                  display: 'flex',
                                  padding: 0
                                }}
                              >
                                {isLessonDone ? <CheckSquare size={20} color="var(--success-700)" /> : <Square size={20} />}
                              </button>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {getLessonIcon(lesson.type)}
                                <span
                                  style={{
                                    fontSize: '0.875rem',
                                    fontWeight: isLessonDone ? 500 : 600,
                                    color: isLessonDone ? 'var(--slate-600)' : 'var(--slate-900)',
                                    textDecoration: isLessonDone ? 'line-through' : 'none'
                                  }}
                                >
                                  {lesson.title}
                                </span>
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span
                                style={{
                                  fontSize: '0.71875rem',
                                  backgroundColor: 'var(--slate-100)',
                                  color: 'var(--slate-600)',
                                  padding: '2px 8px',
                                  borderRadius: '4px'
                                }}
                              >
                                {lesson.type}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>
                                {lesson.duration}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Outcomes, Instructor, and Assessment Rubric */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Learning Outcomes Card */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Sparkles size={18} color="var(--primary-700)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                Learning Outcomes
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {course.learningOutcomes.map((outcome, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={16} color="var(--primary-700)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.8125rem', color: 'var(--slate-700)', lineHeight: 1.5 }}>
                    {outcome}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment Section Card */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Award size={18} color="var(--primary-700)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                Assessment & Certification
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: 'var(--slate-50)', borderRadius: '6px' }}>
                <span style={{ color: 'var(--slate-600)' }}>Quizzes & Knowledge Checks</span>
                <strong style={{ color: 'var(--slate-900)' }}>{course.assessmentCriteria.quizzes}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: 'var(--slate-50)', borderRadius: '6px' }}>
                <span style={{ color: 'var(--slate-600)' }}>Hands-on Lab Assignments</span>
                <strong style={{ color: 'var(--slate-900)' }}>{course.assessmentCriteria.labAssignments}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: 'var(--slate-50)', borderRadius: '6px' }}>
                <span style={{ color: 'var(--slate-600)' }}>Final Capstone Exam</span>
                <strong style={{ color: 'var(--slate-900)' }}>{course.assessmentCriteria.finalCapstone}</strong>
              </div>
            </div>

            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--slate-200)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={16} color="var(--success-700)" />
              <span style={{ fontSize: '0.75rem', color: 'var(--slate-600)' }}>
                Passing benchmark: <strong>80% or higher</strong> for SecureVault verified certificate issuance.
              </span>
            </div>
          </div>

          {/* Instructor Bio Card */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-700)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.9375rem'
                }}
              >
                {course.instructor.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                  {course.instructor}
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                  {course.instructorRole}
                </p>
              </div>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
              {course.instructorBio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
