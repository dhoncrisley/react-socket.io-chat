import React from "react";
import styled from "styled-components";

export const ConnectedContainer = styled.div`
  background-color: "#fefefe";
  margin: 10px 5px;
  display: flex;
  flex: 1;
  align-items:flex-start;
  flex-direction: column;
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 5px;
  height: calc(100% - 25px);
  padding: 0 15px;
`;
export const ConnectedTitle = styled.h3`
  color: #333;
`;
export const ConnectedUser = styled.span`
  color: #333;
`;
