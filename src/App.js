import React, { useEffect, useState, useCallback } from "react";
import "./styles.css";
import io from "socket.io-client";
import NavBar from "./components/NavBar";
import Connected from "./components/Connected";
import Chat from "./components/Chat";
import { AppContainer } from "./styles";
const socket = io.connect("10.0.0.104:3000");

export default function App() {
  const [connected, setConnected] = useState(false);
  const [canConnect, setCanConnect] = useState(false);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({ name: "" });

  const sendMessage = useCallback(
    (message) => {
      const newMessage = { userName: user.name, content: message, date: new Date(), senderId: user.id };

      socket.emit("MESSAGE", newMessage);
      setMessages((messages) => [...messages, newMessage]);
    },
    [user.id],
  );
  const handleConnection = (event) => {
    console.log("connected", event);
    setCanConnect(true);
  };
  const handleMessage = (message) => {
    console.log("connected", message);
    setMessages((messages) => [...messages, message]);
  };
  const handleError = (event) => {
    console.log("connected", event);
    setCanConnect(false);
  };
  const handleUserConnected = (newUser) => {
    console.log(newUser.name, "connected");
    setUsers((users) => [...users, newUser]);
  };
  const handleUserDisconnected = (user) => {
    console.log("disconnected", user);
    setUsers((users) => {
      const newUsers = [...users];
      const index = newUsers.findIndex(({ id }) => id == user.id);
      console.log({ index });
      if (index >= 0) {
        newUsers.splice(index, 1);
      }
      return newUsers;
    });
  };
  const handleConnected = (users = [], id) => {
    setUser((user) => ({ ...user, id }));
    socket.on("MESSAGE", handleMessage);
    socket.on("USER_CONNECTED", handleUserConnected);
    socket.on("USER_DISCONNECTED", handleUserDisconnected);
    setIsLoading(false);
    setConnected(true);
    setUsers(users);
  };
  const handleDisconnected = () => {
    setConnected(false);
    setUsers([]);
    setUser({ name: "" });
    socket.off("MESSAGE", handleMessage);
    socket.off("USER_CONNECTED", handleUserConnected);
    socket.off("USER_DISCONNECTED", handleUserDisconnected);
  };
  useEffect(() => {
    socket.on("CONNECTED", handleConnection);
    socket.on("error", handleError);
    return () => {
      socket.off("CONNECTED", handleConnection);
      socket.off("error", handleError);
    };
  }, []);

  const login = useCallback(() => {
    if (!user.name || user.name.length < 3) {
      const element = document.getElementById("user_name");
      console.log(element);
      if (element) {
        element.focus();
      }
      return;
    }
    setIsLoading(true);
    socket.emit("USER_CONNECT", user);
    socket.on("LOGGED_IN", handleConnected);
  }, [user]);

  const logout = useCallback(() => {
    socket.emit("USER_DISCONNECT");
    socket.off("LOGGED_IN", handleConnected);
    handleDisconnected();
  }, [user]);

  return (
    <div className="App">
      <NavBar {...{ user, setUser, connected, isLoading, canConnect, logout, login }} />
      <AppContainer>
        <Chat messages={messages} sendMessage={sendMessage} currentUser={user} />
        <Connected users={users} currentUser={user} />
      </AppContainer>
    </div>
  );
}
