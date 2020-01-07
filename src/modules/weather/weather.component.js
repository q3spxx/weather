import getSkycons from 'skycons';
import { getWord } from '../../common/translate/translate.service';
import { UNIT_OF_MEASURE } from './weather.constants';
import { Component } from '../../common/store';
import { fetchWeather } from './weather.service';
import { clearTheme } from '../../common/theme/theme.service';
import './weather.css';

const Skycons = getSkycons(window);

const apparentTemperatureSectionValue = document.getElementById('apparentTemperature-section-value');
const temperatureSection = document.getElementById('temperature-section');
const summarySection = document.getElementById('summary-section');
const timezoneSection = document.getElementById('timezone-section');
const humiditySectionValue = document.getElementById('humidity-section-value');
const windSpeedSectionValue = document.getElementById('windSpeed-section-value');
const currentDate = document.getElementById('current-date');
const currentTime = document.getElementById('current-time');
const todayIcon = document.getElementById('today-icon');
const titleWeather = document.getElementById('weather-title');
const humiditySection = document.getElementById('humidity-section');
const windSpeedSection = document.getElementById('windSpeed-section');
const apparentTemperatureSection = document.getElementById('apparentTemperature-section');
const weatherForecastSide = document.getElementById('weather-forecast-side');

const days = {
    first: {
        title: document.getElementById('first-day-title'),
        temperature: document.getElementById('first-day-average-temp'),
        icon: document.getElementById('first-day-icon'),
    },
    second: {
        title: document.getElementById('second-day-title'),
        temperature: document.getElementById('second-day-average-temp'),
        icon: document.getElementById('second-day-icon'),
    },
    third: {
        title: document.getElementById('third-day-title'),
        temperature: document.getElementById('third-day-average-temp'),
        icon: document.getElementById('third-day-icon'),
    },
};

const ONE_DAY = 86400000;

export class Weather extends Component {
    constructor() {
        super(['weather', 'theme', 'lang', 'unitOfMeasure', 'coords']);
        this.render = this.render.bind(this);
        this.showActualTime = this.showActualTime.bind(this);

        this.skycons = {
            dark: new Skycons({ color: 'white' }),
            light: new Skycons({ color: 'black' }),
        };
        setInterval(this.showActualTime, 1000);
    }

    componentDidUpdate() {
        const { coords, lang } = this.props;

        if (coords !== this.prevProps.coords || lang !== this.prevProps.lang) {
            fetchWeather(coords, lang).then(weather => {
                this.setState({ weather });
            });
        }
    }

    render() {
        const { weather, theme, lang } = this.props;

        if (!weather) {
            return;
        }

        const {
            timezone,
            daily,
            currently: { temperature, summary, humidity, windSpeed, time, icon, apparentTemperature },
        } = weather;

        const actualTime = time * 1000;

        if (theme !== this.prevProps.theme) {
            clearTheme(weatherForecastSide);
            weatherForecastSide.classList.add(theme);
        }

        titleWeather.innerHTML = `${getWord('HELLO', lang)}!`;

        temperatureSection.innerHTML = this.getTemperature(temperature);
        summarySection.innerHTML = summary;
        timezoneSection.innerHTML = timezone;

        humiditySection.innerHTML = `${getWord('HUMIDITY', lang)}: `;
        humiditySectionValue.innerHTML = humidity;
        windSpeedSection.innerHTML = `${getWord('WIND_SPEED', lang)}: `;
        windSpeedSectionValue.innerHTML = windSpeed;

        currentDate.innerHTML = this.getLocalDate(actualTime, timezone);
        apparentTemperatureSection.innerHTML = `${getWord('APPARENT_TEMPERATURE', lang)}: `;
        apparentTemperatureSectionValue.innerHTML = `${this.getTemperature(apparentTemperature)}`;

        this.setIcon(icon, todayIcon);

        this.renderDay({
            day: days.first,
            time: actualTime + ONE_DAY,
            timezone,
            temperatureMax: daily.data[1].temperatureMax,
            temperatureMin: daily.data[1].temperatureMin,
            icon: daily.data[1].icon,
        });

        this.renderDay({
            day: days.second,
            time: actualTime + ONE_DAY * 2,
            timezone,
            temperatureMax: daily.data[2].temperatureMax,
            temperatureMin: daily.data[2].temperatureMin,
            icon: daily.data[2].icon,
        });

        this.renderDay({
            day: days.third,
            time: actualTime + ONE_DAY * 3,
            timezone,
            temperatureMax: daily.data[3].temperatureMax,
            temperatureMin: daily.data[3].temperatureMin,
            icon: daily.data[3].icon,
        });
    }

    renderDay({ day, time, timezone, temperatureMin, temperatureMax, icon }) {
        day.title.innerHTML = this.getLocalDate(time, timezone);
        day.temperature.innerHTML = this.getAverageTemperature(temperatureMin, temperatureMax);
        this.setIcon(icon, day.icon);
    }

    setIcon(icon, element) {
        const { theme } = this.props;
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        this.skycons[theme].play();
        this.skycons[theme].set(element, Skycons[currentIcon]);
    }

    showActualTime() {
        const date = new Date();

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        currentTime.innerHTML = `${hours}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
    }

    formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    getLocalDate(time, timeZone) {
        return new Date(time).toLocaleDateString('ru-RU', {
            timeZone,
        });
    }

    getAverageTemperature(temperatureMin, temperatureMax) {
        return this.getTemperature(temperatureMin + temperatureMax / 2);
    }

    getTemperature(temperature) {
        const { unitOfMeasure } = this.props;
        return unitOfMeasure === UNIT_OF_MEASURE.F
            ? `${Math.floor(temperature)} ${UNIT_OF_MEASURE.F}`
            : `${Math.floor(((temperature - 32) * 5) / 9)} ${UNIT_OF_MEASURE.C}`;
    }
}
