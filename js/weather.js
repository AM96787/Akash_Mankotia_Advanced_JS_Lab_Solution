// Get the keypress event on the search box
const userInput = document.querySelector('.search-box');

userInput.addEventListener('keypress', function (event) {
    console.log(event);
    console.log('keypress');

    if (event.code === 'Enter') {
        fetchWeatherData(userInput.value);
    }
});
// build the url based on the input provided by the user
const fetchWeatherData = (city) => {
    const apiKey = 'ffb471cd338737ac7d56a347f37a23fe';
    const url = `http://api.openweathermap.org/data/2.5/find?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showWeather(data);
        })
        .catch(error => alert(error.message));

};

const showWeather = (data) => {
    document.querySelector('.city').textContent = data.list[0].name + ', ' + data.list[0].sys.country;

    document.querySelector('.temp').textContent = data.list[0].main.temp;

    document.querySelector('.weather').textContent = data.list[0].weather[0].description.toUpperCase();

    document.querySelector('.hi-low').textContent = data.list[0].main.temp_min + ' °C / ' + data.list[0].main.temp_max + ' °C';

    document.querySelector('.date').textContent = getFormatedDate(data.list[0].dt);
};

const getFormatedDate = (dt) => {
    const date = new Date(dt * 1000);
    console.log(date);

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    const formattedDate = `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
    return formattedDate;

}