import express, { Express } from "express";
import bodyparser from "body-parser";
import cors from "cors";

export default function middlewares(app: Express) {
  app.use(cors());
  app.use(bodyparser.json());
  app.use(express.static("public"));
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} from ${req.ip.replace("::ffff:", "")} at ${new Date()}`);
    next();
  });
}
