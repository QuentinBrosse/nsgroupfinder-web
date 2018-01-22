// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'views/Root';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(<Root />, rootElement);
  registerServiceWorker();
}
