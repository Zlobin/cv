import './scss/main.scss';
import {render, dom} from './utils/index.js';

document.addEventListener('DOMContentLoaded', render(dom));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('ServiceWorker registration successfully.'))
      .catch(console.error)
  );
}
