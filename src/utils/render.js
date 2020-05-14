import {Template} from './template.js';
import {Locale} from './i18n.js';

import contacts from '../templates/contacts.html';
import nitka from '../templates/nitka.html';
import cmg from '../templates/cmg.html';
import finist from '../templates/finist.html';
import lrw from '../templates/lrw.html';
import otg from '../templates/otg.html';
import lang from '../templates/lang.html';
import vtb from '../templates/vtb.html';
import sibedge from '../templates/sibedge.html';
import newsmedia from '../templates/newsmedia.html';
import kelly from '../templates/kelly.html';
import career from '../templates/career.html';
import education from '../templates/education.html';
import about from '../templates/about.html';
import stack from '../templates/stack.html';
import citizenship from '../templates/citizenship.html';

const html = {
  citizenship,
  newsmedia,
  education,
  contacts,
  sibedge,
  finist,
  career,
  nitka,
  kelly,
  about,
  stack,
  lang,
  cmg,
  vtb,
  otg,
  lrw,
};

const i18n = new Locale();
const byId = document.getElementById.bind(document);

export const render = (callback, locale = 'en', isLoaded = false) => {
  i18n.setLocale(locale);

  Object.keys(html).forEach(item =>
    new Template()
      .compile(html[item], i18n.get(item))
      .render(byId(item))
  );

  callback(isLoaded);
};
