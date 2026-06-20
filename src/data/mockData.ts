import {
  UserProfile,
  Department,
  Course,
  Assignment,
  AssignmentSubmission,
  Note,
  LabReport,
  SemesterProject,
  PreviousPaper,
  Attendance,
  Result,
  Notice,
  UniversitySettings,
  Feedback,
  Fee,
  TimetableEntry,
  CalendarEvent,
  LibraryBook,
  BookBorrowing,
  HostelRoom,
  HostelAssignment,
  Internship,
  InternshipApplication,
  JobPlacement,
  ForumPost,
  ForumComment
} from '../types';

export const mockDepartments: Department[] = [
  {
    id: 'dept-cse',
    name: 'Computer Systems Engineering',
    code: 'CSE',
    description: 'Focusing on computer hardware design, software integration, embedded systems, and cutting-edge intelligence.',
    hod_name: 'Prof. Dr. Ali Sajid',
    logo_url: '💻'
  },
  {
    id: 'dept-ee',
    name: 'Electrical Engineering',
    code: 'EE',
    description: 'Providing knowledge of power systems, electronics, telecommunications, and digital electronics.',
    hod_name: 'Dr. Maria Khan',
    logo_url: '⚡'
  },
  {
    id: 'dept-me',
    name: 'Mechanical Engineering',
    code: 'ME',
    description: 'Focusing on thermodynamics, fluid mechanics, design, manufacturing, and robotics.',
    hod_name: 'Prof. Dr. Tahir Mahmood',
    logo_url: '⚙️'
  },
  {
    id: 'dept-ce',
    name: 'Civil Engineering',
    code: 'CE',
    description: 'Covering structural design, geotechnical engineering, water resources, and transport networks.',
    hod_name: 'Dr. Faisal Shah',
    logo_url: '🏗️'
  },
  {
    id: 'dept-che',
    name: 'Chemical Engineering',
    code: 'ChE',
    description: 'Understanding mass transfer, reaction kinetics, and processing raw materials into valuable chemical products.',
    hod_name: 'Dr. Yasmin Ara',
    logo_url: '🧪'
  },
  {
    id: 'dept-cs',
    name: 'Computer Science',
    code: 'CS',
    description: 'Centered on software algorithms, databases, web platforms, and data analytics.',
    hod_name: 'Dr. Harris Ahmed',
    logo_url: '🖥️'
  }
];

export const mockCourses: Course[] = [
  // Semester 1
  { id: 'c-pf', name: 'Programming Fundamentals', code: 'CS-101', department_id: 'dept-cse', semester: 1, credit_hours: 4 },
  { id: 'c-calc', name: 'Calculus & Analytical Geometry', code: 'MA-101', department_id: 'dept-cse', semester: 1, credit_hours: 3 },
  { id: 'c-phys', name: 'Applied Physics', code: 'PH-101', department_id: 'dept-cse', semester: 1, credit_hours: 4 },
  { id: 'c-eng1', name: 'Functional English', code: 'HU-101', department_id: 'dept-cse', semester: 1, credit_hours: 3 },
  { id: 'c-islam', name: 'Islamic Studies / Ethical Behavior', code: 'HU-102', department_id: 'dept-cse', semester: 1, credit_hours: 2 },

  // Semester 2
  { id: 'c-oop', name: 'Object Oriented Programming', code: 'CS-102', department_id: 'dept-cse', semester: 2, credit_hours: 4 },
  { id: 'c-discrete', name: 'Discrete Structure', code: 'CS-103', department_id: 'dept-cse', semester: 2, credit_hours: 3 },
  { id: 'c-la', name: 'Linear Algebra', code: 'MA-102', department_id: 'dept-cse', semester: 2, credit_hours: 3 },
  { id: 'c-dld', name: 'Digital Logic Design', code: 'EE-102', department_id: 'dept-cse', semester: 2, credit_hours: 4 },

  // Semester 3
  { id: 'c-dsa', name: 'Data Structures & Algorithms', code: 'CS-201', department_id: 'dept-cse', semester: 3, credit_hours: 4 },
  { id: 'c-ca', name: 'Computer Architecture & Assembly', code: 'CS-202', department_id: 'dept-cse', semester: 3, credit_hours: 4 },
  { id: 'c-ss', name: 'Signals & Systems', code: 'EE-201', department_id: 'dept-cse', semester: 3, credit_hours: 3 },
  { id: 'c-de', name: 'Differential Equations', code: 'MA-201', department_id: 'dept-cse', semester: 3, credit_hours: 3 },

  // Semester 4
  { id: 'c-db', name: 'Database Systems', code: 'CS-203', department_id: 'dept-cse', semester: 4, credit_hours: 4 },
  { id: 'c-os', name: 'Operating Systems', code: 'CS-204', department_id: 'dept-cse', semester: 4, credit_hours: 4 },
  { id: 'c-cn', name: 'Computer Networks', code: 'CS-205', department_id: 'dept-cse', semester: 4, credit_hours: 4 },

  // Semester 5 (Current active semester for Ahmad)
  { id: 'c-se', name: 'Software Engineering', code: 'CS-301', department_id: 'dept-cse', semester: 5, credit_hours: 3 },
  { id: 'c-cc', name: 'Compiler Construction', code: 'CS-302', department_id: 'dept-cse', semester: 5, credit_hours: 3 },
  { id: 'c-automata', name: 'Theory of Automata', code: 'CS-303', department_id: 'dept-cse', semester: 5, credit_hours: 3 },
  { id: 'c-micro', name: 'Microprocessor & Interfacing', code: 'CS-304', department_id: 'dept-cse', semester: 5, credit_hours: 4 },

  // Semester 6
  { id: 'c-ai', name: 'Artificial Intelligence', code: 'CS-305', department_id: 'dept-cse', semester: 6, credit_hours: 4 },
  { id: 'c-web', name: 'Web Engineering', code: 'CS-306', department_id: 'dept-cse', semester: 6, credit_hours: 4 },
  { id: 'c-embed', name: 'Embedded Systems', code: 'CS-307', department_id: 'dept-cse', semester: 6, credit_hours: 4 },

  // Semester 7
  { id: 'c-ml', name: 'Machine Learning', code: 'CS-401', department_id: 'dept-cse', semester: 7, credit_hours: 4 },
  { id: 'c-fyp1', name: 'Final Year Project I', code: 'CSE-498', department_id: 'dept-cse', semester: 7, credit_hours: 3 },
  { id: 'c-elec1', name: 'Mobile App Development (Elective)', code: 'CSE-411', department_id: 'dept-cse', semester: 7, credit_hours: 3 },

  // Semester 8
  { id: 'c-fyp2', name: 'Final Year Project II', code: 'CSE-499', department_id: 'dept-cse', semester: 8, credit_hours: 3 },
  { id: 'c-elec2', name: 'Cloud Computing (Elective)', code: 'CSE-412', department_id: 'dept-cse', semester: 8, credit_hours: 3 },
  { id: 'c-elec3', name: 'Cyber Security (Elective)', code: 'CSE-413', department_id: 'dept-cse', semester: 8, credit_hours: 3 }
];

