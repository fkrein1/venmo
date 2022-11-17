import { Router } from "express";

import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { AuthenticateUserController } from "./modules/useCases/authenticateUser/AuthenticateUserController";
import { CreateTransactionUseController } from "./modules/useCases/createTransaction/CreateTransactionController";
import { CreateUserController } from "./modules/useCases/createUser/CreateUserController";
import { GetBalanceController } from "./modules/useCases/getBalance/GetBalanceController";
import { GetTransactionsController } from "./modules/useCases/getTransactions/GetTransacrionsController";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const getBalanceController = new GetBalanceController();
const createTransactionUseController = new CreateTransactionUseController();
const getTransactionsController = new GetTransactionsController();

const routes = Router();

routes.post("/signup", createUserController.handle);
routes.post("/login", authenticateUserController.handle);
routes.get("/balance", ensureAuthenticated, getBalanceController.handle);
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
