import React from 'react';
import { Shield } from 'lucide-react';

export const PrivacyPolicy = () => {
  const lastUpdated = "December 1, 2023";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-4">
          <Shield className="h-8 w-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-600">Last updated: {lastUpdated}</p>
      </div>

      <div className="prose prose-indigo max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              When you use CursorCraft, we collect certain information to provide and improve our services:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Account information (email, username)</li>
              <li>Uploaded cursor files and associated metadata</li>
              <li>Usage data and analytics</li>
              <li>Technical information about your device and browser</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
          <div className="space-y-4 text-gray-600">
            <p>We use the collected information for:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Providing and maintaining our services</li>
              <li>Improving user experience</li>
              <li>Communicating with you about updates and changes</li>
              <li>Ensuring compliance with our terms of service</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Security</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              We implement appropriate security measures to protect your information:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
              <li>Secure file storage systems</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Your Rights</h2>
          <div className="space-y-4 text-gray-600">
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact Us</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul className="list-none space-y-2">
              <li>Email: privacy@customcursor.com</li>
              <li>Address: Your Company Address</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}; 