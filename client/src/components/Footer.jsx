import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MousePointer2, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Heart,
  Book,
  Upload,
  Shield
} from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t relative mt-12 mx-auto bottom-0 left-0 right-0 w-full">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <MousePointer2 className="h-6 w-6 text-indigo-600" />
              <span className="font-bold text-xl text-gray-900">CursorCraft</span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              Create and share beautiful CursorCrafts for your web projects. Easy to implement, 
              delightful to use.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-indigo-600 flex items-center">
                  <MousePointer2 className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-gray-600 hover:text-indigo-600 flex items-center">
                  <Book className="h-4 w-4 mr-2" />
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-gray-600 hover:text-indigo-600 flex items-center">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Cursor
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-600 hover:text-indigo-600 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
              <Link to="/about" className="text-gray-600 hover:text-indigo-600">
                  About
                </Link>
              </li>
              <li>
                <Link to="/docs#faq" className="text-gray-600 hover:text-indigo-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-indigo-600">
                Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-indigo-600">
                Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="https://in.linkedin.com/company/tarlose" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="mailto:admin@tarlose.com" 
                className="text-gray-400 hover:text-gray-500"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} CursorCraft. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-500 text-sm flex items-center">
                Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by <a href="https://tarlose.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 mx-1 hover:underline">Tarlose</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};