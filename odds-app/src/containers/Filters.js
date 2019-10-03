import React, { Component, Fragment } from 'react';
import axios from '../utils/API';
import styled from 'styled-components';

import BetFilter from '../components/BetFilter';
import Button from '../components/Button';

const API_KEY = process.env.REACT_APP_ODDS_API_KEY;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 750px;
  margin: 0 auto;
  background-color: yellow;
`

class Filters extends Component {
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
        selectedSport: "",
        selectedRegion: "",
        selectedMarket: ""
    }
    
    componentDidMount() {
      axios.get(`https://api.the-odds-api.com/v3/sports/?apiKey=${API_KEY}`)
        .then(res => {
          this.setState({ sportsInSeason: res.data.data});
          console.log(res.data.data)
        })
        .catch(err => {
          console.log(err)
        });

      // axios.get(`https://api.the-odds-api.com/v3/odds/?apiKey=${API_KEY}`)
    }

    createDropdownOptions(dataFromState) {
      return dataFromState.map((element, index) => <option key={index} value={element}>{element}</option>);
    }

    handleSportChoice = (e) => {
      this.setState({ selectedSport: e.target.value });
    }

    handleRegionChoice = (e) => {
      this.setState({ selectedRegion: e.target.value });
    }

    handleMarketChoice = (e) => {
      this.setState({ selectedMarket: e.target.value });
    }

    createQueryUrl = () => {
      let region;
      let market;
      let sport = this.state.selectedSport 

      switch(this.state.selectedRegion) {
        case 'United States':
          region = 'us';
          break;
        case 'United Kingdom':
          region = 'uk';
          break;
        case 'Australia':
          region = 'au';
          break;
        default: region = 'us';
      }

      switch(this.state.selectedMarket) {
        case 'Moneyline':
          market = 'h2h';
          break;
        case 'Spread':
          market = 'spreads';
          break;
        case 'Over-Under':
          market = 'totals';
          break;
        default: market = 'spreads'
      }

      return `https://api.the-odds-api.com/v3/odds/?apiKey=${API_KEY}&sport=${sport}&mkt=${market}&region=${region}`;
    } 

    handleSubmit = () => {
      console.log(this.state.selectedSport);
      console.log(this.state.selectedRegion);
      console.log(this.state.selectedMarket);
      this.createQueryUrl();
    }

    render () {
        let sports = null;

        if (this.state.sportsInSeason) {
            sports = this.state.sportsInSeason.map((sport) => <option key={sport.key} value={sport.key}>{sport.title}</option>);
        }
        
        const regions = this.createDropdownOptions(this.state.regions);
        const markets = this.createDropdownOptions(this.state.markets);

        return (
          <Fragment>
            <FilterContainer>
              <BetFilter 
                selectedValue={this.state.selectedSport}
                formChange={this.handleSportChoice}
                dropdownTitle="Sports in Season" 
                dropdownDirections="Choose a Sport" 
                options={sports} 
              />
              <BetFilter 
                selectedValue={this.state.selectedRegion}
                formChange={this.handleRegionChoice}
                dropdownTitle="Bookmaker Region"
                dropdownDirections="Choose a Region"
                options={regions}
              />
              <BetFilter 
                selectedValue={this.state.selectedMarket}
                formChange={this.handleMarketChoice}
                dropdownTitle="Odds Market"
                dropdownDirections="Choose a Market"
                options={markets}
              />
            </FilterContainer>
            <Button name="Submit" submit={this.handleSubmit} />
          </Fragment>
        );
    }
}

export default Filters;