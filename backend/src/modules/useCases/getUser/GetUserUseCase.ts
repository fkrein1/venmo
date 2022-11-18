import { prisma } from "../../../database/prismaClient";

export class GetUserUseCase {
  async execute(username: string) {
    const account = await prisma.users.findUnique({
      where: { username },
      select: {
        username: true,
        id: true,
        accountId: true,
        account: {
          select: {
            balance: true,
          },
        },
      },
    });

    return account;
  }
}
