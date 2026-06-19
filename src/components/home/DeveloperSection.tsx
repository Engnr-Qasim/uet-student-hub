import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Linkedin, Github, Instagram, MessageSquare, Award, BookOpen } from 'lucide-react';

export const DeveloperSection: React.FC = () => {
  return (
    <section id="developer" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-[rgb(var(--university-accent))] bg-yellow-500/10 px-3 py-1 rounded-full">
            Project Architect
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Developer & Designer
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Meeting the high academic and operational standards of UET. Built and integrated by Computer Systems Engineering scholar.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl text-white shadow-xl flex flex-col md:flex-row gap-8 items-center border border-slate-800 relative overflow-hidden"
          id="developer-profile-card"
        >
          {/* Decorative circular blur background */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-yellow-500/10 rounded-full blur-2xl" />

          {/* Profile Image Column */}
          <div className="relative shrink-0">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=350"
              alt="Muhammad Qasim Usman"
              className="w-40 h-40 rounded-full object-cover border-4 border-yellow-500 shadow-lg relative z-10"
            />
            <div className="absolute -bottom-2 -right-2 bg-yellow-500 p-2 text-slate-950 rounded-full border-4 border-slate-950 z-20 shadow-md">
              <Award className="w-5 h-5 font-black" />
            </div>
          </div>

          {/* Bio Info Column */}
          <div className="space-y-4 text-center md:text-left relative z-10 flex-1">
            <div className="space-y-1">
              <h3 className="text-2xl font-black tracking-tight text-white leading-none">
                Muhammad Qasim Usman
              </h3>
              <p className="text-yellow-500 font-bold text-xs sm:text-sm tracking-tight flex items-center justify-center md:justify-start gap-1.5">
                <BookOpen className="w-4 h-4" />
                Undergraduate, Computer Systems Engineering (DCSE)
              </p>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-350 leading-relaxed max-w-md">
              Full-stack software developer specialized in highly interactive, responsive educational portals, database microservices, security protocols, and visual design layouts. Driven to make computer systems cleaner, faster, and more accessible.
            </p>

            <div className="p-4 bg-slate-850/60 border border-slate-800 rounded-2xl">
              <span className="block text-[8px] font-black uppercase tracking-wider text-slate-400">Current Affiliation</span>
              <span className="text-slate-200 text-xs font-semibold">University of Engineering and Technology, Department of CSE & IT</span>
            </div>

            {/* Social and Contact Channels */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
              <a
                href="mailto:info.qasimusman.cse@gmail.com"
                className="p-2.5 bg-slate-800 hover:bg-yellow-500 hover:text-slate-950 text-slate-300 rounded-xl transition-all cursor-pointer border border-slate-700/50"
                title="Email Developer"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-slate-800 hover:bg-yellow-500 hover:text-slate-950 text-slate-300 rounded-xl transition-all cursor-pointer border border-slate-700/50"
                title="WhatsApp Developer"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/qasim-usman-cse"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-slate-800 hover:bg-yellow-500 hover:text-slate-950 text-slate-300 rounded-xl transition-all cursor-pointer border border-slate-700/50"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/qasimusman-cse"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-slate-800 hover:bg-yellow-500 hover:text-slate-950 text-slate-300 rounded-xl transition-all cursor-pointer border border-slate-700/50"
                title="GitHub Repositories"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/qasimusman.cse"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-slate-800 hover:bg-yellow-500 hover:text-slate-950 text-slate-300 rounded-xl transition-all cursor-pointer border border-slate-700/50"
                title="Instagram Handle"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
