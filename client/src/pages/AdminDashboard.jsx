import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { api } from '../utils/api';
import { CursorCard } from '../components/CursorCard';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0
  });
  const [pendingCursors, setPendingCursors] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const isAdmin = localStorage.getItem('userRole') === '1';
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsResponse, pendingResponse] = await Promise.all([
        api.getStats(),
        api.getPendingCursors()
      ]);
      setStats(statsResponse.data);
      setPendingCursors(pendingResponse.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (cursorId) => {
    setPendingCursors(pendingCursors.filter(cursor => cursor._id !== cursorId));
    fetchData(); // Refresh stats after deletion
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-4">
          <Shield className="h-8 w-8 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Manage cursor submissions and approvals
        </p>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Cursors</h3>
            <p className="text-3xl font-bold text-indigo-600">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Approved</h3>
            <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending</h3>
            <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
          </div>
        </div>

        {/* Pending Cursors Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pending Approvals</h2>
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : pendingCursors.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No pending cursors to review</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingCursors.map(cursor => (
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
        </div>
      </div>
    </div>
  );
}; 