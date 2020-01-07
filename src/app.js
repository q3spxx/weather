import { fetchCurrentPosition, fetchCoords } from './modules/geo';
import { MapBox } from './modules/map';
import { Search } from './modules/search';
import { Toolbar } from './modules/toolbar';
import { Background } from './modules/background';
import { Header } from './modules/header';
import { LANG } from './common/translate';
import { UNIT_OF_MEASURE, Weather } from './modules/weather';
import { THEME } from './common/theme';
import { store, Component } from './common/store';
import './common/common.css';

store.initialize({
    lang: LANG.EN,
    unitOfMeasure: UNIT_OF_MEASURE.C,
    theme: THEME.DARK,
});

export class App extends Component {
    constructor() {
        super([]);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleBackgroundChange = this.handleBackgroundChange.bind(this);

        this.toolbar = new Toolbar();
        this.search = new Search();
        this.weather = new Weather();
        this.map = new MapBox();
        this.background = new Background();
        this.header = new Header();

        this.search.submitStream.subscribe(this.handleSearch);
        this.toolbar.backgroundChangeStream.subscribe(this.handleBackgroundChange);
    }

    componentDidMount() {
        fetchCurrentPosition().then(coords => this.setState({ coords }));
    }

    handleSearch(value) {
        fetchCoords(value).then(coords => this.setState({ coords }));
    }

    handleBackgroundChange() {
        this.background.loadBackground();
    }
}
