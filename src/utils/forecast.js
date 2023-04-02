const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f8087a9c74fd80bf10a23435f742fdbb&units=metric`;


  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.cod === '404') {
      callback('Unable to find location', undefined);
    } else {
      const temperature = body.main.temp*-1;
      const feelsLike = body.main.feels_like*-1;
      const description = body.weather[0].description;
      const humidity = body.main.humidity;
      const windSpeed = body.wind.speed;
      
  
      callback(
        undefined,
        `${description}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out. The humidity is ${humidity}% and the wind speed is ${windSpeed}m/s.`
      );
    }
  });
};

module.exports = forecast;
