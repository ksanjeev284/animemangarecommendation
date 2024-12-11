import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <div className="prose prose-purple max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-6">
              We collect minimal information to provide you with the best possible experience:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>Your anime and manga preferences</li>
              <li>Search history within the platform</li>
              <li>Usage data to improve our recommendations</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-6">
              Your information is used solely to:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>Provide personalized recommendations</li>
              <li>Improve our service</li>
              <li>Enhance user experience</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-600 mb-6">
              We implement appropriate security measures to protect your information. 
              Your data is never sold to third parties.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about our privacy policy, please contact us at{' '}
              <a href="mailto:ksanjeev284@gmail.com" className="text-purple-600 hover:text-purple-700">
                ksanjeev284@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 