import { Request, Response } from "express";

import { GetBalanceUseCase } from "./GetBalanceUseCase";

export class GetBalanceController {
  async handle(req: Request, res: Response) {
    const getBalanceUseCase = new GetBalanceUseCase();
    const result = await getBalanceUseCase.execute(req.accountId as string);
    res.status(200).json(result);
  }
}
