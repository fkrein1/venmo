import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../errors/AppError";
import { IUserDTO, UserSchema } from "../../dtos/IUserDTO";

export class CreateUserUseCase {
  async execute({ username, password }: IUserDTO) {
    const parsed = UserSchema.safeParse({ username, password });
    if (!parsed.success) {
      throw new AppError(400, "Invalid user schema");
    }

    const userAlreadyExists = await prisma.users.findUnique({
      where: { username },
    });
    if (userAlreadyExists) throw new AppError(400, "User already exists");

    const passwordHash = await hash(password, 8);

    const newUser = await prisma.users.create({
      data: {
        username,
        password: passwordHash,
        account: {
          create: {
            balance: 100,
          },
        },
      },
    });

    const token = sign(
      { username, accountId: newUser.accountId },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "24h",
      }
    );

    return { token };
  }
}
