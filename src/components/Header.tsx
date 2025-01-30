import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CreditCard } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive
                    ? 'border-b-2 border-indigo-500 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
            >
              <Home className="h-5 w-5 mr-2" />
              Home
            </NavLink>
            <NavLink
              to="/subscription"
              className={({ isActive }) =>
                `inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive
                    ? 'border-b-2 border-indigo-500 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Subscription
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}