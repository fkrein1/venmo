import { prisma } from "../../../database/prismaClient";

export class GetTransactionsUseCase {
  async execute(accountId: string) {
    return prisma.transactions.findMany({
      where: {
        OR: [{ creditedAccountId: accountId }, { debitedAccountId: accountId }],
      },
      select: {
        id: true,
        value: true,
        createdAt: true,
        creditAccount: {
          select: {
            Users: {
              select: {
                username: true,
              },
            },
          },
        },
        debitAccount: {
          select: {
            Users: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });
  }
}
