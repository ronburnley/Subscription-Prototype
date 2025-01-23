export function getDefaultRelationship(currentMembers: { relationship: string }[]): 'Spouse' | 'Child' {
  const hasSpouse = currentMembers.some(member => member.relationship === 'Spouse');
  return hasSpouse ? 'Child' : 'Spouse';
}