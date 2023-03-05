import jwt from "jsonwebtoken";
import config from "../../config";

function getTokenFromHeader(req) {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

export default (req, res, next) => {
  const isAuth = jwt.verify(getTokenFromHeader(req), config.jwtSecret);
  req.token = isAuth;
  return next();
};
