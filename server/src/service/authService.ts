import { Auth } from "../models/Auth";
import bcrypt from "bcrypt";
import uuid from "uuid";
import mailService from "./mailService";
import tokenService from "./tokenService";
import { UserDto, UserDtoType } from "../dtos/userDto";
import { randomUUID } from "crypto";

class AuthService {
  async registration(email: string, password: string) {
    const candidate = await Auth.findOne({ email });

    if (candidate) {
      throw new Error(`User ${email} already exists.`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = randomUUID();
    const user = await Auth.create({
      email,
      password: hashPassword,
      activationLink,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/v1/auth/activate/${activationLink}`
    );

    // temp
    const userDto = new UserDto(user as any);
    const tokens = tokenService.generateToken({ ...(userDto as any) });

    await tokenService.saveToken(userDto._id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink: string) {
    const user = await Auth.findOne({ activationLink });
    if (!user) {
      throw new Error("Incorrect activation link");
    }
    user.isActivated = true;
    await user.save();
  }
}

export default new AuthService();
