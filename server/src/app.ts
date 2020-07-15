import express from "express";
import io from "socket.io";
import http from "http";
import routes from "./routes";
import socket from "./socket";
import middlewares from "./middlewares";
class App {
  private express: express.Express;
  private server: http.Server;
  private io: io.Server;

  constructor() {
    this.express = express();
    this.server = http.createServer(this.express);
    this.io = io(this.server, { origins: ["*:*", "https://codesandbox.io"] });
    this.init();
  }

  init() {
    middlewares(this.express);
    routes(this.express);
    socket(this.io);

    const port = process.env.PORT || 3333;
    this.server.listen(port, () => {
      console.log("listening", port);
    });
  }
}

new App();
