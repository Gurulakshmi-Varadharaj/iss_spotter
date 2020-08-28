//Modularized code
const { nextISSTimesForMyLocation } = require('./iss_promised');

//To print the PassTimes in human readable format
const passTimesHumanRead = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

//Interact with promises using .then and .catch
nextISSTimesForMyLocation()
  .then(passTimes => {
    passTimesHumanRead(passTimes);
  })
  .catch(error => {
    console.log('It didn\'t work: ', error.message);
  });

