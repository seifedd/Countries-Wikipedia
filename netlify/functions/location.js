const axios = require('axios');

exports.handler = async (event, context) => {
  // Extract lat/lng from the path: /.netlify/functions/location/52.508/13.381
  const pathParts = event.path.split('/');
  const lng = parseFloat(pathParts[pathParts.length - 1]);
  const lat = parseFloat(pathParts[pathParts.length - 2]);
  const apiKey = process.env.GEOCODE_API_KEY;

  if (isNaN(lat) || isNaN(lng)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Latitude and longitude must be valid numbers' }),
    };
  }

  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Latitude or longitude out of range' }),
    };
  }

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GEOCODE_API_KEY not configured on server' }),
    };
  }

  try {
    const response = await axios.get(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=${apiKey}`);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error fetching location:', error.message);
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: 'Failed to fetch location data', details: error.message }),
    };
  }
};
