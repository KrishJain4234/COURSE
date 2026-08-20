import React from 'react';

export const ProgressBar = ({ progress = 0, showLabel = true, height = 8, className = '' }) => {
  const clamped = Math.min(100, Math.max(0, progress));
  const isComplete = clamped === 100;

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-700)' }}>
            Course Progress
          </span>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: isComplete ? 'var(--success-700)' : 'var(--primary-700)' }}>
            {clamped}% {isComplete ? '(Completed)' : ''}
          </span>
        </div>
      )}
      <div className="progress-track" style={{ height: `${height}px` }}>
        <div
          className={`progress-fill ${isComplete ? 'completed' : ''}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
