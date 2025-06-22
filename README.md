# Data Compression & Decompression Portal

A comprehensive web application that allows users to upload files and apply various data compression algorithms including Huffman Coding, Run-Length Encoding (RLE), and LZ77. The system demonstrates the efficiency of different algorithms by providing compression ratios and allows users to download the processed files.

## 🌟 Features

### Core Functionality
- **File Upload**: Drag-and-drop or click to upload files (supports all file types, max 50MB)
- **Multiple Compression Algorithms**: 
  - Huffman Coding (variable-length codes based on character frequency)
  - Run-Length Encoding (replaces repeated characters with count + character)
  - LZ77 (dictionary-based compression with sliding window)
- **Compression & Decompression**: Full round-trip compression and decompression
- **Real-time Statistics**: Display compression ratio, original size, compressed size, and processing time
- **File Download**: Download both compressed and decompressed files

### Educational Features
- **Algorithm Explanations**: Detailed descriptions of each compression algorithm
- **Visual Examples**: Step-by-step walkthroughs showing how each algorithm works
- **Performance Comparisons**: Compare time complexity, compression ratios, and use cases
- **Interactive Learning**: Experiment with different file types to see algorithm performance

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Built with Tailwind CSS for a clean, professional interface
- **Real-time Feedback**: Toast notifications and loading states for better UX
- **Error Handling**: Comprehensive error handling with user-friendly messages

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **React Router** - Declarative routing for React applications
- **Axios** - Promise-based HTTP client for API requests
- **React Dropzone** - Simple drag-and-drop file upload component
- **Lucide React** - Beautiful, customizable icons

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, minimalist web framework for Node.js
- **Multer** - Middleware for handling multipart/form-data (file uploads)
- **CORS** - Cross-Origin Resource Sharing middleware
- **Helmet** - Security middleware for Express applications

### Algorithms
- **Custom JavaScript Implementations** of:
  - Huffman Coding with binary tree construction
  - Run-Length Encoding with optimized text processing
  - LZ77 with sliding window compression

## 📁 Project Structure

```
data-compression-portal/
├── backend/
│   ├── algorithms/
│   │   ├── huffman.js          # Huffman coding implementation
│   │   ├── rle.js              # Run-Length Encoding implementation
│   │   └── lz77.js             # LZ77 compression implementation
│   ├── uploads/                # Temporary file storage
│   ├── processed/              # Processed file storage
│   ├── package.json
│   └── server.js               # Main server file
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── Toast.js
│   │   │   ├── FileUploadZone.js
│   │   │   ├── CompressionStats.js
│   │   │   └── LoadingSpinner.js
│   │   ├── contexts/
│   │   │   └── ToastContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Algorithms.js
│   │   │   └── About.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/data-compression-portal.git
cd data-compression-portal
```

2. **Install dependencies for all packages**
```bash
npm run install-deps
```

3. **Start the development servers**
```bash
npm run dev
```

This will start both the backend server (port 5000) and frontend development server (port 3000).

### Manual Setup (Alternative)

If the automated setup doesn't work, you can set up each part manually:

1. **Backend Setup**
```bash
cd backend
npm install
npm run dev
```

2. **Frontend Setup** (in a new terminal)
```bash
cd frontend
npm install
npm start
```

## 📖 API Documentation

### Endpoints

#### `GET /api/algorithms`
Returns information about available compression algorithms.

#### `POST /api/upload`
Upload a file for compression.
- **Body**: FormData with file
- **Response**: File information and unique ID

#### `POST /api/compress`
Compress an uploaded file.
- **Body**: `{ fileId: string, algorithm: string }`
- **Response**: Compression statistics and compressed file ID

#### `POST /api/decompress`
Decompress a compressed file.
- **Body**: `{ fileId: string, algorithm: string }`
- **Response**: Decompression statistics and decompressed file ID

#### `GET /api/download/:filename`
Download a processed file.

#### `GET /api/health`
Health check endpoint.

## 🧪 Algorithm Details

### Huffman Coding
- **Time Complexity**: O(n log n)
- **Best For**: Text files with varying character frequencies
- **Method**: Builds a binary tree based on character frequencies and assigns variable-length codes

### Run-Length Encoding (RLE)
- **Time Complexity**: O(n)
- **Best For**: Files with many repeated characters
- **Method**: Replaces sequences of repeated characters with count + character pairs

### LZ77
- **Time Complexity**: O(n²) to O(n³)
- **Best For**: General-purpose compression
- **Method**: Uses a sliding window to find repeated sequences and replaces them with references

## 🎯 Use Cases

### Educational
- Computer Science students learning about compression algorithms
- Researchers comparing algorithm performance
- Teachers demonstrating compression concepts

### Practical
- Testing compression efficiency on different file types
- Understanding which algorithm works best for specific data patterns
- Prototyping compression solutions

## 🔒 Security Features

- **File Size Limits**: Maximum 50MB upload limit
- **Temporary Storage**: Files are automatically cleaned up
- **Input Validation**: Comprehensive validation on all endpoints
- **Security Headers**: Helmet.js for security best practices
- **CORS Protection**: Configured for secure cross-origin requests

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- **Huffman Coding**: David A. Huffman (1952)
- **LZ77**: Abraham Lempel and Jacob Ziv (1977)
- **Run-Length Encoding**: Various contributors to data compression research

## 📞 Support

If you have any questions or run into issues:

1. Check the [Issues](https://github.com/yourusername/data-compression-portal/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `build` folder to your hosting service

### Backend (Heroku/Railway/Render)
1. Ensure your backend has a `start` script in package.json
2. Set environment variables if needed
3. Deploy the backend folder

### Environment Variables
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)

## 📊 Performance

- **File Processing**: Optimized for files up to 50MB
- **Memory Usage**: Efficient memory management for large files
- **Processing Speed**: Varies by algorithm and file size
  - RLE: Fastest for repetitive data
  - Huffman: Medium speed, good compression
  - LZ77: Slower but good general-purpose compression

---

**Built with ❤️ by Umang**