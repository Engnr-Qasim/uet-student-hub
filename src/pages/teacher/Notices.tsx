import React, { useState } from 'react';
import { uetDB } from '../../data/mockData';
import { useProfile } from '../../hooks/useProfile';
import { EmptyState } from '../../components/shared/EmptyState';
import { CheckCircle2, Ticket, LogIn, Bell, Trash2, Send } from 'lucide-react';

export default function TeacherNotices() {
  const { profile } = useProfile();
  const [notices, setNotices] = useState(uetDB.notices);
  const [type, setType] = useState<'exam' | 'academic' | 'event'>('academic');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState(false);

  if (!profile) return null;

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const newNotice = uetDB.addNotice(type, title, content, profile.name);
    if (newNotice) {
      setNotices([newNotice, ...uetDB.notices]);
      setSuccess(true);
      setTitle('');
      setContent('');
      setTimeout(() => setSuccess(false), 2700);
    }
  };

  const handleDelete = (id: string) => {
    uetDB.notices = uetDB.notices.filter(n => n.id !== id);
    setNotices([...uetDB.notices]);
  };

  return (
    <div className="space-y-6" id="teacher-notices-panel">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Post Board Notifications</h2>
        <p className="text-xs text-slate-400">Broadcast official bulletins, exam rosters, and academic guidelines directly onto student landing screens.</p>
      </div>

      {success && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
          <CheckCircle2 className="w-4.5 h-4.5" />
          <span className="font-bold font-sans">Bulletin published successfully! Student landing boards updated.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column publish form */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-xs lg:col-span-1 h-fit">
          <form onSubmit={handlePublish} className="space-y-4 text-xs font-bold text-slate-600 dark:text-slate-350">
            <h3 className="text-sm font-black text-slate-800 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-850">
              Publish Notice Broadcast
            </h3>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Notice category</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none cursor-pointer"
              >
                <option value="exam">Exam timetables</option>
                <option value="academic">Academic Board</option>
                <option value="event">Campus happenings</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 font-mono">Bulletin Headline</label>
              <input
                type="text"
                required
                placeholder="e.g. Midterm Lab schedule rescheduled"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 font-mono">Notice details content</label>
              <textarea
                rows={4}
                required
                placeholder="Explicate details to the classes..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[rgb(var(--university-primary))] hover:bg-opacity-95 text-white font-bold rounded-lg cursor-pointer transform transition-all active:scale-97"
            >
              Broadcast Bulletin
            </button>
          </form>
        </div>

        {/* Right column existing lists */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-xs lg:col-span-2">
          <h3 className="text-sm font-extrabold text-slate-850 dark:text-white mb-4">Verification Audit logs</h3>

          {notices.length === 0 ? (
            <EmptyState 
              title="Nothing Broadcasted Yet" 
              description="Fill out the bulletin broadcaster template to post the initial administrative notice." 
            />
          ) : (
            <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
              {notices.map((n) => (
                <div key={n.id} className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl space-y-2 border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3 text-xs leading-relaxed text-slate-705 dark:text-slate-350">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-2 text-[10px] font-black uppercase text-slate-400">
                      <span className="text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded leading-none">{n.type}</span>
                      <span>{new Date(n.created_at).toLocaleDateString()}</span>
                    </div>
                    <h4 className="font-extrabold text-slate-850 dark:text-white">{n.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">{n.content}</p>
                  </div>

                  <button
                    onClick={() => handleDelete(n.id)}
                    className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded cursor-pointer transition-colors"
                    title="Purge alerting bulletin"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
