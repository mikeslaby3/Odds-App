import React from 'react';
import styled from 'styled-components';

const Dropdown = styled.select`
  font-size: 10px;
  display: block;
  margin: 0 auto;
`;

const dropdown = (props) => (
  <Dropdown>
    <option>{props.directions}</option>
    {props.children}
  </Dropdown>
)

export default dropdown;