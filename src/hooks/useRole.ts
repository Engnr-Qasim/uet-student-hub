import { useProfile } from './useProfile';
import { UserRole } from '../types';

export const useRole = () => {
  const { profile, loading } = useProfile();

  const role: UserRole | null = profile ? profile.role : null;

  const isRole = (checkRoles: UserRole[]) => {
    if (!role) return false;
    return checkRoles.includes(role);
  };

  return {
    role,
    loading,
    isRole,
    hasStudentAccess: role === 'student',
    hasTeacherAccess: role === 'teacher',
    hasAdminAccess: role === 'admin'
  };
};
