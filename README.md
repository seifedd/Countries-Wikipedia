# Global Nations 🌍 | FullStack Portfolio MVP

**Live Demo**: [https://countries-wikipedia-1773640375.netlify.app/](https://countries-wikipedia-1773640375.netlify.app/)

## Overview
**Global Nations** is a premium, secure FullStack web application designed to help users explore country data in real-time. This project serves as a comprehensive demonstration of software engineering skills, ranging from modern UI/UX design (Glassmorphism, Dark Mode) to robust backend proxying and serverless architecture.

Initially a basic vanilla JavaScript project, it has been overhauled into a production-ready application with a strong focus on security, performance, and aesthetics.

## Key Features
- **Dynamic Search**: Instantly find data for any country from a curated list.
- **Geolocation Integration**: "Where Am I?" feature uses the browser's Geolocation API and reverse geocoding to find your current nation.
- **Premium UI/UX**: A state-of-the-art Dark Mode interface featuring Glassmorphism, smooth animations, and Google Fonts (Outfit).
- **Secure Architecture**: All API calls are proxied through a backend to protect sensitive keys and prevent CORS issues.
- **Responsive Design**: Fully optimized for a seamless experience across desktop and mobile devices.

## Tech Stack
- **Frontend**: HTML5, Vanilla JavaScript (ES6+), Premium CSS (Glassmorphism), Google Fonts.
- **Backend (Local)**: Node.js, Express, Axios, Helmet, express-rate-limit.
- **Serverless (Production)**: Netlify Functions for secure API proxying.
- **Security**: 
  - **Rate Limiting**: Protection against DDoS and API abuse.
  - **Helmet.js**: Implementation of secure HTTP headers.
  - **Environment Variables**: Sensitive keys (Geocode.xyz API) are managed securely server-side.
- **External APIs**: [Rest Countries](https://restcountries.com/), [Geocode.xyz](https://geocode.xyz/).

## Security & Best Practices
- **No Hardcoded Secrets**: All API keys have been removed from the client-side code to prevent exposure.
- **Input Validation**: Strict sanitization and validation on both the local Express server and Netlify Functions.
- **DDoS Mitigation**: Integrated rate-limiting to ensure service availability.

## Local Setup

### Prerequisites
- Node.js (v14+ recommended)
- A Geocode.xyz API key

### Installation
1. Clone the repository and navigate into the project folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your Geocode API key: `GEOCODE_API_KEY=your_actual_key_here`
4. Start the application:
   ```bash
   npm start
   ```
5. Visit `http://localhost:3000` to view the app locally.

## Development
- `npm start`: Runs the production-facing Express server.
- `npm run dev`: (Optional) Runs the server with `nodemon` for development.
- `netlify dev`: Runs the project locally with Netlify Functions support.
