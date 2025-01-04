import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { api } from '../utils/api';
import { Toast } from './Toast';

export const PublicUpload = ({ onUploadSuccess }) => {
  const [name, setName] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, variant) => {
    setToast({ message, variant });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a new image element
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
        img.onload = () => {
          // Create a canvas to resize the image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set the canvas size to 32x32
          canvas.width = 32;
          canvas.height = 32;
          
          // Draw the image scaled down
          ctx.drawImage(img, 0, 0, 32, 32);
          
          // Convert canvas back to a file
          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name, {
              type: 'image/png',
              lastModified: Date.now(),
            });
            
            setImage(resizedFile);
            setImagePreview(canvas.toDataURL('image/png'));
          }, 'image/png');
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      formData.append('createdBy', createdBy || 'Anonymous');

      await api.uploadCursor(formData);
      showToast('Cursor submitted successfully! It will be visible after approval.', 'success');
      setName('');
      setCreatedBy('');
      setImage(null);
      setImagePreview(null);
      e.target.reset();
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error('Upload error:', error);
      showToast(error.response?.data?.message || 'Failed to upload cursor', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Submit Your Cursor</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cursor Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name (optional)
            </label>
            <input
              type="text"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Anonymous"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cursor Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md relative">
              <div className="space-y-1 text-center">
                {!imagePreview ? (
                  <label className="cursor-pointer block">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex justify-center text-sm text-gray-600">
                      <span className="relative bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                        Upload a file
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">PNG, CUR up to 100KB</p>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*,.cur"
                      onChange={handleImageChange}
                      required
                    />
                  </label>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-32 mx-auto object-contain"
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute -top-2 -right-2 bg-red-100 rounded-full p-1 text-red-600 hover:bg-red-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <p className="text-sm text-gray-500 mt-2">
                      {image.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Cursor'}
          </button>
        </form>
      </div>
    </>
  );
}; 