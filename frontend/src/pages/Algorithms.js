import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart3, 
  RefreshCw, 
  FileArchive, 
  ArrowRight, 
  CheckCircle, 
  XCircle,
  Clock,
  Zap,
  BookOpen
} from 'lucide-react';

const Algorithms = () => {
  const [algorithms, setAlgorithms] = useState({});
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('huffman');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlgorithms();
  }, []);

  const fetchAlgorithms = async () => {
    try {
      const response = await axios.get('/api/algorithms');
      setAlgorithms(response.data);
    } catch (error) {
      console.error('Failed to fetch algorithms:', error);
    } finally {
      setLoading(false);
    }
  };

  const algorithmIcons = {
    huffman: <BarChart3 className="h-8 w-8" />,
    rle: <RefreshCw className="h-8 w-8" />,
    lz77: <FileArchive className="h-8 w-8" />
  };

  const algorithmExamples = {
    huffman: {
      input: "AAABBC",
      steps: [
        "Count character frequencies: A=3, B=2, C=1",
        "Build binary tree with least frequent at bottom",
        "Assign codes: A=0, B=10, C=11",
        "Encode: AAABBC → 000101011"
      ],
      output: "000101011 (9 bits vs 48 bits original)"
    },
    rle: {
      input: "AAABBBCCCCDD",
      steps: [
        "Find consecutive characters",
        "Count repetitions",
        "Replace with count+character pairs",
        "A3B3C4D2"
      ],
      output: "A3B3C4D2 (8 characters vs 12 original)"
    },
    lz77: {
      input: "ABCABCABC",
      steps: [
        "Process characters sequentially",
        "Look for matches in sliding window",
        "Encode as (offset, length, next_char)",
        "ABC<3,3>ABC becomes ABC(3,3,A)BC"
      ],
      output: "Compressed with backward references"
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <BookOpen className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Compression Algorithms
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Learn about different data compression algorithms, how they work, 
              and when to use them for optimal results.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Algorithm Navigation */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Algorithms
              </h2>
              <nav className="space-y-2">
                {Object.entries(algorithms).map(([key, algorithm]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedAlgorithm(key)}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                      selectedAlgorithm === key
                        ? 'bg-primary-600 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={selectedAlgorithm === key ? 'text-white' : 'text-primary-600'}>
                        {algorithmIcons[key]}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{algorithm.name}</p>
                        <p className="text-sm opacity-75">{algorithm.complexity}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Algorithm Details */}
          <div className="lg:col-span-3 space-y-8">
            {algorithms[selectedAlgorithm] && (
              <>
                {/* Algorithm Overview */}
                <div className="card">
                  <div className="flex items-center mb-6">
                    <div className="text-primary-600">
                      {algorithmIcons[selectedAlgorithm]}
                    </div>
                    <div className="ml-4">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {algorithms[selectedAlgorithm].name}
                      </h2>
                      <p className="text-gray-600">
                        {algorithms[selectedAlgorithm].complexity} complexity
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 text-lg">
                    {algorithms[selectedAlgorithm].description}
                  </p>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Best For:</h3>
                    <p className="text-blue-800">{algorithms[selectedAlgorithm].bestFor}</p>
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      Advantages
                    </h3>
                    <ul className="space-y-2">
                      {algorithms[selectedAlgorithm].pros.map((pro, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <XCircle className="h-5 w-5 text-red-600 mr-2" />
                      Disadvantages
                    </h3>
                    <ul className="space-y-2">
                      {algorithms[selectedAlgorithm].cons.map((con, index) => (
                        <li key={index} className="flex items-start">
                          <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Example */}
                {algorithmExamples[selectedAlgorithm] && (
                  <div className="card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Zap className="h-5 w-5 text-yellow-600 mr-2" />
                      Example Walkthrough
                    </h3>

                    <div className="space-y-4">
                      {/* Input */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Input:</h4>
                        <code className="text-lg font-mono bg-white px-3 py-1 rounded border">
                          {algorithmExamples[selectedAlgorithm].input}
                        </code>
                      </div>

                      {/* Steps */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Steps:</h4>
                        <div className="space-y-3">
                          {algorithmExamples[selectedAlgorithm].steps.map((step, index) => (
                            <div key={index} className="flex items-start">
                              <div className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                                {index + 1}
                              </div>
                              <p className="text-gray-700">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Output */}
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-900 mb-2">Output:</h4>
                        <code className="text-lg font-mono bg-white px-3 py-1 rounded border text-green-800">
                          {algorithmExamples[selectedAlgorithm].output}
                        </code>
                      </div>
                    </div>
                  </div>
                )}

                {/* Performance Characteristics */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="h-5 w-5 text-purple-600 mr-2" />
                    Performance Characteristics
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-medium text-purple-900">Time Complexity</h4>
                      <p className="text-purple-700">{algorithms[selectedAlgorithm].complexity}</p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <BarChart3 className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-medium text-blue-900">Compression Ratio</h4>
                      <p className="text-blue-700">
                        {selectedAlgorithm === 'huffman' ? 'Variable' : 
                         selectedAlgorithm === 'rle' ? 'High for repetitive' : 'Good general'}
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <Zap className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <h4 className="font-medium text-green-900">Speed</h4>
                      <p className="text-green-700">
                        {selectedAlgorithm === 'huffman' ? 'Medium' : 
                         selectedAlgorithm === 'rle' ? 'Very Fast' : 'Slow'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Try It Out CTA */}
                <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Ready to try {algorithms[selectedAlgorithm].name}?
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Upload a file and see how this algorithm performs on your data.
                    </p>
                    <a
                      href="/"
                      className="btn-primary inline-flex items-center"
                    >
                      Try It Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Algorithms; 