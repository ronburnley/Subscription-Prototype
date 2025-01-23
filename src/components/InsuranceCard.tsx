import React from 'react';
import { DollarSign, Users } from 'lucide-react';
import { InsurancePlan } from '../types';
import { getInsuranceCardColor } from '../utils/insuranceUtils';

interface InsuranceCardProps {
  plan: InsurancePlan;
}

export function InsuranceCard({ plan }: InsuranceCardProps) {
  const { bgGradient, borderColor, iconBg } = getInsuranceCardColor(plan.type);

  return (
    <div className={`${bgGradient} rounded-xl p-6 shadow-lg border ${borderColor} transform hover:scale-[1.02] transition-transform duration-300`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{plan.name}</h3>

      <div className="space-y-4">
        <div>
          <div className="flex items-center mb-2">
            <Users className="h-4 w-4 text-gray-600 mr-2" />
            <h4 className="text-sm font-medium text-gray-700">Covered Individuals</h4>
          </div>
          <ul className="space-y-1">
            {plan.coveredIndividuals.map((individual, index) => (
              <li key={index} className="text-gray-600 text-sm flex items-center">
                <span className={`w-2 h-2 ${iconBg} rounded-full mr-2`} />
                {individual}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center text-gray-700 mb-1">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Monthly Premium</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">
            ${plan.premium.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}