import React, { useState, useEffect } from 'react';
import { uetDB } from '../../data/mockData';
import { BookOpen, User, Calendar, CheckSquare, PlusCircle, CheckCircle2 } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';

export default function StudentCourseRegistration() {
  const { profile } = useProfile();
  const [courses, setCourses] = useState(uetDB.courses);
  const [enrolled, setEnrolled] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  // Load registered courses on mount or profile change
  useEffect(() => {
    if (profile) {
      const stored = localStorage.getItem(`uet_registered_courses_${profile.id}`);
      if (stored) {
        setEnrolled(JSON.parse(stored));
      } else {
        // Fallback or default registered courses for demonstration
        setEnrolled(['course-se', 'course-mp']);
      }
    }
  }, [profile]);

  const handleEnroll = (id: string) => {
    if (!profile) return;
    setEnrolled((prev) => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem(`uet_registered_courses_${profile.id}`, JSON.stringify(next));
      return next;
    });
  };

  const handleConfirmRegistration = () => {
    if (!profile) return;
    localStorage.setItem(`uet_registered_courses_${profile.id}`, JSON.stringify(enrolled));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-6" id="student-course-enrollment">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Active Course Registration</h2>
          <p className="text-xs text-slate-400">Enroll inside regular syllabus lecture courses, laboratory units, or major seminar assignments.</p>
        </div>
        <button
          onClick={handleConfirmRegistration}
          className="px-4 py-2 bg-[rgb(var(--university-primary))] hover:bg-opacity-95 text-white text-xs font-bold rounded-lg cursor-pointer shadow-sm transition-all text-center whitespace-nowrap"
        >
          Confirm Term Registrations ({enrolled.length})
        </button>
      </div>

      {success && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
          <CheckCircle2 className="w-4.5 h-4.5" />
          <span className="font-bold">Term registration locked! Selected academic records filed successfully.</span>
        </div>
      )}

      {/* Grid listing */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-800 dark:text-white mb-4">Available Department Classes (Computer Systems Division)</h3>

        <div className="space-y-3">
          {courses.map((item) => {
            const isRegistered = enrolled.includes(item.id);
            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between sm:items-center gap-3 transition-colors ${
                  isRegistered 
                    ? 'bg-indigo-50/20 dark:bg-indigo-950/25 border-indigo-200 dark:border-indigo-950 text-slate-800 dark:text-white' 
                    : 'bg-slate-50/50 dark:bg-slate-900/50 border-slate-150 dark:border-slate-850 text-slate-600 dark:text-slate-400'
                }`}
                id={`enroll-row-${item.id}`}
              >
                <div className="flex items-start space-x-3.5">
                  <div className={`p-2.5 rounded-lg shrink-0 mt-0.5 ${isRegistered ? 'bg-indigo-500/10 text-indigo-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                    <BookOpen className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[9px] font-mono font-bold uppercase">{item.code}</span>
                      <span className="text-[9px] text-slate-400 italic">• Semester {item.semester}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-850 dark:text-white leading-tight mt-1">{item.name}</h4>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded shrink-0">{item.credit_hours} Cr. Hours</span>
                  <button
                    onClick={() => handleEnroll(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-black tracking-wider cursor-pointer transform active:scale-97 transition-all ${
                      isRegistered 
                        ? 'bg-emerald-650 hover:bg-emerald-700 text-white shadow-xs' 
                        : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {isRegistered ? 'Deregister' : 'Register Class'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
