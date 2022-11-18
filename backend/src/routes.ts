import { Router } from "express";

import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { AuthenticateUserController } from "./modules/useCases/authenticateUser/AuthenticateUserController";
import { CreateTransactionUseController } from "./modules/useCases/createTransaction/CreateTransactionController";
import { CreateUserController } from "./modules/useCases/createUser/CreateUserController";
import { GetTransactionsController } from "./modules/useCases/getTransactions/GetTransacrionsController";
import { GetUserController } from "./modules/useCases/getUser/GetUserController";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const getUserController = new GetUserController();
const createTransactionUseController = new CreateTransactionUseController();
const getTransactionsController = new GetTransactionsController();

const routes = Router();

routes.post("/auth/signup", createUserController.handle);
routes.post("/auth/login", authenticateUserController.handle);
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
