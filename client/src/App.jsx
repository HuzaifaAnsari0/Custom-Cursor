import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { UploadPage } from './pages/UploadPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminLogin } from './pages/AdminLogin';
import { AdminSignup } from './pages/AdminSignup';
import { Navigation } from './components/Navigation';

// Protected Route component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const isAuthenticated = !!localStorage.getItem('adminToken');
  const isAdmin = localStorage.getItem('userRole') === '1';
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }
  
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/upload" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={
              <ProtectedRoute>
                <UploadPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 