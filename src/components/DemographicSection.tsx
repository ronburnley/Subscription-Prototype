import React from 'react';
import { Home, MapPin, Building, User } from 'lucide-react';
import { useNameValidation } from '../hooks/useNameValidation';
import { usePhoneValidation } from '../hooks/usePhoneValidation';
import { useAddressValidation } from '../hooks/useAddressValidation';
import { capitalizeFirstLetter, formatPhoneNumber, formatAddress } from '../utils/textFormatting';
import type { Address } from '../types';

interface DemographicSectionProps {
  firstName: string;
  lastName: string;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  address: Address;
  setAddress: (address: Address) => void;
  phone: string;
  setPhone: (phone: string) => void;
}

export function DemographicSection({
  firstName,
  lastName,
  setFirstName,
  setLastName,
  address,
  setAddress,
  phone,
  setPhone,
}: DemographicSectionProps) {
  const { error: firstNameError, validateName: validateFirstName } = useNameValidation();
  const { error: lastNameError, validateName: validateLastName } = useNameValidation();
  const { error: phoneError, validatePhone } = usePhoneValidation();
  const { errors: addressErrors, validateAddress } = useAddressValidation();

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = capitalizeFirstLetter(e.target.value);
    setFirstName(value);
    validateFirstName(value, 'First name');
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = capitalizeFirstLetter(e.target.value);
    setLastName(value);
    validateLastName(value, 'Last name');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatPhoneNumber(e.target.value);
    setPhone(value);
    validatePhone(value);
  };

  const updateAddress = (field: keyof Address, value: string) => {
    let formattedValue = value;
    
    switch (field) {
      case 'street':
      case 'city':
        formattedValue = formatAddress(value);
        break;
      case 'state':
        formattedValue = value.toUpperCase();
        break;
      default:
        break;
    }

    const newAddress = { ...address, [field]: formattedValue };
    setAddress(newAddress);
    validateAddress(newAddress);
  };

  return (
    <div className="space-y-6 bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900">Demographics</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={handleFirstNameChange}
                onBlur={() => validateFirstName(firstName, 'First name')}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  firstNameError ? 'border-red-300' : 'border-gray-300'
                } rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm`}
                placeholder="John"
                aria-invalid={!!firstNameError}
                aria-describedby={firstNameError ? "firstName-error" : undefined}
              />
            </div>
            {firstNameError && (
              <p className="mt-2 text-sm text-red-600" id="firstName-error">
                {firstNameError}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={handleLastNameChange}
                onBlur={() => validateLastName(lastName, 'Last name')}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  lastNameError ? 'border-red-300' : 'border-gray-300'
                } rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm`}
                placeholder="Doe"
                aria-invalid={!!lastNameError}
                aria-describedby={lastNameError ? "lastName-error" : undefined}
              />
            </div>
            {lastNameError && (
              <p className="mt-2 text-sm text-red-600" id="lastName-error">
                {lastNameError}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              onBlur={() => validatePhone(phone)}
              className={`block w-full px-3 py-2 border ${
                phoneError ? 'border-red-300' : 'border-gray-300'
              } rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm`}
              placeholder="(555) 555-5555"
              aria-invalid={!!phoneError}
              aria-describedby={phoneError ? "phone-error" : undefined}
            />
          </div>
          {phoneError && (
            <p className="mt-2 text-sm text-red-600" id="phone-error">
              {phoneError}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700">
            Street Address
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Home className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="street"
              value={address.street}
              onChange={(e) => updateAddress('street', e.target.value)}
              onBlur={() => validateAddress(address)}
              className={`block w-full pl-10 pr-3 py-2 border ${
                addressErrors.street ? 'border-red-300' : 'border-gray-300'
              } rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm`}
              placeholder="123 Main St"
              aria-invalid={!!addressErrors.street}
              aria-describedby={addressErrors.street ? "street-error" : undefined}
            />
          </div>
          {addressErrors.street && (
            <p className="mt-2 text-sm text-red-600" id="street-error">
              {addressErrors.street}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="city"
              value={address.city}
              onChange={(e) => updateAddress('city', e.target.value)}
              onBlur={() => validateAddress(address)}
              className={`block w-full pl-10 pr-3 py-2 border ${
                addressErrors.city ? 'border-red-300' : 'border-gray-300'
              } rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm`}
              placeholder="City"
              aria-invalid={!!addressErrors.city}
              aria-describedby={addressErrors.city ? "city-error" : undefined}
            />
          </div>
          {addressErrors.city && (
            <p className="mt-2 text-sm text-red-600" id="city-error">
              {addressErrors.city}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="state"
                value={address.state}
                onChange={(e) => updateAddress('state', e.target.value)}
                onBlur={() => validateAddress(address)}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  addressErrors.state ? 'border-red-300' : 'border-gray-300'
                } rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm`}
                placeholder="CA"
                maxLength={2}
                aria-invalid={!!addressErrors.state}
                aria-describedby={addressErrors.state ? "state-error" : undefined}
              />
            </div>
            {addressErrors.state && (
              <p className="mt-2 text-sm text-red-600" id="state-error">
                {addressErrors.state}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              ZIP Code
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                id="zipCode"
                value={address.zipCode}
                onChange={(e) => updateAddress('zipCode', e.target.value)}
                onBlur={() => validateAddress(address)}
                className={`block w-full px-3 py-2 border ${
                  addressErrors.zipCode ? 'border-red-300' : 'border-gray-300'
                } rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm`}
                placeholder="12345"
                aria-invalid={!!addressErrors.zipCode}
                aria-describedby={addressErrors.zipCode ? "zipCode-error" : undefined}
              />
            </div>
            {addressErrors.zipCode && (
              <p className="mt-2 text-sm text-red-600" id="zipCode-error">
                {addressErrors.zipCode}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}