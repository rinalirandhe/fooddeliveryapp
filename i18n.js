import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nextReactNative from 'i18next-react-native-language-detector';

i18n
    .use(i18nextReactNative)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: require('./src/Language/en.json')
            },
            hi: {
                translation: require('./src/Language/hi.json')
            },
        },
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;