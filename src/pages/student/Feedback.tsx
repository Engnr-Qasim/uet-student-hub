import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function StudentFeedback() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3100);
  };

  return (
    <div className="space-y-6" id="student-academic-grievances">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Institutional Feedback & Support</h2>
        <p className="text-xs text-slate-400">File anonymous suggestions, report course grievances, or dispatch comments to the HOD block.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-xs max-w-xl">
        {submitted ? (
          <div className="flex flex-col items-center justify-center text-center space-y-2 py-8">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-bounce" />
            <h3 className="font-bold text-sm text-slate-800 dark:text-white">Feedback Record Received</h3>
            <p className="text-xs text-slate-500 max-w-sm">
              Thank you! Your suggestion or grievance has been logged securely inside the HOD administrative registries.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-slate-600 dark:text-slate-350">
            <h3 className="text-sm font-black text-slate-805 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-850">
              Submit Feedback Ticket
            </h3>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Feedback Type / Category</label>
              <select className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none">
                <option value="curric_feedback">Course curriculum delivery feedback</option>
                <option value="facilities_feedback">Lab facilities improvement comment</option>
                <option value="hostel_feedback">Dining or Hostel grievance report</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Brief Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Lab 2 computer issues"
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Detailed Comments</label>
              <textarea
                rows={4}
                required
                placeholder="Provide constructive feedback..."
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[rgb(var(--university-primary))] hover:bg-opacity-95 text-white font-bold rounded-lg cursor-pointer transform transition-all active:scale-97"
            >
              Submit Anonymous Ticket
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
