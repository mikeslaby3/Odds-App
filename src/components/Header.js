import React from 'react';
import styled from 'styled-components';
import { device } from '../device';

const Container = styled.div`
  margin: 25px auto;
  text-align: center;
`;

const AppName = styled.h1`
  font-size: 30px;
  font-family: "Notable", sans-serif;
  margin-bottom: 20px;
  text-align: center;

  @media ${device.laptop} {
    font-size: 45px;
  }
`;

const Description = styled.div`
  font-family: 'Abel', sans-serif;
`;

const Title = styled.h2`
  font-size: 25px;
  margin-bottom: 10px;
  text-align: center;

  @media ${device.laptop} {
    font-size: 35px;
  }
`;

const Rule = styled.p`
  margin-bottom: 7px;

  @media ${device.laptop} {
    font-size: 20px;
  }
`;

const header = props => (
  <Container>
    <AppName>Be Advised Betting App</AppName>
    <Description>
      <Title>There are only two rules:</Title>
      <Rule>1. Always bet the over</Rule>
      <Rule>
        2. If a mascot dies the week of a big game, it's an automatic mortal
        lock
      </Rule>
    </Description>
  </Container>
);

export default header;