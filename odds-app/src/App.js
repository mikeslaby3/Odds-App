import React, { Component } from 'react';
import axios from './utils/API';

const API_KEY = process.env.REACT_APP_ODDS_API_KEY;

class App extends Component {
  
  componentDidMount() {
    axios.get(`https://api.the-odds-api.com/v3/sports/?apiKey=${API_KEY}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render () {
    return (
      <div>
        <h1>Odds App</h1>
      </div>
    );
  }
}

export default App;
