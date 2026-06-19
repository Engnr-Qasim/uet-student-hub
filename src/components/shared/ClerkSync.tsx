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
          const overrideKey = `uet_profile_override_clerk-${clerkUser.id}`;
          const overridden = localStorage.getItem(overrideKey);
          if (overridden) {
            setCurrentUser(JSON.parse(overridden));
          } else {
            const profiles = await dbService.getProfiles();
            const found = profiles.find(p => p.user_id === clerkUser.id);
            if (found) {
              const foundOverridden = localStorage.getItem(`uet_profile_override_${found.id}`);
              if (foundOverridden) {
                setCurrentUser(JSON.parse(foundOverridden));
              } else {
                setCurrentUser(found);
              }
            } else {
              const defaultClerkProfile: UserProfile = {
                id: `clerk-${clerkUser.id}`,
                user_id: clerkUser.id,
                role: (clerkUser.publicMetadata?.role as any) || 'student',
                name: clerkUser.fullName || clerkUser.username || 'Clerk User',
                avatar_url: clerkUser.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
                reg_number: '2021-CSE-012',
                department_name: 'Computer Systems Engineering',
                semester: 5
              };
              setCurrentUser(defaultClerkProfile);
            }
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
