// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'views/App';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(<App />, rootElement);
  registerServiceWorker();
}
