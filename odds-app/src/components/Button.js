import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  font-size: 15px;
  display: block;
  margin: 0 auto;
`;

const button = (props) => (
    <Button onClick={props.click}>{props.name}</Button>
)

export default button;