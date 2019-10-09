import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  font-size: 20px;
  font-family: "Josefin Sans", sans-serif;
  background-color: red;
  text-transform: uppercase;
  display: block;
  margin: 0 auto;
  padding: 15px;
  cursor: pointer;
`;

const button = (props) => (
    <Button onClick={props.submit}>{props.name}</Button>
)

export default button;