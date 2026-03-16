const axios = require('axios');

exports.handler = async (event, context) => {
  // Extract country name from the path: /.netlify/functions/country/Brazil
  const pathParts = event.path.split('/');
  const name = pathParts[pathParts.length - 1];

  if (!name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Country name is required' }),
    };
  }

  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error fetching country:', error.message);
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: 'Failed to fetch country data', details: error.message }),
    };
  }
};
