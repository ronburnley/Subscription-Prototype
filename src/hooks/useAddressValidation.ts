import { useState, useCallback } from 'react';
import { Address } from '../types';

export function useAddressValidation() {
  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({});

  const validateAddress = useCallback((address: Address) => {
    const newErrors: Partial<Record<keyof Address, string>> = {};

    if (!address.street.trim()) {
      newErrors.street = 'Street address is required';
    }

    if (!address.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!address.state.trim()) {
      newErrors.state = 'State is required';
    } else if (!/^[A-Z]{2}$/.test(address.state.toUpperCase())) {
      newErrors.state = 'Please enter a valid 2-letter state code';
    }

    if (!address.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(address.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  return { errors, validateAddress };
}