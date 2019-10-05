import React from "react";
import styled from "styled-components";

import Dropdown from "../Forms/Dropdown";
import FilterTitle from "../FilterTitle";

const SportFilter = styled.div`
  height: 100px;
  width: 200px;
  background-color: grey;
  padding: 5px;
`;

const sportFilter = props => (
  <SportFilter>
    <FilterTitle title={props.dropdownTitle} />
    <Dropdown
      value={props.selectedValue}
      change={props.formChange}
      directions={props.dropdownDirections}
    >
      {props.options}
    </Dropdown>
  </SportFilter>
);

export default sportFilter;
