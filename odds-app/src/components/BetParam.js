import React from 'react';
import styled from 'styled-components';

import Dropdown from './Dropdown';
import DropdownTitle from './DropdownTitle';

const Parameter = styled.div`
  height: 100px;
  width: 200px;
  background-color: grey;
  padding: 5px;
`;

const betParam = (props) => (
  <Parameter>
    <DropdownTitle title={props.dropdownTitle}/>
    <Dropdown directions={props.dropdownDirections}>
      {props.options}
    </Dropdown>
  </Parameter>
)

export default betParam;