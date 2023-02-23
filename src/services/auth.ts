import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

import { IUser, IUserInputDTO } from "@/interfaces/IUser";
import config from "../config";

export default class AuthService {
  constructor(private userModel) {}

  public async Signup(
    userInput: IUserInputDTO
  ): Promise<{ user: IUser; token: string }> {
    try {
      let salt = randomBytes(32);
      let hashedPassword = await argon2.hash(userInput.password, { salt });
      let userObject = await this.userModel.create({
        ...userInput,
        password: hashedPassword,
        salt: salt.toString("hex"),
      });
      let token = this.generateJWT(userObject);
      const user = userObject.toObject();
      Reflect.deleteProperty(user, "password");
      Reflect.deleteProperty(user, "salt");
      return { user, token };
    } catch (e) {
      throw e;
    }
  }

  private generateJWT(userInput: IUser): string {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    let token = jwt.sign(
      {
        _id: userInput._id,
        name: userInput.name,
        role: userInput.role,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret
    );
    return token;
  }
}
