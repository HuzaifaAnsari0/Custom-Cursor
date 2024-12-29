import React, { useState, useEffect } from 'react';
import { AlertCircle, Search } from 'lucide-react';
import { CursorCard } from '../components/CursorCard';
import { api } from '../utils/api';

export const Home = () => {
  const [cursors, setCursors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredCursors = cursors.filter(cursor => 
    cursor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Custom Cursor Gallery
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Browse our collection of custom cursors and enhance your website's interactivity
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search cursors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg shadow-sm">
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
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out">
          {message}
        </div>
      )}

      {!error && filteredCursors.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-600">No cursors available yet.</p>
          <p className="mt-2 text-gray-500">Visit the admin panel to upload some cursors!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCursors.map((cursor) => (
          <CursorCard key={cursor._id} cursor={cursor} onCopy={handleCopy} />
        ))}
      </div>
    </div>
  );
};