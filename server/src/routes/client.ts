import { Router } from "express";
import { resolve } from "path";
import { readFileSync } from "fs";
export default function (router: Router) {
  router.get("/client", (req, res) => {
    res.send(readFileSync(resolve("src/views/client/index.html"), { encoding: "utf-8" }));
  });
}