export const mockProfiles: UserProfile[] = [
  // Admin Page Default
  {
    id: 'prof-admin-1',
    user_id: 'usr-admin-1',
    role: 'admin',
    name: 'Prof. Dr. Muhammad Qasim Usman',
    phone: '+92-300-1234567',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    department_id: 'dept-cse',
    department_name: 'Computer Systems Engineering'
  },
  // Teacher
  {
    id: 'prof-teacher-1',
    user_id: 'usr-teacher-1',
    role: 'teacher',
    name: 'Dr. Saad Malik',
    phone: '+92-321-7654321',
    avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    department_id: 'dept-cse',
    department_name: 'Computer Systems Engineering'
  },
  // Student - Primary Demo Student
  {
    id: 'prof-student-1',
    user_id: 'usr-student-1',
    role: 'student',
    name: 'Ahmad Hassan',
    reg_number: '2021-CSE-001',
    department_id: 'dept-cse',
    department_name: 'Computer Systems Engineering',
    semester: 5,
    phone: '+92-333-5551212',
    avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200'
  },
  // Additional Students for admin listing
  {
    id: 'prof-student-2',
    user_id: 'usr-student-2',
    role: 'student',
    name: 'Zainab Fatima',
    reg_number: '2021-CSE-002',
    department_id: 'dept-cse',
    department_name: 'Computer Systems Engineering',
    semester: 5,
    phone: '+92-333-1112223',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'prof-student-3',
    user_id: 'usr-student-3',
    role: 'student',
    name: 'Osman Khan',
    reg_number: '2022-CSE-015',
    department_id: 'dept-cse',
    department_name: 'Computer Systems Engineering',
    semester: 3,
    phone: '+92-334-4445556',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  }
];

export const mockTeacherCourses = [
  { id: 'tc-1', teacher_id: 'prof-teacher-1', course_id: 'c-se', academic_year: '2025-2026' },
  { id: 'tc-2', teacher_id: 'prof-teacher-1', course_id: 'c-micro', academic_year: '2025-2026' },
  { id: 'tc-3', teacher_id: 'prof-teacher-1', course_id: 'c-dsa', academic_year: '2024-2025' }
];

export const mockNotices: Notice[] = [
  {
    id: 'n-1',
    title: 'Midterm Examination Schedule — Fall 2026',
    content: 'All student sections of DCSE are hereby notified that the midterm examinations of Semester 5 and Semester 3 will commence from October 12, 2026. Detailed seating arrangements and paper schedules have been uploaded. Ensure to carry your Digital and Physical ID Cards.',
    type: 'exam',
    created_by: 'prof-admin-1',
    created_by_name: 'Prof. Dr. Muhammad Qasim Usman',
    department_id: 'dept-cse',
    created_at: '2026-06-15T09:00:00Z'
  },
  {
    id: 'n-2',
    title: 'Software Engineering Project Phase 1 Submission',
    content: 'Dr. Saad Malik has extended the submission deadline for Semester 5 Project Phase 1 (Software Requirements Specification Document) to June 25, 2026. Submissions must be uploaded directly as PDF/ZIP on the student portal.',
    type: 'academic',
    created_by: 'prof-teacher-1',
    created_by_name: 'Dr. Saad Malik',
    department_id: 'dept-cse',
    created_at: '2026-06-17T12:30:00Z'
  },
  {
    id: 'n-3',
    title: 'Annual Robotic Competition (Robotron 2026) Registration',
    content: 'The Department of Computer Systems Engineering (DCSE) is host to Robotron 2026 this physical year. Teams of up to 4 members are invited to register in categories: Speed-car wire tracking, Robo-war, and Innovative Drone designs. Registration closes next Friday.',
    type: 'event',
    created_by: 'prof-admin-1',
    created_by_name: 'Prof. Dr. Muhammad Qasim Usman',
    department_id: 'dept-cse',
    created_at: '2026-06-14T08:00:00Z'
  }
];

