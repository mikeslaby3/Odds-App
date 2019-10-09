import React, { Component, Fragment } from 'react';
import axios from '../utils/API';
import styled from 'styled-components';

import Filter from '../components/Filter';
import Button from '../components/Button';
import Game from '../components/Game';

const API_KEY = process.env.REACT_APP_ODDS_API_KEY;

const StyledContainer = styled.div`
  margin: 30px auto;
  width: 350px;
  height: 100%;
`;

class Layout extends Component {
  state = {
    sportsInSeason: null,
    gameLines: null,
    markets: ["Moneyline", "Spread", "Over Under"],
    selectedSport: "",
    selectedMarket: ""
  };

  componentDidMount() {
    axios
      .get(`https://api.the-odds-api.com/v3/sports/?apiKey=${API_KEY}`)
      .then(res => {
        this.setState({ sportsInSeason: res.data.data });
        console.log(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  createDropdownOptions(data) {
    return data.map((element, index) => (
      <option key={index} value={element}>
        {element}
      </option>
    ));
  }

  handleSportChoice = e => {
    this.setState({ selectedSport: e.target.value });
  };

  handleMarketChoice = e => {
    this.setState({ selectedMarket: e.target.value });
  };

  createQueryUrl = () => {
    let sport = this.state.selectedSport
    let market;
    switch (market) {
      case 'Moneyline':
        market = 'h2h';
        break;
      case 'Spread':
        market = 'spreads';
        break;
      case 'Over Under':
        market = 'totals';
        break;
      default: market = 'spreads';
    } 
    // return `https://api.the-odds-api.com/v3/odds/?apiKey=${API_KEY}&sport=${sport}&mkt=${market}&region=us`;
    return `https://api.the-odds-api.com/v3/odds/?apiKey=${API_KEY}&sport=${sport}&mkt=spreads&region=us`;
  }

  handleSubmit = () => {
    axios.get(this.createQueryUrl())
      .then(res => {
        this.setState({ gameLines: res.data.data });
        // console.log(this.state.selectedMarket);
        console.log(res.data.data);
      })
      .catch(err => {
        console.log(err)
      });
  };

  render() {
    let sports = null;

    if (this.state.sportsInSeason) {
      sports = this.state.sportsInSeason
        .filter(sport => sport.title === "NFL" || sport.title === "NCAAF")
        .map(sport => (
          <option key={sport.key} value={sport.key}>
            {sport.title}
          </option>
        ));
    }

    const markets = this.createDropdownOptions(this.state.markets)

    let games = <p>No games to show</p>;

    if (this.state.gameLines) {
      if (this.state.selectedMarket === 'Spread') {
        games = this.state.gameLines.filter(game => game.sites[0]).map((game, index) => (
          <Game
            key={index}
            awayTeam={game.teams[0]}
            homeTeam={game.teams[1]}
            time={game.commence_time}
            market={this.state.selectedMarket}
            awayOdds={game.sites[0].odds.spreads.odds[0]}
            homeOdds={game.sites[0].odds.spreads.odds[1]}
            awayPoints={game.sites[0].odds.spreads.points[0]}
            homePoints={game.sites[0].odds.spreads.points[1]}
          />
        ));
      }
    }

    return (
      <Fragment>
        <StyledContainer>
          <Filter
            title="NFL or NCAA"
            directions="Choose a Sport"
            // value={props.selectedValue}
            change={this.handleSportChoice}
          >
            {sports}
          </Filter>
          <Filter 
            title="Odds Market" 
            directions="Choose a Market"
            change={this.handleMarketChoice}
          >
            {markets}
          </Filter>
        </StyledContainer>
        <Button name="Submit" submit={this.handleSubmit} />
        <StyledContainer>
          {games}
        </StyledContainer>
      </Fragment>
    );
  }
}

export default Layout;