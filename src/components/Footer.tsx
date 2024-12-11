import React from 'react';
import { Mail, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900">
            AnimeTrend
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <a 
              href="mailto:ksanjeev284@gmail.com" 
              className="text-gray-500 hover:text-purple-600 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a 
              href="https://github.com/ksanjeev284" 
              className="text-gray-500 hover:text-purple-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <a href="/about" className="hover:text-purple-600 transition-colors">
              About
            </a>
            <a href="/privacy" className="hover:text-purple-600 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-purple-600 transition-colors">
              Terms of Service
            </a>
            <a href="/contact" className="hover:text-purple-600 transition-colors">
              Contact
            </a>
          </nav>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} AnimeTrend. Made with ❤️ by Sanjeev
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Data provided by Jikan API
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 