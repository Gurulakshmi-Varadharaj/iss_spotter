//const { fetchMyIP } = require('./iss');

//const { fetchCoordsByIP } = require('./iss');

//const { fetchISSFlyOverTimes } = require('./iss');

/****fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);

  console.log(typeof ip);
});*****/

/***fetchCoordsByIP('135.0.50.89', (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned Location:', data);
});***/

/****const locnObj = { latitude: '45.34380', longitude: '-75.71570' };

fetchISSFlyOverTimes(locnObj, (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log(data);
});*****/

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print the Passtime
  console.log(passTimes);
});





