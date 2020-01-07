import './geo.css';

export const fetchCurrentPosition = () => {
    return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            resolve({ latitude, longitude });
        });
    });
};

export const fetchCoords = city => {
    const url = `https://cors-anywhere.herokuapp.com/https://api.opencagedata.com/geocode/v1/json?q=${city}&key=c6b6da0f80f24b299e08ee1075f81aa5&pretty=1&no_annotations=1`;
    return fetch(url)
        .then(response => response.json())
        .then(({ results }) => ({
            latitude: results[0].geometry.lat,
            longitude: results[0].geometry.lng,
        }));
};
