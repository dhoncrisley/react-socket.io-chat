import { Server } from "socket.io";

export type SocketHandler = (io: Server) => void;

export enum UserEvents {
  USER_CONNECTED = "USER_CONNECTED",
  CONNECTED = "CONNECTED",
  USER_CONNECT = "USER_CONNECT",
  PLAY = "PLAY",
  MESSAGE = "MESSAGE",
  DISCONNECT = "disconnect",
  USER_DISCONNECTED = "USER_DISCONNECTED",
  USER_DISCONNECT = "USER_DISCONNECT",
  LOGGED_IN = "LOGGED_IN",
}

export interface Message {
  content: string;
  date: Date;
  senderId: string;
  userName: string;
}
