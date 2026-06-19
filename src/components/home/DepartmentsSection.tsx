import React from 'react';
import { mockDepartments } from '../../data/mockData';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const DepartmentsSection: React.FC = () => {
  return (
    <section id="departments" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Academic Departments
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Our fully accredited faculties leverage world-class laboratory ecosystems and industry research setups to foster professional systems engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDepartments.map((dept, idx) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all group"
              id={`dept-card-${dept.code.toLowerCase()}`}
            >
              <div className="space-y-4">
                <div className="text-3xl p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl w-fit">
                  {dept.logo_url}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black text-[rgb(var(--university-primary))] dark:text-amber-400 tracking-wider">
                      {dept.code}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">PEC ACCREDITED</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-[rgb(var(--university-primary))] dark:group-hover:text-amber-400 transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-3">
                    {dept.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 mt-6 flex justify-between items-center">
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-black tracking-wider leading-none">H.O.D Office</span>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-350">{dept.hod_name}</span>
                </div>
                <span className="p-1.5 bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-[rgb(var(--university-primary))] dark:group-hover:text-amber-400 group-hover:bg-slate-100 dark:group-hover:bg-slate-800 rounded-lg transition-all">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
