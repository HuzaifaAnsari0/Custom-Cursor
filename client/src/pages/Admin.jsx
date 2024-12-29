import React, { useState } from 'react';
import { AdminUpload } from '../components/AdminUpload';
import { Shield } from 'lucide-react';

export const Admin = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-4">
          <Shield className="h-8 w-8 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Upload and manage your custom cursor collection
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <AdminUpload />
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Cursors</h3>
            <p className="text-3xl font-bold text-indigo-600">0</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Downloads</h3>
            <p className="text-3xl font-bold text-indigo-600">0</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Most Popular</h3>
            <p className="text-lg text-gray-600">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 