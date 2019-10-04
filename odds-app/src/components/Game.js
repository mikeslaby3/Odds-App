import React from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  height: 400px;
  width: 250px;
  background-color: grey;
  padding: 10px;
  text-align: center;
`;

const Team = styled.h1`
  font-size: 20px;
`;

const convertUnixToTime = unix => {
    const monthsArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const date = new Date(unix*1000);
    const year = date.getFullYear();
    const month = monthsArray[date.getMonth()];
    const day = date.getDate();
    const militaryHours= date.getHours();
    const hours = (militaryHours + 24) % 12 || 12;
    const minutes = '0' + date.getMinutes();
    const timeOfDay = (militaryHours > 12) ? 'PM' : 'AM';
    const convertedTime = `${month} ${day} ${year} ${hours}:${minutes.substr(-2)} ${timeOfDay}`;
    
    return convertedTime;
}

const favoredBetCalc = favoredBet => {
  return parseInt(100 / (favoredBet - 1));
}

const underdogBetCalc = underdogBet => {
  return parseInt((underdogBet - 1) * 100);
}

const convertDecimalOddsToMoneyline = decimalOdds => {
  return (decimalOdds >= 2) ? `+${underdogBetCalc(decimalOdds)}` : `-${favoredBetCalc(decimalOdds)}`;
}

const formatPointSpread = spread => {
  return (spread > 0) ? `+${spread}` : spread;
}

const getTeamCity = team => {
  const wordArray = team.split(" ");
  const justTheCityArray = (wordArray.length === 3) ? wordArray.slice(0, 2) : wordArray.slice(0, 1);
  const city = justTheCityArray.join(' ');
  return city;
};

const game = props => (
  <GameContainer>
    <Team>{props.awayTeam}</Team>
    <p>vs</p>
    <Team>{props.homeTeam}</Team>
    <h2>Game Start: {convertUnixToTime(props.time)}</h2>
    <h2>{props.market}:</h2>
    <h3>
      {getTeamCity(props.awayTeam)}: {convertDecimalOddsToMoneyline(props.awayOdds)}{" "}
      {formatPointSpread(props.awayPoints)}
    </h3>
    <h3>
      {getTeamCity(props.homeTeam)}: {convertDecimalOddsToMoneyline(props.homeOdds)}{" "}
      {formatPointSpread(props.homePoints)}
    </h3>
    <h3>Save Pick</h3>
  </GameContainer>
);

export default game;