import { useState, useCallback } from 'react';

export function usePhoneValidation() {
  const [error, setError] = useState<string>('');

  const validatePhone = useCallback((phone: string): boolean => {
    const phoneRegex = /^\+?1?\s*\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;

    if (!phone) {
      setError('Phone number is required');
      return false;
    }

    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid phone number');
      return false;
    }

    setError('');
    return true;
  }, []);

  return { error, validatePhone };
}