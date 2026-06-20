import React, { useState } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { useProfile } from '../../hooks/useProfile';
import { LoadingState } from '../shared/LoadingState';
import { Bell, Search, GraduationCap, Menu } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { profile, loading } = useProfile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loading) {
    return <LoadingState message="Connecting to secure university directory..." fullScreen />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100" id="university-dashboard-view">
      {/* Sidebar Navigation */}
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Mobile Backdrop when Sidebar is Open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Primary Workstation */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header Panel */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 backdrop-blur px-4 md:px-6 flex items-center justify-between z-10 shrink-0">
          {/* Menu button & Context Indicator */}
          <div className="flex items-center space-x-3">
            {/* Hamburger button for small screens */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-300 rounded-lg transition-colors cursor-pointer"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-[#0A1D37] dark:text-[#D4AF37]" />
              <span className="text-xs font-bold tracking-tight text-[#0A1D37]/40 dark:text-slate-400 uppercase font-display">
                UET DCSE Academic Console
              </span>
            </div>
          </div>

          {/* Action Hub */}
          <div className="flex items-center space-x-4">
            {/* Search Placeholder */}
            <div className="hidden sm:flex items-center space-x-2 bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 px-3 py-1.5 rounded-lg text-slate-400">
              <Search className="w-3.5 h-3.5" />
              <input 
                type="text" 
                placeholder="Search courses, logs..." 
                disabled
                className="bg-transparent text-[10px] outline-none border-none font-medium w-36 select-none"
              />
            </div>

            {/* Notification Bell */}
            <button className="p-1.5 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 text-slate-500 dark:text-slate-400 rounded-lg relative cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#D4AF37] rounded-full animate-ping" />
            </button>

            {/* Profile Info Summary */}
            {profile && (
              <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
                <div className="text-right">
                  <span className="block text-xs font-bold text-[#0A1D37] dark:text-white leading-none">{profile.name}</span>
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-550 leading-none">{profile.department_name || 'DCSE'}</span>
                </div>
                <img 
                  src={profile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'} 
                  alt={profile.name} 
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#D4AF37]"
                />
              </div>
            )}
          </div>
        </header>

        {/* Content Viewport with dedicated scroll bounds */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#F8FAFC] dark:bg-slate-950">
          <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
