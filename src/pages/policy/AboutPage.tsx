import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function AboutPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About AnimeTrend</h1>
          
          <div className="prose prose-purple max-w-none">
            <p className="text-gray-600 mb-6">
              Welcome to AnimeTrend, your AI-powered companion for discovering amazing anime and manga content. 
              Our platform is designed to make it easier than ever to find your next favorite series.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              We believe that everyone should have access to personalized anime and manga recommendations 
              that match their unique tastes and preferences. Our AI-powered system analyzes various factors 
              to provide you with the most relevant suggestions.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 mb-6">
              AnimeTrend uses advanced algorithms to analyze your preferences, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>Genre preferences</li>
              <li>Rating preferences</li>
              <li>Release year preferences</li>
              <li>Similar content analysis</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">
              Have questions or suggestions? We'd love to hear from you! 
              Reach out to us at <a href="mailto:ksanjeev284@gmail.com" className="text-purple-600 hover:text-purple-700">ksanjeev284@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 