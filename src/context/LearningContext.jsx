import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { COURSES_DATA } from '../data/coursesData';
import { secureVaultApi } from '../services/secureVaultApi';
import { useAuth } from './AuthContext';
import confetti from 'canvas-confetti';

const LearningContext = createContext(null);

const STORAGE_KEY_PROGRESS = 'eduverse_courses_progress';

// Helper to build initial course state
const buildInitialCoursesState = () => {
  return COURSES_DATA.map((course) => {
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
  const { user } = useAuth();

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

  const [certificates, setCertificates] = useState(() => {
    return secureVaultApi.getAllCertificates();
  });

  const [activeCertificateModal, setActiveCertificateModal] = useState(null);
  const [activeCertificatePreview, setActiveCertificatePreview] = useState(null);
  const [loadingStep, setLoadingStep] = useState(null);

  // Sync certificates from storage on mount
  useEffect(() => {
    const allCerts = secureVaultApi.getAllCertificates();
    setCertificates(allCerts);
  }, []);

  // Save courses progress whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(courses));
    } catch (e) {
      console.error('Failed to save courses progress:', e);
    }
  }, [courses]);

  // Handle dynamic certificate generation workflow with live loading stages
  const generateAndDownloadCertificate = async (course) => {
    const courseTitle = course.title || course.name;
    const studentName = user?.name || 'Krish Jain';
    const issueDate = new Date().toISOString().split('T')[0];

    try {
      // Show loading step in modal
      setLoadingStep('Generating Certificate...');
      setActiveCertificateModal({ courseTitle, studentName });

      const res = await secureVaultApi.generateCertificate({
        courseId: course.id,
        courseTitle: courseTitle,
        learnerName: studentName,
        organization: 'SkillForge Academy',
        issueDate: issueDate,
        description: 'Successfully completed the course.',
        onStepChange: (step) => setLoadingStep(step)
      });

      // Done loading
      setLoadingStep(null);

      if (res.success && res.certificate) {
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (err) {
          // ignore
        }

        // Refresh certificates list
        const allCerts = secureVaultApi.getAllCertificates();
        setCertificates(allCerts);

        // Open the "Certificate Successfully Issued" modal
        setActiveCertificateModal(res.certificate);
      }
    } catch (e) {
      console.error('Failed to generate certificate:', e);
      setLoadingStep(null);
    }
  };

  // Toggle lesson completed status
  const toggleLesson = async (courseId, moduleId, lessonId) => {
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
  };

  // Explicit mark course completed flow
  const markCourseCompleted = async (courseId) => {
    let targetCourse = null;

    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id !== courseId) return course;

        const allLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
        targetCourse = {
          ...course,
          completedLessons: allLessonIds,
          progress: 100,
          isCompleted: true,
          status: 'Completed',
          lastAccessed: 'Just now'
        };

        return targetCourse;
      })
    );
  };

  // Reset course progress
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

  // Computed summary metrics
  const learningSummary = useMemo(() => {
    const enrolled = courses.length;
    const completed = courses.filter((c) => c.isCompleted).length;
    const certsCount = certificates.length;

    let totalCompletedHours = 0;
    courses.forEach((c) => {
      totalCompletedHours += Math.round((c.progress / 100) * c.durationHours);
    });

    return {
      enrolledCourses: enrolled,
      completedCourses: completed,
      certificatesEarned: certsCount,
      learningHours: totalCompletedHours || 42,
      currentStreak: 7
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
        generateAndDownloadCertificate,
        resetCourseProgress,
        activeCertificateModal,
        setActiveCertificateModal,
        activeCertificatePreview,
        setActiveCertificatePreview,
        loadingStep,
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
