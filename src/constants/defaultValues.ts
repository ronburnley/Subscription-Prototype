import { User } from '../types';

export const DEFAULT_USER: User = {
  email: '',
  firstName: '',
  lastName: '',
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
  },
  phone: '',
  mfaEnabled: false,
  familyMembers: [],
  insurancePlans: {
    health: {
      type: 'health',
      name: 'Premium Health Plan',
      coveredIndividuals: [],
      premium: 299.99,
      subsidy: 50.00,
    },
    dental: {
      type: 'dental',
      name: 'Comprehensive Dental Plan',
      coveredIndividuals: [],
      premium: 49.99,
      subsidy: 10.00,
    },
    vision: {
      type: 'vision',
      name: 'Vision Plus Plan',
      coveredIndividuals: [],
      premium: 29.99,
      subsidy: 5.00,
    },
  },
  rideshareCompany: null,
  communicationPreferences: {
    email: true,
    sms: true,
  },
};