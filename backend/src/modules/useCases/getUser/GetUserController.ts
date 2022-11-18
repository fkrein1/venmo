import { Request, Response } from "express";

import { GetUserUseCase } from "./GetUserUseCase";

export class GetUserController {
  async handle(req: Request, res: Response) {
    const getUserUseCase = new GetUserUseCase();
    const result = await getUserUseCase.execute(req.username as string);
    res.status(200).json(result);
  }
}
