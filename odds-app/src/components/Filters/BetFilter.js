import React from "react";
import styled from "styled-components";

import RadioButtons from "../Forms/RadioButtons";
import FilterTitle from "../FilterTitle";

const BetFilter = styled.div`
  height: 100px;
  width: 200px;
  background-color: grey;
  padding: 5px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const marketArray = [
  'Moneyline',
  'Spread',
  'Over-Under'
]

const markets = marketArray.map((market, index) => {
  return (
    <Option key={index}>
      <input type="radio" name="markets" value={market} />
      <label>{market}</label>
    </Option>
  );
}); 

const betFilter = props => (
  <BetFilter>
    <FilterTitle title={props.radioTitle} />
    <RadioButtons change={props.formChange}>
      {markets}
    </RadioButtons>
  </BetFilter>
);

export default betFilter;
