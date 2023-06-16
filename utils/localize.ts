// make function serve localizated message by expo-localization work
// with I18nManager,Platform from react-native

import * as Localization from 'expo-localization';
import { I18nManager, Platform } from 'react-native';

const locales = {
  en: require("./translations/en.json"),
  ko: require("./translations/ko.json"),
} as const;

const getLanguage = () => {
  const locale = Localization.locale;
  const language = locale.slice(0, 2);
  return language;
}

const getMessages = () => {
  const language = getLanguage();
  return locales[language];
}

const localize = (key: string) => {
  const messages = getMessages();
  const message = messages[key];
  if (!message) {
    console.warn(`No message found for key: ${key}`);
  }
  return message;
}

const isRTL = () => {
  const language = getLanguage();
  return language === 'ar';
}

const setI18nConfig = () => {
  const language = getLanguage();
  const isRTL = language === 'ar';
  I18nManager.forceRTL(isRTL);
  if (Platform.OS === 'android') {
    I18nManager.allowRTL(isRTL);
  }
}

export { localize, setI18nConfig, isRTL };



