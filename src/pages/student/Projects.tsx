import React, { useState } from 'react';
import { uetDB } from '../../data/mockData';
import { useProfile } from '../../hooks/useProfile';
import { FileUpload } from '../../components/shared/FileUpload';
import { EmptyState } from '../../components/shared/EmptyState';
import { FolderLock, Calendar, CheckSquare, Compass, CheckCircle2 } from 'lucide-react';

export default function StudentProjects() {
  const { profile } = useProfile();
  const [projects, setProjects] = useState(uetDB.projects);
  const [showForm, setShowForm] = useState(false);
  
  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [uploadedName, setUploadedName] = useState('');
  const [success, setSuccess] = useState(false);

  if (!profile) return null;

  const handleUpload = (url: string, filename: string) => {
    setUploadedUrl(url);
    setUploadedName(filename);
  };

  const registerProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !courseId || !uploadedName) return;

    const newProj = {
      id: `proj-${Date.now()}`,
      student_id: profile.id,
      student_name: profile.name,
      course_id: courseId,
      course_name: uetDB.courses.find(c => c.id === courseId)?.name || 'DCSE Class Project',
      title,
      description,
      file_url: uploadedName,
      status: 'pending' as const,
      created_at: new Date().toISOString()
    };

    uetDB.projects.unshift(newProj);
    setProjects([newProj, ...projects]);
    setSuccess(true);
    setTitle('');
    setDescription('');
    setUploadedName('');
    setUploadedUrl('');
    setShowForm(false);
    setTimeout(() => setSuccess(false), 3050);
  };

  return (
    <div className="space-y-6" id="student-projects-view">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Active Semester Projects</h2>
          <p className="text-xs text-slate-400">Log prototypes, project summaries, and repository proposals for graduation review panels.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[rgb(var(--university-primary))] hover:bg-opacity-95 text-white text-xs font-bold rounded-lg cursor-pointer transition-all shadow-sm shrink-0"
        >
          {showForm ? 'Hide Form' : 'Register Project Proposal'}
        </button>
      </div>

      {success && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
          <CheckCircle2 className="w-4.5 h-4.5" />
          <span className="font-bold">Project proposal successfully transmitted for board supervisor approvals!</span>
        </div>
      )}

      {/* Form modal block */}
      {showForm && (
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-sm max-w-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-850">
            Submit Semester Initiative Details
          </h3>

          <form onSubmit={registerProject} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400">Course / Project Domain</label>
                <select
                  required
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none"
                >
                  <option value="">Choose academic domain...</option>
                  {uetDB.courses.filter(c => c.semester === (profile.semester || 5)).map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400">Project Initiative Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Navigation Pathfinder App"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Abstract Description</label>
              <textarea
                required
                rows={3}
                placeholder="Provide a concise 2-sentence synopsis summary..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Synopsys file upload</label>
              <FileUpload onUploadComplete={handleUpload} />
            </div>

            {uploadedName && (
              <button
                type="submit"
                className="w-full py-2.5 bg-[rgb(var(--university-primary))] hover:bg-opacity-95 text-white font-bold rounded-lg cursor-pointer transition-all"
              >
                File synopsis uploaded. Register proposal.
              </button>
            )}
          </form>
        </div>
      )}

      {/* Existing projects list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-2">
            <EmptyState 
              title="No Registered Initiative Projects" 
              description="Click 'Register Project Proposal' above to setup a semester proposal and check supervisor board reports." 
            />
          </div>
        ) : (
          projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between"
              id={`proj-panel-${proj.id}`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 select-none">
                  <span className="uppercase text-[9px] px-2 py-0.5 bg-indigo-500/10 text-indigo-500 rounded border border-indigo-500/10">{proj.course_name}</span>
                  <span>{proj.created_at ? new Date(proj.created_at).toLocaleDateString() : 'June 2026'}</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-white leading-tight">{proj.title}</h3>
                  <p className="text-xs text-slate-450 dark:text-slate-500 mt-2 leading-relaxed">{proj.description}</p>
                </div>
              </div>

              {/* Status and download link */}
              <div className="border-t border-slate-100 dark:border-slate-850 pt-4 mt-6 flex justify-between items-center text-[11px] font-bold">
                <div>
                  <span className="block text-[8px] text-slate-400 uppercase font-black tracking-wider leading-none">Synopsis attachment</span>
                  <span className="text-indigo-500 hover:underline cursor-pointer truncate max-w-[150px] inline-block">{proj.file_url}</span>
                </div>

                <div className="text-right">
                  <span className="block text-[8px] text-slate-400 uppercase font-black tracking-wider leading-none mb-1">Supervisor review</span>
                  <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-black uppercase ${
                    proj.status === 'approved' 
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20' 
                      : proj.status === 'rejected' 
                      ? 'bg-rose-50 text-rose-500 dark:bg-rose-950/10' 
                      : 'bg-amber-50 text-amber-600 dark:bg-amber-950/15'
                  }`}>
                    {proj.status === 'approved' ? 'Approved' : proj.status === 'rejected' ? 'Revision Requested' : 'Under Review'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
