import React from 'react';
import { MessageSquare } from 'lucide-react';
import { CommunicationPreferences } from '../types';

interface CommunicationSectionProps {
  preferences: CommunicationPreferences;
  setPreferences: (preferences: CommunicationPreferences) => void;
}

export function CommunicationSection({
  preferences,
  setPreferences,
}: CommunicationSectionProps) {
  const togglePreference = (type: keyof CommunicationPreferences) => {
    setPreferences({
      ...preferences,
      [type]: !preferences[type],
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
        <MessageSquare className="h-6 w-6 mr-2" />
        Communication Preferences
      </h2>

      <div className="space-y-4">
        {Object.entries(preferences).map(([key, value]) => (
          <div key={key} className="flex items-center">
            <button
              onClick={() => togglePreference(key as keyof CommunicationPreferences)}
              className={`${
                value ? 'bg-indigo-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  value ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
            <span className="ml-3 text-sm font-medium text-gray-700 capitalize">
              {key} Marketing
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}