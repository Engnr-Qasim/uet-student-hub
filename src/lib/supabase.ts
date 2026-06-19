import { createClient } from '@supabase/supabase-js';
import { uetDB } from '../data/mockData';

// Supabase configuration - update with your credentials
const SUPABASE_URL = (import.meta as any).env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

export const IS_SUPABASE_CONFIGURED = 
  SUPABASE_URL && 
  SUPABASE_ANON_KEY && 
  !SUPABASE_URL.includes('your-supabase') && 
  !SUPABASE_ANON_KEY.includes('your-supabase');

// Create authentic client if configured, otherwise create a mock client interface
export const supabase = IS_SUPABASE_CONFIGURED
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : (null as any);

/**
 * Robust data fetch utility that automatically queries Supabase DB if configured,
 * or gracefully falls back to the in-memory `uetDB` sandbox otherwise.
 */
export const dbService = {
  getProfiles: async () => {
    if (IS_SUPABASE_CONFIGURED) {
      try {
        const { data, error } = await supabase.from('profiles').select('*');
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase profiles fetch failed, using mock data:', err);
      }
    }
    return uetDB.profiles;
  },

  getNotices: async (deptId?: string) => {
    if (IS_SUPABASE_CONFIGURED) {
      try {
        const query = supabase.from('notices').select('*').order('created_at', { ascending: false });
        if (deptId) query.eq('department_id', deptId);
        const { data, error } = await query;
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase notice fetch failed:', err);
      }
    }
    return uetDB.notices.filter(n => !deptId || n.department_id === deptId);
  },

  getAssignments: async (courseId?: string) => {
    if (IS_SUPABASE_CONFIGURED) {
      try {
        const query = supabase.from('assignments').select('*');
        if (courseId) query.eq('course_id', courseId);
        const { data, error } = await query;
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase assignments fetch failed:', err);
      }
    }
    return uetDB.assignments.filter(a => !courseId || a.course_id === courseId);
  },

  getSubmissions: async (assignmentId?: string, studentId?: string) => {
    if (IS_SUPABASE_CONFIGURED) {
      try {
        let query = supabase.from('assignment_submissions').select('*');
        if (assignmentId) query = query.eq('assignment_id', assignmentId);
        if (studentId) query = query.eq('student_id', studentId);
        const { data, error } = await query;
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase submissions fetch failed:', err);
      }
    }
    return uetDB.submissions.filter(s => {
      const matchAsg = !assignmentId || s.assignment_id === assignmentId;
      const matchStd = !studentId || s.student_id === studentId;
      return matchAsg && matchStd;
    });
  },

  getNotes: async (courseId?: string) => {
    if (IS_SUPABASE_CONFIGURED) {
      try {
        const query = supabase.from('notes').select('*');
        if (courseId) query.eq('course_id', courseId);
        const { data, error } = await query;
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase notes fetch failed:', err);
      }
    }
    return uetDB.notes.filter(n => !courseId || n.course_id === courseId);
  },

  getAttendance: async (studentId: string) => {
    if (IS_SUPABASE_CONFIGURED) {
      try {
        const { data, error } = await supabase.from('attendance').select('*').eq('student_id', studentId);
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase attendance fetch failed:', err);
      }
    }
    return uetDB.attendance.filter(a => a.student_id === studentId);
  },

  getResults: async (studentId: string) => {
    if (IS_SUPABASE_CONFIGURED) {
      try {
        const { data, error } = await supabase.from('results').select('*').eq('student_id', studentId);
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase results fetch failed:', err);
      }
    }
    return uetDB.results.filter(r => r.student_id === studentId);
  },

  getFeedback: async (studentId?: string) => {
    if (IS_SUPABASE_CONFIGURED) {
      try {
        let query = supabase.from('feedback').select('*');
        if (studentId) query = query.eq('student_id', studentId);
        const { data, error } = await query;
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase feedback fetch failed:', err);
      }
    }
    return uetDB.feedback.filter(f => !studentId || f.student_id === studentId);
  }
};
