import React from 'react';
import { GraduationCap, ArrowRight, ArrowLeft } from 'lucide-react';
import { SignUp as ClerkSignUp } from '@clerk/clerk-react';
import { IS_MOCK_AUTH } from '../../lib/clerk-config';

export default function SignUp() {
  if (!IS_MOCK_AUTH) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4" id="clerk-signup-page">
        <ClerkSignUp signInUrl="/sign-in" fallbackRedirectUrl="/student/dashboard" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4" id="custom-signup-page">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-md rounded-2xl p-8 text-center space-y-6">
        
        <div className="w-12 h-12 bg-[rgb(var(--university-primary))] text-white rounded-2xl flex items-center justify-center font-extrabold mx-auto shadow-md">
          <GraduationCap className="w-7 h-7 animate-bounce" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Onboard Student Registry</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            To register as a student of UET DCSE, please request accounts directly from your department coordinator block or registrar office.
          </p>
        </div>

        <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl text-left space-y-2">
          <span className="text-[10px] uppercase font-black text-amber-600 tracking-wider">Access Notice</span>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
            All CSE demonstration profiles are pre-seeded in our database index. You do not need to register a new account to test this application.
          </p>
        </div>

        <div className="pt-2">
          <a
            href="/sign-in"
            className="w-full inline-flex items-center justify-center space-x-2 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-200 hover:dark:bg-slate-750 text-xs font-bold rounded-lg transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Sign In Gateway</span>
          </a>
        </div>
      </div>
    </div>
  );
}
