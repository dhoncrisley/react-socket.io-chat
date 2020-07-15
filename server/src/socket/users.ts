import { User } from "./models";
import { UserEvents, Message } from "./interfaces";
import { Socket } from "socket.io";

let clients: Array<User> = [];
let messages: Array<Message> = [];

export default function users(io: Socket) {
  io.on("connection", function (socket: Socket) {
    io.to(socket.id).emit(UserEvents.CONNECTED);
    let currentUser: User = { id: socket.id };

    function handleUserConnect(client: User) {
      currentUser = { ...client, id: socket.id };
      console.log("connect", currentUser.id, clients.length);
      clients.push(currentUser);
      io.to(socket.id).emit(UserEvents.LOGGED_IN, clients, socket.id);
      socket.broadcast.emit(UserEvents.USER_CONNECTED, currentUser);
    }

    function handleMessage(message: Message) {
      // socket.emit(UserEvents.MESSAGE, message);
      socket.broadcast.emit(UserEvents.MESSAGE, message);
    }

    function handleDisconnect() {
      console.log("disconnect", currentUser.id, clients.length);
      socket.broadcast.emit(UserEvents.USER_DISCONNECTED, currentUser);
      clients.map((client: User, i) => {
        console.log(client.id, currentUser.id);
        if (client.id === currentUser.id) {
          clients.splice(i, 1);
        }
      });
    }

    socket.on(UserEvents.USER_CONNECT, handleUserConnect);
    socket.on(UserEvents.MESSAGE, handleMessage);
    socket.on(UserEvents.DISCONNECT, handleDisconnect);
    socket.on(UserEvents.USER_DISCONNECT, handleDisconnect);
  });
}
