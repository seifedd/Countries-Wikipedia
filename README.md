# Countries-Wikipedia (FullStack MVP)

A FullStack MVP web application that displays country data such as flags, population, region, and language information, utilizing external APIs. Originally a purely vanilla Javascript frontend, it has been upgraded to a FullStack Node.js architecture to proxy API requests and secure sensitive keys.

## Features
- Search and select a country from the dropdown.
- Look up your current GPS location and display your country's data automatically.
- Secure API proxying through a Node.js/Express backend, preventing API key exposure to the client.

## Technologies Used
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+), Fetch API
- **Backend**: Node.js, Express, Axios, CORS, dotenv
- **APIs Used**:
  - `restcountries.com` for country data.
  - `geocode.xyz` for reverse geocoding coordinates.
  - Native `navigator.geolocation` for retrieving client location.

## Local Setup

### Prerequisites
- Node.js installed (v14+ recommended)
- A free API key from [Geocode.xyz](https://geocode.xyz/)

### Installation

1. Copy the environment configuration file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and replace `YOUR_API_KEY_HERE` with your Geocode API key.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
   (Wait, `npm start` requires a start script in package.json. I should just say `node server.js` or I will add the start script. Let me add the start script).

Actually, I will update package.json to have start script first, then complete README.

```bash
node server.js
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.
