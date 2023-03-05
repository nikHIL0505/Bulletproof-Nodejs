import { Router, Request, Response, Nextfunction } from "express";
import { IUserInputDTO } from "@/interfaces/IUser";
import { celebrate, Joi } from "celebrate";
import AuthService from "../../services/auth";
import userModel from "../../models/user";
import middlewares from "../middlewares";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.post(
    "/signup",
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: Nextfunction) => {
      try {
        let authServiceInstance = new AuthService(userModel);
        let { user, token } = await authServiceInstance.Signup(
          req.body as IUserInputDTO
        );
        return res
          .status(201)
          .json({ status: "SUCCESS", data: { user, token } });
      } catch (e) {
        return next(e);
      }
    }
  );

  route.post(
    "/signin",
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: Nextfunction) => {
      try {
        let authServiceInstance = new AuthService(userModel);
        let { user, token } = await authServiceInstance.Signin(
          req.body.email,
          req.body.password
        );
        return res
          .status(200)
          .json({ status: "SUCCESS", data: { token: token, user: user } });
      } catch (e) {
        return next(e);
      }
    }
  );
};
