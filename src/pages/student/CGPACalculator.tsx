import React, { useState } from 'react';
import { uetDB } from '../../data/mockData';
import { useProfile } from '../../hooks/useProfile';
import { Calculator, Plus, Trash2, Scale, RefreshCw } from 'lucide-react';
import { StatCard } from '../../components/shared/StatCard';

interface SimulatedSubject {
  name: string;
  creditHours: number;
  grade: string;
}

export default function StudentCGPACalculator() {
  const { profile } = useProfile();

  // Grade point mapping
  const gradePoints: { [key: string]: number } = {
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'F': 0.0
  };

  // Real data auto-calculate
  const allCompletedCourses = uetDB.results;
  const totalCompletedCH = allCompletedCourses.length * 3; // Estimating Average 3CH
  const realCgpa = 3.45;

  // Sandbox Simulated State
  const [simulatedSubjects, setSimulatedSubjects] = useState<SimulatedSubject[]>([
    { name: 'Software Engineering', creditHours: 3, grade: 'A' },
    { name: 'Theory of Automata', creditHours: 3, grade: 'B+' },
    { name: 'Microprocessor & Interfacing', creditHours: 4, grade: 'A-' },
  ]);

  const [newName, setNewName] = useState('');
  const [newCH, setNewCH] = useState(3);
  const [newGrade, setNewGrade] = useState('A');

  const addSimulatedSubject = () => {
    if (!newName) return;
    setSimulatedSubjects([...simulatedSubjects, { name: newName, creditHours: newCH, grade: newGrade }]);
    setNewName('');
    setNewCH(3);
    setNewGrade('A');
  };

  const removeSimulatedSubject = (idx: number) => {
    setSimulatedSubjects(simulatedSubjects.filter((_, i) => i !== idx));
  };

  // Math simulation
  const creditHoursSum = simulatedSubjects.reduce((sum, item) => sum + item.creditHours, 0);
  const gradePointsSum = simulatedSubjects.reduce((sum, item) => sum + (gradePoints[item.grade] * item.creditHours), 0);
  const simulatedGpa = creditHoursSum > 0 ? (gradePointsSum / creditHoursSum).toFixed(2) : '0.00';

  return (
    <div className="space-y-6" id="student-cgpa-calculator">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">CGPA Calculator Lab</h2>
        <p className="text-xs text-slate-400">Review cumulative marks, or run dynamic grade projections using standard UET credit weighting scales.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard
          title="Current Verified CGPA"
          value={realCgpa}
          icon={<Calculator className="w-5 h-5 text-indigo-500" />}
          description="Calculated from concluding terms"
          color="primary"
        />
        <StatCard
          title="Simulated Term GPA"
          value={simulatedGpa}
          icon={<Scale className="w-5 h-5 text-yellow-500" />}
          description="Based on custom sandbox grades"
          color="gold"
        />
        <div className="p-5 rounded-2xl border border-slate-150 bg-indigo-50/20 dark:bg-indigo-950/20 dark:border-indigo-950/20 flex flex-col justify-between">
          <span className="block text-[8px] font-black uppercase text-indigo-600 tracking-wider">Credits Weighting Scale</span>
          <div className="grid grid-cols-4 gap-x-2 gap-y-1 text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-1">
            <span>A = 4.0</span>
            <span>A- = 3.7</span>
            <span>B+ = 3.3</span>
            <span>B = 3.0</span>
            <span>B- = 2.7</span>
            <span>C+ = 2.3</span>
            <span>C = 2.0</span>
            <span>F = 0.0</span>
          </div>
        </div>
      </div>

      {/* Simulator Block */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-xs space-y-6">
        <div>
          <h3 className="text-sm font-extrabold text-slate-850 dark:text-white">Active Term Projected GPA</h3>
          <p className="text-xs text-slate-400">Map custom subject scores to preview potential semester outcomes.</p>
        </div>

        {/* Input form */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850">
          <div className="space-y-1 sm:col-span-2">
            <label className="text-[10px] font-bold uppercase text-slate-400">Subject Name</label>
            <input
              type="text"
              placeholder="e.g. Compiler Construction"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-white rounded-lg focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Credit Hours</label>
            <select
              value={newCH}
              onChange={(e) => setNewCH(parseInt(e.target.value))}
              className="w-full text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-white rounded-lg focus:outline-none cursor-pointer"
            >
              <option value="2">2 Credits</option>
              <option value="3">3 Credits</option>
              <option value="4">4 Credits</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Target Grade</label>
            <select
              value={newGrade}
              onChange={(e) => setNewGrade(e.target.value)}
              className="w-full text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-white rounded-lg focus:outline-none cursor-pointer"
            >
              {Object.keys(gradePoints).map(g => (
                <option key={g} value={g}>{g} ({gradePoints[g].toFixed(1)})</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-4 flex justify-end">
            <button
              onClick={addSimulatedSubject}
              className="flex items-center space-x-1 px-4 py-2 bg-[rgb(var(--university-primary))] text-white hover:bg-opacity-95 text-xs font-bold rounded-lg cursor-pointer transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-yellow-400" />
              <span>Add Class to sandbox</span>
            </button>
          </div>
        </div>

        {/* List of Simulated Classes */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-extrabold uppercase text-[9px] tracking-wide select-none">
                <th className="py-2.5 px-2">Assigned Subject</th>
                <th className="py-2.5 px-2 text-center">Credit Hours</th>
                <th className="py-2.5 px-2 text-center">Simulated Grade</th>
                <th className="py-2.5 px-2 text-center">Grade Point</th>
                <th className="py-2.5 px-2 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-850 text-slate-705 dark:text-slate-350">
              {simulatedSubjects.map((sub, idx) => (
                <tr key={idx} className="hover:bg-slate-55/30 transition-colors">
                  <td className="py-3 px-2 font-bold text-slate-800 dark:text-white">{sub.name}</td>
                  <td className="py-3 px-2 text-center font-mono font-bold">{sub.creditHours}</td>
                  <td className="py-3 px-2 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-500 font-black tracking-tight">{sub.grade}</span>
                  </td>
                  <td className="py-3 px-2 text-center font-mono">{gradePoints[sub.grade].toFixed(2)}</td>
                  <td className="py-3 px-2 text-right">
                    <button
                      onClick={() => removeSimulatedSubject(idx)}
                      className="p-1.5 hover:bg-rose-50 hover:text-rose-600 rounded text-slate-400 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
