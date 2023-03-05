import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  route.get(
    "/me",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    (req: Request, res: Response) => {
      return res
        .json({ status: "SUCCESS", data: { user: req.currentUser } })
        .status(200);
    }
  );
};
