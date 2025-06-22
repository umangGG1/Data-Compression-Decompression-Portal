import React from 'react';
import { BarChart3, Clock, TrendingDown, FileText, Zap } from 'lucide-react';

const CompressionStats = ({ result, algorithm }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (ms) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const getCompressionColor = (ratio) => {
    const numRatio = parseFloat(ratio);
    if (numRatio >= 50) return 'text-green-600';
    if (numRatio >= 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompressionQuality = (ratio) => {
    const numRatio = parseFloat(ratio);
    if (numRatio >= 50) return 'Excellent';
    if (numRatio >= 25) return 'Good';
    if (numRatio >= 10) return 'Fair';
    if (numRatio >= 0) return 'Poor';
    return 'Increased Size';
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <BarChart3 className="h-5 w-5 mr-2 text-primary-600" />
        Compression Results
      </h3>

      {/* Algorithm Info */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center mb-2">
          {algorithm?.icon}
          <span className="ml-2 font-medium text-gray-900">{algorithm?.name}</span>
        </div>
        <p className="text-sm text-gray-600">{algorithm?.description}</p>
      </div>

      {/* Main Stats */}
      <div className="space-y-4">
        {/* File Sizes */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <FileText className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-900">Original Size</span>
            </div>
            <p className="text-lg font-bold text-blue-600">
              {formatFileSize(result.statistics?.originalSize || 0)}
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <TrendingDown className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-900">Compressed Size</span>
            </div>
            <p className="text-lg font-bold text-green-600">
              {formatFileSize(result.statistics?.compressedSize || 0)}
            </p>
          </div>
        </div>

        {/* Compression Ratio */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">Compression Ratio</span>
            <span className={`text-sm font-medium ${getCompressionColor(result.statistics?.compressionRatio || '0')}`}>
              {getCompressionQuality(result.statistics?.compressionRatio || '0')}
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <span className={`text-2xl font-bold ${getCompressionColor(result.statistics?.compressionRatio || '0')}`}>
              {result.statistics?.compressionRatio || '0'}%
            </span>
            <span className="text-sm text-gray-600">
              Space Saved
            </span>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar">
            <div 
              className={`progress-fill ${
                parseFloat(result.statistics?.compressionRatio || '0') >= 50 
                  ? 'bg-green-500' 
                  : parseFloat(result.statistics?.compressionRatio || '0') >= 25 
                  ? 'bg-yellow-500' 
                  : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(Math.max(parseFloat(result.statistics?.compressionRatio || '0'), 0), 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Processing Time */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Clock className="h-4 w-4 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-900">Processing Time</span>
          </div>
          <p className="text-lg font-bold text-purple-600">
            {formatTime(result.statistics?.processingTime || 0)}
          </p>
        </div>

        {/* Space Saved */}
        {result.statistics?.originalSize && result.statistics?.compressedSize && (
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Zap className="h-4 w-4 text-indigo-600 mr-2" />
              <span className="text-sm font-medium text-indigo-900">Space Saved</span>
            </div>
            <p className="text-lg font-bold text-indigo-600">
              {formatFileSize(result.statistics.originalSize - result.statistics.compressedSize)}
            </p>
          </div>
        )}

        {/* Decompression Results */}
        {result.decompression && (
          <div className="border-t pt-4 mt-4">
            <h4 className="font-semibold text-gray-900 mb-3">Decompression Results</h4>
            <div className="bg-cyan-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center mb-1">
                    <Clock className="h-4 w-4 text-cyan-600 mr-2" />
                    <span className="text-sm font-medium text-cyan-900">Decompression Time</span>
                  </div>
                  <p className="text-lg font-bold text-cyan-600">
                    {formatTime(result.decompression.statistics?.processingTime || 0)}
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <FileText className="h-4 w-4 text-cyan-600 mr-2" />
                    <span className="text-sm font-medium text-cyan-900">Restored Size</span>
                  </div>
                  <p className="text-lg font-bold text-cyan-600">
                    {formatFileSize(result.decompression.statistics?.decompressedSize || 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompressionStats;