import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { prisma } from "../database/prismaClient";
import { AppError } from "../errors/AppError";

interface IToken {
  username: string;
  accountId: string;
}

export async function ensureAuthenticated(
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

    const user = await prisma.users.findUnique({
      where: { username: decryptedToken.username },
    });

    if (!user) throw new Error();

    req.username = decryptedToken.username;
    req.accountId = decryptedToken.accountId;

    return next();
  } catch (err) {
    throw new AppError(401, "Invalid token");
  }
}
