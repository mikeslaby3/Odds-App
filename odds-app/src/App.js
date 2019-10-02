import React, { Component } from 'react';

import Sports from './containers/Sports';

class App extends Component {

  render () {
    return (
      <div>
        <h1>Odds App</h1>
        <Sports />
      </div>
    );
  }
}

export default App;
