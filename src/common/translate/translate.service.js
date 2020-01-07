import { en, ru, be } from './translate.constants';

export const getWord = (word, lang) => {
    switch (lang) {
        case 'ru':
            return ru[word];
        case 'be':
            return be[word];
        default:
            return en[word];
    }
};
