import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MousePointer2, LogOut, Upload, Shield, Book, Menu, X } from 'lucide-react';

export const Navigation = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('adminToken');
  const isAdmin = localStorage.getItem('userRole') === '1';
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <MousePointer2 className="h-6 w-6 text-indigo-600" />
            <span className="font-bold text-xl">CursorCraft</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/docs"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <Book className="h-4 w-4 mr-1" />
              Docs
            </Link>
            <Link
              to="/upload"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <Upload className="h-4 w-4 mr-1" />
              Upload
            </Link>
            {isAuthenticated && (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <Shield className="h-4 w-4 mr-1" />
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <Link
                to="/admin/login"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/docs"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <Book className="h-4 w-4 mr-1" />
                Docs
              </Link>
              <Link
                to="/upload"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <Upload className="h-4 w-4 mr-1" />
                Upload
              </Link>
              {isAuthenticated && (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
                </>
              )}
              {!isAuthenticated && (
                <Link
                  to="/admin/login"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}; 