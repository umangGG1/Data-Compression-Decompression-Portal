const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');
const compression = require('compression');
const helmet = require('helmet');

// Import compression algorithms
const HuffmanCoding = require('./algorithms/huffman');
const RunLengthEncoding = require('./algorithms/rle');
const LZ77 = require('./algorithms/lz77');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
const processedDir = path.join(__dirname, 'processed');
fs.ensureDirSync(uploadsDir);
fs.ensureDirSync(processedDir);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept all file types
        cb(null, true);
    }
});

// Algorithm information endpoint
app.get('/api/algorithms', (req, res) => {
    const algorithms = {
        huffman: {
            name: 'Huffman Coding',
            description: 'A lossless data compression algorithm that uses variable-length codes for different characters based on their frequency of occurrence.',
            complexity: 'O(n log n)',
            bestFor: 'Text files with varying character frequencies',
            pros: ['Optimal for known character frequencies', 'Good compression ratio for text'],
            cons: ['Requires two passes through data', 'Poor performance on random data']
        },
        rle: {
            name: 'Run-Length Encoding',
            description: 'A simple compression algorithm that replaces sequences of repeated characters with a count and the character.',
            complexity: 'O(n)',
            bestFor: 'Files with many repeated characters (e.g., simple graphics, sparse data)',
            pros: ['Very simple and fast', 'Excellent for repetitive data'],
            cons: ['Can increase file size for non-repetitive data', 'Not suitable for complex data']
        },
        lz77: {
            name: 'LZ77',
            description: 'A lossless data compression algorithm that uses a sliding window to find repeated sequences and replaces them with references.',
            complexity: 'O(n²) to O(n³)',
            bestFor: 'General-purpose compression, works well on most file types',
            pros: ['Good general-purpose compression', 'Basis for many modern algorithms'],
            cons: ['Computationally intensive', 'Complex implementation']
        }
    };
    
    res.json(algorithms);
});

// File upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const fileInfo = {
            id: req.file.filename,
            originalName: req.file.originalname,
            size: req.file.size,
            mimetype: req.file.mimetype,
            path: req.file.path
        };

        res.json({
            success: true,
            file: fileInfo,
            message: 'File uploaded successfully'
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Upload failed' });
    }
});

// Compression endpoint
app.post('/api/compress', async (req, res) => {
    try {
        const { fileId, algorithm, originalName } = req.body;
        
        if (!fileId || !algorithm) {
            return res.status(400).json({ error: 'File ID and algorithm are required' });
        }

        const filePath = path.join(uploadsDir, fileId);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Extract original file extension
        const originalExt = originalName ? path.extname(originalName) : '';
        const baseName = originalName ? path.basename(originalName, originalExt) : fileId;

        // Read file data
        const data = fs.readFileSync(filePath, 'utf8');
        const startTime = Date.now();
        
        let result;
        let compressedFileName;
        
        switch (algorithm) {
            case 'huffman':
                result = HuffmanCoding.compress(data);
                compressedFileName = `${baseName}_compressed_huffman${originalExt}`;
                break;
            case 'rle':
                result = RunLengthEncoding.compressOptimal(data);
                compressedFileName = `${baseName}_compressed_rle${originalExt}`;
                break;
            case 'lz77':
                result = LZ77.compressSimple(data);
                compressedFileName = `${baseName}_compressed_lz77${originalExt}`;
                break;
            default:
                return res.status(400).json({ error: 'Unknown algorithm' });
        }

        const processingTime = Date.now() - startTime;
        const compressedPath = path.join(processedDir, compressedFileName);

        // Save compressed data
        if (algorithm === 'huffman') {
            // Save Huffman data with metadata
            const huffmanData = {
                compressedData: result.compressedData.toString('base64'),
                tree: result.tree,
                originalSize: result.originalSize,
                compressedSize: result.compressedSize
            };
            fs.writeFileSync(compressedPath, JSON.stringify(huffmanData));
        } else {
            fs.writeFileSync(compressedPath, result.compressedData);
        }

        res.json({
            success: true,
            compressedFile: compressedFileName,
            statistics: {
                originalSize: result.originalSize,
                compressedSize: result.compressedSize,
                compressionRatio: result.compressionRatio,
                processingTime: processingTime,
                algorithm: algorithm
            }
        });
    } catch (error) {
        console.error('Compression error:', error);
        res.status(500).json({ error: 'Compression failed' });
    }
});

// Decompression endpoint  
app.post('/api/decompress', async (req, res) => {
    try {
        const { fileId, algorithm, originalName } = req.body;
        
        if (!fileId || !algorithm) {
            return res.status(400).json({ error: 'File ID and algorithm are required' });
        }

        const filePath = path.join(processedDir, fileId);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Compressed file not found' });
        }

        // Extract original file extension from the compressed filename
        let originalExt = '';
        let baseName = fileId;
        
        if (originalName) {
            originalExt = path.extname(originalName);
            baseName = path.basename(originalName, originalExt);
        } else {
            // Try to extract from compressed filename pattern
            const match = fileId.match(/(.+)_compressed_(huffman|rle|lz77)(\..+)?$/);
            if (match) {
                baseName = match[1];
                originalExt = match[3] || '';
            }
        }

        const startTime = Date.now();
        let decompressedData;
        
        switch (algorithm) {
            case 'huffman':
                const huffmanData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                const compressedBuffer = Buffer.from(huffmanData.compressedData, 'base64');
                decompressedData = HuffmanCoding.decompress(compressedBuffer, huffmanData.tree);
                break;
            case 'rle':
                const rleData = fs.readFileSync(filePath);
                decompressedData = RunLengthEncoding.decompressOptimal(rleData);
                break;
            case 'lz77':
                const lz77Data = fs.readFileSync(filePath);
                decompressedData = LZ77.decompressSimple(lz77Data);
                break;
            default:
                return res.status(400).json({ error: 'Unknown algorithm' });
        }

        const processingTime = Date.now() - startTime;
        const decompressedFileName = `${baseName}_decompressed${originalExt}`;
        const decompressedPath = path.join(processedDir, decompressedFileName);

        // Save decompressed data
        fs.writeFileSync(decompressedPath, decompressedData);

        res.json({
            success: true,
            decompressedFile: decompressedFileName,
            statistics: {
                decompressedSize: decompressedData.length,
                processingTime: processingTime,
                algorithm: algorithm
            }
        });
    } catch (error) {
        console.error('Decompression error:', error);
        res.status(500).json({ error: 'Decompression failed' });
    }
});

// File download endpoint
app.get('/api/download/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(processedDir, filename);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found' });
        }

        res.download(filePath, (err) => {
            if (err) {
                console.error('Download error:', err);
                res.status(500).json({ error: 'Download failed' });
            }
        });
    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ error: 'Download failed' });
    }
});

// File info endpoint
app.get('/api/file/:fileId', (req, res) => {
    try {
        const fileId = req.params.fileId;
        const filePath = path.join(uploadsDir, fileId);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found' });
        }

        const stats = fs.statSync(filePath);
        res.json({
            success: true,
            file: {
                id: fileId,
                size: stats.size,
                created: stats.birthtime,
                modified: stats.mtime
            }
        });
    } catch (error) {
        console.error('File info error:', error);
        res.status(500).json({ error: 'Failed to get file info' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve static files from the React app build directory in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    
    // Catch all handler: send back React's index.html file for any non-API routes
    app.get('*', (req, res) => {
        if (!req.path.startsWith('/api/')) {
            res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
        }
    });
}

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Uploads directory: ${uploadsDir}`);
    console.log(`Processed files directory: ${processedDir}`);
});

module.exports = app; 