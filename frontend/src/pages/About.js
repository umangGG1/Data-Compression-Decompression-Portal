import React from 'react';
import { 
  FileArchive, 
  Users, 
  Target, 
  Code, 
  Zap, 
  Shield, 
  Globe,
  Github,
  ExternalLink
} from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <FileArchive className="h-8 w-8 text-blue-600" />,
      title: 'Multiple Algorithms',
      description: 'Support for Huffman Coding, Run-Length Encoding, and LZ77 compression algorithms.'
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: 'Real-time Processing',
      description: 'Fast compression and decompression with real-time statistics and progress tracking.'
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: 'Secure & Private',
      description: 'Files are processed locally and temporarily, ensuring your data remains private.'
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      title: 'Responsive Design',
      description: 'Works seamlessly across desktop, tablet, and mobile devices.'
    },
    {
      icon: <Code className="h-8 w-8 text-red-600" />,
      title: 'Open Source',
      description: 'Built with modern web technologies and available for educational purposes.'
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: 'Educational',
      description: 'Detailed algorithm explanations and examples to help you learn compression.'
    }
  ];

  const techStack = [
    {
      category: 'Frontend',
      technologies: ['React.js', 'Tailwind CSS', 'Axios', 'React Router', 'Lucide React']
    },
    {
      category: 'Backend',
      technologies: ['Node.js', 'Express.js', 'Multer', 'CORS', 'Helmet']
    },
    {
      category: 'Algorithms',
      technologies: ['Huffman Coding', 'Run-Length Encoding', 'LZ77', 'Custom Implementations']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-bg text-blue-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FileArchive className="h-16 w-16 mx-auto mb-6 text-blue-500" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About CompressX
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive data compression and decompression portal built for 
            learning and demonstrating various compression algorithms.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Mission Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Target className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To provide an interactive platform for understanding and experimenting with 
              data compression algorithms, making these concepts accessible to students, 
              developers, and anyone interested in computer science.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Code className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Learn</h3>
              <p className="text-gray-600">
                Understand how different compression algorithms work with detailed 
                explanations and examples.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Experiment</h3>
              <p className="text-gray-600">
                Upload your own files and see how different algorithms perform 
                on various types of data.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Share</h3>
              <p className="text-gray-600">
                Compare results and share your findings with others to learn 
                more about data compression.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Features</h2>
            <p className="text-lg text-gray-600">
              Everything you need to explore data compression algorithms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-hover text-center">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technology Stack</h2>
            <p className="text-lg text-gray-600">
              Built with modern web technologies for optimal performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techStack.map((stack, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  {stack.category}
                </h3>
                <div className="space-y-2">
                  {stack.technologies.map((tech, techIndex) => (
                    <div 
                      key={techIndex}
                      className="bg-gray-50 rounded-lg px-3 py-2 text-center text-gray-700"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">
              Simple steps to compress and decompress your files
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload File</h3>
              <p className="text-gray-600">
                Drag and drop or select a file to upload
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Algorithm</h3>
              <p className="text-gray-600">
                Select from Huffman, RLE, or LZ77 algorithms
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Process File</h3>
              <p className="text-gray-600">
                Compress or decompress with real-time statistics
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Download Results</h3>
              <p className="text-gray-600">
                Download the processed file and view statistics
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Compressing?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Try out our compression algorithms with your own files
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/"
              className="btn-primary inline-flex items-center justify-center"
            >
              Get Started
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
            <a
              href="/algorithms"
              className="btn-outline inline-flex items-center justify-center"
            >
              Learn More
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 