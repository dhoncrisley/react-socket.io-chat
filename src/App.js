import React, { useEffect, useState } from "react";
import "./styles.css";
import io from "socket.io-client";
export default function App() {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const socket = io();
    const handleConnected = () => {
      setConnected(true);
    };
    socket.on("connected", handleConnected);
    return () => {
      socket.off("connected", handleConnected);
    };
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>
        Connection:{" "}
        {connected ? (
          <span style={{ color: "#4f4" }}>connected</span>
        ) : (
          <span style={{ color: "#f44" }}>disconnected</span>
        )}
      </h2>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
