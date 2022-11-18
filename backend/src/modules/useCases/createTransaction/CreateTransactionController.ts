import { Request, Response } from "express";

import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

export class CreateTransactionUseController {
  async handle(req: Request, res: Response) {
    const { creditUsername, transactionValue } = req.body;
    const createTransactionUseCase = new CreateTransactionUseCase();
    await createTransactionUseCase.execute({
      creditUsername,
      transactionValue,
      debitedAccountId: req.accountId as string,
    });
    res.status(201).json({ message: "Transaction was sucessfully created" });
  }
}
