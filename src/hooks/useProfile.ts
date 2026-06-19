import { useApp } from '../contexts/AppContext';

export const useProfile = () => {
  const { currentUser, isLoading } = useApp();
  return { profile: currentUser, loading: isLoading };
};
