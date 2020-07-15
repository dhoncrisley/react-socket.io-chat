import React from "react";
import { ConnectedContainer, ConnectedUser, ConnectedTitle } from "./styles";

// import { Container } from './styles';

function Connected({ users = [], currentUser = {} }) {
  return (
    <ConnectedContainer>
      <ConnectedTitle>Nesta sessão</ConnectedTitle>
      {users.map((user, i) => (
        <ConnectedUser key={i}>
          <span style={{ marginRight: 5, color: "#0c0" }}>⬤</span>
          {user.name} {user.id == currentUser.id && "(Você)"}
        </ConnectedUser>
      ))}
    </ConnectedContainer>
  );
}

export default Connected;
