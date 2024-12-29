import React from 'react';
import { Copy } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { api } from '../utils/api';

export const CursorCard = ({ cursor, onCopy }) => {
  const handleDownload = async () => {
    try {
      await api.incrementDownloads(cursor._id);
      onCopy(cursor.cssCode);
    } catch (error) {
      console.error('Failed to track download:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div 
        className="p-6 h-32 flex items-center justify-center" 
        style={{ cursor: `url(${cursor.imageUrl}), auto` }}
      >
        <div className="text-center text-gray-500">Hover to preview cursor</div>
      </div>
      <div className="p-6 border-t">
        <h3 className="text-xl font-semibold mb-2">{cursor.name}</h3>
        <div className="relative bg-gray-50 rounded-md p-4 mb-4">
          <SyntaxHighlighter 
            language="css" 
            style={tomorrow}
            customStyle={{ background: 'transparent' }}
          >
            {cursor.cssCode}
          </SyntaxHighlighter>
          <button
            onClick={handleDownload}
            className="absolute top-2 right-2 p-2 rounded-md hover:bg-gray-200 transition-colors"
            title="Copy CSS"
          >
            <Copy size={16} />
          </button>
        </div>
        <div className="text-sm text-gray-600">
          {cursor.downloads} downloads
        </div>
      </div>
    </div>
  );
};