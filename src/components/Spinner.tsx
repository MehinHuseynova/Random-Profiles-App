import React from "react";
import styled, { keyframes } from "styled-components";

export const SpinnerComponent = () => {
  return (
    <SpinnerContainer>
      <Spinner></Spinner>
    </SpinnerContainer>
  );
};

const rotate = keyframes`
     to { -webkit-transform: rotate(360deg); }
     to { -webkit-transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid blue;
  border-radius: 50%;
  border-top-color: #fff;
  animation: ${rotate} 1s ease-in-out infinite;
  -webkit-animation: ${rotate} 1s ease-in-out infinite;
`;

export const SpinnerContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
