import { useState, useCallback } from 'react';

export function useNameValidation() {
  const [error, setError] = useState<string>('');

  const validateName = useCallback((name: string, fieldName: string): boolean => {
    if (!name.trim()) {
      setError(`${fieldName} is required`);
      return false;
    }

    if (name.length < 2) {
      setError(`${fieldName} must be at least 2 characters`);
      return false;
    }

    if (!/^[a-zA-Z\s-']+$/.test(name)) {
      setError(`${fieldName} can only contain letters, spaces, hyphens, and apostrophes`);
      return false;
    }

    setError('');
    return true;
  }, []);

  return { error, validateName };
}