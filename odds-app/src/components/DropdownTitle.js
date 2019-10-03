import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 20px; 
  text-align: center;
`;

const dropdownTitle = (props) => <Title>{props.title}</Title>

export default dropdownTitle;