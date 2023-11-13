import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/apiError";
import tokenService from "../service/tokenService";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    
    const userData = tokenService.validateAccessToken(accessToken);
    console.log(userData);
    if (!userData) return next(ApiError.UnauthorizedError());
    //@ts-ignore
    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
};
