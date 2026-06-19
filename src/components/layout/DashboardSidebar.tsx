import React from 'react';
import { useProfile } from '../../hooks/useProfile';
import { useTheme } from '../../contexts/ThemeContext';
import { useApp } from '../../contexts/AppContext';
import { 
  GraduationCap, 
  Home, 
  User, 
  BookOpen, 
  FileSpreadsheet, 
  Calendar, 
  Calculator, 
  Clock, 
  QrCode, 
  Users, 
  Lock, 
  Mail, 
  LogOut, 
  ClipboardList, 
  Award,
  Bell,
  Settings,
  Grid,
  FileCheck2,
  Bookmark,
  FolderLock,
  Compass,
  MessagesSquare,
  Library,
  Building,
  Briefcase,
  Megaphone,
  UserCheck,
  Palette
} from 'lucide-react';
import { motion } from 'motion/react';
import { ThemeSwitcher } from '../shared/ThemeSwitcher';

export const DashboardSidebar: React.FC = () => {
  const { profile } = useProfile();
  const { theme } = useTheme();
  const { switchMockRole, isMockMode, logout } = useApp();

  if (!profile) return null;

  const currentPath = window.location.pathname;

  // Let's configure custom nav groups depending on user role
  const getStudentLinks = () => [
    {
      group: 'Academic Hub',
      items: [
        { label: 'Overview Dashboard', path: '/student/dashboard', icon: <Home className="w-4.5 h-4.5" /> },
        { label: 'My Academic Profile', path: '/student/profile', icon: <User className="w-4.5 h-4.5" /> },
        { label: 'Digital ID Card', path: '/student/id-card', icon: <QrCode className="w-4.5 h-4.5" /> },
      ]
    },
    {
      group: 'Classroom & Exams',
      items: [
        { label: 'Task Assignments', path: '/student/assignments', icon: <ClipboardList className="w-4.5 h-4.5" /> },
        { label: 'Course Notes/Materials', path: '/student/notes', icon: <BookOpen className="w-4.5 h-4.5" /> },
        { label: 'Lab Reports Panel', path: '/student/lab-reports', icon: <FileCheck2 className="w-4.5 h-4.5" /> },
        { label: 'Semester Projects', path: '/student/projects', icon: <FolderLock className="w-4.5 h-4.5" /> },
        { label: 'Attendance Percentages', path: '/student/attendance', icon: <UserCheck className="w-4.5 h-4.5" /> },
        { label: 'Result Reports', path: '/student/results', icon: <Award className="w-4.5 h-4.5" /> },
        { label: 'CGPA Calculator', path: '/student/cgpa', icon: <Calculator className="w-4.5 h-4.5" /> },
        { label: 'Weekly Timetable', path: '/student/timetable', icon: <Clock className="w-4.5 h-4.5" /> },
        { label: 'Past Papers Vault', path: '/student/papers', icon: <Bookmark className="w-4.5 h-4.5" /> },
      ]
    },
    {
      group: 'University Services',
      items: [
        { label: 'Course Registration', path: '/student/registration', icon: <Bookmark className="w-4.5 h-4.5" /> },
        { label: 'Semester Roadmap', path: '/student/roadmap', icon: <Compass className="w-4.5 h-4.5" /> },
        { label: 'Student Forums', path: '/student/forum', icon: <MessagesSquare className="w-4.5 h-4.5" /> },
        { label: 'Library Catalogue', path: '/student/library', icon: <Library className="w-4.5 h-4.5" /> },
        { label: 'Hostel Allotment', path: '/student/hostel', icon: <Building className="w-4.5 h-4.5" /> },
        { label: 'Campus Happenings', path: '/student/events', icon: <Calendar className="w-4.5 h-4.5" /> },
        { label: 'Fee Invoices', path: '/student/fees', icon: <FileSpreadsheet className="w-4.5 h-4.5" /> },
      ]
    },
    {
      group: 'Careers & Feedback',
      items: [
        { label: 'Internships Board', path: '/student/internships', icon: <Briefcase className="w-4.5 h-4.5" /> },
        { label: 'Carrier Placements', path: '/student/placement', icon: <Award className="w-4.5 h-4.5" /> },
        { label: 'Grievance / Feedback', path: '/student/feedback', icon: <Mail className="w-4.5 h-4.5" /> },
      ]
    }
  ];

  const getTeacherLinks = () => [
    {
      group: 'Teacher Hub',
      items: [
        { label: 'Teacher Dashboard', path: '/teacher/dashboard', icon: <Home className="w-4.5 h-4.5" /> },
        { label: 'Class Attendance Tool', path: '/teacher/attendance', icon: <UserCheck className="w-4.5 h-4.5" /> },
        { label: 'Gradebook & Results', path: '/teacher/results', icon: <Award className="w-4.5 h-4.5" /> },
        { label: 'Assignment Manager', path: '/teacher/assignments', icon: <ClipboardList className="w-4.5 h-4.5" /> },
        { label: 'Lessons & Materials', path: '/teacher/materials', icon: <BookOpen className="w-4.5 h-4.5" /> },
        { label: 'Announcements Board', path: '/teacher/notices', icon: <Bell className="w-4.5 h-4.5" /> },
      ]
    }
  ];

  const getAdminLinks = () => [
    {
      group: 'Admin Dashboard',
      items: [
        { label: 'Central Analytics', path: '/admin/dashboard', icon: <Home className="w-4.5 h-4.5" /> },
        { label: 'Student Directory', path: '/admin/students', icon: <Users className="w-4.5 h-4.5" /> },
        { label: 'Teachers Registry', path: '/admin/teachers', icon: <User className="w-4.5 h-4.5" /> },
        { label: 'UET Departments', path: '/admin/departments', icon: <Building className="w-4.5 h-4.5" /> },
        { label: 'All Courses Set', path: '/admin/courses', icon: <BookOpen className="w-4.5 h-4.5" /> },
        { label: 'Academic Semesters', path: '/admin/semesters', icon: <Calendar className="w-4.5 h-4.5" /> },
        { label: 'Notice Broadcaster', path: '/admin/notices', icon: <Megaphone className="w-4.5 h-4.5" /> },
        { label: 'General Settings', path: '/admin/settings', icon: <Settings className="w-4.5 h-4.5" /> },
        { label: 'Brand & Themes', path: '/admin/themes', icon: <Palette className="w-4.5 h-4.5" /> },
      ]
    }
  ];

  const navGroups = 
    profile.role === 'student' 
      ? getStudentLinks() 
      : profile.role === 'teacher' 
      ? getTeacherLinks() 
      : getAdminLinks();

  return (
    <aside className="w-68 min-w-68 max-w-68 bg-[#0A1D37] border-r border-white/10 flex flex-col h-full sticky top-0 overflow-y-auto no-scrollbar font-sans" id="dashboard-main-sidebar">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10 bg-[#0A1D37] flex items-center space-x-3 shrink-0">
        <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center font-black text-[#0A1D37] text-sm shrink-0 shadow-md">
          UET
        </div>
        <div>
          <span className="text-sm font-bold text-white leading-tight block">Student Hub</span>
          <span className="text-[10px] font-semibold text-[#D4AF37] tracking-wider uppercase block mt-0.5">Portal v2.4</span>
        </div>
      </div>

      {/* User Mini Card */}
      <div className="p-4 mx-4 my-3 bg-white/5 rounded-xl border border-white/5 flex items-center space-x-3 shadow-sm shrink-0">
        <img 
          src={profile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'} 
          alt={profile.name} 
          className="w-9 h-9 rounded-full object-cover border-2 border-[#D4AF37]"
        />
        <div className="overflow-hidden">
          <h4 className="text-xs font-extrabold text-white truncate">{profile.name}</h4>
          <span className="inline-block mt-0.5 px-2 py-0.5 bg-[#D4AF37]/10 text-[#D4AF37] text-[8px] font-extrabold rounded-full uppercase leading-none border border-[#D4AF37]/20">
            {profile.role}
          </span>
          {profile.reg_number && (
            <span className="block text-[8px] font-mono text-slate-405 mt-0.5 truncate">{profile.reg_number}</span>
          )}
        </div>
      </div>

      {/* Navigation Group Items */}
      <nav className="flex-1 px-4 space-y-6 pb-6 overflow-y-auto no-scrollbar">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1.5">
            <h4 className="text-[10px] font-extrabold text-[#D4AF37] uppercase tracking-wider pl-1.5 opacity-85">{group.group}</h4>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 text-xs font-semibold rounded-lg transition-all border ${
                      isActive
                        ? 'bg-white/10 border-white/10 text-white font-bold shadow-inner'
                        : 'text-slate-400 border-transparent hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className={isActive ? 'text-[#D4AF37]' : 'text-slate-500'}>{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        ))}

        {/* Quick Simulator Swapper for assessment convenience */}
        {isMockMode && (
          <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2 mt-4 text-xs">
            <h5 className="text-[9px] font-bold tracking-wider uppercase text-[#D4AF37]">Sandbox Switchboard</h5>
            <div className="grid grid-cols-3 gap-1">
              <button 
                onClick={() => switchMockRole('student')} 
                className={`py-1 text-[8px] font-extrabold rounded transition-all cursor-pointer ${profile.role === 'student' ? 'bg-[#D4AF37] text-[#0A1D37]' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
              >
                Student
              </button>
              <button 
                onClick={() => switchMockRole('teacher')} 
                className={`py-1 text-[8px] font-extrabold rounded transition-all cursor-pointer ${profile.role === 'teacher' ? 'bg-[#D4AF37] text-[#0A1D37]' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
              >
                Teacher
              </button>
              <button 
                onClick={() => switchMockRole('admin')} 
                className={`py-1 text-[8px] font-extrabold rounded transition-all cursor-pointer ${profile.role === 'admin' ? 'bg-[#D4AF37] text-[#0A1D37]' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
              >
                Admin
              </button>
            </div>
          </div>
        )}

        {/* Integrated Theme Switcher inside sidebar */}
        <div className="pt-4 border-t border-white/10">
          <ThemeSwitcher />
        </div>

        {/* Logout CTA */}
        <button
          onClick={() => {
            if (isMockMode) logout();
          }}
          className="w-full flex items-center space-x-3 px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all border border-transparent cursor-pointer mt-4"
        >
          <LogOut className="w-4.5 h-4.5" />
          <span>Sign Out / Lock</span>
        </button>
      </nav>
    </aside>
  );
};
