import React from 'react';
import { Users, Plus, Trash2 } from 'lucide-react';
import { FamilyMember } from '../types';
import { FamilyMemberForm } from './FamilyMemberForm';
import { getDefaultRelationship } from '../utils/familyUtils';

interface FamilySectionProps {
  familyMembers: FamilyMember[];
  setFamilyMembers: (members: FamilyMember[]) => void;
}

export function FamilySection({ familyMembers, setFamilyMembers }: FamilySectionProps) {
  const addFamilyMember = () => {
    const defaultRelationship = getDefaultRelationship(familyMembers);
    setFamilyMembers([
      ...familyMembers,
      { id: crypto.randomUUID(), firstName: '', lastName: '', relationship: defaultRelationship },
    ]);
  };

  const removeFamilyMember = (id: string) => {
    setFamilyMembers(familyMembers.filter((member) => member.id !== id));
  };

  const updateFamilyMember = (id: string, updates: Partial<FamilyMember>) => {
    setFamilyMembers(
      familyMembers.map((member) =>
        member.id === id ? { ...member, ...updates } : member
      )
    );
  };

  return (
    <div className="space-y-6 bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
          <Users className="h-6 w-6 mr-2" />
          Family Members
        </h2>
        <button
          onClick={addFamilyMember}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </button>
      </div>

      <div className="space-y-4">
        {familyMembers.map((member) => (
          <FamilyMemberForm
            key={member.id}
            member={member}
            onUpdate={(updates) => updateFamilyMember(member.id, updates)}
            onRemove={() => removeFamilyMember(member.id)}
          />
        ))}
      </div>
    </div>
  );
}