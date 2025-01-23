import React, { useState } from 'react';
import { Mail, Lock, KeyRound } from 'lucide-react';
import { useEmailValidation } from '../hooks/useEmailValidation';
import { PasswordResetModal } from './PasswordResetModal';

interface AuthSectionProps {
  email: string;
  setEmail: (email: string) => void;
  mfaEnabled: boolean;
  toggleMfa: () => void;
}

export function AuthSection({ email, setEmail, mfaEnabled, toggleMfa }: AuthSectionProps) {
  const { error: emailError, validateEmail } = useEmailValidation();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Authentication</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => validateEmail(email)}
              className={`block w-full pl-10 pr-3 py-2 border ${
                emailError ? 'border-red-300' : 'border-gray-300'
              } rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                emailError ? 'focus:ring-red-500 focus:border-red-500' : ''
              }`}
              placeholder="you@example.com"
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "email-error" : undefined}
            />
          </div>
          {emailError && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {emailError}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="password"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>
          <button 
            className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
            onClick={() => setIsResetModalOpen(true)}
          >
            Reset Password
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <KeyRound className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-700">Multi-Factor Authentication</span>
          </div>
          <button
            onClick={toggleMfa}
            className={`${
              mfaEnabled ? 'bg-indigo-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            <span
              className={`${
                mfaEnabled ? 'translate-x-5' : 'translate-x-0'
              } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
          </button>
        </div>
      </div>

      <PasswordResetModal 
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
      />
    </div>
  );
}