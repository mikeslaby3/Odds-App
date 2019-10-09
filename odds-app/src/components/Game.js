import React from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  height: 100%;
  width: 250px;
  padding: 20px;
  text-align: center;
  margin: 0 auto 25px;
  background-color: #adbce6;
  border: solid 2px;
  border-radius: 10px;
`;

const Matchup = styled.div`
  border: double;
  background-color: #e8f4f8;
  padding: 20px 0 10px 0;
`;

const InfoContainer = styled.div`
  border: solid 2px;
  margin: 20px;
  background-color: #e6bbad;
  padding: 15px 0 10px 0;
`;

const Header = styled.h1`
  font-size: 25px;
  font-family: "Josefin Sans", sans-serif;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Details = styled.p`
  font-size: 18px;
  font-family: "Quicksand", sans-serif;
  margin-bottom: 5px;
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
    <Matchup>
      <Header>{props.awayTeam}</Header>
      <p style={{ marginBottom: "15px" }}>at</p>
      <Header>{props.homeTeam}</Header>
    </Matchup>
    <InfoContainer>
      <Header>Game Start: </Header>
      <Details>{convertUnixToTime(props.time)}</Details>
    </InfoContainer>
    <InfoContainer>
      <Header>{props.market}:</Header>
      <Details>
        {getTeamCity(props.awayTeam)}:{" "}
        {convertDecimalOddsToMoneyline(props.awayOdds)}{" "}
        {formatPointSpread(props.awayPoints)}
      </Details>
      <Details>
        {getTeamCity(props.homeTeam)}:{" "}
        {convertDecimalOddsToMoneyline(props.homeOdds)}{" "}
        {formatPointSpread(props.homePoints)}
      </Details>
    </InfoContainer>
    {/* <Details>Save Pick</Details> */}
  </GameContainer>
);

export default game;