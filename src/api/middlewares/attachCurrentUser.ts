import user from "../../models/user";

async function attachCurrentUser(req, res, next) {
  try {
    let userObject = await user.findById(req.token._id);
    if (!userObject) {
      return res.sendStatus(401);
    }
    const currentUser = userObject.toObject();
    Reflect.deleteProperty(currentUser, "password");
    Reflect.deleteProperty(currentUser, "salt");
    req.currentUser = currentUser;
    return next();
  } catch (e) {
    return next(e);
  }
}

export default attachCurrentUser;
