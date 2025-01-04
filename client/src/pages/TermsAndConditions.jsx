import React from 'react';
import { Scale } from 'lucide-react';

export const TermsAndConditions = () => {
  const lastUpdated = "January 1, 2025";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-4">
          <Scale className="h-8 w-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms and Conditions</h1>
        <p className="text-gray-600">Last updated: {lastUpdated}</p>
      </div>

      <div className="prose prose-indigo max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              By accessing and using CursorCraft, you accept and agree to be bound by these Terms and Conditions.
              If you do not agree to these terms, please do not use our service.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. User Responsibilities</h2>
          <div className="space-y-4 text-gray-600">
            <p>When using our service, you agree to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Respect intellectual property rights</li>
              <li>Not engage in any harmful or malicious activities</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Content Guidelines</h2>
          <div className="space-y-4 text-gray-600">
            <p>All uploaded cursors must:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Be original or have proper rights for use</li>
              <li>Not violate any copyright or trademark laws</li>
              <li>Not contain inappropriate or offensive content</li>
              <li>Meet our technical specifications</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Users retain rights to their uploaded cursors. By uploading, you grant CursorCraft a license to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Display and distribute your cursors</li>
              <li>Use cursors for promotional purposes</li>
              <li>Modify cursors for technical compatibility</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Service Modifications</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              We reserve the right to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Modify or discontinue services</li>
              <li>Update these terms at any time</li>
              <li>Remove content that violates our policies</li>
              <li>Suspend or terminate accounts</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              CursorCraft is provided "as is" without warranties of any kind. We are not liable for:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Service interruptions or errors</li>
              <li>Data loss or corruption</li>
              <li>Third-party content or actions</li>
              <li>Any indirect or consequential damages</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Information</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              For questions about these terms, please contact us at:
            </p>
            <ul className="list-none space-y-2">
              <li>Email: admin@tarlose.com</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}; 