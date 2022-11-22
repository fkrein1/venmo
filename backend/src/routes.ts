import { Router } from "express";

import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { CreateTransactionUseController } from "./modules/useCases/createTransaction/CreateTransactionController";
import { CreateUserController } from "./modules/useCases/createUser/CreateUserController";
import { GetTransactionsController } from "./modules/useCases/getTransactions/GetTransacrionsController";
import { GetUserController } from "./modules/useCases/getUser/GetUserController";
import { LoginUserController } from "./modules/useCases/loginUser/LoginUserController";

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const getUserController = new GetUserController();
const createTransactionUseController = new CreateTransactionUseController();
const getTransactionsController = new GetTransactionsController();

const routes = Router();

routes.post("/auth/signup", createUserController.handle);
routes.post("/auth/login", loginUserController.handle);
routes.get("/auth/me", ensureAuthenticated, getUserController.handle);
routes.get(
  "/transaction",
  ensureAuthenticated,
  getTransactionsController.handle
);
routes.post(
  "/transaction",
  ensureAuthenticated,
  createTransactionUseController.handle
);

export default routes;
