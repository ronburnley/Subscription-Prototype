import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

export function useSupabase() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUserData() {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (!authUser) {
          setUser(null);
          return;
        }

        const { data: userData, error: userError } = await supabase
          .from('users')
          .select(`
            *,
            family_members (*),
            communication_preferences (*)
          `)
          .eq('id', authUser.id)
          .single();

        if (userError) throw userError;

        if (userData) {
          setUser({
            email: userData.email,
            address: {
              street: userData.street || '',
              city: userData.city || '',
              state: userData.state || '',
              zipCode: userData.zip_code || '',
            },
            phone: userData.phone || '',
            mfaEnabled: userData.mfa_enabled,
            familyMembers: userData.family_members.map((member: any) => ({
              id: member.id,
              firstName: member.first_name,
              lastName: member.last_name,
              relationship: member.relationship,
            })),
            insurancePlan: {
              name: 'Premium Health Plan',
              coveredIndividuals: ['John Doe'],
              premium: 299.99,
              subsidy: 50.00,
            },
            rideshareCompany: userData.rideshare_company,
            communicationPreferences: {
              email: userData.communication_preferences?.email ?? true,
              sms: userData.communication_preferences?.sms ?? true,
            },
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load user data'));
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, []);

  const updateUser = async (updates: Partial<User>) => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) throw new Error('No authenticated user');

      // Update user table
      const { error: userError } = await supabase
        .from('users')
        .update({
          email: updates.email,
          phone: updates.phone,
          mfa_enabled: updates.mfaEnabled,
          street: updates.address?.street,
          city: updates.address?.city,
          state: updates.address?.state,
          zip_code: updates.address?.zipCode,
          rideshare_company: updates.rideshareCompany,
          updated_at: new Date().toISOString(),
        })
        .eq('id', authUser.id);

      if (userError) throw userError;

      // Update communication preferences
      if (updates.communicationPreferences) {
        const { error: prefError } = await supabase
          .from('communication_preferences')
          .upsert({
            user_id: authUser.id,
            email: updates.communicationPreferences.email,
            sms: updates.communicationPreferences.sms,
            updated_at: new Date().toISOString(),
          });

        if (prefError) throw prefError;
      }

      // Update family members if provided
      if (updates.familyMembers) {
        const { error: familyError } = await supabase
          .from('family_members')
          .delete()
          .eq('user_id', authUser.id);

        if (familyError) throw familyError;

        if (updates.familyMembers.length > 0) {
          const { error: insertError } = await supabase
            .from('family_members')
            .insert(
              updates.familyMembers.map(member => ({
                user_id: authUser.id,
                first_name: member.firstName,
                last_name: member.lastName,
                relationship: member.relationship,
              }))
            );

          if (insertError) throw insertError;
        }
      }

      // Reload user data
      const { data: userData, error: loadError } = await supabase
        .from('users')
        .select(`
          *,
          family_members (*),
          communication_preferences (*)
        `)
        .eq('id', authUser.id)
        .single();

      if (loadError) throw loadError;

      if (userData) {
        setUser({
          ...user!,
          ...updates,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update user data'));
      throw err;
    }
  };

  return { user, loading, error, updateUser };
}