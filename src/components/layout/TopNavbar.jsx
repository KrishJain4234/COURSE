import React, { useState } from 'react';
import { Search, Bell, ShieldCheck, ChevronDown, User, LogOut, BookOpen, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { NotificationDrawer } from '../common/NotificationDrawer';

export const TopNavbar = ({
  searchQuery,
  setSearchQuery,
  onNavigate,
  toggleSidebar,
  sidebarCollapsed
}) => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="top-navbar">
      {/* Left: Mobile hamburger & Search bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
        <button
          onClick={toggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--slate-700)',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
          title={sidebarCollapsed ? 'Open Menu' : 'Toggle Menu'}
        >
          <Menu size={22} />
        </button>

        <div className="search-input-wrapper">
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--slate-400)'
            }}
          />
          <input
            type="text"
            className="search-input"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Right: Institutional Badge, Notifications, User Pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', flexShrink: 0 }}>
        {/* Institutional Verification Status */}
        <div
          className="hide-on-mobile"
          style={{
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            backgroundColor: 'var(--primary-50)',
            border: '1px solid var(--primary-200)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--primary-800)'
          }}
        >
          <ShieldCheck size={14} color="var(--primary-700)" />
          <span>{user?.institution || 'BMS Institute of Technology'}</span>
        </div>

        {/* Notifications Icon Button */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            style={{
              position: 'relative',
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              border: '1px solid var(--slate-200)',
              backgroundColor: showNotifications ? 'var(--slate-100)' : '#ffffff',
              color: 'var(--slate-700)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            title="Notifications"
          >
            <Bell size={18} />
            <span
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '8px',
                height: '8px',
                backgroundColor: 'var(--primary-600)',
                borderRadius: '50%',
                border: '2px solid #ffffff'
              }}
            />
          </button>

          <NotificationDrawer
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
            onViewCertificates={() => onNavigate('certificates')}
          />
        </div>

        {/* User Profile Pill & Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '4px 10px 4px 4px',
              backgroundColor: '#ffffff',
              border: '1px solid var(--slate-200)',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              transition: 'border-color 0.15s ease'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-700)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.8125rem'
              }}
            >
              KJ
            </div>
            <div className="hide-on-small" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--slate-900)', lineHeight: 1.1 }}>
                {user?.name || 'Krish Jain'}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--slate-500)' }}>
                {user?.learnerId || 'STU-2026-001'}
              </span>
            </div>
            <ChevronDown size={14} color="var(--slate-400)" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div
              style={{
                position: 'absolute',
                top: '46px',
                right: 0,
                width: '240px',
                backgroundColor: '#ffffff',
                border: '1px solid var(--slate-200)',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-modal)',
                zIndex: 60,
                overflow: 'hidden'
              }}
            >
              <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--slate-100)', backgroundColor: 'var(--slate-50)' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                  {user?.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                  {user?.email}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--primary-700)', fontWeight: 600, marginTop: '4px' }}>
                  Role: {user?.role || 'Student'} • BMSIT
                </div>
              </div>

              <div style={{ padding: '6px' }}>
                <button
                  onClick={() => {
                    onNavigate('profile');
                    setShowProfileMenu(false);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    fontSize: '0.8125rem',
                    color: 'var(--slate-700)',
                    background: 'none',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--slate-100)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <User size={16} />
                  Learner Profile
                </button>

                <button
                  onClick={() => {
                    onNavigate('my-learning');
                    setShowProfileMenu(false);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    fontSize: '0.8125rem',
                    color: 'var(--slate-700)',
                    background: 'none',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--slate-100)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <BookOpen size={16} />
                  My Active Courses
                </button>

                <div style={{ height: '1px', backgroundColor: 'var(--slate-200)', margin: '4px 0' }} />

                <button
                  onClick={() => {
                    logout();
                    setShowProfileMenu(false);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    fontSize: '0.8125rem',
                    color: '#dc2626',
                    background: 'none',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fef2f2')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <LogOut size={16} />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
