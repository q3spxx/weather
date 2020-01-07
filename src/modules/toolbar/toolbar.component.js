import { getWord } from '../../common/translate/translate.service';
import { Component } from '../../common/store';
import { clearTheme } from '../../common/theme/theme.service';
import { Stream } from '../../common/stream/stream.service';
import { UNIT_OF_MEASURE } from '../weather';
import './toolbar.styles.css';

const settingsRef = document.getElementById('settings');
const settingsButtonRef = document.getElementById('settings-button');
const settingsButtonLabelRef = document.getElementById('settings-button-label');
const backgroundChangeRef = document.getElementById('background-change');
const backgroundChangeLabelRef = document.getElementById('background-change-label');

const langRefs = {
    en: {
        button: document.getElementById('lang-en'),
        label: document.getElementById('lang-en-label'),
    },
    ru: {
        button: document.getElementById('lang-ru'),
        label: document.getElementById('lang-ru-label'),
    },
    be: {
        button: document.getElementById('lang-be'),
        label: document.getElementById('lang-be-label'),
    },
};

const unitOfMeasureRefs = {
    C: {
        button: document.getElementById('celsius'),
        label: document.getElementById('celsius-label'),
    },
    F: {
        button: document.getElementById('fahrenheit'),
        label: document.getElementById('fahrenheit-label'),
    },
};

const themeRefs = {
    dark: {
        button: document.getElementById('dark-mode'),
        label: document.getElementById('dark-mode-label'),
    },
    light: {
        button: document.getElementById('light-mode'),
        label: document.getElementById('light-mode-label'),
    },
};

export class Toolbar extends Component {
    constructor() {
        super(['theme', 'lang', 'unitOfMeasure']);
        this.handleToggleButtonClick = this.handleToggleButtonClick.bind(this);
        this.handleLangButtonClick = this.handleLangButtonClick.bind(this);
        this.handleTemperatureButtonClick = this.handleTemperatureButtonClick.bind(this);
        this.handleThemeButtonClick = this.handleThemeButtonClick.bind(this);
        this.handleBackgroundButtonClick = this.handleBackgroundButtonClick.bind(this);

        this.open = false;

        this.backgroundChangeStream = new Stream();

        settingsButtonRef.addEventListener('click', this.handleToggleButtonClick);

        this.addListener(langRefs, this.handleLangButtonClick);
        this.addListener(unitOfMeasureRefs, this.handleTemperatureButtonClick);
        this.addListener(themeRefs, this.handleThemeButtonClick);

        backgroundChangeRef.addEventListener('click', this.handleBackgroundButtonClick);
    }

    render() {
        const { lang, unitOfMeasure, theme } = this.props;

        if (theme !== this.prevProps.theme) {
            clearTheme(settingsRef);
            settingsRef.classList.add(theme);
        }

        settingsButtonLabelRef.innerHTML = getWord('SETTINGS', lang);
        backgroundChangeLabelRef.innerHTML = getWord('BACKGROUND_CHANGE', lang);
        unitOfMeasureRefs.F.label.innerHTML = `${getWord('FAHRENHEIT', lang)} (${UNIT_OF_MEASURE.F})`;
        unitOfMeasureRefs.C.label.innerHTML = `${getWord('CELSIUS', lang)} (${UNIT_OF_MEASURE.C})`;
        themeRefs.dark.label.innerHTML = getWord('DARK', lang);
        themeRefs.light.label.innerHTML = getWord('LIGHT', lang);

        this.renderActive(langRefs, lang, this.prevProps.lang);
        this.renderActive(unitOfMeasureRefs, unitOfMeasure, this.prevProps.unitOfMeasure);
        this.renderActive(themeRefs, theme, this.prevProps.theme);
    }

    handleToggleButtonClick() {
        this.open = !this.open;
        if (this.open) {
            settingsRef.classList.add('open');
        } else {
            settingsRef.classList.remove('open');
        }
    }

    handleLangButtonClick(lang) {
        return () => {
            this.setState({ lang });
        };
    }

    handleTemperatureButtonClick(unitOfMeasure) {
        return () => {
            this.setState({ unitOfMeasure });
        };
    }

    handleThemeButtonClick(theme) {
        return () => {
            this.setState({ theme });
        };
    }

    handleBackgroundButtonClick() {
        this.backgroundChangeStream.next();
    }

    renderActive(elements, add, remove) {
        if (add === remove) {
            return;
        }

        elements[remove].button.classList.remove('active');
        elements[add].button.classList.add('active');
    }

    addListener(refs, handler) {
        const values = Object.keys(refs);

        values.forEach(value => {
            refs[value].button.addEventListener('click', handler(value));
        });
    }
}
