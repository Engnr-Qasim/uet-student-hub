export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  id: string;
  user_id: string; // clerk user id
  role: UserRole;
  name: string;
  reg_number?: string; // only for student
  department_id?: string;
  department_name?: string;
  semester?: number; // 1-8, only for student
  phone?: string;
  avatar_url?: string;
  created_at?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  logo_url?: string;
  description?: string;
  hod_name?: string;
  created_at?: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  department_id: string;
  semester: number;
  credit_hours: number;
  created_at?: string;
}

export interface TeacherCourse {
  id: string;
  teacher_id: string;
  course_id: string;
  academic_year: string;
}

export interface Assignment {
  id: string;
  course_id: string;
  course_name?: string;
  course_code?: string;
  teacher_id: string;
  teacher_name?: string;
  title: string;
  description: string;
  due_date: string;
  file_url?: string;
  total_marks: number;
  created_at?: string;
}

export interface AssignmentSubmission {
  id: string;
  assignment_id: string;
  assignment_title?: string;
  student_id: string;
  student_name?: string;
  student_reg?: string;
  file_url: string;
  submitted_at: string;
  marks_obtained?: number;
  feedback?: string;
  status: 'pending' | 'graded';
}

export interface Note {
  id: string;
  course_id: string;
  course_name?: string;
  uploaded_by: string; // profile ID representing teacher or admin
  uploaded_by_name?: string;
  title: string;
  description?: string;
  file_url: string;
  created_at?: string;
}

export interface LabReport {
  id: string;
  student_id: string;
  student_name?: string;
  course_id: string;
  course_name?: string;
  title: string;
  file_url: string;
  submitted_at: string;
  grade?: string;
}

export interface SemesterProject {
  id: string;
  student_id: string;
  student_name?: string;
  course_id: string;
  course_name?: string;
  title: string;
  description: string;
  file_url: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
}

export interface PreviousPaper {
  id: string;
  course_id: string;
  course_name?: string;
  year: number;
  exam_type: 'mid' | 'final';
  file_url: string;
  created_at?: string;
}

export interface Attendance {
  id: string;
  student_id: string;
  course_id: string;
  course_name?: string;
  course_code?: string;
  semester: number;
  mode: 1 | 2; // 1 = percentage, 2 = lecture-wise
  percentage: number;
  total_lectures: number;
  attended_lectures: number;
}

export interface AttendanceRecord {
  id: string;
  attendance_id: string;
  date: string;
  status: 'P' | 'A' | 'L'; // Present, Absent, Leave
}

export interface Result {
  id: string;
  student_id: string;
  course_id: string;
  course_name?: string;
  course_code?: string;
  semester: number;
  quiz_marks: number;
  assignment_marks: number;
  mid_marks: number;
  final_marks: number;
  total_marks: number;
  grade: string;
  gpa: number;
  created_at?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'academic' | 'exam' | 'event';
  created_by: string;
  created_by_name?: string;
  department_id?: string;
  created_at: string;
  updated_at?: string;
}

export interface UniversitySettings {
  id: string;
  name: string;
  logo_url: string;
  website_name: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  default_theme: 'light' | 'dark' | 'blue' | 'green';
  updated_at?: string;
}

export interface Feedback {
  id: string;
  student_id: string;
  student_name?: string;
  student_reg?: string;
  type: string;
  subject: string;
  message: string;
  status: 'pending' | 'resolved';
  admin_response?: string;
  created_at: string;
}

export interface Fee {
  id: string;
  student_id: string;
  semester: number;
  total_fee: number;
  paid_fee: number;
  due_date: string;
  status: 'paid' | 'unpaid' | 'partial';
}

export interface FeePayment {
  id: string;
  fee_id: string;
  amount: number;
  payment_date: string;
  transaction_id: string;
  method: string;
}

export interface TimetableEntry {
  id: string;
  course_id: string;
  course_name?: string;
  course_code?: string;
  teacher_name?: string;
  day_of_week: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';
  time_start: string; // e.g. "08:30"
  time_end: string;   // e.g. "10:00"
  room: string;
  semester: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  event_type: 'academic' | 'holiday' | 'exam' | 'social';
  start_date: string;
  end_date: string;
  description: string;
  department_id?: string;
}

export interface CourseRegistration {
  id: string;
  student_id: string;
  course_id: string;
  course_name?: string;
  semester: number;
  academic_year: string;
  registered_at: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface RegistrationPeriod {
  id: string;
  semester: number;
  academic_year: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  total_copies: number;
  available_copies: number;
}

export interface BookBorrowing {
  id: string;
  book_id: string;
  book_title?: string;
  student_id: string;
  borrowed_at: string;
  due_date: string;
  returned_at?: string;
  status: 'borrowed' | 'returned' | 'overdue';
}

export interface HostelRoom {
  id: string;
  room_number: string;
  block: string;
  capacity: number;
  occupied_count: number;
  type: string;
  fee_per_month: number;
}

export interface HostelAssignment {
  id: string;
  student_id: string;
  room_id: string;
  room_number?: string;
  block?: string;
  assigned_at: string;
  vacated_at?: string;
  status: 'active' | 'vacated';
}

export interface UniversityEvent {
  id: string;
  title: string;
  type: string;
  start_date: string;
  end_date: string;
  venue: string;
  description: string;
  organizer: string;
  department_id?: string;
}

export interface EventRegistration {
  id: string;
  event_id: string;
  student_id: string;
  registered_at: string;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  description: string;
  deadline: string;
  salary: string;
  location: string;
  type: string;
  created_at: string;
}

export interface InternshipApplication {
  id: string;
  internship_id: string;
  internship_role?: string;
  internship_company?: string;
  student_id: string;
  status: 'pending' | 'shortlisted' | 'rejected' | 'accepted';
  applied_at: string;
}

export interface JobPlacement {
  id: string;
  company: string;
  role: string;
  description: string;
  salary: string;
  deadline: string;
  requirements: string[];
  created_at: string;
}

export interface ForumPost {
  id: string;
  course_id?: string;
  course_name?: string;
  author_id: string;
  author_name: string;
  author_role: UserRole;
  author_avatar?: string;
  title: string;
  content: string;
  created_at: string;
  updated_at?: string;
}

export interface ForumComment {
  id: string;
  post_id: string;
  author_id: string;
  author_name: string;
  author_role: UserRole;
  author_avatar?: string;
  content: string;
  created_at: string;
}
