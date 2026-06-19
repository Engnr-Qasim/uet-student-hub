import React, { useState, useEffect, Suspense } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LoadingState } from './components/shared/LoadingState';
import { ClerkProvider } from '@clerk/clerk-react';
import { CLERK_PUBLISHABLE_KEY, IS_MOCK_AUTH } from './lib/clerk-config';
import { ClerkSync } from './components/shared/ClerkSync';
import { RoleGuard } from './components/shared/RoleGuard';
import { DevNotificationToast } from './components/shared/DevNotificationToast';

// Standard static page imports for critical landing paths
import LandingIndex from './pages/Index';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import AboutDeveloper from './pages/AboutDeveloper';

// Lazy loader wrapper for robust bundle efficiency
const LazyPage = ({ importer }: { importer: () => Promise<{ default: React.ComponentType<any> }> }) => {
  const Component = React.lazy(importer);
  return (
    <Suspense fallback={<LoadingState message="Restoring console workspace..." />}>
      <Component />
    </Suspense>
  );
};

// Route registries map pathways cleanly to file-importers
const STUDENT_ROUTES: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = {
  '/student/dashboard': () => import('./pages/student/Dashboard'),
  '/student/profile': () => import('./pages/student/Profile'),
  '/student/id-card': () => import('./pages/student/IDCard'),
  '/student/assignments': () => import('./pages/student/Assignments'),
  '/student/notes': () => import('./pages/student/Notes'),
  '/student/lab-reports': () => import('./pages/student/LabReports'),
  '/student/projects': () => import('./pages/student/Projects'),
  '/student/attendance': () => import('./pages/student/Attendance'),
  '/student/results': () => import('./pages/student/Results'),
  '/student/cgpa': () => import('./pages/student/CGPACalculator'),
  '/student/timetable': () => import('./pages/student/Timetable'),
  '/student/papers': () => import('./pages/student/PreviousPapers'),
  '/student/registration': () => import('./pages/student/CourseRegistration'),
  '/student/roadmap': () => import('./pages/student/SemesterRoadmap'),
  '/student/forum': () => import('./pages/student/Forum'),
  '/student/library': () => import('./pages/student/Library'),
  '/student/hostel': () => import('./pages/student/Hostel'),
  '/student/events': () => import('./pages/student/Events'),
  '/student/fees': () => import('./pages/student/Fees'),
  '/student/internships': () => import('./pages/student/Internships'),
  '/student/placement': () => import('./pages/student/Placement'),
  '/student/feedback': () => import('./pages/student/Feedback'),
};

const TEACHER_ROUTES: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = {
  '/teacher/dashboard': () => import('./pages/teacher/Dashboard'),
  '/teacher/attendance': () => import('./pages/teacher/Attendance'),
  '/teacher/results': () => import('./pages/teacher/Results'),
  '/teacher/notices': () => import('./pages/teacher/Notices'),
  '/teacher/assignments': () => import('./pages/teacher/Assignments'),
  '/teacher/materials': () => import('./pages/teacher/Materials'),
};

function AppContent() {
  const { currentUser, isLoading } = useApp();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Keep navigation responsive to standard browser backward/forward history
    window.addEventListener('popstate', handleLocationChange);

    // Intercept relative portal href clicks to achieve lightning fast SPA navigation
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href) {
        const url = new URL(anchor.href);
        if (url.origin === window.location.origin) {
          const path = url.pathname;
          
          // Skip file downloads or specific browser targets
          if (path && !path.includes('.')) {
            e.preventDefault();
            window.history.pushState(null, '', anchor.href);
            setCurrentPath(path);
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  if (isLoading) {
    return <LoadingState message="Booting UET Student Hub security directories..." fullScreen />;
  }

  // Auth pages route matchers
  if (currentPath === '/sign-in') {
    if (currentUser) {
      setTimeout(() => {
        window.history.replaceState(null, '', `/${currentUser.role}/dashboard`);
        window.dispatchEvent(new Event('popstate'));
      }, 0);
      return <LoadingState message="Redirecting to your UET dashboard..." fullScreen />;
    }
    return <SignIn />;
  }
  if (currentPath === '/sign-up') {
    if (currentUser) {
      setTimeout(() => {
        window.history.replaceState(null, '', `/${currentUser.role}/dashboard`);
        window.dispatchEvent(new Event('popstate'));
      }, 0);
      return <LoadingState message="Redirecting to your UET dashboard..." fullScreen />;
    }
    return <SignUp />;
  }
  if (currentPath === '/') {
    if (currentUser) {
      setTimeout(() => {
        window.history.replaceState(null, '', `/${currentUser.role}/dashboard`);
        window.dispatchEvent(new Event('popstate'));
      }, 0);
      return <LoadingState message="Redirecting to your UET dashboard..." fullScreen />;
    }
    return <LandingIndex />;
  }
  if (currentPath === '/about-developer') {
    return <AboutDeveloper />;
  }

  // Student routes matched inside Dashboard Shell frame
  if (currentPath.startsWith('/student/')) {
    const importer = STUDENT_ROUTES[currentPath] || STUDENT_ROUTES['/student/dashboard'];
    return (
      <RoleGuard allowedRoles={['student']}>
        <DashboardLayout>
          <LazyPage importer={importer} />
        </DashboardLayout>
      </RoleGuard>
    );
  }

  // Teacher routes matched inside Dashboard Shell frame
  if (currentPath.startsWith('/teacher/')) {
    const importer = TEACHER_ROUTES[currentPath] || TEACHER_ROUTES['/teacher/dashboard'];
    return (
      <RoleGuard allowedRoles={['teacher']}>
        <DashboardLayout>
          <LazyPage importer={importer} />
        </DashboardLayout>
      </RoleGuard>
    );
  }

  // Admin routes fallback dynamically to the unified Administrator Terminal console
  if (currentPath.startsWith('/admin/')) {
    return (
      <RoleGuard allowedRoles={['admin']}>
        <DashboardLayout>
          <LazyPage importer={() => import('./pages/admin/AdminConsole')} />
        </DashboardLayout>
      </RoleGuard>
    );
  }

  // Default fallback (Landing Explorer Home)
  return <LandingIndex />;
}

export default function App() {
  const content = (
    <AppProvider>
      {!IS_MOCK_AUTH && <ClerkSync />}
      <ThemeProvider>
        <AppContent />
        <DevNotificationToast />
      </ThemeProvider>
    </AppProvider>
  );

  if (!IS_MOCK_AUTH && CLERK_PUBLISHABLE_KEY) {
    return (
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
        {content}
      </ClerkProvider>
    );
  }

  return content;
}
