require('es6-promise').polyfill();
require('isomorphic-fetch');

const { htmlCurrentWeather, htmlWeekWeather } = require('./utils/weather');
const weather_container = document.querySelector('.weather-container');

const STATE = {
    currently: '',
    daily: '',
    geoData: ''
}

const CONSTANTS = {
    INTERVAL: 3600000   // 1 hour
}



// Fetches Data and Sets STATE
const fetchData = () => {
    // const address = "Queens College, New York";

    fetch('http://qc-weather.herokuapp.com/api/v1/weather', {
        method: 'GET'
    })
    .then(res => res.text())
    .then(data => {
        const parseData = JSON.parse(data);
        const { currently, daily } = parseData;

        STATE.currently = currently;
        STATE.daily = daily;

        const {sunriseTime, sunsetTime} = daily.data[0];
        const currentTime = Date.now();

        if (currentTime < sunsetTime * 1000) {
            weather_container.classList.remove('sunset');
            weather_container.classList.add('sunrise');
        } else {
            weather_container.classList.remove('sunrise');
            weather_container.classList.add('sunset');
        }

        htmlCurrentWeather(currently, daily.summary);
        htmlWeekWeather(daily);
    });
}



fetchData() // Begin with fetching data
setInterval(() => fetchData(), CONSTANTS.INTERVAL);






