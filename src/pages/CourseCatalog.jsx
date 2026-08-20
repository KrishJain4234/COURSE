import React, { useState } from 'react';
import { Search, Filter, BookOpen, Layers, Award, Sparkles } from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { CourseCard } from '../components/common/CourseCard';

export const CourseCatalog = ({ onSelectCourse, onNavigate }) => {
  const { courses, generateAndDownloadCertificate } = useLearning();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Artificial Intelligence', 'Data Science & ML', 'Decentralized Systems', 'Information Security', 'Cloud Architecture'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter((course) => {
    if (selectedCategory !== 'All' && course.category !== selectedCategory) {
      return false;
    }
    if (selectedDifficulty !== 'All' && course.difficulty !== selectedDifficulty) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        course.name.toLowerCase().includes(q) ||
        course.instructor.toLowerCase().includes(q) ||
        course.overview.toLowerCase().includes(q) ||
        course.code.toLowerCase().includes(q)
      );
    }
    return true;
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
            <Sparkles size={13} />
            Academic Curriculum 2026
          </div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--slate-900)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
            Enterprise Course Catalog
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
            Accredited computer science & advanced engineering courses approved by BMS Institute of Technology and global certification boards.
          </p>
        </div>

        <div
          style={{
            padding: '16px 20px',
            backgroundColor: 'var(--slate-50)',
            border: '1px solid var(--slate-200)',
            borderRadius: '12px',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-800)' }}>
            6
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-500)', textTransform: 'uppercase' }}>
            Specializations
          </div>
        </div>
      </div>

      {/* Filter Controls */}
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
        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.8125rem' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Difficulty */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="form-input"
            style={{ width: '140px', padding: '8px 10px', fontSize: '0.8125rem' }}
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <div style={{ position: 'relative', width: '220px' }}>
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
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
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
    </div>
  );
};
