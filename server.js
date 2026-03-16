const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve the frontend static files
app.use(express.static(path.join(__dirname, 'starter')));

// Proxy endpoint for reverse geocoding
app.get('/api/location/:lat/:lng', async (req, res) => {
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
      details: error.message 
    });
  }
});

// Proxy endpoint for getting country data
app.get('/api/country/:name', async (req, res) => {
  const { name } = req.params;
  
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching country:', error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'Failed to fetch country data',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
