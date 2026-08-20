import React from 'react';
import { Bell, CheckCircle2, Award, Clock, ShieldCheck, X } from 'lucide-react';

export const NotificationDrawer = ({ isOpen, onClose, onViewCertificates }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: 'Certificate Issued & Anchored',
      description: 'Blockchain Essentials certificate EDU-2026-8492 is now verified on SecureVault.',
      time: '10 mins ago',
      icon: Award,
      color: 'text-blue-600 bg-blue-50',
      isUnread: true,
      action: onViewCertificates
    },
    {
      id: 2,
      title: 'Course Milestone Reached',
      description: 'You completed Module 3 of Artificial Intelligence Fundamentals.',
      time: '2 hours ago',
      icon: CheckCircle2,
      color: 'text-green-600 bg-green-50',
      isUnread: true
    },
    {
      id: 3,
      title: '7-Day Study Streak Maintained',
      description: 'You earned the Weekly Consistency Badge for BMSIT Academic Session.',
      time: 'Yesterday',
      icon: Clock,
      color: 'text-amber-600 bg-amber-50',
      isUnread: false
    },
    {
      id: 4,
      title: 'SecureVault Identity Verification',
      description: 'Learner ID STU-2026-001 passed university authentication protocol.',
      time: '2 days ago',
      icon: ShieldCheck,
      color: 'text-indigo-600 bg-indigo-50',
      isUnread: false
    }
  ];

  return (
    <div
      style={{
        position: 'absolute',
        top: '60px',
        right: '20px',
        width: '380px',
        backgroundColor: '#ffffff',
        border: '1px solid var(--slate-200)',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-modal)',
        zIndex: 60,
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          padding: '14px 18px',
          borderBottom: '1px solid var(--slate-200)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--slate-50)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={16} color="var(--primary-700)" />
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--slate-900)' }}>
            System Notifications
          </span>
          <span
            style={{
              backgroundColor: 'var(--primary-700)',
              color: '#ffffff',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: '9999px'
            }}
          >
            2 New
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--slate-400)',
            display: 'flex',
            padding: '4px'
          }}
        >
          <X size={16} />
        </button>
      </div>

      <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
        {notifications.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              onClick={() => {
                if (n.action) n.action();
                onClose();
              }}
              style={{
                padding: '14px 18px',
                borderBottom: '1px solid var(--slate-100)',
                backgroundColor: n.isUnread ? '#f8faff' : '#ffffff',
                cursor: n.action ? 'pointer' : 'default',
                display: 'flex',
                gap: '12px',
                transition: 'background-color 0.15s ease'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: n.isUnread ? 'var(--primary-50)' : 'var(--slate-100)',
                  color: n.isUnread ? 'var(--primary-700)' : 'var(--slate-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Icon size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-900)' }}>
                    {n.title}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--slate-400)' }}>{n.time}</span>
                </div>
                <p style={{ fontSize: '0.78125rem', color: 'var(--slate-600)', lineHeight: 1.4 }}>
                  {n.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          padding: '10px 16px',
          backgroundColor: 'var(--slate-50)',
          borderTop: '1px solid var(--slate-200)',
          textAlign: 'center'
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--primary-700)',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
};
