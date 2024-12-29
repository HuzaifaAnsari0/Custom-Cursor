import React from 'react';
import { AdminUpload } from '../components/AdminUpload';

export const Admin: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>
      <AdminUpload />
    </div>
  );
}