import { InsurancePlanType } from './insurance';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  mfaEnabled: boolean;
  familyMembers: FamilyMember[];
  insurancePlans: {
    health: InsurancePlan;
    dental: InsurancePlan;
    vision: InsurancePlan;
  };
  rideshareCompany: 'uber' | 'lyft' | 'doordash' | 'not-applicable' | null;
  communicationPreferences: CommunicationPreferences;
}

export interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  relationship: 'Spouse' | 'Child' | 'Step-Child';
}

export interface InsurancePlan {
  type: InsurancePlanType;
  name: string;
  coveredIndividuals: string[];
  premium: number;
  subsidy: number;
}

export interface CommunicationPreferences {
  email: boolean;
  sms: boolean;
}