import React from 'react';

export const Badge = ({ children, variant = 'slate', size = 'md', icon: Icon, className = '' }) => {
  const variantClasses = {
    primary: 'badge-primary',
    success: 'badge-success',
    warning: 'badge-warning',
    slate: 'badge-slate',
    blue: 'bg-blue-50 text-blue-700 border border-blue-200',
    purple: 'bg-indigo-50 text-indigo-700 border border-indigo-200'
  };

  const currentVariant = variantClasses[variant] || variantClasses.slate;
  const paddingStyle = size === 'sm' ? { padding: '2px 8px', fontSize: '0.7rem' } : {};

  return (
    <span className={`badge ${currentVariant} ${className}`} style={paddingStyle}>
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
};
