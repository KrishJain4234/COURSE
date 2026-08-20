import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  Award,
  User,
  LogOut,
  GraduationCap,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';

export const Sidebar = ({
  activeTab,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile
}) => {
  const { logout } = useAuth();
  const { learningSummary } = useLearning();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'my-learning',
      label: 'My Learning',
      icon: BookOpen,
      badge: learningSummary.enrolledCourses ? `${learningSummary.enrolledCourses}` : null
    },
    { id: 'catalog', label: 'Course Catalog', icon: Compass },
    {
      id: 'certificates',
      label: 'Certificates',
      icon: Award,
      badge: learningSummary.certificatesEarned ? `${learningSummary.certificatesEarned}` : null
    },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const handleItemClick = (tabId) => {
    onNavigate(tabId);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleLogout = () => {
    logout();
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'var(--primary-700)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <GraduationCap size={22} />
          </div>

          {(!isCollapsed || mobileOpen) && (
            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--slate-900)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                EduVerse
              </span>
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--primary-700)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Enterprise Portal
              </span>
            </div>
          )}
        </div>

        {/* Mobile Close X button */}
        <button
          onClick={onCloseMobile}
          className="show-only-mobile"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--slate-500)',
            cursor: 'pointer',
            padding: '4px'
          }}
          title="Close Navigation"
        >
          <X size={22} />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
              style={{
                width: '100%',
                background: isActive ? 'var(--primary-50)' : 'none',
                border: 'none',
                textAlign: 'left'
              }}
              title={isCollapsed && !mobileOpen ? item.label : undefined}
            >
              <Icon size={19} color={isActive ? 'var(--primary-700)' : 'var(--slate-500)'} />
              
              {(!isCollapsed || mobileOpen) && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      style={{
                        backgroundColor: isActive ? 'var(--primary-700)' : 'var(--slate-200)',
                        color: isActive ? '#ffffff' : 'var(--slate-700)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '2px 7px',
                        borderRadius: '9999px'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer / SecureVault Status & Collapse Button */}
      <div style={{ padding: isCollapsed ? '16px 8px' : '16px', borderTop: '1px solid var(--slate-200)' }}>
        {!isCollapsed && (
          <div
            style={{
              padding: '12px',
              backgroundColor: 'var(--slate-100)',
              borderRadius: '8px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <ShieldCheck size={18} color="var(--primary-700)" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-800)' }}>
                SecureVault 4.2
              </span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--slate-500)' }}>
                Identity & Cert Ledger
              </span>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="nav-item"
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            color: '#dc2626',
            marginBottom: '8px'
          }}
          title={isCollapsed && !mobileOpen ? 'Log Out' : undefined}
        >
          <LogOut size={19} color="#dc2626" />
          {(!isCollapsed || mobileOpen) && <span>Log Out</span>}
        </button>

        <button
          onClick={onToggleCollapse}
          className="hide-on-mobile"
          style={{
            width: '100%',
            padding: '8px',
            background: 'var(--slate-100)',
            border: 'none',
            borderRadius: '6px',
            color: 'var(--slate-600)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: 600,
            gap: '6px'
          }}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /> Collapse Menu</>}
        </button>
      </div>
    </aside>
  );
};
