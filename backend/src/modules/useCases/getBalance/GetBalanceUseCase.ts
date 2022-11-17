import { prisma } from "../../../database/prismaClient";

export class GetBalanceUseCase {
  async execute(accountId: string) {
    const account = await prisma.accounts.findUnique({
      where: { id: accountId },
    });

    return { balance: account?.balance };
  }
}
