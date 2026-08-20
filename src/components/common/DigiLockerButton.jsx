import React, { useState } from 'react';
import { ExternalLink, Loader2, FolderPlus, ShieldCheck } from 'lucide-react';
import { secureVaultApi } from '../../services/secureVaultApi';

/**
 * DigiLocker Import Button Component
 * Redirects user to DigiLocker Demo with all SecureVault cryptographic metadata.
 */
export const DigiLockerButton = ({
  certificate,
  size = 'md',
  variant = 'accent',
  disabled = false,
  fullWidth = false,
  style = {},
  className = ''
}) => {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (disabled || isRedirecting || !certificate) return;

    setIsRedirecting(true);
    secureVaultApi.redirectToDigiLocker(certificate, () => {
      setIsRedirecting(true);
    });
  };

  // Base sizing styles
  const sizeStyles = {
    sm: { padding: '6px 12px', fontSize: '0.8125rem', height: '34px', gap: '6px' },
    md: { padding: '9px 18px', fontSize: '0.875rem', height: '42px', gap: '8px' },
    lg: { padding: '12px 22px', fontSize: '0.9375rem', height: '48px', gap: '10px' }
  }[size] || { padding: '9px 18px', fontSize: '0.875rem', height: '42px', gap: '8px' };

  // Variant palette
  let variantStyle = {
    backgroundColor: '#0f766e',
    color: '#ffffff',
    borderColor: '#0f766e'
  };

  if (variant === 'primary') {
    variantStyle = {
      backgroundColor: 'var(--primary-700)',
      color: '#ffffff',
      borderColor: 'var(--primary-700)'
    };
  } else if (variant === 'secondary') {
    variantStyle = {
      backgroundColor: '#ffffff',
      color: '#0f766e',
      border: '1px solid #14b8a6'
    };
  } else if (variant === 'light') {
    variantStyle = {
      backgroundColor: '#f0fdfa',
      color: '#0f766e',
      border: '1px solid #99f6e4'
    };
  }

  const disabledStyle = disabled
    ? {
        opacity: 0.55,
        cursor: 'not-allowed',
        backgroundColor: 'var(--slate-200)',
        color: 'var(--slate-500)',
        borderColor: 'var(--slate-300)'
      }
    : {};

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isRedirecting}
      className={`btn ${className}`}
      style={{
        ...variantStyle,
        ...sizeStyles,
        ...disabledStyle,
        width: fullWidth ? '100%' : 'auto',
        fontWeight: 700,
        position: 'relative',
        boxShadow: disabled ? 'none' : '0 1px 3px rgba(15, 118, 110, 0.2)',
        transition: 'all 0.2s ease',
        ...style
      }}
      title={disabled ? 'Generate certificate first to add to DigiLocker' : 'Add credential to your DigiLocker account'}
    >
      {isRedirecting ? (
        <>
          <Loader2 size={size === 'sm' ? 14 : 17} className="animate-spin" />
          <span>Redirecting to DigiLocker...</span>
        </>
      ) : (
        <>
          {/* DigiLocker Icon Emblem */}
          <div
            style={{
              width: size === 'sm' ? '18px' : '22px',
              height: size === 'sm' ? '18px' : '22px',
              borderRadius: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <FolderPlus size={size === 'sm' ? 12 : 14} />
          </div>
          <span>Add To DigiLocker</span>
          <ExternalLink size={size === 'sm' ? 12 : 14} style={{ opacity: 0.8, marginLeft: '2px' }} />
        </>
      )}
    </button>
  );
};
