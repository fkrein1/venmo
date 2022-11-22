import { Request, Response } from "express";

import { LoginUserUseCase } from "./LoginUserUseCase";

export class LoginUserController {
  async handle(req: Request, res: Response) {
    const loginUserUseCase = new LoginUserUseCase();
    const result = await loginUserUseCase.execute(req.body);
    res.status(200).json(result);
  }
}
