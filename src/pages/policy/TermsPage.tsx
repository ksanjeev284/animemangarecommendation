import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function TermsPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          
          <div className="prose prose-purple max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Terms</h2>
            <p className="text-gray-600 mb-6">
              By accessing AnimeTrend, you agree to be bound by these terms of service and comply
              with all applicable laws and regulations.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Use License</h2>
            <p className="text-gray-600 mb-6">
              This is for personal use only. You may not:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>Modify or copy the materials</li>
              <li>Use the materials for commercial purposes</li>
              <li>Remove any copyright or proprietary notations</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Disclaimer</h2>
            <p className="text-gray-600 mb-6">
              The materials on AnimeTrend are provided on an 'as is' basis. We make no
              warranties, expressed or implied, and hereby disclaim all other warranties.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Limitations</h2>
            <p className="text-gray-600 mb-6">
              AnimeTrend shall not be held liable for any damages arising out of the use
              or inability to use the materials on our website.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-600">
              Questions about these terms? Contact us at{' '}
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