import { Auth } from "../models/Auth";
import bcrypt from "bcrypt";
import mailService from "./mailService";
import tokenService from "./tokenService";
import { UserDto } from "../dtos/userDto";
import { randomUUID } from "crypto";
import { ApiError } from "../exceptions/apiError";

class AuthService {
  async registration(email: string, password: string) {
    const candidate = await Auth.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(`User ${email} already exists.`);
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
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto._id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink: string) {
    const user = await Auth.findOne({ activationLink });
    console.log(!!user);
    if (!user) throw ApiError.BadRequest("Incorrect activation link");

    user.isActivated = true;
    await user.save();
  }

  async login(email: string, password: string) {
    const user = await Auth.findOne({ email });
    if (!user) throw ApiError.BadRequest("User not found");

    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) throw ApiError.BadRequest("Incorrect password");

    const userDto = new UserDto(user as any);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto._id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await Auth.findOne({id: userData.id});
    const userDto = new UserDto(user as any);
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto._id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await Auth.find();
    return users;
  }
}

export default new AuthService();
