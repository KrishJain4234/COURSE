import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LearningProvider, useLearning } from './context/LearningContext';
import { TopNavbar } from './components/layout/TopNavbar';
import { Sidebar } from './components/layout/Sidebar';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { MyLearning } from './pages/MyLearning';
import { CourseCatalog } from './pages/CourseCatalog';
import { CourseDetails } from './pages/CourseDetails';
import { Certificates } from './pages/Certificates';
import { Profile } from './pages/Profile';
import { CertificateModal } from './components/certificates/CertificateModal';
import { CertificatePreview } from './components/certificates/CertificatePreview';
import { VerifyDialog } from './components/certificates/VerifyDialog';

function MainPortal() {
  const { isAuthenticated } = useAuth();
  const {
    activeCertificateModal,
    setActiveCertificateModal,
    activeCertificatePreview,
    setActiveCertificatePreview,
    loadingStep
  } = useLearning();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState('ai-fundamentals');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [verifyDialogId, setVerifyDialogId] = useState(null);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setActiveTab('dashboard')} />;
  }

  const handleSelectCourse = (courseId) => {
    setSelectedCourseId(courseId);
    setActiveTab('course-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenVerifyDialog = (certId = '') => {
    setVerifyDialogId(certId || 'SV-2026-0001');
  };

  return (
    <div className="app-container">
      {/* Collapsible Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Layout */}
      <div className="main-content-wrapper">
        <TopNavbar
          searchQuery={globalSearch}
          setSearchQuery={(q) => {
            setGlobalSearch(q);
            if (activeTab !== 'catalog' && activeTab !== 'my-learning') {
              setActiveTab('catalog');
            }
          }}
          onNavigate={handleNavigate}
          toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          sidebarCollapsed={sidebarCollapsed}
        />

        <main style={{ flex: 1, minHeight: 'calc(100vh - var(--topbar-height))' }}>
          {activeTab === 'dashboard' && (
            <Dashboard
              onNavigate={handleNavigate}
              onSelectCourse={handleSelectCourse}
            />
          )}

          {activeTab === 'my-learning' && (
            <MyLearning
              onSelectCourse={handleSelectCourse}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'catalog' && (
            <CourseCatalog
              onSelectCourse={handleSelectCourse}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'course-details' && (
            <CourseDetails
              courseId={selectedCourseId}
              onBack={() => handleNavigate('catalog')}
              onOpenCertificateModal={(cert) => setActiveCertificateModal(cert)}
              onOpenCertificatePreview={(cert) => setActiveCertificatePreview(cert)}
            />
          )}

          {activeTab === 'certificates' && (
            <Certificates
              onOpenCertificateModal={(cert) => setActiveCertificateModal(cert)}
              onOpenCertificatePreview={(cert) => setActiveCertificatePreview(cert)}
              onOpenVerifyDialog={handleOpenVerifyDialog}
            />
          )}

          {activeTab === 'profile' && (
            <Profile
              onOpenCertificatePreview={(cert) => setActiveCertificatePreview(cert)}
              onNavigate={handleNavigate}
            />
          )}
        </main>
      </div>

      {/* "Certificate Ready / Loading" Modal */}
      {(activeCertificateModal || loadingStep) && (
        <CertificateModal
          certificate={activeCertificateModal}
          loadingStep={loadingStep}
          onClose={() => setActiveCertificateModal(null)}
          onOpenFullPreview={(cert) => setActiveCertificatePreview(cert)}
        />
      )}

      {/* High-Resolution Printable / Official Certificate Preview */}
      {activeCertificatePreview && (
        <CertificatePreview
          certificate={activeCertificatePreview}
          onClose={() => setActiveCertificatePreview(null)}
          onVerify={(id) => handleOpenVerifyDialog(id)}
        />
      )}

      {/* SecureVault Ledger Verification Dialog */}
      {verifyDialogId !== null && (
        <VerifyDialog
          initialCertId={verifyDialogId}
          onClose={() => setVerifyDialogId(null)}
          onViewCert={(cert) => setActiveCertificatePreview(cert)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LearningProvider>
        <MainPortal />
      </LearningProvider>
    </AuthProvider>
  );
}
