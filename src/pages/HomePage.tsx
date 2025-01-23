import React, { useState } from 'react';
import { ArrowRight, MapPin, Mail } from 'lucide-react';

export function HomePage() {
  const [zipCode, setZipCode] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', { zipCode, email });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex flex-col">
      {/* Progress Steps */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4 text-sm">
            <span className="font-medium text-gray-900">Location</span>
            <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-400">Coverage</span>
            <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-400">Savings</span>
            <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-400">Personalize</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find affordable health coverage
            </h1>
            <p className="text-lg text-gray-600">
              We'll help find the right plan for you using our free comparison tool.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                  placeholder="Enter ZIP code"
                  maxLength={5}
                  required
                />
                <label
                  htmlFor="zipCode"
                  className="absolute -top-2.5 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-600"
                >
                  ZIP Code
                </label>
              </div>
              <p className="mt-2 text-sm text-gray-500 ml-2">
                Your residence ZIP code determines the plans available to you
              </p>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                  placeholder="Enter email address"
                />
                <label
                  htmlFor="email"
                  className="absolute -top-2.5 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-600"
                >
                  Email <span className="text-gray-400">(optional)</span>
                </label>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Your information is safe - check out our{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </a>
              </p>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Find Coverage
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}