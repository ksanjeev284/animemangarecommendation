import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Github, Send } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    window.location.href = `mailto:ksanjeev284@gmail.com?subject=Contact from ${formData.name}&body=${formData.message}`;
  };

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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>

          <div className="mb-8">
            <p className="text-gray-600">
              Have questions or suggestions? We'd love to hear from you. Choose your preferred way to reach out:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <a
              href="mailto:ksanjeev284@gmail.com"
              className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-purple-500 transition-colors"
            >
              <Mail className="h-6 w-6 text-purple-500 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">Email Us</h3>
                <p className="text-sm text-gray-600">ksanjeev284@gmail.com</p>
              </div>
            </a>

            <a
              href="https://github.com/ksanjeev284"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-purple-500 transition-colors"
            >
              <Github className="h-6 w-6 text-purple-500 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">GitHub</h3>
                <p className="text-sm text-gray-600">@ksanjeev284</p>
              </div>
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 