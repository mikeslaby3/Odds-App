import React, { Component, Fragment } from 'react';
import axios from '../utils/API';
import styled from 'styled-components';

import BetParam from '../components/BetParam';
import Button from '../components/Button';

const API_KEY = process.env.REACT_APP_ODDS_API_KEY;

const ParamContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 750px;
  margin: 0 auto;
  background-color: yellow;
`

class Parameters extends Component {
    state = {
        sportsInSeason: null,
        regions: [
          'United States',
          'United Kingdom',
          'Australia',
        ],
        markets: [
          'Moneyline',
          'Spread',
          'Over-Under'
        ],
        error: false
    }
    
    componentDidMount() {
      axios.get(`https://api.the-odds-api.com/v3/sports/?apiKey=${API_KEY}`)
        .then(res => {
          this.setState({ sportsInSeason: res.data.data});
        })
        .catch(err => {
          this.setState({ error: true });
        });

      // axios.get(`https://api.the-odds-api.com/v3/odds/?apiKey=${API_KEY}`)
    }

    render () {
        let sports = null;

        if (this.state.sportsInSeason) {
            sports = this.state.sportsInSeason.map((sport) => <option key={sport.key} value={sport.title}>{sport.title}</option>);
        }

        const regions = this.state.regions.map((region, index) => <option key={index} value={region}>{region}</option>);
        const markets = this.state.markets.map((market, index) => <option key={index} value={market}>{market}</option>);

        return (
          <Fragment>
            <ParamContainer>
              <BetParam 
                dropdownTitle="Sports in Season" 
                dropdownDirections="Choose a Sport" 
                options={sports} 
              />
              <BetParam 
                dropdownTitle="Bookmaker Region"
                dropdownDirections="Choose a Region"
                options={regions}
              />
              <BetParam 
                dropdownTitle="Odds Market"
                dropdownDirections="Choose a Market"
                options={markets}
              />
            </ParamContainer>
            <Button name="Submit"/>
          </Fragment>
        );
    }
}

export default Parameters;