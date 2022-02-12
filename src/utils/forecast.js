
const request = require('postman-request');


const forecast = (latidute, longidute, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latidute}&lon=${longidute}&appid=0b37a506b0ad9a400d1726e563930266&units=metric`
  request ({url , json :true}, (error, {body} = {}) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    }
    else if(body.error) {
      callback("Unable to find location. Try another search", undefined);
    }
    else {
      callback(undefined, `It is currently ${body.main.temp} degrees out, it feels like ${body.main.feels_like} degrees` )
    }
  });
};

module.exports = forecast;