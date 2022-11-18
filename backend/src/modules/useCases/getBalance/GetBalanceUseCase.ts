import { prisma } from "../../../database/prismaClient";

export class GetBalanceUseCase {
  async execute(accountId: string) {
    const account = await prisma.accounts.findUnique({
      where: { id: accountId },
      select: {
        balance: true,
        id: true,
        Users: {
          select: {
            username: true,
            id: true,
          },
        },
      },
    });

    return account;
  }
}
