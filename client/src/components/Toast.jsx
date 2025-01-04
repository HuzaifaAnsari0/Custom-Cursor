import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const VARIANTS = {
  success: {
    icon: CheckCircle,
    className: 'bg-green-50 text-green-800 border-green-500'
  },
  error: {
    icon: AlertCircle,
    className: 'bg-red-50 text-red-800 border-red-500'
  },
  info: {
    icon: Info,
    className: 'bg-blue-50 text-blue-800 border-blue-500'
  }
};

export const Toast = ({ message, variant = 'info', onClose }) => {
  const { icon: Icon, className } = VARIANTS[variant] || VARIANTS.info;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg border ${className}`}>
      <Icon className="h-5 w-5 mr-2" />
      <span className="mr-2">{message}</span>
      <button
        onClick={onClose}
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 hover:bg-gray-100"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}; 