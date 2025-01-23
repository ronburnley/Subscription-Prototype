import { DEFAULT_USER } from '../constants/defaultValues';
import type { User } from '../types';

export function useFormReset() {
  const resetForm = (updateUser: (updates: Partial<User>) => void) => {
    updateUser({
      ...DEFAULT_USER,
      // Preserve email since it's tied to authentication
      email: undefined,
    });
  };

  return { resetForm };
}