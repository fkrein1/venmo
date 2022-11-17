import { Request, Response } from "express";

import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

export class CreateTransactionUseController {
  async handle(req: Request, res: Response) {
    const createTransactionUseCase = new CreateTransactionUseCase();
    await createTransactionUseCase.execute({
      ...req.body,
      debitedAccountId: req.accountId,
    });
    res.status(201).json({ message: "Transaction was sucessfully created" });
  }
}
