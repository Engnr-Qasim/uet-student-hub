import React from 'react';
import { uetDB } from '../../data/mockData';
import { Compass, GraduationCap, ChevronRight, CheckCircle2, Circle } from 'lucide-react';

export default function StudentSemesterRoadmap() {
  const semestersData = [
    { title: 'Semester 1: Foundation Engineering', completed: true, courses: ['Calculus & Analytical Geometry', 'Introduction to Computing', 'Applied Physics'] },
    { title: 'Semester 2: Core Engineering', completed: true, courses: ['Differential Equations', 'Programming Fundamentals', 'Workshop Practice'] },
    { title: 'Semester 3: Logic and Networks', completed: true, courses: ['Digital Logic Design', 'Data Structures & Algorithms', 'Basic Electronics'] },
    { title: 'Semester 4: Operating Structures', completed: true, courses: ['Database Management Systems', 'Computer Networks', 'Operating Systems'] },
    { title: 'Semester 5: Advanced Engineering', completed: false, courses: ['Software Engineering', 'Microprocessors & Interfacing', 'Theory of Automata'] },
    { title: 'Semester 6: Specialized Tracks', completed: false, courses: ['Digital Signal Processing', 'Embedded Systems Design', 'Artificial Intelligence'] },
    { title: 'Semester 7: Graduation Initials', completed: false, courses: ['Final Year Project I', 'Distributed Computing', 'Elective Subject I'] },
    { title: 'Semester 8: Professional Engineering', completed: false, courses: ['Final Year Project II', 'Entrepreneurship', 'Elective Subject II'] },
  ];

  return (
    <div className="space-y-6" id="student-curriculum-roadmap">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Academic Syllabus Roadmap</h2>
        <p className="text-xs text-slate-400">Preview chronological graduation semesters, elective tracks, other CSE requirements, and credit counts.</p>
      </div>

      {/* Timeline flowchart */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
        <h3 className="text-sm font-extrabold text-slate-800 dark:text-white pb-3 border-b border-slate-150 dark:border-slate-800">
          Curriculum Flowchart — Department of CSE
        </h3>

        <div className="relative border-l border-slate-200 dark:border-slate-800 pl-6 sm:pl-8 space-y-8 py-3">
          {semestersData.map((sem, sIdx) => {
            const isCompleted = sem.completed;
            return (
              <div key={sIdx} className="relative" id={`timeline-step-${sIdx}`}>
                {/* Node icon */}
                <div className={`absolute -left-[35px] sm:-left-[43px] p-1 rounded-full border-4 border-white dark:border-slate-900 ${
                  isCompleted 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-550'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <Circle className="w-4 h-4 shrink-0" />}
                </div>

                {/* Card */}
                <div className="space-y-2">
                  <h4 className={`text-sm font-extrabold leading-none ${isCompleted ? 'text-slate-850 dark:text-white' : 'text-slate-400'}`}>
                    {sem.title}
                  </h4>
                  <div className="flex flex-wrap gap-2 pt-1 font-semibold text-[10px]">
                    {sem.courses.map((course, cIdx) => (
                      <span 
                        key={cIdx} 
                        className={`px-2.5 py-0.5 rounded-full border leading-none ${
                          isCompleted 
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/10' 
                            : 'bg-slate-50/50 text-slate-450 border-slate-150 dark:bg-slate-900 dark:border-slate-850'
                        }`}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
