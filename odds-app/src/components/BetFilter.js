import React from 'react';
import styled from 'styled-components';

import Dropdown from './Dropdown';
import DropdownTitle from './DropdownTitle';

const BetFilter = styled.div`
  height: 100px;
  width: 200px;
  background-color: grey;
  padding: 5px;
`;

const betFilter = (props) => (
  <BetFilter>
    <DropdownTitle title={props.dropdownTitle}/>
    <Dropdown 
      value={props.selectedValue} 
      change={props.formChange} 
      directions={props.dropdownDirections}
    >
      {props.options}
    </Dropdown>
  </BetFilter>
)

export default betFilter;