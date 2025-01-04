import React, { useState, useEffect } from 'react';
import { AlertCircle, Search, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CursorCard } from '../components/CursorCard';
import { api } from '../utils/api';

export const Home = () => {
  const [cursors, setCursors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const isAdmin = localStorage.getItem('userRole') === '1';
  const navigate = useNavigate();

  useEffect(() => {
    fetchCursors();
  }, []);

  const fetchCursors = async () => {
    try {
      const response = await api.getCursors();
      setCursors(response.data);
    } catch (error) {
      setError('Failed to load cursors');
    } finally {
      setLoading(false);
    }
  };

  const filteredCursors = cursors.filter(cursor => 
    cursor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (cursorId) => {
    setCursors(cursors.filter(cursor => cursor._id !== cursorId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Custom Cursor Gallery
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Browse our collection of custom cursors and enhance your website's interactivity
        </p>
        <button
          onClick={() => navigate('/upload')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Upload className="h-5 w-5 mr-2" />
          Submit Your Cursor
        </button>
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
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="ml-3 text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCursors.map((cursor) => (
            <CursorCard 
              key={cursor._id} 
              cursor={cursor} 
              isAdmin={isAdmin}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};