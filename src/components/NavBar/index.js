import React from "react";
import { NavbarWrapper } from "./styles";

function NavBar({ connected, user, setUser, isLoading, canConnect, logout, login }) {
  return (
    <NavbarWrapper>
      {connected ? (
        <>
          <span style={{ color: "#0b0" }}>⬤</span>
          <span style={{ paddingLeft: 10, paddingRight: 10 }}>{user.name}</span>
        </>
      ) : (
        <input
          id="user_name"
          style={{ marginRight: 10 }}
          onChange={({ target: { value } }) => {
            setUser({ name: value });
          }}
          onKeyDown={({ keyCode }) => {
            if (keyCode == 13) {
              login();
            }
          }}
          value={user.name}
          placeholder="Digite seu nome"
        />
      )}
      <button
        disabled={!canConnect || isLoading}
        onClick={() => {
          if (isLoading) return;
          if (connected) logout();
          else login();
        }}
      >
        {isLoading ? "Aguarde..." : connected ? "Logout" : "Login"}
      </button>
    </NavbarWrapper>
  );
}

export default NavBar;
