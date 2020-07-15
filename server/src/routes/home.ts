import { Router } from "express";

import { Request, Response } from "express";

export default function home(router: Router) {
  router.get("/home", (req: Request, res: Response) => {
    res.send("<h1>ok from home1</h1>");
  });
}
