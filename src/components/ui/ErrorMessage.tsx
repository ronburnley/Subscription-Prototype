import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-xl font-semibold text-red-600">Error: {message}</div>
    </div>
  );
}