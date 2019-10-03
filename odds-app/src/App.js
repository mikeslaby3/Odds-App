import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Parameters from './containers/Parameters';

class App extends Component {

  render () {
    return (
      <BrowserRouter>
        <h1>Odds App</h1>
        <Parameters />
      </BrowserRouter>
    );
  }
}

export default App;
