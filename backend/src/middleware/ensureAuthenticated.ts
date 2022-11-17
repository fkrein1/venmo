import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";

interface IToken {
  username: string;
  accountId: string;
}

export function ensureAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;
  if (!authToken) throw new AppError(401, "Token is missing");

  const [, token] = authToken.split(" ");

  try {
    const decryptedToken = verify(
      token,
      process.env.JWT_SECRET as string
    ) as IToken;

    req.username = decryptedToken.username;
    req.accountId = decryptedToken.accountId;

    return next();
  } catch (err) {
    throw new AppError(401, "Invalid token");
  }
}
