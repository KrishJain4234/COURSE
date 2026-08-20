import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'blue',
  onClick
}) => {
  const iconColorMap = {
    blue: { bg: 'var(--primary-50)', color: 'var(--primary-700)', border: 'var(--primary-200)' },
    green: { bg: 'var(--success-50)', color: 'var(--success-700)', border: '#bbf7d0' },
    amber: { bg: 'var(--warning-50)', color: 'var(--warning-700)', border: '#fde68a' },
    indigo: { bg: '#eef2ff', color: '#4338ca', border: '#c7d2fe' },
    cyan: { bg: '#ecfeff', color: '#0e7490', border: '#a5f3fc' }
  };

  const scheme = iconColorMap[color] || iconColorMap.blue;

  return (
    <div
      className={`card ${onClick ? 'card-hoverable' : ''}`}
      onClick={onClick}
      style={{
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-500)', letterSpacing: '0.01em' }}>
          {title}
        </span>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: scheme.bg,
            color: scheme.color,
            border: `1px solid ${scheme.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {Icon && <Icon size={20} strokeWidth={2.2} />}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
        <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)', lineHeight: 1 }}>
          {value}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
        <span style={{ color: 'var(--slate-500)' }}>{subtitle}</span>
        {trend && (
          <span
            style={{
              fontWeight: 600,
              color: trend.isPositive ? 'var(--success-700)' : 'var(--slate-600)',
              backgroundColor: trend.isPositive ? 'var(--success-50)' : 'var(--slate-100)',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem'
            }}
          >
            {trend.text}
          </span>
        )}
      </div>
    </div>
  );
};
