import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { COURSES_DATA } from '../data/coursesData';
import { secureVaultApi } from '../services/secureVaultApi';
import confetti from 'canvas-confetti';

const LearningContext = createContext(null);

const STORAGE_KEY_PROGRESS = 'eduverse_courses_progress';

// Helper to build initial course state
const buildInitialCoursesState = () => {
  return COURSES_DATA.map((course) => {
    // Determine default completed lessons based on defaultProgress
    const completedLessonIds = [];
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const targetCompletedCount = Math.round((course.defaultProgress / 100) * totalLessons);

    let count = 0;
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        if (count < targetCompletedCount) {
          completedLessonIds.push(lesson.id);
          count++;
        }
      }
    }

    const isCompleted = course.defaultProgress === 100;

    return {
      ...course,
      progress: course.defaultProgress,
      isCompleted: isCompleted,
      status: isCompleted ? 'Completed' : (course.defaultProgress > 0 ? 'In Progress' : 'Not Started'),
      completedLessons: completedLessonIds,
      lastAccessed: isCompleted ? 'Yesterday' : (course.defaultProgress > 0 ? '2 hours ago' : null)
    };
  });
};

export const LearningProvider = ({ children }) => {
  const [courses, setCourses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load courses progress:', e);
    }
    return buildInitialCoursesState();
  });

  const [certificates, setCertificates] = useState([]);
  const [activeCertificateModal, setActiveCertificateModal] = useState(null); // cert for "Certificate Ready" modal
  const [activeCertificatePreview, setActiveCertificatePreview] = useState(null); // cert for full high-res preview

  // Seed default certificate for Blockchain Essentials on mount
  useEffect(() => {
    const seedBlockchainCert = async () => {
      // Ensure default certificate is registered in SecureVault
      const blockchainCourse = COURSES_DATA.find((c) => c.id === 'blockchain-essentials');
      if (blockchainCourse) {
        await secureVaultApi.generateCertificate({
          courseId: blockchainCourse.id,
          courseTitle: blockchainCourse.name,
          learnerId: 'STU-2026-001',
          learnerName: 'Krish Jain',
          institution: 'BMS Institute of Technology',
          grade: 'Distinction (98.2%)',
          creditHours: '20 CPE Credits'
        });
      }

      // Load all certificates from SecureVault
      const allCerts = secureVaultApi.getAllCertificates();
      setCertificates(allCerts);
    };

    seedBlockchainCert();
  }, []);

  // Save courses progress whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(courses));
    } catch (e) {
      console.error('Failed to save courses progress:', e);
    }
  }, [courses]);

  // Toggle lesson completed status
  const toggleLesson = async (courseId, moduleId, lessonId) => {
    let newlyCompleted = false;
    let targetCourse = null;

    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id !== courseId) return course;

        const exists = course.completedLessons.includes(lessonId);
        const updatedLessons = exists
          ? course.completedLessons.filter((id) => id !== lessonId)
          : [...course.completedLessons, lessonId];

        const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
        const progressPercentage = Math.min(100, Math.round((updatedLessons.length / totalLessons) * 100));
        const isNowCompleted = progressPercentage === 100;

        if (isNowCompleted && !course.isCompleted) {
          newlyCompleted = true;
          targetCourse = course;
        }

        return {
          ...course,
          completedLessons: updatedLessons,
          progress: progressPercentage,
          isCompleted: isNowCompleted,
          status: isNowCompleted ? 'Completed' : (progressPercentage > 0 ? 'In Progress' : 'Not Started'),
          lastAccessed: 'Just now'
        };
      })
    );

    // If completed 100%, generate certificate
    if (newlyCompleted && targetCourse) {
      await handleCourseCompletion(targetCourse);
    }
  };

  // Explicit mark course completed flow
  const markCourseCompleted = async (courseId) => {
    let targetCourse = null;

    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id !== courseId) return course;

        const allLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
        targetCourse = course;

        return {
          ...course,
          completedLessons: allLessonIds,
          progress: 100,
          isCompleted: true,
          status: 'Completed',
          lastAccessed: 'Just now'
        };
      })
    );

    if (targetCourse) {
      await handleCourseCompletion(targetCourse);
    }
  };

  // Reset course progress (helpful for live evaluation/demos)
  const resetCourseProgress = (courseId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id !== courseId) return course;
        return {
          ...course,
          completedLessons: [],
          progress: 0,
          isCompleted: false,
          status: 'Not Started',
          lastAccessed: null
        };
      })
    );
  };

  // Helper when course hits 100%
  const handleCourseCompletion = async (course) => {
    try {
      // Trigger festive enterprise confetti
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore if not supported
      }

      const res = await secureVaultApi.generateCertificate({
        courseId: course.id,
        courseTitle: course.name,
        learnerId: 'STU-2026-001',
        learnerName: 'Krish Jain',
        institution: 'BMS Institute of Technology',
        grade: 'Excellence (95.0%)',
        creditHours: course.duration
      });

      if (res.success && res.certificate) {
        // Refresh certificates
        const allCerts = secureVaultApi.getAllCertificates();
        setCertificates(allCerts);
        // Prompt the Certificate Ready modal
        setActiveCertificateModal(res.certificate);
      }
    } catch (e) {
      console.error('Failed to issue certificate:', e);
    }
  };

  // Computed summary metrics
  const learningSummary = useMemo(() => {
    const enrolled = courses.length;
    const completed = courses.filter((c) => c.isCompleted).length;
    const certsCount = certificates.length;

    // Calculate approximate learning hours completed
    let totalCompletedHours = 0;
    courses.forEach((c) => {
      totalCompletedHours += Math.round((c.progress / 100) * c.durationHours);
    });

    return {
      enrolledCourses: enrolled,
      completedCourses: completed,
      certificatesEarned: certsCount,
      learningHours: totalCompletedHours || 42,
      currentStreak: 7 // 7-day streak
    };
  }, [courses, certificates]);

  return (
    <LearningContext.Provider
      value={{
        courses,
        certificates,
        learningSummary,
        toggleLesson,
        markCourseCompleted,
        resetCourseProgress,
        activeCertificateModal,
        setActiveCertificateModal,
        activeCertificatePreview,
        setActiveCertificatePreview,
        refreshCertificates: () => setCertificates(secureVaultApi.getAllCertificates())
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
