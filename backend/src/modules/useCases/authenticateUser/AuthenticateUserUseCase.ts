import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../errors/AppError";
import { IUserDTO, UserSchema } from "../../dtos/IUserDTO";

export class AuthenticateUserUseCase {
  async execute({ username, password }: IUserDTO) {
    const parsed = UserSchema.safeParse({ username, password });
    if (!parsed.success) {
      throw new AppError(400, "Invalid user schema");
    }

    const userAlreadyExists = await prisma.users.findUnique({
      where: { username },
    });
    if (!userAlreadyExists) throw new AppError(401, "Invalid user or password");

    const validPassword = await compare(password, userAlreadyExists.password);
    if (!validPassword) throw new AppError(401, "Invalid user or password");

    const token = sign({ username }, process.env.JWT_SECRET as string, {
      subject: userAlreadyExists.id,
      expiresIn: "24h",
    });
    return { token };
  }
}
