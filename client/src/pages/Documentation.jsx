import React, { useState } from 'react';
import { Copy, Check, Book, Code, Link as LinkIcon, ExternalLink, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Toast } from '../components/Toast';

export const Documentation = () => {
  const [activeTab, setActiveTab] = useState('use'); // 'use' or 'upload'
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, variant) => {
    setToast({ message, variant });
  };

  const handleCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      showToast('Code copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      showToast('Failed to copy code', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-4">
            <Book className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
          <p className="text-xl text-gray-600">Everything you need to know about our CursorCrafts</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setActiveTab('use')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'use'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Code className="h-4 w-4" />
                <span>Using Cursors</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'upload'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Upload Guidelines</span>
              </div>
            </button>
          </div>
        </div>

        {/* Using Cursors Documentation */}
        {activeTab === 'use' && (
          <div className="space-y-8">
            {/* Quick Start */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Start</h2>
              <div className="space-y-6">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900">CDN Method (Recommended)</h3>
                    <button
                      onClick={() => handleCopy(`<link rel="stylesheet" href="${import.meta.env.VITE_SERVER_URL}/api/cursors/[cursor-id]/style.css">`)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                  <pre className="bg-gray-50 rounded p-3 text-sm overflow-x-auto">
                    {`<link rel="stylesheet" href="${import.meta.env.VITE_SERVER_URL}/api/cursors/[cursor-id]/style.css">`}
                  </pre>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900">CSS Import Method</h3>
                    <button
                      onClick={() => handleCopy(`@import url('${import.meta.env.VITE_SERVER_URL}/api/cursors/[cursor-id]/style.css');`)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                  <pre className="bg-gray-50 rounded p-3 text-sm overflow-x-auto">
                    {`@import url('${import.meta.env.VITE_SERVER_URL}/api/cursors/[cursor-id]/style.css');`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Implementation Examples */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Implementation Examples</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Usage</h3>
                  <pre className="bg-gray-50 rounded p-3 text-sm overflow-x-auto mb-2">
{`<!-- Apply to entire page -->
<body class="cursor-custom">
  <!-- Your content here -->
</body>

<!-- Apply to specific element -->
<div class="cursor-custom">
  This element has a CursorCraft
</div>`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Framework Integration</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">React</h4>
                      <pre className="bg-gray-50 rounded p-3 text-sm overflow-x-auto">
{`import React from 'react';

const CustomCursor = () => {
  return (
    <div className="cursor-custom">
      Content with CursorCraft
    </div>
  );
};`}
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Vue</h4>
                      <pre className="bg-gray-50 rounded p-3 text-sm overflow-x-auto">
{`<template>
  <div class="cursor-custom">
    Content with CursorCraft
  </div>
</template>`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Advanced Usage */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Advanced Usage</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Multiple Cursors</h3>
                  <pre className="bg-gray-50 rounded p-3 text-sm overflow-x-auto mb-2">
{`.cursor-pointer { cursor: url('pointer.png'), pointer; }
.cursor-text { cursor: url('text.png'), text; }
.cursor-grab { cursor: url('grab.png'), grab; }`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Dynamic States</h3>
                  <pre className="bg-gray-50 rounded p-3 text-sm overflow-x-auto">
{`.button {
  cursor: url('default.png'), auto;
}

.button:hover {
  cursor: url('hover.png'), pointer;
}

.button:active {
  cursor: url('click.png'), pointer;
}`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Browser Support */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Browser Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Compatibility</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-600">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      Chrome (Latest)
                    </li>
                    <li className="flex items-center text-gray-600">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      Firefox (Latest)
                    </li>
                    <li className="flex items-center text-gray-600">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      Safari (Latest)
                    </li>
                    <li className="flex items-center text-gray-600">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      Edge (Latest)
                    </li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-md">
                  <h3 className="font-semibold text-yellow-800 mb-2">Important Notes</h3>
                  <ul className="list-disc list-inside text-yellow-700 space-y-2">
                    <li>Always provide fallback cursors</li>
                    <li>Test on multiple browsers</li>
                    <li>Consider mobile support</li>
                    <li>Check performance impact</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Troubleshooting */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Troubleshooting</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-red-400 bg-red-50 p-4">
                  <h3 className="font-semibold text-red-900 mb-2">Common Issues</h3>
                  <ul className="list-disc list-inside text-red-700 space-y-2">
                    <li>Cursor not showing? Check if the path is correct</li>
                    <li>Flickering cursor? Check z-index and pointer-events</li>
                    <li>Delayed loading? Consider preloading the cursor</li>
                    <li>Wrong size? Verify the image dimensions</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-semibold text-gray-900 mb-2">Performance Tips</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Use optimized image formats</li>
                    <li>Implement proper caching</li>
                    <li>Consider lazy loading for multiple cursors</li>
                    <li>Monitor network requests</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Need Help */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Browse Cursors
                </Link>
                <a
                  href="https://github.com/yourusername/custom-cursors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  GitHub Repository
                </a>
              </div>
            </section>
          </div>
        )}

        {/* Upload Guidelines Documentation */}
        {activeTab === 'upload' && (
          <div className="space-y-8">
            {/* File Requirements */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">File Requirements</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-400 bg-blue-50 p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Image Specifications</h3>
                  <ul className="list-disc list-inside text-blue-800 space-y-2">
                    <li>File format: PNG (recommended), CUR, or ANI</li>
                    <li>Size: 32x32 pixels (recommended)</li>
                    <li>Maximum file size: 100KB</li>
                    <li>Transparent background preferred</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Upload Process */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Process</h2>
              <div className="space-y-4">
                <ol className="list-decimal list-inside space-y-4 text-gray-600">
                  <li>
                    <span className="font-semibold">Prepare Your File</span>
                    <p className="ml-6 mt-2">Ensure your cursor file meets the specifications above.</p>
                  </li>
                  <li>
                    <span className="font-semibold">Navigate to Upload</span>
                    <p className="ml-6 mt-2">Go to the Upload page using the navigation menu.</p>
                  </li>
                  <li>
                    <span className="font-semibold">Fill the Form</span>
                    <p className="ml-6 mt-2">Provide a name and optional creator name for your cursor.</p>
                  </li>
                  <li>
                    <span className="font-semibold">Submit for Review</span>
                    <p className="ml-6 mt-2">Your cursor will be reviewed by our team before being published.</p>
                  </li>
                </ol>
              </div>
            </section>

            {/* Best Practices */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Design Tips</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Keep the design clear and visible</li>
                    <li>Test against different backgrounds</li>
                    <li>Consider adding a subtle outline</li>
                    <li>Maintain good contrast</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Common Mistakes</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Overly complex designs</li>
                    <li>Poor visibility on certain backgrounds</li>
                    <li>Incorrect hotspot positioning</li>
                    <li>Missing fallback cursor</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Review Process */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Process</h2>
              <div className="space-y-4">
                <p className="text-gray-600">Our team reviews all submissions to ensure quality and appropriateness. The review process typically includes:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Technical validation of file format and size</li>
                  <li>Visual quality assessment</li>
                  <li>Usability check across different backgrounds</li>
                  <li>Verification of appropriate content</li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                  <p className="text-yellow-800">
                    Review typically takes 1-2 business days. You'll receive an email notification once your cursor is approved.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}; 