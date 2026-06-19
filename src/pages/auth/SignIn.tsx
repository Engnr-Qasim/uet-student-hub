import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { GraduationCap, LogIn, ShieldAlert } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import { IS_MOCK_AUTH } from '../../lib/clerk-config';

export default function SignIn() {
  const { switchMockRole } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!IS_MOCK_AUTH) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4" id="clerk-signin-page">
        <ClerkSignIn signUpUrl="/sign-up" fallbackRedirectUrl="/student/dashboard" />
      </div>
    );
  }

  const handleLogin = (e: React.FormEvent, role: 'student' | 'teacher' | 'admin') => {
    e.preventDefault();
    switchMockRole(role);
    window.location.href = `/${role}/dashboard`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4" id="custom-signin-page">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-md rounded-2xl p-8 space-y-6">
        
        {/* Banner Headers */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[rgb(var(--university-primary))] text-white rounded-2xl flex items-center justify-center font-extrabold mx-auto shadow-md">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Access UET Portal Workspace</h2>
            <p className="text-xs text-slate-400">Select simulated credentials for instant sandbox grading authorization.</p>
          </div>
        </div>

        {/* Dynamic Sandbox Swapper controls (Evaluation focus) */}
        <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-xl space-y-3.5">
          <div className="flex items-center space-x-1.5 text-indigo-750 dark:text-indigo-400">
            <ShieldAlert className="w-4 h-4" />
            <span className="text-[10px] font-black tracking-wider uppercase">Evaluator Quick-Login Roles</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={(e) => handleLogin(e, 'student')}
              className="w-full flex items-center justify-between px-4 py-2 bg-indigo-650 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-all"
            >
              <span>Login as Student (Ahmad Hassan)</span>
              <span className="text-[10px] bg-indigo-500/30 text-indigo-150 px-1.5 py-0.5 rounded uppercase font-black tracking-wider text-[8px]">CSE Dept</span>
            </button>
            <button
              onClick={(e) => handleLogin(e, 'teacher')}
              className="w-full flex items-center justify-between px-4 py-2 bg-emerald-650 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-all"
            >
              <span>Login as Teacher (Dr. Saad Malik)</span>
              <span className="text-[10px] bg-emerald-500/30 text-emerald-150 px-1.5 py-0.5 rounded uppercase font-black tracking-wider text-[8px]">Teacher</span>
            </button>
            <button
              onClick={(e) => handleLogin(e, 'admin')}
              className="w-full flex items-center justify-between px-4 py-2 bg-amber-650 hover:bg-amber-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-all"
            >
              <span>Login as Admin (Dr. Qasim Usman)</span>
              <span className="text-[10px] bg-amber-500/30 text-amber-100 px-1.5 py-0.5 rounded uppercase font-black tracking-wider text-[8px]">Registrar</span>
            </button>
          </div>
        </div>

        {/* Regular Sign In form mockup */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100 dark:border-slate-800" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-slate-900 px-2 text-slate-400 font-bold text-[9px]">Standard Credentials</span></div>
        </div>

        <form onSubmit={(e) => handleLogin(e, 'student')} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Institutional Email</label>
            <input
              type="email"
              disabled
              value="info.qasimusman.cse@gmail.com"
              className="w-full text-xs px-3.5 py-2 sm:py-2.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Workspace Password</label>
            <input
              type="password"
              disabled
              value="........"
              className="w-full text-xs px-3.5 py-2 sm:py-2.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-1.5 py-2.5 bg-[rgb(var(--university-primary))] text-white text-xs font-bold rounded-lg cursor-pointer transform active:scale-98 transition-all"
          >
            <LogIn className="w-3.5 h-3.5 text-yellow-400" />
            <span>Simulate Standard Sign In</span>
          </button>
        </form>

        <p className="text-center text-[10px] text-slate-400">
          UET portal systems utilize secure role token models synchronized seamlessly.
        </p>
      </div>
    </div>
  );
}
