import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types';
import { useDebounce } from './useDebounce';
import { DEFAULT_USER } from '../constants/defaultValues';

export function useUserData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [pendingUpdates, setPendingUpdates] = useState<Partial<User>>({});
  
  const debouncedUpdates = useDebounce(pendingUpdates);

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (Object.keys(debouncedUpdates).length > 0 && currentUserId) {
      updateUserInDb(debouncedUpdates);
    }
  }, [debouncedUpdates, currentUserId]);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }
      await loadUserData(session.user.id);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to check session'));
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = async (userId: string) => {
    try {
      const { data: users, error: dbError } = await supabase
        .from('users')
        .select(`
          *,
          family_members (*),
          communication_preferences (*)
        `)
        .eq('id', userId)
        .single();

      if (dbError) throw dbError;

      if (users) {
        setCurrentUserId(users.id);
        setUser({
          email: users.email || '',
          firstName: users.first_name || '',
          lastName: users.last_name || '',
          address: {
            street: users.street || '',
            city: users.city || '',
            state: users.state || '',
            zipCode: users.zip_code || '',
          },
          phone: users.phone || '',
          mfaEnabled: users.mfa_enabled || false,
          familyMembers: users.family_members?.map((member: any) => ({
            id: member.id,
            firstName: member.first_name,
            lastName: member.last_name,
            relationship: member.relationship,
          })) || [],
          insurancePlans: DEFAULT_USER.insurancePlans,
          rideshareCompany: users.rideshare_company,
          communicationPreferences: {
            email: users.communication_preferences?.email ?? true,
            sms: users.communication_preferences?.sms ?? true,
          },
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load user data'));
    }
  };

  const createNewUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Authentication required');
      }

      setCurrentUserId(null);
      setUser(DEFAULT_USER);
      setPendingUpdates({});
      
      const { data, error: insertError } = await supabase
        .from('users')
        .insert([{
          id: session.user.id,
          email: session.user.email,
          first_name: '',
          last_name: '',
          created_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (insertError) throw insertError;
      if (data) {
        setCurrentUserId(data.id);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create new user'));
      throw err;
    }
  };

  const updateUserInDb = async (updates: Partial<User>) => {
    if (!currentUserId) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Authentication required');
      }

      const { error: userError } = await supabase
        .from('users')
        .update({
          email: updates.email,
          first_name: updates.firstName,
          last_name: updates.lastName,
          phone: updates.phone,
          mfa_enabled: updates.mfaEnabled,
          street: updates.address?.street,
          city: updates.address?.city,
          state: updates.address?.state,
          zip_code: updates.address?.zipCode,
          rideshare_company: updates.rideshareCompany,
          updated_at: new Date().toISOString(),
        })
        .eq('id', currentUserId);

      if (userError) throw userError;

      if (updates.communicationPreferences) {
        const { error: prefError } = await supabase
          .from('communication_preferences')
          .upsert({
            user_id: currentUserId,
            email: updates.communicationPreferences.email,
            sms: updates.communicationPreferences.sms,
            updated_at: new Date().toISOString(),
          });

        if (prefError) throw prefError;
      }

      if (updates.familyMembers) {
        const { error: familyError } = await supabase
          .from('family_members')
          .delete()
          .eq('user_id', currentUserId);

        if (familyError) throw familyError;

        if (updates.familyMembers.length > 0) {
          const { error: insertError } = await supabase
            .from('family_members')
            .insert(
              updates.familyMembers.map(member => ({
                user_id: currentUserId,
                first_name: member.firstName,
                last_name: member.lastName,
                relationship: member.relationship,
              }))
            );

          if (insertError) throw insertError;
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update user data'));
      throw err;
    }
  };

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
    setPendingUpdates(prev => ({ ...prev, ...updates }));
  }, []);

  return { user, loading, error, updateUser, createNewUser };
}