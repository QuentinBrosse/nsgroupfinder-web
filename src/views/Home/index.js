// @flow

import React from 'react';
import type { Node } from 'react';
import GroupFilter from './GroupFilter';
import NavBar from './NavBar';

const App = (): Node => (
  <div>
    <NavBar />
    <GroupFilter />
  </div>
);

export default App;
