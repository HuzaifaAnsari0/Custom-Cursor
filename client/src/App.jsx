import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { Navigation } from './components/Navigation';

function App() {
//   useEffect(() => {
//     // Test API connection on startup
//     const testConnection = async () => {
//       try {
//         const response = await api.getCursors();
//         console.log('API Connection successful:', response.data);
//       } catch (error) {
//         console.error('API Connection failed:', error);
//       }
//     };
//     testConnection();
//   }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 