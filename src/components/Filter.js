import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 150px;
  width: 100%;
  background-color: #adbce6;
  padding: 5px;
  margin-bottom: 25px;
  border: solid 2px;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Dropdown = styled.select`
  font-size: 15px;
  margin: 0 auto;
  font-family: "Quicksand", sans-serif;
`;

const Title = styled.h1`
  font-size: 25px;
  font-family: "Josefin Sans", sans-serif;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const filter = props => (
  <Container>
    <Filter>
      <Title>{props.title}</Title>
      <Dropdown onChange={props.change}>
        <option>{props.directions}</option>
        {props.children}
      </Dropdown>
    </Filter>
  </Container>
);

export default filter;