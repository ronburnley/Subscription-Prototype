import React from 'react';
import { Trash2 } from 'lucide-react';
import { FamilyMember } from '../types';
import { useNameValidation } from '../hooks/useNameValidation';
import { capitalizeFirstLetter } from '../utils/textFormatting';

interface FamilyMemberFormProps {
  member: FamilyMember;
  onUpdate: (updates: Partial<FamilyMember>) => void;
  onRemove: () => void;
}

export function FamilyMemberForm({ member, onUpdate, onRemove }: FamilyMemberFormProps) {
  const { error: firstNameError, validateName: validateFirstName } = useNameValidation();
  const { error: lastNameError, validateName: validateLastName } = useNameValidation();

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = capitalizeFirstLetter(e.target.value);
    onUpdate({ firstName: value });
    validateFirstName(value, 'First name');
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = capitalizeFirstLetter(e.target.value);
    onUpdate({ lastName: value });
    validateLastName(value, 'Last name');
  };

  return (
    <div className="grid grid-cols-12 gap-4 items-start">
      <div className="col-span-4">
        <div className="relative">
          <input
            type="text"
            value={member.firstName}
            onChange={handleFirstNameChange}
            onBlur={() => validateFirstName(member.firstName, 'First name')}
            className={`block w-full px-3 py-2 border ${
              firstNameError ? 'border-red-300' : 'border-gray-300'
            } rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm`}
            placeholder="First Name"
            aria-invalid={!!firstNameError}
            aria-describedby={firstNameError ? `firstName-error-${member.id}` : undefined}
          />
          {firstNameError && (
            <p className="mt-2 text-sm text-red-600" id={`firstName-error-${member.id}`}>
              {firstNameError}
            </p>
          )}
        </div>
      </div>

      <div className="col-span-4">
        <div className="relative">
          <input
            type="text"
            value={member.lastName}
            onChange={handleLastNameChange}
            onBlur={() => validateLastName(member.lastName, 'Last name')}
            className={`block w-full px-3 py-2 border ${
              lastNameError ? 'border-red-300' : 'border-gray-300'
            } rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm`}
            placeholder="Last Name"
            aria-invalid={!!lastNameError}
            aria-describedby={lastNameError ? `lastName-error-${member.id}` : undefined}
          />
          {lastNameError && (
            <p className="mt-2 text-sm text-red-600" id={`lastName-error-${member.id}`}>
              {lastNameError}
            </p>
          )}
        </div>
      </div>

      <div className="col-span-3">
        <select
          value={member.relationship}
          onChange={(e) => onUpdate({ relationship: e.target.value as FamilyMember['relationship'] })}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
        >
          <option value="Spouse">Spouse</option>
          <option value="Child">Child</option>
          <option value="Step-Child">Step-Child</option>
        </select>
      </div>

      <div className="col-span-1">
        <button
          onClick={onRemove}
          className="p-2 text-red-600 hover:text-red-700 transition-colors"
          aria-label="Remove family member"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}