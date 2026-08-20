import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Clock, Filter, Search, Award } from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { CourseCard } from '../components/common/CourseCard';

export const MyLearning = ({ onSelectCourse, onNavigate }) => {
  const { courses, generateAndDownloadCertificate } = useLearning();
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'in-progress' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter((course) => {
    // Filter tab
    if (filterTab === 'in-progress' && (course.progress === 0 || course.progress === 100)) {
      return false;
    }
    if (filterTab === 'completed' && !course.isCompleted) {
      return false;
    }
    if (filterTab === 'not-started' && course.progress > 0) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        course.name.toLowerCase().includes(q) ||
        course.instructor.toLowerCase().includes(q) ||
        course.category.toLowerCase().includes(q)
      );
    }

    return true;
  });

  const inProgressCount = courses.filter((c) => c.progress > 0 && c.progress < 100).length;
  const completedCount = courses.filter((c) => c.isCompleted).length;

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)', letterSpacing: '-0.02em' }}>
          My Learning Program
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginTop: '4px' }}>
          Track registered academic coursework, module assignments, and specialization certificates.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--slate-200)',
          marginBottom: '28px'
        }}
      >
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setFilterTab('all')}
            className={`btn btn-sm ${filterTab === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All Courses ({courses.length})
          </button>
          <button
            onClick={() => setFilterTab('in-progress')}
            className={`btn btn-sm ${filterTab === 'in-progress' ? 'btn-primary' : 'btn-secondary'}`}
          >
            In Progress ({inProgressCount})
          </button>
          <button
            onClick={() => setFilterTab('completed')}
            className={`btn btn-sm ${filterTab === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Search */}
        <div style={{ width: '280px' }}>
          <input
            type="text"
            className="form-input"
            style={{ padding: '8px 12px', fontSize: '0.8125rem' }}
            placeholder="Filter my courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelectCourse={onSelectCourse}
              onOpenCertificate={(c) => generateAndDownloadCertificate(c)}
            />
          ))}
        </div>
      ) : (
        <div
          className="card"
          style={{
            padding: '48px',
            textAlign: 'center',
            backgroundColor: '#ffffff'
          }}
        >
          <BookOpen size={36} color="var(--slate-400)" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '6px' }}>
            No courses found
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', marginBottom: '16px' }}>
            Try selecting a different filter tab or clear your search term.
          </p>
          <button onClick={() => { setFilterTab('all'); setSearchQuery(''); }} className="btn btn-secondary btn-sm">
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
