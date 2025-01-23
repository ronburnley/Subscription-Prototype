import React from 'react';
import { Car } from 'lucide-react';

interface RideshareSectionProps {
  company: string | null;
  setCompany: (company: 'uber' | 'lyft' | 'doordash' | 'not-applicable' | null) => void;
}

export function RideshareSection({ company, setCompany }: RideshareSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
        <Car className="h-6 w-6 mr-2" />
        Rideshare Company
      </h2>

      <div className="space-y-4">
        {['uber', 'lyft', 'doordash', 'not-applicable'].map((option) => (
          <div key={option} className="flex items-center">
            <input
              id={option}
              name="rideshare-company"
              type="radio"
              checked={company === option}
              onChange={() => setCompany(option as 'uber' | 'lyft' | 'doordash' | 'not-applicable')}
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor={option}
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              {option === 'not-applicable' ? 'Not Applicable' : option.charAt(0).toUpperCase() + option.slice(1)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}