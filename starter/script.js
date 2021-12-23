'use strict';
const API_KEY = '9a6139dfee3d39f92da505e8867ffdd2';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const container = document.querySelector('.container');
const x = document.getElementById('paragraph');
const btn_where_am_i = document.querySelector('.btn-where-Am-I');
const dropdown = document.querySelector('.dropdown-country');
const btn_country = document.querySelector('.btn-country');
const form = document.getElementById('form-id');
// ///////////////////////////////////
const RenderHTML = function(data, classname = '') {
  const html = `<article class="country ${classname}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${+data.population}</p>
        <p class="country__row"><span>🗣️</span>${
          Object.values(data.languages)[0]
        }</p>
        <p class="country__row"><span>💰</span>${
          Object.keys(data.currencies)[0]
        }</p>
      </div>
      </article> `;
  countriesContainer.insertAdjacentHTML('afterend', html);
  // countriesContainer.style.opacity = 1;
};

const RenderError = function(message) {
  countriesContainer.insertAdjacentText('beforeend', message);
};

// const getCountryData = function(country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function() {
//     const [data] = JSON.parse(this.response);
//     // console.log(data);
//     // console.log(data.flag);
//     const html = RenderHTML(data);
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
const getCountryData = function(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => data[0])
    .then(data => {
      //console.log(data[0]);
      const html = RenderHTML(data);
    });
};

// const getCountryNeighbour = function(country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (response.status != 200) {
//         throw new Error(`Country not found (${response.status})`);
//       }
//       return response.json();
//     })
//     .then(data => data[0])
//     .then(data => {
//       const html = RenderHTML(data);

//       return data.borders;
//     })
//     .then(neighbour => {
//       const country2 = neighbour[0];
//       if (!country2) return;
//       console.log(country2);
//       return fetch(`https://restcountries.com/v3.1/name/${country2}`);
//     })
//     .then(response => response.json())
//     .then(data => data[0])
//     .then(data => {
//       const html = RenderHTML(data);
//     })
//     .catch(err => {
//       RenderError(`Something went wrong😑!${err.message}. Please try again`);
//       console.error(`Something went wrong ❗❗❗ ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function() {
//   getCountryNeighbour('Brazil');
//   btn.style.opacity = 0;
// });

// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀*/

//Use fetch API and promises
//Fetch(`https://geocode.xyz/52.508,13.381?geoit=json`)

let position;
const getLocation = function() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    );
  });
};

const whereAmI = function() {
  getLocation()
    .then(pos => {
      const { latitude, longitude } = pos.coords;
      return fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`);
    })
    .then(response => {
      if (!response.ok) {
        throw Error(`Problem with the geocode.xyz, status ${response.status}`);
      }
      console.log(response);
      return response.json();
    })
    .then(data => data.country)
    //console.log(`That code is in ${data.city}, ${data.country}
    .then(country => getCountryData(country))
    .catch(err => {
      console.error(err);
      RenderError(`Something wrong! ${Error.message}! Please try again!`);
    })
    .finally((countriesContainer.style.opacity = 1));
};

const showPosition = function(position) {
  console.log(
    `Latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`
  );
};

btn_where_am_i.addEventListener('click', whereAmI);
// btn_country.addEventListener('click', () => {
//   console.log(dropdown.options[dropdown.selectdIndex]);
// });
// $('form-id').submit(function(e) {
//   e.preventDefault();
//   const dp_value = $('.dropdown-country').val();
//   console.log(dp_value);
// });

btn_country.addEventListener('click', function() {
  var msg = dropdown.value;
  getCountryData(msg);
});
