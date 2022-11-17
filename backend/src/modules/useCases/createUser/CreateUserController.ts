import { Request, Response } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const createUserUseCase = new CreateUserUseCase();
    const result = await createUserUseCase.execute(req.body);
    res.status(201).json(result);
  }
}
