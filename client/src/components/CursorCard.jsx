import React, { useState } from 'react';
import { Copy, Check, Code, Link, Trash2 } from 'lucide-react';
import { api } from '../utils/api';
import { Toast } from './Toast';
import { Modal } from './Modal';

export const CursorCard = ({ cursor, isAdmin, onDelete }) => {
  const [copied, setCopied] = useState(false);
  const [copyType, setCopyType] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const generateCSSContent = (cursor) => {
    return `/* ${cursor.name} Cursor by ${cursor.createdBy} */
.cursor-${cursor.name.toLowerCase().replace(/\s+/g, '-')} {
  ${cursor.cssCode}
}

/* Usage example:
   Add this class to any element you want to apply the cursor to:
   <div class="cursor-${cursor.name.toLowerCase().replace(/\s+/g, '-')}">
     Your content here
   </div>
*/`;
  };

  const generateCDNLink = () => {
    return `<link rel="stylesheet" href="${import.meta.env.VITE_SERVER_URL}/api/cursors/${cursor._id}/style.css">`;
  };

  const showToast = (message, variant) => {
    setToast({ message, variant });
  };

  const handleCopy = async (type) => {
    try {
      const content = type === 'css' ? generateCSSContent(cursor) : generateCDNLink();
      await navigator.clipboard.writeText(content);
      setCopyType(type);
      setCopied(true);
      showToast('Copied to clipboard!', 'success');
      setTimeout(() => {
        setCopied(false);
        setCopyType(null);
      }, 2000);
    } catch (error) {
      console.error('Copy failed:', error);
      showToast('Failed to copy to clipboard', 'error');
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await api.deleteCursor(cursor._id);
      onDelete(cursor._id);
      showToast('Cursor deleted successfully', 'success');
    } catch (error) {
      console.error('Delete failed:', error);
      showToast('Failed to delete cursor', 'error');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const imageUrl = `${import.meta.env.VITE_SERVER_URL}${cursor.imageUrl}`;

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Cursor"
        message={`Are you sure you want to delete "${cursor.name}"? This action cannot be undone.`}
      />
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        style={{ cursor: `url(${imageUrl}), auto` }}
      >
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{cursor.name}</h3>
            <div className="flex gap-2">
              {isAdmin && (
                <button
                  onClick={handleDeleteClick}
                  className="text-red-600 hover:text-red-800"
                  title="Delete Cursor"
                  disabled={isDeleting}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={() => handleCopy('cdn')}
                className="text-indigo-600 hover:text-indigo-800"
                title="Copy CDN Link"
              >
                {copied && copyType === 'cdn' ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <Link className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={() => handleCopy('css')}
                className="text-indigo-600 hover:text-indigo-800"
                title="Copy CSS Code"
              >
                {copied && copyType === 'css' ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <Code className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          
          <div className="relative h-24 bg-gray-50 rounded-md mb-4">
            {!imageError ? (
              <img
                src={imageUrl}
                alt={cursor.name}
                className="absolute inset-0 w-full h-full object-contain p-2"
                onError={() => {
                  console.error('Image load error for:', imageUrl);
                  setImageError(true);
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Image not available
              </div>
            )}
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>By {cursor.createdBy}</span>
            <span>{cursor.downloads || 0} downloads</span>
          </div>
        </div>
      </div>
    </>
  );
};