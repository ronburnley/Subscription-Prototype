import { InsurancePlanType } from '../types/insurance';

interface InsuranceCardStyle {
  bgGradient: string;
  borderColor: string;
  iconBg: string;
}

export function getInsuranceCardColor(type: InsurancePlanType): InsuranceCardStyle {
  switch (type) {
    case 'health':
      return {
        bgGradient: 'bg-gradient-to-br from-blue-50 to-white',
        borderColor: 'border-blue-200/50',
        iconBg: 'bg-blue-500',
      };
    case 'dental':
      return {
        bgGradient: 'bg-gradient-to-br from-emerald-50 to-white',
        borderColor: 'border-emerald-200/50',
        iconBg: 'bg-emerald-500',
      };
    case 'vision':
      return {
        bgGradient: 'bg-gradient-to-br from-purple-50 to-white',
        borderColor: 'border-purple-200/50',
        iconBg: 'bg-purple-500',
      };
  }
}