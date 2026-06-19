import React, { useState } from 'react';
import { uetDB } from '../../data/mockData';
import { useProfile } from '../../hooks/useProfile';
import { FileUpload } from '../../components/shared/FileUpload';
import { EmptyState } from '../../components/shared/EmptyState';
import { FileSpreadsheet, Calendar, User, FileText, CheckCircle2, Award } from 'lucide-react';

export default function StudentLabReports() {
  const { profile } = useProfile();
  const [labReports, setLabReports] = useState(uetDB.labReports);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [uploadedName, setUploadedName] = useState('');
  const [success, setSuccess] = useState(false);

  if (!profile) return null;

  const getCourses = () => {
    return uetDB.courses.filter(c => c.semester === (profile.semester || 5));
  };

  const handleUpload = (url: string, filename: string) => {
    setUploadedUrl(url);
    setUploadedName(filename);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !courseId || !uploadedName) return;

    const newLab = uetDB.addLabReport(profile.id, courseId, title, uploadedName);
    if (newLab) {
      setLabReports([newLab, ...labReports]);
      setSuccess(true);
      setTitle('');
      setUploadedName('');
      setUploadedUrl('');
      setShowSubmitForm(false);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6" id="student-labs-view">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Lab Reports Panel</h2>
          <p className="text-xs text-slate-400">View evaluations for technical laboratory tasks, or register newly completed records.</p>
        </div>
        <button
          onClick={() => setShowSubmitForm(!showSubmitForm)}
          className="px-4 py-2 bg-[rgb(var(--university-primary))] hover:bg-opacity-95 text-white text-xs font-bold rounded-lg cursor-pointer shadow-sm transition-all text-center"
        >
          {showSubmitForm ? 'Hide Form' : 'Register New Lab'}
        </button>
      </div>

      {success && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
          <CheckCircle2 className="w-4.5 h-4.5" />
          <span className="font-bold">Lab report submitted successfully to the lab coordinator!</span>
        </div>
      )}

      {/* Upload/Registration Form */}
      {showSubmitForm && (
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-sm max-w-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-850">
            Submit Laboratory Workspace Delivery
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400">Course / Lab Unit</label>
                <select
                  required
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none focus:border-[rgb(var(--university-primary))]"
                >
                  <option value="">Choose class...</option>
                  {getCourses().map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400">Lab Title / Code No.</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lab 6: Traffic Systems"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none focus:border-[rgb(var(--university-primary))]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Attach Technical Report Doc</label>
              <FileUpload onUploadComplete={handleUpload} />
            </div>

            {uploadedName && (
              <button
                type="submit"
                className="w-full py-2.5 bg-[rgb(var(--university-primary))] hover:bg-opacity-95 text-white text-xs font-bold rounded-lg cursor-pointer transition-all"
              >
                Upload & Register Lab Report
              </button>
            )}
          </form>
        </div>
      )}

      {/* Lab History list */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-800 dark:text-white mb-4">Completed Lab Activities Logs</h3>

        {labReports.length === 0 ? (
          <EmptyState 
            title="Empty Laboratory Log" 
            description="You have not logged any laboratory reports yet. Use the 'Register New Lab' button to record works." 
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-extrabold tracking-tight uppercase text-[9px] select-none">
                  <th className="py-3 px-2">Lab Title</th>
                  <th className="py-3 px-2">Course Unit</th>
                  <th className="py-3 px-2">Submitted Time</th>
                  <th className="py-3 px-2">Document</th>
                  <th className="py-3 px-2 text-right">Evaluation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-850 text-slate-705 dark:text-slate-350">
                {labReports.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-855/30 transition-colors">
                    <td className="py-3 px-2 font-bold text-slate-800 dark:text-white">{item.title}</td>
                    <td className="py-3 px-2 italic text-slate-450">{item.course_name || 'DCSE Lab'}</td>
                    <td className="py-3 px-2 font-medium">{new Date(item.submitted_at).toLocaleDateString()}</td>
                    <td className="py-3 px-2">
                      <span className="text-[10px] text-indigo-500 font-bold hover:underline truncate max-w-[150px] inline-block">{item.file_url}</span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-black uppercase ${item.grade ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20' : 'bg-slate-50 text-slate-450 dark:bg-slate-850'}`}>
                        {item.grade ? `Grade ${item.grade}` : 'Pending Marking'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
