import React from 'react';
import { Shield } from 'lucide-react';
import { InsurancePlan } from '../types';
import { InsuranceCard } from './InsuranceCard';

interface InsuranceSectionProps {
  plans: {
    health: InsurancePlan;
    dental: InsurancePlan;
    vision: InsurancePlan;
  };
}

export function InsuranceSection({ plans }: InsuranceSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
        <Shield className="h-6 w-6 mr-2" />
        Insurance Plans
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        <InsuranceCard plan={plans.health} />
        <InsuranceCard plan={plans.dental} />
        <InsuranceCard plan={plans.vision} />
      </div>
    </div>
  );
}