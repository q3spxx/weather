import { Component } from '../../common/store';
import { fetchBackground } from './background.service';

export class Background extends Component {
    constructor() {
        super(['weather', 'background']);
    }

    componentDidUpdate() {
        const { weather } = this.props;
        if (weather !== this.prevProps.weather) {
            this.loadBackground();
        }
    }

    render() {
        const { weather, background } = this.props;

        if (!weather || !background) {
            return;
        }

        document.body.style.backgroundImage = `url(${background})`;
    }

    getSeason() {
        const {
            weather: {
                currently: { time },
            },
        } = this.props;

        const month = new Date(time * 1000).getMonth();

        switch (month) {
            case 0:
            case 1:
            case 11:
                return 'winter';
            case 2:
            case 3:
            case 4:
                return 'spring';
            case 5:
            case 6:
            case 7:
                return 'summer';
            default:
                return 'autumn';
        }
    }

    loadBackground() {
        const {
            weather: {
                currently: { icon },
                timezone,
            },
        } = this.props;

        fetchBackground(this.getSeason(), timezone.replace('/', ',').toLowerCase(), icon.replace(/-/g, ','))
            .then(({ urls: { regular } }) => this.setState({ background: regular }))
            .catch(() => {});
    }
}
