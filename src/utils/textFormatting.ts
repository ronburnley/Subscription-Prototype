export function capitalizeFirstLetter(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (cleaned.length >= 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  }
  
  return phone;
}

export function formatAddress(text: string): string {
  if (!text) return text;
  
  // Split into words and capitalize each word
  return text
    .toLowerCase()
    .split(' ')
    .map(word => {
      // Don't capitalize articles, conjunctions, and prepositions unless they're the first word
      const lowercaseWords = ['and', 'or', 'the', 'in', 'on', 'at', 'to', 'for', 'of'];
      if (lowercaseWords.includes(word) && text.indexOf(word) !== 0) {
        return word;
      }
      return capitalizeFirstLetter(word);
    })
    .join(' ');
}