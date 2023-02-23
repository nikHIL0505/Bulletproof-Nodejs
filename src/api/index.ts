import { Router } from "express";

import auth from "./routes/auth";
import user from "./routes/user";

export default () => {
  const app = Router();
  user(app);
  auth(app);
  return app;
};
