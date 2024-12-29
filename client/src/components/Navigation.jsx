import React from 'react';
import { Link } from 'react-router-dom';
import { MousePointer2 } from 'lucide-react';

export const Navigation = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <MousePointer2 className="h-6 w-6 text-indigo-600" />
            <span className="font-bold text-xl">Custom Cursor</span>
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/admin"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}; 