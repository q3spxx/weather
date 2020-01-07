import { Component } from '../../common/store';
import { clearTheme } from '../../common/theme/theme.service';
import './header.css';

const headerRef = document.getElementById('header');

export class Header extends Component {
    constructor() {
        super(['theme']);
    }

    render() {
        const { theme } = this.props;

        if (theme !== this.prevProps.theme) {
            clearTheme(headerRef);
            headerRef.classList.add(theme);
        }
    }
}
