import { Express, Router } from "express";
import { resolve } from "path";
import fs from "fs";
export default function (app: Express) {
  const router = Router();
  const files = fs.readdirSync(resolve(__dirname));
  for (const file of files) {
    if (file != "index.ts") {
      const module = require(resolve(__dirname, file)).default;
      if (typeof module == "function") {
        module(router);
      }
    }
  }
  app.use(router);
}
