import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { api } from '../utils/api';

export const PendingRequests = () => {
  const [pendingCursors, setPendingCursors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPendingCursors = async () => {
    try {
      setLoading(true);
      setError(null);
      // Get token from localStorage
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await api.getPendingCursors();
      setPendingCursors(response.data);
    } catch (error) {
      console.error('Failed to fetch pending cursors:', error);
      setError(error.message || 'Failed to fetch pending cursors');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (cursorId, newStatus) => {
    try {
      await api.updateCursorStatus(cursorId, newStatus);
      // Refresh the list after update
      fetchPendingCursors();
    } catch (error) {
      console.error('Failed to update cursor status:', error);
      setError(error.message || 'Failed to update cursor status');
    }
  };

  useEffect(() => {
    fetchPendingCursors();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-indigo-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Pending Requests</h1>
        </div>
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
          {pendingCursors.length} pending
        </span>
      </div>

      {pendingCursors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No pending cursors to review</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pendingCursors.map((cursor) => (
            <div key={cursor._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{cursor.name}</h3>
                <span className="text-sm text-gray-500">By {cursor.createdBy}</span>
              </div>
              
              <div className="relative h-32 bg-gray-50 rounded-md mb-4">
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}${cursor.imageUrl}`}
                  alt={cursor.name}
                  className="absolute inset-0 w-full h-full object-contain p-2"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => handleStatusUpdate(cursor._id, 'rejected')}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleStatusUpdate(cursor._id, 'approved')}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 