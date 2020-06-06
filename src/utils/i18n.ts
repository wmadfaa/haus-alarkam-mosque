import {I18nManager, Platform} from 'react-native';
// @ts-ignore
import moment from 'moment/min/moment-with-locales';
import RNRestart from 'react-native-restart';
import I18n from 'react-native-i18n';
import * as RNLocalize from 'react-native-localize';

require('intl');
if (Platform.OS === 'android') {
  require('intl/locale-data/jsonp/ar');
  require('intl/locale-data/jsonp/de');
  require('intl/locale-data/jsonp/en');
}

import en from './locales/en';
import de from './locales/de';
import ar from './locales/ar';

RNLocalize.addEventListener('change', () => {
  RNRestart.Restart();
});

const locales = RNLocalize.getLocales();

let localNumber: Intl.NumberFormat;

if (Array.isArray(locales)) {
  const {languageTag, languageCode} = locales[0];
  I18n.locale = languageTag;
  moment.locale(languageCode);
  localNumber = new Intl.NumberFormat(languageCode);
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

export {moment, localNumber};

export default I18n;
