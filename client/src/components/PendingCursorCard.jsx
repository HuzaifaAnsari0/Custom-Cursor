import React, { useState } from 'react';
import { Check, X, Loader } from 'lucide-react';
import { api } from '../utils/api';
import { Toast } from './Toast';

export const PendingCursorCard = ({ cursor, onStatusChange }) => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [imageError, setImageError] = useState(false);

  const showToast = (message, variant) => {
    setToast({ message, variant });
  };

  const handleAction = async (action) => {
    setLoading(true);
    try {
      await api.updateCursorStatus(cursor._id, action);
      showToast(
        `Cursor ${action === 'approved' ? 'approved' : 'rejected'} successfully`,
        'success'
      );
      onStatusChange(cursor._id, action);
    } catch (error) {
      console.error('Action failed:', error);
      showToast(`Failed to ${action} cursor`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const imageUrl = `${import.meta.env.VITE_SERVER_URL}${cursor.imageUrl}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {toast && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{cursor.name}</h3>
            <p className="text-sm text-gray-500">By {cursor.createdBy}</p>
          </div>
          <div className="flex gap-2">
            {loading ? (
              <Loader className="h-5 w-5 text-gray-400 animate-spin" />
            ) : (
              <>
                <button
                  onClick={() => handleAction('approved')}
                  className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                  title="Approve"
                >
                  <Check className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleAction('rejected')}
                  className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                  title="Reject"
                >
                  <X className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="relative h-24 bg-gray-50 rounded-md mb-3">
          {!imageError ? (
            <img
              src={imageUrl}
              alt={cursor.name}
              className="absolute inset-0 w-full h-full object-contain p-2"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              Image not available
            </div>
          )}
        </div>

        <div className="text-sm text-gray-600">
          <p className="mb-1">
            <span className="font-medium">Class Name:</span>{' '}
            {cursor.className}
          </p>
          <p className="font-mono text-xs bg-gray-50 p-2 rounded overflow-x-auto">
            {cursor.cssCode}
          </p>
        </div>
      </div>
    </div>
  );
}; 