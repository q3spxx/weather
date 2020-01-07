export const fetchWeather = ({ latitude, longitude }, lang) => {
    const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/8405a77329afc31d2d3115965218e846/${latitude},${longitude}?lang=${lang}`;

    return fetch(url).then(response => response.json());
};
