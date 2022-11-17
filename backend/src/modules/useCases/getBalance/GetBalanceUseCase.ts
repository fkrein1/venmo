import { prisma } from "../../../database/prismaClient";

export class GetBalanceUseCase {
  async execute(accountId: string | undefined) {
    const account = await prisma.accounts.findUnique({
      where: { id: accountId },
    });

    return { balance: account?.balance };
  }
}
