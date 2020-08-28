const requestPromiseNative = require('request-promise-native');

//Function definition of fetchMyIP
const fetchMyIP = function () {
  return requestPromiseNative('https://api.ipify.org/?format=json');
};

//Function definition of fetchCoordsByIP
const fetchCoordsByIP = function (body) {
  const ipString = JSON.parse(body).ip;
  return requestPromiseNative(`https://ipvigilante.com/${ipString}`);
};

//Function definition of fetchISSFlyOverTimes
const fetchISSFlyOverTimes = function (body) {
  const { latitude, longitude } = JSON.parse(body).data;
  return requestPromiseNative(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
};

//Main function in which we call all the defined functions which returns the eventual value
//using promises
const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

//For modularising the code and used in iss_Promised.js
module.exports = { nextISSTimesForMyLocation };