import { Request, Response } from "express";

import { GetTransactionsUseCase } from "./GetTransactionsUseCase";

export class GetTransactionsController {
  async handle(req: Request, res: Response) {
    const getTransactionsUseCase = new GetTransactionsUseCase();
    const result = await getTransactionsUseCase.execute(
      req.accountId as string
    );
    res.status(200).json(result);
  }
}
