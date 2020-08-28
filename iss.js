/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  const httprequest = 'https://api.ipify.org/?format=json';

  //To send request to API and get the public IP address
  request(httprequest, (err, response, body) => {
    //Handling rquest Errors
    if (err) {
      callback(err, null);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    //To handle if no IP is found
    if (body === '[]') {
      callback('IP address not found', null);
      return;
    } else {
      const data = JSON.parse(body);
      callback(null, data.ip);
      return;
    }

  });

};

const fetchCoordsByIP = function (ip, callback) {
  // use request to fetch IP address from JSON API
  const requestLocation = 'https://ipvigilante.com/' + ip;

  //To send request to API and get the Latitude and Longitude of IP address
  request(requestLocation, (err, response, body) => {
    //Handling rquest Errors
    if (err) {
      callback(err, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Location of IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (body === '[]') {
      callback('Location of IP not found', null);
      return;
    } else {
      const data = JSON.parse(body);
      let objReturn = {
        latitude: data['data']['latitude'],
        longitude: data['data']['longitude']
      };
      callback(null, objReturn);
      return;
    }
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function (coords, callback) {
  const httprequest = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(httprequest, (err, response, body) => {
    //Handling rquest Errors
    if (err) {
      callback(err, null);
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS Flyover Time. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (body === '[]') {
      callback('ISSFlyOverTimes not found', null);
    } else {
      const data = JSON.parse(body).response;
      callback(null, data);
    }
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, location) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(location, (error, flyoverTimes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, flyoverTimes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };