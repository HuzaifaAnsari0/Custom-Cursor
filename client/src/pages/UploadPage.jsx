import React from 'react';
import { Upload } from 'lucide-react';
import { PublicUpload } from '../components/PublicUpload';

export const UploadPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-4">
          <Upload className="h-8 w-8 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Upload Your Cursor</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Share your custom cursor design with the community
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <PublicUpload />
          </div>
        </div>
      </div>
    </div>
  );
}; 