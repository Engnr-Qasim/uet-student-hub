import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useApp } from '../../contexts/AppContext';
import { dbService } from '../../lib/supabase';
import { UserProfile } from '../../types';

export const ClerkSync: React.FC = () => {
  const { setCurrentUser, isMockMode } = useApp();
  const { user: clerkUser, isLoaded } = useUser();

  useEffect(() => {
    if (isMockMode) return;

    if (isLoaded && clerkUser) {
      const syncProfile = async () => {
        try {
          const profiles = await dbService.getProfiles();
          const found = profiles.find(p => p.user_id === clerkUser.id);
          if (found) {
            setCurrentUser(found);
          } else {
            const defaultClerkProfile: UserProfile = {
              id: `clerk-${clerkUser.id}`,
              user_id: clerkUser.id,
              role: (clerkUser.publicMetadata?.role as any) || 'student',
              name: clerkUser.fullName || clerkUser.username || 'Clerk User',
              avatar_url: clerkUser.imageUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
            };
            setCurrentUser(defaultClerkProfile);
          }
        } catch (err) {
          console.error('Error syncing Clerk profile:', err);
        }
      };
      syncProfile();
    } else if (isLoaded && !clerkUser) {
      setCurrentUser(null);
    }
  }, [clerkUser, isLoaded, isMockMode, setCurrentUser]);

  return null;
};
