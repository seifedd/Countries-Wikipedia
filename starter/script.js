'use strict';

const countriesContainer = document.querySelector('.countries');
const btn_where_am_i = document.querySelector('.btn-where-Am-I');
const dropdown = document.querySelector('.dropdown-country');
const btn_country = document.querySelector('.btn-country');
const loader = document.getElementById('loader');
const errorContainer = document.getElementById('error-container');

// Helper to show/hide loader
const toggleLoader = (show) => {
  loader.style.display = show ? 'block' : 'none';
};

// Helper to render error messages
const renderError = (message) => {
  errorContainer.innerHTML = `<div class="error-msg">${message}</div>`;
  setTimeout(() => {
    errorContainer.innerHTML = '';
  }, 5000);
};

// Main function to render country markup
const renderCountry = function(data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.svg || data.flags.png}" alt="Flag of ${data.name.common}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)}M people</p>
        <p class="country__row"><span>🗣️</span>${Object.values(data.languages || {})[0] || 'N/A'}</p>
        <p class="country__row"><span>💰</span>${Object.values(data.currencies || {})[0]?.name || 'N/A'}</p>
      </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

// API Call: Fetch country by name
const getCountryData = async function(country) {
  try {
    toggleLoader(true);
    errorContainer.innerHTML = '';
    
    const response = await fetch(`/api/country/${encodeURIComponent(country)}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch country data');
    }

    if (!data || data.length === 0) {
      throw new Error('Country not found');
    }

    renderCountry(data[0]);
  } catch (err) {
    console.error(err);
    renderError(`⚠️ ${err.message}`);
  } finally {
    toggleLoader(false);
  }
};

// API Call: Get current location and fetch data
const getLocation = function() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function() {
  try {
    toggleLoader(true);
    errorContainer.innerHTML = '';
    countriesContainer.innerHTML = ''; // Clear previous results

    const pos = await getLocation();
    const { latitude, longitude } = pos.coords;

    const response = await fetch(`/api/location/${latitude}/${longitude}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to determine location');
    }

    if (!data.country) {
      throw new Error('Could not identify country at these coordinates');
    }

    await getCountryData(data.country);
  } catch (err) {
    console.error(err);
    const msg = err.code === 1 ? 'Please allow location access to use this feature' : err.message;
    renderError(`📍 ${msg}`);
  } finally {
    toggleLoader(false);
  }
};

// Event Listeners
btn_country.addEventListener('click', function() {
  const country = dropdown.value;
  if (!country) {
    renderError('Please select a country first');
    return;
  }
  countriesContainer.innerHTML = ''; // Clear previous
  getCountryData(country);
});

btn_where_am_i.addEventListener('click', whereAmI);
