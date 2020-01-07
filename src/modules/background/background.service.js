const CLIENT_ID = '9161e949213aef46ad705500b1cddcbb11ed87c9f569ca1c461f5dcaa9869762';
const HOST = 'https://api.unsplash.com/photos/random';

export const fetchBackground = (season, city, icon) => {
    const url = `${HOST}?query=${season},${city},${icon}&client_id=${CLIENT_ID}`;

    return fetch(url).then(responce => responce.json());
};
