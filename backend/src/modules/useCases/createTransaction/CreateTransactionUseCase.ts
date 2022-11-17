import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../errors/AppError";
import {
  CreateTransactionSchema,
  ICreateTransactionDTO,
} from "../../dtos/ICreateTransactionDTO";

export class CreateTransactionUseCase {
  async execute({
    debitedAccountId,
    creditUsername,
    transactionValue,
  }: ICreateTransactionDTO) {
    const parsed = CreateTransactionSchema.safeParse({
      debitedAccountId,
      creditUsername,
      transactionValue,
    });
    if (!parsed.success) {
      throw new AppError(400, "Invalid transaction schema");
    }

    const userToCredit = await prisma.users.findUnique({
      where: { username: creditUsername },
      include: { account: true },
    });
    if (!userToCredit) throw new AppError(404, "Credit account not found");

    const accountToDebit = await prisma.accounts.findUnique({
      where: { id: debitedAccountId },
    });
    if (!accountToDebit) throw new AppError(404, "Debit account not found");
    if (accountToDebit.id === userToCredit.accountId) {
      throw new AppError(
        401,
        "Debit account must be different from credit account"
      );
    }

    if (transactionValue > accountToDebit.balance)
      throw new AppError(401, "Insufficient funds");

    await prisma.$transaction([
      prisma.transactions.create({
        data: {
          debitedAccountId,
          creditedAccountId: userToCredit.accountId,
          value: transactionValue,
        },
      }),
      prisma.accounts.update({
        where: { id: debitedAccountId },
        data: { balance: accountToDebit.balance - transactionValue },
      }),
      prisma.accounts.update({
        where: { id: userToCredit.accountId },
        data: { balance: userToCredit.account.balance + transactionValue },
      }),
    ]);
  }
}
