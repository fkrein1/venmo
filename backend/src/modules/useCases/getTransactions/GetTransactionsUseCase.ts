import { prisma } from "../../../database/prismaClient";

export class GetTransactionsUseCase {
  async execute(accountId: string) {
    const transactions = await prisma.transactions.findMany({
      where: {
        OR: [{ creditedAccountId: accountId }, { debitedAccountId: accountId }],
      },
      orderBy: [{ createdAt: "desc" }],
      select: {
        id: true,
        value: true,
        createdAt: true,
        creditedAccountId: true,
        debitedAccountId: true,
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

    return transactions.map((transaction) => {
      if (transaction.creditedAccountId === accountId) {
        return {
          id: transaction.id,
          type: "credit",
          value: transaction.value,
          username: transaction.debitAccount.Users?.username,
          createdAt: transaction.createdAt,
        };
      }
      return {
        id: transaction.id,
        type: "debit",
        value: -Math.abs(transaction.value),
        username: transaction.creditAccount.Users?.username,
        createdAt: transaction.createdAt,
      };
    });
  }
}
