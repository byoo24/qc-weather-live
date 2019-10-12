const getWeather = {
    'clear-day': '/images/icons/clear-day.svg',
    'clear-night': '/images/icons/clear-night.svg',
    'sleet': '/images/icons/sleet.svg',
    'wind': '/images/icons/cloudy-default.svg',
    'fog': '/images/icons/cloudy-default.svg',
    'cloudy': '/images/icons/cloudy-default.svg',
    'lightly-cloudy-day': '/images/icons/cloudy-day-01.svg',
    'partly-cloudy-day': '/images/icons/cloudy-day-02.svg',
    'mostly-cloudy-day': '/images/icons/cloudy-day-03.svg',
    'lightly-cloudy-night': '/images/icons/cloudy-night-01.svg',
    'partly-cloudy-night': '/images/icons/cloudy-night-02.svg',
    'mostly-cloudy-night': '/images/icons/cloudy-night-03.svg',
    'rain-light': '/images/icons/rainy-01.svg',
    'rain': '/images/icons/rainy-02.svg',
    'rain-heavy': '/images/icons/rainy-03.svg',
    'snow-light': '/images/icons/snowy-01.svg',
    'snow': '/images/icons/snowy-02.svg',
    'snow-heavy': '/images/icons/snowy-03.svg',
    'hail': '/images/icons/sleet.svg',
    'thunderstorm': '/images/icons/storm.svg',
    'tornado': '/images/icons/storm.svg',
}
const getMonth = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
}

const getWeekday = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
}


function getWeatherIcon(icon, summary){
    const light = ['drizzle', 'light'];
    const heavy = ['heavy', 'mostly'];

    switch(icon){
        case 'rain':
            for (let condition of light) {
                if (summary.toLowerCase().indexOf(condition) !== -1) {
                    return getWeather['rain-light'];
                }
            }
            for (let condition of heavy) {
                if (summary.toLowerCase().indexOf(condition) !== -1) {
                    return getWeather['rain-heavy'];
                }
            }
            return getWeather['rain'];

        case 'snow':
            for (let condition of light) {
                if (summary.toLowerCase().indexOf(condition) !== -1) {
                    return getWeather['snow-light'];
                }
            }
            for (let condition of heavy) {
                if (summary.toLowerCase().indexOf(condition) !== -1) {
                    return getWeather['snow-heavy'];
                }
            }
            return getWeather['snow'];
            
        default:
            return getWeather[icon];
    }
}




export const htmlCurrentWeather = (currently, mainSummary) => {
    const { time, icon, temperature, humidity, windSpeed, summary } = currently;

    const dateData = new Date(time * 1000);
    const monthNum = dateData.getMonth() + 1; // January returns 0
    const month = getMonth[monthNum];
    const day = dateData.getDate();
    const year = dateData.getFullYear();
    const date = `${month} ${day}, ${year}`;

    const screen = document.querySelector('.screen-current');


    while(screen.firstChild) {
        screen.removeChild(screen.firstChild);
    }


    // Create date row
    const div1 = document.createElement('div');
        div1.classList.add('row', 'animated', 'fadeInUp');
    const h1 = document.createElement('h1');
        h1.classList.add('current-date');
        h1.innerText = date;
    div1.appendChild(h1);


    // Create image and temp row
    const div2 = document.createElement('div');
        div2.classList.add('row', 'animated', 'fadeInUp');
    const image = new Image();
        const imgSrc = getWeatherIcon(icon, summary);
        image.classList.add('current-img');
        image.src = imgSrc;
    const temp = document.createElement('span');
        temp.classList.add('current-temp');
        temp.innerText = temperature;
    div2.appendChild(image);
    div2.appendChild(temp);


    // Create summary, humidity, and wind row
    const div3 = document.createElement('div');
        div3.classList.add('row', 'animated', 'fadeInUp');
    const currentSummary = document.createElement('span');
        currentSummary.classList.add('current-summary');
        currentSummary.innerText = summary;
    const currentHumidity = document.createElement('span');
        currentHumidity.classList.add('current-humidity');
        currentHumidity.innerText = `Humidity: ${humidity}`;
    const currentWind = document.createElement('span');
        currentWind.classList.add('current-wind');
        currentWind.innerText = `Wind Speed: ${windSpeed}`;
    div3.appendChild(currentSummary);
    div3.appendChild(currentHumidity);
    div3.appendChild(currentWind);


    // Create summary row
    const div4 = document.createElement('div');
        div4.classList.add('row', 'animated', 'fadeInUp');
    const weekSummary = document.createElement('span');
        weekSummary.classList.add('summary');
        weekSummary.innerText = mainSummary;
    div4.appendChild(weekSummary);


    screen.appendChild(div1);
    screen.appendChild(div2);
    screen.appendChild(div3);
    screen.appendChild(div4);
}




export const htmlWeekWeather = (daily) => {
    const screen = document.querySelector('.screen-week');
    const { data } = daily;

    while (screen.firstChild) {
        screen.removeChild(screen.firstChild);
    }

    for (let i = 1; i < 6; i++) {
        const day = data[i];
        const { icon, temperatureHigh, temperatureLow, time, summary } = day;

        const date = new Date(time * 1000);


        // Create upcoming forecast
        const div = document.createElement('div');
            const animationDelay = `delay${i}`
            div.classList.add('daily', 'animated', animationDelay, 'fadeInRight');
        const h1 = document.createElement('h1');
            h1.classList.add('daily-day');
            h1.innerText = getWeekday[date.getDay()];


        const image = new Image();
            const imgSrc = getWeatherIcon(icon, summary);
            image.classList.add('daily-img');
            image.src = imgSrc;

            
        const span1 = document.createElement('span');
            span1.classList.add('daily-temp-high');
            span1.innerText = temperatureHigh;
        const span2 = document.createElement('span');
            span2.classList.add('daily-temp-low');
            span2.innerText = temperatureLow;
        div.appendChild(h1);
        div.appendChild(image);
        div.appendChild(span1);
        div.appendChild(span2);

        screen.appendChild(div);
    }
}