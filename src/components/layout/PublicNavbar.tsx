import React from 'react';
import { useProfile } from '../../hooks/useProfile';
import { GraduationCap, LayoutDashboard, LogIn, Award } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export const PublicNavbar: React.FC = () => {
  const { profile } = useProfile();
  const { isMockMode } = useApp();

  return (
    <nav className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800 shadow-sm" id="public-main-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 bg-[#0A1D37] dark:bg-[#D4AF37] rounded-xl text-[#D4AF37] dark:text-[#0A1D37] flex items-center justify-center font-extrabold shadow-md">
              UET
            </div>
            <div>
              <span className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white block leading-none">UET</span>
              <span className="text-[9px] font-bold tracking-wider text-[#D4AF37] uppercase block mt-0.5">Student Hub</span>
            </div>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#hero" className="hover:text-[#0A1D37] dark:hover:text-amber-400 transition-colors">Home</a>
            <a href="#stats" className="hover:text-[#0A1D37] dark:hover:text-amber-400 transition-colors">Statistics</a>
            <a href="#departments" className="hover:text-[#0A1D37] dark:hover:text-amber-400 transition-colors">Departments</a>
            <a href="#notices" className="hover:text-[#0A1D37] dark:hover:text-amber-400 transition-colors">Notices</a>
            <a href="#developer" className="hover:text-[#0A1D37] dark:hover:text-amber-400 transition-colors">Developer</a>
            <a href="#contact" className="hover:text-[#0A1D37] dark:hover:text-amber-400 transition-colors">Contact</a>
          </div>

          {/* Portal CTAs */}
          <div className="flex items-center space-x-3">
            {profile ? (
              <a
                href={
                  profile.role === 'student'
                    ? '/student/dashboard'
                    : profile.role === 'teacher'
                    ? '/teacher/dashboard'
                    : '/admin/dashboard'
                }
                className="flex items-center space-x-1.5 px-4 py-2 bg-[#0A1D37] hover:bg-[#0A1D37]/90 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4 text-[#D4AF37]" />
                <span>Go to console ({profile.role})</span>
              </a>
            ) : (
              <div className="flex items-center space-x-2">
                <a
                  href="/sign-in"
                  className="flex items-center space-x-1 px-3 py-1.5 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:text-white text-xs font-bold rounded-lg transition-all"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-500" />
                  <span>Sign In</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
