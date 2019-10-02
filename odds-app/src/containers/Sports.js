import React, { Component } from 'react';
import axios from '../utils/API';
import styled from 'styled-components';

const API_KEY = process.env.REACT_APP_ODDS_API_KEY;

const SportsInSeason = styled.div`
  height: 100px;
  width: 200px;
  background-color: grey;
  padding: 5px;
`;

const Title = styled.h1`
  font-size: 20px; 
  text-align: center;
`;

const Dropdown = styled.select`
  font-size: 10px;
  display: block;
  margin: 0 auto;
`;

class Sports extends Component {
    state = {
        sportsInSeason: null,
        error: true
    }
    
    componentDidMount() {
        axios.get(`https://api.the-odds-api.com/v3/sports/?apiKey=${API_KEY}`)
          .then(res => {
            this.setState({ sportsInSeason: res.data.data});
          })
          .catch(err => {
            this.setState({ error: true });
          });
    }

    render () {
        let sports = null;

        if (this.state.sportsInSeason) {
            sports = this.state.sportsInSeason.map((sport) => <option key={sport.key} value={sport.title}>{sport.title}</option>);
        }

        return (
          <SportsInSeason>
            <Title>Sports In Season</Title>
              <Dropdown>
                <option>Choose a Sport</option>
                {sports}
              </Dropdown>
          </SportsInSeason>
        );
    }
}

export default Sports;