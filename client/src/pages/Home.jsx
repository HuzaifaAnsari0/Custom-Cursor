import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { CursorCard } from '../components/CursorCard';
import { api } from '../utils/api';

export const Home = () => {
  const [cursors, setCursors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCursors();
  }, []);

  const fetchCursors = async () => {
    try {
      setError('');
      const response = await api.getCursors();
      setCursors(response.data);
    } catch (error) {
      console.error('Failed to fetch cursors:', error);
      setError('Unable to load cursors. Please make sure the server is running.');
      setCursors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setMessage('CSS copied to clipboard!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleRetry = () => {
    setLoading(true);
    fetchCursors();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cursors...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8">Custom Cursor Gallery</h1>
      
      {error && (
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
            <button 
              onClick={handleRetry}
              className="mt-2 text-sm text-red-600 hover:text-red-500 font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {message && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {message}
        </div>
      )}

      {!error && cursors.length === 0 && (
        <div className="text-center text-gray-600">
          <p>No cursors available yet.</p>
          <p className="mt-2">Visit the admin panel to upload some cursors!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursors.map((cursor) => (
          <CursorCard key={cursor._id} cursor={cursor} onCopy={handleCopy} />
        ))}
      </div>
    </div>
  );
};