export const mockAssignments: Assignment[] = [
  {
    id: 'asg-1',
    course_id: 'c-se',
    course_name: 'Software Engineering',
    course_code: 'CS-301',
    teacher_id: 'prof-teacher-1',
    teacher_name: 'Dr. Saad Malik',
    title: 'SRS Document Creation',
    description: 'Prepare a complete Software Requirements Specification (SRS) document for your allocated team project based on IEEE 830 standards. Focus on Functional and Non-functional specifications.',
    due_date: '2026-06-25T23:59:00Z',
    total_marks: 20,
    file_url: '#'
  },
  {
    id: 'asg-2',
    course_id: 'c-micro',
    course_name: 'Microprocessor & Interfacing',
    course_code: 'CS-304',
    teacher_id: 'prof-teacher-1',
    teacher_name: 'Dr. Saad Malik',
    title: '8086 Assembly Traffic Light Controller',
    description: 'Write an assembly language program for the Intel 8086 microprocessor to simulate a 4-way traffic light controller with customized yellow timeouts. Deliver in .asm and report in PDF.',
    due_date: '2026-06-22T18:00:00Z',
    total_marks: 15,
    file_url: '#'
  }
];

export const mockSubmissions: AssignmentSubmission[] = [
  {
    id: 'sub-1',
    assignment_id: 'asg-2',
    assignment_title: '8086 Assembly Traffic Light Controller',
    student_id: 'prof-student-1',
    student_name: 'Ahmad Hassan',
    student_reg: '2021-CSE-001',
    file_url: 'traffic_controller_ahmad.asm',
    submitted_at: '2026-06-18T05:30:00Z',
    marks_obtained: 14,
    feedback: 'Excellent timing logic, Assembly program passes all emulator cases successfully.',
    status: 'graded'
  }
];

export const mockNotes: Note[] = [
  {
    id: 'nte-1',
    course_id: 'c-se',
    course_name: 'Software Engineering',
    uploaded_by: 'prof-teacher-1',
    uploaded_by_name: 'Dr. Saad Malik',
    title: 'IEEE 830 SRS Template & Guidelines',
    description: 'Official standard document structure for specifying software requirements in our project deliveries.',
    file_url: '#',
    created_at: '2026-06-10T10:00:00Z'
  },
  {
    id: 'nte-2',
    course_id: 'c-micro',
    course_name: 'Microprocessor & Interfacing',
    uploaded_by: 'prof-teacher-1',
    uploaded_by_name: 'Dr. Saad Malik',
    title: '8086 Assembly Instruction Set Reference cheat-sheet',
    description: 'List of all registers, addressing modes, and essential interrupts (INT 21H, etc.) for lab practice.',
    file_url: '#',
    created_at: '2026-06-12T07:30:00Z'
  }
];

export const mockLabReports: LabReport[] = [
  {
    id: 'lab-1',
    student_id: 'prof-student-1',
    student_name: 'Ahmad Hassan',
    course_id: 'c-micro',
    course_name: 'Microprocessor & Interfacing Lab',
    title: 'Lab 5: Seven Segment Display Interfacing via 8255 PPI',
    file_url: 'Ahmad_Hassan_Lab5_Report.pdf',
    submitted_at: '2026-06-14T11:00:00Z',
    grade: 'A'
  }
];

export const mockProjects: SemesterProject[] = [
  {
    id: 'proj-1',
    student_id: 'prof-student-1',
    student_name: 'Ahmad Hassan',
    course_id: 'c-se',
    course_name: 'Software Engineering Project',
    title: 'UET Campus Navigation Portal with Pathfinding',
    description: 'A React-based dynamic pathfinder utilizing Dijkstra algorithms to map campus classrooms and lab locations in the web app.',
    file_url: 'uet_navigation_synopsis.pdf',
    status: 'approved',
    created_at: '2026-06-08T09:00:00Z'
  }
];

export const mockPreviousPapers: PreviousPaper[] = [
  {
    id: 'pp-1',
    course_id: 'c-se',
    course_name: 'Software Engineering',
    year: 2025,
    exam_type: 'mid',
    file_url: '#'
  },
  {
    id: 'pp-2',
    course_id: 'c-micro',
    course_name: 'Microprocessor & Interfacing',
    year: 2025,
    exam_type: 'final',
    file_url: '#'
  }
];

export const mockAttendance: Attendance[] = [
  { id: 'att-1', student_id: 'prof-student-1', course_id: 'c-se', course_name: 'Software Engineering', course_code: 'CS-301', semester: 5, mode: 2, percentage: 95, total_lectures: 20, attended_lectures: 19 },
  { id: 'att-2', student_id: 'prof-student-1', course_id: 'c-micro', course_name: 'Microprocessor & Interfacing', course_code: 'CS-304', semester: 5, mode: 2, percentage: 92, total_lectures: 25, attended_lectures: 23 },
  { id: 'att-3', student_id: 'prof-student-1', course_id: 'c-cc', course_name: 'Compiler Construction', course_code: 'CS-302', semester: 5, mode: 2, percentage: 88, total_lectures: 16, attended_lectures: 14 },
  { id: 'att-4', student_id: 'prof-student-1', course_id: 'c-automata', course_name: 'Theory of Automata', course_code: 'CS-303', semester: 5, mode: 2, percentage: 100, total_lectures: 18, attended_lectures: 18 }
];

