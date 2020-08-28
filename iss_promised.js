const requestPromiseNative = require('request-promise-native');

const fetchMyIP = function() {
  return requestPromiseNative('https://api.ipify.org/?format=json');
};

const fetchCoordsByIP = function(body) {
  const ipString = JSON.parse(body).ip;
  return requestPromiseNative(`https://ipvigilante.com/${ipString}`);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body).data;
  return requestPromiseNative(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };