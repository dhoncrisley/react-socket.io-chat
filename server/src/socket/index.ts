import { Server } from "socket.io";
import { resolve } from "path";
import fs from "fs";
import { SocketHandler } from "./interfaces";

export default function (io: Server) {
  const files = fs.readdirSync(resolve(__dirname));
  for (const file of files) {
    if (!["index.ts", "models.ts", "interfaces.ts"].includes(file)) {
      const module: SocketHandler = require(resolve(__dirname, file)).default;
      if (typeof module == "function") {
        module(io);
      }
    }
  }
}
