import {I18nManager} from 'react-native';
// import I18n from 'i18n-js';
import I18n from 'react-native-i18n';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en';
import de from './locales/de';
import ar from './locales/ar';

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.fallbacks = true;
I18n.translations = {
  en,
  de,
  ar,
};

I18nManager.allowRTL(I18n.locale in I18n.translations);

// @ts-ignore
I18n.start = I18nManager.isRTL ? 'right' : 'left';
// @ts-ignore
I18n.end = I18nManager.isRTL ? 'left' : 'right';

export const isRTL = I18nManager.isRTL;

export default I18n;
