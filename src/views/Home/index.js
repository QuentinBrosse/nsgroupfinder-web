// @flow

import React from 'react';
import type { Node } from 'react';
import { Button } from 'material-ui';
import logo from 'assets/images/react.svg';
import './styles.css';

const App = (): Node => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React Joy !</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <Button raised color="primary">
      Hello World
    </Button>
  </div>
);

export default App;
