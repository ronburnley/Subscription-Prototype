import { useState, useCallback } from 'react';

export function useEmailValidation() {
  const [error, setError] = useState<string>('');

  const validateEmail = useCallback((email: string): boolean => {
    // RFC 5322 compliant email regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!email) {
      setError('Email is required');
      return false;
    }

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    setError('');
    return true;
  }, []);

  return { error, validateEmail };
}