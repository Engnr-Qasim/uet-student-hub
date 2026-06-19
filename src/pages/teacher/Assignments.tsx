import React, { useState } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { 
  ClipboardList, 
  Plus, 
  Calendar, 
  FolderOpen, 
  Check, 
  X, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { uetDB } from '../../data/mockData';
import { Assignment, AssignmentSubmission } from '../../types';

export default function TeacherAssignments() {
  const { profile } = useProfile();
  const [activeTab, setActiveTab] = useState<'list' | 'create' | 'submissions'>('list');
  const [selectedCourse, setSelectedCourse] = useState('All');

  // New assignment form states
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [totalMarks, setTotalMarks] = useState(10);
  const [description, setDescription] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Grading states
  const [gradingSub, setGradingSub] = useState<AssignmentSubmission | null>(null);
  const [gradeMarks, setGradeMarks] = useState<number>(10);
  const [gradeFeedback, setGradeFeedback] = useState('');

  if (!profile) return null;

  // Filter courses taught by Saad Malik (Saad teaches c-se and c-micro)
  const teacherCourses = uetDB.courses.slice(0, 2);

  // List of assignments for these courses
  const filteredAssignments = uetDB.assignments.filter(asg => {
    const isTeacherCourse = teacherCourses.some(c => c.id === asg.course_id);
    const matchesCourse = selectedCourse === 'All' || asg.course_id === selectedCourse;
    return isTeacherCourse && matchesCourse;
  });

  // Flat list of submissions for teacher's courses
  const studentSubmissions = uetDB.submissions.filter(sub => {
    const asg = uetDB.assignments.find(a => a.id === sub.assignment_id);
    if (!asg) return false;
    const isTeacherCourse = teacherCourses.some(c => c.id === asg.course_id);
    const matchesCourse = selectedCourse === 'All' || asg.course_id === selectedCourse;
    return isTeacherCourse && matchesCourse;
  });

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !courseId || !dueDate) return;

    uetDB.addAssignment(
      courseId,
      profile.id,
      title,
      description,
      dueDate,
      Number(totalMarks)
    );

    setSuccessMsg('New assignment successfully dispatched to register systems!');
    setTitle('');
    setDueDate('');
    setDescription('');
    setTotalMarks(10);
    setTimeout(() => {
      setSuccessMsg('');
      setActiveTab('list');
    }, 2000);
  };

  const handleGradeSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingSub) return;

    // Mutate the submission in uetDB
    const index = uetDB.submissions.findIndex(s => s.id === gradingSub.id);
    if (index > -1) {
      uetDB.submissions[index].status = 'graded';
      uetDB.submissions[index].marks_obtained = Number(gradeMarks);
      uetDB.submissions[index].feedback = gradeFeedback;
    }

    setGradingSub(null);
    setGradeFeedback('');
  };

  return (
    <div className="space-y-6" id="teacher-assignments-module">
      {/* Title Header banner */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl relative overflow-hidden border-b-4 border-teal-500">
        <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-teal-400" />
          Assignment & Submission Manager
        </h1>
        <p className="text-xs text-slate-350 max-w-lg mt-1">
          Coordinate deliverables sheets, write questions details, and dispatch grades on student homework solutions.
        </p>
      </div>

      {/* Control Tabs bar & Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-150 dark:border-slate-800">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'list' ? 'bg-[#0A1D37] text-white dark:bg-[#D4AF37] dark:text-[#0A1D37]' : 'bg-slate-50 dark:bg-slate-805 text-slate-600 hover:bg-slate-100'}`}
          >
            Assigned Deliverables
          </button>
          <button
            onClick={() => {
              setActiveTab('create');
              if (teacherCourses.length > 0 && !courseId) {
                setCourseId(teacherCourses[0].id);
              }
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${activeTab === 'create' ? 'bg-[#0A1D37] text-white dark:bg-[#D4AF37] dark:text-[#0A1D37]' : 'bg-slate-50 dark:bg-slate-805 text-slate-600 hover:bg-slate-100'}`}
          >
            <Plus className="w-3.5 h-3.5" />
            Dispatch Assignment
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'submissions' ? 'bg-[#0A1D37] text-white dark:bg-[#D4AF37] dark:text-[#0A1D37]' : 'bg-slate-50 dark:bg-slate-805 text-slate-600 hover:bg-slate-100'}`}
          >
            Submissions Ledger
            {studentSubmissions.filter(s => s.status === 'pending').length > 0 && (
              <span className="w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center animate-pulse">
                {studentSubmissions.filter(s => s.status === 'pending').length}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Filter Class:</span>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none font-bold"
          >
            <option value="All">All Coordinated Classes</option>
            {teacherCourses.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Container */}
      <div className="space-y-6">
        {activeTab === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredAssignments.map((asg) => {
              const subs = studentSubmissions.filter(s => s.assignment_id === asg.id);
              const pendingCount = subs.filter(s => s.status === 'pending').length;
              const gradedCount = subs.filter(s => s.status === 'graded').length;

              return (
                <div key={asg.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 text-[9px] font-mono font-bold uppercase rounded leading-none border border-indigo-150">
                        {asg.course_code}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-850 dark:text-white mt-1.5">{asg.title}</h3>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      Marks: {asg.total_marks}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3">
                    {asg.description || 'No guidance instructions details uploaded.'}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Due: {new Date(asg.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="font-bold uppercase text-[9px] bg-slate-50 dark:bg-slate-850 py-1 px-2 rounded">
                      {subs.length} Subs • {pendingCount} Pending / {gradedCount} Graded
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredAssignments.length === 0 && (
              <div className="col-span-2 text-center py-12 bg-white dark:bg-slate-900 border rounded-2xl p-6 text-slate-400">
                <FolderOpen className="w-12 h-12 mx-auto text-slate-300 mb-2 animate-bounce" />
                <p className="text-xs">No active assignments dispatched for selected class.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'create' && (
          <form onSubmit={handleCreateAssignment} className="max-w-xl mx-auto bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Publish New Deliverable Form</h3>
              <p className="text-xs text-slate-400">Fill details below. Students will instantly see the task in their panels.</p>
            </div>

            {successMsg && (
              <div className="p-3 bg-emerald-50 text-emerald-750 text-xs font-semibold border border-emerald-100 rounded-xl">
                {successMsg}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-450 block">Assignment Title / Topic</label>
              <input
                type="text"
                required
                placeholder="e.g. Lab 4: Design a 4-bit ALU Schematic"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-205 dark:bg-slate-950 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450 block">Target Class Course</label>
                <select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-205 dark:bg-slate-950 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none"
                >
                  {teacherCourses.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450 block">Total Target Marks</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  required
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(Number(e.target.value))}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-205 dark:bg-slate-950 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-450 block">Deadline Date</label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-205 dark:bg-slate-950 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-450 block">Description / Details Instruction</label>
              <textarea
                rows={4}
                required
                placeholder="Include reference formulas, submission file templates guidelines..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-205 dark:bg-slate-950 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#0A1D37] hover:bg-opacity-95 text-white text-xs font-bold rounded-lg cursor-pointer transition-all uppercase tracking-wider"
            >
              Verify & Dispatch Assignment
            </button>
          </form>
        )}

        {activeTab === 'submissions' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Active Student Submissions Ledger</h3>
              <p className="text-xs text-slate-400">Grade uploads, review deliverables, and write constructive feedback.</p>
            </div>

            {gradingSub && (
              <form onSubmit={handleGradeSubmission} className="p-4 bg-teal-500/10 border border-teal-500/25 rounded-xl space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold">Grading Student: <span className="text-[#0A1D37] font-extrabold">{gradingSub.student_name}</span></span>
                  <button type="button" onClick={() => setGradingSub(null)} className="p-1 hover:bg-slate-200 rounded">
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Awarded Marks</label>
                    <input
                      type="number"
                      required
                      min="0"
                      className="w-full text-xs p-2 rounded border bg-white dark:bg-slate-900"
                      value={gradeMarks}
                      onChange={(e) => setGradeMarks(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Teacher Feedback Notes</label>
                    <input
                      type="text"
                      className="w-full text-xs p-2 rounded border bg-white dark:bg-slate-900"
                      value={gradeFeedback}
                      placeholder="e.g. Excellent schematic, well documented and neat."
                      onChange={(e) => setGradeFeedback(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="px-4 py-2 bg-[#0A1D37] text-white text-xs font-bold rounded-lg cursor-pointer">
                  Submit Grades Sheet
                </button>
              </form>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-50/50">
                    <th className="py-2.5 px-4">Student</th>
                    <th className="py-2.5 px-4">Assignment Topic</th>
                    <th className="py-2.5 px-4">Uploaded File</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-slate-705">
                  {studentSubmissions.map((sub, idx) => {
                    const asg = uetDB.assignments.find(a => a.id === sub.assignment_id);
                    return (
                      <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                        <td className="py-3 px-4 font-bold">
                          <span>{sub.student_name}</span>
                          <span className="block text-[9px] font-mono text-slate-400 mt-0.5">{sub.student_reg}</span>
                        </td>
                        <td className="py-3 px-4 max-w-xs truncate font-semibold text-slate-800 dark:text-white">
                          {asg?.title || sub.assignment_title}
                        </td>
                        <td className="py-3 px-4 font-mono text-[10px] text-indigo-600 font-bold hover:underline">
                          <a href={sub.file_url} target="_blank" rel="referrer">{sub.file_url || 'hw_submission.pdf'}</a>
                        </td>
                        <td className="py-3 px-4">
                          {sub.status === 'graded' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 font-extrabold rounded-full text-[9px] border border-emerald-100">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                              Graded: {sub.marks_obtained}/{asg?.total_marks || 10}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 font-extrabold rounded-full text-[9px] border border-amber-100 leading-none">
                              <Clock className="w-3 h-3 text-amber-500" />
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {sub.status === 'pending' ? (
                            <button
                              onClick={() => {
                                setGradingSub(sub);
                                setGradeMarks(asg?.total_marks || 10);
                              }}
                              className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-[10px] font-black cursor-pointer transition-all uppercase"
                            >
                              Grade
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-mono italic">
                              Done ({sub.marks_obtained} pts)
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}

                  {studentSubmissions.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">
                        No active solutions uploaded by students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
