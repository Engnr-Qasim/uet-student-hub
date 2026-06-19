import React from 'react';
import { useProfile } from '../../hooks/useProfile';
import { LoadingState } from './LoadingState';
import { ShieldAlert, RefreshCw } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { UserRole } from '../../types';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const { profile, loading } = useProfile();
  const { switchMockRole, isMockMode } = useApp();

  if (loading) {
    return <LoadingState message="Verifying security clearances..." />;
  }

  if (!profile) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Authentication Required</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          You must be signed in to access this university console module.
        </p>
        {isMockMode ? (
          <div className="pt-2 space-y-2">
            <p className="text-xs text-slate-400">As you are running in sandbox mode, pick a profile to auto-login:</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => switchMockRole('student')}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Mock Student
              </button>
              <button
                onClick={() => switchMockRole('teacher')}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Mock Teacher
              </button>
              <button
                onClick={() => switchMockRole('admin')}
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Mock Admin
              </button>
            </div>
          </div>
        ) : (
          <a
            href="/sign-in"
            className="inline-block px-5 py-2 bg-[rgb(var(--university-primary))] hover:bg-opacity-90 text-white rounded-xl text-sm font-semibold shadow-sm transition-all"
          >
            Signed In via Clerk
          </a>
        )}
      </div>
    );
  }

  // Verify Role
  if (!allowedRoles.includes(profile.role)) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-950/40 rounded-2xl shadow-sm text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Role Access Restricted</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Your current profile role (<span className="font-semibold text-slate-700 dark:text-slate-350">{profile.role}</span>) does not have authorization to view this module. Needs level: {allowedRoles.join(' or ')}.
        </p>
        
        {isMockMode && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
              Evaluation Action: Quick-swap profile to view this:
            </p>
            <div className="flex gap-2 justify-center">
              {allowedRoles.includes('student') && (
                <button
                  onClick={() => switchMockRole('student')}
                  className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold cursor-pointer"
                >
                  Swap to Student (Ahmad)
                </button>
              )}
              {allowedRoles.includes('teacher') && (
                <button
                  onClick={() => switchMockRole('teacher')}
                  className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold cursor-pointer"
                >
                  Swap to Teacher (Dr. Saad)
                </button>
              )}
              {allowedRoles.includes('admin') && (
                <button
                  onClick={() => switchMockRole('admin')}
                  className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer"
                >
                  Swap to Admin (Dr. Qasim)
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return <>{children}</>;
};
