import React, { useState } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { uetDB } from '../../data/mockData';
import { FileUpload } from '../../components/shared/FileUpload';
import { EmptyState } from '../../components/shared/EmptyState';
import { ClipboardList, Calendar, Award, CheckCircle2, ChevronDown, Check, ChevronUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../../contexts/AppContext';
import { triggerDevNotification } from '../../lib/notifications';

export default function StudentAssignments() {
  const { profile } = useProfile();
  const { settings } = useApp();
  const [assignments, setAssignments ] = useState(uetDB.assignments);
  const [submissions, setSubmissions] = useState(uetDB.submissions);
  
  const [selectedAsgId, setSelectedAsgId] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [uploadedName, setUploadedName] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  if (!profile) return null;

  const handleFileUpload = (url: string, fileName: string) => {
    setUploadedUrl(url);
    setUploadedName(fileName);
  };

  const submitAssignmentWork = (asgId: string) => {
    if (!uploadedName) return;
    
    const newSub = uetDB.submitAssignment(asgId, profile.id, uploadedName);
    if (newSub) {
      setSubmissions([newSub, ...submissions]);
      setSuccessMsg(true);

      const targetAsg = assignments.find(a => a.id === asgId);
      const asgTitle = targetAsg ? targetAsg.title : 'Course Deliverable';
      const emailToUse = settings.dev_email || 'info.qasimusman.cse@gmail.com';

      triggerDevNotification(
        'Assignment Submission',
        `${profile.name} (Student Portal)`,
        `Uploaded work: "${uploadedName}" in response to assignment: "${asgTitle}"`,
        emailToUse
      );

      setUploadedName('');
      setUploadedUrl('');
      setTimeout(() => setSuccessMsg(false), 4000);
    }
  };

  const getAsgSubmission = (asgId: string) => {
    return submissions.find(s => s.assignment_id === asgId);
  };

  return (
    <div className="space-y-6" id="student-assignments-view">
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Task Assignments</h2>
        <p className="text-xs text-slate-400">Review homework criteria and upload research deliverables before set due-dates.</p>
      </div>

      {assignments.length === 0 ? (
        <EmptyState 
          title="No Active Assignments" 
          description="Congratulations! You have completed all course assignments listed this semester." 
        />
      ) : (
        <div className="space-y-4">
          {assignments.map((asg) => {
            const submission = getAsgSubmission(asg.id);
            const isExpanded = selectedAsgId === asg.id;
            const isPastDue = new Date(asg.due_date) < new Date();

            return (
              <div 
                key={asg.id}
                className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xs transition-all"
                id={`asg-panel-${asg.id}`}
              >
                {/* Main Header summary block */}
                <div 
                  onClick={() => setSelectedAsgId(isExpanded ? null : asg.id)}
                  className="p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start space-x-3.5">
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-500 border border-slate-100 dark:border-slate-800/80 mt-1 shrink-0">
                      <ClipboardList className="w-5 h-5 text-[rgb(var(--university-primary))]" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded leading-none">
                          {asg.course_code}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">{asg.course_name}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white mt-1 leading-tight">
                        {asg.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right hand Status indicators */}
                  <div className="flex items-center gap-3">
                    {submission ? (
                      <span className={`px-2.5 py-1 text-[10px] uppercase font-black tracking-tight rounded-full border ${
                        submission.status === 'graded' 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/20' 
                          : 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-950/20'
                      }`}>
                        {submission.status === 'graded' ? `Graded: ${submission.marks_obtained}/${asg.total_marks}` : 'Submitted'}
                      </span>
                    ) : (
                      <span className={`px-2.5 py-1 text-[10px] uppercase font-black tracking-tight rounded-full border ${
                        isPastDue 
                          ? 'bg-rose-50 text-rose-500 border-rose-100 dark:bg-rose-950/10' 
                          : 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/10'
                      }`}>
                        {isPastDue ? 'Past Due' : 'Not Submitted'}
                      </span>
                    )}
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {/* Expanded upload & description details */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-2 border-t border-slate-100 dark:border-slate-850 bg-slate-50/20 dark:bg-slate-900/40 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      {/* Left Block description and markers */}
                      <div className="md:col-span-2 space-y-4 text-slate-705 dark:text-slate-350">
                        <div className="space-y-1">
                          <h4 className="text-xs uppercase font-bold text-slate-400 select-none">Assignment specifications</h4>
                          <p className="text-xs leading-relaxed">{asg.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-bold text-slate-400">
                          <span className="flex items-center space-x-1"><Calendar className="w-4 h-4" /> <span>Due: {new Date(asg.due_date).toLocaleString()}</span></span>
                          <span className="flex items-center space-x-1"><Award className="w-4 h-4" /> <span>Marks weighting: {asg.total_marks} Marks</span></span>
                        </div>

                        {/* Grading feedback if present */}
                        {submission?.status === 'graded' && (
                          <div className="p-3 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-950 border border-emerald-100/30 rounded-xl space-y-1">
                            <span className="block text-[8px] font-black uppercase text-emerald-600 leading-none">Supervisor Feedback</span>
                            <p className="text-[11px] leading-tight">{submission.feedback}</p>
                          </div>
                        )}
                      </div>

                      {/* Right Block Submit console */}
                      <div className="md:col-span-1">
                        {submission ? (
                          <div className="p-4 bg-white dark:bg-slate-900 border border-emerald-250 dark:border-emerald-950 rounded-xl space-y-2 h-full flex flex-col justify-between">
                            <div className="space-y-1">
                              <span className="text-[9px] uppercase font-black tracking-tight text-emerald-500 flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" /> File Upload Received
                              </span>
                              <p className="text-xs font-bold truncate text-slate-800 dark:text-slate-200">{submission.file_url}</p>
                            </div>
                            <span className="block text-[9px] text-slate-400 mt-2 leading-none">
                              Submitted: {new Date(submission.submitted_at).toLocaleDateString()}
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <FileUpload onUploadComplete={handleFileUpload} />
                            
                            {successMsg && (
                              <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Workspace work added locally! Clicking Submit commits it...
                              </p>
                            )}

                            {uploadedName && (
                              <button
                                onClick={() => submitAssignmentWork(asg.id)}
                                className="w-full py-2 bg-[rgb(var(--university-primary))] hover:bg-opacity-95 text-white text-xs font-bold rounded-lg cursor-pointer transition-all"
                              >
                                Commit & Submit Assignment
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
