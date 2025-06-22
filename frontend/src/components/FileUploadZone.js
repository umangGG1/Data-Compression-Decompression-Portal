import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle } from 'lucide-react';

const FileUploadZone = ({ onFileUpload, maxSize = 50 * 1024 * 1024 }) => { // 50MB default
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors.some(error => error.code === 'file-too-large')) {
        alert('File is too large. Maximum size is 50MB.');
        return;
      }
    }

    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    maxSize,
    multiple: false,
    accept: {
      'text/*': ['.txt', '.json', '.xml', '.csv', '.log'],
      'application/json': ['.json'],
      'application/xml': ['.xml'],
      'text/plain': ['.txt'],
      'text/csv': ['.csv'],
      '*/*': []
    }
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
        ${isDragActive && !isDragReject 
          ? 'border-primary-500 bg-primary-50' 
          : isDragReject 
          ? 'border-red-500 bg-red-50'
          : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        }
      `}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center space-y-4">
        {isDragReject ? (
          <AlertCircle className="h-12 w-12 text-red-500" />
        ) : (
          <Upload className={`h-12 w-12 ${isDragActive ? 'text-primary-500' : 'text-gray-400'}`} />
        )}
        
        <div className="space-y-2">
          {isDragActive ? (
            isDragReject ? (
              <p className="text-red-600 font-medium">
                File type not supported or file too large
              </p>
            ) : (
              <p className="text-primary-600 font-medium">
                Drop your file here
              </p>
            )
          ) : (
            <>
              <p className="text-gray-600 font-medium">
                Drag and drop your file here, or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Supports text files, JSON, XML, CSV and more (Max: 50MB)
              </p>
            </>
          )}
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <FileText className="h-4 w-4" />
          <span>All file types supported</span>
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;