export const mockResults: Result[] = [
  // Semester 1
  { id: 'res-s1-1', student_id: 'prof-student-1', course_id: 'c-pf', course_name: 'Programming Fundamentals', course_code: 'CS-101', semester: 1, quiz_marks: 18, assignment_marks: 19, mid_marks: 28, final_marks: 43, total_marks: 90, grade: 'A', gpa: 4.0 },
  { id: 'res-s1-2', student_id: 'prof-student-1', course_id: 'c-calc', course_name: 'Calculus & Analytical Geometry', course_code: 'MA-101', semester: 1, quiz_marks: 14, assignment_marks: 15, mid_marks: 22, final_marks: 34, total_marks: 75, grade: 'B', gpa: 3.0 },
  { id: 'res-s1-3', student_id: 'prof-student-1', course_id: 'c-phys', course_name: 'Applied Physics', course_code: 'PH-101', semester: 1, quiz_marks: 16, assignment_marks: 18, mid_marks: 24, final_marks: 40, total_marks: 82, grade: 'A-', gpa: 3.7 },
  { id: 'res-s1-4', student_id: 'prof-student-1', course_id: 'c-eng1', course_name: 'Functional English', course_code: 'HU-101', semester: 1, quiz_marks: 15, assignment_marks: 17, mid_marks: 25, final_marks: 38, total_marks: 79, grade: 'B+', gpa: 3.3 },
  { id: 'res-s1-5', student_id: 'prof-student-1', course_id: 'c-islam', course_name: 'Islamic Studies', course_code: 'HU-102', semester: 1, quiz_marks: 10, assignment_marks: 10, mid_marks: 15, final_marks: 25, total_marks: 85, grade: 'A', gpa: 4.0 },

  // Semester 2
  { id: 'res-s2-1', student_id: 'prof-student-1', course_id: 'c-oop', course_name: 'Object Oriented Programming', course_code: 'CS-102', semester: 2, quiz_marks: 17, assignment_marks: 18, mid_marks: 26, final_marks: 41, total_marks: 86, grade: 'A', gpa: 4.0 },
  { id: 'res-s2-2', student_id: 'prof-student-1', course_id: 'c-la', course_name: 'Linear Algebra', course_code: 'MA-102', semester: 2, quiz_marks: 15, assignment_marks: 16, mid_marks: 21, final_marks: 33, total_marks: 70, grade: 'B-', gpa: 2.7 },
  { id: 'res-s2-3', student_id: 'prof-student-1', course_id: 'c-dld', course_name: 'Digital Logic Design', course_code: 'EE-102', semester: 2, quiz_marks: 14, assignment_marks: 15, mid_marks: 24, final_marks: 37, total_marks: 76, grade: 'B+', gpa: 3.3 },

  // Semester 3
  { id: 'res-s3-1', student_id: 'prof-student-1', course_id: 'c-dsa', course_name: 'Data Structures & Algorithms', course_code: 'CS-201', semester: 3, quiz_marks: 18, assignment_marks: 18, mid_marks: 27, final_marks: 42, total_marks: 89, grade: 'A', gpa: 4.0 },
  { id: 'res-s3-2', student_id: 'prof-student-1', course_id: 'c-ss', course_name: 'Signals & Systems', course_code: 'EE-201', semester: 3, quiz_marks: 13, assignment_marks: 14, mid_marks: 20, final_marks: 30, total_marks: 67, grade: 'C+', gpa: 2.3 },
  { id: 'res-s3-3', student_id: 'prof-student-1', course_id: 'c-de', course_name: 'Differential Equations', course_code: 'MA-201', semester: 3, quiz_marks: 16, assignment_marks: 15, mid_marks: 23, final_marks: 35, total_marks: 74, grade: 'B', gpa: 3.0 },

  // Semester 4
  { id: 'res-s4-1', student_id: 'prof-student-1', course_id: 'c-db', course_name: 'Database Systems', course_code: 'CS-203', semester: 4, quiz_marks: 17, assignment_marks: 18, mid_marks: 28, final_marks: 44, total_marks: 91, grade: 'A', gpa: 4.0 },
  { id: 'res-s4-2', student_id: 'prof-student-1', course_id: 'c-os', course_name: 'Operating Systems', course_code: 'CS-204', semester: 4, quiz_marks: 15, assignment_marks: 17, mid_marks: 25, final_marks: 37, total_marks: 78, grade: 'B+', gpa: 3.3 },
  { id: 'res-s4-3', student_id: 'prof-student-1', course_id: 'c-cn', course_name: 'Computer Networks', course_code: 'CS-205', semester: 4, quiz_marks: 16, assignment_marks: 16, mid_marks: 23, final_marks: 36, total_marks: 75, grade: 'B', gpa: 3.0 }
];

export const mockFeedback: Feedback[] = [
  {
    id: 'fb-1',
    student_id: 'prof-student-1',
    student_name: 'Ahmad Hassan',
    student_reg: '2021-CSE-001',
    type: 'Academic',
    subject: 'Additional Reference Books in Library',
    message: 'Requesting the library board to obtain newer volumes of "Computer Architecture - A Quantitative Approach" by Hennessy & Patterson.',
    status: 'pending',
    created_at: '2026-06-13T10:00:00Z'
  }
];

export const mockFees: Fee[] = [
  { id: 'fee-5', student_id: 'prof-student-1', semester: 5, total_fee: 65000, paid_fee: 65000, due_date: '2026-06-30', status: 'paid' },
  { id: 'fee-6', student_id: 'prof-student-1', semester: 6, total_fee: 65000, paid_fee: 0, due_date: '2026-11-15', status: 'unpaid' }
];

export const mockTimetable: TimetableEntry[] = [
  { id: 'tt-1', course_id: 'c-se', course_name: 'Software Engineering', course_code: 'CS-301', teacher_name: 'Dr. Saad Malik', day_of_week: 'monday', time_start: '08:30', time_end: '10:00', room: 'DCSE Hall 1', semester: 5 },
  { id: 'tt-2', course_id: 'c-micro', course_name: 'Microprocessor & Interfacing', course_code: 'CS-304', teacher_name: 'Dr. Saad Malik', day_of_week: 'monday', time_start: '10:15', time_end: '11:45', room: 'Processor Lab 2', semester: 5 },
  { id: 'tt-3', course_id: 'c-se', course_name: 'Software Engineering', course_code: 'CS-301', teacher_name: 'Dr. Saad Malik', day_of_week: 'wednesday', time_start: '08:30', time_end: '10:00', room: 'DCSE Hall 1', semester: 5 },
  { id: 'tt-4', course_id: 'c-cc', course_name: 'Compiler Construction', course_code: 'CS-302', teacher_name: 'Prof. Dr. Ali Sajid', day_of_week: 'wednesday', time_start: '10:15', time_end: '11:45', room: 'DCSE Hall 3', semester: 5 },
  { id: 'tt-5', course_id: 'c-automata', course_name: 'Theory of Automata', course_code: 'CS-303', teacher_name: 'Prof. Dr. Ali Sajid', day_of_week: 'thursday', time_start: '12:00', time_end: '13:30', room: 'DCSE Hall 2', semester: 5 },
  { id: 'tt-6', course_id: 'c-micro', course_name: 'Microprocessor & Interfacing', course_code: 'CS-304', teacher_name: 'Dr. Saad Malik', day_of_week: 'friday', time_start: '09:00', time_end: '10:30', room: 'Processor Lab 2', semester: 5 }
];

export const mockCalendarEvents: CalendarEvent[] = [
  { id: 'ce-1', title: 'Fall Course Registration Opens', event_type: 'academic', start_date: '2026-09-01', end_date: '2026-09-05', description: 'Students can register online via Course registration module.' },
  { id: 'ce-2', title: 'Independence Day Holiday', event_type: 'holiday', start_date: '2026-08-14', end_date: '2026-08-14', description: 'National Holiday' },
  { id: 'ce-3', title: 'Mid Semester Exams', event_type: 'exam', start_date: '2026-10-12', end_date: '2026-10-18', description: 'Mid term exams for all departments.' },
  { id: 'ce-4', title: 'Robotics Exhibition', event_type: 'social', start_date: '2026-11-05', end_date: '2026-11-06', description: 'Robotron 2026 annual showcase.' }
];

export const mockBooks: LibraryBook[] = [
  { id: 'bk-1', title: 'Software Engineering: A Practitioner\'s Approach', author: 'Roger S. Pressman', isbn: '9780078022128', category: 'Software Engineering', total_copies: 10, available_copies: 8 },
  { id: 'bk-2', title: 'Computer Architecture: A Quantitative Approach', author: 'John L. Hennessy & David A. Patterson', isbn: '9780123838728', category: 'Hardware Systems', total_copies: 5, available_copies: 2 },
  { id: 'bk-3', title: 'Intel Microprocessors 8086/8088, 80186/80188', author: 'Barry B. Brey', isbn: '9780135026458', category: 'Microprocessors', total_copies: 8, available_copies: 5 }
];

export const mockBorrowings: BookBorrowing[] = [
  { id: 'bor-1', book_id: 'bk-1', book_title: 'Software Engineering: A Practitioner\'s Approach', student_id: 'prof-student-1', borrowed_at: '2026-06-05', due_date: '2026-06-20', status: 'borrowed' }
];

export const mockHostelRooms: HostelRoom[] = [
  { id: 'room-101', room_number: '101', block: 'Liaquat Hall (A)', capacity: 3, occupied_count: 2, type: 'Triple Share', fee_per_month: 2500 },
  { id: 'room-204', room_number: '204', block: 'Ghazali Hall (B)', capacity: 2, occupied_count: 2, type: 'Double Share', fee_per_month: 4000 }
];

export const mockHostelAssignments: HostelAssignment[] = [
  { id: 'ha-1', student_id: 'prof-student-1', room_id: 'room-101', room_number: '101', block: 'Liaquat Hall (A)', assigned_at: '2024-09-15', status: 'active' }
];

export const mockInternships: Internship[] = [
  { id: 'int-1', company: 'Systems Limited', role: 'Associate Software Engineer (React / Node)', description: 'Work with the Cloud systems division developing enterprise digital commerce solutions under expert guidance.', deadline: '2026-07-15', salary: 'PKR 45,000/month', location: 'Lahore (On-site)', type: 'Internee', created_at: '2026-06-15' },
  { id: 'int-2', company: 'Netsol Technologies', role: 'Embedded Firmware Engineering Intern', description: 'Assist the smart telematics hardware development team writing C/C++ firmware programs for IoT nodes.', deadline: '2026-07-20', salary: 'PKR 40,000/month', location: 'Remote', type: 'Internee', created_at: '2026-06-16' }
];

export const mockInternshipApplications: InternshipApplication[] = [
  { id: 'ia-1', internship_id: 'int-1', internship_role: 'Associate Software Engineer (React / Node)', internship_company: 'Systems Limited', student_id: 'prof-student-1', status: 'shortlisted', applied_at: '2026-06-16' }
];

export const mockPlacements: JobPlacement[] = [
  { id: 'pl-1', company: 'Arbitsoft', role: 'Full Stack Engineer', description: 'Join a hyper-growing SaaS builder software house as junior full stack developer.', salary: 'PKR 100,000 - 140,000/month', deadline: '2026-08-01', requirements: ['React', 'NodeJS', 'PostgreSQL', 'Tailwind CSS'], created_at: '2026-06-12' }
];

