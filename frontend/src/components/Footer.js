import React from 'react';
import { FileArchive, Github, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <FileArchive className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">CompressX</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              A comprehensive data compression and decompression portal featuring multiple algorithms 
              including Huffman Coding, Run-Length Encoding, and LZ77. Built for educational and 
              practical purposes.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/yourusername/data-compression-portal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Algorithms */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Algorithms</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300">Huffman Coding</span>
              </li>
              <li>
                <span className="text-gray-300">Run-Length Encoding</span>
              </li>
              <li>
                <span className="text-gray-300">LZ77 Compression</span>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300">File Upload & Download</span>
              </li>
              <li>
                <span className="text-gray-300">Compression Statistics</span>
              </li>
              <li>
                <span className="text-gray-300">Algorithm Explanations</span>
              </li>
              <li>
                <span className="text-gray-300">Responsive Design</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 CompressX. Built for educational purposes.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Built with</span>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400 text-sm font-medium">React</span>
                <span className="text-gray-400">•</span>
                <span className="text-green-400 text-sm font-medium">Node.js</span>
                <span className="text-gray-400">•</span>
                <span className="text-cyan-400 text-sm font-medium">Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 