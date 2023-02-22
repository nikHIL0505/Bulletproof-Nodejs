import { Router, Request, Response } from "express";
const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  route.get(
    "/me",
    (req, res, next) => {
      console.log("Hi");
      return next();
    },
    (req: Request, res: Response) => {
      return res.json({ status: "SUCCESS" }).status(200);
    }
  );
};
