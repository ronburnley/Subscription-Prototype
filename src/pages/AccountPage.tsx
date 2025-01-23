import React, { useState } from 'react';
import { User } from '../types';
import { AuthSection } from '../components/AuthSection';
import { DemographicSection } from '../components/DemographicSection';
import { FamilySection } from '../components/FamilySection';
import { InsuranceSection } from '../components/InsuranceSection';
import { RideshareSection } from '../components/RideshareSection';
import { CommunicationSection } from '../components/CommunicationSection';
import { useUserData } from '../hooks/useUserData';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { Toast } from '../components/ui/Toast';
import { useToast } from '../hooks/useToast';
import { Save, PlusCircle } from 'lucide-react';

export function AccountPage() {
  const { user, loading, error, updateUser, createNewUser } = useUserData();
  const [isSaving, setIsSaving] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateUser(user);
      showToast('Changes saved successfully');
    } catch (err) {
      showToast('Failed to save changes', 'error');
      console.error('Failed to save:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateNew = async () => {
    if (window.confirm('Are you sure you want to create a new record? All unsaved changes will be lost.')) {
      try {
        await createNewUser();
        showToast('New record created');
      } catch (err) {
        showToast('Failed to create new record', 'error');
        console.error('Failed to create new record:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-page-bg">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Account Management
            </h1>
            <p className="mt-2 text-gray-600">Manage your account information and preferences</p>
          </div>

          <div className="space-y-6">
            <div className="bg-form-bg rounded-xl shadow-lg p-6 border border-gray-100">
              <AuthSection
                email={user.email}
                setEmail={(email) => updateUser({ email })}
                mfaEnabled={user.mfaEnabled}
                toggleMfa={() => updateUser({ mfaEnabled: !user.mfaEnabled })}
              />
            </div>

            <DemographicSection
              firstName={user.firstName}
              lastName={user.lastName}
              setFirstName={(firstName) => updateUser({ firstName })}
              setLastName={(lastName) => updateUser({ lastName })}
              address={user.address}
              setAddress={(address) => updateUser({ address })}
              phone={user.phone}
              setPhone={(phone) => updateUser({ phone })}
            />

            <FamilySection
              familyMembers={user.familyMembers}
              setFamilyMembers={(familyMembers) => updateUser({ familyMembers })}
            />

            <div className="bg-form-bg rounded-xl shadow-lg p-6 border border-gray-100">
              <InsuranceSection plans={user.insurancePlans} />
            </div>

            <div className="bg-form-bg rounded-xl shadow-lg p-6 border border-gray-100">
              <RideshareSection
                company={user.rideshareCompany}
                setCompany={(company) => updateUser({ rideshareCompany: company })}
              />
            </div>

            <div className="bg-form-bg rounded-xl shadow-lg p-6 border border-gray-100">
              <CommunicationSection
                preferences={user.communicationPreferences}
                setPreferences={(communicationPreferences) =>
                  updateUser({ communicationPreferences })
                }
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleCreateNew}
                className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Create New
              </button>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-5 w-5 mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}