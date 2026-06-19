import React from 'react';
import { motion } from 'motion/react';
import { 
  FileCheck2, 
  Clock, 
  Users2, 
  Library, 
  ShieldCheck, 
  Award,
  BookMarked,
  Layers
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const feats = [
    { title: 'Unified Academic Profile', desc: 'Secure profile views showing enrolled courses, semesters, GPA records, and personal registration directories.', icon: <BookMarked className="w-5 h-5 text-indigo-500" /> },
    { title: 'Online Homework Submissions', desc: 'Students upload research work, coding lab files, and team assignments. Teachers review, mark, and offer feedback.', icon: <FileCheck2 className="w-5 h-5 text-emerald-500" /> },
    { title: 'Dynamic Gradebook Broadcast', desc: 'Exquisite tracking of midterms, final exam sheets, quizzes, and automatic CGPA calculation.', icon: <Award className="w-5 h-5 text-amber-500" /> },
    { title: 'Realtime Class Scheduling', desc: 'Interactive timetables mapped out day-by-day. Keeps students synchronized with lectures, labs, and rooms.', icon: <Clock className="w-5 h-5 text-cyan-500" /> },
    { title: 'Peer Collaboration Forums', desc: 'Post technical queries, discuss course syllabus issues, share papers, and collaborate inside modular course groups.', icon: <Users2 className="w-5 h-5 text-pink-500" /> },
    { title: 'University Library Catalogues', desc: 'Reserve textbook packages, search literature catalogs, and track checkout deadlines effortlessly.', icon: <Library className="w-5 h-5 text-fuchsia-500" /> },
    { title: 'Digital Student ID Card', desc: 'Generate high-resolution printable ID cards featuring distinct student registration barcodes and codes.', icon: <ShieldCheck className="w-5 h-5 text-sky-500" /> },
    { title: 'Admin Board Controls', desc: 'Full-featured backoffice dashboard to issue notifications, manage teachers, update settings, and set visual themes.', icon: <Layers className="w-5 h-5 text-rose-500" /> },
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight animate-fade-in">
            Engineering Virtual Ecosystem
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            A comprehensive, modular utility suite crafted to modernize undergraduate routines, administrative approvals, and student engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {feats.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-5 bg-slate-50 dark:bg-slate-850/50 border border-slate-100 dark:border-slate-800/80 rounded-xl space-y-3"
              id={`feature-card-${idx}`}
            >
              <div className="p-2 w-fit bg-white dark:bg-slate-850 rounded-lg shadow-xs">
                {f.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">{f.title}</h3>
                <p className="text-xs text-slate-400 dark:text-slate-550 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
