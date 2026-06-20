import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Linkedin, Github, Instagram, Award, BookOpen, ExternalLink } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export const DeveloperSection: React.FC = () => {
  const { settings } = useApp();

  // Load from dynamic settings with robust default fallbacks matching user requests
  const devName = settings.dev_name || 'Muhammad Qasim Usman';
  const devPic = settings.dev_pic || '/src/assets/images/dev_photo_1781959281322.jpg';
  const devDept = settings.dev_dept || 'Computer Systems Engineering';
  const devUniv = settings.dev_univ || 'University of Engineering and Technology (UET) Peshawar';
  const devBio = settings.dev_bio || 'Muhammad Qasim Usman is a Computer Systems Engineering student at the University of Engineering and Technology (UET) Peshawar. He is passionate about software development, web technologies, system design, and innovative educational solutions. UET Student Hub was created to provide students, teachers, and administrators with a modern digital platform for academic management and collaboration.';
  
  // Parse skills list safely
  const rawSkills = settings.dev_skills || 'React, TypeScript, Node.js, Tailwind CSS, System Design, Software Engineering';
  const skillsList = rawSkills.split(',').map(s => s.trim()).filter(Boolean);

  const devEmail = settings.dev_email || 'info.qasimusman.cse@gmail.com';
  const devWhatsApp = settings.dev_whatsapp || '+923717090091';
  const devLinkedin = settings.dev_linkedin || 'https://www.linkedin.com/in/muhammad-qasim-usman-9b26973a1';
  const devGithub = settings.dev_github || '';
  const devInstagram = settings.dev_instagram || '';

  // Standardize WhatsApp number format
  const cleanWhatsAppNumber = devWhatsApp.replace(/[+\s\-()]/g, '');
  const whatsAppLink = `https://wa.me/${cleanWhatsAppNumber}`;

  return (
    <section id="developer" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20 select-none">
            Project Architect
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Developer & Designer
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Meeting the high academic and operational standards of UET Peshawar. Built and integrated by Computer Systems Engineering scholar.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 bg-gradient-to-br from-slate-900 via-[#0A1D37] to-slate-950 rounded-3xl text-white shadow-xl flex flex-col md:flex-row gap-8 items-center border border-slate-800 relative overflow-hidden animate-fade-in"
          id="developer-profile-card"
        >
          {/* Decorative circular blur background */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-yellow-500/10 rounded-full blur-2xl" />

          {/* Profile Image Column */}
          <div className="relative shrink-0">
            <img
              src={devPic}
              alt={devName}
              className="w-40 h-40 rounded-full object-cover border-4 border-yellow-500 shadow-lg relative z-10 bg-slate-800"
            />
            <div className="absolute -bottom-2 -right-2 bg-[#D4AF37] text-slate-950 p-2 rounded-full border-4 border-slate-950 z-20 shadow-md">
              <Award className="w-5 h-5 font-black" />
            </div>
          </div>

          {/* Bio Info Column */}
          <div className="space-y-4 text-center md:text-left relative z-10 flex-1">
            <div className="space-y-1">
              <h3 className="text-2xl font-black tracking-tight text-white leading-none">
                {devName}
              </h3>
              <p className="text-[#D4AF37] font-bold text-xs sm:text-sm tracking-tight flex items-center justify-center md:justify-start gap-1.5">
                <BookOpen className="w-4 h-4" />
                Undergraduate, {devDept}
              </p>
              <p className="text-[10px] text-slate-450 font-bold uppercase select-none tracking-wider">
                {devUniv}
              </p>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-350 leading-relaxed max-w-md">
              {devBio}
            </p>

            {/* Skills chip ledger */}
            <div className="flex flex-wrap gap-1.5 justify-center md:justify-start py-1">
              {skillsList.slice(0, 5).map((skill, i) => (
                <span 
                  key={i} 
                  className="px-2.5 py-0.5 bg-white/5 border border-white/10 text-[9px] font-black tracking-wide text-slate-300 rounded"
                >
                  {skill}
                </span>
              ))}
              {skillsList.length > 5 && (
                <span className="px-2.5 py-0.5 bg-yellow-500/10 border border-yellow-500/20 text-[9px] font-black text-yellow-400 rounded">
                  +{skillsList.length - 5} More
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-white/10 mt-2">
              {/* Contact Icons Only */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start" id="developer-contact-icons">
                {/* Email Address Link */}
                <a
                  href={`mailto:${devEmail}`}
                  className="p-2.5 bg-white/5 hover:bg-yellow-500 hover:text-slate-950 text-slate-300 rounded-xl transition-all cursor-pointer border border-white/10"
                  title="Send Direct Email"
                >
                  <Mail className="w-4 h-4" />
                </a>

                {/* WhatsApp Link */}
                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 bg-white/5 hover:bg-yellow-500 hover:text-slate-950 text-slate-300 rounded-xl transition-all cursor-pointer border border-white/10"
                  title="WhatsApp Direct Contact"
                >
                  <Phone className="w-4 h-4" />
                </a>

                {/* LinkedIn Link */}
                <a
                  href={devLinkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 bg-white/5 hover:bg-yellow-500 hover:text-slate-950 text-slate-300 rounded-xl transition-all cursor-pointer border border-white/10"
                  title="LinkedIn Network Connection"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                {/* GitHub link with configuration check */}
                {devGithub ? (
                  <a
                    href={devGithub}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-white/5 hover:bg-yellow-500 hover:text-slate-950 text-slate-300 rounded-xl transition-all cursor-pointer border border-white/10"
                    title="GitHub Repository Portfolio"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                ) : (
                  <div
                    className="p-2.5 bg-white/5 text-white/30 rounded-xl cursor-not-allowed border border-white/10 group relative"
                    title="GitHub Link Pending Setup"
                  >
                    <Github className="w-4 h-4" />
                    <span className="hidden group-hover:block absolute bottom-11 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[9px] px-2 py-1 rounded font-semibold whitespace-nowrap z-30 leading-none">
                      Admin: Pending Setup
                    </span>
                  </div>
                )}

                {/* Instagram link with configuration check */}
                {devInstagram ? (
                  <a
                    href={devInstagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-white/5 hover:bg-yellow-500 hover:text-slate-950 text-slate-300 rounded-xl transition-all cursor-pointer border border-white/10"
                    title="Instagram Profile Handle"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                ) : (
                  <div
                    className="p-2.5 bg-white/5 text-white/30 rounded-xl cursor-not-allowed border border-white/10 group relative"
                    title="Instagram Link Pending Setup"
                  >
                    <Instagram className="w-4 h-4" />
                    <span className="hidden group-hover:block absolute bottom-11 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[9px] px-2 py-1 rounded font-semibold whitespace-nowrap z-30 leading-none">
                      Admin: Pending Setup
                    </span>
                  </div>
                )}
              </div>

              {/* Read Full Developer Story page connection */}
              <a 
                href="/about-developer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-slate-950 text-xs font-black rounded-xl transition-all cursor-pointer select-none"
              >
                <span>Read Full Story & Vision</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
