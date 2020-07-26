import {ru, en} from '../dictionary/index.js';

const resources = {
  ru,
  en,
};

export const RU = 'ru';
export const EN = 'en';

export class Locale {
  construct() {
    this.defaultLocale = 'en';
    this.locales = resources[this.defaultLocale];
  }

  setLocale(locale) {
    this.locales = resources[locale];
  }

  get(str) {
    return this.locales[str];
  }
}
