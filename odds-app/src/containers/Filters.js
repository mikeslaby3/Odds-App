import React, { Component, Fragment } from 'react';
import axios from '../utils/API';
import styled from 'styled-components';

import BetFilter from '../components/BetFilter';
import Button from '../components/Button';
import Game from '../components/Game';
// import months from '../months';

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
        markets: [
          'Moneyline',
          'Spread',
          'Over-Under'
        ],
        selectedSport: "",
        selectedMarket: "",
        gameLines: null
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

    handleMarketChoice = (e) => {
      this.setState({ selectedMarket: e.target.value });
    }

    createQueryUrl = () => {
      let market;
      let sport = this.state.selectedSport 

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

      return `https://api.the-odds-api.com/v3/odds/?apiKey=${API_KEY}&sport=${sport}&mkt=${market}&region=us`;
    } 

    handleSubmit = () => {
      axios.get(this.createQueryUrl())
        .then(res => {
          this.setState({ gameLines: res.data.data });
        })
        .catch(err => {
          console.log(err)
        });
    }

    render () {
        let sports = null;

        if (this.state.sportsInSeason) {
          sports = this.state.sportsInSeason
            .filter(sport => 
              (sport.title === 'NFL' || 
              sport.title === 'NCAAF' || 
              sport.title === 'MLB' || 
              sport.title === 'NBA' || 
              sport.title === 'NHL'))
            .map(sport => 
              <option key={sport.key} value={sport.key}>{sport.title}</option>);
        }
        
        const markets = this.createDropdownOptions(this.state.markets);

        // let games = null;

        // if (this.state.gameLines) {
        //   games = this.state.gameLines.map((game) => 
        //     <Game
        //       key={game.home_team}
        //       awayTeam={game.teams[0]}
        //       homeTeam={game.teams[1]}
        //       time={game.commence_time}
        //       market={this.state.selectedMarket}
        //       // odds={game.sites[0]}
        //     />)
        // }

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
                selectedValue={this.state.selectedMarket}
                formChange={this.handleMarketChoice}
                dropdownTitle="Odds Market"
                dropdownDirections="Choose a Market"
                options={markets}
              />
            </FilterContainer>
            <Button name="Submit" submit={this.handleSubmit} />
            <Game />
          </Fragment>
        );
    }
}

export default Filters;