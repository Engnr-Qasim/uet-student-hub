import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';

export const HeroSection: React.FC = () => {
  const { profile } = useProfile();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[rgb(var(--university-primary))] via-slate-900 to-indigo-950 text-white overflow-hidden py-20 px-4"
    >
      {/* Absolute Decorative Glow Spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[rgb(var(--university-accent))]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 bg-yellow-500/15 border border-yellow-500/35 text-yellow-500 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest leading-none mx-auto"
        >
          <AwardIcon className="w-3.5 h-3.5 text-[rgb(var(--university-accent))]" />
          <span>University of Engineering & Technology (UET)</span>
        </motion.div>

        {/* Brand Master Title */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight"
          >
            Engineering <span className="text-[rgb(var(--university-accent))] underline decoration-wavy decoration-yellow-500/30">Tomorrow's</span> Leaders
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-350 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed tracking-tight"
          >
            A cohesive virtual workstation empowering students, teachers, and administration boards of UET with assignments, results, ID systems, hostels, and careers on a single responsive terminal.
          </motion.p>
        </div>

        {/* Unified Call to actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          {profile ? (
            <a
              href={
                profile.role === 'student'
                  ? '/student/dashboard'
                  : profile.role === 'teacher'
                  ? '/teacher/dashboard'
                  : '/admin/dashboard'
              }
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 bg-yellow-500 hover:bg-yellow-600 text-slate-950 text-sm font-black rounded-xl shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Access {profile.role} dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <a
              href="/sign-in"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 bg-yellow-500 hover:bg-yellow-600 text-slate-950 text-sm font-black rounded-xl shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Student / Staff Login</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          )}
          
          <a
            href="#departments"
            onClick={(e) => handleScroll(e, 'departments')}
            className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white text-sm font-black rounded-xl transition-all cursor-pointer"
          >
            Explore Departments
          </a>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-4 flex flex-wrap gap-4 justify-center items-center text-xs text-slate-400 font-semibold"
        >
          <span className="flex items-center space-x-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> <span>Clerk SECURE AUTH</span></span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center space-x-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> <span>Supabase DB & S3 Cloud</span></span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center space-x-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> <span>HEC Recognised Faculty</span></span>
        </motion.div>
      </div>
    </section>
  );
};

// Internal minimal Award icon to avoid dependency imports
const AwardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);
