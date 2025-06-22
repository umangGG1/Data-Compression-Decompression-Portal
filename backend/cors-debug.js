// Temporary CORS configuration for debugging
// Replace the CORS section in server.js with this for testing

const cors = require('cors');

// TEMPORARY: Allow all origins for debugging
const corsOptions = {
    origin: true, // Allow all origins temporarily
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
};

// Use this instead of the current CORS configuration:
// app.use(cors(corsOptions));

module.exports = corsOptions; 