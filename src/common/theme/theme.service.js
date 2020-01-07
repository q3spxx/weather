import { THEME } from './theme.constants';

export const clearTheme = element => {
    const variants = Object.keys(THEME);
    variants.forEach(variant => element.classList.remove(THEME[variant]));
};
