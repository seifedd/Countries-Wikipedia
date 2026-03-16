const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { param, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "https://flagcdn.com", "https://restcountries.com"],
    },
  },
}));

// Rate Limiting to prevent DDoS/Abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
});

app.use('/api/', limiter);
app.use(cors());
app.use(express.json());

// Serve the frontend static files
app.use(express.static(path.join(__dirname, 'starter')));

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Proxy endpoint for reverse geocoding
app.get('/api/location/:lat/:lng',
  [
    param('lat').isFloat({ min: -90, max: 90 }),
    param('lng').isFloat({ min: -180, max: 180 }),
    validate
  ],
  async (req, res) => {
    const { lat, lng } = req.params;
    const apiKey = process.env.GEOCODE_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'GEOCODE_API_KEY not configured on server' });
    }

    try {
      const response = await axios.get(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=${apiKey}`);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching location:', error.message);
      res.status(error.response?.status || 500).json({ 
        error: 'Failed to fetch location data',
        details: 'An error occurred while retrieving location info.'
      });
    }
});

// Proxy endpoint for getting country data
app.get('/api/country/:name',
  [
    param('name').isString().trim().escape().isLength({ min: 1, max: 100 }),
    validate
  ],
  async (req, res) => {
    const { name } = req.params;
    
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching country:', error.message);
      res.status(error.response?.status || 500).json({ 
        error: 'Failed to fetch country data',
        details: 'Country not found or service unavailable.'
      });
    }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
