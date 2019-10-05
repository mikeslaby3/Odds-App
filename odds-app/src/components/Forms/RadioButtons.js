import React from "react";
import styled from "styled-components";

const RadioButtons = styled.div`
  font-size: 15px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  margin: 0 auto;
`;

const radioButtons = props => (
  <RadioButtons onChange={props.change}>
    {props.children}
  </RadioButtons>
);

export default radioButtons;