export const mockForumPosts: ForumPost[] = [
  { id: 'fp-1', course_id: 'c-se', course_name: 'Software Engineering', author_id: 'prof-student-1', author_name: 'Ahmad Hassan', author_role: 'student', author_avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200', title: 'IEEE 830 Specification Confusion on Use Cases vs Dataflows', content: 'In doing software requirements specification, does the IEEE 830 standard demand detailed activity diagrams for every singular minor use case, or can we merge them together in logical domains?', created_at: '2026-06-15T15:20:00Z' },
  { id: 'fp-2', course_id: 'c-se', course_name: 'Software Engineering', author_id: 'prof-teacher-1', author_name: 'Dr. Saad Malik', author_role: 'teacher', author_avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200', title: 'Tips for SRS Phase 1 Project Submissions', content: 'Focus strictly on scoping. Overly massive software products with 50+ vague modules will receive low scores. Work on a robust, verifiable system description of 5 core functions with detailed state machine drawings.', created_at: '2026-06-16T10:00:00Z' }
];

export const mockForumComments: ForumComment[] = [
  { id: 'fc-1', post_id: 'fp-1', author_id: 'prof-teacher-1', author_name: 'Dr. Saad Malik', author_role: 'teacher', author_avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200', content: 'Ahmed! It is best to present a high-level main Use Case diagram, and then write specific textual specification bullet cases. Full details on minor routes can be detailed in sequence diagram maps later in Phase 2.', created_at: '2026-06-15T18:30:00Z' }
];

export const mockUniversitySettings: UniversitySettings = {
  id: 'us-1',
  name: 'University of Engineering and Technology',
  logo_url: '🎓',
  website_name: 'UET Student Hub',
  contact_email: 'portal.admin@uet.edu.pk',
  contact_phone: '+92-42-99029000',
  address: 'G.T. Road, Lahore, Pakistan',
  default_theme: 'navy' as any,
  dev_name: 'Muhammad Qasim Usman',
  dev_pic: '/src/assets/images/dev_photo_1781959281322.jpg',
  dev_dept: 'Computer Systems Engineering',
  dev_univ: 'University of Engineering and Technology (UET) Peshawar',
  dev_bio: 'Muhammad Qasim Usman is a Computer Systems Engineering student at the University of Engineering and Technology (UET) Peshawar. He is passionate about software development, web technologies, system design, and innovative educational solutions. UET Student Hub was created to provide students, teachers, and administrators with a modern digital platform for academic management and collaboration.',
  dev_skills: 'React, TypeScript, Node.js, Tailwind CSS, System Design, Software Engineering',
  dev_email: 'info.qasimusman.cse@gmail.com',
  dev_whatsapp: '+923717090091',
  dev_linkedin: 'https://www.linkedin.com/in/muhammad-qasim-usman-9b26973a1',
  dev_github: '',
  dev_instagram: ''
};

// Simple reactive Local Database state mockup so that edits, uploads, and posts within the app are remembered during current app session!
class LocalDB {
  private _profiles!: UserProfile[];
  private _notices!: Notice[];
  private _assignments!: Assignment[];
  private _submissions!: AssignmentSubmission[];
  private _notes!: Note[];
  private _labReports!: LabReport[];
  private _projects!: SemesterProject[];
  private _previousPapers!: PreviousPaper[];
  private _attendance!: Attendance[];
  private _results!: Result[];
  private _feedback!: Feedback[];
  private _fees!: Fee[];
  private _timetable!: TimetableEntry[];
  private _calendarEvents!: CalendarEvent[];
  private _books!: LibraryBook[];
  private _borrowings!: BookBorrowing[];
  private _hostelRooms!: HostelRoom[];
  private _hostelAssignments!: HostelAssignment[];
  private _internships!: Internship[];
  private _internshipApplications!: InternshipApplication[];
  private _placements!: JobPlacement[];
  private _forumPosts!: ForumPost[];
  private _forumComments!: ForumComment[];
  private _settings!: UniversitySettings;
  private _courses!: Course[];
  private _departments!: Department[];

  private load<T>(key: string, defaultValue: T): T {
    try {
      const val = localStorage.getItem(`uet_db_${key}`);
      return val ? JSON.parse(val) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }

  private save<T>(key: string, value: T) {
    try {
      localStorage.setItem(`uet_db_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  }

  private makeProxy<T>(key: string, initial: T[]): T[] {
    const raw = this.load(key, initial);
    const self = this;
    return new Proxy(raw, {
      set(target, prop, value, receiver) {
        const ret = Reflect.set(target, prop, value, receiver);
        self.save(key, target);
        // Force state saves to ensure local storage syncs immediately
        return ret;
      },
      deleteProperty(target, prop) {
        const ret = Reflect.deleteProperty(target, prop);
        self.save(key, target);
        return ret;
      }
    });
  }

  constructor() {
    this._profiles = this.makeProxy('profiles', mockProfiles);
    this._notices = this.makeProxy('notices', mockNotices);
    this._assignments = this.makeProxy('assignments', mockAssignments);
    this._submissions = this.makeProxy('submissions', mockSubmissions);
    this._notes = this.makeProxy('notes', mockNotes);
    this._labReports = this.makeProxy('labReports', mockLabReports);
    this._projects = this.makeProxy('projects', mockProjects);
    this._previousPapers = this.makeProxy('previousPapers', mockPreviousPapers);
    this._attendance = this.makeProxy('attendance', mockAttendance);
    this._results = this.makeProxy('results', mockResults);
    this._feedback = this.makeProxy('feedback', mockFeedback);
    this._fees = this.makeProxy('fees', mockFees);
    this._timetable = this.makeProxy('timetable', mockTimetable);
    this._calendarEvents = this.makeProxy('calendarEvents', mockCalendarEvents);
    this._books = this.makeProxy('books', mockBooks);
    this._borrowings = this.makeProxy('borrowings', mockBorrowings);
    this._hostelRooms = this.makeProxy('hostelRooms', mockHostelRooms);
    this._hostelAssignments = this.makeProxy('hostelAssignments', mockHostelAssignments);
    this._internships = this.makeProxy('internships', mockInternships);
    this._internshipApplications = this.makeProxy('internshipApplications', mockInternshipApplications);
    this._placements = this.makeProxy('placements', mockPlacements);
    this._forumPosts = this.makeProxy('forumPosts', mockForumPosts);
    this._forumComments = this.makeProxy('forumComments', mockForumComments);
    this._settings = this.load('settings', mockUniversitySettings);
    this._courses = this.makeProxy('courses', mockCourses);
    this._departments = this.makeProxy('departments', mockDepartments);
  }

  get profiles() { return this._profiles; }
  set profiles(val) { this._profiles = this.makeProxy('profiles', val); this.save('profiles', val); }

  get notices() { return this._notices; }
  set notices(val) { this._notices = this.makeProxy('notices', val); this.save('notices', val); }

  get assignments() { return this._assignments; }
  set assignments(val) { this._assignments = this.makeProxy('assignments', val); this.save('assignments', val); }

  get submissions() { return this._submissions; }
  set submissions(val) { this._submissions = this.makeProxy('submissions', val); this.save('submissions', val); }

  get notes() { return this._notes; }
  set notes(val) { this._notes = this.makeProxy('notes', val); this.save('notes', val); }

  get labReports() { return this._labReports; }
  set labReports(val) { this._labReports = this.makeProxy('labReports', val); this.save('labReports', val); }

  get projects() { return this._projects; }
  set projects(val) { this._projects = this.makeProxy('projects', val); this.save('projects', val); }

  get previousPapers() { return this._previousPapers; }
  set previousPapers(val) { this._previousPapers = this.makeProxy('previousPapers', val); this.save('previousPapers', val); }

  get attendance() { return this._attendance; }
  set attendance(val) { this._attendance = this.makeProxy('attendance', val); this.save('attendance', val); }

  get results() { return this._results; }
  set results(val) { this._results = this.makeProxy('results', val); this.save('results', val); }

  get feedback() { return this._feedback; }
  set feedback(val) { this._feedback = this.makeProxy('feedback', val); this.save('feedback', val); }

  get fees() { return this._fees; }
  set fees(val) { this._fees = this.makeProxy('fees', val); this.save('fees', val); }

  get timetable() { return this._timetable; }
  set timetable(val) { this._timetable = this.makeProxy('timetable', val); this.save('timetable', val); }

  get calendarEvents() { return this._calendarEvents; }
  set calendarEvents(val) { this._calendarEvents = this.makeProxy('calendarEvents', val); this.save('calendarEvents', val); }

  get books() { return this._books; }
  set books(val) { this._books = this.makeProxy('books', val); this.save('books', val); }

  get borrowings() { return this._borrowings; }
  set borrowings(val) { this._borrowings = this.makeProxy('borrowings', val); this.save('borrowings', val); }

  get hostelRooms() { return this._hostelRooms; }
  set hostelRooms(val) { this._hostelRooms = this.makeProxy('hostelRooms', val); this.save('hostelRooms', val); }

  get hostelAssignments() { return this._hostelAssignments; }
  set hostelAssignments(val) { this._hostelAssignments = this.makeProxy('hostelAssignments', val); this.save('hostelAssignments', val); }

  get internships() { return this._internships; }
  set internships(val) { this._internships = this.makeProxy('internships', val); this.save('internships', val); }

  get internshipApplications() { return this._internshipApplications; }
  set internshipApplications(val) { this._internshipApplications = this.makeProxy('internshipApplications', val); this.save('internshipApplications', val); }

  get placements() { return this._placements; }
  set placements(val) { this._placements = this.makeProxy('placements', val); this.save('placements', val); }

  get forumPosts() { return this._forumPosts; }
  set forumPosts(val) { this._forumPosts = this.makeProxy('forumPosts', val); this.save('forumPosts', val); }

  get forumComments() { return this._forumComments; }
  set forumComments(val) { this._forumComments = this.makeProxy('forumComments', val); this.save('forumComments', val); }

  get settings() { return this._settings; }
  set settings(val) { this._settings = val; this.save('settings', val); }

  get courses() { return this._courses; }
  set courses(val) { this._courses = this.makeProxy('courses', val); this.save('courses', val); }

  get departments() { return this._departments; }
  set departments(val) { this._departments = this.makeProxy('departments', val); this.save('departments', val); }

  // Simple state update triggers
  postToForum(title: string, content: string, courseId: string, studentId: string) {
    const student = this.profiles.find(p => p.id === studentId);
    if (!student) return null;
    const newPost: ForumPost = {
      id: `fp-${Date.now()}`,
      course_id: courseId,
      course_name: mockCourses.find(c => c.id === courseId)?.name,
      author_id: student.id,
      author_name: student.name,
      author_role: student.role,
      author_avatar: student.avatar_url,
      title,
      content,
      created_at: new Date().toISOString()
    };
    this.forumPosts.unshift(newPost);
    return newPost;
  }

  addComment(postId: string, content: string, authorId: string) {
    const p = this.profiles.find(x => x.id === authorId);
    if (!p) return null;
    const comm: ForumComment = {
      id: `fc-${Date.now()}`,
      post_id: postId,
      author_id: p.id,
      author_name: p.name,
      author_role: p.role,
      author_avatar: p.avatar_url,
      content,
      created_at: new Date().toISOString()
    };
    this.forumComments.push(comm);
    return comm;
  }

  addFeedback(studentId: string, type: string, subject: string, message: string) {
    const p = this.profiles.find(x => x.id === studentId);
    const newFb: Feedback = {
      id: `fb-${Date.now()}`,
      student_id: studentId,
      student_name: p?.name,
      student_reg: p?.reg_number,
      type,
      subject,
      message,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    this.feedback.unshift(newFb);
    return newFb;
  }

  addAssignment(courseId: string, teacherId: string, title: string, description: string, dueDate: string, totalMarks: number) {
    const teacher = this.profiles.find(p => p.id === teacherId);
    const course = mockCourses.find(c => c.id === courseId);
    const newAsg: Assignment = {
      id: `asg-${Date.now()}`,
      course_id: courseId,
      course_name: course?.name,
      course_code: course?.code,
      teacher_id: teacherId,
      teacher_name: teacher?.name,
      title,
      description,
      due_date: new Date(dueDate).toISOString(),
      total_marks: totalMarks
    };
    this.assignments.unshift(newAsg);
    return newAsg;
  }

  submitAssignment(assignmentId: string, studentId: string, filename: string) {
    const student = this.profiles.find(p => p.id === studentId);
    const asg = this.assignments.find(a => a.id === assignmentId);
    const newSub: AssignmentSubmission = {
      id: `sub-${Date.now()}`,
      assignment_id: assignmentId,
      assignment_title: asg?.title,
      student_id: studentId,
      student_name: student?.name,
      student_reg: student?.reg_number,
      file_url: filename,
      submitted_at: new Date().toISOString(),
      status: 'pending'
    };
    this.submissions.unshift(newSub);
    return newSub;
  }

  addLabReport(studentId: string, courseId: string, title: string, fileUrl: string) {
    const student = this.profiles.find(p => p.id === studentId);
    const course = mockCourses.find(c => c.id === courseId);
    const newLab: LabReport = {
      id: `lab-${Date.now()}`,
      student_id: studentId,
      student_name: student?.name,
      course_id: courseId,
      course_name: course?.name,
      title,
      file_url: fileUrl,
      submitted_at: new Date().toISOString()
    };
    this.labReports.unshift(newLab);
    return newLab;
  }

  addNote(courseId: string, teacherId: string, title: string, description: string, fileUrl: string) {
    const teacher = this.profiles.find(p => p.id === teacherId);
    const course = mockCourses.find(c => c.id === courseId);
    const newNote: Note = {
      id: `nte-${Date.now()}`,
      course_id: courseId,
      course_name: course?.name,
      uploaded_by: teacherId,
      uploaded_by_name: teacher?.name,
      title,
      description,
      file_url: fileUrl,
      created_at: new Date().toISOString()
    };
    this.notes.unshift(newNote);
    return newNote;
  }

  addNotice(title: string, content: string, type: 'general' | 'academic' | 'exam' | 'event', departmentId?: string) {
    const newNotice: Notice = {
      id: `n-${Date.now()}`,
      title,
      content,
      type,
      created_by: 'prof-admin-1',
      created_by_name: 'Prof. Dr. Muhammad Qasim Usman',
      department_id: departmentId || 'dept-cse',
      created_at: new Date().toISOString()
    };
    this.notices.unshift(newNotice);
    return newNotice;
  }

  payFee(feeId: string) {
    const feeIndex = this.fees.findIndex(f => f.id === feeId);
    if (feeIndex > -1) {
      this.fees[feeIndex].status = 'paid';
      return true;
    }
    return false;
  }

  addForumPost(studentId: string, studentName: string, courseId: string, courseName: string, title: string, content: string) {
    const student = this.profiles.find(p => p.id === studentId);
    const newPost: ForumPost = {
      id: `fp-${Date.now()}`,
      course_id: courseId,
      course_name: courseName,
      author_id: studentId,
      author_name: studentName,
      author_role: student?.role || 'student',
      author_avatar: student?.avatar_url || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=100',
      title,
      content,
      created_at: new Date().toISOString()
    };
    this.forumPosts.unshift(newPost);
    return newPost;
  }

  addForumReply(postId: string, authorName: string, content: string) {
    const comm: ForumComment = {
      id: `fc-${Date.now()}`,
      post_id: postId,
      author_id: 'reply-author',
      author_name: authorName,
      author_role: 'student',
      author_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      content,
      created_at: new Date().toISOString()
    };
    this.forumComments.push(comm);
    return true;
  }

  updateAttendance(recordId: string, diffAttended: number, diffTotal: number) {
    const item = this.attendance.find(a => a.id === recordId);
    if (item) {
      const newAttended = Math.max(0, item.attended_lectures + diffAttended);
      const newTotal = Math.max(newAttended, item.total_lectures + diffTotal);
      item.attended_lectures = newAttended;
      item.total_lectures = newTotal;
      item.percentage = newTotal > 0 ? Math.round((newAttended / newTotal) * 100) : 100;
      return item;
    }
    return null;
  }

  updateStudentResult(id: string, quiz_marks: number, assignment_marks: number, midterm_marks: number, final_marks: number, total_marks: number, grade: string, gpa: number) {
    const r = this.results.find(x => x.id === id);
    if (r) {
      r.quiz_marks = quiz_marks;
      r.assignment_marks = assignment_marks;
      r.mid_marks = midterm_marks;
      r.final_marks = final_marks;
      r.total_marks = total_marks;
      r.grade = grade;
      r.gpa = gpa;
      return true;
    }
    return false;
  }
}

export const uetDB = new LocalDB();
