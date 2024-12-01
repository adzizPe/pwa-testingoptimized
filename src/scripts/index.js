import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/responsive.css';
import './layouts/app-bar';
import './layouts/skip-content';
import './layouts/footer-bar';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  content: document.querySelector('#content'),
  menu: document.querySelector('#menu'),
  drawer: document.querySelector('#drawer'),
  main: document.querySelector('main'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

const skipLink = document.querySelector('.skip_link');
const mainContent = document.querySelector('#content');

skipLink.addEventListener('click', (event) => {
  event.preventDefault();
  mainContent.scrollIntoView({ behavior: 'smooth' });
  skipLink.blur();
});
