import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { api } from '../utils/api';

export const AdminUpload = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !name) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    try {
      await api.uploadCursor(formData);
      setMessage({ type: 'success', text: 'Cursor uploaded successfully!' });
      setName('');
      setImage(null);
      // Reset form
      e.target.reset();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Upload failed. Please try again.' 
      });
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
      // Clear message after 5 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Upload New Cursor</h2>
      
      {message.text && (
        <div className={`mb-4 p-3 rounded ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700 border-l-4 border-green-400'
            : 'bg-red-50 text-red-700 border-l-4 border-red-400'
        }`}>
          <div className="flex items-center">
            {message.type === 'error' && <AlertCircle className="h-5 w-5 mr-2" />}
            {message.text}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Cursor Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Cursor Image</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0])}
                    required
                  />
                </label>
              </div>
              {image && <p className="text-sm text-gray-500">{image.name}</p>}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading 
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : (
            'Upload Cursor'
          )}
        </button>
      </form>
    </div>
  );
};