import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { 
  Upload, 
  FileText, 
  Download, 
  Clock, 
  TrendingDown,
  BarChart3,
  Zap,
  FileArchive,
  RefreshCw
} from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import FileUploadZone from '../components/FileUploadZone';
import CompressionStats from '../components/CompressionStats';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('huffman');
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressionResult, setCompressionResult] = useState(null);
  const [processType, setProcessType] = useState('compress'); // 'compress' or 'decompress'
  const { showSuccess, showError, showInfo } = useToast();

  const algorithms = [
    { 
      id: 'huffman', 
      name: 'Huffman Coding',
      description: 'Variable-length codes based on character frequency',
      icon: <BarChart3 className="h-5 w-5" />
    },
    { 
      id: 'rle', 
      name: 'Run-Length Encoding',
      description: 'Replaces repeated characters with count + character',
      icon: <RefreshCw className="h-5 w-5" />
    },
    { 
      id: 'lz77', 
      name: 'LZ77',
      description: 'Dictionary-based compression with sliding window',
      icon: <FileArchive className="h-5 w-5" />
    },
  ];

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setUploadedFile(response.data.file);
        showSuccess('File uploaded successfully!');
        setCompressionResult(null); // Clear previous results
      }
    } catch (error) {
      console.error('Upload error:', error);
      showError('Failed to upload file. Please try again.');
    }
  };

  const handleCompress = async () => {
    if (!uploadedFile) {
      showError('Please upload a file first.');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await axios.post('/api/compress', {
        fileId: uploadedFile.id,
        algorithm: selectedAlgorithm,
        originalName: uploadedFile.originalName,
      });

      if (response.data.success) {
        setCompressionResult({
          type: 'compression',
          ...response.data,
        });
        showSuccess(`File compressed successfully using ${algorithms.find(a => a.id === selectedAlgorithm)?.name}!`);
      }
    } catch (error) {
      console.error('Compression error:', error);
      showError('Compression failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecompress = async () => {
    if (!compressionResult?.compressedFile) {
      showError('No compressed file available to decompress.');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await axios.post('/api/decompress', {
        fileId: compressionResult.compressedFile,
        algorithm: selectedAlgorithm,
        originalName: uploadedFile?.originalName,
      });

      if (response.data.success) {
        setCompressionResult(prev => ({
          ...prev,
          decompression: response.data,
        }));
        showSuccess('File decompressed successfully!');
      }
    } catch (error) {
      console.error('Decompression error:', error);
      showError('Decompression failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async (filename, type = 'compressed') => {
    try {
      const response = await axios.get(`/api/download/${filename}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      showSuccess(`${type === 'compressed' ? 'Compressed' : 'Decompressed'} file downloaded successfully!`);
    } catch (error) {
      console.error('Download error:', error);
      showError('Download failed. Please try again.');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-bg text-blue-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Data Compression Portal
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Upload files and compress them using various algorithms including Huffman Coding, 
            Run-Length Encoding, and LZ77. Compare efficiency and learn how compression works.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - File Upload and Algorithm Selection */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* File Upload */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Upload className="h-6 w-6 mr-2 text-primary-600" />
                Upload File
              </h2>
              <FileUploadZone onFileUpload={handleFileUpload} />
              
              {uploadedFile && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-green-600 mr-2" />
                      <div>
                        <p className="font-medium text-green-900">{uploadedFile.originalName}</p>
                        <p className="text-sm text-green-700">Size: {formatFileSize(uploadedFile.size)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Algorithm Selection */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Zap className="h-6 w-6 mr-2 text-primary-600" />
                Choose Algorithm
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {algorithms.map((algorithm) => (
                  <button
                    key={algorithm.id}
                    onClick={() => setSelectedAlgorithm(algorithm.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      selectedAlgorithm === algorithm.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      {algorithm.icon}
                      <span className="ml-2 font-semibold text-gray-900">
                        {algorithm.name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {algorithm.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="card">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleCompress}
                  disabled={!uploadedFile || isProcessing}
                  className="btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <TrendingDown className="h-5 w-5 mr-2" />
                  )}
                  Compress File
                </button>

                <button
                  onClick={handleDecompress}
                  disabled={!compressionResult?.compressedFile || isProcessing}
                  className="btn-secondary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <RefreshCw className="h-5 w-5 mr-2" />
                  )}
                  Decompress File
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Results and Statistics */}
          <div className="space-y-8">
            
            {/* Compression Statistics */}
            {compressionResult && (
              <CompressionStats 
                result={compressionResult}
                algorithm={algorithms.find(a => a.id === selectedAlgorithm)}
              />
            )}

            {/* Download Section */}
            {compressionResult && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Download className="h-5 w-5 mr-2 text-primary-600" />
                  Download Files
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handleDownload(compressionResult.compressedFile, 'compressed')}
                    className="w-full btn-outline text-left flex items-center justify-between"
                  >
                    <span>Compressed File</span>
                    <Download className="h-4 w-4" />
                  </button>
                  
                  {compressionResult.decompression && (
                    <button
                      onClick={() => handleDownload(compressionResult.decompression.decompressedFile, 'decompressed')}
                      className="w-full btn-outline text-left flex items-center justify-between"
                    >
                      <span>Decompressed File</span>
                      <Download className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="card bg-gradient-to-r from-primary-50 to-secondary-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Files Processed</span>
                  <span className="font-semibold text-primary-600">
                    {compressionResult ? '1' : '0'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Selected Algorithm</span>
                  <span className="font-semibold text-secondary-600">
                    {algorithms.find(a => a.id === selectedAlgorithm)?.name}
                  </span>
                </div>
                {compressionResult && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Compression Ratio</span>
                    <span className="font-semibold text-green-600">
                      {compressionResult.statistics?.compressionRatio}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 