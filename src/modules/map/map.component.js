import { Component } from '../../common/store';
import { getWord } from '../../common/translate/translate.service';
import { clearTheme } from '../../common/theme/theme.service';
import './map.css';

const latitudeSection = document.getElementById('latitude-section');
const longitudeSection = document.getElementById('longitude-section');
const geolocationSide = document.getElementById('geolocation-side');
const titleGeo = document.getElementById('titleGeo');

const { mapboxgl } = window;
mapboxgl.accessToken = 'pk.eyJ1Ijoibmlra2lodXNreSIsImEiOiJjazQyb2I5emEwMTBqM21wamRyNGFqbjhsIn0.4zKa56yt6D38p-rVO8I-PQ';

export class MapBox extends Component {
    constructor() {
        super();
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [0, 0],
            zoom: 9,
        });
    }

    shouldComponentUpdate() {
        const { coords, theme } = this.props;

        if (coords !== this.prevProps.coords || theme !== this.prevProps.theme) {
            return true;
        }
        return false;
    }

    render() {
        const {
            coords: { longitude, latitude },
            theme,
        } = this.props;

        if (theme !== this.prevProps.theme) {
            clearTheme(geolocationSide);
            geolocationSide.classList.add(theme);
        }

        titleGeo.innerHTML = getWord('GEOLOCATION');
        latitudeSection.innerHTML = `${getWord('LATITUDE')}: ${latitude.toFixed(2)}`;
        longitudeSection.innerHTML = `${getWord('LONGITUDE')}: ${longitude.toFixed(2)}`;
        this.map.setCenter([longitude, latitude]);
    }
}
